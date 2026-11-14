import { TERMS, initialSchedule, sectionById, SECTIONS, courseLabel } from './catalog.js';
import { earnedCredits, cumulativeGPA, isPassingGrade } from './data/progression.js';

export { isPassingGrade };
export const SCHEMA_VERSION = 2;
export const CREDIT_LIMIT = 18;
export function createState(profile) {
  return { version: SCHEMA_VERSION, userId: profile.id, termId: 'spring-2027', enrolledByTerm: { 'fall-2026': initialSchedule(profile), 'spring-2027': [] }, cartByTerm: {}, waitlistByTerm: {}, receipts: [], completedTasks: [], taskDates: {}, savedScholarships: [], preferences: { reminders: true, compactSchedule: false }, searchByTerm: {}, reviewChecklist: [] };
}
export function hydrateState(raw, profile) {
  const fallback = createState(profile);
  if (!raw || raw.version !== SCHEMA_VERSION || raw.userId !== profile.id) return fallback;
  const known = new Set(SECTIONS.map(s => s.id));
  const cleanIds = list => Array.isArray(list) ? [...new Set(list.filter(id => known.has(id)))] : [];
  const enrolled = Array.isArray(raw.enrolledByTerm?.['spring-2027']) ? raw.enrolledByTerm['spring-2027'].map(s => sectionById(s?.id)).filter(Boolean) : [];
  return { ...fallback, termId: TERMS.some(t => t.id === raw.termId) ? raw.termId : fallback.termId,
    enrolledByTerm: { ...fallback.enrolledByTerm, 'spring-2027': [...new Map(enrolled.map(s => [s.code,s])).values()] },
    cartByTerm: { 'spring-2027': cleanIds(raw.cartByTerm?.['spring-2027']) }, waitlistByTerm: { 'spring-2027': cleanIds(raw.waitlistByTerm?.['spring-2027']) },
    receipts: Array.isArray(raw.receipts) ? raw.receipts.filter(r=>r && typeof r.id==='string' && TERMS.some(t=>t.id===r.termId) && typeof r.timestamp==='string' && Number.isFinite(Date.parse(r.timestamp)) && Array.isArray(r.courses) && r.courses.every(c=>c && typeof c.code==='string' && typeof c.title==='string' && typeof c.section==='string' && Number.isFinite(c.credits))).slice(0,30) : [], completedTasks: Array.isArray(raw.completedTasks) ? raw.completedTasks.filter(x => typeof x === 'string') : [],
    taskDates: Object.fromEntries(Object.entries(raw.taskDates && typeof raw.taskDates === 'object' ? raw.taskDates : {}).filter(([id,date]) => ['spring-plan','advisor','contact'].includes(id) && validTaskDate(date))),
    savedScholarships: Array.isArray(raw.savedScholarships) ? raw.savedScholarships.filter(x => typeof x === 'string') : [],
    preferences: { reminders: raw.preferences?.reminders !== false, compactSchedule: raw.preferences?.compactSchedule === true },
    searchByTerm: Object.fromEntries(TERMS.map(t=>{const c=raw.searchByTerm?.[t.id]??{};return [t.id,{query:typeof c.query==='string'?c.query:'',subject:typeof c.subject==='string'?c.subject:'All subjects',mode:typeof c.mode==='string'?c.mode:'All formats',day:typeof c.day==='string'?c.day:'',openOnly:c.openOnly===true,hideConflicts:c.hideConflicts===true,startAfter:validTime(c.startAfter)?c.startAfter:'',endBefore:validTime(c.endBefore)?c.endBefore:'',fitCampusDays:c.fitCampusDays===true}];})),
    reviewChecklist: Array.isArray(raw.reviewChecklist) ? raw.reviewChecklist.filter(x => typeof x === 'string') : [] };
}
export const creditSum = courses => courses.reduce((total,c) => total+c.credits,0);
export const minutes = value => { const [h,m] = value.split(':').map(Number); return h*60+m; };
export function formatTime(value) { const [h,m] = value.split(':').map(Number); return `${h%12 || 12}:${String(m).padStart(2,'0')} ${h>=12?'PM':'AM'}`; }
export function meetingLabel(section) { return section.meetings.length ? section.meetings.map(m => `${m.days.join(' / ')} · ${formatTime(m.start)}–${formatTime(m.end)}`).join('; ') : 'Online · Asynchronous'; }
export function conflictBetween(a,b) {
  return a.meetings.some(x => b.meetings.some(y => x.days.some(d => y.days.includes(d)) && minutes(x.start)<minutes(y.end) && minutes(y.start)<minutes(x.end)));
}
export function eligibility(state, profile, section, termId, additional = []) {
  const errors = [];
  const term = TERMS.find(t => t.id===termId);
  const row = (code,message,recovery) => errors.push({ code, message, recovery });
  if (!term?.registrationOpen) row('window','Registration is closed for this term.','Switch to Spring 2027 to plan and enroll.');
  if (section.termId !== termId) row('term','This section belongs to a different term.','Choose a section offered in the selected term.');
  for (const hold of profile.holds ?? []) row('hold',hold,'Contact your advisor to resolve this registration hold.');
  const enrolled = [...(state.enrolledByTerm[termId] ?? []), ...additional];
  if (enrolled.some(s => s.code === section.code)) row('duplicate',`${section.code} is already in this schedule.`,'Keep one section per course. Remove the existing section to switch.');
  if (section.seats<=0) row('full','This section is full.',section.waitlistAvailable ? 'Join the waitlist or choose another section.' : 'Choose another section.');
  const passed = new Set(profile.transcript.entries.filter(e => isPassingGrade(e.grade)).map(e => e.code));
  const priorInProgress = termId==='spring-2027' ? new Set((state.enrolledByTerm['fall-2026'] ?? []).map(c => c.code)) : new Set();
  const missing = (section.prerequisites ?? []).filter(code => !passed.has(code) && !priorInProgress.has(code));
  if (missing.length) row('prerequisite',`Missing prerequisite: ${missing.map(courseLabel).join(', ')}.`, 'Choose an introductory course or contact academic advising.');
  const conflict = enrolled.find(s => conflictBetween(s,section));
  if (conflict) row('conflict',`Overlaps ${conflict.code} · section ${conflict.section}.`,'Compare the other sections and choose a time that fits.');
  if (creditSum(enrolled)+section.credits>CREDIT_LIMIT) row('credits',`This would exceed the ${CREDIT_LIMIT}-credit demo limit.`,'Remove a course or discuss an overload with your advisor.');
  return errors;
}
export function addToCart(state, id, termId) {
  const section=sectionById(id);
  if (!section || section.termId!==termId || !TERMS.find(t=>t.id===termId)?.registrationOpen) return { ok:false,message:'Choose a section in an open registration term.' };
  if ((state.enrolledByTerm[termId] ?? []).some(s=>s.code===section.code)) return { ok:false,message:'You are already enrolled in this course.' };
  const cart=state.cartByTerm[termId] ?? [];
  if (cart.some(x=>sectionById(x)?.code===section.code)) return { ok:false,message:'This course is already in your cart. Remove it before choosing another section.' };
  return { ok:true, state:{ ...state, cartByTerm:{...state.cartByTerm,[termId]:[...cart,id]} } };
}
export function validateBatch(state, profile, ids, termId) {
  const selected=[]; const problems=[];
  for (const id of [...new Set(ids)]) {
    const section=sectionById(id);
    if (!section) { problems.push({ id, errors:[{code:'unknown',message:'This section is no longer available.',recovery:'Remove it and search again.'}] }); continue; }
    const errors=eligibility(state,profile,section,termId,selected);
    if (errors.length) problems.push({id,errors});
    selected.push(section);
  }
  return problems;
}
export function enrollSections(state, profile, ids, termId, timestamp=new Date().toISOString()) {
  if (!ids.length) return { ok:false,problems:[] };
  const problems=validateBatch(state,profile,ids,termId);
  if (problems.length) return {ok:false,problems};
  const courses=[...new Set(ids)].map(sectionById);
  const receipt={id:`ENR-${timestamp.replace(/\D/g,'').slice(0,14)}-${state.receipts.length+1}`, termId, timestamp, courses: courses.map(s=>({id:s.id,code:s.code,section:s.section,title:s.title,credits:s.credits})), credits:creditSum(courses)};
  return {ok:true,receipt,state:{...state, enrolledByTerm:{...state.enrolledByTerm,[termId]:[...(state.enrolledByTerm[termId]??[]),...courses]}, cartByTerm:{...state.cartByTerm,[termId]:(state.cartByTerm[termId]??[]).filter(id=>!ids.includes(id))}, waitlistByTerm:{...state.waitlistByTerm,[termId]:(state.waitlistByTerm[termId]??[]).filter(id=>!courses.some(c=>c.code===sectionById(id)?.code))}, receipts:[receipt,...state.receipts].slice(0,30)}};
}
export function waitlistSection(state,profile,id,termId) {
  const section=sectionById(id);
  if (!section || !section.waitlistAvailable || section.seats>0) return {ok:false,message:'This section does not have an open waitlist.'};
  const errors=eligibility(state,profile,section,termId).filter(e=>e.code!=='full' && e.code!=='conflict' && e.code!=='credits');
  if (errors.length) return {ok:false,message:errors[0].message};
  const existing=state.waitlistByTerm[termId]??[];
  if (existing.includes(id)) return {ok:false,message:'You are already on this demo waitlist.'};
  return {ok:true,state:{...state,waitlistByTerm:{...state.waitlistByTerm,[termId]:[...existing,id]},cartByTerm:{...state.cartByTerm,[termId]:(state.cartByTerm[termId]??[]).filter(x=>x!==id)}}};
}
export function dropSection(state,id,termId) {
  if (!TERMS.find(t=>t.id===termId)?.registrationOpen) return {ok:false,message:'Changes are closed for this term.'};
  const section=(state.enrolledByTerm[termId]??[]).find(s=>s.id===id);
  if (!section) return {ok:false,message:'This section is not in your schedule.'};
  return {ok:true,section,state:{...state,enrolledByTerm:{...state.enrolledByTerm,[termId]:state.enrolledByTerm[termId].filter(s=>s.id!==id)}}};
}
export function academicSummary(profile,state) {
  const earned=earnedCredits(profile.transcript);
  const current=state.enrolledByTerm['fall-2026']??[];
  const underway=creditSum(current);
  const minimum=profile.plan.program.minimumCredits;
  const passed=new Set(profile.transcript.entries.filter(e=>isPassingGrade(e.grade)).map(e=>e.code));
  const majorCodes=new Set(['CS','EECE','IT','MATH','STAT','PHYS','CHEM','ENED','PD']);
  const category = code => majorCodes.has(code.replace(/\d.*$/,''))?'Major':code.startsWith('ENGL')||code.startsWith('COMM')||code.startsWith('HIST')||code.startsWith('PSYC')||code.startsWith('PHIL')||code.startsWith('SOCI')?'General education':'Elective';
  const requirements=[...new Map(profile.plan.terms.flatMap(t=>t.courses).filter(c=>c.credits>0).map(c=>[c.code,c])).values()].map(c=>({...c,category:c.fulfills?.includes('Elective')?'Elective':category(c.code),status:passed.has(c.code)?'Complete':current.some(s=>s.code===c.code)?'In progress':'Remaining'}));
  return {earned,underway,minimum,remaining:Math.max(0,minimum-earned-underway),percent:Math.min(100,Math.round(earned/minimum*100)),gpa:Number.isFinite(profile.demoGpa)?profile.demoGpa.toFixed(3):profile.transcript.entries.some(e=>/^[A-DF][+-]?$/.test(e.grade))?cumulativeGPA(profile.transcript).toFixed(3):null,requirements};
}
export const validTime = value => typeof value === 'string' && /^(?:[01]\d|2[0-3]):[0-5]\d$/.test(value);
export function plannedCampusDays(state, termId) {
  const courses = [...(state.enrolledByTerm[termId] ?? []), ...(state.cartByTerm[termId] ?? []).map(sectionById).filter(Boolean)];
  const selected = new Set(courses.flatMap(s => s.meetings.flatMap(m => m.days)));
  return ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].filter(d => selected.has(d));
}
export function searchSections(context, state, termId) {
  const query=(context.query??'').toLowerCase().replace(/\s/g,'');
  const start = validTime(context.startAfter) ? minutes(context.startAfter) : null;
  const end = validTime(context.endBefore) ? minutes(context.endBefore) : null;
  if (start !== null && end !== null && start >= end) return [];
  const campusDays = plannedCampusDays(state, termId);
  return SECTIONS.filter(s => s.termId===termId
    && (!query || `${s.code}${s.title}${s.instructor}`.toLowerCase().replace(/\s/g,'').includes(query))
    && (!context.subject || context.subject==='All subjects' || s.subject===context.subject)
    && (!context.openOnly || s.seats>0)
    && (!context.mode || context.mode==='All formats' || s.mode===context.mode)
    && (!context.day || s.meetings.some(m=>m.days.includes(context.day)))
    && (!context.hideConflicts || !(state.enrolledByTerm[termId]??[]).some(x=>conflictBetween(s,x)))
    && ((start === null && end === null) || (s.meetings.length > 0 && s.meetings.every(m => (start === null || minutes(m.start) >= start) && (end === null || minutes(m.end) <= end))))
    && (!context.fitCampusDays || !campusDays.length || s.meetings.every(m => m.days.every(d => campusDays.includes(d)))));
}
export const keyboardShortcut = platform => /Mac|iPhone|iPad|iPod/i.test(platform ?? '') ? '⌘ K' : 'Ctrl K';
export function validTaskDate(value) {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T12:00:00Z`);
  return Number.isFinite(date.getTime()) && date.toISOString().slice(0,10) === value;
}
export function taskDateStatus(value, today) {
  if (!validTaskDate(value)) return 'No personal target';
  return value < today ? 'Overdue' : value === today ? 'Today' : 'Upcoming';
}
export function scheduleICS(courses,termId) {
  const spring=termId==='spring-2027';
  const first=spring?'20270111':'20260824';
  const until=spring?'20270424':'20261212';
  const dayMap={Mon:'MO',Tue:'TU',Wed:'WE',Thu:'TH',Fri:'FR',Sat:'SA',Sun:'SU'};
  const escape=t=>String(t).replace(/\\/g,'\\\\').replace(/\n/g,'\\n').replace(/,/g,'\\,').replace(/;/g,'\\;');
  const lines=['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//Catalyst Prototype//Schedule//EN','CALSCALE:GREGORIAN','METHOD:PUBLISH','BEGIN:VTIMEZONE','TZID:America/New_York','BEGIN:DAYLIGHT','DTSTART:20070311T020000','TZOFFSETFROM:-0500','TZOFFSETTO:-0400','TZNAME:EDT','RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU','END:DAYLIGHT','BEGIN:STANDARD','DTSTART:20071104T020000','TZOFFSETFROM:-0400','TZOFFSETTO:-0500','TZNAME:EST','RRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU','END:STANDARD','END:VTIMEZONE'];
  for (const c of courses) for (let i=0;i<c.meetings.length;i++) {
    const m=c.meetings[i];
    const date=new Date(`${first.slice(0,4)}-${first.slice(4,6)}-${first.slice(6,8)}T12:00:00Z`);
    const offset=({Mon:0,Tue:1,Wed:2,Thu:3,Fri:4,Sat:5,Sun:6})[m.days[0]];
    date.setUTCDate(date.getUTCDate()+offset);
    const startDate=date.toISOString().slice(0,10).replaceAll('-','');
    lines.push('BEGIN:VEVENT',`UID:${c.id}-${i}@catalyst-demo`,`DTSTAMP:20261114T000000Z`,`DTSTART;TZID=America/New_York:${startDate}T${m.start.replace(':','')}00`,`DTEND;TZID=America/New_York:${startDate}T${m.end.replace(':','')}00`,`RRULE:FREQ=WEEKLY;BYDAY=${m.days.map(d=>dayMap[d]).join(',')};UNTIL=${until}T235959Z`,`SUMMARY:${escape(c.code+' — '+c.title+' (demo)')}`,`LOCATION:${escape(m.room)}`,'END:VEVENT');
  }
  lines.push('END:VCALENDAR');return lines.join('\r\n')+'\r\n';
}

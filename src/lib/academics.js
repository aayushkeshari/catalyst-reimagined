import { courseLabel, TERMS } from './catalog.js';
import { cumulativeGPA, isPassingGrade } from './data/progression.js';

export const OFFICIAL = {
  catalyst: 'https://catalyst.uc.edu/',
  calendar: 'https://www.uc.edu/about/registrar/calendars.html',
  transcripts: 'https://www.uc.edu/about/registrar/transcripts-diplomas-verifications/transcript-ordering.html',
  parchment: 'https://registration.parchment.com/member/7f7ed5fc-c65c-11ec-9ff0-771c7e5fd0cd',
  replacement: 'https://www.uc.edu/about/registrar/record-updates/grade-replacements/policy.html',
  verification: 'https://www.uc.edu/about/registrar/transcripts-diplomas-verifications/student-verifications.html',
  graduation: 'https://www.uc.edu/about/registrar/record-updates/graduation/apply-to-graduate.html',
  commencement: 'https://www.uc.edu/campus-life/commencement.html',
  diploma: 'https://www.uc.edu/about/registrar/transcripts-diplomas-verifications/diplomas.html',
  lawTranscript: 'https://www.law.uc.edu/student-life/registrar-records/order-transcripts.html',
  medicine: 'https://med.uc.edu/education/medical-student-education/registrar/transcripts-graduation-validation',
  law: 'https://www.law.uc.edu/student-life/current-students.html',
  lawForms: 'https://www.law.uc.edu/Forms/registrar-request.html',
  transfer: 'https://www.uc.edu/about/registrar/credit.html',
  advising: 'https://www.onestop.uc.edu/other/academic-advising/advising-tools.html',
  network: 'https://uc.inspire.civitaslearning.com/'
};
const page = (id, label, description) => ({ id, label, description, href: `#/academics/${id}` });
export const ACADEMIC_GROUPS = [
  { id: 'classes', label: 'Classes and Schedule', icon: 'calendar', items: [
    { id: 'schedule', label: 'My Class Schedule', description: 'View confirmed classes, meeting times, rooms, and waitlists.', href: '#/classes?tab=schedule' },
    { id: 'class-search', label: 'Search / Add Classes', description: 'Search, compare sections, and add classes to your enrollment cart.', href: '#/classes?term=spring-2027' },
    { id: 'cart', label: 'Enrollment Cart', description: 'Review your selections before confirming enrollment.', href: '#/classes?tab=cart' },
    page('drop', 'Drop Classes', 'Choose an enrolled class, review the change, and confirm.'),
    page('swap', 'Swap Classes', 'Replace a section in one checked transaction.'),
    page('learning-community', 'Learning Community', 'Find guidance for linked courses and learning communities.'),
    page('edit-enrollment', 'Edit Enrollment', 'Review enrollment details and class-change guidance.'),
    page('term-information', 'Term Information', 'See registration access, enrolled credits, and term resources.')
  ] },
  { id: 'calendars', label: 'Calendars and Deadlines', icon: 'clock', items: [
    page('calendar', 'Academic Calendars', 'Find official semester calendars and dates.'),
    page('deadlines', 'Dates and Deadlines', 'Keep registration, grading, and graduation resources together.')
  ] },
  { id: 'records', label: 'Grades/Transcript/Enroll Cert', icon: 'file', items: [
    page('grades', 'View My Grades', 'Choose a term and view course grades and credits.'),
    page('milestones', 'View My Milestones', 'Review milestone information and its current status.'),
    page('course-history', 'View My Course History', 'Search and filter all completed and current coursework.'),
    page('grade-replacement', 'Undergrad Grade Replacement', 'Review policy and check repeated course attempts.'),
    page('official-transcript', 'Request Official Transcript', 'Continue to UC’s transcript ordering service and Parchment.'),
    page('unofficial-record', 'View my Unofficial Record', 'Generate, download, and reopen a sample academic report.'),
    page('enrollment-letter', 'Print Enrollment/Degree Letter', 'Preview and print a sample enrollment letter.'),
    page('law-transcript', 'Request Law Transcript', 'Open the College of Law transcript process.'),
    page('med-transcript', 'Request Med Transcript', 'Open the College of Medicine records process.')
  ] },
  { id: 'graduation', label: 'Graduation/Commencement', icon: 'graduation', items: [
    page('apply-graduate', 'Apply to Graduate', 'Prepare and save a local graduation application draft.'),
    page('graduation-status', 'View Graduation Status', 'Track your local draft separately from degree certification.'),
    page('commencement', 'Commencement Ceremony', 'Find ceremony, ticket, accessibility, and RSVP information.'),
    page('graduation-deadlines', 'Grad Application Deadlines', 'Find application and diploma-update deadlines.'),
    page('diploma', 'Electronic Diploma', 'Understand access to your certified electronic credential.'),
    page('law-commencement', 'Law Student Commencement', 'Find College of Law graduation and ceremony guidance.'),
    page('bar-exam', 'Law Student State Bar Exam', 'Find bar resources and registrar certification requests.')
  ] },
  { id: 'progress', label: 'Academic Progress', icon: 'chart', items: [
    page('degree-audit', 'Get My Degree Audit', 'Review earned, in-progress, and remaining requirements.'),
    page('graduation-plan', 'My Graduation Plan', 'Arrange remaining coursework by future semester.'),
    page('what-if', "Run a 'What-if' Report", 'Explore an alternative sample program without changing your major.'),
    page('transfer-credit', 'Transfer Credit Evaluation', 'Record a transfer-credit question and compare sample equivalencies.'),
    page('bearcat-network', 'My Bearcat Network', 'Connect with academic and co-op advising.')
  ] }
];
export const ACADEMIC_PAGES = ACADEMIC_GROUPS.flatMap(g => g.items.map(p => ({ ...p, group: g.label, groupId: g.id, icon: g.icon })));
export const academicPage = route => ACADEMIC_PAGES.find(p => p.href.split('?')[0] === `#/${route}`);
export function academicGroup(route) {
  return route === 'classes' ? 'classes' : route === 'progress' ? 'progress' : academicPage(route)?.groupId;
}
export const termLabel = id => id.replace(/^(\w+)-(\d{4})$/, (_, season, year) => `${season[0].toUpperCase()}${season.slice(1)} ${year}`);
export const termRank = id => Number(id.split('-')[1]) * 3 + ({ spring: 0, summer: 1, fall: 2 }[id.split('-')[0]] ?? 0);
export function planningTerms(profile) {
  const target=(profile.graduation??'Spring 2028').toLowerCase().replace(' ','-');
  const limit=Math.max(termRank(target),termRank('spring-2028'));
  const terms=[];
  for(let year=2027;year<=Math.floor(limit/3);year++) for(const season of ['spring','summer','fall']) {
    const id=`${season}-${year}`;if(termRank(id)<=limit)terms.push(id);
  }
  return [...new Set([...terms,...profile.plan.terms.filter(t=>termRank(t.id)>termRank('fall-2026')).map(t=>t.id)])].sort((a,b)=>termRank(a)-termRank(b));
}
export function recordTerms(profile, state) {
  const ids = new Set([...profile.plan.terms.map(t => t.id), ...profile.transcript.entries.map(e => e.term), ...Object.keys(state.enrolledByTerm)]);
  return [...ids].sort((a,b) => termRank(b)-termRank(a));
}
export function academicRows(profile, state) {
  const graded = profile.transcript.entries.map((e,i) => ({ ...e, id: `${e.code}-${e.term}-${i}`, title: courseLabel(e.code).replace(`${e.code} — `,''), status: 'Graded' }));
  const current = Object.entries(state.enrolledByTerm).flatMap(([term,courses]) => courses.map(c => ({ ...c, term, grade: term==='fall-2026'?'IP':'—', status: term==='fall-2026'?'In progress':'Enrolled' })));
  return [...graded, ...current].sort((a,b) => termRank(b.term)-termRank(a.term)||a.code.localeCompare(b.code));
}
export function termGrades(profile, state, term) {
  const rows = academicRows(profile,state).filter(r => r.term===term);
  const graded = rows.filter(r => /^[A-DF][+-]?$/.test(r.grade));
  return { rows, earned: rows.filter(r => isPassingGrade(r.grade)).reduce((n,r)=>n+r.credits,0), gpa: graded.length ? cumulativeGPA({entries:graded}).toFixed(3) : null };
}
export const emptyAcademicState = () => ({ reports: [], graduationDraft: null, plan: {}, transfers: [] });
export function hydrateAcademics(raw, profile) {
  const base=emptyAcademicState();
  if (!raw || typeof raw!=='object') return base;
  const known=new Set(profile.plan.terms.flatMap(t=>t.courses.map(c=>c.code)));
  const terms=new Set(planningTerms(profile));
  const d=raw.graduationDraft;
  const draft=d && typeof d.name==='string' && d.name.trim() && typeof d.term==='string' && /^(Spring|Summer|Fall) \d{4}$/.test(d.term) && typeof d.savedAt==='string' && Number.isFinite(Date.parse(d.savedAt)) ? {name:d.name.slice(0,100),term:d.term.slice(0,40),ceremony:d.ceremony===true,savedAt:d.savedAt} : null;
  return { ...base, graduationDraft:draft,
    plan:Object.fromEntries(Object.entries(raw.plan??{}).filter(([code,term])=>known.has(code)&&terms.has(term))),
    reports:Array.isArray(raw.reports)?raw.reports.filter(r=>r&&typeof r.id==='string'&&['Unofficial Record','Enrollment Letter','Degree Letter'].includes(r.type)&&Number.isFinite(Date.parse(r.createdAt))).map(r=>({id:r.id.slice(0,80),type:r.type,createdAt:r.createdAt,term:TERMS.some(t=>t.id===r.term)?r.term:'fall-2026'})).slice(0,20):[],
    transfers:Array.isArray(raw.transfers)?raw.transfers.filter(r=>r&&typeof r.institution==='string'&&typeof r.course==='string'&&Number.isFinite(r.credits)&&r.credits>0&&r.credits<=12).map(r=>({id:String(r.id).slice(0,80),institution:r.institution.slice(0,100),course:r.course.slice(0,40),credits:r.credits,equivalent:known.has(r.equivalent)?r.equivalent:'',status:'Needs advisor review'})).slice(0,20):[]
  };
}
export function repeatedPairs(profile) {
  const entries=profile.transcript.entries.filter(e=>/^[A-DF][+-]?$/.test(e.grade)).sort((a,b)=>termRank(a.term)-termRank(b.term));
  return [...new Set(entries.map(e=>e.code))].flatMap(code=>{const attempts=entries.filter(e=>e.code===code);const repeated=attempts.at(-1);return attempts.slice(0,-1).filter(a=>termRank(a.term)<termRank(repeated.term)).map(original=>({code,original,repeated}));});
}
export function graduationDraft(input) {
  const errors=[];
  if (!input.name?.trim()) errors.push('Enter the name you want to review for your diploma.');
  if (!/^(Spring|Summer|Fall) \d{4}$/.test(input.term??'')) errors.push('Choose a graduation term.');
  if (!input.reviewed) errors.push('Confirm that you have reviewed the sample program and understand this is a local draft.');
  return errors.length?{ok:false,errors}:{ok:true,draft:{name:input.name.trim().slice(0,100),term:input.term.slice(0,40),ceremony:input.ceremony===true,savedAt:new Date().toISOString()}};
}
export const WHAT_IF_PROGRAMS = [
  {id:'cs',name:'Computer Science · sample B.S.',minimum:126,codes:['CS1021C','CS2011','CS2028C','CS3003','CS4033','CS5001','CS5002']},
  {id:'data',name:'Data Science · illustrative scenario',minimum:120,codes:['MATH1061','MATH1062','MATH2076','STAT2037','CS1021C','CS2028C','CS5177']},
  {id:'software',name:'Software Engineering · illustrative certificate',minimum:18,codes:['CS2028C','CS3003','CS4071','CS4092','CS5001','CS5002']}
];
export const ACADEMIC_RESOURCES = {
  'official-transcript': {title:'Order your official academic record',intro:'UC uses Parchment to process official transcript orders. Review your posted grades, degree information, and recipient details before continuing.',steps:['Check the sample course history to understand the record layout.','Open the official UC instructions or Parchment portal.','Sign in and complete any actual order with the university’s provider.'],links:[['Order through Parchment',OFFICIAL.parchment],['UC transcript instructions',OFFICIAL.transcripts]],related:['course-history','unofficial-record'],note:'Orders, fees, delivery, and tracking are handled by Parchment. This prototype does not place an order.'},
  'law-transcript': {title:'College of Law transcripts',intro:'JD coursework has a separate transcript ordering process from the main campus record.',steps:['Confirm whether you need a JD record or a main-campus record.','Read the College of Law’s ordering instructions.','Continue through the college’s designated ordering service.'],links:[['Open Law transcript instructions',OFFICIAL.lawTranscript],['Main-campus transcript options',OFFICIAL.transcripts]],note:'The undergraduate sample profile does not contain a JD transcript.'},
  'med-transcript': {title:'College of Medicine records',intro:'MD transcripts and verification requests are handled through Medical Student Records.',steps:['Identify whether the request concerns MD or non-MD coursework.','Follow the College of Medicine’s guidance for current students or alumni.','Use the designated records or ordering service.'],links:[['Open Medicine records',OFFICIAL.medicine],['Main-campus transcript options',OFFICIAL.transcripts]],note:'The undergraduate sample profile does not contain an MD transcript.'},
  calendar: {title:'Semester calendars',intro:'Choose the official semester calendar for class dates, breaks, examination periods, and university holidays.',steps:['Select the appropriate semester on the Registrar’s calendar site.','Check the full-session or part-of-term calendar for your class.','Use the confirmed schedule here for your sample class meeting times.'],links:[['Open UC academic calendars',OFFICIAL.calendar]],related:['deadlines','graduation-deadlines'],note:'Calendar dates are maintained by UC. The prototype’s sample meeting dates are illustrative.'},
  deadlines: {title:'Registration and record deadlines',intro:'Keep the correct semester and session in view when checking registration, withdrawal, grading, and record-change deadlines.',steps:['Open UC’s Dates and Deadlines calendar.','Find the semester and session matching your class.','Check any additional college requirements with your advisor.'],links:[['Open official dates and deadlines',OFFICIAL.calendar]],related:['graduation-deadlines','term-information'],note:'Personal target dates in Tasks & reminders are separate from official university deadlines.'},
  'graduation-deadlines': {title:'Graduation application dates',intro:'The Registrar publishes application windows, commencement RSVP deadlines, and diploma name/address update deadlines.',steps:['Choose your intended graduation term on UC’s application page.','Check application availability and the closing deadline.','Review the separate RSVP and diploma-update dates.'],links:[['View current graduation deadlines',OFFICIAL.graduation]],related:['apply-graduate','graduation-status'],note:'Use UC’s current table as the source of truth. Local application drafts do not satisfy an official deadline.'},
  commencement: {title:'Plan for your ceremony',intro:'Find ceremony details, graduate instructions, guest information, tickets, and accessibility support through the university’s commencement website.',steps:['Review the graduate instructions for your ceremony.','Check RSVP requirements through the official graduation process.','Confirm tickets and accessibility arrangements through the published contacts.'],links:[['Open UC Commencement',OFFICIAL.commencement],['Graduation application information',OFFICIAL.graduation]],related:['graduation-status','graduation-deadlines'],note:'Saving a ceremony preference in a local draft does not reserve a seat or request tickets.'},
  diploma: {title:'Your electronic diploma',intro:'An electronic diploma becomes available after the university certifies the awarded degree. It is separate from a transcript or an enrollment letter.',steps:['Check your official graduation and degree certification status.','Follow UC’s electronic diploma delivery and access instructions.','Use the official credential service when a diploma is issued.'],links:[['Electronic diploma instructions',OFFICIAL.diploma]],related:['graduation-status','enrollment-letter'],note:'No degree has been conferred and no electronic diploma has been issued in this sample record.'},
  'law-commencement': {title:'College of Law graduation',intro:'Law students should follow the College of Law’s degree, graduation, and ceremony procedures.',steps:['Check College of Law student resources.','Confirm graduation requirements and college instructions with the Law Registrar.','Review university ceremony information where applicable.'],links:[['Open Law student resources',OFFICIAL.law],['UC ceremony information',OFFICIAL.commencement]],note:'This undergraduate sample is not a Law graduation application.'},
  'bar-exam': {title:'State bar examination resources',intro:'Bar applications, deadlines, and certification requirements depend on the jurisdiction. The College of Law provides resources and a registrar request process.',steps:['Use the Law student resources to find current bar guidance.','Check the relevant jurisdiction’s official admission requirements.','Request required registrar documentation through the College of Law.'],links:[['Law student and bar resources',OFFICIAL.law],['Request registrar documentation',OFFICIAL.lawForms]],note:'No bar application or certification request is submitted from this prototype.'},
  'learning-community': {title:'Learning communities and linked classes',intro:'Some academic pathways coordinate several classes as a group. Ask your advisor about the appropriate community and any linked registration requirements.',steps:['Review your academic program and current schedule.','Confirm the linked classes and approved section combinations with an advisor.','Complete community registration in the official student system.'],links:[['Open official Catalyst',OFFICIAL.catalyst],['Connect with advising',OFFICIAL.advising]],related:['bearcat-network','term-information'],note:'The sample catalog supports individual sections; it does not register linked course bundles.'},
  'edit-enrollment': {title:'Review your enrollment details',intro:'Review section, credits, format, and meeting information before changing an enrollment.',steps:['Open My Class Schedule and select the correct semester.','Use Swap Classes for a checked section replacement or Drop Classes to remove a class.','Use official Catalyst for grading-basis or other university record changes.'],links:[['Open official enrollment editor',OFFICIAL.catalyst]],related:['swap','drop'],note:'Credit amounts and grading bases in the sample catalog are fixed. No university record is edited here.'}
};
export function whatIf(profile, program) {
  const passed=new Set(profile.transcript.entries.filter(e=>isPassingGrade(e.grade)).map(e=>e.code));
  const matches=program.codes.filter(c=>passed.has(c));
  const missing=program.codes.filter(c=>!passed.has(c));
  return {matches,missing,percent:Math.round(matches.length/program.codes.length*100)};
}
export function reportHTML(profile, state, report) {
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const heading=esc(report.type);
  const rows=academicRows(profile,state);
  const enrollment=state.enrolledByTerm[report.term]??[];
  const content=report.type==='Unofficial Record'?`<table><thead><tr><th>Term</th><th>Course</th><th>Title</th><th>Credits</th><th>Grade</th></tr></thead><tbody>${rows.map(r=>`<tr><td>${esc(termLabel(r.term))}</td><td>${esc(r.code)}</td><td>${esc(r.title)}</td><td>${r.credits}</td><td>${esc(r.grade)}</td></tr>`).join('')}</tbody></table>`:report.type==='Degree Letter'?'<p>No degree has been conferred in this sample record. A degree verification letter cannot be issued.</p>':`<p>${esc(profile.name)} has ${enrollment.reduce((n,c)=>n+c.credits,0)} credits in the sample ${esc(termLabel(report.term))} schedule.</p><ul>${enrollment.map(c=>`<li>${esc(c.code)} — ${esc(c.title)} (${c.credits} credits)</li>`).join('')}</ul>`;
  return `<!doctype html><html lang="en"><meta charset="utf-8"><title>Sample ${heading}</title><style>body{font:16px system-ui;max-width:960px;margin:40px auto;padding:24px;color:#171717}h1{font-family:Georgia}table{width:100%;border-collapse:collapse}th,td{padding:10px;text-align:left;border-bottom:1px solid #ccc}header{border-bottom:3px solid #9c1515}.stamp{font-weight:bold;color:#9c1515}@media print{button{display:none}}</style><header><p class="stamp">SAMPLE — NOT AN OFFICIAL UNIVERSITY DOCUMENT</p><h1>${heading}</h1></header><p>${esc(profile.name)} · ${esc(profile.studentId)}</p><p>Generated ${esc(new Date(report.createdAt).toLocaleString())} · ${esc(report.id)}</p>${content}<p>This prototype uses synthetic academic records. No university seal, certification, or official signature is represented.</p></html>`;
}

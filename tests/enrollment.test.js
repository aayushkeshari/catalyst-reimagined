import test from 'node:test';
import assert from 'node:assert/strict';
import { PROFILES,sectionById } from '../src/lib/catalog.js';
import { createState,hydrateState,addToCart,enrollSections,validateBatch,eligibility,waitlistSection,dropSection,academicSummary,conflictBetween,searchSections,scheduleICS,creditSum } from '../src/lib/model.js';
const senior=PROFILES[0],freshman=PROFILES[1],term='spring-2027';
const id=(code,section='001')=>`${code}-${section}-spring-2027`;
const s=(code,section='001')=>sectionById(id(code,section));
test('future plan is not mistaken for enrollment',()=>{for(const p of PROFILES){const state=createState(p);assert.equal(state.enrolledByTerm[term].length,0);assert.equal(state.enrolledByTerm['fall-2026'].length,5);assert.equal(creditSum(state.enrolledByTerm['fall-2026']),15);}});
test('cart belongs to the selected offering term and rejects closed-term changes',()=>{const state=createState(senior);const result=addToCart(state,id('CS5002'),term);assert.equal(result.ok,true);assert.deepEqual(result.state.cartByTerm[term],[id('CS5002')]);assert.equal(result.state.cartByTerm['fall-2026'],undefined);assert.equal(addToCart(state,id('CS5002'),'fall-2026').ok,false);assert.equal(enrollSections(state,senior,[id('CS5002')],'fall-2026').ok,false);});
test('two sections of the same course cannot enter the cart',()=>{const one=addToCart(createState(senior),id('CS5167'),term).state;assert.equal(addToCart(one,id('CS5167','002'),term).ok,false);});
test('batch review catches overlapping sections and makes no partial mutation',()=>{const state=createState(senior);const before=JSON.stringify(state);const result=enrollSections(state,senior,[id('CS5002'),id('CS5167')],term);assert.equal(result.ok,false);assert.ok(result.problems.some(p=>p.errors.some(e=>e.code==='conflict')));assert.equal(JSON.stringify(state),before);});
test('choosing an alternative section resolves the overlap and records a receipt',()=>{let state=createState(senior);for(const course of [id('CS5002'),id('CS5167','002')])state=addToCart(state,course,term).state;const result=enrollSections(state,senior,state.cartByTerm[term],term,'2026-11-14T20:00:00.000Z');assert.equal(result.ok,true);assert.equal(result.receipt.credits,6);assert.equal(result.state.enrolledByTerm[term].length,2);assert.equal(result.state.cartByTerm[term].length,0);assert.equal(result.state.receipts.length,1);assert.equal(result.receipt.timestamp,'2026-11-14T20:00:00.000Z');});
test('missing prerequisites block freshman advanced enrollment',()=>{const result=enrollSections(createState(freshman),freshman,[id('CS5167')],term);assert.equal(result.ok,false);assert.ok(result.problems[0].errors.some(e=>e.code==='prerequisite'&&e.message.includes('CS2028C')));});
test('current in-progress prerequisites support next-term planning conditionally',()=>{const result=enrollSections(createState(freshman),freshman,[id('CS2011')],term);assert.equal(result.ok,true);});
test('full section cannot enroll but can enter a waitlist with eligible prerequisites',()=>{const state=createState(senior);assert.equal(enrollSections(state,senior,[id('CS5177')],term).ok,false);const result=waitlistSection(state,senior,id('CS5177'),term);assert.equal(result.ok,true);assert.equal(result.state.enrolledByTerm[term].length,0);assert.deepEqual(result.state.waitlistByTerm[term],[id('CS5177')]);assert.equal(waitlistSection(result.state,senior,id('CS5177'),term).ok,false);});
test('waitlist does not bypass prerequisite checks',()=>{assert.equal(waitlistSection(createState(freshman),freshman,id('CS5177'),term).ok,false);});
test('same course cannot be enrolled twice via different sections',()=>{const state=enrollSections(createState(senior),senior,[id('CS5167','002')],term).state;const errors=eligibility(state,senior,s('CS5167'),term);assert.ok(errors.some(e=>e.code==='duplicate'));});
test('credit limit blocks an overload',()=>{const state=createState(senior);state.enrolledByTerm[term]=[{id:'credits',code:'DEMO',credits:17,meetings:[]}];assert.ok(eligibility(state,senior,s('MUSC1001'),term).some(e=>e.code==='credits'));});
test('registration holds are actionable failures',()=>{const blocked={...senior,holds:['Academic advising hold']};assert.ok(eligibility(createState(blocked),blocked,s('CS5002'),term).some(e=>e.code==='hold'));});
test('back-to-back meetings are allowed; overlapping days are not',()=>{const a={meetings:[{days:['Mon'],start:'10:00',end:'11:00'}]};assert.equal(conflictBetween(a,{meetings:[{days:['Mon'],start:'11:00',end:'12:00'}]}),false);assert.equal(conflictBetween(a,{meetings:[{days:['Tue'],start:'10:30',end:'12:00'}]}),false);assert.equal(conflictBetween(a,{meetings:[{days:['Mon'],start:'10:59',end:'12:00'}]}),true);});
test('drop changes only the target term and preserves historical receipt',()=>{const enrolled=enrollSections(createState(senior),senior,[id('CS5002')],term).state;const result=dropSection(enrolled,id('CS5002'),term);assert.equal(result.ok,true);assert.equal(result.state.enrolledByTerm[term].length,0);assert.equal(result.state.receipts.length,1);assert.equal(result.state.enrolledByTerm['fall-2026'].length,5);assert.equal(dropSection(enrolled,enrolled.enrolledByTerm['fall-2026'][0].id,'fall-2026').ok,false);});
test('profile hydration prevents cross-profile records and unknown sections',()=>{const state=createState(senior);state.cartByTerm[term]=[id('CS5002'),'unknown',id('CS5002')];assert.deepEqual(hydrateState(state,senior).cartByTerm[term],[id('CS5002')]);assert.equal(hydrateState(state,freshman).userId,'joel');assert.equal(hydrateState(state,freshman).cartByTerm[term],undefined);assert.equal(hydrateState({version:1},senior).version,2);});
test('earned and in-progress credits stay separate after future enrollment',()=>{const state=enrollSections(createState(senior),senior,[id('CS5002')],term).state;const summary=academicSummary(senior,state);assert.equal(summary.earned,96);assert.equal(summary.underway,15);assert.equal(summary.remaining,15);const first=academicSummary(freshman,createState(freshman));assert.equal(first.earned,0);assert.equal(first.gpa,null);assert.equal(first.remaining,111);});
test('search accepts spaced course codes, combines filters, and restores serialized context',()=>{const state=createState(senior);const context={query:'CS 5167',openOnly:true,mode:'In person',day:'Tue'};state.searchByTerm[term]=context;const restored=hydrateState(JSON.parse(JSON.stringify(state)),senior);assert.equal(restored.searchByTerm[term].query,context.query);assert.equal(restored.searchByTerm[term].day,'Tue');const results=searchSections(context,restored,term);assert.equal(results.length,1);assert.equal(results[0].section,'002');assert.equal(searchSections({...context,day:'Fri'},state,term).length,0);});
test('unknown sections cannot create an enrollment receipt',()=>{assert.equal(enrollSections(createState(senior),senior,['invalid'],term).ok,false);assert.equal(enrollSections(createState(senior),senior,[],term).ok,false);assert.equal(validateBatch(createState(senior),senior,['invalid'],term)[0].errors[0].code,'unknown');});
test('calendar export has recurring events with term-specific dates and escaping',()=>{const value=scheduleICS([s('CS5167','002')],term);assert.match(value,/BEGIN:VCALENDAR\r\n/);assert.match(value,/DTSTART;TZID=America\/New_York:20270112T130000/);assert.match(value,/BYDAY=TU,TH/);assert.match(value,/UNTIL=20270424T235959Z/);assert.ok(value.endsWith('END:VCALENDAR\r\n'));});

test('corrupt stored filter values and receipts cannot break the workspace',()=>{const state=createState(senior);state.searchByTerm[term]={query:99,subject:[],day:null};state.receipts=[null,{id:'bad',courses:[]}];const restored=hydrateState(state,senior);assert.equal(restored.searchByTerm[term].query,'');assert.equal(restored.receipts.length,0);assert.ok(searchSections(restored.searchByTerm[term],restored,term).length>0);});
 test('enrolling an alternative section clears waitlists for the same course',()=>{const waiting=waitlistSection(createState(senior),senior,id('CS5167','003'),term).state;const result=enrollSections(waiting,senior,[id('CS5167','002')],term);assert.equal(result.ok,true);assert.deepEqual(result.state.waitlistByTerm[term],[]);});

test('time bounds are inclusive and apply to every scheduled section',()=>{
  const state=createState(senior);
  const results=searchSections({query:'CS5002',startAfter:'09:30',endBefore:'10:50'},state,term);
  assert.deepEqual(results.map(s=>s.section),['002']);
  assert.deepEqual(searchSections({startAfter:'14:00',endBefore:'10:00'},state,term),[]);
  assert.deepEqual(searchSections({startAfter:'10:00',endBefore:'10:00'},state,term),[]);
  assert.ok(searchSections({query:'CS5167'},state,term).some(s=>!s.meetings.length));
  assert.ok(searchSections({startAfter:'00:00'},state,term).every(s=>s.meetings.length));
});
test('campus-day filter follows the selected term cart and enrollment',()=>{
  let state=createState(senior);
  assert.ok(searchSections({fitCampusDays:true},state,term).length>0);
  state=addToCart(state,id('CS5002'),term).state;
  const matches=searchSections({fitCampusDays:true},state,term);
  assert.ok(matches.some(s=>s.code==='CS5167'&&s.section==='001'));
  assert.ok(!matches.some(s=>s.code==='CS5167'&&s.section==='002'));
  assert.ok(matches.some(s=>!s.meetings.length));
  state=enrollSections(state,senior,[id('CS5002')],term).state;
  assert.ok(!searchSections({fitCampusDays:true},state,term).some(s=>s.meetings.some(m=>m.days.includes('Tue'))));
});
test('new filters and valid personal dates survive hydration without crossing profiles',()=>{
  const state=createState(senior);
  state.searchByTerm[term]={startAfter:'09:30',endBefore:'15:00',fitCampusDays:true};
  state.taskDates={'spring-plan':'2026-11-20',advisor:'2026-02-30',contact:'bad',unknown:'2026-11-25'};
  const restored=hydrateState(JSON.parse(JSON.stringify(state)),senior);
  assert.equal(restored.searchByTerm[term].startAfter,'09:30');
  assert.equal(restored.searchByTerm[term].endBefore,'15:00');
  assert.equal(restored.searchByTerm[term].fitCampusDays,true);
  assert.deepEqual(restored.taskDates,{'spring-plan':'2026-11-20'});
  assert.deepEqual(hydrateState(state,freshman).taskDates,{});
  state.searchByTerm[term]={startAfter:'24:00',endBefore:900};
  assert.equal(hydrateState(state,senior).searchByTerm[term].startAfter,'');
});
test('prerequisite errors name the required course',()=>{
  const errors=eligibility(createState(freshman),freshman,s('CS5167'),term);
  assert.ok(errors.some(e=>e.code==='prerequisite'&&e.message.includes('CS2028C')&&e.message.includes('Data Structures')));
});
test('personal target dates handle leap years and urgency without invented deadlines',async()=>{
  const {validTaskDate,taskDateStatus,keyboardShortcut}=await import('../src/lib/model.js');
  assert.equal(validTaskDate('2028-02-29'),true);
  assert.equal(validTaskDate('2027-02-29'),false);
  assert.equal(taskDateStatus('2026-11-13','2026-11-14'),'Overdue');
  assert.equal(taskDateStatus('2026-11-14','2026-11-14'),'Today');
  assert.equal(taskDateStatus('2026-11-15','2026-11-14'),'Upcoming');
  assert.equal(taskDateStatus('','2026-11-14'),'No personal target');
  assert.equal(keyboardShortcut('MacIntel'),'⌘ K');
  assert.equal(keyboardShortcut('Win32'),'Ctrl K');
  assert.equal(keyboardShortcut('Linux x86_64'),'Ctrl K');
});

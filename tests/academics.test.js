import test from 'node:test';
import assert from 'node:assert/strict';
import { PROFILES,SECTIONS } from '../src/lib/catalog.js';
import { createState,hydrateState,enrollSections,swapSection,academicSummary } from '../src/lib/model.js';
import { termGrades,academicRows,recordTerms,repeatedPairs,graduationDraft,hydrateAcademics,planningTerms,whatIf,WHAT_IF_PROGRAMS,reportHTML,ACADEMIC_GROUPS } from '../src/lib/academics.js';
const profile=PROFILES[0];
const section=(code,num)=>SECTIONS.find(s=>s.code===code&&s.section===num).id;

test('term grade reports separate final grades, current coursework, and future enrollment',()=>{
  const state=createState(profile);
  const historical=termGrades(profile,state,'fall-2022');
  assert.equal(historical.rows.length,7);assert.equal(historical.earned,18);assert.ok(Number(historical.gpa)>0);
  const current=termGrades(profile,state,'fall-2026');
  assert.equal(current.gpa,null);assert.equal(current.earned,0);assert.ok(current.rows.every(r=>r.grade==='IP'));
  const next=enrollSections(state,profile,[section('CS5002','001')],'spring-2027').state;
  assert.equal(termGrades(profile,next,'spring-2027').rows[0].grade,'—');
  assert.equal(termGrades(profile,next,'spring-2027').gpa,null);
  assert.ok(recordTerms(profile,next).indexOf('spring-2027')<recordTerms(profile,next).indexOf('fall-2026'));
});
test('academic drafts, reports, plans, and transfer questions persist without awarding credit',()=>{
  const state=createState(profile),before=academicSummary(profile,state);
  const draft=graduationDraft({name:'Sample Name',term:'Spring 2027',ceremony:true,reviewed:true}).draft;
  state.academics={graduationDraft:draft,reports:[{id:'REPORT-1',type:'Unofficial Record',term:'fall-2026',createdAt:new Date().toISOString()}],plan:{CS5002:'fall-2027'},transfers:[{id:'T1',institution:'Example College',course:'CSC 101',credits:3,equivalent:'CS1021C',status:'Approved'}]};
  const restored=hydrateState(JSON.parse(JSON.stringify(state)),profile);
  assert.equal(restored.academics.graduationDraft.name,'Sample Name');assert.equal(restored.academics.plan.CS5002,'fall-2027');
  assert.equal(restored.academics.reports.length,1);assert.equal(restored.academics.transfers[0].status,'Needs advisor review');
  assert.deepEqual(academicSummary(profile,restored),before);
  assert.equal(hydrateState(state,PROFILES[1]).academics.graduationDraft,null);
  assert.ok(planningTerms(PROFILES[1]).some(term=>term.endsWith('2030')));
});
test('corrupt academic storage cannot restore invalid report types, dates, courses, or transfer credits',()=>{
  const restored=hydrateAcademics({graduationDraft:{name:'X',term:'Spring 2027',savedAt:'bad'},reports:[{id:'bad',type:'Official Transcript',createdAt:new Date().toISOString()}],plan:{UNKNOWN:'spring-2027',CS5002:'bad'},transfers:[{institution:'X',course:'Y',credits:-3}]},profile);
  assert.equal(restored.graduationDraft,null);assert.deepEqual(restored.reports,[]);assert.deepEqual(restored.plan,{});assert.deepEqual(restored.transfers,[]);
});
test('a graduation draft requires a name, valid term, and explicit review',()=>{
  assert.equal(graduationDraft({name:' ',term:'bad',reviewed:false}).errors.length,3);
  assert.equal(graduationDraft({name:' A Student ',term:'Spring 2027',reviewed:true}).draft.name,'A Student');
});
test('repeated-course pairs compare the same course with its most recent graded attempt regardless of input order',()=>{
  const p={transcript:{entries:[{code:'CS101',grade:'B',term:'fall-2024',credits:3},{code:'CS101',grade:'C',term:'fall-2022',credits:3},{code:'CS102',grade:'A',term:'fall-2023',credits:3},{code:'CS101',grade:'IP',term:'spring-2025',credits:3}]}};
  const pairs=repeatedPairs(p);assert.equal(pairs.length,1);assert.equal(pairs[0].original.term,'fall-2022');assert.equal(pairs[0].repeated.term,'fall-2024');
});
test('what-if comparisons leave the current program, transcript, enrollment, and earned credits unchanged',()=>{
  const state=createState(profile),before=JSON.stringify({profile,state});
  const result=whatIf(profile,WHAT_IF_PROGRAMS[1]);assert.ok(result.matches.length>0);assert.ok(result.missing.includes('CS5177'));
  assert.equal(JSON.stringify({profile,state}),before);
});
test('sample report exports escape record text and cannot claim an awarded degree',()=>{
  const state=createState(profile),p={...profile,name:'<script>alert(1)</script>'};
  const report={id:'R1',type:'Unofficial Record',term:'fall-2026',createdAt:new Date().toISOString()};
  const html=reportHTML(p,state,report);assert.ok(!html.includes('<script>'));assert.ok(html.includes('&lt;script&gt;'));assert.ok(html.includes('Unofficial student record'));
  assert.ok(reportHTML(profile,state,{...report,type:'Degree Letter'}).includes('No degree has been conferred'));
  assert.equal(academicRows(profile,state).filter(r=>r.status==='In progress').length,5);
});
test('failed swaps preserve the existing enrollment and receipts; successful swaps replace atomically',()=>{
  let state=enrollSections(createState(profile),profile,[section('CS5002','001'),section('CS5167','002')],'spring-2027').state;
  const before=JSON.stringify(state);
  const failed=swapSection(state,profile,section('CS5167','002'),section('CS5167','001'),'spring-2027');
  assert.equal(failed.ok,false);assert.match(failed.message,/Overlaps/);assert.equal(JSON.stringify(state),before);
  const full=swapSection(state,profile,section('CS5167','002'),section('CS5177','001'),'spring-2027');assert.equal(full.ok,false);assert.equal(JSON.stringify(state),before);
  const success=swapSection(state,profile,section('CS5167','002'),section('CS5124','001'),'spring-2027');assert.equal(success.ok,true);
  assert.deepEqual(success.state.enrolledByTerm['spring-2027'].map(s=>s.code),['CS5002','CS5124']);assert.equal(success.receipt.swapFrom.code,'CS5167');
  assert.equal(swapSection(state,profile,section('CS5167','002'),section('CS5124','001'),'fall-2026').ok,false);
});
test('academic navigation preserves the five reference sections and unique child destinations',()=>{
  assert.deepEqual(ACADEMIC_GROUPS.map(g=>g.label),['Classes and Schedule','Calendars and Deadlines','Grades/Transcript/Enroll Cert','Graduation/Commencement','Academic Progress']);
  const items=ACADEMIC_GROUPS.flatMap(g=>g.items);assert.equal(new Set(items.map(i=>i.id)).size,items.length);assert.equal(ACADEMIC_GROUPS[2].items.length,9);assert.equal(ACADEMIC_GROUPS[3].items.length,7);assert.equal(ACADEMIC_GROUPS[4].items.length,5);
});

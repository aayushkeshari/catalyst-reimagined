import test from 'node:test';
import assert from 'node:assert/strict';
import {COURSES,PROFILES,SECTIONS,sectionById} from '../src/lib/catalog.js';
import {createState,addToCart,hydrateState,enrollSections,searchSections,swapSection,scheduleICS,conflictBetween} from '../src/lib/model.js';
const profile=PROFILES[0],term='spring-2027';
const supplied=[...new Set(profile.plan.terms.flatMap(t=>t.courses.map(c=>c.code)))];
const id=(code,num='001')=>`${code}-${num}-${term}`;
test('all 45 supplied courses are searchable and can enter the selected term planning cart',()=>{
  assert.equal(supplied.length,45);assert.equal(COURSES.length,50);assert.equal(new Set(COURSES.map(c=>c.code)).size,50);
  let state=createState(profile);
  for(const code of supplied){const course=COURSES.find(c=>c.code===code);assert.ok(course,code);assert.ok(searchSections({query:code},state,term).some(s=>s.code===code));const added=addToCart(state,course.sections[0].id,term);assert.equal(added.ok,true,code);state=added.state;}
  const restored=hydrateState(JSON.parse(JSON.stringify(state)),profile);assert.equal(restored.cartByTerm[term].length,45);assert.equal(restored.enrolledByTerm[term].length,0);
});
test('every catalog course has section 001 and all section identifiers and offering details are usable',()=>{
  assert.equal(SECTIONS.length,74);assert.equal(new Set(SECTIONS.map(s=>s.id)).size,74);
  for(const course of COURSES){assert.ok(course.sections.some(s=>s.section==='001'),course.code);for(const s of course.sections){assert.match(s.section,/^\d{3}$/);assert.equal(s.termId,term);assert.ok(Number.isInteger(s.seats)&&s.seats>=0);assert.notEqual(s.availability,'pending');assert.ok(s.meetings.length||s.mode==='Online');}}
  assert.equal(COURSES.filter(c=>c.sections.length>1).length,23);
});
test('new lecture and lab sections support enrollment, schedule export, persistence, and an alternative-section swap',()=>{
  const state=createState(profile),lecture=sectionById(id('BIOL1081')),lab=sectionById(id('BIOL1081L'));
  assert.equal(conflictBetween(lecture,lab),false);
  const result=enrollSections(state,profile,[lecture.id,lab.id],term);assert.equal(result.ok,true);assert.equal(result.receipt.credits,4);
  const restored=hydrateState(JSON.parse(JSON.stringify(result.state)),profile);assert.equal(restored.enrolledByTerm[term].length,2);assert.match(scheduleICS(restored.enrolledByTerm[term],term),/BYDAY=FR/);
  const swapped=swapSection(restored,profile,lecture.id,id('BIOL1081','002'),term);assert.equal(swapped.ok,true);assert.ok(swapped.state.enrolledByTerm[term].some(s=>s.id===id('BIOL1081','002')));
  const duplicate=enrollSections(state,profile,[lecture.id,id('BIOL1081','002')],term);assert.equal(duplicate.ok,false);assert.ok(duplicate.problems.some(p=>p.errors.some(e=>e.code==='duplicate')));
});
test('new subjects, spaced searches, open seats, and meeting-time filters include the assigned sections',()=>{
  const state=createState(profile);
  assert.deepEqual(searchSections({query:'BIOL 1081',subject:'BIOL'},state,term).map(s=>s.code),['BIOL1081','BIOL1081','BIOL1081L']);
  assert.equal(searchSections({subject:'FAM'},state,term).length,3);
  assert.equal(searchSections({subject:'BIOL',openOnly:true},state,term).length,3);
  assert.deepEqual(searchSections({subject:'BIOL',startAfter:'13:00'},state,term).map(s=>s.code),['BIOL1081L']);
});
test('course credit hours remain separate from fractional credit applied in the academic report',()=>{
  const stats=COURSES.find(c=>c.code==='STAT2037');assert.equal(stats.credits,3);assert.equal(stats.appliedTransferCredits,2.01);assert.equal(profile.transcript.entries.find(e=>e.code==='STAT2037').credits,2.01);assert.equal(COURSES.find(c=>c.code==='MATH1060').credits,5);
});
test('saved planning placeholders migrate to section 001 without creating an enrollment',()=>{
  const state=createState(profile);state.cartByTerm[term]=['BIOL1081-Pending-spring-2027',id('BIOL1081')];state.enrolledByTerm[term]=[{id:'BIOL1081-Pending-spring-2027'}];
  const restored=hydrateState(state,profile);assert.deepEqual(restored.cartByTerm[term],[id('BIOL1081')]);assert.deepEqual(restored.enrolledByTerm[term],[]);
});

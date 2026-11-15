import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,readdirSync} from 'node:fs';
import {PROFILES,initialSchedule} from '../src/lib/catalog.js';
import {createState,hydrateState,academicSummary,eligibility} from '../src/lib/model.js';
import {isPassingGrade,earnedCredits,cumulativeGPA} from '../src/lib/data/progression.js';
import {requirementAudit,unusedCoursework} from '../src/lib/degree-audit.js';
import {academicRows,termGrades,auditHTML} from '../src/lib/academics.js';
const profile=PROFILES[0];
test('supplied rows preserve grades, terms, and source course substitutions',()=>{
  const state=createState(profile),groups=requirementAudit(profile,state);
  assert.equal(groups.length,37);
  for(const [id,code,credits] of [['calculus-i','MATH1060',5],['composition','ESL1080',3],['cs-i','EECE1080C',4],['intermediate-composition','ESL2089',3],['languages','CS3003',3]]){
    const group=groups.find(g=>g.id===id);assert.equal(group.rows[0].code,code);assert.equal(group.rows[0].credits,credits);assert.equal(group.status,'Complete');
  }
  assert.equal(profile.transcript.entries.find(c=>c.code==='CS1100').grade,'P');
  assert.equal(profile.transcript.entries.find(c=>c.code==='CS4033').grade,'B+');
  assert.equal(profile.transcript.entries.find(c=>c.code==='CS5002').term,'spring-2026');
});
test('fractional transfer and split applied credits are counted once and excluded from GPA',()=>{
  const state=createState(profile),stats=requirementAudit(profile,state).find(g=>g.id==='statistics');
  assert.deepEqual(stats.rows.map(c=>[c.code,c.credits,c.grade]),[['ESL1011',0.99,'A'],['STAT2037',2.01,'TA']]);
  assert.equal(stats.earned,3);assert.equal(stats.status,'Complete');
  assert.equal(unusedCoursework(profile).find(c=>c.code==='ESL1011').credits,0.01);
  assert.equal(academicRows(profile,state).filter(c=>c.code==='ESL1011').length,1);
  assert.equal(isPassingGrade('TA'),true);assert.equal(earnedCredits({entries:[{credits:2.01,grade:'TA'},{credits:1,grade:'P'}]}),3.01);
  assert.equal(cumulativeGPA({entries:[{credits:3,grade:'B'},{credits:2.01,grade:'TA'},{credits:1,grade:'P'}]}),3);
});
test('current and planned requirements never become earned credit from report satisfaction flags',()=>{
  const state=createState(profile),groups=requirementAudit(profile,state),summary=academicSummary(profile,state);
  assert.equal(groups.find(g=>g.id==='calculus-ii').status,'In progress');
  assert.equal(groups.find(g=>g.id==='speaking').status,'Planned');
  assert.equal(groups.find(g=>g.id==='speaking').rows[0].term,'spring-2027');
  assert.equal(termGrades(profile,state,'fall-2026').earned,0);
  assert.equal(summary.earned,110.01);assert.equal(summary.underway,16);assert.equal(summary.minimum,125);
  assert.equal(state.enrolledByTerm['spring-2027'].length,0);
  assert.equal(academicRows(profile,state).find(c=>c.code==='COMM1071').status,'Planned');
  assert.ok(!summary.requirements.some(c=>c.code==='HORT4080'));
});
test('source totals stay distinct from calculated course rows and reported cumulative GPA stays distinct from term calculations',()=>{
  const summary=academicSummary(profile,createState(profile));
  assert.equal(profile.audit.reportedTaken,133.01);assert.equal(profile.audit.reportedUnused,3.01);
  assert.equal(summary.gpa,'3.673');assert.equal(termGrades(profile,createState(profile),'fall-2022').gpa,'3.806');
  assert.equal(new Set(profile.plan.terms.flatMap(t=>t.courses).map(c=>c.code)).size,45);
});
test('refresh replaces old fall records while preserving per-student saved work',()=>{
  const state=createState(profile);state.enrolledByTerm['fall-2026']=[{code:'CS5155',credits:3}];state.savedScholarships=['one'];
  const restored=hydrateState(state,profile);
  assert.deepEqual(restored.enrolledByTerm['fall-2026'],initialSchedule(profile));
  assert.ok(restored.enrolledByTerm['fall-2026'].every(c=>c.meetingPending));
  assert.deepEqual(restored.savedScholarships,['one']);
});
test('student-facing source copy contains no demo or placeholder wording',()=>{
  const scan=dir=>readdirSync(dir,{withFileTypes:true}).flatMap(f=>f.isDirectory()?scan(`${dir}/${f.name}`):f.name.endsWith('.svelte')?[`${dir}/${f.name}`]:[]);
  for(const path of scan('src')) assert.doesNotMatch(readFileSync(path,'utf8'),/\b(demo|sample|prototype|fictional|illustrative|synthetic)\b/i,path);
});

test('downloaded audit includes applied rows, statuses, split credits, and escaped student text',()=>{const state=createState(profile),p={...profile,name:'<b>Student</b>'};const html=auditHTML(p,state,academicSummary(p,state));assert.match(html,/Probability and Statistics/);assert.match(html,/0.99/);assert.match(html,/2.01/);assert.match(html,/133.01/);assert.match(html,/&lt;b&gt;Student/);assert.ok(!html.includes('<b>Student'));assert.doesNotMatch(html,/\b(demo|sample|prototype)\b/i);});

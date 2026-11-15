import { isPassingGrade } from './data/progression.js';

const round = n => Math.round((n + Number.EPSILON) * 100) / 100;
export function requirementAudit(profile, state) {
  if (!profile.audit) return [];
  const completed = profile.transcript.entries;
  const current = state.enrolledByTerm['fall-2026'] ?? [];
  const future = Object.entries(state.enrolledByTerm).filter(([term]) => term !== 'fall-2026').flatMap(([term, courses]) => courses.map(c => ({...c, term})));
  const planned = profile.plan.terms.flatMap(t => t.courses.filter(c => c.status === 'planned').map(c => ({...c, term:t.id})));
  return profile.audit.groups.map(group => {
    const rows = group.courses.flatMap(code => {
      const entry = completed.find(c => c.code === code);
      const enrolled = current.find(c => c.code === code);
      const next = future.find(c => c.code === code);
      const plan = planned.find(c => c.code === code);
      const course = entry ?? enrolled ?? next ?? plan;
      if (!course) return [];
      const status = entry && isPassingGrade(entry.grade) ? 'Complete' : enrolled ? 'In progress' : next ? 'Enrolled' : plan ? 'Planned' : 'Remaining';
      return [{...course, term:course.term ?? course.termId, grade:entry?.grade ?? (enrolled ? 'IP' : '—'), credits:group.id==='statistics' && code==='ESL1011' ? 0.99 : course.credits, status}];
    });
    const complete = rows.length === group.courses.length && rows.every(c => c.status === 'Complete');
    const status = complete ? 'Complete' : rows.some(c => c.status === 'In progress') ? 'In progress' : rows.some(c => ['Planned','Enrolled'].includes(c.status)) ? 'Planned' : 'Remaining';
    return {...group, rows, status, earned:round(rows.filter(c=>c.status==='Complete').reduce((sum,c)=>sum+c.credits,0))};
  });
}
export function unusedCoursework(profile) {
  return (profile.audit?.unused ?? []).flatMap(row => {
    const course = profile.transcript.entries.find(c=>c.code===row.code);
    return course ? [{...course,credits:row.credits}] : [];
  });
}

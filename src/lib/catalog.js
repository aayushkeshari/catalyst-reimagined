import arthurPlan from './data/plans/arthur.json' with { type: 'json' };
import joelPlan from './data/plans/joel.json' with { type: 'json' };
import arthurTranscript from './data/transcripts/arthur.json' with { type: 'json' };
import joelTranscript from './data/transcripts/joel.json' with { type: 'json' };

export const TERMS = [
  { id: 'fall-2026', label: 'Fall 2026', short: 'Fall ’26', registrationOpen: false, current: true, reason: 'Fall registration has closed. You can still view your schedule.' },
  { id: 'spring-2027', label: 'Spring 2027', short: 'Spring ’27', registrationOpen: true, current: false, reason: 'Your registration window is open.' }
];
export const PROFILES = [
  { id: 'arthur', name: 'Aayush Keshari', initials: 'AK', year: 'Senior', major: 'Computer Science', degree: 'B.S.', college: 'College of Engineering & Applied Science', studentId: 'DEMO-2027-001', graduation: 'Spring 2027', plan: arthurPlan, transcript: arthurTranscript, holds: [] },
  { id: 'joel', name: 'Joel Miller', initials: 'JM', year: 'First year', major: 'Computer Science', degree: 'B.S.', college: 'College of Engineering & Applied Science', studentId: 'DEMO-2030-012', graduation: 'Spring 2030', plan: joelPlan, transcript: joelTranscript, holds: [] }
];
const meeting = (days, start, end, room) => ({ days, start, end, room });
const section = (course, num, instructor, seats, meetings, options = {}) => ({
  id: `${course}-${num}-spring-2027`, code: course, section: num, termId: 'spring-2027',
  instructor, seats, meetings, mode: meetings.length ? 'In person' : 'Online', campus: meetings.length ? 'Clifton' : 'Online', ...options
});
export const COURSES = [
  { code: 'CS5002', title: 'Computer Science Senior Design II', credits: 3, subject: 'CS', category: 'Major', description: 'Bring your capstone from working prototype to final presentation. Continue your team project through implementation, evaluation, and delivery.', prerequisites: ['CS5001'], sections: [section('CS5002','001','Dr. Yu Zhao',18,[meeting(['Mon','Wed'],'10:00','11:20','Rhodes 801')]), section('CS5002','002','Dr. Yu Zhao',9,[meeting(['Tue','Thu'],'09:30','10:50','Rhodes 801')])] },
  { code: 'CS5167', title: 'User Interface Design', credits: 3, subject: 'CS', category: 'Major', description: 'Design interfaces around the people who use them. Explore prototyping, interaction design, accessibility, and usability evaluation through hands-on projects.', prerequisites: ['CS2028C'], sections: [section('CS5167','001','Prof. Morgan Lee',12,[meeting(['Mon','Wed'],'10:30','11:50','Baldwin 641')]), section('CS5167','002','Prof. Morgan Lee',8,[meeting(['Tue','Thu'],'13:00','14:20','Baldwin 641')]), section('CS5167','003','Prof. Rivera',0,[],{ waitlistAvailable: true })] },
  { code: 'CS5124', title: 'Visual Interfaces', credits: 3, subject: 'CS', category: 'Major', description: 'Explore visual representations and interactive systems for understanding complex information. Build and evaluate a small visualization project.', prerequisites: ['CS2028C'], sections: [section('CS5124','001','Dr. Anika Shah',16,[meeting(['Mon','Wed'],'14:30','15:50','Rhodes 601')])] },
  { code: 'CS5177', title: 'Applied Machine Learning', credits: 3, subject: 'CS', category: 'Major', description: 'Apply supervised and unsupervised learning to practical problems, with an emphasis on evaluation and responsible interpretation.', prerequisites: ['CS4033'], sections: [section('CS5177','001','Dr. Chen',0,[meeting(['Tue','Thu'],'11:00','12:20','Rhodes 601')],{ waitlistAvailable: true })] },
  { code: 'CS2011', title: 'Introduction to Computer Systems', credits: 3, subject: 'CS', category: 'Major', description: 'Understand how programs meet the machine: representation, memory, and the foundations of computer architecture.', prerequisites: ['CS1021C'], sections: [section('CS2011','001','Dr. Reyes',24,[meeting(['Mon','Wed'],'09:00','10:20','Rhodes 100')]), section('CS2011','002','Dr. Reyes',14,[meeting(['Tue','Thu'],'14:30','15:50','Rhodes 100')])] },
  { code: 'MATH1062', title: 'Calculus II', credits: 4, subject: 'MATH', category: 'Major', description: 'Continue with integration techniques, applications, and sequences and series.', prerequisites: ['MATH1061'], sections: [section('MATH1062','001','Dr. Blanco',21,[meeting(['Mon','Wed','Fri'],'11:00','11:50','French 215')])] },
  { code: 'ENGL2089', title: 'Intermediate Composition', credits: 3, subject: 'ENGL', category: 'General education', description: 'Practice research, argument, and writing for varied audiences through a sustained writing project.', prerequisites: ['ENGL1001'], sections: [section('ENGL2089','001','Prof. Hadley',7,[meeting(['Tue','Thu'],'11:00','12:20','McMicken 110')])] },
  { code: 'MUSC1001', title: 'Music Appreciation', credits: 3, subject: 'MUSC', category: 'Elective', description: 'Listen closely and explore how music reflects the cultures and communities that create it. No musical background required.', prerequisites: [], sections: [section('MUSC1001','001','Prof. Ellis',60,[meeting(['Fri'],'10:00','12:50','CCM 3230')])] },
  { code: 'SOCI1001', title: 'Introduction to Sociology', credits: 3, subject: 'SOCI', category: 'General education', description: 'An introduction to social relationships, institutions, and everyday life through a sociological lens.', prerequisites: [], sections: [section('SOCI1001','001','Prof. Davis',19,[meeting(['Mon','Wed'],'09:00','10:20','McMicken 210')]),section('SOCI1001','002','Prof. Davis',25,[])] }
];
export const SECTIONS = COURSES.flatMap(c => c.sections.map(s => ({ ...s, title: c.title, credits: c.credits, subject: c.subject, category: c.category, description: c.description, prerequisites: c.prerequisites })));
export const sectionById = id => SECTIONS.find(s => s.id === id);
const currentTimes = {
  CS5001: meeting(['Mon','Wed'],'13:00','14:20','Rhodes 801'), CS5170: meeting(['Tue','Thu'],'11:00','12:20','Rhodes 801'),
  CS5155: meeting(['Mon','Wed'],'10:00','11:20','Baldwin 641'), CS5165: meeting(['Tue','Thu'],'14:00','15:20','Rhodes 601'), ECON1001: meeting(['Fri'],'09:00','11:50','McMicken 120'),
  CS1100: meeting(['Mon'],'09:00','09:50','Rhodes 100'), CS1021C: meeting(['Tue','Thu'],'11:00','12:20','Rhodes 601'), MATH1061: meeting(['Mon','Wed','Fri'],'10:00','10:50','French 215'), ENGL1001: meeting(['Tue','Thu'],'13:00','14:20','McMicken 110'), ENED1100: meeting(['Mon','Wed'],'14:00','15:20','Baldwin 800')
};
export function initialSchedule(profile) {
  const term = profile.plan.terms.find(t => t.id === 'fall-2026');
  return (term?.courses ?? []).filter(c => c.status === 'in_progress').map(c => ({ id: `${c.code}-001-fall-2026`, code: c.code, section: '001', title: c.title, credits: c.credits, termId: 'fall-2026', instructor: 'Demo faculty', meetings: currentTimes[c.code] ? [currentTimes[c.code]] : [], mode: 'In person', category: c.fulfills || 'Major' }));
}
export const DEADLINES = [
  { day: '02', month: 'NOV', title: 'Spring registration opens', detail: 'Your assigned window is open.', type: 'Registration', done: true },
  { day: '15', month: 'DEC', title: 'Review your spring schedule', detail: 'Demo planning milestone · confirm with your advisor.', type: 'Planning' },
  { day: '11', month: 'JAN', title: 'Spring semester begins', detail: 'Illustrative demo date; verify the official calendar.', type: 'Semester' }
];
export const TASKS = [
  { id: 'spring-plan', title: 'Build your spring schedule', description: 'Find courses, compare sections, and review your enrollment cart.', href: '#/classes', action: 'Plan classes', due: 'Before next semester' },
  { id: 'advisor', title: 'Review your plan with an advisor', description: 'Bring your remaining requirements and any registration questions.', href: '#/services?category=advising', action: 'Find advising', due: 'Recommended' },
  { id: 'contact', title: 'Confirm your contact preferences', description: 'Choose where you want demo reminders to appear.', href: '#/profile', action: 'Review profile', due: 'Any time' }
];
export const SERVICES = [
  { id: 'grades', title: 'Grades & course history', description: 'See completed coursework, grades, and earned credits.', category: 'Records', icon: 'file', href: '#/progress?view=transcript', action: 'View transcript' },
  { id: 'audit', title: 'Degree progress', description: 'Understand your completed, in-progress, and remaining requirements.', category: 'Records', icon: 'chart', href: '#/progress', action: 'View progress' },
  { id: 'enrollment', title: 'Classes & enrollment', description: 'Find your next class and enroll with a clear confirmation.', category: 'Planning', icon: 'calendar', href: '#/classes', action: 'Manage classes' },
  { id: 'advising', title: 'Academic advising', description: 'Get help with requirements, prerequisites, and your academic plan.', category: 'Advising', icon: 'people', href: 'https://www.uc.edu/about/registrar/registration/advising.html', action: 'Open UC advising', external: true },
  { id: 'calendar', title: 'Academic calendar', description: 'Check official term dates and registration deadlines.', category: 'Planning', icon: 'calendar', href: 'https://www.uc.edu/about/registrar/calendars.html', action: 'Open official calendar', external: true },
  { id: 'graduation', title: 'Graduation checklist', description: 'Review a planning checklist for your final semesters.', category: 'Graduation', icon: 'graduation', href: '#/progress?view=graduation', action: 'View checklist' },
  { id: 'finances', title: 'Student finances', description: 'Explore an illustrative account and financial-aid checklist.', category: 'Support', icon: 'wallet', href: '#/finances', action: 'View demo finances' },
  { id: 'access', title: 'Accessibility resources', description: 'Connect with the university for accommodation support.', category: 'Support', icon: 'heart', href: 'https://www.uc.edu/campus-life/accessibility-resources.html', action: 'Open UC resources', external: true },
  { id: 'registrar', title: 'Office of the Registrar', description: 'Find official information about records and registration.', category: 'Records', icon: 'building', href: 'https://www.uc.edu/about/registrar.html', action: 'Open Registrar website', external: true }
];

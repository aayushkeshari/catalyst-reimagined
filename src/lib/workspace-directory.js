// Navigation from the supplied Catalyst screenshots; university actions use official services.
import {WHAT_IF_PROGRAMS,whatIf} from './academics.js';
export const WORKSPACE_ROOTS=[{id:'tasks',label:'Tasks',icon:'check'},{id:'admissions',label:'My Admissions',icon:'graduation'},{id:'tools',label:'Other Tools',icon:'grid'},{id:'quick-links',label:'Quick Links & Helpful Contacts',icon:'external'}];
export const DIRECTORY_LINKS={
 help:'https://www.onestop.uc.edu/other/self-help.html',oneStop:'https://www.onestop.uc.edu/',
 registrar:'https://www.uc.edu/about/registrar.html',bursar:'https://www.uc.edu/about/bursar.html',aid:'https://www.uc.edu/about/financial-aid.html',
 undergraduate:'https://www.admissions.uc.edu/confirm.html',graduate:'https://www.admissions.uc.edu/apply/graduate/gradfaq.html',medicine:'https://med.uc.edu/admissions/medical-student-admissions/how-to-apply/overview',
 residency:'https://www.uc.edu/about/registrar/residency/ohio.html',housing:'https://www.uc.edu/campus-life/housing.html',housingHelp:'https://www.uc.edu/campus-life/housing/contact-support.html',dining:'https://www.uc.edu/campus-life/housing/resident-support/daily-living/meal-plans-dining.html',
 law:'https://www.law.uc.edu/student-life/current-students.html',lawExams:'https://www.law.uc.edu/student-life/registrar-records/scheduled-online-exams.html',
 orientation:'https://www.uc.edu/campus-life/orientation.html',international:'https://www.uc.edu/about/international/admissions/enroll.html',internationalOrientation:'https://www.uc.edu/about/international/admissions/orientation.html',
 campuslink:'https://www.uc.edu/campus-life/csi/student-organizations/CampusLink.html',gradtracker:'https://www.grad.uc.edu/student-life/policies/forms.html',lcms:'https://med.uc.edu/education/medical-student-education/contact-us-staff',medOneStop:'https://med.uc.edu/education/education-resources/med-one-stop',
 library:'https://www.libraries.uc.edu/',shuttle:'https://www.uc.edu/about/parking/transportation/shuttle-services.html',
 technology:'https://www.uc.edu/about/ucit/software-tools.html',itHelp:'https://www.uc.edu/about/ucit/help.html',ucflex:'https://www.uc.edu/about/ucit/software-tools/ucflex.html',
 card:'https://www.uc.edu/campus-life/new-student-services/money-matters/bearcat-card.html',verification:'https://www.uc.edu/about/registrar/transcripts-diplomas-verifications/student-verifications/self-verifications',
 veterans:'https://www.uc.edu/campus-life/veterans/education-benefits/returning-students.html',rights:'https://www.uc.edu/about/right-to-know.html',
 advising:'https://www.onestop.uc.edu/other/academic-advising/advising-tools.html',grad:'https://www.grad.uc.edu/',
 maps:'https://www.uc.edu/about/maps.html',email:'https://mail.uc.edu/',canopy:'https://canopy.uc.edu/',
 parking:'https://www.uc.edu/about/parking.html',safety:'https://www.uc.edu/about/publicsafety.html',nightride:'https://www.uc.edu/about/parking/transportation/shuttle-services.html',bookstore:'https://www.uc.edu/campus-life/new-student-services/uc-fan-gear/shop.html',pharmacy:'https://pharmacy.uc.edu/',operator:'https://ucdirectory.uc.edu/Default.asp',
 immunizations:'https://med.uc.edu/landing-pages/university-health/vaccination/overview',
};
const item=(area,id,label,description,options={})=>({id,label,description,href:`#/${area}/${id}`,icon:'external',...options});
const resource=(area,id,label,description,url,options={})=>item(area,id,label,description,{url,...options});
export const TASK_NAV=[item('tasks','indicators','Service Indicators','Review sample holds/service indicators and the responsible offices.',{icon:'info'}),item('tasks','to-do','To Do List','Review assigned sample university tasks.',{icon:'list'}),item('tasks','reminders','Personal Reminders','Keep your existing personal targets and checklists.',{icon:'check'})];
export const ADMISSION_GROUPS=[
 {id:'information',label:'Admissions Information',icon:'graduation',items:[item('admissions','what-if',"Run a 'What-If' Degree Audit",'Explore and save a sample program comparison.',{icon:'chart'}),resource('admissions','confirm-grad','Confirm Admission GRAD','Review the official graduate admission confirmation instructions.',DIRECTORY_LINKS.graduate),resource('admissions','confirm-ugrd','Confirm Admission UGRD','Review the official undergraduate confirmation steps.',DIRECTORY_LINKS.undergraduate),resource('admissions','confirm-med','Confirm Admission - Med','Find the medical admissions process and applicant portal information.',DIRECTORY_LINKS.medicine)]},
 {id:'started',label:'Links to Get you Started',icon:'arrow',items:[resource('admissions','federal-aid','Apply for Federal Aid','Start with official federal financial aid application guidance.',DIRECTORY_LINKS.aid),resource('admissions','residency','Ohio Residency Requirements','Review the university’s residency information and application process.',DIRECTORY_LINKS.residency)]},
 {id:'housing',label:'Housing and Food Services',icon:'home',items:[resource('admissions','housing-rates','Housing and Meal Plan Rates','Find current rates through official housing and dining resources.',DIRECTORY_LINKS.housing),resource('admissions','housing-undergraduate','Undergraduate Housing','Explore university housing and the application process.',DIRECTORY_LINKS.housing),resource('admissions','housing-graduate','Graduate Student Housing','Find graduate/family housing support and off-campus resources.',DIRECTORY_LINKS.housingHelp),resource('admissions','housing-law','Law Student Housing','Find housing support for your move to Cincinnati.',DIRECTORY_LINKS.housingHelp)]},
 {id:'law',label:'New Law Student Information',icon:'book',items:[resource('admissions','law-news','Law Student News & Events','Find law school student resources and events.',DIRECTORY_LINKS.law),resource('admissions','law-registration','Registration Requirements','Use the law school’s current student and registrar resources.',DIRECTORY_LINKS.law),resource('admissions','law-budget','Tuition and Budget Information','Find official law school tuition and financial information.',DIRECTORY_LINKS.law)]},
 {id:'orientation',label:'New Student Orientation',icon:'people',items:[resource('admissions','orientation-uptown','Uptown Campus','Find Bearcats Bound Orientation information.',DIRECTORY_LINKS.orientation),resource('admissions','orientation-blue-ash','UC Blue Ash','Find the Blue Ash orientation path through the official orientation page.',DIRECTORY_LINKS.orientation),resource('admissions','orientation-clermont','UC Clermont','Find the Clermont orientation path through the official orientation page.',DIRECTORY_LINKS.orientation)]},
 {id:'international',label:'International Students',icon:'people',items:[resource('admissions','international-undergraduate','Undergraduate Admissions','Review international undergraduate next steps.',DIRECTORY_LINKS.international),resource('admissions','international-graduate','Graduate Admissions','Review international graduate next steps and departmental guidance.',DIRECTORY_LINKS.international),resource('admissions','international-services','International Student Services','Find official international student support.',DIRECTORY_LINKS.international),resource('admissions','international-orientation','Orientation','Review international arrival and orientation information.',DIRECTORY_LINKS.internationalOrientation)]}
];
export const TOOL_ITEMS=[
 item('tools','calendar','Acad Calendar','Find academic calendars and term information.',{icon:'calendar',category:'Academic',internal:'#/academics/calendar'}),
 resource('tools','campuslink','CampusLink','Now GetInvolvedUC: explore organizations and campus events.',DIRECTORY_LINKS.campuslink,{icon:'people',category:'Student life'}),
 resource('tools','gradtracker','GradTracker','Find official graduate forms and GradTracker access guidance.',DIRECTORY_LINKS.gradtracker,{icon:'graduation',category:'Academic'}),
 resource('tools','lcms','LCMS +','Find College of Medicine curriculum-system access support.',DIRECTORY_LINKS.lcms,{icon:'heart',category:'Medical'}),
 resource('tools','library','Library Resources','Search library collections, spaces, hours, and research support.',DIRECTORY_LINKS.library,{icon:'book',category:'Academic'}),
 resource('tools','maps','UC Maps','Find official campus maps and building information.',DIRECTORY_LINKS.maps,{icon:'location',category:'Student life'}),
 resource('tools','medonestop','MedOneStop','Open the College of Medicine’s portal access page.',DIRECTORY_LINKS.medOneStop,{icon:'heart',category:'Medical'}),
 resource('tools','shuttle','UC Shuttle Services','Find shuttle routes, service information, and the live tracker link.',DIRECTORY_LINKS.shuttle,{icon:'location',category:'Student life'}),
 resource('tools','email','Student Email','Find official student email access instructions.',DIRECTORY_LINKS.email,{icon:'mail',category:'Academic'}),
 resource('tools','symplicity','Symplicity','Find the law school’s career-system link under current student resources.',DIRECTORY_LINKS.law,{icon:'building',category:'Law'}),
 resource('tools','canopy','Canopy','Open UC’s learning and resource portal.',DIRECTORY_LINKS.canopy,{icon:'grid',category:'Academic'}),
 resource('tools','twen','TWEN','Find official law school TWEN exam guidance; confirm current instructions with your course.',DIRECTORY_LINKS.lawExams,{icon:'book',category:'Law'}),
 resource('tools','ucflex','UCFlex','Find university employee financial and HR system access.',DIRECTORY_LINKS.ucflex,{icon:'wallet',category:'Employee'}),
 item('tools','network','My Bearcat Network','Find advising and appointment resources.',{icon:'people',category:'Academic',internal:'#/academics/bearcat-network'})
];
const office=(id,label,description,url,options={})=>({id,label,description,url,icon:'building',...options});
export const OFFICES={
 uptown:office('uptown','One Stop - Uptown Campus','Enrollment Services · Clifton/Uptown campus.',DIRECTORY_LINKS.oneStop,{phone:'513-556-1000',email:'enrollmentservices@uc.edu',location:'220 University Pavilion'}),
 clermont:office('clermont','One Stop - UC Clermont','Enrollment Services · Clermont campus.',DIRECTORY_LINKS.oneStop,{phone:'513-556-1000',email:'enrollmentservices@uc.edu',location:'100 Student Services Building'}),
 blueash:office('blueash','One Stop - UC Blue Ash','Enrollment Services · Blue Ash campus.',DIRECTORY_LINKS.oneStop,{phone:'513-556-1000',email:'enrollmentservices@uc.edu',location:'153 Muntz Hall'}),
 registrar:office('registrar','Office of the Registrar','Student records, registration, and verifications.',DIRECTORY_LINKS.registrar),
 bursar:office('bursar','Office of the Bursar','Student account billing, payments, and refunds.',DIRECTORY_LINKS.bursar),
 aid:office('aid','Student Financial Aid Office','Aid applications, awards, and financial aid support.',DIRECTORY_LINKS.aid),
 advising:office('advising','Advising and Academic Services','Academic advising tools and appointment guidance.',DIRECTORY_LINKS.advising),
 graduate:office('graduate','The Graduate School','Graduate College programs, policies, and student resources.',DIRECTORY_LINKS.grad),
 bookstore:office('bookstore','UC Bookstore','University bookstore, course materials, and supplies.',DIRECTORY_LINKS.bookstore),
 law:office('law','College of Law','Law school current student information.',DIRECTORY_LINKS.law),
 medicine:office('medicine','College of Medicine','Medical education and student resources.',DIRECTORY_LINKS.medOneStop),
 pharmacy:office('pharmacy','College of Pharmacy','College and program information.',DIRECTORY_LINKS.pharmacy),
 operator:office('operator','UC Operator','Find the university’s general contact and directory information.',DIRECTORY_LINKS.operator,{phone:'513-556-6000'}),
 it:office('it','IT@UC Help Desk','Digital Technology Solutions service desk.',DIRECTORY_LINKS.itHelp,{phone:'513-556-4357'}),
 passwords:office('passwords','Password Self-Service','Find official UC password management and recovery.',DIRECTORY_LINKS.itHelp),
 parking:office('parking','Parking Services','Parking permits, locations, and transportation resources.',DIRECTORY_LINKS.parking),
 nightride:office('nightride','UC NightRide service','Find current university night transportation information.',DIRECTORY_LINKS.nightride),
 housing:office('housing','Housing and Food Services','Housing, meal plans, and related account support.',DIRECTORY_LINKS.housingHelp,{phone:'513-556-9800',email:'uchousing@uc.edu'}),
 safety:office('safety','UC Public Safety','University public safety information and services.',DIRECTORY_LINKS.safety),
 rights:office('rights','Right to Know Information','University consumer information and disclosures.',DIRECTORY_LINKS.rights)
};
const officeItem=(group,key)=>resource('quick-links',`${group}-${key}`,OFFICES[key].label,OFFICES[key].description,OFFICES[key].url,{...OFFICES[key],id:`${group}-${key}`,href:`#/quick-links/${group}-${key}`});
export const QUICK_ACTIONS=[
 item('quick-links','parent-access','Give Parent/Guest Access','Review a local delegated-access draft in My Profile.',{icon:'people',internal:'#/profile/sharing'}),
 item('quick-links','classes','Search for Classes','Find, compare, and plan course sections.',{icon:'search',internal:'#/classes'}),
 item('quick-links','address-letter','Address Verification Letter','Preview an explicitly marked sample letter from your saved demo address.',{icon:'file'}),
 item('quick-links','emergency','Update Emergency Contact','Manage sample emergency contacts in My Profile.',{icon:'phone',internal:'#/profile/emergency'}),
 item('quick-links','tax','Download 1098T','Find official tax-form instructions.',{icon:'file',internal:'#/finances/tax'}),
 resource('quick-links','bearcat-card','Add Money to Bearcat Card','Find official Bearcat Card deposit options.',DIRECTORY_LINKS.card,{icon:'wallet'}),
 resource('quick-links','events','Campus Events Calendar','Explore campus events through GetInvolvedUC.',DIRECTORY_LINKS.campuslink,{icon:'calendar'}),
 resource('quick-links','tutorials','Catalyst Tutorials','Open the university’s self-help guides.',DIRECTORY_LINKS.help,{icon:'book'})
];
export const QUICK_GROUPS=[{id:'offices',label:'UC Campus Offices',icon:'building',items:['uptown','clermont','blueash','registrar','bursar','aid','advising','graduate','bookstore','law','medicine','pharmacy'].map(k=>officeItem('offices',k))},{id:'contacts',label:'Helpful Contacts',icon:'phone',items:['uptown','blueash','clermont','operator','it','passwords','parking','nightride','housing','safety','rights'].map(k=>officeItem('contacts',k))}];
export const VA_ITEM=resource('quick-links','va-certification','UC VA Certification Request','Review the official course certification instructions and office contact.',DIRECTORY_LINKS.veterans,{icon:'file'});
export const WORKSPACE_PAGES=[...TASK_NAV,...ADMISSION_GROUPS.flatMap(g=>g.items.map(x=>({...x,group:g.label}))),...TOOL_ITEMS.map(x=>({...x,group:'Other Tools'})),...QUICK_ACTIONS.map(x=>({...x,group:'Quick Links'})),...QUICK_GROUPS.flatMap(g=>g.items.map(x=>({...x,group:g.label}))),{...VA_ITEM,group:'Quick Links'}];
export const workspacePage=route=>[...WORKSPACE_PAGES,...TASK_DETAILS].find(p=>p.href===`#/${route}`);
export const SERVICE_INDICATORS=[{id:'address',label:'Address Verification',department:'Office of the Registrar',description:'This sample indicator asks you to review the address stored with your demo profile.',impact:'Sample informational indicator; no registration block is added.',href:'#/tasks/indicator-address',action:'#/profile/addresses',actionLabel:'Review sample addresses'},{id:'withholding',label:'IRS Tax Withholding',department:'Office of the Bursar',description:'This sample indicator directs a student to the responsible office for tax-related account questions.',impact:'Sample informational indicator. Tax status is not evaluated by this prototype.',href:'#/tasks/indicator-withholding',action:DIRECTORY_LINKS.bursar,actionLabel:'Open official Bursar information'}];
export const UNIVERSITY_TODOS=[{id:'address',label:'Address Verification',status:'Assigned',department:'Office of the Registrar',href:'#/tasks/todo-address',description:'Review your sample profile address and save a local review note.',action:'#/profile/addresses',actionLabel:'Review sample addresses'},{id:'immunizations',label:'Bearcats Health Immunizations',status:'Initiated',department:'University Health Services',href:'#/tasks/todo-immunizations',description:'Find the official health requirement instructions. No health information or documents are collected here.',action:DIRECTORY_LINKS.immunizations,actionLabel:'View official immunization information'}];
export const TASK_DETAILS=[...SERVICE_INDICATORS.map(x=>({...x,icon:'info',group:'Service Indicators'})),...UNIVERSITY_TODOS.map(x=>({...x,icon:'check',group:'To Do List'}))];
export const allWorkspacePages=()=>[...WORKSPACE_PAGES,...TASK_DETAILS];
export const emptyWorkspace=()=>({savedLinks:[],reviewedTasks:[],admissionChecklist:{},whatIfReports:[]});
const array=v=>Array.isArray(v)?v:[];
const validTimestamp=v=>typeof v==='string'&&Number.isFinite(Date.parse(v));
export function hydrateWorkspace(raw){const validLinks=new Set(WORKSPACE_PAGES.map(p=>p.href));return {savedLinks:[...new Set(array(raw?.savedLinks).filter(x=>validLinks.has(x)))],reviewedTasks:[...new Set(array(raw?.reviewedTasks).filter(x=>UNIVERSITY_TODOS.some(t=>t.id===x)))],admissionChecklist:Object.fromEntries(Object.entries(raw?.admissionChecklist??{}).filter(([k,v])=>['confirm-grad','confirm-ugrd','confirm-med'].includes(k)&&v===true)),whatIfReports:array(raw?.whatIfReports).filter(r=>r&&typeof r.id==='string'&&WHAT_IF_PROGRAMS.some(p=>p.id===r.programId)&&validTimestamp(r.createdAt)).map(r=>({id:r.id.slice(0,80),programId:r.programId,createdAt:r.createdAt})).slice(0,20)};}
export function directoryResults(items,{query='',category='All',savedOnly=false,saved=[]}={}){const q=query.trim().toLowerCase();return items.filter(p=>(!q||`${p.label} ${p.description} ${p.group??''} ${p.category??''} ${p.department??''}`.toLowerCase().includes(q))&&(category==='All'||p.category===category||p.group===category)&&(!savedOnly||saved.includes(p.href)));}
export function savedScenario(profile,report){const program=WHAT_IF_PROGRAMS.find(p=>p.id===report.programId);return program?{program,...whatIf(profile,program)}:null;}
export function saveScenario(workspace,programId,createdAt=new Date().toISOString()){if(!WHAT_IF_PROGRAMS.some(p=>p.id===programId)||!validTimestamp(createdAt))return null;return {...workspace,whatIfReports:[{id:`WHATIF-${createdAt}-${workspace.whatIfReports.length}`,programId,createdAt},...workspace.whatIfReports].slice(0,20)};}
export function addressLetter(profile,person,addressType){const address=person.addresses.find(a=>a.type===addressType);if(!address)return null;return `SAMPLE ADDRESS LETTER — NOT AN OFFICIAL UNIVERSITY DOCUMENT\n\n${person.preferredName}\n${profile.studentId}\n\n${address.type}\n${address.street}\n${address.line2?address.line2+'\n':''}${[address.city,address.region].filter(Boolean).join(', ')} ${address.postal}\n${address.country}\nEffective from: ${address.from}\n\nPrepared from browser-local sample data. Not proof of residency, enrollment, or identity. Request an official letter through UC’s Registrar.\n`;}

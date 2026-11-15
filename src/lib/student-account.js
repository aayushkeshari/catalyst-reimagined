// Public prototype data. Financial amounts and personal details are synthetic, except the owner-provided campus email.
const page=(id,label,description)=>({id,label,description,href:`#/finances/${id}`,icon:'wallet'});
export const FINANCE_GROUPS=[
 {id:'billing',label:'Billing Information',icon:'wallet',items:[
 page('tuition-fees','Tuition and Fee Rates','Find tuition information for your campus and cohort.'),
 page('direct-deposit','Direct Deposit Enrollment','Review a sample direct deposit summary and find official enrollment instructions.'),
 page('refund-appeal','Tuition Refund Appeal','Check the sample account for eligible refund appeal terms.'),
 page('payment-plan','Payment Plan Enrollment','Explore a three-installment planning example.'),
 page('gradguard','GradGuard','Explore tuition insurance through the university’s linked provider.'),
 page('bursar','Office of the Bursar','Find official billing and payment support.'),
 page('right-to-know','Right to Know Information','Open university consumer information and disclosures.')]},
 {id:'aid',label:'Manage Financial Aid',icon:'star',items:[
 page('financial-aid','View Financial Aid','Choose an aid year and review sample awards.'),
 page('accept-decline','Accept / Decline Financial Aid','Practice reviewing award decisions in a local draft.'),
 page('permissions','Federal Aid Permissions','View the sample permission summary and agreement guidance.')]},
 {id:'insurance',label:'Student Health Insurance',icon:'shield',items:[
 page('waiver-status','Health Insurance Waiver Status','Choose a term to review the sample waiver record.'),
 page('insurance-card','Print Health Insurance Card SS','Find official instructions for accessing your insurer’s ID card.'),
 page('waiver-update','Health Insurance Waiver Update','Prepare a local checklist for your waiver update.')]},
 {id:'links',label:'Financial Aid Links',icon:'external',items:[
 page('aid-office','Student Financial Aid','Open official financial aid information.'),
 {id:'scholarships',label:'Scholarship Resources',description:'Explore scholarship resources.',href:'#/scholarships',icon:'star'},
 page('help','Financial Aid & Billing Help','Find instructions for common financial tasks.')]}
];
export const FINANCE_EXTRA=[page('pending-aid','View Pending Financial Aid','Review anticipated sample aid separately from posted credits.'),page('bill','View Itemized Bill','Review sample charges, credits, and payments.'),page('inquiry','Account Inquiry','Explore posted activity on this sample account.'),page('payment','Make a Payment','Continue to official payment instructions.'),page('cohort','Tuition Guarantee – Cohort Details','Find official tuition guarantee and cohort information.'),page('tax','1098-T Tax Form','Find official instructions for tax documents.'),page('bank-accounts','Bank Accounts','Learn where to manage bank details securely.')];
export const FINANCE_PAGES=[...FINANCE_GROUPS.flatMap(g=>g.items.map(p=>({...p,group:g.label}))),...FINANCE_EXTRA.map(p=>({...p,group:'Account Services'}))];
export const PROFILE_PAGES=[['personal','Personal Details','people'],['contact','Contact Details','phone'],['addresses','Addresses','home'],['emergency','Emergency Contacts','people'],['privacy','FERPA','shield'],['sharing','Share my Information','people']].map(([id,label,icon])=>({id,label,icon,href:`#/profile/${id}`,group:'My Profile'}));
export const accountPage=route=>[...FINANCE_PAGES,...PROFILE_PAGES].find(p=>p.href.split('?')[0]===`#/${route}`);
export const ACCOUNT_LINKS={
 tuition:'https://www.uc.edu/about/bursar/tuition-fees.html',bursar:'https://www.uc.edu/about/bursar.html',
 deposit:'https://www.uc.edu/about/bursar/refunds/direct-deposit-enrollment.html',
 plan:'https://www.uc.edu/about/bursar/pay-bill/tuition-payment-plan.html',
 rights:'https://www.uc.edu/about/right-to-know.html',gradguard:'https://gradguard.com/tuition/uc',
 aid:'https://www.uc.edu/about/financial-aid.html',help:'https://www.onestop.uc.edu/other/self-help.html',
 insurance:'https://www.uc.edu/about/bursar/tuition-fees/student-health-insurance-.html',
 card:'https://www.med.uc.edu/landing-pages/studenthealth/eligibility-enrollment/id-cards',
 catalyst:'https://catalyst.uc.edu/',
};
export const FINANCE_RESOURCES={
 'tuition-fees':{url:ACCOUNT_LINKS.tuition,label:'Open UC Tuition & Fees',text:'Use the official tuition page to identify your campus, program, and entering cohort. The amounts in this prototype are illustrative and are not a tuition quote.'},
 gradguard:{url:ACCOUNT_LINKS.gradguard,label:'Visit GradGuard',text:'Explore the provider’s university page for tuition insurance details, exclusions, pricing, and enrollment. Coverage is not included in this prototype.'},
 bursar:{url:ACCOUNT_LINKS.bursar,label:'Visit the Office of the Bursar',text:'Find official help with bills, payment methods, refunds, and student account questions.'},
 'right-to-know':{url:ACCOUNT_LINKS.rights,label:'Open Right to Know',text:'University consumer information is available on the official Right to Know page.'},
 'aid-office':{url:ACCOUNT_LINKS.aid,label:'Visit Student Financial Aid',text:'Find official information about applying for, understanding, and managing financial aid.'},
 help:{url:ACCOUNT_LINKS.help,label:'Open the Catalyst Self-Help Guide',text:'Find university instructions for aid, billing, direct deposit, health insurance, and delegated access.'},
 payment:{url:ACCOUNT_LINKS.help,label:'View official payment instructions',text:'Use the “Make a Payment: Student Steps” section of the UC guide, then sign in to official Catalyst to access the university’s payment provider. This prototype does not collect payment details or process payments.'},
 cohort:{url:ACCOUNT_LINKS.tuition,label:'Find your official cohort details',text:'Find the Cincinnati Tuition Guarantee information for your entering cohort. Cohort rates and eligibility must be confirmed on the official website.'},
 tax:{url:ACCOUNT_LINKS.help,label:'Find 1098-T instructions',text:'Use “Download Your 1098-T” in the official self-help guide. Tax documents are not generated by this prototype.'},
 'bank-accounts':{url:ACCOUNT_LINKS.deposit,label:'View official bank account instructions',text:'Manage bank accounts only through official university services. Student employees may be directed to Employee Self-Service; the official instructions explain the correct path. No bank information can be entered here.'},
 'insurance-card':{url:ACCOUNT_LINKS.card,label:'Open official ID card instructions',text:'UC’s current instructions direct students to their UHCSR account for insurance cards. The university notes that the former Catalyst Print ID Card function no longer works. Follow the official instructions to access your card.'}
};
export const money=cents=>new Intl.NumberFormat('en-US',{style:'currency',currency:'USD'}).format(cents/100);
export function ledger(profile){return [
 {id:'tuition',date:'2026-08-01',description:'Sample tuition',cents:700000,kind:'Charge'},
 {id:'fees',date:'2026-08-01',description:'Sample mandatory fees',cents:100000,kind:'Charge'},
 {id:'aid',date:'2026-08-18',description:'Sample posted scholarship credit',cents:-350000,kind:'Aid credit'},
 {id:'payment',date:'2026-10-20',description:'Sample account payment',cents:profile.id==='arthur'?-450000:-80000,kind:'Payment'}
];}
export function accountSummary(profile){const rows=ledger(profile),balance=rows.reduce((a,r)=>a+r.cents,0);return {balance,dueNow:Math.min(Math.max(0,balance),150000),futureDue:Math.max(0,balance-150000),lastPayment:rows.find(r=>r.kind==='Payment')};}
export function aidYears(profile){return profile.id==='arthur'?[2027,2026,2025,2024,2023,2022]:[2027,2026];}
export function awards(profile,year){if(!aidYears(profile).includes(Number(year))||Number(year)===aidYears(profile).at(-1))return [];return [{id:'merit',name:'Sample merit scholarship',cents:200000},{id:'college',name:'Sample college award',cents:150000}];}
export const aidYearLabel=year=>`${year-1}–${year}`;
export function awardTotals(profile,year,decisions={}){const rows=awards(profile,year);return {offered:rows.reduce((a,r)=>a+r.cents,0),accepted:rows.reduce((a,r)=>a+(decisions[r.id]==='Declined'?0:r.cents),0)};}
export function installments(cents){if(!Number.isSafeInteger(cents)||cents<0)return [];const base=Math.floor(cents/3);return [base,base,base+cents%3];}
export const PRIVACY_FIELDS=['Addresses','Email Addresses','Names','Phones','Honors and Awards','Class','Colleges','Dates of Attendance','Degrees Conferred With Dates','Enrollment Statuses','Majors'];
export const SHARE_SCOPES=['Grades','Billing','Financial aid','Contact information'];
export const ADDRESS_TYPES=['Permanent Address','Mailing Address','Residence Hall Address','Ceremonial Diploma Mailing Address'];
export function emptyPerson(profile){return {preferredName:profile.name,diplomaName:profile.name,emails:[{id:'campus',value:profile.campusEmail??`${profile.id}@student.example.edu`,type:'Campus',preferred:true}],phones:[],addresses:[],emergency:[],privacy:Object.fromEntries(PRIVACY_FIELDS.map(x=>[x,false])),delegates:[]};}
export const emptyFinance=()=>({decisions:{},planSaved:false,waiver:null});
const txt=(value,max=120)=>typeof value==='string'?value.trim().slice(0,max):'';
export const validEmail=v=>typeof v==='string'&&/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)&&v.length<=200;
export const validPhone=v=>typeof v==='string'&&/^[+\d\s().-]+$/.test(v)&&v.replace(/\D/g,'').length>=7&&v.replace(/\D/g,'').length<=15;
export const validDate=v=>typeof v==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(v)&&Number.isFinite(Date.parse(`${v}T12:00:00Z`))&&new Date(`${v}T12:00:00Z`).toISOString().slice(0,10)===v;
export function contactError(channel,row){if(!txt(row.value,200))return 'Enter a contact value.';if(channel==='emails'&&!validEmail(row.value))return 'Enter a valid email address.';if(channel==='phones'&&!validPhone(row.value))return 'Enter a phone number with 7 to 15 digits.';if(!(channel==='emails'?['Home','Other']:['Cell','Home','Emergency Text','Other']).includes(row.type))return 'Choose a contact type.';return '';}
export function saveContact(person,channel,row){const error=contactError(channel,row);if(error)return {error};if(row.id==='campus')return {error:'The campus email is managed by the profile record.'};const id=row.id||`contact-${Date.now()}-${Math.random().toString(36).slice(2,7)}`;let list=person[channel].filter(r=>r.id!==id);const preferred=row.preferred===true||!list.length;list=list.map(r=>({...r,preferred:preferred?false:r.preferred}));list.push({id,value:txt(row.value,200),type:row.type,preferred});return {person:{...person,[channel]:normalizePreferred(list)}};}
export function normalizePreferred(list){let chosen=list.findIndex(r=>r.preferred===true);if(chosen<0)chosen=0;return list.map((r,i)=>({...r,preferred:i===chosen}));}
export function addressError(row){return ADDRESS_TYPES.includes(row.type)&&['street','city','postal','country'].every(k=>txt(row[k]))&&validDate(row.from)?'':'Enter an address, city, postal code, country, and valid start date.';}
export function emergencyError(row){return txt(row.name)&&txt(row.relationship)&&validPhone(row.phone)?'':'Enter a name, relationship, and valid phone number.';}
export function delegateError(row){return txt(row.name)&&validEmail(row.email)&&Array.isArray(row.scopes)&&row.scopes.some(s=>SHARE_SCOPES.includes(s))?'':'Enter a name, valid email, and at least one access area.';}
const list=value=>Array.isArray(value)?value.slice(0,30):[];
export function hydratePerson(raw,profile){const base=emptyPerson(profile);if(!raw||typeof raw!=='object')return base;const contacts=channel=>{const stored=list(raw[channel]);const rows=[...(channel==='emails'?base.emails.map(r=>({...r,preferred:stored.find(x=>x?.id==='campus')?.preferred!==false})):[]),...stored.filter(r=>r&&r.id!=='campus'&&!contactError(channel,r)).map(r=>({id:txt(r.id),value:txt(r.value,200),type:r.type,preferred:r.preferred===true}))];return normalizePreferred(rows.filter((r,i,a)=>r.id&&a.findIndex(x=>x.id===r.id)===i));};
 return {...base,preferredName:txt(raw.preferredName)||base.preferredName,diplomaName:txt(raw.diplomaName)||base.diplomaName,
 emails:contacts('emails'),phones:contacts('phones'),addresses:list(raw.addresses).filter(r=>r&&!addressError(r)).filter((r,i,a)=>a.findIndex(x=>x.type===r.type)===i).map(r=>({id:txt(r.id),type:r.type,street:txt(r.street),line2:txt(r.line2),city:txt(r.city),region:txt(r.region),postal:txt(r.postal,30),country:txt(r.country),from:r.from})),
 emergency:normalizePreferred(list(raw.emergency).filter(r=>r&&!emergencyError(r)).map(r=>({id:txt(r.id),name:txt(r.name),relationship:txt(r.relationship),phone:txt(r.phone),preferred:r.preferred===true}))),
 privacy:Object.fromEntries(PRIVACY_FIELDS.map(k=>[k,raw.privacy?.[k]===true])),
 delegates:list(raw.delegates).filter(r=>r&&!delegateError(r)).map(r=>({id:txt(r.id),name:txt(r.name),email:txt(r.email,200),scopes:[...new Set(r.scopes.filter(s=>SHARE_SCOPES.includes(s)))],status:'Draft'}))};}
export function hydrateFinance(raw){const base=emptyFinance();if(!raw||typeof raw!=='object')return base;return {...base,decisions:Object.fromEntries(Object.entries(raw.decisions??{}).filter(([k,v])=>['merit','college'].includes(k)&&['Accepted','Declined'].includes(v))),planSaved:raw.planSaved===true,waiver:raw.waiver&&['Fall 2026','Spring 2027','Summer 2027'].includes(raw.waiver.term)&&txt(raw.waiver.provider)&&validDate(raw.waiver.start)&&validDate(raw.waiver.end)&&raw.waiver.start<=raw.waiver.end?{term:raw.waiver.term,provider:txt(raw.waiver.provider),start:raw.waiver.start,end:raw.waiver.end,status:'Draft'}:null};}

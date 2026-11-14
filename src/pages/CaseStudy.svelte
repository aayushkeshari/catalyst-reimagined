<script>
import {project} from '../lib/project.js';
import {feedbackRevisions} from '../lib/feedback.js';
import Icon from '../lib/components/Icon.svelte';

const chapters = [
  ['overview', 'Project'], ['research', 'Research'], ['design', 'Design'],
  ['interface', 'Interface'], ['feedback', 'Feedback'], ['implementation', 'Implementation'],
  ['future', 'Future work']
];
function jump(event, id) {
  event.preventDefault();
  const section = document.getElementById(id);
  section?.focus({preventScroll: true});
  section?.scrollIntoView({behavior: 'instant', block: 'start'});
}
const findings = [
  {id:'H1',problem:'Original homepage: a detailed campus photograph competes with translucent category tiles of similar emphasis.',evidence:'Direct observation of the original screenshot supplied in the critique.',principle:'Aesthetic and minimalist design',severity:'2 · Moderate',decision:'Use opaque neutral surfaces, grouped essentials, and a prominent semester-planning action.'},
  {id:'H2',problem:'Original class discovery: the team reports similar labels, separate destinations, and uncertain return paths.',evidence:'Reported in the supplied critique deck and script; not independently reproduced in live Catalyst.',principle:'Recognition; consistency; user control',severity:'3 · Major, provisional',decision:'Connect search, details, comparison, cart, and confirmed schedule in one workspace; preserve filters.'},
  {id:'H3',problem:'Initial student prototype: future planned courses appeared as enrolled without a registration action.',evidence:'Source review of toEnrolledEntry and enrolledByTerm in upstream commit 1279e7d.',principle:'Visibility of system status',severity:'3 · Major',decision:'Start future enrollment empty and keep planned, in-cart, waitlisted, and enrolled records separate.'},
  {id:'H4',problem:'Initial student prototype: enrollment updated the schedule without checking prerequisites, meeting overlaps, or credit limits.',evidence:'Source review of enrollNow/enrollIn in upstream commit 1279e7d.',principle:'Error prevention and recovery',severity:'3 · Major',decision:'Validate the entire selection before committing it; name each blocking issue and a recovery action.'},
  {id:'H5',problem:'Initial student prototype: successful enrollment had no explicit confirmation record.',evidence:'Source inspection of the enrollment flow.',principle:'Visibility of system status',severity:'3 · Major',decision:'Create a dated receipt with the exact sections and a link to the confirmed schedule.'},
  {id:'H6',problem:'Initial student prototype: the default calendar disappeared below 700px without an automatic list replacement.',evidence:'Source review of ScheduleList.svelte and its responsive rule.',principle:'Flexibility; access to information',severity:'3 · Major',decision:'Show an agenda automatically on narrow screens, regardless of the desktop display preference.'},
  {id:'H7',problem:'Initial student prototype: one enrollment cart spanned selected terms.',evidence:'Source review of the original cart state.',principle:'Consistency; error prevention',severity:'3 · Major',decision:'Keep carts and waitlists by term and prevent changes to closed historical registration.'},
  {id:'H8',problem:'Initial student prototype: a first-year profile received near-graduation text and ambiguous credit labels.',evidence:'Source and sample-data review.',principle:'Match with the real world; accurate status',severity:'2 · Moderate',decision:'Use profile-specific plans and distinguish earned, in-progress, scheduled-next, and remaining credits.'}
];
const research = [
  {title:'Nielsen’s usability heuristics',url:'https://www.nngroup.com/articles/ten-usability-heuristics/',finding:'Status visibility, recognition, error prevention, and recovery provide a framework for evaluating registration tasks.',application:'Separate registration states; keep search context; review before enrollment; explain recovery and confirm completion.'},
  {title:'W3C · Status messages',url:'https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html',finding:'Results and status changes that do not move focus should be available to assistive technology.',application:'Live result counts and action messages communicate changes. Named dialogs handle the review and receipt contexts.'},
  {title:'W3C · Reflow',url:'https://www.w3.org/WAI/WCAG22/Understanding/reflow.html',finding:'Narrow views should retain information and functionality rather than forcing users to navigate a desktop layout.',application:'Stack controls, provide mobile navigation, and replace the wide weekly calendar with an agenda.'}
];
const frames = [
  ['Home · list view','3-2','Orient around a student summary, essentials, and current classes.'],
  ['Home · calendar view','5-8','Show the same schedule spatially without duplicating its data.'],
  ['Classes & schedule','3-43','Connect finding a section with planning and registration.'],
  ['Academic progress','3-84','Explain current standing and the remaining academic path.'],
  ['Academic services','3-125','Group records, planning, advising, and support destinations.']
];
const modules = [
  ['src/App.svelte','Shared shell, hash routes, keyboard search, profile selection, theme, and Quick tour.'],
  ['src/pages/','Home, Classes, Progress, Services, Account, and this case study.'],
  ['src/lib/catalog.js + src/lib/data/','Synthetic courses, sections, terms, profiles, original sample plans, and transcripts.'],
  ['src/lib/model.js','Pure JavaScript rules for validation, filtering, transactions, progress, dates, and calendar export.'],
  ['src/lib/store.js','Svelte stores, per-profile browser persistence, hydration, notifications, and downloads.'],
  ['src/lib/components/','Reusable SVG icons, named native dialogs, and shared schedule views.'],
  ['src/lib/project.js + src/lib/feedback.js','Public project links, screenshot captions, team attribution, and feedback decisions.'],
  ['tests/ + .github/workflows/deploy.yml','Behavioral regression checks and automated public deployment.']
];
</script>

{#snippet screenshot(file)}
  {@const shot = project.screenshots.find(item => item.src.endsWith('/' + file))}
  {#if shot}
    <figure class="case-shot">
      <a class="case-shot-link" href={shot.src} target="_blank" rel="noreferrer" aria-label={`Open full-size screenshot: ${shot.alt}`}><img src={shot.src} alt={shot.alt} loading="lazy"/></a>
      <figcaption>{shot.caption} <a href={shot.src} target="_blank" rel="noreferrer">View full size <Icon name="external" size={11}/></a></figcaption>
    </figure>
  {/if}
{/snippet}

<div class="case-study">
  <header class="case-heading">
    <span class="eyebrow">UI/UX case study · University of Cincinnati · 2026</span>
    <h1>Catalyst,<br/><em>reimagined.</em></h1>
    <p>From finding a class to knowing you’re enrolled: redesigning a student portal around a clear next step.</p>
    <div class="button-row">
      <a class="button primary" href={project.publishedUrl} target="_blank" rel="noreferrer">Open public application<Icon name="external" size={16}/></a>
      <a class="button secondary" href={project.repository} target="_blank" rel="noreferrer">Source on GitHub<Icon name="code" size={16}/></a>
      <a class="button secondary" href={project.figma} target="_blank" rel="noreferrer">Figma design<Icon name="external" size={16}/></a>
    </div>
    <div class="case-meta">
      <div><span>Team</span><strong>{project.team.join(' · ')}</strong></div>
      <div><span>Project scope</span><strong>Research, interaction design, responsive front-end prototype</strong></div>
      <div><span>Tools</span><strong>Figma · Svelte 5 · JavaScript · Vite</strong></div>
    </div>
  </header>

  <nav class="case-contents" aria-label="Case study sections">
    <span class="eyebrow">In this case study</span>
    <div>{#each chapters as chapter}<a href={`#/case-study?section=${chapter[0]}`} onclick={event=>jump(event,chapter[0])}>{chapter[1]}</a>{/each}</div>
  </nav>

  <section class="case-section" id="overview" tabindex="-1">
    <span class="eyebrow">01 / Project & problem</span>
    <h2>Important tasks shouldn’t feel like a maze.</h2>
    <p>Catalyst is the University of Cincinnati’s student portal for academic and administrative tasks. This independent course project rethinks how students discover classes, compare sections, understand registration status, and plan their academic progress. It is a working prototype with synthetic records, not a replacement for the university’s live system.</p>
    <p>The central design question was: <strong>How can a student choose a suitable section, recover from a registration problem, and know exactly when enrollment is complete?</strong> Our audience includes students learning the portal, commuters fitting classes into campus days, students balancing work hours, and students approaching graduation.</p>
    <p>This is a fundamental change to task organization and state communication. One Classes & schedule workspace connects discovery, comparison, cart, review, and confirmation. A visual refresh supports that structure, while registration behavior and academic labels make the student’s next action explicit.</p>
    <div class="case-summary-grid">
      <article class="panel padded"><h3>Design goal</h3><p>Keep related decisions together, distinguish planning from enrollment, and make errors understandable and recoverable.</p></article>
      <article class="panel padded"><h3>Delivered</h3><p>A public Svelte prototype, a documented research-to-design process, eleven feedback responses, and fifteen screenshots of the current interface.</p></article>
    </div>
    <figure class="case-image"><a href="./research/original-home.png" target="_blank" rel="noreferrer"><img src="./research/original-home.png" alt="Original Catalyst homepage with translucent category tiles over a detailed nighttime campus photograph." loading="lazy"/></a><figcaption>Original interface supplied in the team’s critique. This is evidence of the visual baseline; it does not establish unobserved registration behavior.</figcaption></figure>
    {@render screenshot('home.png')}
  </section>

  <section class="case-section" id="research" tabindex="-1">
    <span class="eyebrow">02 / Research, methods & findings</span>
    <h2>Make the reasoning visible.</h2>
    <p>We used two completed methods: background research and a heuristic evidence review. The review covers the original screenshot and critique materials, plus the initial student prototype at upstream commit 1279e7d. Those are distinct evidence sources: a flaw found in prototype code is not presented as a verified flaw in the live university system.</p>
    <h3>Method 1 · Background research</h3>
    <p>We reviewed Nielsen’s interaction principles and W3C guidance, then mapped them to concrete controls and states. These sources informed design choices; they do not measure this redesign’s usability.</p>
    <div class="research-cards">{#each research as item}<article class="panel padded"><a class="text-link" href={item.url} target="_blank" rel="noreferrer">{item.title}<Icon name="external" size={15}/></a><p>{item.finding}</p><strong class="small">Design application</strong><p class="muted small">{item.application}</p></article>{/each}</div>
    <h3>Method 2 · Heuristic evidence review</h3>
    <p>We examined homepage orientation, class discovery, registration state, error recovery, term boundaries, progress labels, and the mobile schedule. Each issue was recorded with its evidence, relevant principle, severity, and design response. Severity uses 0 for no issue, 1 for cosmetic, 2 for moderate, 3 for major, and 4 for task-blocking problems. Ratings are review judgments rather than participant scores.</p>
    <div class="table-scroll"><table><caption>Findings and the decisions they motivated</caption><thead><tr><th>Finding & evidence</th><th>Principle / severity</th><th>Design response</th></tr></thead><tbody>{#each findings as item}<tr><td><strong>{item.id} · {item.problem}</strong><p class="muted small">{item.evidence}</p></td><td>{item.principle}<p class="small muted">{item.severity}</p></td><td>{item.decision}</td></tr>{/each}</tbody></table></div>
    <p class="fine-print">Review date: {project.researchDate}. This is a source/material review, not a live-system test or a multi-expert study. Eleven student feedback comments supplied by the project author informed a subsequent iteration, described below. No task timings, SUS scores, or measured before/after improvement are claimed.</p>
    <div class="button-row"><a class="button secondary" href={`${project.repository}/blob/main/docs/research.md`} target="_blank" rel="noreferrer">Research record<Icon name="external" size={14}/></a><a class="button secondary" href={`${project.repository}/blob/main/docs/heuristic-evaluation.md`} target="_blank" rel="noreferrer">Full heuristic review<Icon name="external" size={14}/></a></div>
  </section>

  <section class="case-section" id="design" tabindex="-1">
    <span class="eyebrow">03 / Design exploration & rationale</span>
    <h2>One workspace. A visible next step.</h2>
    <p>The Figma exploration established five desktop frames. Implementation extended those plans with error, empty, waitlist, confirmation, mobile, and persistence states needed to demonstrate the full task.</p>
    <div class="table-scroll"><table><caption>Design frame to implementation intent</caption><thead><tr><th>Figma frame</th><th>Purpose</th></tr></thead><tbody>{#each frames as frame}<tr><td><a class="text-link" href={`https://www.figma.com/design/QmzVctFez8wJ2DL9re1hA9/Untitled?node-id=${frame[1]}`} target="_blank" rel="noreferrer">{frame[0]}<Icon name="external" size={12}/></a></td><td>{frame[2]}</td></tr>{/each}</tbody></table></div>
    <div class="design-principles"><article><span>01</span><h3>Organize around the task</h3><p>Search, details, comparison, cart, and confirmed schedule stay in one workspace. Students can compare alternatives without losing the term or search context.</p></article><article><span>02</span><h3>Make each state explicit</h3><p>A planned course, a cart item, a waitlisted section, and an enrolled class mean different things. Labels and a dated receipt communicate the transition.</p></article><article><span>03</span><h3>Build recovery into the flow</h3><p>A conflict names the other section and offers a route to alternatives. Review prevents partial enrollment; confirmed drops have an immediate Undo action.</p></article></div>
    <h3>Visual hierarchy with a purpose</h3>
    <p>The red sidebar anchors navigation; neutral opaque surfaces separate tasks from background decoration. Large serif headings identify destinations, while compact sans-serif labels support scanning section details. Red and black carry the college-inspired identity. Text labels accompany status colors, and primary actions receive clear emphasis.</p>
    <div class="case-palette"><span style:background="#a0010f">College red · #A0010F</span><span style:background="#111111">Black · #111111</span><span style:background="#e00122">Action red · #E00122</span><span style:background="#f6f6f6" style:color="#202020">Neutral · #F6F6F6</span></div>
    <p><strong>Responsive choice:</strong> a compressed calendar would make section details difficult to read. On phones, an agenda preserves course names, meeting times, rooms, and status; filters and action buttons stack vertically. The same schedule data drives both views.</p>
  </section>

  <section class="case-section" id="interface" tabindex="-1">
    <span class="eyebrow">04 / Interface walkthrough</span>
    <h2>From “maybe this class” to “you’re all set.”</h2>
    <p>Each screenshot opens at full size. All displayed student records, seat counts, receipts, and target dates are demo content.</p>
    <article class="case-walkthrough"><span class="eyebrow">A / Find a suitable section</span><h3>Search, filter, inspect, compare.</h3><p>Choose a registration term, then search by course code, title, or instructor; spaced codes such as “CS 5167” work too. Subject, open seats, format, day, and conflict controls narrow results. Starts at or after and Ends at or before include the selected boundary; every scheduled meeting must fit. Asynchronous sections are hidden while a time bound is active.</p><p>Keep to my campus days uses the selected term’s enrolled classes and cart to avoid adding new meeting days. Course cards show named prerequisites, instructor, section, location, meeting times, and seats. Open details for more context, or select Compare on up to three sections and choose Compare sections. Add to cart saves a plan without reserving a seat.</p><div class="case-shot-grid">{@render screenshot('classes.png')}{@render screenshot('class-filters.png')}{@render screenshot('section-comparison.png')}</div></article>
    <article class="case-walkthrough"><span class="eyebrow">B / Review and recover</span><h3>A problem should explain the next action.</h3><p>Enrollment cart groups the selected term’s choices. Remove edits the plan; Find another section returns to alternatives. Review & enroll checks the complete selection for the registration window, offering term, holds, prerequisites, duplicates, open seats, meeting overlaps, and credit limit. A blocking issue disables Confirm enrollment and leaves all enrollment records unchanged.</p><p><strong>Example:</strong> CS5002 section 001 overlaps CS5167 section 001. The review names that conflict. Replace CS5167 with section 002, review again, then confirm. The receipt records two enrolled classes and six credits, with a confirmation number and timestamp. View schedule opens the resulting enrollment.</p><div class="case-shot-grid">{@render screenshot('enrollment-recovery.png')}{@render screenshot('enrollment-confirmation.png')}</div></article>
    <article class="case-walkthrough"><span class="eyebrow">C / Keep track of confirmed enrollment</span><h3>The schedule reflects what actually changed.</h3><p>My schedule shows confirmed classes separately from waitlists. Week and List provide alternate desktop views; phones automatically receive an agenda. Export calendar downloads an .ics file, and Print opens the browser print flow. Drop class requires confirmation and offers immediate Undo. Saved receipts remain historical records even after a later drop.</p><p>A full section may offer Join waitlist when the student is eligible. Waitlisted means not enrolled; this prototype provides neither queue position nor notification delivery. The interface states those limits rather than implying a guaranteed seat.</p><div class="case-shot-grid">{@render screenshot('confirmed-schedule.png')}{@render screenshot('mobile-schedule.png')}</div></article>
    <article class="case-walkthrough"><span class="eyebrow">D / Understand progress and find support</span><h3>Make academic numbers interpretable.</h3><p>Academic progress separates earned credits, current in-progress credits, future scheduled courses, and remaining requirements. The Aayush demo has 96 earned credits and 15 in progress toward a 126-credit plan. The “15 remaining after this term” total explicitly depends on passing all 15 current credits; 30 credits are not yet earned.</p><p>Degree overview, Course history, and Graduation checklist support different planning questions. Filter coursework by status, download a readable summary, or follow a remaining course into section search. Expand the transfer-credit explanation to understand why total credit and a specific requirement equivalency differ. These classifications are illustrative, not an official degree audit.</p><p>Academic services combines a search field with category filters for records, planning, advising, graduation, and support. Cards either open an internal workspace or clearly link to an official UC destination. Official dates and eligibility must be checked with the university.</p><div class="case-shot-grid">{@render screenshot('academic-progress.png')}{@render screenshot('academic-services.png')}</div></article>
    <article class="case-walkthrough"><span class="eyebrow">E / Personal planning and navigation</span><h3>Small controls that support the larger task.</h3><p>Tasks & reminders lets students mark tasks complete, switch between To do, Completed, and All tasks, and choose personal target dates. Today, Overdue, Upcoming, and Completed communicate urgency. These are browser-local personal reminders, not official deadlines or delivered notifications.</p><p>Search the portal opens a keyboard-accessible overlay with Cmd/Ctrl+K or /. The visible hint adapts to the platform. The footer’s optional Quick tour explains where familiar tasks moved. A profile menu switches between two isolated synthetic students; theme and profile preferences support local exploration. Financial-aid and scholarship pages offer official resource links rather than real transactions.</p><div class="case-shot-grid">{@render screenshot('personal-targets.png')}{@render screenshot('quick-tour.png')}</div></article>
    <article class="case-walkthrough"><span class="eyebrow">F / Use the same workflow on a phone</span><h3>Keep the information, change the layout.</h3><p>The mobile navigation drawer preserves destinations, Home retains its essentials and agenda, and the filter panel stacks within the viewport. Section meeting details receive more emphasis and primary section actions have a minimum 44px height. Current 375px checks found no horizontal document overflow on Home, class search, or the confirmed schedule.</p><div class="case-shot-grid case-phone-shots">{@render screenshot('mobile-home.png')}{@render screenshot('mobile-filters.png')}</div></article>
  </section>

  <section class="case-section" id="feedback" tabindex="-1">
    <span class="eyebrow">05 / Feedback & subsequent iteration</span>
    <h2>Feedback becomes a visible change.</h2>
    <p>Eleven student feedback comments supplied by the project author guided a subsequent implementation iteration. Because a working prototype already existed, this is documented as feedback before that revision. We retained the reassuring confirmation and revised planning, terminology, mobile controls, guidance, and date visibility.</p>
    <div class="table-scroll"><table class="feedback-iteration-table"><caption>Eleven comments and their design responses</caption><thead><tr><th>Feedback</th><th>Response in this iteration</th><th>Decision</th></tr></thead><tbody>{#each feedbackRevisions as item}<tr><td><strong>{item.id} · {item.perspective}</strong><p class="muted small">{item.concern}</p></td><td>{item.change}</td><td><span class="badge neutral">{item.status}</span></td></tr>{/each}</tbody></table></div>
    <details class="case-evidence-image"><summary>See the captured feedback-to-change record</summary>{@render screenshot('feedback-revisions.png')}</details>
    <h3>What verification establishes</h3><p>All 26 behavioral tests pass. Browser walkthroughs exercised named prerequisites, time and campus-day filtering, the blocked conflict review and corrected enrollment, personal target labels and persistence, the tour, and keyboard search. Captures at 1440px and 375px document the current desktop and mobile states. These checks establish working behavior; they do not establish a measured improvement in student task success, speed, or satisfaction.</p>
    <p>The feedback collection dates, individual task timings, and a structured participant retest were not supplied. The next evaluation should test whether students understand the revised states and controls, using the prepared protocol and recording actual observations.</p>
    <div class="button-row"><a class="button secondary" href={`${project.repository}/blob/main/docs/feedback.md`} target="_blank" rel="noreferrer">Student feedback<Icon name="external" size={14}/></a><a class="button secondary" href={`${project.repository}/blob/main/docs/feedback-revisions.md`} target="_blank" rel="noreferrer">Revision log<Icon name="external" size={14}/></a><a class="button secondary" href={`${project.repository}/blob/main/docs/validation.md`} target="_blank" rel="noreferrer">Verification record<Icon name="external" size={14}/></a></div>
  </section>

  <section class="case-section" id="implementation" tabindex="-1">
    <span class="eyebrow">06 / Implementation</span>
    <h2>A focused front end, with meaningful behavior.</h2>
    <p>Svelte 5 provides reactive components and stores; JavaScript holds the domain rules; Vite builds the static application. The project uses @sveltejs/vite-plugin-svelte, local SVG icons, CSS design tokens, native HTML dialogs, browser localStorage, and the built-in Node test runner. No UI framework, backend, or database is required.</p>
    <p><strong>Data flow:</strong> catalog and sample plans supply records → pure functions filter or validate them → the store saves valid profile state → Svelte renders the resulting status. UI components do not call a university API. Term-specific carts prevent selections crossing semesters; safe hydration rejects unknown records and isolates profiles. Storage failures show a session-only notice.</p>
    <div class="table-scroll"><table><caption>Code structure and responsibilities</caption><thead><tr><th>Location</th><th>Responsibility</th></tr></thead><tbody>{#each modules as module}<tr><td><code>{module[0]}</code></td><td>{module[1]}</td></tr>{/each}</tbody></table></div>
    <p>Hash-based routes work on GitHub Pages without server rewrite rules. The deployment workflow runs syntax checks, 26 behavioral tests, and a production build before publishing. Tests cover transaction atomicity, prerequisites, conflicts, terms, credit limits, waitlists, drops, profile separation, saved filters, valid dates, progress totals, and calendar output.</p>
    <p><strong>Prototype boundaries:</strong> authentication, real student records, live seats, linked lecture/lab rules, payment processing, delivered reminders, and transfer-credit evaluation are outside the implemented scope. The Aayush profile and GPA are demo presentation data. The application never registers students in real UC courses.</p>
    <div class="button-row"><a class="button primary" href={project.publishedUrl} target="_blank" rel="noreferrer">Try the public application<Icon name="external" size={15}/></a><a class="button secondary" href={project.repository} target="_blank" rel="noreferrer">Browse the source<Icon name="code" size={15}/></a><a class="button secondary" href="https://aayushkeshari.github.io/" target="_blank" rel="noreferrer">Aayush’s portfolio<Icon name="external" size={15}/></a></div>
  </section>

  <section class="case-section" id="demo" tabindex="-1">
    <span class="eyebrow">07 / Demo & presentation</span>
    <h2>See the workflow in action.</h2>
    {#if project.demoVideo}<p>The 2:54 guided walkthrough uses synthetic narration over earlier captured prototype states. Its theme and sample profile predate the screenshots above; it does not show every subsequent revision and is not a live screen recording or participant test.</p><video controls preload="metadata"><source src={project.demoVideo} type="video/mp4"/><track kind="captions" src="./demo-captions.vtt" srclang="en" label="English" default/></video>{/if}
    <p>The final presentation summarizes the problem, research, design decisions, workflow, verification, and next steps, with timed notes for the team.</p><a class="button secondary" href="./presentation.html" target="_blank" rel="noreferrer">Open final presentation<Icon name="external" size={15}/></a>
  </section>

  <section class="case-section" id="future" tabindex="-1">
    <span class="eyebrow">08 / Future work & reflection</span>
    <h2>Test the decisions that matter next.</h2>
    <p>The working result is a connected registration prototype with explicit state changes and recoverable errors. The most useful next step is to evaluate those decisions with students rather than treating completed code as evidence of usability.</p>
    <ol class="future-list">
      <li><strong>Retest the revised tasks.</strong> Ask students to choose sections around work and campus days, resolve a conflict, interpret a receipt, explain the conditional credit total, and set a personal target. Record success, errors, observations, and timings with the prepared protocol. Compare results only after collecting a defensible baseline.</li>
      <li><strong>Evaluate accessibility more broadly.</strong> Run screen-reader sessions, keyboard and focus checks, zoom/reflow checks, contrast review, and physical-device testing. The current responsive screenshots and semantic controls do not constitute a WCAG conformance audit.</li>
      <li><strong>Extend the unfinished academic capabilities.</strong> The transfer-credit explanation and waitlist labels show where the present prototype stops. A next iteration could add advisor-reviewed equivalencies, meaningful waitlist position and notification states, linked lecture/lab choices, and changing seat inventory.</li>
      <li><strong>Validate academic rules and dates.</strong> Replace illustrative classifications, graduation assumptions, and milestones with an advisor-approved model before considering real university integration. Keep personal targets clearly separate from official deadlines.</li>
      <li><strong>Refresh the live walkthrough.</strong> Record a current team-narrated demo that includes the revised filters, mobile agenda, and personal targets; retain captions and verify their timing.</li>
    </ol>
    <p><strong>Reflection:</strong> the most consequential redesign was the distinction between a plan and a confirmed outcome. Once that distinction was explicit in the data and workflow, the interface could explain what had happened, what was still uncertain, and how to continue. Future research should test whether students interpret those distinctions as intended.</p>
    <p class="fine-print">Progress toward unfinished features is visible above: the class-search screenshot shows the full-section waitlist limitations, and the academic-progress screenshot shows transfer-credit guidance without an equivalency evaluator. These are documented scope boundaries, not completed integrations.</p>
    <div class="button-row"><a class="button primary" href={project.publishedUrl} target="_blank" rel="noreferrer">Open Catalyst<Icon name="external" size={15}/></a><a class="button secondary" href={project.repository} target="_blank" rel="noreferrer">Source code<Icon name="code" size={15}/></a><button class="button secondary" onclick={()=>window.print()}>Print case study<Icon name="file" size={15}/></button></div>
  </section>
</div>

<style>
.case-contents{padding:24px 0;border-bottom:1px solid var(--line)}
.case-contents>div{display:flex;flex-wrap:wrap;gap:10px 22px;margin-top:13px}
.case-contents a{font-size:12px;text-decoration:underline;text-underline-offset:4px}
.case-summary-grid{display:grid;grid-template-columns:1fr 1fr;gap:18px;margin:25px 0}
.case-summary-grid h3{font-size:16px;margin-bottom:10px}
.case-summary-grid p{font-size:13px;color:var(--muted);line-height:1.85}
.case-section{scroll-margin-top:24px}
.case-section:focus{outline:none}
.case-section>p,.case-walkthrough>p{font-size:14px;line-height:1.9}
.case-walkthrough{padding-top:36px;margin-top:36px;border-top:1px solid var(--line)}
.case-walkthrough>h3{font-size:27px;margin:12px 0 16px}
.case-walkthrough>p{color:var(--muted);margin:13px 0;max-width:850px}
.case-walkthrough strong,.case-section>p strong{color:var(--ink)}
.case-shot-grid{display:grid;grid-template-columns:1fr 1fr;gap:24px;align-items:start;margin-top:26px}
.case-shot{margin:28px 0 0;min-width:0}
.case-shot-grid .case-shot{margin:0}
.case-shot-link{display:block;border-radius:8px}
.case-shot img{display:block;width:100%;height:auto;border:1px solid var(--line);border-radius:8px}
.case-shot figcaption{font-size:12px;line-height:1.75}
.case-shot figcaption a{display:inline-flex;align-items:center;gap:4px;text-decoration:underline;text-underline-offset:3px}
.case-phone-shots{max-width:700px;margin-left:auto;margin-right:auto;gap:40px}
.case-evidence-image{margin:24px 0;padding:18px;border:1px solid var(--line);border-radius:8px}
.case-evidence-image summary{cursor:pointer;font-size:13px;font-weight:600}
.case-section table caption{text-align:left;font-weight:600;margin-bottom:12px;font-size:12px;color:var(--muted)}
.case-section code{overflow-wrap:anywhere;font-size:11px}
@media(max-width:650px){.case-summary-grid,.case-shot-grid{grid-template-columns:1fr}.case-phone-shots{max-width:375px;gap:28px}.case-walkthrough>h3{font-size:24px}.case-contents a{padding:5px 0}.case-palette{flex-wrap:wrap}.case-palette>span{flex-basis:50%}.case-contents>div{gap:6px 18px}}
@media print{.case-contents{display:none}.case-shot-grid{display:block}.case-shot{break-inside:avoid;margin:24px 0!important}.case-shot img{max-height:650px;object-fit:contain;object-position:left top}.case-walkthrough{break-inside:auto}.case-contents a,.case-shot figcaption a{display:none}}
</style>

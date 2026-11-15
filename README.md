# Catalyst, reimagined

A student-centered redesign of the University of Cincinnati's Catalyst portal. The working Svelte application connects class discovery, section comparison, a term-specific enrollment cart, validation, confirmation, and a responsive schedule.

**Student project:** Aayush Keshari · Nipun Chandra · Shivam Kharangate
## Run

Requires Node.js 22.12+ (Node 24 recommended).

```sh
npm ci
npm run dev
```

Open the printed local URL. To review without starting a server, run `npm run build` and open **dist/standalone.html** directly in a browser. The normal static website is **dist/index.html**; deploy the entire dist folder.

```sh
npm run check
npm test
npm run build
npm run preview
```

## What works

- Home dashboard with academic summary, essential links, weekly/list schedules, and planning milestones.
- Synthetic senior and first-year profiles, with independent browser-local state and reset.
- Class search by code (including spaces), title, or instructor; subject, format, day, seat, and conflict filters. Search context persists per profile and term.
- Section detail dialogs and comparison of up to three sections.
- Term-specific carts; planned courses are never automatically enrolled.
- Registration-window, term, prerequisite, duplicate-course, full-section, meeting-conflict, hold, and credit-limit checks.
- Review-before-enroll transaction; a blocking issue leaves the whole selection unchanged. Successful enrollment creates a dated receipt and updates the schedule.
- Waitlists labeled as not enrolled; confirmed drops with immediate undo.
- Calendar export (.ics), printing, and a mobile agenda that remains available without the desktop calendar.
- Academic progress with earned/in-progress/remaining credits, completed transcript, graduation checklist, and a readable downloadable degree summary.
- Searchable academic services, personal task list, profile preferences, official financial-aid resource links, and saved scholarship resources.
- Keyboard command search (Cmd/Ctrl+K or /), focus-trapping native dialogs, theme switching, responsive navigation, reduced-motion handling, and status announcements.
- Public-ready case study at `#/case-study`, including research sources, heuristic evidence, design rationale, source limitations, features, implementation, and future work.

## Explore the core scenario

1. Choose **Aayush Keshari** in the top-right profile menu.
2. Under Classes & schedule, choose **Spring 2027**.
3. Add **CS5002 section 001** and **CS5167 section 001** to the cart.
4. Open the cart. Read the overlap explanation; review is blocked until the conflict is resolved.
5. Remove CS5167 section 001. Find CS5167 again and choose **section 002** instead.
6. Review and confirm enrollment. Verify the receipt and updated six-credit spring schedule.
7. Drop a class and use the notification's Undo action to restore it.
8. Switch to **Joel Miller** and try CS5167. The missing CS2028C prerequisite is explained.

A current in-progress prerequisite may support spring planning, contingent on passing it. This is a planning rule, not official academic policy.

## Routes

| Hash route | Experience |
| --- | --- |
| `#/` | Home dashboard |
| `#/classes` | Find, compare, cart, enroll, and manage schedule |
| `#/classes?tab=schedule` | Open confirmed schedule |
| `#/classes?q=CS5167` | Deep-link to a course search |
| `#/progress` | Degree overview |
| `#/progress?view=transcript` | Completed coursework |
| `#/progress?view=graduation` | Personal graduation checklist |
| `#/services` | Searchable service directory |
| `#/profile` | Profile and local preferences |
| `#/tasks` | Personal task checklist |
| `#/finances` | Illustrative finance overview and official links |
| `#/scholarships` | Official resource links and saved items |
| `#/case-study` | Portfolio case study |

Hash navigation is deliberate: nested links work on GitHub Pages and other static hosts without rewrite rules. The earlier SvelteKit scaffold has been replaced by Svelte 5 + Vite; both Svelte and SvelteKit are permitted by the assignment. The original application is preserved in the initial local Git commit.

## Structure

```text
src/App.svelte             Shell, hash routes, command search, profile menu
src/pages/                 Home, academic pages, Finances, Profile, Tasks, directories, CaseStudy
src/lib/catalog.js         Synthetic courses, sections, profiles, terms, services
src/lib/workspace-directory.js  Tasks, admissions, tools, contacts, saved scenarios
src/lib/model.js           Enrollment rules, progress, search, state hydration, ICS export
src/lib/store.js           Per-profile storage and UI notifications
src/lib/components/        Icons, native dialog, responsive schedule
src/lib/data/              Original synthetic plans and transcripts
src/lib/project.js         Case-study links, screenshots, walkthrough video path
static/research/            Original baseline and implementation screenshots
scripts/                   Standalone HTML build and supporting utilities
tests/                     Domain behavior regression tests
 docs/                     Research, feedback templates, walkthrough and presentation
```

No backend or database is required. Stored records use `catalyst.demo.v2.<profile-id>`; clearing site data resets them. Corrupt or mismatched versions fall back to clean workspace state. When storage cannot be written, the app displays a session-only notice.

## Public case study and portfolio

- [Read the complete case study](https://aayushkeshari.github.io/catalyst-reimagined/#/case-study)
- [Open the working application](https://aayushkeshari.github.io/catalyst-reimagined/)
- [Aayush Keshari’s portfolio](https://aayushkeshari.github.io/) → Projects → Catalyst, reimagined
- [Source repository](https://github.com/aayushkeshari/catalyst-reimagined)

The case study introduces the problem for a first-time visitor, explains two research methods and eight specific heuristic findings, maps five Figma frames to design intent, and documents six interface walkthroughs with ten current screenshots. It includes the eleven feedback responses, code structure, testing, implementation scope, and prioritized future work. Screenshot links open full-size images; section links and a print control support reviewing the documentation.

The case-study source is versioned in `src/pages/CaseStudy.svelte`, with screenshot metadata in `src/lib/project.js` and images in `static/research/`. The repository is under Aayush’s account, so this copy does not depend on a teammate’s portfolio. See [documentation coverage](docs/documentation-coverage.md).

## Research and evaluation

Completed: background research using Nielsen’s heuristics and W3C guidance, a source/material heuristic evidence review, and an implementation iteration responding to eleven student feedback comments supplied by the project author. Findings distinguish original Catalyst screenshot/critique evidence from code-verifiable issues in the initial student application.

A structured participant retest, measured before/after comparison, and formal accessibility audit remain future work. The prepared protocol and observation sheets do not contain task timings or SUS scores. The application is not an official degree audit and makes no WCAG conformance claim.

## Deployment

The public app uses GitHub Pages. `.github/workflows/deploy.yml` runs syntax checks, 65 behavioral tests, and a production build before deployment from main. `src/lib/project.js` contains the public application, source, Figma, and walkthrough links. Hash-based routes work without server rewrite rules. To use another static host, build and deploy the complete `dist/` directory.

The previous generated video and captions remain removed. Aayush’s recorded [10:59 walkthrough](https://youtu.be/yZYuDvyQYdc) is uploaded to YouTube. The case study includes a responsive YouTube player, a direct watch link, and a Video navigation shortcut.

## References

- [Original repository](https://github.com/nightfury3128/UI-catalyst)
- [Figma frames](https://www.figma.com/design/QmzVctFez8wJ2DL9re1hA9/Untitled?node-id=0-1)
- [Nielsen's 10 usability heuristics](https://www.nngroup.com/articles/ten-usability-heuristics/)
- [W3C status-message guidance](https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html)
- [W3C reflow guidance](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html)

## Current delivery status

The production build and all 65 behavioral tests pass in the current revision. Browser checks at 1440px, 768px, and 375px and the screenshot updates are recorded in docs/validation.md. The expanded case study includes eight heuristic findings, six illustrated walkthroughs, full-size screenshot links, implementation details, and future work.

The walkthrough is uploaded here: https://youtu.be/yZYuDvyQYdc (10:59). The case study embeds this recording and provides a direct YouTube watch link and a Video section shortcut.

Published and verified at https://aayushkeshari.github.io/catalyst-reimagined/ on GitHub Pages. See docs/deployment-status.md for deployment details. The case study is linked from the Catalyst entry in Aayush’s portfolio. Follow-up student testing, team review, and actual presentation/submission remain team tasks.


## Feedback iteration

The eleven feedback items in docs/feedback.md are mapped to implemented changes in docs/feedback-revisions.md and the public case study. Class filters now include inclusive meeting-time bounds and existing campus days. Prerequisites include names. Tasks support saved personal target dates and urgency, without inventing official deadlines. A Quick tour explains the new navigation; progress and waitlist messages clarify important limits. All 26 regression tests pass. Student retesting remains a separate next step.


## My Academics hierarchy

The expanded academic area restores the five original sections and 31 destinations, with shared desktop/mobile navigation, local record and planning workflows, and verified links for official university services. See [academic coverage and verification](docs/academic-hierarchy.md).

## Academic requirements

The primary student’s academic views share the 45 course rows transcribed from the supplied My Academic Requirements screenshots. Grades, course history, progress, requirement details, graduation planning, and HTML/CSV exports use this source. The audit preserves 37 requirement groups, applied substitutions, fractional transfer credits, pass grades, unused coursework, current classes, and planned future work.

The report lists 125 required hours and 133.01 taken. Visible course rows total 110.01 completed, 16 current, and 3 planned credits; the report total is retained separately rather than filling gaps with invented courses. The cumulative GPA of 3.673 follows the supplied academic profile; term GPA uses graded completed coursework and excludes P and TA grades. ESL1011’s 0.99 applied and 0.01 unused credits remain one 1.00-credit transcript entry.

User-facing labels, metadata, notifications, exports, and case-study images use normal workspace terminology. Existing browser storage keys are retained for compatibility with saved work.

All 45 supplied course codes also appear in Classes & schedule, bringing the catalog to 50 unique courses including the existing offerings. Every course has section 001; 23 courses offer additional sections, for 74 sections total. Assigned meeting times, rooms, seats, and prerequisites feed search, comparison, cart review, enrollment, schedule export, and swap validation. Earlier saved planning entries migrate to section 001 while staying in the cart. STAT2037 uses 3 course credit hours while its 2.01 applied transfer credits stay in the academic record.

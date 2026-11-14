# Catalyst, reimagined

A student-centered redesign of the University of Cincinnati's Catalyst portal. The working Svelte prototype connects class discovery, section comparison, a term-specific enrollment cart, validation, confirmation, and a responsive schedule.

**Student project:** Aayush Keshari · Nipun Chandra · Shivam Kharangate. All student records, sections, seat counts, balances, and enrollment actions are synthetic. This application is not connected to UC systems.

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

1. Choose **Arthur Morgan** in the top-right profile menu.
2. Under Classes & schedule, choose **Spring 2027**.
3. Add **CS5002 section 001** and **CS5167 section 001** to the cart.
4. Open the cart. Read the overlap explanation; review is blocked until the conflict is resolved.
5. Remove CS5167 section 001. Find CS5167 again and choose **section 002** instead.
6. Review and confirm enrollment. Verify the receipt and updated six-credit spring schedule.
7. Drop a class and use the notification's Undo action to restore it.
8. Switch to **Joel Miller** and try CS5167. The missing CS2028C prerequisite is explained.

A current in-progress prerequisite may support spring planning, contingent on passing it. This is a simplified demo rule, not official academic policy.

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

Hash navigation is deliberate: nested links work on GitHub Pages and other static hosts without rewrite rules. The earlier SvelteKit scaffold has been replaced by Svelte 5 + Vite; both Svelte and SvelteKit are permitted by the assignment. The original prototype is preserved in the initial local Git commit.

## Structure

```text
src/App.svelte             Shell, hash routes, command search, profile menu
src/pages/                 Home, Classes, Progress, Services, Account, CaseStudy
src/lib/catalog.js         Synthetic courses, sections, profiles, terms, services
src/lib/model.js           Pure enrollment rules, progress, search, ICS export
src/lib/store.js           Per-profile storage and UI notifications
src/lib/components/        Icons, native dialog, responsive schedule
src/lib/data/              Original synthetic plans and transcripts
src/lib/project.js         Case-study links, screenshots, demo video path
static/research/            Original baseline and implementation screenshots
scripts/                   Standalone HTML build and supporting utilities
tests/                     Domain behavior regression tests
 docs/                     Research, feedback templates, demo and presentation
```

No backend or database is required. Stored records use `catalyst.demo.v2.<profile-id>`; clearing site data resets them. Corrupt or mismatched versions fall back to clean demo state. When storage cannot be written, the app displays a session-only notice.

## Research and academic integrity

Completed: source-based heuristic evidence review and background research using Nielsen's heuristics and W3C accessibility guidance. These are documented in the case study and `docs/`.

**Not completed:** new student interviews, participant think-aloud testing, measured before/after comparisons, or instructor feedback. The prepared study protocol and CSV sheets contain no fabricated results. Conduct those sessions and add the real observations before claiming participant validation.

The original critique's class-reported Catalyst behavior is explicitly distinguished from verified source issues. This prototype is not an official degree audit and makes no WCAG compliance claim.

## Publish

The included GitHub Actions workflow runs checks, tests, and a static build, then deploys main to GitHub Pages. In your target repository, enable **Settings → Pages → Build and deployment → Source: GitHub Actions**. Push or merge this implementation into main. The Actions deployment reports the actual public URL; do not claim the URL is live before the deployment succeeds.

Alternatively, deploy `dist/` to any static host. The portfolio case study is in the same app at `<deployed-url>/#/case-study`. Link that page from one group member's portfolio.

In `src/lib/project.js`, update the repository URL after pushing and set `publishedUrl` to the verified deployment. Put the narrated 2–3 minute demo at `static/demo.mp4`, set `demoVideo` to `./demo.mp4`, add matching `static/demo-captions.vtt`, and rebuild. The recording script is in `docs/demo-script.md`.

## Assignment materials

- [Research and source limitations](docs/research.md)
- [Heuristic review](docs/heuristic-evaluation.md)
- [Think-aloud protocol](docs/study-protocol.md)
- [Participant observation sheet](docs/participant-observations.csv)
- [Feedback-to-change log](docs/feedback-log.csv)
- [Demo recording script](docs/demo-script.md)
- [Final presentation speaker notes](docs/final-presentation.md)
- [Eight-slide presentation](static/presentation.html)
- [Verification record](docs/validation.md)
- [Submission checklist](docs/submission-checklist.md)

## References

- [Original repository](https://github.com/nightfury3128/UI-catalyst)
- [Figma frames](https://www.figma.com/design/QmzVctFez8wJ2DL9re1hA9/Untitled?node-id=0-1)
- [Nielsen's 10 usability heuristics](https://www.nngroup.com/articles/ten-usability-heuristics/)
- [W3C status-message guidance](https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html)
- [W3C reflow guidance](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html)

## Current delivery limits

The production bundle and 21 domain tests pass. The actual interface was reviewed in native browsers, including comparison, conflict recovery, successful enrollment, drop/undo, profile separation, and the mobile agenda. See docs/validation.md for exact coverage.

The public upload is blocked by this session’s network policy. A private Site identity is preserved for continuing publication; see docs/deployment-status.md. The upstream GitHub repository has not been modified.

The narrated recording is not complete. docs/demo-script.md and docs/demo-storyboard.json are ready; an optional macOS renderer is included, but its export was unavailable in this restricted environment. Do not submit the storyboard or script as a completed video. Real participant feedback also remains outstanding.

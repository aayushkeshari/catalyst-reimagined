# Final presentation — target 5 minutes 30 seconds

Team: Aayush Keshari, Nipun Chandra, Shivam Kharangate. Suggested speaker allocation; adjust to your actual contributions. Every team member should speak. Allow an additional 1–2 minutes for questions.

## Slide 1 — Catalyst, reimagined (0:00–0:30; Aayush)

“We redesigned Catalyst around a student’s next step: finding a suitable class and knowing that enrollment is complete. The goal is a significant change to the registration workflow, supported by clearer information architecture and state communication. Our prototype uses fictional student data.”

Show: home screenshot and project/team names.

## Slide 2 — The problem we chose (0:30–1:10; Aayush)

“The original screenshot shows a visually busy homepage with similarly emphasized tiles. Our supplied class critique also reports fragmented registration labels and difficult return paths. We keep those reported behaviors separate from issues we verified in the initial prototype source. The core problem is uncertainty: where to go, what state a class is in, and how to recover.”

Show: original homepage and three specific task problems. Do not claim live original-system failures were reproduced.

## Slide 3 — Research and design direction (1:10–1:55; Nipun)

“We completed background research using Nielsen’s heuristics and W3C guidance, plus a heuristic evidence review of the supplied artifacts and initial source. These informed three priorities: one connected workspace, distinct planning and enrollment states, and actionable error recovery. We did not collect new student-study results; our protocol is ready for that next evaluation.”

Show: finding → design response mapping; indicate evidence types.

## Slide 4 — Find and compare (1:55–2:40; Nipun)

“Class search accepts course codes, titles, and instructors. Common filters are grouped, with more options available when needed. Students can inspect or compare sections without navigating away. Search context persists, and the selected term controls both offerings and the cart. Future planned courses are not silently marked enrolled.”

Live demo: search CS5167 and compare sections 001/002.

## Slide 5 — Prevent, recover, confirm (2:40–3:45; Shivam)

“The cart makes it explicit that a seat is not reserved. We check registration status, prerequisite eligibility, duplicate courses, availability, time overlap, holds, and credit limits. Here two sections overlap. The error names the class and suggests another section. Once the plan is valid, review and confirmation create a receipt and update the schedule. A failed batch does not partially enroll classes.”

Live demo: conflicting cart → alternative section → confirmation. Prepare this state before the presentation so it fits the time.

## Slide 6 — The rest of the student experience (3:45–4:25; Shivam)

“The schedule offers week and list views and a mobile agenda. Calendar export is available. Drops are confirmed and immediately reversible. Academic progress separates earned, current, and future coursework; service links, tasks, and preferences are functional local interactions. Two demo profiles let us explore different student needs.”

Show: schedule and progress screenshots. Mention no real financial or university system integration.

## Slide 7 — Implementation and verification (4:25–5:00; Aayush)

“The interface is Svelte 5 and JavaScript, built with Vite for static hosting. A pure domain model owns enrollment rules, while stores persist each synthetic profile locally. Behavioral regression tests cover term separation, conflicts, prerequisites, transaction atomicity, persistence, and credit totals. A successful production build packages the app.”

Show: compact component/domain/store structure and actual verification report. State browser QA limits exactly as documented in validation.md.

## Slide 8 — Next steps and takeaway (5:00–5:30; all / Aayush closing)

“Next, we will run the prepared tasks with real students, collect anonymized feedback, and revise the design from observed evidence. We also need broader accessibility evaluation and advisor confirmation of academic rules. The working prototype already demonstrates our main redesign idea: keep the task connected and make the next step and final state clear.”

Show: verified app URL, case-study URL, GitHub, Figma, and actual video link if completed. Do not label planned deployment or a recording script as a finished deliverable.

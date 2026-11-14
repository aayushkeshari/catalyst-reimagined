# Verification record

Date: November 14, 2026.

## Automated

- `npm run check`: JavaScript syntax checks passed.
- `npm test`: 21 domain behavior checks passed (see tests/enrollment.test.js).
- `npm run build`: Vite production build passed; Svelte compilation completed without accessibility/compiler warnings after fixes.
- `dist/standalone.html`: generated from the same production bundles for server-free local review.

## Observed browser walkthrough

Tested the actual rendered standalone build using native browser interactions, not just source inspection.

- Home: profile data, essentials, current schedule, and planning action rendered.
- Class search: CS5167 / `CS 5167` narrows the results to UI Design sections.
- Comparison: sections 001 and 002 display side by side.
- Conflict: CS5002-001 plus CS5167-001 produces named overlap messages; the review's Confirm enrollment button is disabled; no enrollment is made.
- Recovery: replace CS5167-001 with CS5167-002, review, confirm, and receive a dated receipt for two classes / six credits.
- Schedule: confirmed classes are visible after navigating away and back.
- Drop: confirmed drop reduces the schedule to one class / three credits; Undo restores two classes / six credits.
- Profile isolation: Joel has a separate cart and enrollment; trying CS5167 reports the missing CS2028C prerequisite and disables confirmation. Returning to Arthur preserves the six-credit schedule.
- Academic progress and academic services render with their respective data and controls.
- Narrow viewport: observed a 400px home agenda and a 375px confirmed-schedule agenda retaining the meeting details. The 375px screenshot is included.

## Limits

A normal HTTP preview server could not start because this session denied opening a listening port (`listen EPERM 127.0.0.1:5173`). The production bundle was reviewed through its self-contained file preview instead. This does not establish that the public host works until deployment is verified.

No claim of exhaustive browser coverage, a complete screen-reader audit, WCAG conformance, or measured participant usability improvements. The study sheets are intentionally empty.

## Publication and media export

- Private hosting registration succeeded; the exact identity is persisted in .openai/hosting.json. Source upload failed because the restricted environment could not resolve git.chatgpt-team.site. No production deployment is claimed.
- An optional local macOS narrated-walkthrough renderer was prepared (scripts/render-walkthrough.swift plus docs/demo-storyboard.json). Its export attempt failed under the session’s media restrictions; no usable video was produced. It is not part of npm build and is not a completed demo deliverable. The live recording script remains ready for the team.

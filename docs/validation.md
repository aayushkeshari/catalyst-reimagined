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

## Continuation verification

- Re-ran syntax checks, all 21 domain tests, and production build successfully.
- Local Vite HTTP preview now starts and responds with HTTP 200. The earlier listening-port restriction no longer applies.
- Browser access host was unavailable in this continuation; prior observed browser coverage above is retained, without claiming fresh interactive coverage.
- Exported static/demo.mp4: 174 seconds, 1920×1080, one video track and one audio track. Extracted and visually inspected the conflict-review frame at 80 seconds.
- Added matching English WebVTT captions and embedded the video in the case study. Captions use sentence timings estimated from word counts; they have not had a full playback/accessibility review.
- Video is a guided walkthrough of captured states with disclosed synthetic narration. It is not a live interface recording, participant evidence, or team-member narration.

No exhaustive browser audit, screen-reader audit, WCAG conformance, or measured participant usability improvement is claimed. Study sheets remain empty.

## Publication

Source synchronization and deployment succeeded through the supported Sites workflow. The native deployment service verified the production URL; owner-private access was preserved. See deployment-status.md for IDs and URL. Caption timing validation confirmed 38 ordered cues ending within the 174-second video.

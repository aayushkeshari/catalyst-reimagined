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

Source synchronization and deployment succeeded through the supported Sites workflow. The native deployment service verified the production URL; owner-private access was preserved for that separate deployment. The project now also has a public GitHub Pages workflow in aayushkeshari/catalyst-reimagined. See deployment-status.md for IDs and URL. Caption timing validation confirmed 38 ordered cues ending within the 174-second video.

## Profile and branding update

The primary demo profile displays the requested GPA of 3.975 through explicit demo-profile metadata; synthetic transcript grades remain unchanged. The progress page labels this as a demo profile GPA. The other profile still uses its transcript-derived GPA. The UC monogram in the sidebar and home banner is stored locally in static/uc-monogram.svg, sourced from the logo-symbol group on https://www.uc.edu/about/marketing-communications/brand-guide/logos-marks.html. The independent student prototype notice remains visible.


## Feedback iteration — November 14, 2026

Added prerequisite names, time and campus-day filters, clearer waitlist limits, personal target dates and urgency, a conditional credit explanation, transfer-credit guidance, platform-aware keyboard hints, and the optional Quick tour. All 26 tests and the production build pass. Brave checks covered the new filters, saved personal dates, tour, and Cmd+K search. See [feedback-revisions.md](feedback-revisions.md) for the exact checks and remaining responsive/participant retest limits.

## Screenshot refresh — November 14, 2026

- Captured the public GitHub Pages application in the current red/black theme with the Aayush demo profile at desktop 1440×1000 and mobile 375×900 viewports. Fifteen images now cover the main pages, comparison, conflict recovery, confirmation, schedule, feedback revisions, tour, filters, and personal targets. The original Catalyst screenshot is preserved.
- Repeated the two-course conflict/recovery flow in the public app: the overlapping sections blocked confirmation; replacing the conflicting section produced a receipt and two confirmed classes / six credits.
- Start-after 13:00, end-before 16:00, and campus-day filtering produced three matching sections. Personal targets displayed Today, Upcoming, and Overdue for the example dates.
- At 375px, Home, confirmed schedule, and class search had a document width of 375px. The two visible Add to cart section actions measured 44px high. The schedule displayed its agenda and expanded filters stacked vertically.
- Visually inspected refreshed captures. These are developer viewport checks, not a physical-device, screen-reader, or participant retest. The existing MP4 still contains earlier captured states.

## Expanded public documentation and portfolio — November 14, 2026

- Production Svelte build passed without compiler warnings. The portfolio page TSX syntax transform passed; its change adds the Catalyst project and a visible case-study link to the existing project collection.
- Public GitHub Actions run 43651012922 completed successfully for the expanded documentation, including the existing checks, 26 tests, build, and deployment.
- Verified the deployed case study contains eight heuristic findings, five linked Figma frames, eleven feedback responses, eight main sections, and fifteen screenshot figures with full-size links.
- Section navigation to Interface moved focus to that section and positioned it approximately 24px below the viewport top.
- At 1440px and 375px, document width matched viewport width. The 600px research table remained inside a horizontally scrollable 343px container at the mobile viewport, without page-wide overflow. Visually inspected the desktop and mobile hero/navigation.
- Verified the live portfolio Projects window shows Catalyst, reimagined and the Read the UI/UX case study link targeting the public case-study URL. Preserved the existing projects and portfolio styling.
- Local file preview was unavailable under browser protocol policy; layout checks used the published HTTPS application. No new participant retest, usability metric, or accessibility-conformance claim is added.

## Video removal and recording handoff — November 14, 2026

At the project author's request, removed the generated MP4, its captions, and the case-study video player. Cleared the configured video URL. Earlier video-export entries above are historical records, not the current publication state. The replacement recording is pending. Updated docs/demo-script.md for the Aayush profile and current controls, with a 2:50 action/voiceover sequence, microphone setup, trimming, and delivery instructions.

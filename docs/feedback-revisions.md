# Feedback revisions

Implementation date: November 14, 2026.

The eleven feedback items in [feedback.md](feedback.md) were mapped to the changes below. Positive feedback about enrollment confirmation was retained. Transfer-credit evaluation and a live waitlist queue remain outside the prototype; their limitations are now clearer in the interface.

## Feedback-to-change record

| ID | Perspective and concern | Implementation response | Decision |
| --- | --- | --- | --- |
| F01 | **First-year student:** Prerequisite codes need course names. | Course names now accompany prerequisite codes in results, details, comparison, and blocking messages. | Implemented |
| F02 | **Graduating senior:** Keep the clear confirmation and receipt. | Retained the dated enrollment receipt and explicit confirmed schedule. | Retained |
| F03 | **Commuter student:** Avoid adding extra campus days. | Added Keep to my campus days, using the selected term’s enrolled classes and cart. Asynchronous sections add no campus day. | Implemented |
| F04 | **Student working part time:** Filter sections around work hours. | Added start/end time bounds, inclusive at the boundary. Every meeting must fit; invalid ranges explain how to recover. | Implemented |
| F05 | **Student using a phone:** Make section times and the primary action easier to scan. | Increased mobile meeting text and section emphasis; section actions now have a minimum 44px height. | Implemented |
| F06 | **Transfer student:** Distinguish transfer credits from requirement equivalencies. | Added an expandable explanation and advising link. Evaluating transfer credit remains outside this prototype. | Clarified |
| F07 | **Student considering a full section:** Explain waitlist position and notifications. | Full-section controls and the waitlist now state that queue positions and notifications are unavailable in this demo. | Clarified |
| F08 | **Keyboard user:** Show the shortcut for the current platform. | The portal search hint shows ⌘ K on Apple platforms and Ctrl K elsewhere. Both shortcut combinations remain supported. | Implemented |
| F09 | **Student planning graduation:** Emphasize that current credits still need passing grades. | The remaining-credit metric explicitly states the passing assumption and the total credits not yet earned. | Implemented |
| F10 | **Student managing several deadlines:** Replace vague dates with useful dates and urgency. | Students can set personal target dates, with Today, Overdue, Upcoming, or Completed labels. No official deadline is invented. | Implemented |
| F11 | **Student who prefers the existing layout:** Help locate familiar tasks in the new navigation. | Added an optional Quick tour in the footer, with direct links to class planning and personal tasks. | Implemented |

## Implementation references

- `src/lib/catalog.js`: prerequisite names resolve from the existing catalog and sample plans.
- `src/lib/model.js`: meeting-time bounds, campus-day filtering, saved-filter hydration, personal-date validation and urgency, platform shortcut label.
- `src/pages/Classes.svelte`: filters, named prerequisites, and waitlist limitations.
- `src/pages/Account.svelte`: per-profile personal target dates and explicit urgency labels.
- `src/pages/Progress.svelte`: conditional credit total and expandable transfer-credit explanation.
- `src/App.svelte`: platform shortcut hint and optional Quick tour.
- `src/app.css`: mobile meeting text and section-action sizing.
- `src/pages/CaseStudy.svelte` and `src/lib/feedback.js`: public feedback-to-change mapping.

## Follow-up verification

Developer verification on November 14, 2026:

- Syntax checks passed; all 26 behavioral tests passed; production build passed.
- New regression coverage checks inclusive time boundaries, invalid time ranges, asynchronous sections with active time filters, campus-day filtering based on cart/enrollment, saved filters, profile separation, valid calendar dates, urgency labels, prerequisite names, and Apple/Windows/Linux shortcut labels.
- In Brave, verified prerequisite course names and explicit waitlist-limit text. With a Mon/Wed cart, the campus-day filter reduced the catalog from 14 to seven sections. Adding an afternoon start bound reduced it to the matching scheduled section.
- Set a personal target to November 14, 2026; the interface displayed Today, and the date and label persisted after reload.
- Opened the optional Quick tour, dismissed it with Escape, and opened portal search with Cmd+K.
- The local HTTP preview was blocked by the execution environment. Browser checks used the generated standalone build. A fresh mobile viewport check was not completed in this iteration; responsive CSS changes should receive a follow-up device check.

These checks establish implementation behavior. They are not an additional participant retest or a measured before/after usability study. No participant dates, task timings, scores, or follow-up quotations were supplied, so none are added to this record.

## Next evaluation

Have students try the revised filters, interpret the remaining-credit total, set a target date, and locate familiar tasks. Record actual observations using the existing study protocol and observation sheet. Update this log with follow-up findings when available.

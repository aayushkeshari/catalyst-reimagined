# Research record — Catalyst redesign

Review date: November 14, 2026. Scope: the supplied project materials, original-home screenshot, and upstream prototype at commit 1279e7d. This record was prepared with AI assistance and should be reviewed by the project team before submission.

## Motivation and scope

The initial critique focuses on finding a class and completing enrollment with confidence. The redesign changes task organization and state communication: one workspace connects finding, comparison, cart, enrollment review, and a confirmed schedule. It is a usability/information-architecture redesign (assignment category A).

## Method 1: background research (completed desk research)

| Primary source | Relevant guidance, paraphrased | Applied decision |
| --- | --- | --- |
| Jakob Nielsen, 10 Usability Heuristics for User Interface Design, NN/g; reviewed article dated January 30, 2024; https://www.nngroup.com/articles/ten-usability-heuristics/ | People need prompt feedback on results; prevent avoidable mistakes and support diagnosis/recovery; reduce reliance on memory. | Cart, waitlist, and enrollment labels are distinct. A review step validates selections. The final receipt makes completion explicit. Search context persists. |
| W3C WAI, Understanding WCAG 2.2 SC 4.1.3, Status Messages; https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html | Non-focus-changing outcomes should be programmatically available to assistive technology. | Search counts and action messages are announced. Dialogs are named and use native focus handling. |
| W3C WAI, Understanding WCAG 2.2 SC 1.4.10, Reflow; https://www.w3.org/WAI/WCAG22/Understanding/reflow.html | Content and functionality should remain available as the viewport narrows, with specific exceptions for intrinsically two-dimensional content. | Mobile navigation and stacked forms; automatic agenda alternative for the week calendar. |

These sources justify design directions. They do not establish that this particular redesign improves completion time, satisfaction, or accessibility in practice.

## Method 2: heuristic evidence review (completed source/material review)

See heuristic-evaluation.md for specific findings, evidence classifications, severity judgments, and resulting changes. The review separates actual Catalyst screenshot evidence and class-reported interaction complaints from code-verifiable issues in the initial student prototype. It is not a live test of current university systems or a human multi-expert study.

## Prototype design and feedback

The linked Figma contains home list and calendar views, Classes & schedule, Academic progress, and Academic services. The implemented interaction states extend those static frames. The implementation preserves the overall navy/neutral visual direction and adds responsive behavior.

No participant feedback was available or collected during this implementation. The feedback log is intentionally empty. Prepared materials support a future think-aloud evaluation; they are not results. Do not retrospectively label the source review as student feedback on the Figma.

## Claims this project can make now

- The listed behaviors exist in the implemented source.
- Domain regression tests verify the covered enrollment and data invariants.
- Background sources informed specific design choices.
- Source/material evaluation identified the documented issues.

## Claims requiring new evidence

- Students complete registration faster or with fewer errors.
- Students prefer the redesign.
- Students understand the cart/waitlist/enrolled distinction more reliably.
- The interface meets WCAG 2.2 AA.
- The design was iterated after participant feedback.

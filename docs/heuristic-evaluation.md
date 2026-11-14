# Heuristic evidence review

Prepared November 14, 2026. Review artifacts: the original homepage screenshot in the critique deck; both critique decks; Script.docx; upstream source at 1279e7d. Scope: orientation, course search, enrollment state, recovery, responsive schedule. The live university system was not tested.

Severity scale: 0 no issue; 1 cosmetic; 2 moderate; 3 major; 4 task-blocking. Ratings are analyst judgments. Reported behavior is provisional until reproduced.

| ID | Task or screen | Specific issue | Evidence classification | Heuristic | Severity | Implemented response |
| --- | --- | --- | --- | --- | --- | --- |
| H1 | Original homepage | A detailed background competes with translucent tiles; major categories have similar emphasis. | Direct screenshot observation. | Aesthetic/minimalist design; hierarchy. | 2 | Opaque surfaces, calm background, grouped essentials, a prominent semester-planning action. |
| H2 | Original class discovery | Team critique reports similar labels leading to separate tools or tabs, with uncertain return paths and lost context. | Reported in supplied class critique, not independently reproduced. | Recognition; consistency; user control. | 3 provisional | Search, detail, comparison, cart, and confirmed schedule share one workspace; per-term search context is saved. |
| H3 | Initial prototype: future term | Future planned courses are converted into Enrolled rows by toEnrolledEntry and loaded into enrolledByTerm. | Code-verifiable. | Visibility of system status. | 3 | Seed only current in-progress classes; future enrollment starts empty. |
| H4 | Initial prototype: enrollment | enrollNow/enrollIn updates a schedule without validating prerequisites, meeting overlap, or credit limit. | Code-verifiable. | Error prevention. | 3 | Centralized batch validation and review with actionable blocking messages. |
| H5 | Initial prototype: confirmation | Successful enrollment has no explicit confirmation record. | Source inspection. | Visibility of system status. | 3 | Receipt with timestamp, section details, and direct access to the confirmed schedule. |
| H6 | Initial prototype: mobile schedule | Calendar is default; CSS hides it under 700px without automatically rendering a list. | Code-verifiable. | Flexibility and access to information. | 3 | Always provide the agenda on small screens. |
| H7 | Initial prototype: cart | One cart spans all selected terms. | Code-verifiable. | Error prevention; consistency. | 3 | Key cart and waitlist selections by term, validate offering term, close historical registration. |
| H8 | Initial prototype: academic progress | First-year student receives near-graduation text; current course list is described with remaining rather than enrolled credits. | Source/data inspection. | Match with real world; status accuracy. | 2 | Separate current/earned/remaining values and use profile-specific target graduation. |

## Limitations

This review is not a participant study, formal accessibility audit, or claim of comprehensive expert coverage. Original Catalyst behavior reported by classmates remains unverified. The two interface versions are different targets and their evidence must not be conflated.

## Review of implementation changes

Covered by automated tests: empty future enrollment; term/cart boundaries; batch atomicity; prerequisites; conflicts; duplicates; limits; waits; drops; hydration boundaries; credit totals; search; calendar date generation. See tests/enrollment.test.js. Browser review and screenshot evidence are recorded separately in validation.md.

# Expanded My Academics

Implemented from the project author’s reference screenshots on November 14, 2026. The current dark red design remains, while section names, order, and parent/child relationships follow the original Catalyst academic navigation. The shared model drives the desktop sidebar, mobile drawer, service directory, overview, and portal search.

## Coverage

My Academics places Class Schedule beside Academic Profile. Programs, academic plan, earned and current credits, and advising contacts are visible together. The existing sample GPA is preserved; the real student identifier in the supplied screenshot is not copied into the prototype.

| Original section | Destination | Prototype route |
| --- | --- | --- |
| Classes and Schedule | My Class Schedule | `#/classes?tab=schedule` |
| Classes and Schedule | Search / Add Classes | `#/classes?term=spring-2027` |
| Classes and Schedule | Enrollment Cart | `#/classes?tab=cart` |
| Classes and Schedule | Drop Classes | `#/academics/drop` |
| Classes and Schedule | Swap Classes | `#/academics/swap` |
| Classes and Schedule | Learning Community | `#/academics/learning-community` |
| Classes and Schedule | Edit Enrollment | `#/academics/edit-enrollment` |
| Classes and Schedule | Term Information | `#/academics/term-information` |
| Calendars and Deadlines | Academic Calendars | `#/academics/calendar` |
| Calendars and Deadlines | Dates and Deadlines | `#/academics/deadlines` |
| Grades/Transcript/Enroll Cert | View My Grades | `#/academics/grades` |
| Grades/Transcript/Enroll Cert | View My Milestones | `#/academics/milestones` |
| Grades/Transcript/Enroll Cert | View My Course History | `#/academics/course-history` |
| Grades/Transcript/Enroll Cert | Undergrad Grade Replacement | `#/academics/grade-replacement` |
| Grades/Transcript/Enroll Cert | Request Official Transcript | `#/academics/official-transcript` |
| Grades/Transcript/Enroll Cert | View my Unofficial Record | `#/academics/unofficial-record` |
| Grades/Transcript/Enroll Cert | Print Enrollment/Degree Letter | `#/academics/enrollment-letter` |
| Grades/Transcript/Enroll Cert | Request Law Transcript | `#/academics/law-transcript` |
| Grades/Transcript/Enroll Cert | Request Med Transcript | `#/academics/med-transcript` |
| Graduation/Commencement | Apply to Graduate | `#/academics/apply-graduate` |
| Graduation/Commencement | View Graduation Status | `#/academics/graduation-status` |
| Graduation/Commencement | Commencement Ceremony | `#/academics/commencement` |
| Graduation/Commencement | Grad Application Deadlines | `#/academics/graduation-deadlines` |
| Graduation/Commencement | Electronic Diploma | `#/academics/diploma` |
| Graduation/Commencement | Law Student Commencement | `#/academics/law-commencement` |
| Graduation/Commencement | Law Student State Bar Exam | `#/academics/bar-exam` |
| Academic Progress | Get My Degree Audit | `#/academics/degree-audit` |
| Academic Progress | My Graduation Plan | `#/academics/graduation-plan` |
| Academic Progress | Run a 'What-if' Report | `#/academics/what-if` |
| Academic Progress | Transfer Credit Evaluation | `#/academics/transfer-credit` |
| Academic Progress | My Bearcat Network | `#/academics/bearcat-network` |

## Working interactions

- Grades: choose a semester, Continue to the grade report, and Change term. Earned credits and term GPA use completed graded rows; current and future enrollment do not receive fabricated final grades.
- Milestones: the supplied empty state is represented explicitly, with routes to personal tasks and degree requirements.
- Course history: search by course code/title, filter by term/status, and export a CSV.
- Grade replacement: read the policy, affirm review, and inspect qualifying repeated attempts. No replacement is submitted and the sample transcript is unchanged. With no completed repeat pairs, the interface explains the empty result.
- Unofficial records and enrollment letters: generate a visible sample, download a standalone printable HTML report, and reopen saved requests after reload. Reports are visibly marked as samples. Degree letters are unavailable because no degree has been conferred in the sample record.
- Graduation: validate and review an application draft, save it, edit it, download it, and view its status. Local draft, official submission, degree certification, and diploma issuance remain distinct.
- Graduation planning: move remaining requirements between future semesters, preserve those choices, flag loads above the planning guide, and download the plan. Planning never enrolls a course. First-year profiles retain their longer planning horizon.
- What-if: choose an illustrative program and compare its listed requirements with completed coursework. Neither the current major nor the earned-credit total changes. This is a limited sample scenario, not a complete official curriculum audit.
- Transfer credit: save an external course and a proposed equivalency as an advisor question. It remains Needs advisor review and does not award earned credit or satisfy requirements.
- Enrollment: checked class swaps are atomic. Failed replacements retain the original enrollment and receipt history. Dedicated drop confirmation updates the selected open term.
- Official services: transcript ordering, Parchment, verification, graduation instructions/deadlines, commencement, electronic diplomas, Law/Medicine records, bar documentation, and My Bearcat Network open verified destinations in a new tab. The prototype does not send real applications, order credentials, make payments, or generate official certifications.

## Implementation

- `src/lib/academics.js`: hierarchy, official destinations, grade/report/scenario helpers, and academic state hydration.
- `src/lib/components/AcademicNav.svelte`: keyboard-accessible native disclosure groups, reused on desktop and mobile.
- `src/pages/Academics.svelte`: academic overview, breadcrumbs, and academic view dispatch.
- `src/pages/AcademicRecords.svelte`: grades, history, milestones, repeated attempts, report preview/download/history.
- `src/pages/AcademicGraduation.svelte`: validated graduation drafts, review dialog, and explicit status timeline.
- `src/pages/AcademicPlanning.svelte`: semester plans, what-if reports, transfer questions, advising, term information, swaps, and drops.
- `src/pages/AcademicResource.svelte`: contextual instructions and verified links for official services.
- `src/lib/model.js`: additive academic persistence plus atomic swap transaction. Existing schema-2 records are retained; reset clears the added profile-local state.

## Verification

The suite contains 35 tests, including nine academic tests covering grade separation, persistence and profile isolation, corrupted storage, graduation input, repeat pairs, what-if immutability, escaped sample exports, failed/successful swaps, and section coverage. Existing enrollment checks remain in place.

Browser checks exercised all 31 destinations, term selection, history filtering, a real report download and saved-request reload, degree-letter blocking, graduation validation/review/save/status/reload, plan persistence, what-if output, pending transfer questions, profile switching, failed and successful swaps, and dedicated drop confirmation. Desktop and 375px layout/contrast checks cover all destinations; the mobile drawer was used to open a child grade page. These are prototype checks, not participant research or a WCAG conformance claim.

## Official sources

Checked official destinations on November 14, 2026. Live university resources remain authoritative for eligibility, dates, costs, and procedures.

- [UC transcript ordering and Parchment routing](https://www.uc.edu/about/registrar/transcripts-diplomas-verifications/transcript-ordering.html)
- [Grade replacement policy](https://www.uc.edu/about/registrar/record-updates/grade-replacements/policy.html)
- [Enrollment and degree verifications](https://www.uc.edu/about/registrar/transcripts-diplomas-verifications/student-verifications.html)
- [Graduation applications and deadlines](https://www.uc.edu/about/registrar/record-updates/graduation/apply-to-graduate.html)
- [Commencement](https://www.uc.edu/campus-life/commencement.html)
- [Diplomas](https://www.uc.edu/about/registrar/transcripts-diplomas-verifications/diplomas.html)
- [Law transcripts](https://www.law.uc.edu/student-life/registrar-records/order-transcripts.html)
- [Medicine records](https://med.uc.edu/education/medical-student-education/registrar/transcripts-graduation-validation)
- [Advising tools and My Bearcat Network](https://www.onestop.uc.edu/other/academic-advising/advising-tools.html)
- [Transfer credit](https://www.uc.edu/about/registrar/credit.html)

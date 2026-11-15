# My Finances and My Profile coverage

Prepared November 15, 2026. This revision is approved for publication through the GitHub Pages workflow.

The supplied original UC Catalyst screenshots define the hierarchy below. The prototype preserves these groups while applying the existing dark red design. Financial amounts, identifiers, addresses, and account details are synthetic. Aayush explicitly supplied his campus email for inclusion; other contact entries are examples. Private values from the reference screenshots were not copied.

## My Finances

The overview at `#/finances` places Account Summary on the left, with Financial Aid Awards and Tuition Guarantee – Cohort Details on the right. The original four section groups follow in order. The sidebar shows child navigation for the active workspace, and the mobile drawer mirrors it.

| Original section | Destination | Implemented behavior |
| --- | --- | --- |
| Billing Information | Tuition and Fee Rates | Official UC tuition resource |
| Billing Information | Direct Deposit Enrollment | Masked fictional account summary and official enrollment/Employee Self-Service instructions |
| Billing Information | Tuition Refund Appeal | Explicit no-eligible-sample-terms state and return/help actions |
| Billing Information | Payment Plan Enrollment | Three-installment example with exact cent totals, save/remove example, official enrollment link |
| Billing Information | GradGuard | University-specific provider resource |
| Billing Information | Office of the Bursar | Official billing support |
| Billing Information | Right to Know Information | Official university consumer information |
| Manage Financial Aid | View Financial Aid | Aid-year picker, sample awards, read-only archives, missing-data state |
| Manage Financial Aid | Accept / Decline Financial Aid | Editable current-year decisions, save/discard draft, accepted-total update |
| Manage Financial Aid | Federal Aid Permissions | Sample TITLEIV summary, expandable agreement guidance, official Catalyst link |
| Student Health Insurance | Health Insurance Waiver Status | Term selection and status lookup distinguishing a local draft from official approval |
| Student Health Insurance | Print Health Insurance Card SS | Current UC ID card instructions; no fabricated insurance card |
| Student Health Insurance | Health Insurance Waiver Update | Validated example provider/coverage date checklist, saved as a draft |
| Financial Aid Links | Student Financial Aid | Official aid resource |
| Financial Aid Links | Scholarship Resources | Existing scholarship directory |
| Financial Aid Links | Financial Aid & Billing Help | Official Catalyst self-help guide |
| Account Summary | View Pending Financial Aid | Anticipated sample awards separately from posted ledger credits |
| Account Summary | View Itemized Bill | Charge/credit/payment ledger, balance, downloadable sample CSV |
| Account Summary | Account Inquiry | Posted sample activity and related account services |
| Account Summary | Make a Payment | Official payment instructions; no card details or payment processing |
| Tuition Guarantee | View Current Cohort Details | Official cohort/tuition information |
| Account Services | 1098-T Tax Form / Bank Accounts | Official instructions for the protected services |

The screenshot did not expand Financial Aid Links. Its three child destinations are relevant resources added in this redesign, not a claim to reproduce unseen original menu labels.

## My Profile

| Original section | Implemented behavior |
| --- | --- |
| Personal Details | Personal/Biographic/Preferences views; primary, preferred, and diploma names; editable sample display names; citizenship/residency/visa disclosures; existing reminder and compact-schedule preferences |
| Contact Details | Add/edit/remove email and phone entries; validate formats; one preferred record per channel; fixed profile campus email |
| Addresses | Add/edit/remove Permanent, Mailing, Residence Hall, and Ceremonial Diploma Mailing addresses; validate required fields and effective dates |
| Emergency Contacts | Empty state; add/edit/remove contacts; name/relationship/phone validation; one primary contact |
| FERPA | Eleven original categories with disclosure panels and explicit local draft saving |
| Share my Information | Add/edit/remove a fictional delegate draft; require a valid email and at least one access area; display selected scopes and draft status |

Protected biographic data is intentionally absent from the public sample. Profile name edits update the workspace greeting but do not change the primary academic record. Privacy and sharing drafts do not change official restrictions, create credentials, send invitations, or grant access.

## Implementation and validation

- `src/lib/student-account.js`: hierarchy, official resources, synthetic integer-cent ledger, award-year calculations, validators, and hydration.
- `src/pages/Finances.svelte` and `src/pages/Profile.svelte`: finance and profile views, forms, and dialogs.
- `WorkspaceNav.svelte` and `AccountNav.svelte`: contextual desktop/mobile navigation. Existing AcademicNav remains available within My Academics.
- `model.js`: additive `finance` and `person` state. Existing version-2 profiles load defaults without losing enrollment, cart, academic drafts, or preferences. Each student's changes remain isolated through the existing profile-specific store.
- Nine additional behavioral tests cover totals, installment rounding, navigation uniqueness, contact preference persistence, corrupted storage, validators, additive defaults, and student isolation. All 44 project tests pass.
- Browser checks exercised all 22 internal finance child routes and all six profile sections. Tested aid decisions, missing aid year, preferred contacts, invalid phone recovery, address persistence, emergency contacts, sharing edits/cancelled removal, privacy saving, insurance checklist/status, and switching students.
- Responsive checks at 375px, 768px, and 1440px. The ten representative finance/profile views tested at 375px have no horizontal document overflow; wide tables scroll within their own container. Dark and light themes use the existing semantic palette.
- Four new screenshots are included in the case study. Original screenshots remain historical evidence. No new usability-study results are claimed by this implementation work.

## Official resources checked

- [UC direct deposit enrollment](https://www.uc.edu/about/bursar/refunds/direct-deposit-enrollment.html)
- [UC semester payment plan](https://www.uc.edu/about/bursar/pay-bill/tuition-payment-plan.html)
- [Catalyst self-help guide](https://www.onestop.uc.edu/other/self-help.html)
- [UC insurance ID card instructions](https://www.med.uc.edu/landing-pages/studenthealth/eligibility-enrollment/id-cards)
- [UC student health insurance](https://www.uc.edu/about/bursar/tuition-fees/student-health-insurance-.html)

The current university ID card guide identifies the old Catalyst print-card function as unavailable and directs students to UHCSR. The prototype retains the familiar menu label while linking to the current instructions.

## Future work

Connect authenticated student records through a data layer; add server persistence and audit history; validate institution-specific privacy and delegated-access rules with UC; integrate official billing/insurance services; test these expanded workflows with students and assistive technology. Until then, financial/insurance/legal actions remain official external services, and local drafts stay clearly labeled.

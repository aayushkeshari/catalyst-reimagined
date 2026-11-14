# Think-aloud study and design feedback protocol

**Status: prepared, not conducted.** Aim for 3–5 volunteer students if feasible. Obtain permission to take notes and record only if they agree. Use participant codes P01, P02, etc.; do not collect university passwords, IDs, transcripts, or financial information. Use only the synthetic prototype accounts.

## Purpose

Assess whether students can find and compare sections, resolve an enrollment problem, distinguish planning/waitlisting/enrollment, and retrieve a schedule on a narrow screen. Ask for feedback on the design before any further implementation iteration.

## Setup

- Fresh browser session or Reset demo; choose Arthur Morgan.
- Desktop viewport around 1440×900; repeat the schedule task at 375px and 768px.
- Explain that the design is being evaluated, not the participant.
- Ask the participant to say what they expect, what they notice, and what they are trying to do.
- Do not teach the workflow or point at the correct control before the participant tries.

Suggested opening: “This is a student-portal prototype with fictional records. Please say what you’re thinking as you work. Nothing you do changes actual registration. You may stop at any point.”

## Tasks and success definitions

| Task | Neutral prompt | Success definition |
| --- | --- | --- |
| T1 | Find User Interface Design for spring and compare two sections. Which works for you, and why? | Finds CS5167 and explains differences in meeting times/availability using details or comparison. |
| T2 | Plan Senior Design II section 001 and UI Design section 001. Check whether the plan works. | Notices the meeting overlap and identifies affected courses. |
| T3 | Adjust the plan so both courses fit, then complete registration. | Uses CS5167 section 002 or CS5002 section 002; receives confirmation and verifies the schedule. |
| T4 | Tell me whether a class in your cart reserves a seat. Now inspect a full section and describe the waitlist status. | Correctly distinguishes cart, waitlist, and confirmed enrollment. |
| T5 | Remove a class, then decide you want it back. | Confirms drop and finds/uses Undo. |
| T6 | At a narrow viewport, find when and where your classes meet. | Retrieves meeting information without content disappearing or horizontal page overflow. |
| T7 | Switch to Joel and attempt an advanced UI course. What would you do next? | Understands missing prerequisite and identifies introductory coursework or advising as recovery. |

## Record

Use participant-observations.csv. Record observed success/partial/failure, elapsed seconds if timed consistently, errors, wrong turns, comprehension, and short anonymized quotes. Define an error before coding: an action that fails the stated task or produces an unintended state. A wrong turn is navigation away from the necessary workflow. Do not count all clicks as errors.

If comparing with actual Catalyst, participants must use their own authorized access and no real registration changes. Match task definitions and order/counterbalancing where practical. Report differences in data, access, and workflow; do not infer speed gains from unmatched tasks.

## Post-task feedback

1. What was easiest to understand?
2. Where were you unsure what would happen?
3. What tells you that registration is complete?
4. What would you change before using this regularly?
5. Optional: how confident are you in your final schedule, 1–5, and why?

## Synthesis

Group specific observations by task. Report sample size, procedure, context, and limitations. Use feedback-log.csv to connect each finding to a change and follow-up check. Preserve disagreements and failed tasks. Add the real results and before/after screenshots to the case study; never replace missing observations with fictional numbers.

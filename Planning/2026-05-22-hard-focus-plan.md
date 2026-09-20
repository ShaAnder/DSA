# DSA Hard Focus Plan - 2026-05-22

Purpose: use today to tighten the weakest high-value DSA surfaces for the likely screen, not to widen into more topics.

## Scope boundary

Today only uses topics that already have note coverage in the required note set.

Included today:

- problem-solving routine
- linear scan
- lookup structures for duplicate and frequency work
- frequency counter
- multiple pointers
- sliding window

Explicitly out of scope today:

- stack
- queue
- recursion
- divide and conquer
- binary search
- any mixed drill that assumes a topic not covered in today's notes

If a challenge or drill depends on a topic outside this boundary, skip it today.

## Today's target

By the end of today, you should be able to do these without notes:

- name the likely pattern before coding
- explain why linear scan fits simple existence and first-index problems
- explain why a lookup structure beats repeated scanning for duplicates and counts
- separate multiple pointers from sliding window without drifting
- state input, output, edge cases, brute force, and improved approach before code

## Required notes for today

Read in this order, once each, then close them before drills:

1. `Curriculum/problem-solving.md`
2. `Curriculum/problem-solving-patterns.md`
3. `Curriculum/screen-foundations-linear-scan-and-lookups.md`

Do not keep the notes open while answering recall prompts.

## Hard schedule

### Block 1 - Note rebuild and recall lock (60 minutes)

1. Read the three required notes in order.
2. Close the notes.
3. From memory, write short answers for:
   - when linear scan fits
   - when frequency counter fits
   - when multiple pointers fits
   - when sliding window fits
   - why a `Set`, object, or `Map` helps repeated lookup work
   - three edge cases for simple array prompts

Pass standard:

- no answer should rely on vague phrases like "it just works better"
- each answer must mention the actual job of the pattern

### Block 2 - Drill under recall pressure (75 minutes)

Complete `Drills/2026-05-22-pattern-rebuild-and-screen-pressure.md` with no notes.

Rules:

- no coding before contract and pattern fit
- write time and space complexity every time
- if stuck, state brute force first instead of guessing

### Block 3 - Challenge batch (90 minutes)

Complete these active challenge files in this exact order:

1. `Challenges/Patterns/01-frequency-counter/01-valid-anagram-normalized.js`
2. `Challenges/Patterns/01-frequency-counter/02-same-squared-values.js`
3. `Challenges/Patterns/02-multiple-pointers/05-first-zero-sum-pair.js`
4. `Challenges/Patterns/03-sliding-window/09-max-consecutive-sum.js`

For each challenge, before coding, write in comments:

- input
- output
- edge cases
- likely pattern
- brute-force time complexity
- improved time complexity target

### Block 4 - Explanation rep and repair (45 minutes)

Without code, explain aloud:

1. why duplicate detection often shifts from nested loops to a lookup structure
2. why sorted-input pair problems point toward multiple pointers
3. why contiguous-range max-sum problems point toward sliding window

Then log every shaky or missed item in `Planning/dsa-mistakes-log.md`.

### Block 5 - Screen carry-forward check (30 minutes)

Retry from memory, in plain English only:

- linear scan for target exists
- first index of target
- duplicate detection with a lookup structure
- most frequent value with a frequency map

If you cannot explain the fit in one clean sentence, the topic is not locked.

## Non-negotiables

- no new topics today
- no passive rereading after the first note pass
- no skipping edge cases
- no jumping straight into code
- no calling something sliding window when it is really only two tracked indexes

## End-of-day evidence

You finish today only when all of these exist:

- completed drill file
- at least 4 completed challenge files
- mistakes-log entries for real misses or hesitations
- a short summary of what still breaks under pressure

## If time remains

Only then move to one mixed rep from `Challenges/Patterns/05-mixed-interview-drills/17-longest-unique-substring.js`.

Do not touch it before the core block is complete.

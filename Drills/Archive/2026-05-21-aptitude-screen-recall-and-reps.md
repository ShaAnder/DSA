# DSA Drill: Aptitude Screen Recall and Reps

Date: 2026-05-21
Focus: array reasoning, simple search, duplicate detection, edge cases, and lookup-structure foundations
Goal: learn the next screen-relevant foundations first, then test recall and apply them immediately

## Rules

- Study `Curriculum/screen-foundations-linear-scan-and-lookups.md` first, then close it before starting the drill.
- Do not open notes again until the recall and rep sections are finished.
- State input, output, edge cases, and likely pattern before coding.
- If you get stuck, write the brute-force path first instead of guessing.
- After every problem, write time and space complexity.
- Log every shaky or missed item for Mentor grading and repair reps.

## Part 1: Fast Recall

Answer each in 1 to 3 sentences.

1. What makes an array problem a good candidate for linear scan?
2. What is the difference between checking whether a value exists and checking how many times values appear?
3. Why is an object or `Map` useful for repeated lookup work?
4. Name three edge cases you should consider before writing simple array code.
5. Why can a technically correct solution still fail a screen if the explanation is weak?

## Part 2: Pattern Fit Only

Do not code yet. For each prompt, write:

1. input
2. output
3. edge cases
4. likely approach or pattern
5. why that fits better than a nearby alternative

### Prompt 1

Given an array of integers and a target value, return `true` if the target exists in the array.

### Prompt 2

Given an array of integers and a target value, return the index of the first occurrence of the target or `-1` if it does not exist.

### Prompt 3

Given an array of integers, return `true` if any value appears more than once.

### Prompt 4

Given an array of integers, return the number that appears most often.

## Part 3: Edge-Case Pressure

Answer without notes.

1. What should happen if Prompt 1 receives an empty array?
2. What should happen if Prompt 2 receives an array with one element?
3. In Prompt 3, what changes if the duplicate appears many times instead of twice?
4. In Prompt 4, how would you handle a tie in frequency if the prompt does not specify tie behavior?
5. Why is “I forgot to handle empty input” a real quality miss, not a minor detail?

## Part 4: Timed Problem 1

Time cap: 10 minutes

Problem:
Given an array of integers and a target value, return the index of the first occurrence of the target. Return `-1` if it is not present.

Before coding, write:

- input
- output
- edge cases
- likely approach
- brute-force time complexity

After coding, write:

- final time complexity
- final space complexity
- one sentence on why the approach fit

## Part 5: Timed Problem 2

Time cap: 12 minutes

Problem:
Given an array of integers, return `true` if any value appears more than once. Return `false` otherwise.

Before coding, write:

- input
- output
- edge cases
- brute-force path
- improved approach

After coding, write:

- final time complexity
- final space complexity
- one sentence on why a lookup structure helps

## Part 6: Explain-Aloud Rep

Do this slowly. The goal is clarity under pressure.

Prompt:
Explain why duplicate detection often becomes easier with an object or `Map` than with repeated scanning.

You must say aloud, in order:

1. the brute-force alternative
2. the lookup-based idea
3. the time complexity difference at a high level
4. one edge case
5. one reason explanation quality still matters even when the code works

## Part 7: Mentor Grade

Do not self-report this section.

Stop after finishing the drill and have Mentor grade each item as `clean`, `shaky`, or `missed`.

- linear search recall
- edge-case awareness
- lookup-structure reasoning
- brute-force vs improved comparison
- pattern naming before coding
- explain-aloud clarity

## Part 8: Mistakes Log Handoff

After the drill, add entries to the DSA mistakes log for any of these:

- missed an obvious edge case
- picked the wrong approach first
- knew the idea but could not explain why it fit
- got complexity wrong

## Part 9: Repair Reps

Mentor fills this in after grading if anything is shaky or missed.

- Add targeted recall repairs here.
- Add edge-case repair reps here.
- Add explanation repair reps here.

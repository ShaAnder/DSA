# DSA Challenge Workspace

This folder is the execution surface for DSA problem work after or alongside NeetCode study.

Use it for:

- cold rebuilds of problems after watching or completing a NeetCode lesson
- active pattern-based challenge sets
- extra variants that test whether the pattern still holds when the prompt shape changes
- mixed interview reps that combine recognition, implementation, and explanation

Current structure:

- `Patterns/` holds the active pattern-based challenge sets.
- `Archive/` holds completed challenge work kept for review, mirroring the live topic structure.

Boundary rule:

- Do not place loose challenge files directly in this `Challenges/` folder.
- Active DSA challenge files should live inside `Patterns/`.
- `Archive/` is only for completed challenge work, not lesson notes.
- Archived challenge files should keep the same topic path inside `Archive/` that they had inside `Patterns/`.

## Session rule

- Pull a small number of problems at a time from the current NeetCode topic or from the next mentor-assigned pressure set.
- Once a challenge is completed and reviewed, move it into the matching folder inside `Archive/`.
- The active folders should hold only the problems you are currently rebuilding or pressure-testing.
- The archive exists so completed work stays available for spiral review without cluttering the live set.

## How to use this folder

1. Open one file at a time from `Patterns/`.
2. State input, output, edge cases, likely pattern, and brute-force idea before coding.
3. Implement the solution without looking at the prior answer if this is a rebuild rep.
4. Write time and space complexity after the code, not before.
5. Log misses or hesitation in `../Planning/dsa-mistakes-log.md`.
6. When a challenge is done, move it to the matching folder inside `Archive/`.
7. When you want feedback, send me the file and I will grade it for:
   - correctness
   - pattern fit
   - edge-case handling
   - time/space complexity
   - explanation stability

## Source split

- NeetCode is the intake surface for learning and first exposure.
- This folder is the proof surface for whether the pattern is actually owned.
- If you can only follow the solution while watching, the problem is not done yet.

## Mentor workflow

- NeetCode or a local plan determines the current pattern block.
- I populate follow-up rebuilds, variants, or mixed reps when the current misses show a real weakness.
- Finished challenges move to the matching folder inside `Archive/`.
- Older archived challenges can still return later as spiral-review reps.

## Mentor notes

- If you cannot name the pattern inside 2 minutes, stop and compare the problem to your notes before coding.
- If you solve it but cannot explain why the pattern works, treat that as incomplete.
- If a problem takes too long, finish the review and retry it the next day from memory.# DSA Challenge Workspace

These exercises mirror the active DSA batch from your curriculum notes.

Current structure:

- `Patterns/` holds the active pattern-based challenge sets.
- `Archive/` holds completed challenge work kept for review, mirroring the live topic structure.

Boundary rule:

- Do not place loose challenge files directly in this `Challenges/` folder.
- Active DSA challenge files should live inside `Patterns/`.
- `Archive/` is only for completed challenge work, not lesson notes.
- Archived challenge files should keep the same topic path inside `Archive/` that they had inside `Patterns/`.

## Session rule

- New challenges should be populated per study session, not dumped in all at once.
- Once a challenge is completed and reviewed, move it into the matching folder inside `Archive/`.
- The active folders should hold only the challenges you are currently working through.
- The archive exists so completed work stays available for review without cluttering the live session set.

## How to use this folder

1. Open one file at a time from `Patterns/`.
2. Read the prompt and examples.
3. Write the brute-force idea in comments before coding.
4. Implement the function.
5. Add your own test calls at the bottom if you want.
6. When a challenge is done, move it to the matching folder inside `Archive/`.
7. When you want feedback, send me the file or paste the solution and I will grade it for:
   - correctness
   - pattern choice
   - edge-case handling
   - time/space complexity
   - code clarity

## Order

- Start with `Patterns/01-frequency-counter`
- Then `Patterns/02-multiple-pointers`
- Then `Patterns/03-sliding-window`
- Then `Patterns/04-divide-and-conquer`
- Use `Patterns/05-mixed-interview-drills` after the first four folders
- Leave `Patterns/06-stretch` until the core problems feel recognizable

## Master Problem Bank

Use this as the live index for problem selection.

The goal is not to collect random questions.
The goal is to get faster at recognizing the pattern, stating the brute-force
option, and then writing the cleaner solution.

For each problem:

1. Restate the problem in your own words.
2. Name the likely pattern before coding.
3. State the brute-force approach.
4. Write time and space complexity.
5. Test with one normal case and two edge cases.
6. Log misses or hesitation in `../Planning/dsa-mistakes-log.md`.

### Frequency Counter

1. Write a function that returns `true` if two strings contain the same characters with the same frequencies, ignoring spaces and case.
2. Write a function that returns `true` if one array contains the squared values of another array with matching counts.
3. Given a sentence, return the first character that appears exactly once. Return `null` if none exists.
4. Given two arrays of integers, return the values that appear in both arrays, but only once in the result.

### Multiple Pointers

5. Given a sorted array of integers, return the first pair whose sum is `0`. Return `null` if none exists.
6. Given a sorted array, count how many unique values it contains without using another array or set.
7. Given a sorted array and a target sum, return whether any pair matches the target.
8. Given a sorted array, return the pair with the smallest absolute difference.

### Sliding Window

9. Given an array of integers and a number `k`, return the maximum sum of any `k` consecutive values.
10. Given a string and a number `k`, return the length of the longest substring containing at most `k` distinct characters.
11. Given an array of positive integers and a target sum, return the length of the smallest contiguous subarray whose sum is at least the target. Return `0` if none exists.
12. Given daily temperatures as integers, return the maximum average over any 3-day stretch.

### Divide and Conquer

13. Write binary search for a sorted array and return the index of a target value, or `-1`.
14. Given a sorted array of integers, return how many times a target value appears.
15. Given a sorted array of distinct integers, return whether there exists an index where `arr[i] === i`.
16. Given a sorted array, return the index where a target should be inserted to keep the array sorted.

### Mixed Interview Drills

17. Given a string, return the length of the longest substring with no repeated characters.
18. Given a sorted array and a target number, return the closest pair whose sum is nearest to the target.
19. Given two strings, return whether one contains any permutation of the other as a contiguous substring.
20. Given a sorted array rotated at some pivot, return the index of a target value.

### Stretch Problems

21. Given an array of integers, return the longest run of consecutive values after sorting the input.
22. Given an array of positive integers and a number `k`, return whether there is a contiguous subarray whose product is less than `k`.
23. Given a sorted array and a target, return the first and last position of that target.
24. Given a string, return the longest substring that can be made of one repeated character after replacing at most `k` characters.

## Master Bank Order

- Do problems 1 to 4 first.
- Then do 5 to 8.
- Then do 9 to 12.
- Then do 13 to 16.
- Use 17 to 20 as interview-style mixed reps.
- Only touch the stretch set when the core 20 feel recognizable.

## Grading standard

- Strong: correct, clean, pattern justified, edge cases covered
- Close: mostly correct, but explanation or edge cases are weak
- Needs work: wrong pattern, missing cases, or unclear reasoning

## Mentor workflow

- I populate the next batch of challenges per session.
- You complete the current active batch.
- Finished challenges move to the matching folder inside `Archive/`.
- Older archived challenges can still return later as spiral-review reps.

## Mentor notes

- If you cannot name the pattern inside 2 minutes, stop and compare the problem to your notes before coding.
- If you solve it but cannot explain why the pattern works, treat that as incomplete.
- If a problem takes too long, finish the review and retry it the next day from memory.

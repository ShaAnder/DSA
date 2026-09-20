# DSA Mistakes Log

Use this after every practice problem. The goal is not to collect failures, but
to make repeated mistakes impossible.

## Rules

- Fill this in immediately after solving or reviewing a problem.
- Be specific about the mistake. "Need more practice" is too vague.
- Re-attempt missed problems after 24 hours, 3 days, and 7 days.
- Always write the intended pattern and the final time/space complexity.

## Quick Entry Template

| Date       | Problem                | Topic / Pattern   | Result            | Main Mistake                  | Root Cause                                           | Correct Fix                                        | Time / Space | Retry Dates                        |
| ---------- | ---------------------- | ----------------- | ----------------- | ----------------------------- | ---------------------------------------------------- | -------------------------------------------------- | ------------ | ---------------------------------- |
| 2026-05-17 | Example: Valid Anagram | Frequency Counter | Solved after hint | Compared sorted strings first | Reached for a familiar method instead of the pattern | Count chars with an object/Map and compare tallies | O(n) / O(k)  | 2026-05-18, 2026-05-20, 2026-05-24 |

## Mistake Types To Reuse

- Misread the input/output contract
- Missed an edge case
- Picked the wrong pattern
- Knew the pattern but could not implement it cleanly
- Complexity analysis was wrong
- Solved brute force but missed the optimization
- Panicked / rushed and skipped verification

## Current Log

| Date       | Problem                          | Topic / Pattern   | Result                      | Main Mistake                                                                                                                                         | Root Cause                                                                                                                                                     | Correct Fix                                                                                                                                                             | Time / Space             | Retry Dates                        |
| ---------- | -------------------------------- | ----------------- | --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ | ---------------------------------- |
| 2026-05-22 | Duplicate detection timed repair | Lookup structure  | Solved with defects         | Misread the return contract and graded space complexity as `O(1)`                                                                                    | Rushed past the prompt contract and treated `Set` storage like free memory                                                                                     | Return `false` when no duplicate exists and count `Set` storage as worst-case `O(n)` space                                                                              | O(n) / O(n)              | 2026-05-23, 2026-05-25, 2026-05-29 |
| 2026-05-22 | Max consecutive sum timed repair | Sliding window    | Could not implement cleanly | Knew the pattern but could not implement it cleanly                                                                                                  | Lost the function contract under pressure: missing `k` parameter, uninitialized sums, and incorrect first-window setup                                         | Rebuild from the contract first: signature `(arr, k)`, initialize the first window sum, then slide by subtracting outgoing and adding incoming values                   | O(n) / O(1)              | 2026-05-23, 2026-05-25, 2026-05-29 |
| 2026-05-22 | Zero-sum pair pattern fit        | Multiple pointers | Solved with defects         | Misread the input/output contract                                                                                                                    | Pattern recognition was right, but the answer shape drifted from boolean to pair return                                                                        | State the required output before coding and keep the return shape aligned with the prompt all the way through                                                           | O(n) / O(1)              | 2026-05-23, 2026-05-25, 2026-05-29 |
| 2026-05-28 | Interview pattern recall repair  | Lookup + window   | Close                       | Pattern choice improved, but implementation still drifted on control-flow mechanics like `for` loop initialization and clean `if` / `else` structure | Under pressure, the contract was remembered and the pattern was recognized, but syntax-level implementation discipline still slipped before final verification | Rebuild duplicate detection as valid JS with `for (let i = 0; ...)`, use clean block-based `if` structure, and keep retesting sliding-window updates against edge cases | O(n) / O(n), O(n) / O(1) | 2026-05-29, 2026-05-31, 2026-06-04 |
|            |                                  |                   |                             |                                                                                                                                                      |                                                                                                                                                                |                                                                                                                                                                         |                          |                                    |
|            |                                  |                   |                             |                                                                                                                                                      |                                                                                                                                                                |                                                                                                                                                                         |                          |                                    |

## Weekly Review

At the end of each week, answer these:

1. Which mistake repeated most?
2. Which pattern still feels slow to recognize?
3. Which problems should be re-done without notes?
4. What one adjustment will improve next week?

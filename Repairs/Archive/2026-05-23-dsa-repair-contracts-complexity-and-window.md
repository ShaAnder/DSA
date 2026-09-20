# DSA Repair File: Contracts, Complexity, and Sliding Window

Date: 2026-05-23
Focus: repair the exact misses from the 2026-05-22 drill without widening into unrelated subject work
Goal: turn pattern recognition into cleaner contract handling, correct complexity reads, and one clean sliding-window implementation
Use order: complete this repair file before the daily drill file

## Scope boundary

This repair drill only uses topics already covered by the current DSA notes.

In scope:

- linear scan
- lookup structures
- frequency counter
- multiple pointers
- sliding window

Out of scope:

- stack
- queue
- recursion
- divide and conquer
- binary search

## Rules

- Do not open notes while answering Part 1 and Part 2.
- State the exact output contract before coding.
- If the prompt asks for `true` or `false`, every return path must stay boolean.
- Write both time and space complexity after each coded problem.
- If you use a `Set`, explain what is being stored and why that affects space complexity.
- For sliding window, initialize from the first full window instead of defaulting the maximum to `0`.

## Part 1: One-Sentence Repair Recall

Answer each in exactly one sentence.

1. What is a lookup structure?
   a lookup structure is a problem solving pattern that utilizes single loops and a structure (obj, arr, set) to hold previously encountered values, it's good for finding duplicates in single arrays
2. What is a frequency counter?
   this is a pattern that is used to find and compare frequencies of reoccuring items across multiple arrays. It doesn't check if a value exists more how many times those values exist and if they match across other arrays
3. What is multiple pointers?
   a pattern that uses multiple index pointers to compare indexes on typically a single array, best used for when we want to target different indexes across an array and not a range, typically only good on a sorted array.
4. What is sliding window?
   a sliding window is a pattern that scans in a window / slice of our array. its typically used on unsorted arrays when we want to perform operations across N contiguous indexes typically in a range.
5. Why is duplicate detection with a `Set` not `O(1)` space in the worst case?
   because even if a set is storing only one of each unique value it's still storing values in linear time as it depends on the size of the input
6. Why does a sorted array make pointer movement reliable?
   because we can more reliably use 0 as baseline, and move the correct pointer based on a condition, an unsorted array would cause false positives to occur.

## Part 2: Contract Pressure

For each prompt, write only:

1. input
2. output
3. failure return
4. likely pattern

Do not code yet.

### Prompt 1

Given an array of integers and a target, return `true` if the target exists and `false` otherwise.

array, true, false, linear scan

### Prompt 2

Given an array of integers, return `true` if any value appears more than once and `false` otherwise.

array, true, false, lookup structure

### Prompt 3

Given a sorted array of integers, return `true` if any pair sums to `0` and `false` otherwise.

sorted array, true, false, multiple pointers

### Prompt 4

Given an array of integers and a number `k`, return the maximum sum of any `k` consecutive values. Return `null` if `k` is larger than the array length.

sorted array, true, false, multiple pointers

## Part 3: Complexity Repair

State the correct time and space complexity for each and explain the space read in one short sentence.

1. Linear scan for whether a target exists
2. Duplicate detection with a `Set`
3. Frequency counter across one array
4. Sliding window for max sum of `k` consecutive values

## Part 4: Timed Repair Problem 1

Time cap: 10 minutes

Problem:
Given an array of integers, return `true` if any value appears more than once. Return `false` otherwise.

Before coding, write:

- input
- output
- failure return
- edge cases
- brute-force path
- improved approach

After coding, write:

- final time complexity
- final space complexity
- one sentence on why the lookup structure helps

## Part 5: Timed Repair Problem 2

Time cap: 12 minutes

Problem:
Given an array of integers and a number `k`, return the maximum sum of any `k` consecutive values. Return `null` if `k` is larger than the array length.

Before coding, write:

- input
- output
- failure return
- edge cases
- brute-force path
- improved approach

After coding, write:

- final time complexity
- final space complexity
- one sentence on why the sliding window fits

## Part 5.5: Window Trace Repair

Do this on paper or in comments before you move on.

1. Trace `maxConsecutiveSum([1, 2, 5, 2, 8, 1, 5], 2)` window by window.
2. Trace `maxConsecutiveSum([-4, -2, -7, -1], 2)` window by window.
3. For each trace, name:
   - the first full window sum
   - the value leaving the window
   - the value entering the window
   - the updated running sum
   - the updated maximum

If the all-negative trace returns `0`, the implementation is still wrong.

## Part 6: Explain-Aloud Repair

Answer aloud in order:

1. what the contract is for each timed problem
2. what wrong return shape would break the contract
3. what memory is being spent in the `Set` solution
4. what value leaves and enters the window in the sliding-window solution

## Part 7: Mentor Grade

Do not self-report this section.

- contract fidelity
- complexity accuracy
- lookup-structure explanation precision
- sliding-window implementation discipline
- explain-aloud clarity

## Part 8: Repair Reps

Mentor fills this in after grading if anything is still shaky or missed.

- Contract reps:
  - For each prompt, write only the return shape and one failure return: target exists, duplicate detection, zero-sum pair, max consecutive sum.
  - Say out loud why `true/false`, pair return, and numeric return are not interchangeable.
- Complexity correction reps:
  - Explain why linear scan target-exists is `O(n)` time and `O(1)` space.
  - Explain why duplicate detection with `Set` is `O(n)` time and worst-case `O(n)` space.
  - Explain why fixed-size sliding window max sum is `O(n)` time and `O(1)` space.
- Implementation repair reps:
  - Rebuild the first-window initialization from memory without looking at yesterday's code.
  - Hand-trace one positive-window case and one all-negative-window case.
  - Rewrite the slide step as one sentence: subtract outgoing value, add incoming value, then compare against max.

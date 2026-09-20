# DSA Repair File: Interview Pattern Recall and Contract Control

Date: 2026-05-28
Purpose: keep DSA interview-ready without widening beyond the repeated misses already shown in the mistakes log

## Session shape

- Total target: 25 minutes
- Part 1: fast recall - 8 minutes
- Part 2: contract and pattern pressure - 8 minutes
- Part 3: two short reps - 7 minutes
- Part 4: evidence - 2 minutes

## Scope boundary

In scope:

- lookup structure vs frequency counter
- multiple pointers vs sliding window
- input/output/failure-return discipline
- duplicate detection contract
- max consecutive sum setup

Out of scope:

- recursion
- trees
- graphs
- stack and queue expansion

## Rules

- State the likely pattern before code.
- Keep boolean prompts fully boolean on every return path.
- Write time and space complexity after each code rep.
- If a contract is unclear, rewrite the contract before touching implementation.

## Part 1: Fast Recall

1. What is the difference between a lookup structure and a frequency counter?
   a lookup structure is a method for fast storage and retrieval of data typically a dict / obj / map, its used to most effectively loop through and store data then provide O(1) lookup times whereas a fequency counter is more tuned toward counting the number of occurances of an item across multiple arrays. Lookup structure == check if exists, freq counter == it exists but how many times.
2. When does multiple pointers fit better than sliding window?
   when you have a sorted array, and are looking to run operations on specific indexes across the array, a multiple pointer window also helps when we want to be able to meaningfully and determinalistically move the pointers based on our current loop versus just looping over a contiguous range.
3. When does sliding window fit better than multiple pointers?
   we choose this when we need to work within a fixed contiguous range across unsorted arrays, multipointers owrk better on sorted arrays and unsorted can give us false positives for moving our pointers, whereas a sliding window can perform it's operations without that risk.
4. Why is `Set` worst-case `O(n)` space?
   because even though sets hold only one of each value they take up space complexity proportionate to the size of the input / work being done
5. Why does max consecutive sum break if the initial max is handled badly on an all-negative array?
   because when working with negatives a larger negative is actually mathmatically smaller, which causes an initialization error

## Part 2: Contract and Pattern Pressure

For each prompt, write only:

- input
- output
- failure return
- likely pattern

Prompt 1:
Given an array of integers, return `true` if any value appears more than once and `false` otherwise.

arr of int
true
false
lookup structure

Prompt 2:
Given a sorted array of integers, return `true` if any pair sums to `0` and `false` otherwise.

arr of int
true
false
multipointer

Prompt 3:
Given an array of integers and a number `k`, return the maximum sum of any `k` consecutive values. Return `null` if `k` is larger than the array length.

arr of int, k
sum of values
null
sliding window

## Part 3: Short Reps

1. Write the smallest clean duplicate-detection solution using a `Set`.

```js
function hasDupes(arr) {
	let checked = new Set();
	for (let i = 0; i < arr.length; i++) {
		if (checked.has(arr[i])) {
			return true;
		} else checked.add(arr[i]);
	}
	return false;
}
```

time complexity: O(n)
space complexity: O(n)
we're doing a simple duplicate lookup check, a set and single forloop matches this structure well and a set ensures we can check if the value already exists.

2. Write the smallest clean sliding-window solution for max sum of `k` consecutive values.

```js
function maxConsecutiveSum(arr, k) {
	// guard
	if (arr.length < k) {
		return null;
	}
	// set vars
	let temp = 0;
	let max = 0;
	// loop until k
	for (let i = 0; i < k; i++) {
		temp += arr[i];
	}
	// set max
	max = temp;
	// loop rest (remove first add last) (set new max)
	for (let i = k; i < arr.length; i++) {
		temp = temp - arr[i - k] + arr[i];
		if (temp > max) {
			max = temp;
		}
	}
	// return soemthing
	return max;
}
```

o(n) time
o(1) space
we need to loop over a contigous range of k indexes so sliding window works perfectly for this

After each rep, write:

- time complexity
- space complexity
- one sentence on why the chosen pattern fits

## Part 4: End-of-Session Evidence

1. Strongest DSA surface today:
2. Weakest DSA surface today:
3. One contract detail that still tried to drift:
4. One pattern distinction that felt cleaner than last time:

## Mentor Grade

- Grading track: Working Draft
- Grade: Needs work
- Weakest point: the pattern labels improved, but both code reps still fail the working-draft bar because the duplicate check has invalid JavaScript syntax and the sliding-window update never reassigns `temp`, so the window does not actually move.
- Next fix: rewrite the duplicate-detection rep as valid JavaScript, then rebuild the sliding-window rep with `temp = temp - arr[i - k] + arr[i]` and retest one all-negative example.
- Improvement signal: contract shape and pattern fit were materially cleaner than the earlier repair, and `Set` space complexity no longer drifted to `O(1)`.

## Carry-Forward

- Rewrite the all-negative explanation as an initialization problem, not a general statement about negatives being hard to compare.
- Do not stop at pattern recognition; verify that the code actually mutates the tracked window state.

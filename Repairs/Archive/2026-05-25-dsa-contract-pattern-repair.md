# DSA Repair File: Contracts, Pattern Fit, and Sliding Window

Date: 2026-05-25
Purpose: repair the exact DSA weaknesses still affecting interview readiness without widening into newer topics
Use order:

1. Complete this file before broader DSA learning for the day.
2. Log fresh misses in `Planning/dsa-mistakes-log.md` after the session.
3. Carry unresolved weak slices into the next dated DSA drill instead of reusing this file.

## Session shape

- Total target: 40 minutes
- Part 1: pattern and contract lock - 15 minutes
- Part 2: timed reps - 22 minutes
- Part 3: evidence - 3 minutes

## Scope boundary

In scope:

- pattern selection before coding
- lookup structures and duplicate detection
- linear scan and edge-case handling
- multiple pointers vs sliding window distinction
- sliding-window setup and complexity

Out of scope:

- recursion
- stack and queue
- binary search
- divide and conquer

## Rules

- No notes during the timed sections.
- State input, output, failure return, and likely pattern before coding.
- If the prompt asks for `true` or `false`, every return path must stay boolean.
- Write time and space complexity after each rep.
- If the all-negative sliding-window trace ends at `0`, the implementation is still wrong.

## Part 1: Pattern and Contract Lock

Time cap: 15 minutes

### One-sentence recall

1. What is the difference between a lookup structure and a frequency counter?
   A lookup structure works best on single arrayus, while it typically works similar to a frequency counter it's not suited to multi array / input solutions. A frequency counter does the same as a lookup structure where it logs frequency but is better adapted to work across multiple arrays and solves the need for nested loops. A lookup structure serves more to see if values / dupes exist, a freq counter serves to compare / contrast HOW MANY exist and do they match.
2. When does multiple pointers fit better than sliding window?
   multiple pointers works better when you need to compare different indexes across an array, it only really works on sorted arrays and can be used to quickly check arrays without having to stay in a fixed contiguous range
3. When does sliding window fit better than multiple pointers?
   sliding window is better suited than a multiple pointer when you want to work across and operate inside a contiguous range rather than on isolated indexes across an array, it also is better suited when unsorted arrays are in play as unsorted arrays can give false positives for a multi pointer pattern.
4. Why is duplicate detection with a `Set` worst-case `O(n)` space?
   Even though a set only stores unique values and not duplicates, it still replies on the input, so worst case is linear it's complexity relies on the input size.
5. Why does a max-sum sliding-window solution break if `max` starts at `0` on an all-negative array?
   Because if max starts at 0 the answer will always be negative, no matter how we add the values it will be 0 - X rather than add to it.
6. What is the brute-force bottleneck for max sum of `k` consecutive values?
   the brute force bottleneck would be O(N^2) time will scale quadratically as a brute force solution typically uses nested loops, while this is fine for smaller arrays the constant repeated looping will cause significant time cost as the array grows

### Contract pressure

For each prompt, write only:

- input
- output
- failure return
- likely pattern

Prompt 1:
Given an array of integers and a target, return `true` if the target exists and `false` otherwise.

input: array of int
output: true
failure return: false
likely Pattern: linear scan

Prompt 2:
Given an array of integers, return `true` if any value appears more than once and `false` otherwise.

input: array of int
output: true
failure return: false
likely Pattern: lookup structure

Prompt 3:
Given a sorted array of integers, return `true` if any pair sums to `0` and `false` otherwise.

input: array of int
output: true
failure return: false
likely Pattern: multi pointer

Prompt 4:
Given an array of integers and a number `k`, return the maximum sum of any `k` consecutive values. Return `null` if `k` is larger than the array length.

input: array of int, k - target window size
output: sum of integers
failure return: null
likely Pattern: sliding window

## Part 2: Timed Reps

Time cap: 22 minutes

### Rep 1: Duplicate detection

Time cap: 10 minutes

Problem:
Given an array of integers, return `true` if any value appears more than once. Return `false` otherwise.

Before coding, write:

- input: array of integers
- output: true
- failure return: false
- edge cases: empty array, target does not exist, no duplicate exists, array length less than 2
- brute-force path:

```js
// as a lookup structures brute force is similar to that of a linear scan we can assume that brute force will be O(N)

function isDuplicate(arr) {
	// first guard against empty / invalid array
	if (arr.length < 2) return false;

	// then build our set to hold values
	let values = new Set();

	// from here we loop over our array:
	for (let i = 0; i < arr.length; i++) {
		// check the value for new or dupe
		if (values.has(arr[i])) {
			// if it has the value we return true because dupe found
			return true;
		} else {
			values.add(arr[i]);
		}
	}
	return false;
}
```

- improved approach

```js
// as a lookup structures brute force is similar to that of a linear scan we can assume that brute force will be O(N)

function isDuplicate(arr) {
	// first guard against empty / invalid array
	if (arr.length < 2) return false;

	// then build our set to hold values
	let values = new Set();

	// from here we loop over our array:
	for (let i = 0; i < arr.length; i++) {
		// check the value for new or dupe
		if (values.has(arr[i])) {
			// if it has the value we return true because dupe found
			return true;
		} else {
			values.add(arr[i]);
		}
	}
	return false;
}
```

After coding, write:

- final time complexity: O(n)
- final space complexity O(n)
- one sentence on why the lookup structure helps: it allows us you quickly eliminate duplicates throuhg the use of a set, and stays relatively stable in time and space complexity without

### Rep 2: Max consecutive sum

Time cap: 12 minutes

Problem:
Given an array of integers and a number `k`, return the maximum sum of any `k` consecutive values. Return `null` if `k` is larger than the array length.

Before coding, write:

- input: arr, k
- output: sum of numbers
- failure return: null
- edge cases: empty arr, arr length, no matching numbers
- brute-force path:

```js
function maxConsecutiveSum(arr, k) {
	// Guard against invalid input
	if (arr.length < k || k <= 0) return null;

	let maxSum = -Infinity;

	// Slide window of size k across the array
	for (let i = 0; i <= arr.length - k; i++) {
		let currentSum = 0;

		// Sum the current window of k elements
		for (let j = 0; j < k; j++) {
			currentSum += arr[i + j];
		}

		// Update max if current window sum is larger
		if (currentSum > maxSum) {
			maxSum = currentSum;
		}
	}

	return maxSum;
}
```

- improved approach

```js
function maxConsecutiveSum(arr, k) {
	// Guard against invalid input
	if (arr.length < k || k <= 0) return null;

	let maxSum = 0;
	let tempSum = 0;

	// get initial window
	for (let i = 0; i < k; i++) {
		// add arr[i] to our temp sum
		tempSum += arr[i];
	}

	// set temp as maxc
	maxSum = tempSum;

	// loop through the rest of the array:
	for (let i = k; i < arr.length; i++) {
		// now we remove the leftmost add the rightmost
		tempSum - arr[i + k] + arr[i];

		// Update max if current window sum is larger
		if (tempSum > maxSum) {
			maxSum = tempSum;
		}
	}
	// return maxSum
	return maxSum;
}
```

After coding, write:

- final time complexity O(n)
- final space complexity O(1) - we only store temp and max values
- one sentence on why sliding window fits: works on unsorted arrays, and our prompt stipulates that we sum across a contiguous range

### Trace-only pressure check

Trace `maxConsecutiveSum([-4, -2, -7, -1], 2)` and name:

- first full window sum
  [-4,-2] = -6
- value leaving the window
  -4
- value entering the window
  -7
- updated running sum
  -9
- updated maximum
  -6 because it's still the max value

## Part 3: End-of-Session Evidence

Time cap: 3 minutes

Write these before you stop.

1. Strongest DSA answer today: trace pressure check
2. Weakest DSA answer today: max sum brute force
3. One mistake that repeated from earlier notes: i feel i used similar vague wording
4. One repair that actually held under pressure: maxsum optimized
5. The first DSA topic to revisit in the next drill: vagueness of wording

## Mentor Grade

Do not self-report this section.

- contract discipline
- pattern-fit accuracy
- implementation discipline
- complexity accuracy

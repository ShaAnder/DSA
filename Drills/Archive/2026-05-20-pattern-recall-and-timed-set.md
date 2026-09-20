# DSA Drill: Pattern Recall and Timed Set

Date: 2026-05-20
Focus: pattern selection, multiple pointers vs sliding window, lookup structures, and implementation discipline
Goal: name the pattern before coding, explain why it fits, and stay accurate under time pressure

## Rules

- Do not write code before stating input, output, edge cases, and likely pattern.
- If you cannot name the pattern, stop and reason before coding.
- Write time and space complexity for every solution.
- Log every hesitation, miss, or pattern confusion in the DSA mistakes log after the block.

## Part 1: Fast Recall

Answer these in 1 to 3 sentences each.

1. What is a frequency counter pattern trying to optimize?
   trying to optimize against nested for loops when trying to see if two arrays match in some meaningful way. It's a pattern designed with ensuring that we have O(n) in mind for time complexity
2. What usually makes multiple pointers a good candidate?
   when we want to analyze 2 indexes in a single array
3. What usually makes sliding window a good candidate?
   when we want to examine a substring of an array / str, for arguments sake get the max uniques substring on an array
4. What is the difference between multiple pointers and sliding window?
   multiple pointers only targets an array index at one point and then another, sliding window targets from one index to another and everything in beteeen.
5. Why does an object or `Map` often improve repeated lookup work?
   because they create / allow us to read the data we cache in out first loops making repeated loops redundant
6. What is the difference between a stack and a queue?
   the stack is last in first out, a queue is in first in first out
7. What does recursion replace with repeated function calls?
   the need to recall the function repeatedly
8. When should you compare brute force against an optimized approach before coding?
   always, having an understanding of what the code is doing on an unoptimized level allows us to better understand how to optimize it.

## Part 2: Pattern Fit Only

Do not code yet. For each prompt, write:

1. input
2. output
3. edge cases
4. likely pattern
5. why that pattern fits better than a nearby alternative

### Prompt 1

Given two strings, return `true` if they contain the same characters with the same frequencies.

input: str, str
output: true or false
edge cases: if one string has say empty space or a symbol, or capitalization isn't accounted for
likely pattern: Frequency counter
why: frequency counters allow us to look up multiple strings at the same time via storing results in objects, it means we prevent repeated quadratic looping limiting it to O(n) time

### Prompt 2

Given a sorted array of integers, determine whether there is a pair whose sum is `0`.

input: arr
output: arr[left], arr[right]
edge cases: if the array has no opposites, or the array contains invalid data / numbers, another edge can be if the arr has no guard to prevent the pointers overlapping
likely pattern: Multiple pointers
why: Multiple pointers allow us to quickly iterate over an array, checking 2 consecutive indexes to find out summed numbers

### Prompt 3

Given an array of integers and a number `k`, return the maximum sum of any consecutive `k` numbers.

input: (arr, k)
output: num
edge cases: no guard in palce to prevent returning 0 in case of an empty array
likely pattern: sliding window
why: sliding window allows us to iterate over a consecutive amount of numbers at a time, allowing us to do operations on them without having to loop over thee array for every number.

### Prompt 4

Given an array of values, return `true` if any value appears more than once.

input: arr
output: true or false
edge cases: empty array not returning false, as well as being able to parse mixed characters, all duplicates ect
likely pattern: multiple pointer
why: we could start on arr[left] = 0 arr[right] =1 and move arr[right] for every unique value, if a dupe is ever found we just move arr[left] if arr left moves return true.

### Prompt 5

Given a string, return the length of the longest substring with all unique characters.

input: (arr)
output: num
edge cases: no guard in palce to prevent returning 0 in case of an empty array, guards in place to deal with spaces or symbols
likely pattern: multiple pointers
why: multiple pointers allows us to iterate over the array and check if arr[left] is unique to arr[right] and we can then adjust the pointers respectively adding to the max count a pointer moved. Its better than sliding window as we don't need to have a max or minimum window to work with

## Part 3: Distinction Pressure

Answer these without notes.

1. Why is Prompt 2 multiple pointers instead of sliding window?
   because we only need to access 2 values a sliding window accesses a range and it would be extra work to cut out multiple values or to parse our 2 values from a range, as well as this if our two values are far enough apart we need a larger window.
2. Why is Prompt 3 sliding window instead of multiple pointers?
   in this specific case we're trying to get a range sum, multiple pointers doesn't work well for this as it's not desigend to slide through the arr, it's more designed to lock onto one index and then look for another.
3. Why can Prompt 4 often be solved with a lookup structure before you even think about nested loops?
   because we don't need to look through the entire array multiple times, we only need to find one duplicate value, so using a lookup structure to scan through is more efficient than looping over the array multiple times
4. What clue in a problem statement often signals that a window-based approach might fit?
   when the problem specifically hints at our main search will involve two indexes in an array / str "find if there's a duplicate, find the sum of two indexes that = 0" or that the array is sorted
5. What clue often signals that pointer movement from both ends or across a sorted structure might fit?
   blank

## Part 4: Timed Problem 1

Time cap: 12 minutes

Problem:
Given a sorted array of integers, write a function that returns the first pair that sums to `0`. Return `undefined` if no pair exists.

Before coding, write:

- input
- output
- edge cases
- likely pattern
- brute-force time complexity
- improved time complexity target

After coding, write:

- final time complexity
- final space complexity
- one sentence on why the pattern fit

```js
// input arr
// outpute arr[left], arr[right]
// likely pattern is multiple pointers
// brute force time complexity: O(n^2)
// improved target O(n)

function sumZero(arr) {
	// first check if arr is empty, if so return 0
	if (arr.length === 0) {
		return undefined;
	}
	// first we get left and right
	let left = 0;
	let right = arr.length - 1;

	// next we want to loop over the array, placing our pointers
	// we run a while loop to ensure that the loop only runs WHILE left is less than right
	while (left < right) {
		let sum = arr[left] + arr[right];
		// check current pointers, if current sum is > right, move right down, if less than left move left up
		if (sum === 0) {
			return [arr[left], arr[right]];
		} else if (sum < 0) {
			left++;
		} else {
			right--;
		}
	}
	return undefined;
}

sumZero([-5, -4, -2, 0, 1, 3, 5, 6, 7, 8]);
```

final complexities
time:
O(n)
space:
O(1)

the pattern fit because it required me to only work with 2 indexes as opposed to a range

## Part 5: Timed Problem 2

Time cap: 15 minutes

Problem:
Given an array of integers and a number `k`, return the maximum sum of `k` consecutive elements.

Before coding, write:

- input
- output
- edge cases
- likely pattern
- brute-force time complexity
- improved time complexity target

After coding, write:

- final time complexity
- final space complexity
- one sentence on why the pattern fit

## Part 6: Untimed Explain-Aloud Problem

Do this slowly. The goal is explanation discipline, not speed.

Problem:
Given two strings, determine whether they are anagrams of each other.

You must say aloud, in order:

1. the input and output contract
2. the naive approach
3. the bottleneck in the naive approach
4. the improved pattern choice
5. the data structure used and why
6. the final time and space complexity
7. one edge case you checked

Then code it.

## Part 7: Core Structure Recall

Answer these briefly.

1. In plain English, what does a stack do?
2. In plain English, what does a queue do?
3. What kind of order does a stack use?
4. What kind of order does a queue use?
5. Name one real programming situation where stack behavior shows up.
6. Name one real programming situation where queue behavior shows up.

## Part 8: Mentor Grade

Do not self-report this section.

Stop after finishing the drill and have Mentor grade each item as `clean`, `shaky`, or `missed`.

- frequency counter recall
- multiple pointers vs sliding window distinction
- lookup-structure reasoning
- stack vs queue recall
- pattern naming before coding
- timed implementation discipline
- complexity accuracy
- explain-aloud clarity

## Part 9: Mistakes Log Handoff

After the drill, add entries to the DSA mistakes log for any of these:

- picked the wrong pattern first
- knew the pattern but could not implement it cleanly
- solved brute force but missed the optimization
- rushed and skipped verification
- got complexity wrong

## Part 10: Repair Reps

Mentor fills this in after grading if anything is shaky or missed.

- Add targeted pattern-recognition reps here.
- Add implementation repair reps here.
- Add complexity or explanation repairs here.

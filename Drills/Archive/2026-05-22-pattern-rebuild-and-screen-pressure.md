# DSA Drill: Pattern Rebuild and Screen Pressure

Date: 2026-05-22
Focus: pattern naming, screen-style array reasoning, and explanation discipline
Goal: rebuild the exact DSA surfaces most likely to fail under pressure before widening into more topics

## Scope boundary

This drill only tests topics already covered by today's required notes.

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

- Study the required notes from `Planning/2026-05-22-hard-focus-plan.md` first, then close them.
- Do not write code before stating input, output, edge cases, and likely pattern.
- If you cannot name the improved pattern yet, state the brute-force path first.
- Write time and space complexity for every coded solution.
- Log shaky or missed items in `Planning/dsa-mistakes-log.md` after the drill.

## Part 1: Fast Recall

Answer each in 1 to 3 sentences.

1. What makes linear scan the correct first choice for some array problems?
   when the array is unsorted, we don't know if our target exists or we're just looking for the first index our target appears
2. What does a lookup structure replace in duplicate-detection work?
   it replaces the need for multiple / nested looping, especially over previous entries, often saving us a lot on time complexity closer to O(n) rather than O(n^2)
3. What clue often signals multiple pointers instead of sliding window?
   multiple pointers often work better when we're not looking to scan a range, rather than 1-3 indexes at a time, especially if we're working with a dynamic rather than fixed range. Also only when we have a sorted array typically
4. What clue often signals sliding window instead of multiple pointers?
   when we have a fixed range we want to scan at any one time and don't need to compare different (say end parts) of the array at once, its better for unsorted arrays and typically when we want to do stuff like finding maximum / minimum substrings or subsections
5. Why is "the code works" not a strong enough answer in a screen?
   because while we can get code to "work", the code may not typically be optimized or struggle with time / space complexity as work gets larger. Being able to identify a brute force solution and an optimized pattern that cuts work esp to O(n) time is essential when working at scale.
6. What is the difference between checking whether a value exists and counting how often values appear?
   checking whether a value exists can easily present false positives in our outputs. If we want to for example see if X values appear the same amount of times between arrays, "checking if it exists" means we can check multiple of the same value in one arr against one of another arr
7. Name one edge case for a first-index problem and one edge case for a duplicate-detection problem.
   value might not exist, duplicate might appear too early.
8. In plain English, what job does a frequency counter do?
   a frequency counter does multi value lookup to check if two arr / string match exactly, it cuts the cost of repeated / nested loops and time complexity typically from O(n^2) time to O(n)

## Part 2: Pattern Fit Only

Do not code yet. For each prompt, write:

1. input
2. output
3. edge cases
4. likely approach or pattern
5. why that fits better than a nearby alternative

### Prompt 1

Given an unsorted array of integers and a target, return `true` if the target exists.

1. input - arr / val
2. true / false
3. target does not exist, empty arr
4. linear scan pattern
5. allows us to loop through without requiring sorted array and find the specific value, typically O(n) time by default a similar pattern we could use is binary scan but it would be unsuitable because while it would be O(logN) we would need to sort the array adding additional time complexity

```js
function doesExist(arr, val) {
	for (let i = 0; i < arr.length; i++) {
		if (arr[i] === val) {
			return true;
		}
	}
	return false;
}
```

### Prompt 2

Given an unsorted array of integers and a target, return the index of the first occurrence or `-1`.

1. input - arr, target
2. idx, -1
3. target does not exist, empty arr
4. linear scan pattern
5. this would also be linear scan as we're just looking for the first occurance of the value, we don't need to count frequency, find duplicates or compare to other numbers in the arr / find a substring. As we're also not looking to see if it just exists rather the SPECIFIC location of it and it's unsorted, binary search would not be suitable either

```js
function doesExist(arr, val) {
	for (let i = 0; i < arr.length; i++) {
		if (arr[i] === val) {
			return i;
		}
	}
	return -1;
}
```

### Prompt 3

Given an array of integers, return `true` if any value appears more than once.

1. input - arr
2. output - true / false
3. edge cases - empty Arr, no duplicate, duplicate appears early / late
4. likely approach or pattern - lookup structure
5. a nearby alternative would be frequency counter / multiple pointer, however we wouldn't need these for this task as they are too advanced, a lookup structure works as we're only using 1 array, can store the values in a set and just check the set if the value exists already. This will be O(n) time and complexity

```js
function hasDuplicate(arr) {
	// check if arr less than 2, because then there can't be dupes
	if (arr.length < 2) {
		return false;
	}
	// create a new set
	let same = new Set();
	// loop over arr
	for (let i = 0; i < arr.length; i++) {
		// if item in set return true
		if (same.has(arr[i])) {
			return true;
		} else {
			// else add it
			same.add(arr[i]);
		}
	}
	// return false
	return false;
}
```

### Prompt 4

Given an array of integers, return the value that appears most often. If two values tie, return either one.

1. input - arr
2. output - val(integer)
3. edge cases - empty arr, one idx arr, no duplicates
4. likely approach or pattern - frequency counter
5. A frequency counter pattern is best here. By aggregating values into the object we avoid a brute force nested loop, and can then work through the numbers @O(n) time using the operators max, filter and map to find the results we want.

```js
function mostDupes(arr) {
	// 1. Guard against empty arrays or single items
	if (arr.length === 0) return -1;
	if (arr.length === 1) return arr[0];

	// Create counter
	let freq = {};
	// Loop over array to aggregate counts
	for (let val of arr) {
		freq[val] = (freq[val] || 0) + 1;
	}
	// Next get the maximum number
	const maxVal = Math.max(...Object.values(freq));
	// Filter all keys with that value
	const highestInts = Object.keys(freq).filter((key) => freq[key] === maxVal);
	// Then map those obj to new arr (Fixed capitalization)
	const result = highestInts.map(Number);

	// 3. Return value (Fixed: Returns the first item of the winners)
	return result[0];
}
```

### Prompt 5

Given a sorted array of integers, return whether any pair sums to `0`.

1. input - arr
2. output - arr [idx1, idx2]
3. edge cases - empty arr, one idx arr, array unsorted, no matching pair found
4. likely approach or pattern - multiple pointer
5. The multiple pattern pointer would be best for this prompt as it requires us to check two specific indexes across a sorted array this can be accomplished in O(n) time as we know the array is sorted, by scanning half the array each with each pointer and moving them until they meet, if they meet no match found.

```js
function sumZero(arr) {
	// 1. Guard against empty arrays or single items
	if (arr.length === 0) return -1;
	if (arr.length === 1) return arr[0];

	// set pointers
	let left = 0;
	let right = arr.length - 1;

	// loop over the array, and compare the current pointers values we want while
	while (left < right) {
		if (arr[left] + arr[right] === 0) {
			// if they match sum found
			return [arr[left], arr[right]];
			// if result is too low, move left up
		} else if (arr[left] + arr[right] < 0) {
			left++;
			// if right too small move right down
		} else {
			right--;
		}
	}
	// return -1 if no valid pair
	return -1;
}
```

### Prompt 6

Given an array of integers and a number `k`, return the maximum sum of any `k` consecutive values.

1. input - arr, k
2. output - num (max sum)
3. edge cases - empty arr, arr length < k
4. likely approach or pattern - sliding window
5. The sliding window pattern would be best for this prompt as it requires us to check a subset range of indexes in an array, while we could use a multiple pointer to do this, it would require complex management of many pointers at once whereas with this we can o(n) check a subsection of the array and then just loop over the rest, removing old and adding new values. "sliding" the window over.

```js
function maxConsecutiveSum(arr, k) {
	// 1. Guard against empty arrays or arr < k
	if (arr.length === 0) return -1;
	if (arr.length < k) return 0;

	// 2. set our temp / max numbers
	let temp;
	let max;

	// 3. loop over our arr until K -1 (the range (i starts 0 not 1))
	for (let i = 0; i < k - 1; i++) {
		max += arr[i];
	}

	// 4. at the end set our max to the temp;
	temp = max;

	// 5. loop over the rest of the array, removing our oldest number and adding our newest
	// start at k this time as we already included k-1
	for (let i = k; i < arr.length; i++) {
		// temp should = current temp + new digit - old digit
		temp = temp + arr[i] - arr[i - k];
		// check if temp > max, new max found
		if (temp > max) {
			max = temp;
		}
	}

	// 6. return something (max value)
	return max;
}
```

## Part 3: Distinction Pressure

Answer without notes.

1. Why is Prompt 5 multiple pointers instead of sliding window?
   the key takeaway is we wanted to compare two values instead of a range and that the array is sorted, this tells us that we will be dealing with integers that are positive and negative, meaning we would want two independant points moving rather than a window
2. Why is Prompt 6 sliding window instead of multiple pointers?
   as we are working in a range of indexes at this point and the array isn't specified to be sorted, sliding window makes more sense as we can find a sum of values without having to manage multiple pointers @every step
3. Why is Prompt 3 a strong lookup-structure candidate before nested loops?
   as we only need to find a lookup structure is ideal here it allows us to shave time complexity down to O(n) for a tiny bit of tradeoff in space complexity, where as with nested loops we would have had to look through the array multiple times for every index. O(n^2)
4. Why is Prompt 2 not a multiple-pointers problem?
   Because multiple pointers works best when we have to compare an index vs another index in a sorted structure, prompt 2 specifies unsorted and we only need to find the targets first occurance, linear scan accomplishes this @ O(n) time without the extra work of tracking multiple pointers
5. What actual property makes sorted input useful for pointer movement?
   answering specifically with our prompt 5 as an example, a sorted array allows us to set in stone a check we can clear to move one pointer or the other, this works in sorted int arrays as we can reliably predict if the output of the addition will be a certain value. In an unsorted array we don't know where the values we want are and it can skip over our correct values if it determines the sum is too high or low

## Part 4: Timed Problem 1

Time cap: 10 minutes

Problem:
Given an array of integers and a target value, return `true` if the target exists in the array.

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

---

input: arr, target
output: bool (t/f)
edge cases: empty arr no targ
likely approach: linear scan - do 1 loop check for targ O(n) time
Brute force time complexity - O(n) 1 unnested loop

```js
function doesExist(arr, val) {
	// guard vs empty array
	if (arr.length < 1) {
		return false;
	}

	for (let i = 0; i < arr.length; i++) {
		if (arr[i] === val) {
			return true;
		}
	}
	return false;
}
```

Summary: Completion Time 4 minutes

TC: O(N)
SC: O(1)

Reason: this approach required one single pass of the array without any extra complexity, linear scan fits this pattern well

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

---

input: arr
output: bool
edge cases: empty arr, arr.length < 1, no duplicates, duplicates too early / late
likely approach: Lookup structure - O(N) caching of values to prevent repeated lookups
Brute force time complexity: O(N^2) - we could nested loop the array but this would vastly increase time complexity

```js
function hasDuplicates(arr) {
	// guard
	if (arr.length === 0) return -1;
	if (arr.length < 1) return false;

	// Create Set to store our values
	let vals = new Set();

	// loop through our array to find vals
	for (let i = 0; i < arr.length; i++) {
		// check if val in set
		if (vals.has(arr[i])) {
			// dupe found
			return true;
		} else {
			// add to set for future use
			vals.add(arr[i]);
		}
	}

	// return something
	return false;
}
```

Summary: Completion time 5 minutes

TC: O(N)
SC: O(1)

Reason: This much like linear scan requires only one loop of the array, with the addition of checking for a dupe, which is solved by using a sets in built functionality to only store ONE of a value. We just check if the set has a value and if it does that's a duplicate and we can return true. This beats out the Brute force method of Nested looping the array.

## Part 6: Timed Problem 3

Time cap: 12 minutes

Problem:
Given an array of integers and a number `k`, return the maximum sum of any `k` consecutive values.

Before coding, write:

- input
- output
- edge cases
- likely pattern
- brute-force path
- improved approach

After coding, write:

- final time complexity
- final space complexity
- one sentence on why the pattern fit

---

input: arr, k
output: num (sum)
edge cases: empty arr, arr < k length,
likely approach: sliding window, as the problem stats an array (no mention of sorting) and a sum of consecutive values this is the O(n) time solution for a problem like this
Brute force time complexity: O(n^2) - nested loops

```js
function slidingSum(arr) {
	// guard
	if (arr.length === 0) return -1;
	if (arr.length < k) return 0;

	// define our temp and max
	let temp;
	let max;

	// loop through the array up to K - 1 (our index covering the K initial numbers)
	for (let i = 0; i < k - 1; i++) {
		// get the sum of the numbers and add to max
		max += arr[i];
	}
	// set temp to max to continue comparing
	temp = temp + max;

	// loop over the rest of the array to check the rest of teh numbers
	for (let i = k; i < arr.length; i++) {
		// check if each new number - each old number gives a new max
		temp = temp + arr[i] - arr[i - k];
		if (temp > max) {
			max = temp;
		}
	}
	// return max
	return max;
}
```

Summary: completion 6 minutes

TC: O(n)
SC: O(1)

Reason: Sliding window fits because it works on unsorted arrays, requires us to sum consecutive numbers and scan the entire array, while maintaining O(n) time

## Part 7: Explain-Aloud Rep

Do this slowly.

Prompt:
Explain the difference between linear scan, frequency counter, multiple pointers, and sliding window as if an interviewer asked when each one fits.

You must cover, in order:

1. the job each pattern is doing
2. the clue that makes it fit
3. one nearby pattern it is not
4. one example prompt for each

LINEAR SCAN:

Firstly, linear scan. The job it is doing is one singular loop over an array or string to find the target. Or the first occurrence index of a target.
The reason a linear scan Would fit in this place is that it doesn't require a sorted array. It doesn't require storing any Values in a lookup and as well as that it can work on very small or very large data sets at ovn time.
A pattern that operates nearby but it is not would be a search lookup, we don't need to store values with a linear scan.
A prompt for this would be given an unsorted array With target K, find the first occurrence of K.

FREQ COUNTER:

Frequency counter has the job of scanning multiple arrays or strings to find matching occurrences between the two.
The clues that lead it to be this passion would be along the lines of given two arrays or two strings, find similar occurrences, Or trying to find if one argument correlates to the other argument in a meaningful way And it mainly acts as a comparison tool.
A pattern it's not would be the search lookup, as they operate primarily the same in terms of saving frequencies, a counter is more geared toward multiple arrays rather than a single one
A prompt for this would be, given two strings, find if one string is a valid anagram of the other.

MULTIPLE POINTERS:

For multiple pointers, The job it's trying to do is to compare multiple indexes throughout the array without necessarily having to do multiple nested loops over the array to do so.
The clue that makes this fit is a multiple pointer. Would typically be used on a sorted array of integers. A single array or the question asking to compare indexes in the array.
One nearby pattern it is not is the sliding window pattern, which sacrifices a sorted array as well as having pointers scattered throughout for a fixed range of typically consecutive indexes.
One example prompt for this would be Given a sourced array of integers, find 2 integers that sum to zero.

SLIDING WINDOW:

Finally, sliding windows. The job sliding window is doing is to Either compare or perform operations on a range of consecutive integers or strings or for finding consecutive or longest substring inside a string.
The clues that make a sliding window fit are that it does not require a sorted array that typically you will be asked to find a substring or a consecutive amount of X.
One pattern that it clearly is similar to but doesn't fit is The multiple pointers pattern, which requires a sorted array and typically doesn't come with a range index or an additional value that you need to compute the answer.
A prompt for a sliding window would be Given a string fine the longest substring of unique characters

## Part 8: Mentor Grade

Do not self-report this section.

Stop after finishing the drill and have Mentor grade each item as `clean`, `shaky`, or `missed`.

- linear-scan recall
- lookup-structure reasoning
- multiple-pointers vs sliding-window distinction
- edge-case awareness
- pattern naming before coding
- complexity accuracy
- explain-aloud clarity

## Part 9: Repair Reps

Mentor fills this in after grading if anything is shaky or missed.

- Contract repair:
	- Rewrite the output contract for Prompt 5 in one line, then name the correct failure return in one line.
	- For duplicate detection, say aloud what the function returns for an empty array and why that still matches the prompt.
- Complexity repair:
	- State the worst-case space complexity for using a `Set` to detect duplicates and explain what is being stored.
	- State why linear scan for existence is `O(n)` time and `O(1)` space.
- Sliding-window repair:
	- Rebuild `maxConsecutiveSum(arr, k)` from scratch with the correct signature.
	- Initialize the first window sum before the sliding loop.
	- Say aloud what value leaves the window and what value enters the window on each step.
- Explanation repair:
	- Define `lookup structure`, `frequency counter`, `multiple pointers`, and `sliding window` in one sentence each.
	- For each one, name one nearby pattern it is not.

Tomorrow follow-up: complete `2026-05-23-dsa-repair-drill-contracts-complexity-and-window.md` before widening into any fresh challenge work.

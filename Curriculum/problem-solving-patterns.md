# Common Problem-Solving Patterns (plain English)

Problem-solving patterns help you recognize familiar shapes in problems so you
do not have to invent a solution from scratch every time.

The goal is not to memorize fancy names.

The goal is to get faster at answering questions like:

- What kind of problem is this really?
- What structure would make this cheaper?
- What repeated work can I avoid?

## Frequency Counter

Frequency counter is a pattern for counting how often values appear.

It is most useful when the problem is really about matching counts, not just
checking whether a value exists once.

### How it works

1. Loop through one input and count occurrences.
2. Loop through the other input if needed and count occurrences there too.
3. Compare the counts instead of repeatedly searching.

### When it fits

- anagrams
- same-value or same-square checks
- comparing whether two inputs contain the same items in the same amounts

### Example: squared values must match

#### Brute force

```js
function same(arr1, arr2) {
	if (arr1.length !== arr2.length) return false;

	for (let i = 0; i < arr1.length; i++) {
		const correctIndex = arr2.indexOf(arr1[i] ** 2);
		if (correctIndex === -1) return false;
		arr2.splice(correctIndex, 1);
	}

	return true;
}
```

This works, but it keeps searching through the second array again and again.

#### Pattern version

```js
function same(arr1, arr2) {
	if (arr1.length !== arr2.length) return false;

	const counter1 = {};
	const counter2 = {};

	for (const value of arr1) {
		counter1[value] = (counter1[value] || 0) + 1;
	}

	for (const value of arr2) {
		counter2[value] = (counter2[value] || 0) + 1;
	}

	for (const key in counter1) {
		if (!(key ** 2 in counter2)) return false;
		if (counter2[key ** 2] !== counter1[key]) return false;
	}

	return true;
}
```

### Why it is better

Instead of rescanning for matches, you store the information once and compare
directly.

## Multiple Pointers

Multiple pointers means using two or more index positions to move through data
in a controlled way.

This pattern is especially useful when the data is sorted, because the pointer
movement becomes meaningful.

### How it works

1. Start pointers at meaningful places, often the beginning and end.
2. Check the current pair or positions.
3. Move the pointer that gets you closer to the goal.

### When it fits

- the input is sorted
- you need a pair or comparison between positions
- moving one pointer can safely rule out more work

### Example: first zero-sum pair

#### Brute force

```js
function sumZero(arr) {
	for (let i = 0; i < arr.length; i++) {
		for (let j = i + 1; j < arr.length; j++) {
			if (arr[i] + arr[j] === 0) {
				return [arr[i], arr[j]];
			}
		}
	}
}
```

#### Pattern version

```js
function sumZero(arr) {
	let left = 0;
	let right = arr.length - 1;

	while (left < right) {
		const sum = arr[left] + arr[right];

		if (sum === 0) return [arr[left], arr[right]];
		if (sum > 0) right--;
		else left++;
	}
}
```

### Why it is better

Because the array is sorted, pointer movement gives real information. You do
not need to test every possible pair.

## Sliding Window

Sliding window is a pattern for working with a contiguous range of values.

Instead of rebuilding each range from scratch, you update the current range as
the window moves.

### How it works

1. Build the first valid window.
2. Track the current score, such as a sum or count.
3. Slide forward by removing the outgoing value and adding the incoming value.

### When it fits

- the problem is about a contiguous subarray or substring
- the window has a fixed size or clear growth/shrink rules
- recomputing each segment from scratch would waste work

### Example: max sum of `k` consecutive values

#### Brute force

```js
function maxSubarraySum(arr, num) {
	if (num > arr.length) return null;

	let max = -Infinity;

	for (let i = 0; i <= arr.length - num; i++) {
		let temp = 0;

		for (let j = 0; j < num; j++) {
			temp += arr[i + j];
		}

		if (temp > max) max = temp;
	}

	return max;
}
```

#### Pattern version

```js
function maxSubarraySum(arr, num) {
	if (arr.length < num) return null;

	let maxSum = 0;

	for (let i = 0; i < num; i++) {
		maxSum += arr[i];
	}

	let tempSum = maxSum;

	for (let i = num; i < arr.length; i++) {
		tempSum = tempSum - arr[i - num] + arr[i];
		maxSum = Math.max(maxSum, tempSum);
	}

	return maxSum;
}
```

### Why it is better

The pattern avoids rebuilding the full window every time. It updates the answer
in constant work per move.

## Divide and Conquer

Divide and conquer solves a problem by splitting it into smaller pieces,
solving those pieces, and then combining the result.

### How it works

1. Split the input into smaller parts.
2. Solve the smaller problem.
3. Combine or choose the needed result.

### When it fits

- ordered data
- recursive split-and-solve problems
- problems where one decision can throw away a large chunk of work

### Example: binary search

#### Brute force

```js
function search(arr, val) {
	for (let i = 0; i < arr.length; i++) {
		if (arr[i] === val) return i;
	}

	return -1;
}
```

#### Pattern version

```js
function binarySearch(sortedArr, target) {
	let left = 0;
	let right = sortedArr.length - 1;

	while (left <= right) {
		const mid = Math.floor((left + right) / 2);

		if (sortedArr[mid] === target) return mid;
		if (sortedArr[mid] < target) left = mid + 1;
		else right = mid - 1;
	}

	return -1;
}
```

### Why it is better

Each comparison cuts the remaining search space down sharply instead of scanning
through everything one by one.

## How to choose the right pattern

Ask these questions:

1. Am I counting occurrences?
2. Am I working with sorted data?
3. Is the problem about a contiguous range?
4. Can I throw away a large chunk of work after one comparison?

### Quick cue guide

- Count and compare frequencies -> frequency counter
- Sorted pair or position problem -> multiple pointers
- Contiguous range or substring -> sliding window
- Ordered input that can be halved -> divide and conquer

## Quick recap

- Patterns are reusable solution shapes, not magic formulas.
- Frequency counter is for counts.
- Multiple pointers is for controlled movement across sorted data.
- Sliding window is for contiguous ranges.
- Divide and conquer is for split-and-solve problems.
- The main job is pattern recognition before coding.

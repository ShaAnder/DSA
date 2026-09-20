# Big O Notation (plain English)

Big O is a way of describing how an algorithm behaves as the input gets larger.

The key idea is not:

"How many milliseconds did this take on my laptop right now?"

The key idea is:

"What direction does the cost move in as the input size grows?"

## What Big O is really measuring

Big O helps you talk about growth, not exact timing.

That means you are not trying to measure tiny real-world timing differences.
You are trying to describe how the work scales.

### Example

```js
function doubleValues(arr) {
	const result = [];

	for (const value of arr) {
		result.push(value * 2);
	}

	return result;
}
```

If the array doubles in size, the loop also does about twice as much work.
That is why this is $O(n)$ time.

## Why exact timing is not enough

Real timing can be misleading because:

- different machines run code at different speeds
- the same machine can be busy with other work
- small timing differences can look random

Big O gives you a more stable language for comparing solutions.

### Example

If one solution uses a nested loop and another uses a single pass, the nested
loop will usually scale much worse even if both seem fast on tiny test inputs.

## Counting operations in plain English

One practical way to think about Big O is to ask:

1. How many times can this loop run?
2. Is there another loop inside it?
3. Does each step cut the problem down a lot?
4. Does the algorithm create extra arrays, objects, or maps?

### Example

```js
function hasTarget(arr, target) {
	for (let i = 0; i < arr.length; i++) {
		if (arr[i] === target) return true;
	}

	return false;
}
```

This touches each item at most once, so the time grows linearly with the input.

## The most common Big O categories

These are the main patterns you will see early on.

### 1. Constant time: $O(1)$

The amount of work stays the same no matter how large the input gets.

#### Example

```js
function getFirst(arr) {
	return arr[0];
}
```

Getting the first item is still one access whether the array has 3 items or
300,000 items.

### 2. Logarithmic time: $O(\log n)$

The problem gets cut down sharply at each step, often in half.

#### Example

```js
function binarySearch(nums, target) {
	let left = 0;
	let right = nums.length - 1;

	while (left <= right) {
		const mid = Math.floor((left + right) / 2);

		if (nums[mid] === target) return mid;
		if (nums[mid] < target) left = mid + 1;
		else right = mid - 1;
	}

	return -1;
}
```

Binary search is fast because each comparison throws away half the remaining
search space.

### 3. Linear time: $O(n)$

The work grows in direct proportion to the input size.

#### Example

```js
function maxValue(nums) {
	let best = -Infinity;

	for (const num of nums) {
		if (num > best) best = num;
	}

	return best;
}
```

The function checks each value once.

### 4. Linearithmic time: $O(n \log n)$

This often appears in divide-and-conquer algorithms.

#### Example

```js
function mergeSort(nums) {
	if (nums.length <= 1) return nums;

	const mid = Math.floor(nums.length / 2);
	const left = mergeSort(nums.slice(0, mid));
	const right = mergeSort(nums.slice(mid));

	return merge(left, right);
}
```

Merge sort repeatedly splits the input, then does linear work to merge pieces
back together.

### 5. Quadratic time: $O(n^2)$

This often happens when you compare each item against many other items.

#### Example

```js
function hasDuplicate(nums) {
	for (let i = 0; i < nums.length; i++) {
		for (let j = i + 1; j < nums.length; j++) {
			if (nums[i] === nums[j]) return true;
		}
	}

	return false;
}
```

The nested loop is the warning sign here.

## Why constants do not matter in Big O

Big O focuses on the dominant growth trend.

That means these simplify to the same category:

- $O(2n)$ becomes $O(n)$
- $O(500)$ becomes $O(1)$
- $O(13n^2)$ becomes $O(n^2)$

### Example

```js
function printPairs(arr) {
	for (let i = 0; i < arr.length; i++) {
		console.log(arr[i]);
		console.log(arr[i]);
	}
}
```

This still grows linearly. Printing each item twice is more work, but it is
still the same kind of growth: $O(n)$.

## Why smaller terms usually do not matter

When one term dominates the growth, the smaller terms stop mattering much as
the input grows.

Examples:

- $O(n + 10)$ becomes $O(n)$
- $O(1000n + 50)$ becomes $O(n)$
- $O(n^2 + 5n + 8)$ becomes $O(n^2)$

### Example

If one algorithm has one loop plus a fixed cleanup step, the loop dominates as
the input gets bigger.

## Space complexity

Big O is not only about time.

Space complexity describes how much extra memory the algorithm uses as the
input grows.

The most useful version to watch is auxiliary space, which means memory
created by the algorithm itself, not the input that was already given.

### Rules of thumb

- primitive values are usually $O(1)$ space
- strings are usually $O(n)$ space based on length
- arrays and objects usually scale with how much data they store

### Example: constant auxiliary space

```js
function sum(arr) {
	let total = 0;

	for (let i = 0; i < arr.length; i++) {
		total += arr[i];
	}

	return total;
}
```

This uses one running total, so the extra memory stays constant: $O(1)$ space.

### Example: linear auxiliary space

```js
function double(arr) {
	const result = [];

	for (let i = 0; i < arr.length; i++) {
		result.push(arr[i] * 2);
	}

	return result;
}
```

This creates a new array that grows with the input, so the extra memory is
$O(n)$.

## Arrays vs objects through the Big O lens

Different structures have different common operation costs.

### At a glance

| Operation             | Arrays | Objects |
| --------------------- | ------ | ------- |
| Access by index / key | $O(1)$ | $O(1)$  |
| Add/remove at end     | $O(1)$ | N/A     |
| Add/remove near start | $O(n)$ | $O(1)$  |
| Search                | $O(n)$ | $O(n)$  |

### Example

```js
const arr = [10, 20, 30];
const obj = { name: "Shaun", role: "developer" };

arr[1];
obj.name;
```

Both lookups are constant time because they go directly to the requested slot or
property.

## How to explain Big O in interviews

Keep the explanation mechanical.

Ask:

1. How many times can the loop or recursion run?
2. Is there nested work?
3. What extra memory is being created?
4. How does the optimized approach compare to the brute-force one?

### Example explanation

"This solution is $O(n)$ time because it loops through the array once, and it
is $O(n)$ space because the `Set` can store up to every value in the array in
the worst case."

## Quick recap

- Big O describes growth, not exact timing.
- Time complexity and space complexity are both important.
- Constants and smaller terms usually get simplified away.
- Nested loops often signal $O(n^2)$.
- Cutting the problem down sharply often signals $O(\log n)$.
- Good explanations compare the brute-force path to the improved one.

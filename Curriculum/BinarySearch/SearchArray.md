# Binary Search On A Sorted Array (plain English)

This note is about the standard binary search problem on a sorted array.

The goal is not just to memorize the code.

The goal is to understand why the boundaries move the way they do, what the
algorithm assumes, and when it is actually valid to use it.

## 1. What binary search is trying to do

Binary search is a search strategy for sorted data.

Instead of checking every value one by one, it repeatedly cuts the search space
in half.

That is the whole reason it is faster than a linear scan.

If the array is sorted, the middle value tells you which half can be discarded.

## 2. The key assumption

Binary search only works if the data has enough order for you to discard half of
the remaining possibilities safely.

For the classic array version, that usually means:

- the array is sorted in ascending or descending order
- you know which order it uses
- the comparison with the midpoint tells you whether to go left or right

If the array is not ordered in a useful way, binary search is not valid.

## 3. The basic setup

In the standard version, you track three values:

- `left`
- `right`
- `mid`

`left` starts at the beginning of the array.

`right` starts at the end of the array.

`mid` is the middle index between them.

Example:

```js
let nums = [-1, 0, 3, 5, 9, 12];
let target = 9;
```

At the start:

- `left = 0`
- `right = 5`
- `mid = 2`
- `nums[mid] = 3`

Since `3 < 9`, the target cannot be in the left half including index `2`.

So you move `left` to `mid + 1`.

## 4. Why the midpoint matters

The midpoint is your information checkpoint.

You compare the middle value to the target.

There are only three outcomes:

1. `nums[mid] === target`
2. `nums[mid] < target`
3. `nums[mid] > target`

If the array is sorted ascending:

- when `nums[mid] < target`, go right
- when `nums[mid] > target`, go left

That works because sorted order lets you eliminate half the array with one
comparison.

## 5. The classic implementation shape

```js
function search(nums, target) {
	let left = 0;
	let right = nums.length - 1;

	while (left <= right) {
		let mid = Math.floor((left + right) / 2);

		if (nums[mid] === target) return mid;

		if (nums[mid] < target) {
			left = mid + 1;
		} else {
			right = mid - 1;
		}
	}

	return -1;
}
```

## 6. Why the boundary updates use `mid + 1` and `mid - 1`

This is one of the most important parts to understand.

If `nums[mid] < target`, you already know index `mid` is not the answer.

So the next valid search range must start after it.

That is why you use:

```js
left = mid + 1;
```

If `nums[mid] > target`, then index `mid` is also not the answer.

So the next valid range must end before it.

That is why you use:

```js
right = mid - 1;
```

If you forget the `+ 1` or `- 1`, you can trap the loop on the same midpoint
again and again.

## 7. The loop condition

The classic loop condition is:

```js
while (left <= right)
```

That means there is still at least one candidate position left to inspect.

When `left` becomes greater than `right`, the search space is empty.

That is when you know the target is not present.

## 8. Time and space complexity

Each step cuts the remaining search space roughly in half.

That means the number of steps grows logarithmically.

- Time: $O(\log n)$
- Space: $O(1)$ for the iterative version

Compare that to linear search:

- Linear search time: $O(n)$

Binary search is better when the ordering assumptions hold and random access is
cheap.

## 9. A quick dry run

Use this array:

```js
nums = [-1, 0, 3, 5, 9, 12];
target = 9;
```

Step 1:

- `left = 0`
- `right = 5`
- `mid = 2`
- `nums[mid] = 3`

`3 < 9`, so move right:

- `left = 3`

Step 2:

- `left = 3`
- `right = 5`
- `mid = 4`
- `nums[mid] = 9`

Found it, so return `4`.

## 10. Common mistakes

### Mistake 1: using binary search on unsorted data

If the input is not sorted in a meaningful way, binary search is not justified.

### Mistake 2: wrong loop condition

Using the wrong boundary condition can skip valid indices or create infinite
loops.

### Mistake 3: forgetting to exclude `mid`

If you already know `mid` is not the answer, the next range must move past it.

### Mistake 4: mixing index logic and value logic

Binary search is about shrinking an index range based on value comparison.

Do not confuse the midpoint index with the midpoint value.

### Mistake 5: not stating the invariant

A good way to think about the invariant is:

- if the target exists, it must still be inside the current range from `left` to `right`

Every boundary update should preserve that statement.

## 11. When binary search fits

Binary search fits when:

- the search space is ordered
- you can inspect the middle efficiently
- one comparison lets you throw away half the remaining candidates

Classic examples:

- search for a value in a sorted array
- search for a boundary in ordered data
- search on an answer space where a condition flips from false to true

## 12. Example problem shape: search for a target in a sorted array

This is the classic problem shape for this note.

Given a sorted array and a target, return the index of the target or `-1` if it
is not present.

Example:

```js
nums = [-1, 0, 3, 5, 9, 12];
target = 9;
```

### Brute-force version

The honest brute-force solution is just a linear scan.

```js
function searchBrute(nums, target) {
	for (let i = 0; i < nums.length; i++) {
		if (nums[i] === target) {
			return i;
		}
	}

	return -1;
}
```

Why it works:

- it checks every position until it finds the target
- it does not need sorted input to be correct

Cost:

- Time: $O(n)$
- Space: $O(1)$

### Binary search version

If the array is sorted, we can do better.

```js
function search(nums, target) {
	let left = 0;
	let right = nums.length - 1;

	while (left <= right) {
		let mid = Math.floor((left + right) / 2);

		if (nums[mid] === target) return mid;

		if (nums[mid] < target) {
			left = mid + 1;
		} else {
			right = mid - 1;
		}
	}

	return -1;
}
```

Why it is better:

- it uses sorted order to discard half the remaining candidates each step
- it avoids scanning values that can no longer possibly contain the answer

Cost:

- Time: $O(\log n)$
- Space: $O(1)$

## 13. What binary search is not

Binary search is not “anything with the word binary in it.”

It is not the same thing as:

- binary trees
- binary search trees
- recursion in general

The shared word does not mean the mechanism is the same.

Binary search is about ordered search space and halving.

## 14. What you should be able to say after studying this

You should be able to answer these clearly:

1. Why does binary search need sorted data?
2. Why does `left = mid + 1` make sense?
3. Why does `right = mid - 1` make sense?
4. What does `while (left <= right)` mean?
5. Why is the time complexity $O(\log n)$?

## Quick recap

- Binary search is for ordered search spaces.
- It works by checking the midpoint and discarding half the remaining range.
- `left`, `right`, and `mid` define the current candidate range.
- The midpoint must be excluded after a failed comparison.
- The iterative version runs in $O(\log n)$ time and $O(1)$ extra space.

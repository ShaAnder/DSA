# Search Range In A Sorted Array (plain English)

This note is about the binary search variation where you need the first and last
position of a target in a sorted array.

The goal is not just to get one matching index.

The goal is to find the full range where the target appears.

That changes the logic slightly, because finding one match is not enough.

## 1. What the problem is asking for

In the classic version, the prompt is usually something like this:

Given a sorted array of integers `nums` and a target value `target`, return the
starting and ending position of `target`.

If the target is not found, return `[-1, -1]`.

Example:

```js
nums = [5, 7, 7, 8, 8, 10];
target = 8;
```

Output:

```js
[3, 4];
```

## 2. Why the normal binary search is not enough

Regular binary search stops as soon as it finds one match.

That is fine when the question only asks whether the target exists or asks for
any one valid index.

It is not enough here, because this problem wants the full boundary range.

If you stop at the first `8` you see, you still do not know:

- whether there is another `8` to the left
- whether there is another `8` to the right

So this problem is really about finding boundaries, not just presence.

## 3. The core idea

You usually solve this with two binary searches:

1. one search for the leftmost occurrence
2. one search for the rightmost occurrence

The array is still sorted, so binary search is still valid.

The difference is what you do when you find the target.

Instead of returning immediately, you keep searching toward the relevant side.

## 4. Left boundary search

For the left boundary, when you find `nums[mid] === target`, you do **not** stop.

You record the index as a possible answer, then continue searching left.

Why?

Because there might be another copy of the target earlier in the array.

That means the update becomes:

```js
right = mid - 1;
```

after storing the current `mid` as a candidate.

## 5. Right boundary search

For the right boundary, when you find `nums[mid] === target`, you also do not stop.

You record the index as a possible answer, then continue searching right.

That means the update becomes:

```js
left = mid + 1;
```

after storing the current `mid` as a candidate.

## 6. Why this works

The sorted order still lets you remove half of the remaining range at each step.

The difference is that “found target” does not end the search.

Instead, it means:

- this index could be part of the answer
- but I need to keep looking for a better boundary on one side

That is the main mental shift from basic binary search.

## 7. A common implementation shape

```js
function searchRange(nums, target) {
	function findLeft() {
		let left = 0;
		let right = nums.length - 1;
		let answer = -1;

		while (left <= right) {
			let mid = Math.floor((left + right) / 2);

			if (nums[mid] === target) {
				answer = mid;
				right = mid - 1;
			} else if (nums[mid] < target) {
				left = mid + 1;
			} else {
				right = mid - 1;
			}
		}

		return answer;
	}

	function findRight() {
		let left = 0;
		let right = nums.length - 1;
		let answer = -1;

		while (left <= right) {
			let mid = Math.floor((left + right) / 2);

			if (nums[mid] === target) {
				answer = mid;
				left = mid + 1;
			} else if (nums[mid] < target) {
				left = mid + 1;
			} else {
				right = mid - 1;
			}
		}

		return answer;
	}

	return [findLeft(), findRight()];
}
```

## 8. The role of `answer = -1`

This is important.

You need a variable that stores the best boundary candidate found so far.

If the target never appears, that answer stays `-1`.

That is how you correctly return `[-1, -1]` when the target does not exist.

## 9. Time and space complexity

You run binary search twice.

Each binary search is $O(\log n)$.

So the total time is still:

- Time: $O(\log n)$

The extra space for the iterative version is still:

- Space: $O(1)$

Two logarithmic searches are still logarithmic overall.

## 10. A quick dry run

Use this array:

```js
nums = [5, 7, 7, 8, 8, 10];
target = 8;
```

### Left search

Start:

- `left = 0`
- `right = 5`

Step 1:

- `mid = 2`
- `nums[mid] = 7`

`7 < 8`, so go right:

- `left = 3`

Step 2:

- `mid = 4`
- `nums[mid] = 8`

Found target:

- `answer = 4`
- keep searching left, so `right = 3`

Step 3:

- `mid = 3`
- `nums[mid] = 8`

Found target again:

- `answer = 3`
- move left again, so `right = 2`

Now stop. Left boundary is `3`.

### Right search

Start again from the full range.

Step 1:

- `mid = 2`
- `nums[mid] = 7`

Go right:

- `left = 3`

Step 2:

- `mid = 4`
- `nums[mid] = 8`

Found target:

- `answer = 4`
- keep searching right, so `left = 5`

Step 3:

- `mid = 5`
- `nums[mid] = 10`

Too large, so move left:

- `right = 4`

Stop. Right boundary is `4`.

Final answer:

```js
[3, 4];
```

## 11. Common mistakes

### Mistake 1: returning immediately on the first match

That gives you one index, not the full range.

### Mistake 2: forgetting that left and right searches behave differently after a match

On a match:

- left boundary search moves `right`
- right boundary search moves `left`

If you mix those up, you get the wrong boundary.

### Mistake 3: not storing the current match before continuing

If you move the boundary without storing `mid`, you can lose the best answer found so far.

### Mistake 4: assuming two searches makes the solution linear

It does not.

Two binary searches are still $O(\log n)$ overall.

### Mistake 5: mixing up “find target” with “find boundary”

This problem is boundary search.

That is why the search continues even after a match.

## 12. When this variation matters

This pattern matters when the prompt asks for:

- the first occurrence
- the last occurrence
- the insertion boundary
- the first position where a condition becomes true
- the last position where a condition remains true

That is broader than just this one problem.

It is part of the bigger idea of binary search on boundaries.

## 13. Example problem shape: find the first and last index of a target

This is the standard range-search problem.

Given a sorted array and a target, return the first and last position where the
target appears.

Example:

```js
nums = [5, 7, 7, 8, 8, 10];
target = 8;
```

Expected answer:

```js
[3, 4];
```

### Brute-force version

The brute-force solution is a full scan.

```js
function searchRangeBrute(nums, target) {
	let first = -1;
	let last = -1;

	for (let i = 0; i < nums.length; i++) {
		if (nums[i] === target) {
			if (first === -1) {
				first = i;
			}

			last = i;
		}
	}

	return [first, last];
}
```

Why it works:

- it checks every element
- it records the first match once and keeps updating the last match

Cost:

- Time: $O(n)$
- Space: $O(1)$

### Binary search boundary version

Because the array is sorted, we can find the left boundary and right boundary
with two binary searches.

```js
function searchRange(nums, target) {
	function findLeft() {
		let left = 0;
		let right = nums.length - 1;
		let answer = -1;

		while (left <= right) {
			let mid = Math.floor((left + right) / 2);

			if (nums[mid] === target) {
				answer = mid;
				right = mid - 1;
			} else if (nums[mid] < target) {
				left = mid + 1;
			} else {
				right = mid - 1;
			}
		}

		return answer;
	}

	function findRight() {
		let left = 0;
		let right = nums.length - 1;
		let answer = -1;

		while (left <= right) {
			let mid = Math.floor((left + right) / 2);

			if (nums[mid] === target) {
				answer = mid;
				left = mid + 1;
			} else if (nums[mid] < target) {
				left = mid + 1;
			} else {
				right = mid - 1;
			}
		}

		return answer;
	}

	return [findLeft(), findRight()];
}
```

Why it is better:

- it uses sorted order instead of scanning the whole array
- it treats the problem as two boundary searches rather than one presence check

Cost:

- Time: $O(\log n)$
- Space: $O(1)$

## 14. What you should be able to say after studying this

You should be able to answer these clearly:

1. Why is ordinary binary search not enough for this problem?
2. Why do you keep searching after finding the target?
3. Why does left-boundary search move `right` after a match?
4. Why does right-boundary search move `left` after a match?
5. Why is the total time still $O(\log n)$?

## Quick recap

- Search range is a boundary-finding binary search problem.
- One match is not enough because you need the full target range.
- Use one binary search for the left boundary and one for the right boundary.
- Record a match, then keep searching toward the correct side.
- The final time complexity is still $O(\log n)$ with $O(1)$ extra space.

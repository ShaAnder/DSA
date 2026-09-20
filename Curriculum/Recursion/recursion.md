## Recursion

Recursion is when a function solves a problem by calling itself on a smaller version of that same problem.

The easiest way to think about it is:

"Handle one small piece now, then let the same function handle the rest."

## What recursion is really doing

Recursion is not magic. It is still just a sequence of function calls.

Each time a recursive function runs, JavaScript puts that function call onto the call stack. The function keeps calling itself until it reaches a stopping point.

```js
function countDown(n) {
	if (n <= 0) {
		console.log("Done");
		return;
	}

	console.log(n);
	countDown(n - 1);
}
```

If you call `countDown(3)`, the flow is:

1. print `3`
2. call `countDown(2)`
3. print `2`
4. call `countDown(1)`
5. print `1`
6. call `countDown(0)`
7. hit the base case and stop

## The call stack and recursion

The call stack is the structure JavaScript uses to keep track of which function is currently running and which function should resume next.

With recursion, each new call gets added on top of the previous one.

If you call `countDown(3)`, the stack grows like this:

```js
countDown(3);
countDown(2);
countDown(1);
countDown(0);
```

At `countDown(0)`, the base case is reached, so no more calls are added. Then JavaScript starts removing calls from the stack one by one.

That is why recursion often feels like it has two phases:

- going down into deeper calls
- coming back up as the stack unwinds

## The four parts of recursion

Most recursive functions follow the same core shape:

1. base case
2. current work
3. smaller recursive call
4. return or bubble back up

Example:

```js
function hasOdd(nums) {
	if (nums.length === 0) return false;
	if (nums[0] % 2 !== 0) return true;
	return hasOdd(nums.slice(1));
}
```

How it fits the pattern:

- base case -> if the array is empty, return `false`
- current work -> check whether the first value is odd
- smaller call -> call the same function on the rest of the array
- return -> return whatever the smaller call finds

## Why the base case matters

Without a base case, recursion never stops.

That causes a stack overflow because more and more function calls keep getting added to the call stack.

```js
function badCountDown(n) {
	console.log(n);
	badCountDown(n - 1);
}
```

This never stops because there is no condition telling it when to return.

## What "bubble back up" means

For many recursive problems, the real answer is not finished until the deepest call returns and the earlier calls start receiving values back.

```js
function sumRange(n) {
	if (n === 1) return 1;
	return n + sumRange(n - 1);
}
```

If you call `sumRange(3)`, JavaScript sees:

```js
sumRange(3);
sumRange(2);
sumRange(1);
```

Then the base case returns `1`, and the earlier calls resume:

```js
sumRange(1) returns 1
sumRange(2) returns 2 + 1 = 3
sumRange(3) returns 3 + 3 = 6
```

That is what people mean when they say the result bubbles back up.

## Helper recursion vs pure recursion

There are two common ways to write recursive solutions.

### Helper recursion

This approach uses an outer function plus an inner recursive helper. The helper usually shares access to a variable from the outer function.

```js
function collectOddValues(arr) {
	const odds = [];

	function helper(index) {
		if (index === arr.length) return;
		if (arr[index] % 2 !== 0) odds.push(arr[index]);
		helper(index + 1);
	}

	helper(0);
	return odds;
}
```

What is happening here:

- `odds` is created once in the outer function
- `helper` walks through the array recursively
- each odd value gets pushed into `odds`
- once recursion ends, the final array is returned

### Pure recursion

This approach does not rely on an outside accumulator. Instead, each call returns part of the result, and those parts are combined.

```js
function collectOddValuesPure(arr) {
	if (arr.length === 0) return [];

	const head = arr[0] % 2 !== 0 ? [arr[0]] : [];
	return head.concat(collectOddValuesPure(arr.slice(1)));
}
```

What is happening here:

- each call decides whether the first value should be included
- the function recursively solves the rest of the array
- the current result is joined to the recursive result

## When recursion is a good fit

Recursion is usually a good fit when the problem naturally repeats the same kind of work on smaller pieces.

Common examples:

- walking through trees
- depth-first search
- nested objects or nested arrays
- divide-and-conquer algorithms
- problems where each step clearly reduces the input size

```js
function sumNested(arr) {
	let total = 0;

	for (const value of arr) {
		if (Array.isArray(value)) {
			total += sumNested(value);
		} else {
			total += value;
		}
	}

	return total;
}
```

Here recursion works well because a nested array can contain smaller nested arrays, which have the same shape as the original problem.

## When recursion is not a great fit

Sometimes recursion is correct but not the clearest or most efficient tool.

You should be cautious when:

- the problem is simple and iteration is clearer
- recursion depth could get very large
- each call copies arrays or strings unnecessarily
- you still do not fully understand the control flow

```js
function sumIterative(arr) {
	let total = 0;

	for (let i = 0; i < arr.length; i++) {
		total += arr[i];
	}

	return total;
}
```

For a simple flat array sum, iteration is usually easier to read than recursion.

## Common beginner mistakes

### Forgetting the base case

```js
function broken(n) {
	return broken(n - 1);
}
```

If there is no base case, the function never stops.

### Not shrinking the input

```js
function alsoBroken(arr) {
	if (arr.length === 0) return [];
	return alsoBroken(arr);
}
```

This still loops forever because `arr` never changes.

### Forgetting to return the recursive call

```js
function brokenSum(arr) {
	if (arr.length === 0) return 0;
	arr[0] + brokenSum(arr.slice(1));
}
```

This is wrong because the expression is never returned.

Correct version:

```js
function recursiveSum(arr) {
	if (arr.length === 0) return 0;
	return arr[0] + recursiveSum(arr.slice(1));
}
```

### Copying too much data

Using methods like `slice()` in every call can make the solution easier to read, but it can also cost extra memory and time.

```js
function sumWithIndex(arr, index = 0) {
	if (index === arr.length) return 0;
	return arr[index] + sumWithIndex(arr, index + 1);
}
```

This avoids copying a new array on every call.

## A simple way to think through recursive problems

When writing recursion, ask yourself these questions in order:

1. What is the smallest input I can answer immediately?
2. How does the input get smaller on each call?
3. What should this function return for the current step?
4. What should the recursive call handle for me?

Example prompt:

"Return `true` if an array contains an odd number."

Thinking process:

1. Smallest input: an empty array returns `false`
2. Shrink step: remove or skip the first element
3. Current step: check whether the first element is odd
4. Recursive call: let the function check the rest of the array

## Useful note to remember

Recursion is not about loops. It is about the same function solving smaller and smaller versions of the same problem.

If you cannot name the base case and the shrinking step, you probably do not understand the recursion yet.

### Summing it up

- Recursion means a function calls itself on a smaller version of the problem.
- Every recursive function needs a base case.
- The input must shrink toward that base case.
- Many recursive solutions return values that bubble back up.
- Helper recursion uses a shared accumulator, while pure recursion builds the result from return values.
- Recursion is powerful for nested structures, but iteration is sometimes simpler.

# Screen Foundations: Linear Scan, Lookups, and Edge Cases (plain English)

This note covers the first DSA ideas that show up often in entry-level screens:

- simple search
- duplicate detection
- lookup reasoning
- contract and edge-case discipline

The goal is not to impress anyone with a fancy pattern too early.

The goal is to understand the honest baseline first.

## 1. Linear scan

Linear scan means checking values one by one from left to right until you find
what you need or reach the end.

### When it fits

- the array is unsorted
- you need to know whether a value exists
- you need the first index of a value
- there is no stronger structure or precondition to exploit

### Why it matters

Linear scan is often the correct first answer.

It is the baseline you compare stronger approaches against.

### Example

```js
function findFirstIndex(arr, target) {
	for (let index = 0; index < arr.length; index++) {
		if (arr[index] === target) return index;
	}

	return -1;
}
```

### Cost

- Time: $O(n)$
- Space: $O(1)$

## 2. Lookup structures

A lookup structure is a place to store information you have already seen so you
can check it quickly later.

In JavaScript, common lookup structures are:

- objects
- `Map`
- `Set`

### When they fit

- duplicate detection
- frequency counting
- repeated membership checks
- problems where rescanning older values would waste time

### Why they matter

They trade extra memory for faster future checks.

That means instead of asking:

"Have I seen this before? Let me scan the whole earlier part again."

You ask:

"Have I seen this before? Let me check the structure directly."

### Example

```js
function hasDuplicate(arr) {
	const seen = new Set();

	for (const value of arr) {
		if (seen.has(value)) return true;
		seen.add(value);
	}

	return false;
}
```

### Cost

- Time: $O(n)$
- Space: $O(n)$

## 3. Why duplicate detection is a good first lookup problem

Duplicate detection is a useful first example because the brute-force solution
and the improved solution are easy to compare.

### Brute force

```js
function hasDuplicateBrute(arr) {
	for (let i = 0; i < arr.length; i++) {
		for (let j = i + 1; j < arr.length; j++) {
			if (arr[i] === arr[j]) return true;
		}
	}

	return false;
}
```

This checks many pairs repeatedly.

### Improved version

```js
function hasDuplicate(arr) {
	const seen = new Set();

	for (const value of arr) {
		if (seen.has(value)) return true;
		seen.add(value);
	}

	return false;
}
```

This stores seen values once and avoids repeated searching.

## 4. Edge cases to name before coding

Before you code, stop and name the edge cases.

That matters because many early mistakes are not syntax mistakes. They are
contract mistakes.

### Common edge cases

- empty input
- one-element input
- target not found
- duplicate appears early
- duplicate appears late

### Example

For duplicate detection:

- `[] -> false`
- `[7] -> false`
- `[1, 2, 3] -> false`
- `[1, 2, 1] -> true`

## 5. Brute force vs improved approach

This is one of the most important habits to build early.

### Brute force usually means

- repeated scanning
- nested loops
- rebuilding information again and again

### Improved usually means

- storing information
- reusing earlier work
- reducing repeated checks

### Example

For simple search, the brute-force linear scan is often already the right
solution.

For duplicate detection, the improved solution usually uses a lookup structure.

## 6. What you should be able to say after studying this

You should be able to answer these clearly from memory:

1. When is linear scan the right first choice?
2. Why does a lookup structure help with duplicate detection?
3. What time/space tradeoff are you making?
4. What edge cases would you name before coding?

### Example answer shape

"Linear scan is the right first choice when the input is unsorted and I just
need to find whether a value exists or where it first appears. A lookup
structure helps when repeated checks would otherwise force nested loops. The
tradeoff is extra memory for fewer repeated scans."

## Quick recap

- Linear scan is the honest baseline for unsorted search.
- Lookup structures replace repeated searching with direct checks.
- Duplicate detection is a strong first lookup-structure problem.
- Edge cases are contract checks, not afterthoughts.
- You should always be able to explain brute force before defending the better pattern.

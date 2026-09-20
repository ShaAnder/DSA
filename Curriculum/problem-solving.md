# Problem-Solving Playbook (plain English)

Problem solving in DSA is not only about writing code.

It is about reducing confusion before code.

The point of a playbook is to stop guessing and give yourself a predictable
sequence whenever a problem feels messy.

## The five-step problem-solving routine

### 1. Understand the problem

Before writing code, make sure you actually understand the task.

Ask:

1. Can I restate the problem in my own words?
2. What are the inputs?
3. What is the expected output?
4. Are there edge cases or missing details?

#### Example

If the prompt says:

"Return `true` if an array contains duplicates."

You should be able to say:

- input: array
- output: boolean
- failure return: `false`
- edge cases: empty array, one-element array, duplicate late in the input

### 2. Explore examples

Examples make the problem more concrete.

They are useful because they reveal:

- the normal case
- tricky edge cases
- whether your interpretation is actually right

#### Example

For duplicate detection:

- `[1, 2, 3] -> false`
- `[1, 2, 2] -> true`
- `[] -> false`
- `[5] -> false`

### 3. Break the problem down

Write the steps in plain language before you try to code.

That helps because you separate the algorithm idea from the syntax pressure.

#### Example

```js
function charCount(str) {
	// create an object to hold counts
	// loop through the string
	// if the character is alphanumeric, add or increment it
	// ignore everything else
	// return the final object
}
```

Even before you code, the logic is already easier to inspect.

### 4. Solve a simpler version first

If the full problem feels too hard, solve a reduced version first.

This helps you keep momentum and avoid freezing on the hardest part.

#### Example

If you are building a character counter, you might first:

- ignore special characters
- ignore case sensitivity
- just count lowercase letters

Then once the smaller version works, you add the missing rules back in.

### 5. Review and refactor

Once the code works, do not stop immediately.

Review:

1. Does it match the contract?
2. Does it handle the examples and edge cases?
3. Can the time or space complexity improve?
4. Is the code easy to explain?

#### Example

If a duplicate-check solution uses nested loops, ask:

- can I store seen values instead?
- can I turn this from $O(n^2)$ to $O(n)$?

## The unknown-problem fallback

If the exact problem shape does not look familiar, do not guess the pattern immediately.

Instead, force the problem through this sequence.

### 1. Lock the contract first

Say exactly what the problem gives you and exactly what it wants back.

Ask:

1. What are the inputs?
2. What is the output shape?
3. Are we returning values, indices, counts, booleans, or paths?
4. What assumptions are already given?
5. Is the array sorted, is there always one solution, is in-place allowed?

This prevents solving a nearby problem instead of the real one.

### 2. Name the brute-force version

Even if it is slow, say the fully correct dumb version first.

That matters because it shows:

- you understand the problem
- what work is being repeated
- what the real bottleneck is

### 3. Ask what information must be remembered

This is the most useful step when the pattern is unclear.

Ask:

1. Have I seen this value before?
2. Do I need membership only?
3. Do I need counts?
4. Do I need the last seen index?
5. Do I need the smallest or largest seen so far?
6. Do I only care about a recent window of values?
7. Do I need to preserve original indices?
8. Does input order help me?

The answer usually points at the correct structure.

### 4. Match the memory need to the structure

Use this shortcut:

- seen before -> `Set`
- count frequency -> `Map`
- remember index -> `Map` from value to index
- recent range only -> sliding window with `Set` or `Map`
- sorted pair search -> two pointers
- repeated min or max extraction -> heap
- path or choice exploration -> recursion, DFS, BFS, or backtracking

Do not choose the structure by vibe. Choose it by the information you must keep.

### 5. Explain why brute force is wasteful

Say what repeated work the slow solution is doing.

Examples:

- checking the same pairs too many times
- recounting values repeatedly
- rescanning the array for information that could be stored once

Once you can name the wasted work, the optimization is usually easier to justify.

### 6. Test the idea on a tiny example before coding

Before you write code, run a tiny case by hand.

Ask:

1. What gets stored first?
2. What changes each iteration?
3. What condition causes the return?
4. What happens on the first and last useful iterations?

This catches a lot of contract and data-structure mistakes early.

## A reusable interview script for unknown problems

When you are under pressure, use this exact speaking order:

1. Let me restate the problem.
2. The brute-force version would be...
3. That repeats work because...
4. The key information I need to track is...
5. That suggests using a `Set`, `Map`, or window because...
6. Let me test that on a small example.
7. Now I will code it.
8. I will dry-run it and state the complexity.

This gives you a repeatable flow even when the exact question is unfamiliar.

## Quick memory-to-structure guide

If you are stuck, reduce the problem to one of these questions.

- Have I seen this before? -> `Set`
- How many times have I seen this? -> `Map` for counts
- Where did I see this? -> `Map` for index lookup
- Do I only care about the last `k` items? -> windowed `Set` or `Map`
- Am I shrinking or expanding a contiguous region? -> sliding window
- Is the data sorted and I need a pair or comparison from both sides? -> two pointers
- Do I need the next best or current smallest or largest repeatedly? -> heap
- Am I exploring combinations, branches, or paths? -> recursion / backtracking / graph traversal

## Why this routine matters

This routine helps you avoid two common mistakes:

1. jumping into code before understanding the contract
2. writing something that works once but is hard to explain or improve

### Example

If you skip the contract step, you can easily return the wrong shape, such as a
pair when the prompt asked for `true` or `false`.

## A full small example: `charCount`

```js
function charCount(str) {
	const result = {};

	for (const char of str.toLowerCase()) {
		if (!/[a-z0-9]/.test(char)) continue;
		result[char] = (result[char] || 0) + 1;
	}

	return result;
}
```

### How the playbook applies

1. Understand the problem
   input: string, output: frequency object
2. Explore examples
   `"aab!" -> { a: 2, b: 1 }`
3. Break it down
   loop, filter valid chars, count
4. Solve a simpler version first
   count letters before worrying about punctuation
5. Review and refactor
   confirm case-insensitivity and empty string behavior

## When to use this playbook

Use it when:

- the prompt feels vague
- you are under interview pressure
- you keep making contract mistakes
- you know syntax but not the algorithm shape yet

### Example

If a problem makes you want to guess the pattern immediately, stop and do the
input/output/example pass first.

## What to say out loud before coding

This is a good interview habit:

1. what the function receives
2. what it returns
3. the brute-force idea
4. the likely improved pattern

### Example

"This function receives an array and returns a boolean. Brute force would check
every pair. A better fit is a lookup structure because I can remember what I
have already seen."

## Quick recap

- Understand the problem before coding.
- Use examples to test your interpretation.
- Write plain-English steps before syntax.
- Solve a smaller version if needed.
- Review the contract, edge cases, and tradeoffs after it works.

## Fibonacci Sequence

The Fibonacci sequence is a common example of two-branch recursion.

The sequence starts like this:

- `0, 1, 1, 2, 3, 5, 8, 13, ...`

After the first two values, each new value is the sum of the two values before it.

Examples:

- `fib(0) = 0`
- `fib(1) = 1`
- `fib(2) = fib(1) + fib(0) = 1`
- `fib(3) = fib(2) + fib(1) = 2`
- `fib(4) = fib(3) + fib(2) = 3`

## What two-branch recursion means

In normal single-branch recursion, each call usually makes one smaller recursive call.

In two-branch recursion, each call makes two recursive calls.

That is what makes Fibonacci such a common example.

```js
function fib(n) {
	if (n <= 1) return n;
	return fib(n - 1) + fib(n - 2);
}
```

This is called two-branch recursion because each call splits into two smaller calls:

- `fib(n - 1)`
- `fib(n - 2)`

## Why Fibonacci is recursive

Fibonacci fits recursion well because it has both:

- clear base cases
- a smaller version of the same problem

The base cases are:

- `fib(0) = 0`
- `fib(1) = 1`

The recursive rule is:

- `fib(n) = fib(n - 1) + fib(n - 2)`

## What happens when it runs

If you call `fib(5)`, JavaScript starts breaking the problem into smaller pieces:

```js
fib(5)
= fib(4) + fib(3)
= (fib(3) + fib(2)) + (fib(2) + fib(1))
```

And those calls keep expanding until the base cases are reached.

One way to picture it is like a recursion tree:

```text
fib(5)
|- fib(4)
|  |- fib(3)
|  |  |- fib(2)
|  |  |- fib(1)
|  |- fib(2)
|- fib(3)
   |- fib(2)
   |- fib(1)
```

This is the key difference from one-branch recursion: the work spreads out into two recursive paths instead of one.

## Why the basic recursive Fibonacci is slow

The simple recursive Fibonacci solution is good for learning recursion, but it is not efficient.

The problem is repeated work.

For example, `fib(3)` gets calculated more than once inside `fib(5)`. The same thing happens with `fib(2)`, `fib(1)`, and other smaller calls.

So even though the code looks short, the number of calls grows very quickly.

That is why Fibonacci is such a good teaching example:

- it clearly shows two-branch recursion
- it also shows why recursive solutions can become expensive

## Iterative version

Fibonacci can also be written with a loop:

```js
function fibIterative(n) {
	if (n <= 1) return n;

	let prev = 0;
	let curr = 1;

	for (let i = 2; i <= n; i++) {
		const next = prev + curr;
		prev = curr;
		curr = next;
	}

	return curr;
}
```

This version is usually better for performance because it does not repeat the same work over and over.

## Useful note to remember

Fibonacci is a recursion example where one call branches into two smaller calls.

That makes it great for learning recursive structure, but it also makes the naive version slower than it first looks.

### Summing it up

- Fibonacci is a classic example of two-branch recursion.
- The base cases are usually `fib(0) = 0` and `fib(1) = 1`.
- The recursive rule is `fib(n) = fib(n - 1) + fib(n - 2)`.
- Each call branches into two smaller calls.
- The simple recursive version is useful for learning, but it repeats a lot of work.

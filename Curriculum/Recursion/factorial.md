## Factorial

Factorial is one of the most common first examples used to explain recursion.

The factorial of a number means multiplying that number by every whole number below it until you reach `1`.

Examples:

- `4! = 4 * 3 * 2 * 1 = 24`
- `3! = 3 * 2 * 1 = 6`
- `1! = 1`

In recursion, factorial is useful because it has both:

- a clear base case
- a smaller version of the same problem

## Recursive factorial

```js
function factorial(n) {
	if (n === 0) return 1;
	return n * factorial(n - 1);
}
```

Why this works:

- base case -> `factorial(0)` returns `1`
- recursive step -> `factorial(n)` becomes `n * factorial(n - 1)`

## What happens when it runs

If you call `factorial(4)`, JavaScript sees:

```js
factorial(4);
4 * factorial(3);
4 * (3 * factorial(2));
4 * (3 * (2 * factorial(1)));
4 * (3 * (2 * (1 * factorial(0))));
4 * (3 * (2 * (1 * 1)));
24;
```

The function goes down through smaller calls until it reaches the base case. Then the result bubbles back up through the earlier calls.

## Why the base case is `1`

We return `1` at the bottom because `1` is the multiplicative identity. Multiplying by `1` does not change the result.

That lets the recursion finish cleanly.

## Iterative version

Factorial can also be written with a loop:

```js
function factorialIterative(n) {
	let total = 1;

	for (let i = 2; i <= n; i++) {
		total *= i;
	}

	return total;
}
```

This is a good reminder that recursion is not always required. Factorial is just a clean example for learning how recursive calls build and return.

### Summing it up

- Factorial is a classic recursion example.
- `factorial(n)` means `n * factorial(n - 1)`.
- The base case is usually `factorial(0) = 1`.
- The recursive calls go down until the base case is reached, then the answer bubbles back up.

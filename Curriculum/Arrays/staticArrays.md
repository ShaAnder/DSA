## Static Arrays

Broadly, there are two common array models: a static array has a fixed size and usually occupies one contiguous block of memory, while a dynamic array can grow or shrink by allocating more space when needed.

## Reading And Writing To Memory (And Arrays)

Say we have this array:

```js
let myArr = [1, 3, 5];
```

In the simplified DSA memory model, it is stored as a contiguous block.

| Value   | 1   | 3   | 5   |
| ------- | --- | --- | --- |
| Address | 0   | 4   | 8   |

To read the first element, the low-level idea is that we read the value stored at the first address. In practice, we do not work with raw memory addresses directly in JavaScript. We use array indexing instead:

```js
let myArr = [1, 3, 5];

console.log(myArr[0]); // gives us 1
```

The idea behind this is: if we know the index, we can quickly get to the value. In Big O terms, indexed access is usually described as $O(1)$, or constant time.

This comes from the idea of random access memory. RAM lets the machine access a memory location directly instead of scanning through everything first.

## The Array Index

Arrays have indexes that let us access stored values. Some beginner-friendly rules to remember are:

- arrays are zero-indexed, so counting starts at `0`
- the last valid index is usually `arr.length - 1`
- indexes are what we use to read or update a specific position in the array

We also do not need to access just one index at a time. We can loop through the whole array.

```js
let myArr = [1, 3, 5, 7];

for (let i = 0; i < myArr.length; i++) {
	// do something
}
```

This loop moves through the array one index at a time. On each pass, `i` points to a position in the array, and you can read or update the value at that position.

## Static Arrays In JS

In JavaScript, we usually work with dynamic-array behavior rather than true low-level static arrays. That means JavaScript arrays can grow and shrink for us behind the scenes.

It is still useful to understand static arrays, because they help explain the memory tradeoff.

With a static array, the size is fixed ahead of time. That means we cannot just keep adding new values whenever we want.

For example, imagine this array was truly static:

```js
let myArr = [1, 3, 5];
myArr.push(7);
```

| Value   | 1   | 3   | 5   | ?   |
| ------- | --- | --- | --- | --- |
| Address | 0   | 4   | 8   | ?   |

The important idea is that the array was only given space for three values. If there is no reserved space after it, the array cannot simply grow in place.

Removing values can also be awkward in a static array. The array size itself does not shrink automatically, so removing something usually means shifting or overwriting values rather than making the structure smaller.

## Big O of arrays

We already know that reading by index is usually $O(1)$. Writing to an existing index is also usually $O(1)$ because we already know exactly where the value belongs.

Other operations are more expensive because values may need to be shifted around.

| Operation              | Arrays |
| ---------------------- | ------ |
| Access by index / key  | $O(1)$ |
| Add/remove at end      | $O(1)$ |
| Add/remove rest of arr | $O(n)$ |
| Search                 | $O(n)$ |

Adding at the end is often treated as $O(1)$ because we usually know where the next open position should be.

Adding or removing near the start is usually $O(n)$ because many values may need to move to a new index.

```js
let myArr = [1, 3, 5];
myArr.unshift(7);
```

This places `7` at the start of the array, so the existing values need to shift to the right.

Searching is also usually $O(n)$ because if we do not know the index ahead of time, we may need to scan through the array one value at a time.

```js
let myArr = [1, 3, 5, 7, 9]; // 7 is in the array but assume we don't know that
let val = 7;

function exists(arr, val) {
	if (arr.length < 1) return null;

	for (let i = 0; i < arr.length; i++) {
		if (arr[i] === val) {
			return true;
		}
	}
	return false;
}

exists(myArr, val); // this is a linear scan
```

This shifting issue is one reason arrays become more expensive when we insert or remove values near the front.

### Summing it up

- A static array has a fixed size.
- In the simplified DSA model, its elements sit next to each other in memory.
- Because the values are stored in order, indexing into an array is usually treated as fast direct access.
- In JavaScript, we work with indexes rather than raw memory addresses.

## Dynamic Arrays

A dynamic array is an array structure that can grow or shrink as needed. It still gives us index-based access, but it is designed to handle changes in size more easily than a static array.

## Dynamic Arrays In Memory

Say we start with this array:

```js
let myArr = [1, 3, 5];
```

In the simplified DSA model, the values still sit next to each other in memory.

| Value   | 1   | 3   | 5   |
| ------- | --- | --- | --- |
| Address | 0   | 4   | 8   |

The big difference is that a dynamic array is allowed to grow.

If there is extra room after the current values, a new item can be placed at the next open position.

```js
let myArr = [1, 3, 5];
myArr.push(7);
```

| Value   | 1   | 3   | 5   | 7   |
| ------- | --- | --- | --- | --- |
| Address | 40  | 44  | 48  | 52  |

If there is no room left, the dynamic array may need to allocate a larger block of memory, copy the old values over, add the new value, and then discard the old block.

That is the tradeoff: dynamic arrays are flexible, but growth can sometimes require extra work behind the scenes.

One common strategy is to double the array's capacity when it runs out of room. That way, the expensive resize does not happen on every append.

## Small note on power series

If the capacity grows like `1, 2, 4, 8, 16, ...`, that is a doubling pattern. The high-level math idea behind this is a geometric series, which is often grouped under power-series style growth discussions.

The important idea for dynamic arrays is simple: even though a resize is expensive when it happens, doubling means it happens less and less often relative to the number of cheap appends. That is why appending to a dynamic array is usually treated as amortized $O(1)$.

## Dynamic Arrays In JavaScript

JavaScript arrays behave much more like dynamic arrays than static arrays.

That means you can do things like this:

```js
let myArr = [1, 3, 5];

myArr.push(7);
myArr.push(9);
```

You do not manually resize the array yourself. JavaScript handles that for you behind the scenes.

For day-to-day coding, the main practical idea is simple:

- arrays keep values in order
- arrays let you access values by index
- arrays can grow and shrink as needed

## Big O of dynamic arrays

Dynamic arrays still keep the main array strengths:

| Operation             | Arrays |
| --------------------- | ------ |
| Access by index / key | $O(1)$ |
| Add/remove at end     | $O(1)$ |
| Add/remove near start | $O(n)$ |
| Search                | $O(n)$ |

Reading by index is still usually $O(1)$ because we can jump straight to the position we want.

Adding at the end with `push` is usually treated as $O(1)$ as well. Most of the time, the array can place the new value at the next open spot.

Sometimes an append takes more work because the array has to resize and copy values into a larger memory block. That is why dynamic arrays are often described as having amortized $O(1)$ append time.

Adding or removing near the start is still usually $O(n)$ because the other values need to shift.

```js
let myArr = [1, 3, 5];
myArr.unshift(7);
```

This places `7` at the start, so the existing values need to move to new indexes.

Searching is also usually $O(n)$ when we do not know the index ahead of time.

```js
let myArr = [1, 3, 5, 7, 9];
let val = 7;

function exists(arr, val) {
	for (let i = 0; i < arr.length; i++) {
		if (arr[i] === val) {
			return true;
		}
	}

	return false;
}

exists(myArr, val); // this is a linear scan
```

## Why dynamic arrays matter

Dynamic arrays are useful because they give us a good balance:

- fast index access
- convenient appends at the end
- flexible resizing when we need more space

That is why they are such a common default structure in higher-level languages.

### Summing it up

- A dynamic array can grow or shrink as needed.
- In the simplified DSA model, its values are still stored in order and treated like contiguous memory.
- If the array runs out of room, it may need to allocate a larger memory block and copy values over.
- Access by index is usually $O(1)$, while inserts or removals near the front are usually $O(n)$.
- JavaScript arrays mostly behave like dynamic arrays in everyday coding.

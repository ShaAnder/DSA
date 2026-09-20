## What even is a data structure

A data structure is a way of organizing data in memory so it can be stored, accessed, and updated efficiently.

RAM is the computer's short-term working memory. It is where values, variables, and program data live while your code is running.

For early DSA learning, arrays are usually the easiest starting point.

```js
let arr = [1, 3, 4];
```

Memory is measured in bytes. One byte is made up of 8 bits, and each bit can hold either a `0` or a `1`.

Simple picture:

`bit -> byte -> memory -> variables / values / program data`

## So how do we store data in ram

Data takes up different amounts of memory depending on the value type and the system being used.

For a simple DSA memory model, it is common to imagine:

- an integer often using 4 bytes = 32 bits
- an ASCII character using 1 byte = 8 bits

This is a useful teaching model, even though real languages and engines can store values differently.

Memory can be pictured as a long line of storage locations. Each stored value has:

- a value: the data itself
- an address: where that data lives in memory

In low-level DSA explanations, arrays are modeled as contiguous memory. That means the elements are placed side by side in neighboring memory locations.

Using the above array example again:

```js
let arr = [1, 3, 4];
```

If we use the simplified model where each integer takes 4 bytes, the values could be pictured like this:

1 = 00000000 00000000 00000000 00000001
3 = 00000000 00000000 00000000 00000011
4 = 00000000 00000000 00000000 00000100

Because each value takes 4 bytes, the addresses increase by 4 each time.

They would sit side by side in memory:

| previous data | 1   | 3   | 4   | more data |
| ------------- | --- | --- | --- | --------- |
| addresses     | 0   | 4   | 8   | 12        |

This is why arrays are often explained as being good for direct index access.
If you know the starting address and the size of each item, you can jump straight to a position.

## Bits, bytes, and values

If we zoom in further:

- `1` in 8-bit form is `00000001`
- `3` in 8-bit form is `00000011`
- `4` in 8-bit form is `00000100`

If we used the smaller 8-bit teaching model just to see the bit pattern clearly, the sequence would look like this:

`00000001 00000011 00000100`

That is only for illustration. In many memory explanations, integers are shown as 4-byte values instead.

## Integers vs Ascii

An integer often uses more bytes than an ASCII character because it needs a much larger range of possible values.

- 1 byte = 8 bits = $2^8 = 256$ possible bit patterns
- 4 bytes = 32 bits = $2^{32}$ possible bit patterns

That larger bit space is what allows integer types to represent much bigger numbers.

An ASCII character needs much less space because it only needs to represent a limited set of symbols.

Examples:

- `a` -> typically 1 byte in ASCII
- `1` -> could be stored in a 4-byte integer type in a simplified DSA model
- `2000000000` can still fit in a signed 32-bit integer because it is below `2147483647`
- `10544302323500` would not fit in a 32-bit integer, so it would need a larger numeric type

So the key idea is not that all numbers always need 4 bytes. The key idea is that numeric types are usually given more space because they often need a larger range than characters do.

## Useful note to remember

An array is an ordered collection of elements accessed by index. In low-level DSA terms, arrays are modeled as contiguous memory. In JavaScript, the most practical idea is that values are kept in order and retrieved by index.

### Summing it up

- RAM is where program data lives while your code is running.
- Memory is measured in bytes, and each byte is made of 8 bits.
- In a simplified DSA model, arrays are stored as contiguous values in memory.
- Because array elements are stored side by side, indexing is fast and is usually explained as direct access.
- In JavaScript, the safest practical idea is still: arrays keep values in order and let you retrieve them by index.

# Hash Implementation (plain English)

This note is about how hash maps work under the hood.

In most interviews, you are more likely to use a hash map than to implement one
from scratch.

Still, understanding the implementation helps with:

- collision reasoning
- time and space tradeoffs
- systems intuition
- explaining why hash-based lookup is fast on average instead of magically fast always

## 1. Core mental model

A hash map is usually backed by an array.

The challenge is that keys like strings are not array indexes by themselves.

So we use a hash function to convert a key into an integer index.

Example key-value pairs:

```js
hashmap["Alice"] = "NYC";
hashmap["Brad"] = "Chicago";
hashmap["Collin"] = "Seattle";
```

To place these in an array efficiently, we need a repeatable way to map each key to an index.

## 2. What a hash function does

A hash function takes a key and turns it into an integer.

That integer is then converted into a valid array position.

The same key must always produce the same result.

### Simple example idea

One toy approach is:

1. take each character in the string
2. get each character's ASCII code
3. sum those codes
4. use modulo with the array size

Formula:

$$
\\text{index} = \\text{sum of ASCII codes} \\bmod \\text{array capacity}
$$

If `"Alice"` hashes to `25` and the array size is `2`, then:

$$
25 \bmod 2 = 1
$$

So the pair would be placed at index `1`.

### What to notice

- the raw hash can be large
- modulo keeps it inside the array bounds
- small arrays increase collision risk

## 3. Collision

A collision happens when two different keys map to the same index.

Collisions are normal.

They are not a sign that hashing is broken.

They are the reason collision-handling strategies exist.

Example:

- `"Alice"` lands at index `1`
- `"Collin"` also lands at index `1`

Now both want the same slot.

## 4. Why resizing happens

As the map fills up, collisions become more common.

To reduce that pressure, the backing array is resized.

A common approach is to double the capacity once the table becomes too full.

In this material, the resize trigger is when the table becomes half full.

### Why resize before the table is completely full

If you wait too long, collisions become more frequent and the average behavior
gets worse.

Resizing earlier helps preserve fast average-case operations.

## 5. Rehashing

After resizing, you cannot just copy the old entries to the same indexes.

Why?

Because the index formula depends on the array capacity.

If the capacity changes, the modulo result can change too.

That means every existing key must be inserted again using the new capacity.

This process is called rehashing.

### Example idea

If `"Brad"` hashes to `27`:

- with capacity `4`, `27 % 4 = 3`
- with capacity `8`, `27 % 8 = 3` in this case, but that will not always stay the same for every key

The important point is not the specific number.

The important point is that capacity changes can change positions, so all stored keys must be reprocessed.

## 6. Two common collision strategies

### Chaining

Chaining stores multiple key-value pairs at the same array index by attaching a linked structure there.

You can think of one array slot holding a linked list of pairs.

### When chaining is useful

- simpler mental model
- simpler implementation than many open-addressing variants
- standard practical choice when collisions are expected

### Cost

- average-case operations can still be close to $O(1)$
- worst case can degrade toward $O(n)$ if too many keys cluster together

### Open addressing

Open addressing tries to find another open slot in the array instead of storing
multiple items in one index.

One simple version is linear probing:

- if index `1` is full, try `2`
- if `2` is full, try `3`
- keep going until an empty slot is found

### Tradeoff

- can be efficient when collisions stay low
- is usually trickier to implement correctly
- is more sensitive to table fullness

## 7. Prime capacities

It is common to choose prime-number capacities for hash tables.

The goal is to reduce bad clustering patterns and spread values more evenly.

You do not need the full proof for most interviews.

What matters is the intuition:

- capacity choice affects collision behavior
- prime capacities are one common way to improve distribution

## 8. Simple code walkthrough with open addressing

This section shows a simplified open-addressing implementation.

The main point is to understand the moving parts, not to memorize every line.

### Pair class

```js
class Pair {
	constructor(key, val) {
		this.key = key;
		this.val = val;
	}
}
```

### Hash map constructor

```js
class HashMap {
	constructor() {
		this.size = 0;
		this.capacity = 2;
		this.map = new Array(this.capacity).fill(null);
	}
}
```

Here:

- `size` is the number of stored key-value pairs
- `capacity` is the size of the backing array

### Hash function

```js
hash(key) {
    let index = 0;

    for (let i = 0; i < key.length; i++) {
        index += key.charCodeAt(i);
    }

    return index % this.capacity;
}
```

This is a simple teaching version, not a production-grade hash function.

### Lookup

```js
get(key) {
    let index = this.hash(key);

    while (this.map[index] != null) {
        if (this.map[index].key == key) {
            return this.map[index].val;
        }

        index += 1;
        index = index % this.capacity;
    }

    return null;
}
```

If the original slot is occupied by some other key, open addressing keeps moving
forward until it either finds the key or reaches an empty position.

### Insert

```js
put(key, val) {
    let index = this.hash(key);

    while (true) {
        if (this.map[index] == null) {
            this.map[index] = new Pair(key, val);
            this.size += 1;

            if (this.size >= this.capacity / 2) {
                this.rehash();
            }

            return;
        } else if (this.map[index].key == key) {
            this.map[index].val = val;
            return;
        }

        index += 1;
        index = index % this.capacity;
    }
}
```

Three cases matter here:

- the slot is empty
- the slot already holds the same key
- the slot is occupied by another key, so probing continues

### Remove

```js
remove(key) {
    if (this.get(key) == null) {
        return;
    }

    let index = this.hash(key);

    while (true) {
        if (this.map[index].key == key) {
            this.map[index] = null;
            this.size -= 1;
            return;
        }

        index += 1;
        index = index % this.capacity;
    }
}
```

### Important warning

This simplified remove logic causes a real problem with open addressing.

If you delete by setting a slot to `null`, you can create a hole that causes
future lookups to stop too early.

That is why deletion in open-addressing tables is more subtle than it first
appears.

### Rehash

```js
rehash() {
    this.capacity = 2 * this.capacity;
    const newMap = new Array(this.capacity).fill(null);
    const oldMap = this.map;

    this.map = newMap;
    this.size = 0;

    for (let i = 0; i < oldMap.length; i++) {
        if (oldMap[i]) {
            this.put(oldMap[i].key, oldMap[i].val);
        }
    }
}
```

This doubles the array size and reinserts all pairs using the new capacity.

### Print helper

```js
print() {
    for (let i = 0; i < this.map.length; i++) {
        if (this.map[i]) {
            console.log(this.map[i].key + " " + this.map[i].val);
        }
    }
}
```

## 9. Cost summary

| Operation | HashMap average case |
| --------- | -------------------- |
| Insert    | $O(1)$               |
| Remove    | $O(1)$               |
| Search    | $O(1)$               |

### Important accuracy note

Those are average-case costs.

They depend on:

- a decent hash function
- a manageable number of collisions
- sensible resize behavior

Worst case can still degrade toward $O(n)$.

## 10. What you should be able to say after studying this

You should be able to answer these clearly:

1. Why does a hash map need a hash function?
2. Why does modulo matter?
3. What is a collision?
4. Why does resizing force rehashing?
5. What is the difference between chaining and open addressing?
6. Why is hash-map performance usually described as average-case $O(1)$?

## Quick recap

- Hash maps usually store data in an array under the hood.
- A hash function maps a key to an integer index.
- Collisions are normal and must be handled deliberately.
- Resizing reduces collision pressure, but resizing also forces rehashing.
- Chaining and open addressing are the two common collision strategies.
- Hash-map operations are fast on average, not guaranteed constant in every case.

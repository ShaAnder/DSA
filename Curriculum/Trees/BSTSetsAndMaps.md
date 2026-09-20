## BST Sets And Maps

This note is about how tree-based sets and maps work.

The main idea is that sets and maps are interfaces.

They are not tied to one single implementation.

You can build them using hashing, or you can build them using ordered trees.

When they are built using a binary search tree style structure, they are often
called `TreeSet` and `TreeMap`.

## What a set is

A `set` stores unique values.

The main point of a set is usually:

- membership
- uniqueness

Example idea:

```js
{
	("Alice", "Brad", "Collin");
}
```

If you try to insert the same value twice, the set still keeps only one copy.

## What a map is

A `map` stores key-value pairs.

Example idea:

```js
{
	Alice: 123,
	Brad: 345,
	Collin: 678,
}
```

The key is what you search by.

The value is the information attached to that key.

The value does not have to be a number.

It could be:

- a string
- an object
- another structure
- almost any data type

The important part is that the keys must be comparable if the structure is kept
ordered in a tree.

## Why trees matter here

If you implement a set or map using a binary search tree, you get ordered
storage.

That means:

- values or keys stay sorted by the tree ordering rule
- insert, remove, and search can be efficient if the tree stays balanced

This is why people talk about `TreeSet` and `TreeMap`.

## TreeSet

A `TreeSet` is a set backed by an ordered tree.

That means:

- values stay unique
- values stay ordered

So if you stored names like this:

```text
Alice, Brad, Collin
```

the structure would keep them in sorted order according to the comparison rule.

This is different from a hash set, which usually cares more about fast average
lookup than sorted order.

## TreeMap

A `TreeMap` is a map backed by an ordered tree.

That means:

- keys are stored in sorted order
- each key maps to a value

Example:

```js
{
	Alice: 123,
	Brad: 345,
	Collin: 678,
}
```

If implemented as a tree map, those entries are ordered by key, not by value.

## Why use a tree-based map or set

The main reason is order.

Tree-based structures are useful when you care about:

- sorted traversal
- finding the next larger or smaller key
- range-style queries
- keeping data ordered while still supporting updates

If order matters, a tree-based structure can be better than a hash-based one.

## Time complexity

If the tree is balanced, the common operations are usually:

- Insert: $O(\log n)$
- Remove: $O(\log n)$
- Search: $O(\log n)$

That is because the structure uses BST-style ordering logic.

If the tree becomes skewed, the worst case can degrade toward $O(n)$.

## Tree-based structures vs hash-based structures

This tradeoff matters.

### Tree-based set or map

- keeps keys ordered
- supports sorted traversal naturally
- operations are usually $O(\log n)$ when balanced

### Hash-based set or map

- usually does not keep sorted order
- operations are often treated as $O(1)$ average case
- better when you care more about raw lookup speed than order

So the question is not “which one is always better?”

The question is whether you need ordering enough to justify the slower updates.

## Language note

Some languages include tree-based map or set structures directly.

Examples:

- Java has `TreeMap`
- Java has `TreeSet`
- C++ has ordered `map` and `set`

In Python and JavaScript, tree-based ordered maps or sets often require a
library or a custom implementation.

For interview prep, the main thing to understand is the concept and the
tradeoff, not the exact library API.

## Common mistakes

### Mistake 1: thinking sets and maps are only hash-based

They are interfaces.

They can be implemented in multiple ways.

### Mistake 2: assuming tree-based maps are chosen for raw speed alone

The stronger reason is usually ordered behavior, not just lookup.

### Mistake 3: forgetting that tree-based performance depends on balance

If the tree shape degrades badly, the performance can too.

## What you should be able to say after studying this

You should be able to answer these clearly:

1. What is the difference between a set and a map?
2. What makes a `TreeSet` different from a hash set?
3. What makes a `TreeMap` different from a hash map?
4. Why would someone choose a tree-based map over a hash-based one?
5. Why are the operations usually $O(\log n)$ instead of $O(1)$?

### Summing it up

- Sets store unique values.
- Maps store key-value pairs.
- Tree-based sets and maps keep values or keys ordered.
- Their common operations are usually $O(\log n)$ when balanced.
- They trade some speed for ordered behavior compared with hash-based structures.

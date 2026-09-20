# Hash Sets and Hash Maps (plain English)

This note is about how to use hash-based structures in interview problems.

The main goal is not to memorize implementation details first.

The main goal is to recognize when hashing gives you a cheaper way to store and
check information you have already seen.

## 1. The two main hash-based structures

### Hash map

A hash map stores key-value pairs.

Example:

```js
{
	A: 1,
	B: 2,
}
```

This is similar to using an object or `Map` in JavaScript.

### Hash set

A hash set stores values only.

The main point is membership, not key-value mapping.

It also keeps values unique.

Example idea:

```js
new Set([1, 2, 3, 4]);
```

## 2. Why focus on maps first

Maps are the more general structure.

If you understand how a map helps with counting, lookup, and tracking seen
values, most of that reasoning transfers easily to sets.

The difference is just this:

- a map stores `key -> value`
- a set stores just the value itself

## 3. Hash map vs tree map

Tree maps and hash maps are both used for insert, remove, and search, but they
optimize different things.

| Operation                   | TreeMap                                           | HashMap                             |
| --------------------------- | ------------------------------------------------- | ----------------------------------- |
| Insert                      | $O(\log n)$                                       | $O(1)$ average                      |
| Remove                      | $O(\log n)$                                       | $O(1)$ average                      |
| Search                      | $O(\log n)$                                       | $O(1)$ average                      |
| Sorting / ordered traversal | $O(n)$ if already stored in order-aware structure | usually needs separate sorting work |

### What to notice

- hash maps are usually treated as $O(1)$ for insert, remove, and search
- that is average case, not guaranteed worst case
- in bad collision cases, hash maps can degrade toward $O(n)$
- tree maps are slower for basic operations, but they maintain order better

### Tradeoff

Use a hash map when you care more about fast lookup than maintaining sorted order.

Use a tree-based structure when order matters enough to justify slower updates.

## 4. When hash maps fit

Hash maps fit well when the real problem is one of these:

- counting frequency
- storing information about what you have seen
- checking membership repeatedly
- looking up a value by key quickly

### Common interview signal

If your brute-force idea keeps rescanning earlier values, a hash map may be the better structure.

## 5. Example: frequency counting

A common use case is counting how many times something appears.

Example prompt:

Count the frequency of names in this array:

```js
["alice", "brad", "collin", "brad", "dylan", "kim"];
```

The resulting map would look like this:

```js
{
	alice: 1,
	brad: 2,
	collin: 1,
	dylan: 1,
	kim: 1,
}
```

### Why hashing helps here

Without a map, you would often need repeated scans to count occurrences.

With a map, each value can update its count directly.

That turns the problem into one pass with quick updates.

## 6. Important caveats

### Hash maps do not keep sorted order

That means if you later want ordered output, you may need extra work such as sorting.

### Hash maps do not store duplicate keys

If the same key appears again, you update the value for that key instead of creating a second copy of the key.

That is why they work well for counts.

### Sets also do not keep duplicates

Sets are useful when the question is only:

- have I seen this before?
- is this value present?

and not:

- how many times have I seen it?

## 7. Cost of building a frequency map

If you loop through an array of length $n$ once and update a hash map as you go:

- Time: $O(n)$ average
- Space: $O(n)$ in the worst case

That is usually better than repeatedly searching through earlier values.

## 8. What you should be able to say after studying this

You should be able to answer these clearly:

1. What is the difference between a map and a set?
2. Why is hash map lookup usually treated as $O(1)$?
3. Why is that average-case language important?
4. When does a frequency-counting problem point toward a hash map?
5. What tradeoff are you making when you choose hashing?

## Quick recap

- Hash maps store key-value pairs.
- Hash sets store unique values only.
- Hash maps are strong when you need counting, lookup, or seen-state tracking.
- Their fast lookup is average-case, not magical worst-case behavior.
- They trade extra memory and unordered storage for much cheaper repeated checks.

## Doubly Linked Lists

A doubly linked list is a linked list where each node stores:

- a value
- a reference to the next node
- a reference to the previous node

The word `doubly` means each node can connect in two directions: forward and backward.

## How a doubly linked list works

Like a singly linked list, a doubly linked list is made of connected nodes rather than indexed positions.

The difference is that each node knows about both of its neighbors, not just the next one.

So the mental model looks like this:

```js
null <- [1] <-> [3] <-> [5] -> null
```

That means:

- `1` points forward to `3`
- `3` points backward to `1` and forward to `5`
- `5` points backward to `3`

This makes it possible to move through the list in both directions.

## Nodes, head, tail, next, and prev

Some basic doubly linked list terms are:

- `node` -> one item in the list
- `head` -> the first node
- `tail` -> the last node
- `next` -> the reference to the next node
- `prev` -> the reference to the previous node

If the list is:

```js
null <- [10] <-> [20] <-> [30] -> null
```

Then:

- the `head` stores `10`
- the middle node stores `20`
- the `tail` stores `30`
- the `head.prev` is `null`
- the `tail.next` is `null`

## Doubly Linked Lists In Memory

Just like singly linked lists, doubly linked lists are not usually stored as one contiguous block of memory.

The nodes can live in different memory locations, and the structure stays connected through references.

The difference is that each node stores one extra reference.

That gives us more flexibility when moving backward or removing a node, but it also means each node uses more memory than a singly linked list node.

## Doubly Linked Lists In JavaScript

JavaScript does not have a built-in doubly linked list type, so for DSA practice we usually model each node as an object.

```js
const node1 = { value: 1, next: null, prev: null };
const node2 = { value: 3, next: null, prev: null };
const node3 = { value: 5, next: null, prev: null };

node1.next = node2;
node2.prev = node1;
node2.next = node3;
node3.prev = node2;
```

This gives us the structure:

```js
null <- node1 <-> node2 <-> node3 -> null
```

If we want to loop forward through the list, we still start at the `head` and follow `next`.

```js
let current = node1;

while (current !== null) {
	console.log(current.value);
	current = current.next;
}
```

If we want to loop backward, we can start at the `tail` and follow `prev`.

```js
let current = node3;

while (current !== null) {
	console.log(current.value);
	current = current.prev;
}
```

This is the main practical difference from a singly linked list: backward traversal is built into the structure.

We can also add or remove nodes by updating both `next` and `prev`.

Example: insert a new node between `node1` and `node2`.

```js
const newNode = { value: 2, next: null, prev: null };

newNode.prev = node1;
newNode.next = node2;
node1.next = newNode;
node2.prev = newNode;
```

Now the list becomes:

```js
null <- node1 <-> newNode <-> node2 <-> node3 -> null
```

Example: remove `node2` from the list.

```js
node2.prev.next = node2.next;
node2.next.prev = node2.prev;
```

That reconnects the nodes on both sides of `node2` so the list skips over it.

## Access and traversal

Like singly linked lists, doubly linked lists are not good for direct index access.

If we want a specific position, we still have to traverse node by node.

The improvement is that we can move in either direction:

- forward with `next`
- backward with `prev`

That can make some operations cleaner, especially when we already have a reference to a node and want to remove it.

## Big O of doubly linked lists

The common operations are usually described like this:

| Operation              | Doubly Linked List |
| ---------------------- | ------------------ |
| Access by index        | $O(n)$             |
| Search                 | $O(n)$             |
| Insert/remove at front | $O(1)$             |
| Insert/remove at end   | $O(1)$             |

Access by index is still usually $O(n)$ because we still have to traverse.

Search is also usually $O(n)$ for the same reason.

Insert or remove at the front is usually $O(1)$.

Insert or remove at the end is also usually $O(1)$ when we keep track of the `tail`.

One practical advantage over singly linked lists is that removing a known node is often easier because we can update both neighboring references directly.

## Why doubly linked lists matter

Doubly linked lists are useful when:

- you want to move in both directions
- you want easier removal of known nodes
- you are modeling previous/next style navigation

Common examples include:

- browser back and forward navigation
- music or media playlists
- undo and redo history
- caches and more advanced data structures

## Useful note to remember

Singly linked lists move one way.
Doubly linked lists move both ways.

That extra backward link gives more flexibility, but it costs extra memory.

As well as this doubly linked lists meet the same conditions for a stack that an array does it is however less common because we can't just arbitrarily access whatever elements we want it's always O(n)

### Summing it up

- A doubly linked list is made of nodes with `value`, `next`, and `prev`.
- It can be traversed forward and backward.
- It is not usually stored as one contiguous block of memory.
- Access and search are usually $O(n)$.
- Inserts and removals at the ends are usually $O(1)$ when `head` and `tail` are tracked.
- The tradeoff is extra flexibility in exchange for extra memory per node.

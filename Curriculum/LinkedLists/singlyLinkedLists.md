## Singly Linked Lists

A singly linked list is a data structure made of nodes, where each node stores:

- a value
- a reference to the next node

The word `singly` means each node only points in one direction: forward.

## How a singly linked list works

Unlike an array, a linked list does not rely on contiguous memory.

Instead, each node can live in a different place in memory, and the list stays connected because each node knows where the next one is.

It helps to be very clear here: a linked list is not an array of nodes. An array is an indexed collection. A linked list is a chain of connected nodes.

So the mental model is different:

- array -> values stored by position and accessed by index
- linked list -> nodes connected by references and accessed by following `next`

You usually start with the `head`, which is the first node in the list.

Example idea:

```js
head -> [1 | next] -> [3 | next] -> [5 | null]
```

That last `null` means the list has ended.

## Nodes, head, and tail

Some basic linked-list terms to remember are:

- `node` -> one item in the list
- `head` -> the first node
- `tail` -> the last node
- `next` -> the reference to the next node

If the list is:

```js
head -> [10] -> [20] -> [30] -> null
```

Then:

- the `head` stores `10`
- the second node stores `20`
- the `tail` stores `30`
- the `tail.next` is `null`

## Singly Linked Lists In Memory

This is one of the biggest differences from arrays.

Arrays are usually explained as contiguous values in memory.
Singly linked lists are not.

That means the nodes can be scattered in different memory locations, like this simplified picture:

```js
head -> [1 | 900]    [3 | 400]    [5 | null]
```

The exact addresses do not matter for learning right now. The important idea is that each node stores the information needed to find the next node.

Because of that, linked lists are flexible when inserting or removing near the front, but they are worse than arrays for direct index access.

## Singly Linked Lists In JavaScript

JavaScript does not have a built-in linked list type like it has arrays.

For DSA practice, we usually model a node as an object.

```js
const node1 = { value: 1, next: null };
const node2 = { value: 3, next: null };
const node3 = { value: 5, next: null };

node1.next = node2;
node2.next = node3;
```

This gives us the structure:

```js
node1 -> node2 -> node3 -> null
```

If we want to loop through the linked list, we usually start at the head and keep moving to `next` until we reach `null`.

```js
const node1 = { value: 1, next: null };
const node2 = { value: 3, next: null };
const node3 = { value: 5, next: null };

node1.next = node2;
node2.next = node3;

let current = node1;

while (current !== null) {
	console.log(current.value);
	current = current.next;
}
```

This prints:

```js
1;
3;
5;
```

The important idea is that we are not using indexes like an array. We are moving from node to node by following the `next` reference.

We can also add or remove nodes by changing references.

Example: insert a new node after `node1`.

```js
const newNode = { value: 2, next: null };

newNode.next = node1.next;
node1.next = newNode;
```

Now the list becomes:

```js
node1 -> newNode -> node2 -> node3 -> null
```

Example: remove the node after `node1`.

```js
node1.next = node1.next.next;
```

That skips over the current next node and links `node1` directly to the node after it.

For beginner DSA work, the most important thing is understanding the shape of the structure, not memorizing a full class implementation yet.

## Access and traversal

With arrays, we can jump to an index directly.

With a singly linked list, we cannot jump straight to the middle because each node only knows about the next node.

That means if we want the third value, we must start at the `head` and move node by node until we reach it.

This step-by-step movement is called traversal. (we may also know this as node traversal in js)

```js
head -> [1] -> [3] -> [5] -> null
```

To reach `5`, we must first pass through `1`, then `3`.

## Big O of singly linked lists

The common operations are usually described like this:

| Operation              | Singly Linked List |
| ---------------------- | ------------------ |
| Access by index        | $O(n)$             |
| Search                 | $O(n)$             |
| Insert/remove at front | $O(1)$             |
| Insert/remove at end   | $O(1)$ or $O(n)$   |

Access by index is usually $O(n)$ because we may have to walk through many nodes.

Search is also usually $O(n)$ for the same reason.

Insert or remove at the front is usually $O(1)$ because we only need to change a small number of references.

Insert at the end can be $O(1)$ if we keep track of the `tail`, but it can be $O(n)$ if we have to traverse the whole list to reach the last node first.

## Why singly linked lists matter

Singly linked lists are useful for understanding:

- pointer-style thinking
- traversal
- how structure choice changes tradeoffs

They are a good contrast to arrays:

- arrays are strong at direct indexed access
- linked lists are strong at simple inserts or removals near the front

## Common coding examples

In day-to-day JavaScript or frontend work, you usually will not build your own
linked list often.

Arrays are more common.

But linked-list thinking still shows up in real coding in a few places.

### Queue-style pipelines

If data is processed one item after another, and you mostly care about adding to
one side and removing from the other, linked-list structure can be a natural
fit.

This idea shows up in:

- job queues
- message processing pipelines
- request buffering

In production code, you might use a library or built-in abstraction instead of
writing the linked list yourself, but the structure underneath can still be
linked-list-like.

### Hash table collision chains

One classic data-structure example is separate chaining in a hash table.

If multiple keys land in the same bucket, that bucket can store its values as a
linked list.

That means linked lists show up inside a larger structure, even when the main
thing you think you are using is a hash map.

### Graph or tree traversal helpers

Sometimes a traversal algorithm needs a queue.

A queue can be implemented using a linked list.

So even if the actual problem is about trees or graphs, the supporting structure
may rely on linked-list-style node connections.

### Simple streaming data models

If you only ever move forward through data and do not need random access,
singly linked list style can make sense.

Example idea:

- process one event
- move to the next event
- process the next one

That is much closer to linked-list traversal than array indexing.

### Interview problems that model real coding habits

Even when linked lists are not extremely common in product code, they are still
used in interviews because they reveal whether you can:

- manage references safely
- update structure without losing data
- think step by step instead of by index

That is why problems like `Reverse Linked List` and `Merge Two Sorted Lists`
matter so much.

## Examples you are more likely to recognize in normal software

If you want the most familiar real-world comparisons, think about:

- a music playlist that moves song to song
- a chain of queued tasks waiting to be processed
- buckets inside a hash-table implementation
- internal queue implementations used by other systems

## Example problem shapes

Just like the graph notes use problems such as `Number of Islands` to show how
the structure gets used, linked lists also make more sense when you see the
common question shapes.

### Example problem shape: Reverse Linked List

This is one of the most common linked-list interview questions.

The goal is to reverse:

```text
1 -> 2 -> 3 -> null
```

into:

```text
3 -> 2 -> 1 -> null
```

The core idea is that you walk through the list one node at a time and reverse
the `next` pointer for each node.

```js
function reverseList(head) {
	let prev = null;
	let curr = head;

	while (curr !== null) {
		let next = curr.next;
		curr.next = prev;
		prev = curr;
		curr = next;
	}

	return prev;
}
```

Why this is a good linked-list question:

- it tests pointer discipline
- it forces you to preserve the rest of the list before changing links
- it shows the difference between node references and array indexes

### Example problem shape: Merge Two Sorted Lists

This is another very common singly linked list problem.

You are given two sorted linked lists and need to merge them into one sorted
list.

Example idea:

```text
list1: 1 -> 3 -> 5
list2: 2 -> 4 -> 6

result: 1 -> 2 -> 3 -> 4 -> 5 -> 6
```

The usual approach is to use a dummy node and keep attaching the smaller
current node.

```js
function mergeTwoLists(list1, list2) {
	let dummy = { value: 0, next: null };
	let tail = dummy;

	while (list1 !== null && list2 !== null) {
		if (list1.value < list2.value) {
			tail.next = list1;
			list1 = list1.next;
		} else {
			tail.next = list2;
			list2 = list2.next;
		}

		tail = tail.next;
	}

	tail.next = list1 !== null ? list1 : list2;
	return dummy.next;
}
```

Why this is a good linked-list question:

- it checks whether you can compare and reconnect nodes cleanly
- it rewards steady pointer updates instead of index-based thinking
- it introduces the useful `dummy` node pattern

### Example problem shape: Linked List Cycle

This is a very common question where you have to detect whether a linked list
loops back on itself.

The classic solution uses two pointers:

- a slow pointer that moves one step
- a fast pointer that moves two steps

```js
function hasCycle(head) {
	let slow = head;
	let fast = head;

	while (fast !== null && fast.next !== null) {
		slow = slow.next;
		fast = fast.next.next;

		if (slow === fast) {
			return true;
		}
	}

	return false;
}
```

Why this is a good linked-list question:

- it shows how traversal rules change when the list may not end at `null`
- it introduces fast-and-slow pointer reasoning
- it is a clean example of why linked lists are about references, not indexes

### What these examples teach together

These common linked-list problems usually train one of three things:

1. changing `next` references safely
2. walking through the list with one or more pointers
3. solving structure problems without direct index access

## Useful note to remember

Arrays are about position.
Singly linked lists are about connections.

In an array, you usually think in indexes.
In a linked list, you usually think in nodes and references.

### Summing it up

- A singly linked list is made of nodes.
- Each node stores a value and a reference to the next node.
- The list starts at the `head` and ends where `next` becomes `null`.
- Linked lists are not usually stored as one contiguous block of memory.
- Traversal and indexed access are usually $O(n)$.
- Inserts or removals at the front are usually $O(1)$.

## Queues

A queue is a data structure that follows the rule `First In, First Out`, usually shortened to `FIFO`.

That means the first item added is the first item removed.

The easiest real-world example is a line of people waiting. The person who joins first is usually the one served first.

## How a queue works

Queues care about two ends:

- the `rear` or `back`, where new items are added
- the `front`, where old items are removed

The two most common queue operations are:

- `enqueue` -> add a value to the back
- `dequeue` -> remove a value from the front

Example:

```js
// front -> back
[1, 3, 5];
```

If we `enqueue(7)`, the queue becomes:

```js
[1, 3, 5, 7];
```

If we then `dequeue()`, the value `1` is removed first.

That is the core queue rule: the oldest value leaves first.

## Queues In Memory

When a queue is implemented with an array, the values are still kept in order.

The main difference is not the memory shape. The main difference is the access rule.

With a queue, we add at one end and remove from the other.

That is why queues are about processing order, not random indexed access.

## Queues In JavaScript

JavaScript does not have a built-in `Queue` type, but arrays can be used to show the behavior.

```js
let queue = [];

queue.push(1);
queue.push(3);
queue.push(5);

console.log(queue); // [1, 3, 5]

queue.shift();

console.log(queue); // [3, 5]
```

Here:

- `push` is acting like `enqueue`
- `shift` is acting like `dequeue`

For beginner DSA learning, that is enough to understand the behavior.

If we want better queue performance, a linked list is often a better fit than a normal array.

With a linked-list-based queue, we usually keep track of both:

- `front` -> the first node
- `rear` -> the last node

That lets us add at the back and remove from the front without shifting every other value.

```js
const node1 = { value: 1, next: null };
const node2 = { value: 3, next: null };
const node3 = { value: 5, next: null };

node1.next = node2;
node2.next = node3;

let front = node1;
let rear = node3;

// enqueue 7
const newNode = { value: 7, next: null };
rear.next = newNode;
rear = newNode;

// dequeue
front = front.next;
```

The key idea is that we only update a small number of references. We do not need to shift the rest of the queue like `shift()` can do in an array.

## Big O of queues

The common operations are usually described like this:

| Operation  | Queue            |
| ---------- | ---------------- |
| Enqueue    | $O(1)$           |
| Dequeue    | $O(1)$ or $O(n)$ |
| Peek/front | $O(1)$           |
| Search     | $O(n)$           |

If a queue is implemented with a linked list, both `enqueue` and `dequeue` are usually $O(1)$.

That is the main time-complexity advantage of a linked-list queue: adding and removing can both stay constant time.

If a queue is implemented with a normal JavaScript array using `shift()`, removing from the front can be $O(n)$ because the remaining values may need to shift.

So if the goal is a true queue with efficient front removal, the linked-list version is usually the better model.

Searching is still usually $O(n)$ because we may need to inspect the values one by one.

## Why queues matter

Queues are useful when things should be handled in arrival order.

Common examples include:

- task scheduling
- print queues
- request processing
- breadth-first search
- waiting lines in real systems

## Useful note to remember

Stacks are `Last In, First Out`.
Queues are `First In, First Out`.

With a queue, the oldest item gets handled first.

### Summing it up

- A queue follows `First In, First Out`.
- The main operations are `enqueue`, `dequeue`, and `peek`.
- New values go to the back, and old values leave from the front.
- In JavaScript, arrays can demonstrate queue behavior, but `shift()` can make front removal slower.
- A linked-list queue is often the better model because enqueue and dequeue can both stay $O(1)$.
- Queues are useful when processing order matters.

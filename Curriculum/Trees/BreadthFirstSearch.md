## Breadth-First Search

Breadth-first search, or `BFS`, is the tree traversal idea that prioritizes
levels instead of depth.

Where DFS goes deep down one path first, BFS visits nodes level by level.

That is why BFS on a tree is also called `level-order traversal`.

## The main idea

Suppose the tree is:

```text
        4
       / \
      3   6
     /   / \
    2   5   7
```

DFS would push down a path first.

BFS would visit in this shape instead:

- first the root level
- then all nodes on the next level
- then all nodes on the level after that

So the order here would be:

```js
[4, 3, 6, 2, 5, 7];
```

## Why BFS uses a queue

To visit nodes level by level, you need to keep track of which nodes were
discovered first and should be processed next.

That is what a queue is good for.

A queue follows first-in, first-out behavior:

- first thing added is the first thing removed

That matches BFS naturally.

## BFS implementation shape

The usual tree BFS process is:

1. start with the root in the queue
2. remove the front node
3. visit it
4. add its children to the back of the queue
5. repeat until the queue is empty

## A common BFS implementation

```js
function bfs(root) {
	let queue = [];

	if (root !== null) {
		queue.push(root);
	}

	while (queue.length > 0) {
		let curr = queue.shift();
		console.log(curr.val);

		if (curr.left !== null) {
			queue.push(curr.left);
		}

		if (curr.right !== null) {
			queue.push(curr.right);
		}
	}
}
```

This version visits all nodes in level order.

## Level-by-level BFS

Sometimes the problem does not just want the values in one flat order.

Sometimes it wants the nodes grouped by level.

For that, you often capture the queue length at the start of each outer loop
iteration.

That queue length tells you how many nodes belong to the current level.

Example shape:

```js
function levelOrder(root) {
	let result = [];
	let queue = [];

	if (root !== null) {
		queue.push(root);
	}

	while (queue.length > 0) {
		let levelLength = queue.length;
		let level = [];

		for (let i = 0; i < levelLength; i++) {
			let curr = queue.shift();
			level.push(curr.val);

			if (curr.left !== null) queue.push(curr.left);
			if (curr.right !== null) queue.push(curr.right);
		}

		result.push(level);
	}

	return result;
}
```

## Why queue length matters

Without tracking `levelLength`, you can still do BFS, but you lose the clean
boundary between levels.

That matters for prompts like:

- level-order traversal
- right side view
- average of levels
- minimum depth by level

## Time complexity

BFS visits every node exactly once.

So if the tree has `n` nodes:

- Time: $O(n)$

## Space complexity

The queue can hold a full level of the tree at once.

In the worst case, that can be a large fraction of the whole tree.

So:

- Space: $O(n)$ worst case

This is one of the biggest differences from recursive DFS, where the extra space
usually depends on height instead.

## BFS vs DFS mental contrast

This is worth being very clear about.

### DFS

- go deep first
- usually uses recursion or a stack
- space often depends on tree height

### BFS

- go level by level
- usually uses a queue
- space can grow with the width of the tree

Neither one is always better.

The right choice depends on what the prompt is asking for.

## Common mistakes

### Mistake 1: using a stack mental model instead of a queue mental model

BFS needs first-in, first-out behavior.

### Mistake 2: forgetting to guard against `null`

If the root is `null`, the traversal should end immediately.

### Mistake 3: not separating levels when the prompt needs grouped output

Flat BFS order and grouped-by-level BFS are related, but not identical outputs.

### Mistake 4: assuming BFS space is small because the tree is balanced

A balanced tree can actually have a very wide last level, so BFS queue space can
still be large.

## What you should be able to say after studying this

You should be able to answer these clearly:

1. Why is BFS also called level-order traversal on trees?
2. Why does BFS use a queue?
3. What is the difference between flat BFS order and grouped level-order output?
4. Why is BFS time $O(n)$?
5. Why can BFS space be $O(n)$?

### Summing it up

- BFS visits tree nodes level by level.
- It usually uses a queue.
- It is the natural fit for level-order problems.
- It runs in $O(n)$ time because every node is visited once.
- Its worst-case extra space is $O(n)$ because a full level may sit in the queue.

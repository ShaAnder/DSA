## Binary Trees

Binary trees are another node-based data structure.

They are similar to linked lists in one important way: the structure is built out
of nodes connected by references.

The difference is that a linked list usually moves in a line, while a binary
tree can branch.

Each node in a binary tree can have up to two children:

- a left child
- a right child

## How a binary tree works

In a singly linked list, each node points to the next node in one chain.

In a binary tree, each node can point to two different child nodes.

That branching is what gives the structure its tree shape.

The first node in the tree is called the `root`.

The final nodes are leaves

From the root, the tree spreads downward through its child references.

Example idea:

```text
				10
			 /  \
			5    15
		 / \     \
		2   7     20
```

Here:

- `10` is the root
- `5` is the left child of `10`
- `15` is the right child of `10`
- `2` `7` `20` are leaves

## Binary tree nodes in JavaScript

The value stored in a tree node can be any data type.

For DSA work, we usually model a node like this:

```js
class TreeNode {
	constructor(val) {
		this.val = val;
		this.left = null;
		this.right = null;
	}
}
```

This is similar to a linked-list node, except instead of one `next` reference,
we have `left` and `right` child references.

## Root, children, and leaves

Some basic tree terms matter a lot in interview problems.

### Root

The `root` is the highest node in the tree.

It has no parent.

Every node in the tree should be reachable from the root.

### Children

The children of a node are the nodes connected below it.

In a binary tree, a node can have:

- no children
- one child
- two children

### Leaf node

A `leaf` is a node with no children.

Example:

```text
		10
	 /  \
	5    15
```

Here, `5` and `15` are leaf nodes.

If a node has at least one child, it is a non-leaf node.

## Trees are not allowed to have cycles

This is an important difference from general graph problems.

A binary tree is not supposed to loop back on itself.

That means:

- you do not revisit a parent by following child pointers
- you do not get stuck in cycles
- there is always at least one leaf node in a non-empty finite tree

This matters because tree traversal is simpler than graph traversal partly for
that reason.

## Height

The height of a binary tree measures how far the tree extends downward.

People define height in two common ways:

- by counting nodes in the longest path
- by counting edges in the longest path

That is why height definitions can look inconsistent between sources.

Example:

```text
		1
	 / \
	2   3
 /
4
```

If you count nodes, the longest path is `1 -> 2 -> 4`, so the height is `3`.

If you count edges, that same path has `2` edges, so the height is `2`.

The important thing is not memorizing one universal convention.

The important thing is noticing which convention the problem or source is using.

## Depth

Depth measures how far a specific node is from the root.

The root has the smallest depth.

As you move downward, depth increases.

Example:

```text
		1
	 / \
	2   3
 /
4
```

If you count nodes:

- depth of `1` is `1`
- depth of `2` is `2`
- depth of `4` is `3`

If you count edges:

- depth of `1` is `0`
- depth of `2` is `1`
- depth of `4` is `2`

Again, watch the convention being used.

## Ancestor and descendant

These terms show up often in tree questions.

### Ancestor

A node is an ancestor of another node if it appears above it on the path from
the root.

So in this tree:

```text
			10
		 /  \
		5    15
	 /
	2
```

- `10` is an ancestor of `5`
- `10` is also an ancestor of `2`
- `5` is an ancestor of `2`

### Descendant

A descendant is the opposite direction.

If a node is below another node in the tree, it is a descendant of that higher
node.

So `2` is a descendant of both `5` and `10`.

## Why binary trees matter

Binary trees matter because they teach:

- recursive thinking
- traversal reasoning
- parent-child relationships
- how branching changes the shape of a problem

They also lead directly into binary search trees, DFS, BFS, heaps, and many
interview-style traversal problems.

## Example problem shapes

Binary tree questions often matter less because of a brute-force-versus-
optimized contrast and more because of traversal choice and base-case clarity.

So for plain binary trees, the useful examples are usually common traversal-style
problems.

### Example problem shape: Maximum Depth of Binary Tree

This is one of the most common beginner tree questions.

The idea is to return how many levels deep the tree goes.

#### A more brute-force-style idea

One less direct way to solve it is to explore every root-to-leaf path, record
all path depths, and then return the maximum.

```js
function maxDepthBrute(root) {
	if (root === null) {
		return 0;
	}

	let depths = [];

	function dfs(node, depth) {
		if (node.left === null && node.right === null) {
			depths.push(depth);
			return;
		}

		if (node.left !== null) {
			dfs(node.left, depth + 1);
		}

		if (node.right !== null) {
			dfs(node.right, depth + 1);
		}
	}

	dfs(root, 1);

	let max = 0;
	for (let depth of depths) {
		if (depth > max) {
			max = depth;
		}
	}

	return max;
}
```

Why this is more brute-force-like:

- it collects more information than we really need
- it solves the problem in two steps instead of combining the answer as it goes
- it is valid, but less direct than the standard recursive version

#### Cleaner recursive version

```js
function maxDepth(root) {
	if (root === null) {
		return 0;
	}

	let leftDepth = maxDepth(root.left);
	let rightDepth = maxDepth(root.right);

	return 1 + Math.max(leftDepth, rightDepth);
}
```

Why this version is better:

- it does not store every path depth first
- each subtree directly returns the answer needed by its parent
- it matches the recursive shape of the tree naturally

Why this is a good binary tree question:

- it teaches recursive thinking
- it forces a clear base case
- it shows how subtree answers combine into a parent answer

### Example problem shape: Same Tree

Another common binary tree problem is checking whether two trees are identical.

#### A more brute-force-style idea

One less direct way is to serialize both trees, including `null` markers, and
then compare the serialized results.

```js
function isSameTreeBrute(p, q) {
	function serialize(node, values) {
		if (node === null) {
			values.push(null);
			return;
		}

		values.push(node.val);
		serialize(node.left, values);
		serialize(node.right, values);
	}

	let first = [];
	let second = [];

	serialize(p, first);
	serialize(q, second);

	if (first.length !== second.length) {
		return false;
	}

	for (let i = 0; i < first.length; i++) {
		if (first[i] !== second[i]) {
			return false;
		}
	}

	return true;
}
```

Why this is more brute-force-like:

- it transforms both trees into full traversal outputs first
- it uses extra memory to hold both serialized forms
- it is correct, but less direct than comparing nodes in place

#### Direct recursive version

```js
function isSameTree(p, q) {
	if (p === null && q === null) {
		return true;
	}

	if (p === null || q === null) {
		return false;
	}

	if (p.val !== q.val) {
		return false;
	}

	return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
}
```

Why this version is better:

- it compares the two trees in place instead of building extra arrays first
- it stops as soon as it finds a mismatch
- it follows the recursive structure of the problem directly

Why this is a good binary tree question:

- it trains careful base-case logic
- it shows that tree comparison is recursive structure comparison
- it is a common introductory interview prompt

## Common things to be clear about

### A binary tree is not a binary search tree

This is important.

A binary tree only means each node has at most two children.

A binary search tree adds an ordering rule on top of that.

So every BST is a binary tree, but not every binary tree is a BST.

### Height and depth are not the same

Height usually measures downward from a node to a leaf.

Depth usually measures upward from a node to the root.

### Leaves are not always only at the bottom row of a drawing

A leaf is any node with no children.

It can appear anywhere in the tree shape if that branch ends early.

## Big-picture mental model

If arrays are about positions and linked lists are about connections in a line,
binary trees are about connections with branching.

That branching is what makes traversal, recursion, and tree problems feel
different.

### Summing it up

- A binary tree is made of nodes connected by `left` and `right` child references.
- The top node is the `root`.
- A node with no children is a `leaf`.
- Trees do not allow cycles.
- Height and depth are related but not the same thing.
- Binary trees are the foundation for many interview problems about traversal and recursion.

## Depth-First Search

Depth-first search, or `DFS`, is one of the most common tree traversal ideas in
interviews.

The main idea is simple:

- go as deep as possible down one path
- then backtrack
- then explore the next path

For trees, DFS is usually taught through traversal order.

## What traversal means

To traverse a tree means to visit its nodes in some deliberate order.

“Visit” can mean different things depending on the problem:

- print the value
- add it to an array
- compare it
- update some result

DFS does not mean there is only one valid visit order.

There are three main DFS traversal orders in trees:

- preorder
- inorder
- postorder

## Why DFS works naturally with recursion

Trees are recursive structures.

Each node is like the root of its own left subtree and right subtree.

That makes recursion a natural way to express DFS.

You can also do DFS iteratively with a stack, but recursion is often the clearest
starting point.

## The mental model

Suppose the tree is:

```text
        4
       / \
      3   6
     /   / \
    2   5   7
```

DFS means you do not visit level by level first.

You keep pushing downward along one branch before backing up.

## Preorder traversal

Preorder means:

- visit the current node first
- then traverse the left subtree
- then traverse the right subtree

That order is often remembered as:

- root
- left
- right

```js
function preorder(root) {
	if (root === null) {
		return;
	}

	console.log(root.val);
	preorder(root.left);
	preorder(root.right);
}
```

For the example tree above, preorder visits:

```js
[4, 3, 2, 6, 5, 7];
```

Preorder is useful when you want to process the current node before its
children.

## Inorder traversal

Inorder means:

- traverse the left subtree
- visit the current node
- traverse the right subtree

That order is often remembered as:

- left
- root
- right

```js
function inorder(root) {
	if (root === null) {
		return;
	}

	inorder(root.left);
	console.log(root.val);
	inorder(root.right);
}
```

For the example tree above, inorder visits:

```js
[2, 3, 4, 5, 6, 7];
```

Important note:

An inorder traversal only gives sorted order if the tree is a binary search
tree.

That is because the BST ordering property lines up with left-root-right.

## Postorder traversal

Postorder means:

- traverse the left subtree
- traverse the right subtree
- visit the current node last

That order is often remembered as:

- left
- right
- root

```js
function postorder(root) {
	if (root === null) {
		return;
	}

	postorder(root.left);
	postorder(root.right);
	console.log(root.val);
}
```

For the example tree above, postorder visits:

```js
[2, 3, 5, 7, 6, 4];
```

Postorder is useful when you need to process children before the parent, such as
when deleting a tree or combining subtree results.

## Why the orders matter

These are not three random versions of the same thing.

The order matters because it changes when the current node becomes available to
your logic.

Ask:

- do I need the parent first?
- do I need the left side before the parent?
- do I need both children finished before using the parent?

That usually tells you which DFS order fits better.

## Time complexity

All three DFS traversals visit every node once.

So if the tree has `n` nodes:

- Time: $O(n)$

That does not depend on whether the tree is balanced.

You still have to visit every node.

## Space complexity

For the recursive versions, space depends on recursion depth.

That means it depends on the height `h` of the tree:

- Space: $O(h)$

So:

- balanced tree -> $O(\log n)$ call stack
- skewed tree -> $O(n)$ call stack

## Common mistakes

### Mistake 1: assuming inorder is always sorted

That is only true for a BST.

### Mistake 2: mixing up the order names

Do not memorize just the names.

Memorize what gets visited first, middle, and last.

### Mistake 3: forgetting the base case

If you do not stop at `null`, the recursion has no clean boundary.

### Mistake 4: not choosing the traversal based on the task

Different DFS orders are useful for different problem shapes.

## What you should be able to say after studying this

You should be able to answer these clearly:

1. What does depth-first search mean in a tree?
2. What is the visit order for preorder?
3. What is the visit order for inorder?
4. What is the visit order for postorder?
5. Why is inorder sorted only for BSTs?

### Summing it up

- DFS goes deep down one path before backtracking.
- Trees commonly use preorder, inorder, and postorder DFS traversals.
- The difference is when the current node is visited relative to its children.
- All three traversals are $O(n)$ time.
- Recursive DFS uses $O(h)$ extra space from the call stack.

## Binary Search Trees

Binary search trees, or `BSTs`, are a special kind of binary tree.

They are not just trees with two children.

They also follow an ordering rule that makes searching more efficient.

## Binary tree vs binary search tree

A normal binary tree only guarantees this:

- each node has at most two children

A binary search tree adds this extra rule:

- every value in the left subtree is smaller than the current node
- every value in the right subtree is greater than the current node

That rule must hold at every node, not just at the root.

So the property is recursive.

Example:

```text
        8
       / \
      3   10
     / \    \
    1   6    14
```

This is a BST because:

- everything left of `8` is smaller than `8`
- everything right of `8` is greater than `8`
- the same rule also works inside the left and right subtrees

## Why BSTs matter

BSTs matter because their ordering property lets you discard part of the tree
while searching, similar to how binary search discards half of a sorted array.

That means BSTs are useful when you care about:

- searching for a value
- inserting a value while keeping order
- deleting a value while preserving the BST rule

The main benefit is that these operations can be faster than in a plain binary
tree if the tree stays reasonably balanced.

## The connection to binary search

The mental link is this:

- binary search on an array uses sorted order to decide left or right
- BST search uses tree order to decide left or right

They are not the same algorithm, but they use the same kind of logic.

If the target is smaller than the current node, go left.

If the target is larger than the current node, go right.

If the target equals the current node, you found it.

## Example problem shape: search for a value in a BST

This is the most common beginner BST problem.

Given the root of a BST and a target value, return `true` if the value exists
and `false` otherwise.

### Brute-force tree search

If you ignored the BST property and treated the tree like a normal binary tree,
you could search both subtrees.

```js
function searchTreeBrute(root, target) {
	if (root === null) {
		return false;
	}

	if (root.val === target) {
		return true;
	}

	return (
		searchTreeBrute(root.left, target) || searchTreeBrute(root.right, target)
	);
}
```

Why it works:

- it eventually checks every node if needed
- it does not rely on any ordering rule

Cost:

- Time: $O(n)$
- Space: $O(h)$ recursive stack, where `h` is tree height

### BST-guided search

If the tree is a BST, you can do better by using the ordering rule.

```js
function search(root, target) {
	let current = root;

	while (current !== null) {
		if (target === current.val) return true;

		if (target < current.val) {
			current = current.left;
		} else {
			current = current.right;
		}
	}

	return false;
}
```

Why it is better:

- it discards one whole subtree at each step
- it uses the BST ordering rule instead of checking both sides blindly

Cost:

- Balanced tree: $O(\log n)$ time
- Skewed tree: $O(n)$ time worst case

## How BST search works

Suppose we search for `3` in this BST:

```text
    2
   / \
  1   3
       \
        4
```

Start at the root:

- current node is `2`
- target is `3`
- since `3 > 2`, go right

Now the current node is `3`.

That matches the target, so return `true`.

The important part is that we did not need to inspect the whole tree.

The BST property told us which direction still made sense.

## A common recursive search shape

```js
function search(root, target) {
	if (root === null) {
		return false;
	}

	if (target > root.val) {
		return search(root.right, target);
	} else if (target < root.val) {
		return search(root.left, target);
	} else {
		return true;
	}
}
```

This works because each recursive call moves into the only subtree where the
target could still exist.

## The base cases

There are two main base cases here.

### Base case 1: `root === null`

If you hit `null`, the target is not in that subtree.

So you return `false`.

### Base case 2: `target === root.val`

If the current node already matches the target, return `true`.

Those are what stop the recursion.

## Iterative version

You do not have to use recursion.

The same search can be written iteratively.

```js
function search(root, target) {
	let current = root;

	while (current !== null) {
		if (target === current.val) return true;

		if (target < current.val) {
			current = current.left;
		} else {
			current = current.right;
		}
	}

	return false;
}
```

This version can be easier to reason about if you want to avoid recursion.

## Insert and delete motivation

BSTs are often compared to sorted arrays because both maintain useful order.

But they have different tradeoffs.

With a sorted array:

- searching can be fast with binary search
- insertion or deletion is often expensive because elements must shift

With a BST:

- searching can be fast
- insertion and deletion can also be efficient if the tree stays balanced

That is one of the big reasons BSTs are worth learning.

## Time complexity

The running time depends on the height of the tree.

### Balanced tree case

If the tree is balanced, each move cuts away a large part of the remaining
search space.

That gives:

- Search: $O(\log n)$

### Worst case

If the tree becomes skewed, it can behave more like a linked list.

Example:

```text
1
 \
  2
   \
    3
     \
      4
```

Now searching may require walking through almost every node.

That gives:

- Search: $O(n)$ worst case

So the BST advantage depends heavily on the shape of the tree.

## Balanced vs skewed

This matters a lot.

A BST is only fast in the way people usually advertise when it stays balanced or
close to balanced.

If it becomes heavily one-sided, the search advantage mostly disappears.

That is why balanced BST variants exist, though you do not need to go deep into
those for basic interview prep unless asked.

## Common mistakes

### Mistake 1: thinking every binary tree is a BST

It is not.

The ordering rule is what makes a BST special.

### Mistake 2: only checking the immediate children

The BST property applies to the entire left and right subtrees, not just the
direct child nodes.

### Mistake 3: assuming BST search is always $O(\log n)$

That only holds when the tree is balanced enough.

### Mistake 4: confusing BST logic with binary search array logic

They are related in spirit, but the structures are different.

Arrays use indexes.

BSTs use parent-child links.

## What you should be able to say after studying this

You should be able to answer these clearly:

1. What extra property makes a binary tree a BST?
2. Why can BST search discard one whole subtree?
3. Why can BST search be $O(\log n)$ in a balanced tree?
4. Why can it degrade to $O(n)$ in a skewed tree?
5. Why are BSTs often compared to sorted arrays?

### Summing it up

- A BST is a binary tree with an ordering rule.
- Left subtree values are smaller and right subtree values are greater.
- That ordering lets you decide whether to go left or right while searching.
- Search can be $O(\log n)$ in a balanced tree but $O(n)$ in a skewed tree.
- BSTs matter because they combine ordered search with more flexible updates than sorted arrays.

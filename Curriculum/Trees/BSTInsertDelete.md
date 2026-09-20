## BST Insertion And Removal

This note is about two important binary search tree operations:

- inserting a value
- removing a value

These are part of the reason BSTs are often discussed as an alternative to
sorted arrays.

If the tree stays balanced, insertion and removal can be efficient while still
preserving order.

## Why BST updates matter

With a sorted array:

- searching can be fast
- but insertion or deletion is expensive because values may need to shift

With a BST:

- searching can be fast
- insertion and deletion can also be efficient if the tree height stays small

That is the main motivation for learning these operations.

## Insertion

To insert into a BST, you do not place the value anywhere you want.

You must find the position that keeps the BST ordering rule true.

That means:

- if the new value is smaller than the current node, go left
- if the new value is greater than the current node, go right
- when you reach `null`, that is where the new node belongs

## A simple insertion example

Suppose the tree is:

```text
4
 \
  6
```

Now insert `5`.

Start at `4`:

- `5 > 4`, so go right

Now at `6`:

- `5 < 6`, so go left

The left child of `6` is `null`, so insert `5` there.

Result:

```text
4
 \
  6
 /
5
```

## A common recursive insertion shape

```js
function insert(root, val) {
	if (root === null) {
		return new TreeNode(val);
	}

	if (val > root.val) {
		root.right = insert(root.right, val);
	} else if (val < root.val) {
		root.left = insert(root.left, val);
	}

	return root;
}
```

## Why insertion returns `root`

This is important.

The recursive call returns the updated subtree.

That returned subtree must be reattached back to the correct child pointer.

So when you do:

```js
root.right = insert(root.right, val);
```

you are saying:

- update the right subtree
- then reconnect it back to `root.right`

That is how the tree structure stays intact.

## Duplicate values

Some BST questions assume duplicates are not allowed.

Others define a rule such as:

- duplicates go to the left
- or duplicates go to the right

If the prompt does not say, do not invent the rule silently.

State the assumption.

## Insertion time complexity

Insertion time is proportional to the height of the tree.

If the tree is balanced:

- Time: $O(\log n)$

If the tree is skewed:

- Time: $O(n)$

## Removal

Removal is more complicated than insertion.

That is because deleting a node can break the BST structure unless you reconnect
the surrounding nodes correctly.

There are three real cases to think about.

### Case 1: the node has no children

This is the easiest case.

If the node is a leaf, you can just remove it by replacing it with `null`.

### Case 2: the node has one child

If the node has only one child, you replace the node with that child.

That keeps the tree connected while preserving the BST ordering rule.

### Case 3: the node has two children

This is the hardest case.

If the node has two children, you usually replace its value with its in-order
successor, then remove that successor node from the right subtree.

## What the in-order successor means

The in-order successor of a node is the smallest value greater than that node.

In a BST, that is the leftmost node in the right subtree.

Why use it?

Because it is the next valid value that can replace the deleted node without
breaking the BST property.

## Helper to find the minimum node in a subtree

```js
function minValueNode(root) {
	let curr = root;

	while (curr !== null && curr.left !== null) {
		curr = curr.left;
	}

	return curr;
}
```

This walks left until it cannot go left anymore.

That final node is the minimum value node in that subtree.

## A common recursive removal shape

```js
function remove(root, val) {
	if (root === null) {
		return null;
	}

	if (val > root.val) {
		root.right = remove(root.right, val);
	} else if (val < root.val) {
		root.left = remove(root.left, val);
	} else {
		if (root.left === null) {
			return root.right;
		} else if (root.right === null) {
			return root.left;
		} else {
			let minNode = minValueNode(root.right);
			root.val = minNode.val;
			root.right = remove(root.right, minNode.val);
		}
	}

	return root;
}
```

## Why deletion with two children works

Suppose the node to remove is `6` and it has two children.

You cannot just delete it and attach one subtree arbitrarily.

That could break the BST ordering rule.

Instead:

1. find the smallest node in the right subtree
2. copy that value into the current node
3. remove the duplicate successor from the right subtree

That keeps the overall BST ordering valid.

## Time complexity

Insertion and removal both depend on tree height.

That is because both operations are basically guided searches down the tree.

If the tree is balanced:

- Insert: $O(\log n)$
- Remove: $O(\log n)$

If the tree is skewed:

- Insert: $O(n)$
- Remove: $O(n)$

## Space complexity

For the recursive versions, space depends on recursion depth.

If the tree is balanced:

- Space: $O(\log n)$

If the tree is skewed:

- Space: $O(n)$

That is because the call stack grows with the height of the tree.

## Common mistakes

### Mistake 1: inserting without reconnecting the returned subtree

If you forget to assign the recursive result back into `root.left` or
`root.right`, the update can be lost.

### Mistake 2: not handling all removal cases

Deletion must separate:

- no children
- one child
- two children

If you skip one of those cases, the logic will break.

### Mistake 3: replacing a two-child node with the wrong value

The common safe choice is the in-order successor from the right subtree.

### Mistake 4: assuming BST updates are always $O(\log n)$

That only holds when the tree is balanced enough.

### Mistake 5: changing the tree shape without defending the BST property

The whole point of the update is not just removing or inserting a node.

It is preserving the BST rule afterward.

## What you should be able to say after studying this

You should be able to answer these clearly:

1. How do you know whether to go left or right when inserting?
2. Why does insertion return the current root?
3. What are the three main removal cases?
4. What is the in-order successor?
5. Why do insert and remove depend on tree height?

### Summing it up

- BST insertion follows the ordering rule until it finds a `null` position.
- BST removal has separate cases for 0, 1, or 2 children.
- Two-child deletion usually uses the in-order successor.
- Insert and remove are efficient when the BST stays balanced.
- The tree structure and BST property both have to remain valid after the update.

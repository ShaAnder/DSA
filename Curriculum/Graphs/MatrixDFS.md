## Matrix DFS

Matrix DFS is depth-first search applied to a 2D grid.

Even though the input looks like an array problem, the thinking is usually a
graph problem.

Each cell acts like a vertex.

The valid moves from that cell define its neighbors.

## Why a matrix can be treated like a graph

Suppose you have a grid like this:

```js
let grid = [
	[0, 0, 0, 0],
	[1, 1, 0, 0],
	[0, 0, 0, 1],
	[0, 1, 0, 0],
];
```

If you are allowed to move:

- up
- down
- left
- right

then every cell is connected to some nearby cells.

That is exactly graph behavior.

So matrix DFS is really DFS on an implicit graph.

## Common problem shape

One classic matrix DFS problem is:

Count the number of unique paths from the top-left corner to the bottom-right
corner, where:

- you may only move on `0`s
- you cannot move through `1`s
- you cannot visit the same cell twice in the same path

Using the example grid above, we want to count how many valid paths exist from
`(0, 0)` to `(3, 3)`.

## Why this is backtracking

This version of matrix DFS is not just about checking whether a path exists.

It is about exploring all valid paths.

That means:

- try one direction
- keep going as deep as possible
- if the path fails or finishes, backtrack
- try a different direction

That is why this problem is both DFS and backtracking.

## The base cases

When you write matrix DFS, the base cases matter a lot.

### Invalid path

You should stop and return `0` when:

- the row is out of bounds
- the column is out of bounds
- the cell is blocked
- the cell was already visited on the current path

In all of those cases, the current branch does not lead to a valid new path.

### Valid path found

If you reach the bottom-right cell, you found one complete valid path.

So you return `1`.

That `1` contributes to the total path count.

## Why we need visited tracking

Because movement is allowed in four directions, you can easily loop around and
revisit the same cells.

To prevent that, you need a `visited` structure.

You can use:

- a hash set
- a 2D boolean array

For a grid problem, a 2D boolean array is often simple and clear.

## A clean implementation

```js
function countPaths(grid) {
	let rows = grid.length;
	let cols = grid[0].length;
	let visited = Array.from({ length: rows }, () => Array(cols).fill(false));

	function dfs(row, col) {
		// 1. Out of bounds? Stop.
		if (row < 0 || row >= rows || col < 0 || col >= cols) return 0;

		// 2. Blocked or already visited? Stop.
		if (grid[row][col] === 1 || visited[row][col]) return 0;

		// 3. Reached destination? Count this as 1 valid path.
		if (row === rows - 1 && col === cols - 1) return 1;

		visited[row][col] = true; // Mark as being used in current path

		let count = 0;
		// Try all 4 directions (this is the "depth-first" part)
		count += dfs(row + 1, col);
		count += dfs(row - 1, col);
		count += dfs(row, col + 1);
		count += dfs(row, col - 1);
		// Backtrack: unmark so other paths can use it
		visited[row][col] = false;
		return count;
	}

	return dfs(0, 0);
}
```

## What backtracking is doing here

This line matters a lot:

```js
visited[row][col] = false;
```

That is the backtracking step.

It means:

- this cell is part of the current path while we explore from it
- once we are done exploring that path, we remove it from the current path
- now other branches are allowed to use it again in a different path

Without that unmarking step, you would block valid alternative paths.

## Small mental walk-through

At `(0, 0)`, DFS tries one direction, such as right.

Then it keeps exploring until:

- it hits a wall
- it goes out of bounds
- it hits a visited cell
- or it reaches the destination

When one branch finishes, recursion returns to the previous cell and tries the
next direction.

That is how the algorithm counts all possible valid paths instead of just one.

## Matrix DFS vs simpler grid DFS

Be careful here.

Not every matrix DFS problem has the same complexity or behavior.

### Flood fill / number of islands style

If you are just visiting each cell once overall, the runtime is usually around
$O(n \cdot m)$.

### Count all unique paths style

If you are exploring every possible path with backtracking, the runtime can grow
exponentially because there may be many different valid paths.

That is the case in this note.

## Time complexity

For this exact problem, the important idea is:

- we may explore a huge number of different paths
- each position can branch into multiple directions
- backtracking explores many combinations

So the worst-case time is exponential in the number of cells.

You will often see this described loosely as something like $O(4^{n \cdot m})$
for a grid with `n * m` cells.

The main takeaway is not the exact exponent form.

The main takeaway is that counting all unique paths with four-direction movement
is much more expensive than a simple one-pass traversal.

## Space complexity

The extra space comes from:

- the recursion stack
- the visited structure

In the worst case, both can grow with the number of cells:

- Space: $O(n \cdot m)$

## Common mistakes

### Mistake 1: forgetting the out-of-bounds checks

This is one of the first things matrix DFS needs.

### Mistake 2: not tracking visited cells

If movement is allowed in four directions, you can revisit cells and create
cycles.

### Mistake 3: forgetting to unmark on backtracking

If the goal is to count all valid paths, you must remove the cell from the
current path after exploring from it.

### Mistake 4: assuming all matrix DFS problems are $O(n \cdot m)$

That is true for some traversal problems, but not for path-counting problems
that explore many alternatives.

## What you should be able to say after studying this

You should be able to answer these clearly:

1. Why can a matrix be treated like a graph?
2. Why is this problem also a backtracking problem?
3. What are the main base cases in matrix DFS?
4. Why do we mark and then unmark visited cells?
5. Why is counting all unique paths more expensive than flood fill?

### Summing it up

- Matrix DFS treats each cell like a graph vertex.
- Valid moves define the edges to neighboring cells.
- For path-counting problems, DFS usually works together with backtracking.
- You need bounds checks, blocked-cell checks, and visited tracking.
- Counting all valid paths can take exponential time in the worst case.

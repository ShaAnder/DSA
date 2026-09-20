## Matrix BFS

Matrix BFS is breadth-first search applied to a 2D grid.

It is one of the most common ways to solve shortest-path problems in an
unweighted matrix.

## Why BFS fits shortest-path problems

BFS explores level by level.

That means:

- first it visits all cells that are 1 move away
- then all cells that are 2 moves away
- then all cells that are 3 moves away

Because of that, the first time BFS reaches a target cell, it has reached it by
the shortest path measured in number of moves.

That is the main reason BFS is such a strong fit here.

## Matrix as an implicit graph

Suppose the grid is:

```js
let grid = [
	[0, 0, 0, 0],
	[1, 1, 0, 0],
	[0, 0, 0, 1],
	[0, 1, 0, 0],
];
```

Each cell acts like a vertex.

Its neighbors are the cells you are allowed to move to.

For this note, we only allow movement in four directions:

- up
- down
- left
- right

So this matrix is really a graph in disguise.

## Common problem shape

One classic matrix BFS problem is:

Find the length of the shortest path from the top-left corner to the
bottom-right corner.

Rules:

- you may only move on `0`s
- you cannot move through `1`s
- movement is only up, down, left, and right

## What the queue represents

In matrix BFS, the queue stores cells that we still need to process.

The queue naturally preserves BFS order.

That means cells discovered earlier get processed earlier.

This is what allows BFS to expand outward layer by layer.

## Why we still need visited tracking

Just like matrix DFS, matrix BFS can revisit cells if you do not track them.

So we keep a `visited` structure.

For grid problems, a 2D boolean array is usually a clean choice.

Important detail:

Mark a cell as visited when you add it to the queue, not when you remove it.

That prevents the same cell from being added multiple times.

## A clean implementation

```js
function shortestPath(grid) {
	let rows = grid.length;
	let cols = grid[0].length;

	if (grid[0][0] === 1 || grid[rows - 1][cols - 1] === 1) {
		return -1;
	}

	let visited = Array.from({ length: rows }, () => Array(cols).fill(false));
	let queue = [[0, 0]];
	let directions = [
		[1, 0],
		[-1, 0],
		[0, 1],
		[0, -1],
	];

	visited[0][0] = true;
	let steps = 0;

	while (queue.length > 0) {
		let levelSize = queue.length;

		for (let i = 0; i < levelSize; i++) {
			let [row, col] = queue.shift();

			if (row === rows - 1 && col === cols - 1) {
				return steps;
			}

			for (let [dr, dc] of directions) {
				let newRow = row + dr;
				let newCol = col + dc;

				if (newRow < 0 || newRow >= rows || newCol < 0 || newCol >= cols) {
					continue;
				}

				if (grid[newRow][newCol] === 1 || visited[newRow][newCol]) {
					continue;
				}

				visited[newRow][newCol] = true;
				queue.push([newRow, newCol]);
			}
		}

		steps++;
	}

	return -1;
}
```

or let's look at num islands again but with bfs

```js
function numIslands(grid) {
	if (!grid || grid.length === 0) return 0;

	let rows = grid.length;
	let cols = grid[0].length;
	let islandCount = 0;

	const directions = [
		[-1, 0],
		[1, 0],
		[0, -1],
		[0, 1],
	];

	function bfs(r, c) {
		const queue = [[r, c]];
		grid[r][c] = "0"; // sink starting cell

		while (queue.length > 0) {
			const [x, y] = queue.shift(); // dequeue

			for (let [dx, dy] of directions) {
				const nx = x + dx;
				const ny = y + dy;

				if (
					nx >= 0 &&
					nx < rows &&
					ny >= 0 &&
					ny < cols &&
					grid[nx][ny] === "1"
				) {
					grid[nx][ny] = "0"; // sink
					queue.push([nx, ny]); // enqueue
				}
			}
		}
	}

	for (let i = 0; i < rows; i++) {
		for (let j = 0; j < cols; j++) {
			if (grid[i][j] === "1") {
				islandCount++;
				bfs(i, j); // explore entire island with BFS
			}
		}
	}

	return islandCount;
}
```

## Why the level loop matters

This part is the key BFS idea:

```js
let levelSize = queue.length;
```

That value tells you how many cells belong to the current distance from the
start.

After processing exactly that many cells, you know you are moving one layer
farther away.

That is why incrementing `steps` after each level works.

## Small mental walk-through

At the start:

- queue contains `(0, 0)`
- `steps = 0`

After processing that first level, the queue contains all cells reachable in
one move.

Then `steps` becomes `1`.

After the next level, the queue contains all cells reachable in two moves.

That pattern continues until:

- you reach the target and return the current distance
- or the queue becomes empty, which means no valid path exists

## Why BFS is better here than DFS

DFS can find a path, but it does not naturally guarantee the shortest one.

To get the shortest path with DFS, you often end up exploring many more
possibilities.

BFS is better here because the traversal order already matches increasing path
length.

That is the important distinction.

## Time complexity

Each cell is added to the queue at most once.

Each cell also checks a constant number of neighbors.

So if the grid has `n` rows and `m` columns:

- Time: $O(n \cdot m)$

## Space complexity

The extra space comes from:

- the visited structure
- the queue

In the worst case, both can grow with the number of cells:

- Space: $O(n \cdot m)$

## Common mistakes

### Mistake 1: marking visited too late

If you wait until dequeue time, the same cell may be enqueued multiple times.

### Mistake 2: forgetting blocked-cell checks

You must skip walls before pushing neighbors.

### Mistake 3: mixing BFS distance logic with DFS recursion logic

BFS shortest path depends on level-by-level expansion, not on going deep first.

### Mistake 4: returning the wrong value when no path exists

For shortest-path problems, returning `-1` is often clearer than returning a
fake distance.

## Matrix BFS vs Matrix DFS

This is the big contrast:

### Matrix BFS

- best when you want the shortest path in an unweighted grid
- explores outward level by level
- usually runs in $O(n \cdot m)$

### Matrix DFS

- useful for exploration, region marking, and some backtracking problems
- goes deep down one path first
- shortest path is not its natural strength

## What you should be able to say after studying this

You should be able to answer these clearly:

1. Why is BFS a natural fit for shortest path in an unweighted grid?
2. Why do we process the queue level by level?
3. Why should we mark visited when enqueueing?
4. Why is the runtime $O(n \cdot m)$?
5. Why is BFS a better default than DFS for this kind of shortest-path prompt?

### Summing it up

- Matrix BFS treats each cell like a graph vertex.
- A queue lets BFS expand outward one distance layer at a time.
- That is why BFS finds the shortest path in an unweighted grid.
- Each cell is visited at most once, so time is $O(n \cdot m)$.
- The main extra space is the queue plus visited tracking, also $O(n \cdot m)$.

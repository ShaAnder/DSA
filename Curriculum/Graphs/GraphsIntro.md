## Introduction To Graphs

Graphs are one of the most important data structures in DSA.

They show up in problems about:

- networks
- routes
- dependencies
- social connections
- grids
- recommendations

You have already seen graph-like thinking in linked lists and trees.

Graphs are the more general version.

## What a graph is

A graph is made of:

- vertices
- edges

`vertices` are the nodes.

`edges` are the connections between those nodes.

Unlike trees, graphs are much less restricted.

A graph can:

- branch in many directions
- contain cycles
- be disconnected
- give one node many neighbors

That flexibility is what makes graph problems powerful, but also harder than
tree problems.

## Basic terminology

Some graph words come up constantly in interview questions.

### Vertex

A `vertex` is a node in the graph.

You can think of it as one point in the structure.

### Edge

An `edge` is a connection between two vertices.

If vertex `A` is connected to vertex `B`, there is an edge between them.

### Neighbor

A `neighbor` of a vertex is another vertex directly connected to it.

### Path

A `path` is a sequence of vertices connected by edges.

### Cycle

A `cycle` happens when you can start at some vertex, follow edges, and come
back to the same vertex again.

### Connected component

A connected component is a group of vertices that are connected to each other.

If a graph has multiple disconnected groups, it has multiple connected
components.

## Directed vs undirected graphs

This distinction matters a lot.

### Directed graph

In a directed graph, edges have direction.

So:

```text
A -> B
```

does not automatically mean:

```text
B -> A
```

The connection only goes one way unless both directions are explicitly present.

Examples often modeled as directed graphs:

- course prerequisites
- following someone on social media
- one-way roads

### Undirected graph

In an undirected graph, edges do not have direction.

So if `A` is connected to `B`, then `B` is also connected to `A`.

Examples often modeled as undirected graphs:

- friendship connections
- two-way roads
- direct physical links between devices

## Graphs can be disconnected

This is one of the biggest differences from many tree examples.

A graph does not need every vertex to be reachable from every other vertex.

Example idea:

```text
A -- B

C -- D
```

This is still a graph.

It just has two separate connected components.

## Complete graph idea

If every vertex is connected to every other vertex, the graph is called a
`complete graph`.

For simple graph intuition, that means the graph is as densely connected as
possible.

You do not usually need to memorize formulas too early, but the big idea is:

- sparse graph -> relatively few edges
- dense graph -> many edges
- complete graph -> maximum possible connections for that graph model

## Why graph representation matters

A graph is an abstract idea.

In code, you need an actual representation.

In interviews, the most common representations are:

- matrix or grid
- adjacency matrix
- adjacency list

Different representations make different operations easier.

## Matrix or grid representation

Sometimes a problem is technically a graph problem even though the input looks
like a 2D grid.

Example:

```js
let grid = [
	[0, 0, 0, 0],
	[1, 1, 0, 0],
	[0, 0, 0, 1],
	[0, 1, 0, 0],
];
```

In a grid problem, each cell can act like a vertex.

Its neighbors are usually defined by allowed movement, such as:

- up
- down
- left
- right

Sometimes diagonals are allowed too, depending on the problem.

This means many matrix problems are really graph traversal problems in disguise.

Common examples:

- number of islands
- flood fill
- shortest path in a binary matrix

### Example problem shape: number of islands

This is a classic case where the input is a grid, but the thinking is really
graph traversal.

Each land cell is a vertex.

Its neighbors are the nearby land cells you are allowed to move to.

```js
function numIslands(grid) {
	if (!grid || grid.length === 0) return 0;

	let rows = grid.length;
	let cols = grid[0].length;
	let islandCount = 0;

	// The 4 possible directions: up, down, left, right
	const directions = [
		[-1, 0], // up
		[1, 0], // down
		[0, -1], // left
		[0, 1], // right
	];

	/**
	 * DFS helper: "Sink" the entire island starting from (r, c)
	 * This explores all connected '1's and marks them as visited
	 */
	function dfs(r, c) {
		// Base cases: stop if we go out of bounds or hit water / already visited
		if (r < 0 || r >= rows || c < 0 || c >= cols || grid[r][c] !== "1") {
			return;
		}

		// Sink this land cell (mark as visited so we don't count it again)
		grid[r][c] = "0";

		// Explore all 4 directions recursively
		for (let [dr, dc] of directions) {
			dfs(r + dr, c + dc);
		}
	}

	// Main logic: Scan every cell in the grid
	for (let i = 0; i < rows; i++) {
		for (let j = 0; j < cols; j++) {
			// Found a new island (unvisited land)
			if (grid[i][j] === "1") {
				islandCount++; // Count this as one new island
				dfs(i, j); // Sink the entire connected island
			}
		}
	}

	return islandCount;
}
```

This problem uses the grid itself as the graph representation.

If the grid has `n` rows and `m` columns, storing the grid costs:

- Space: $O(n \cdot m)$

## Adjacency matrix

An adjacency matrix uses a 2D array where rows and columns represent vertices.

If there is an edge from vertex `v1` to vertex `v2`, you record that in the
matrix.

Example:

```js
let adjMatrix = [
	[0, 1, 1, 0],
	[0, 0, 1, 0],
	[0, 0, 0, 1],
	[0, 0, 0, 0],
];
```

Here:

- `adjMatrix[r][c] === 1` means an edge exists from `r` to `c`
- `adjMatrix[r][c] === 0` means no edge exists from `r` to `c`

So in this example:

- `0 -> 1`
- `0 -> 2`
- `1 -> 2`
- `2 -> 3`

For an undirected graph, the matrix is usually symmetric.

That means if `A` connects to `B`, then both positions are marked.

```js
adjMatrix[a][b] = 1;
adjMatrix[b][a] = 1;
```

### When adjacency matrices are useful

They are useful when:

- the graph is dense
- you need fast edge existence checks

Checking whether an edge exists is straightforward because you can access:

```js
adjMatrix[v1][v2];
```

### Adjacency matrix tradeoff

The downside is memory.

If there are `V` vertices, the matrix uses:

- Space: $O(V^2)$

That is often wasteful for sparse graphs.

### Example problem shape: direct edge lookup

An adjacency matrix is useful when the question cares a lot about whether one
specific edge exists.

Example:

```js
function hasDirectFlight(adjMatrix, from, to) {
	return adjMatrix[from][to] === 1;
}
```

If the graph is dense, or if you need lots of repeated edge-existence checks,
this representation can be convenient.

Another common matrix-style prompt is counting edges or checking whether a graph
is symmetric for an undirected input.

## Adjacency list

An adjacency list is the most common graph representation in interviews.

Instead of storing every possible pair of vertices, you only store the neighbors
that actually exist.

Example with an object:

```js
let graph = {
	A: ["B", "C"],
	B: ["C"],
	C: ["D"],
	D: [],
};
```

This means:

- `A` points to `B` and `C`
- `B` points to `C`
- `C` points to `D`

You can also model this with node objects:

```js
class GraphNode {
	constructor(val) {
		this.val = val;
		this.neighbors = [];
	}
}
```

### Why adjacency lists are popular

They are usually more space-efficient than adjacency matrices because you only
store real edges.

If there are `V` vertices and `E` edges, the space is usually:

- Space: $O(V + E)$

That makes adjacency lists a strong default for sparse graphs.

### Example problem shape: path exists between two nodes

This is a common adjacency-list problem because you want to traverse the real
neighbors of each vertex.

```js
function hasPath(graph, start, target) {
	let stack = [start];
	let visited = new Set();

	while (stack.length > 0) {
		let node = stack.pop();

		if (node === target) return true;
		if (visited.has(node)) continue;

		visited.add(node);

		for (let neighbor of graph[node]) {
			if (!visited.has(neighbor)) {
				stack.push(neighbor);
			}
		}
	}

	return false;
}
```

This is the kind of representation you often see in problems about:

- path existence
- connected components
- clone graph
- course scheduling

## Choosing the representation

This is the main tradeoff:

### Adjacency matrix

- easy edge lookup
- expensive memory for large sparse graphs
- space is $O(V^2)$

### Adjacency list

- stores only real edges
- usually better for traversal problems
- space is $O(V + E)$

### Grid or matrix input

- common in island and pathfinding problems
- often a graph problem hidden inside a 2D array

## Quick matching guide

If you are trying to decide which representation fits a problem, use this rough
rule:

- use a grid when the input is already a 2D board and movement defines edges
- use an adjacency matrix when edge lookup between arbitrary pairs matters a lot
- use an adjacency list when you want to traverse neighbors efficiently

## Why graphs feel harder than trees

Trees are a special kind of graph with more rules.

Graphs are harder because they may have:

- cycles
- multiple components
- many possible paths
- no obvious starting root

That is why visited sets and careful traversal logic become so important.

## Common mistakes

### Mistake 1: thinking every graph problem looks like explicit nodes and edges

Many graph problems are really grids or dependency lists.

### Mistake 2: forgetting that graphs can have cycles

This often causes repeated work or infinite loops if you do not track visited
nodes.

### Mistake 3: mixing up adjacency matrix and adjacency list

One stores every possible connection slot.

The other stores only the actual neighbors.

### Mistake 4: assuming all graphs are connected

Many interview problems require you to handle multiple disconnected components.

## What you should be able to say after studying this

You should be able to answer these clearly:

1. What is the difference between a vertex and an edge?
2. What is the difference between a directed and undirected graph?
3. What is a connected component?
4. What is the difference between an adjacency matrix and an adjacency list?
5. Why are many grid problems really graph problems?

### Summing it up

- A graph is made of vertices connected by edges.
- Graphs can be directed or undirected.
- Graphs can contain cycles and disconnected components.
- Common interview representations are grids, adjacency matrices, and adjacency lists.
- Adjacency lists are usually the most practical default for sparse graph problems.

## Adjacency List

An adjacency list is one of the most common ways to represent a graph.

It is especially useful when you want to traverse neighbors efficiently.

For interview problems, it is often the default graph representation to think
in.

## What an adjacency list is

An adjacency list stores, for each vertex, the list of vertices directly
connected to it.

Example idea:

```text
A -> B, C
B -> E
C -> E
E -> D
D ->
```

This means:

- `A` has neighbors `B` and `C`
- `B` has neighbor `E`
- `C` has neighbor `E`
- `E` has neighbor `D`
- `D` has no outgoing neighbors

## Why adjacency lists are useful

Adjacency lists are useful because they only store edges that actually exist.

That makes them more space-efficient than adjacency matrices for sparse graphs.

They also make traversal natural because when you are at a node, you can get
its neighbors directly.

## A common JavaScript representation

In JavaScript, an adjacency list is often stored in a `Map` or a plain object.

Example:

```js
let graph = new Map([
	["A", ["B", "C"]],
	["B", ["E"]],
	["C", ["E"]],
	["D", []],
	["E", ["D"]],
]);
```

You can also use node objects with a `neighbors` array, but for interview work,
`Map -> array of neighbors` is usually simple and readable.

## Building an adjacency list from edges

Suppose the input is a list of directed edges:

```js
let edges = [
	["A", "B"],
	["A", "C"],
	["B", "E"],
	["C", "E"],
	["E", "D"],
];
```

You can build the adjacency list like this:

```js
function buildAdjList(edges) {
	let adjList = new Map();

	for (let [src, dst] of edges) {
		if (!adjList.has(src)) {
			adjList.set(src, []);
		}

		if (!adjList.has(dst)) {
			adjList.set(dst, []);
		}

		adjList.get(src).push(dst);
	}

	return adjList;
}
```

If the graph is undirected, you would add both directions:

```js
adjList.get(a).push(b);
adjList.get(b).push(a);
```

## Why adjacency lists are easy to traverse

Once the graph is stored this way, traversing a node’s neighbors is direct:

```js
for (let neighbor of adjList.get(node)) {
	// process neighbor
}
```

That is the main reason adjacency lists work so well with DFS and BFS.

## DFS on an adjacency list

Suppose you want to count how many paths exist from a source node to a target
node.

That is a DFS-style problem because you want to explore paths deeply and then
backtrack.

```js
function countPaths(node, target, adjList, visited) {
	if (visited.has(node)) {
		return 0;
	}

	if (node === target) {
		return 1;
	}

	visited.add(node);
	let count = 0;

	for (let neighbor of adjList.get(node)) {
		count += countPaths(neighbor, target, adjList, visited);
	}

	visited.delete(node);
	return count;
}
```

Call it like this:

```js
countPaths("A", "D", graph, new Set());
```

### Important note about backtracking

The `visited` set must be shared across the current recursive path.

You should not create a brand new set inside each recursive call if the goal is
to track the current path and avoid cycles.

The backtracking step is:

```js
visited.delete(node);
```

That removes the node when the current path is done so other paths can still use
it.

## BFS on an adjacency list

Suppose you want the shortest path length from one node to another in an
unweighted graph.

This is a BFS-style problem.

Why?

Because BFS explores by distance layers.

```js
function shortestPath(start, target, adjList) {
	let queue = [start];
	let visited = new Set([start]);
	let length = 0;

	while (queue.length > 0) {
		let levelSize = queue.length;

		for (let i = 0; i < levelSize; i++) {
			let node = queue.shift();

			if (node === target) {
				return length;
			}

			for (let neighbor of adjList.get(node)) {
				if (!visited.has(neighbor)) {
					visited.add(neighbor);
					queue.push(neighbor);
				}
			}
		}

		length++;
	}

	return -1;
}
```

This returns the fewest number of edges needed to reach the target.

## When adjacency lists are the right fit

Adjacency lists are especially useful for problems about:

- traversing neighbors
- checking whether a path exists
- counting connected components
- topological-style graph exploration
- shortest path in an unweighted sparse graph

## Time complexity

### Building the adjacency list

If there are `E` edges, building the structure takes:

- Time: $O(E)$

If you also include vertex setup explicitly, people often describe the full
space as $O(V + E)$.

### DFS or BFS traversal

For a standard traversal, each vertex is visited at most once and each edge is
considered at most once.

So the usual runtime is:

- Time: $O(V + E)$

and the extra space is also commonly described as:

- Space: $O(V + E)$ for the graph storage itself
- Extra traversal space: $O(V)$ for `visited` plus recursion stack or queue

### Important exception

If the problem is not just traversal, but counting all possible paths with
backtracking, the runtime can become exponential.

That is because you may explore many different path combinations.

So be careful not to say “all DFS on graphs is $O(V + E)$” without checking what
the DFS is actually doing.

## Common mistakes

### Mistake 1: forgetting to create entries for destination-only vertices

Even if a node has no outgoing edges, it may still need a key with an empty
neighbor list.

### Mistake 2: mixing up directed and undirected construction

Directed graphs add one edge.

Undirected graphs add both directions.

### Mistake 3: resetting visited incorrectly inside DFS

If you recreate `visited` inside recursion, you lose the current-path tracking.

### Mistake 4: assuming adjacency lists are always best for every operation

They are great for traversal, but adjacency matrices are better when you need
constant-time edge existence lookup.

## What you should be able to say after studying this

You should be able to answer these clearly:

1. What does an adjacency list store?
2. Why is it usually better than an adjacency matrix for sparse graphs?
3. How do you build one from an edge list?
4. Why does DFS fit path exploration problems well?
5. Why does BFS fit shortest path in unweighted graphs well?

### Summing it up

- An adjacency list stores each vertex and its direct neighbors.
- It is a very common and practical graph representation.
- It is usually space-efficient for sparse graphs.
- DFS and BFS both work naturally on adjacency lists.
- Standard traversals are often $O(V + E)$, but path-counting backtracking can be exponential.

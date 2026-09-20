## Stacks

A stack is a data structure that follows the rule `Last In, First Out`, usually shortened to `LIFO`.

That means the last item added is the first item removed.

The easiest real-world example is a stack of plates. If you place a new plate on top, that is the first one you will take off next.

## How a stack works

Stacks mainly care about one end of the structure: the top.

The two most common stack operations are:

- `push` -> add a value to the top
- `pop` -> remove the value from the top

Example:

```js
// bottom -> top
[1, 3, 5];
```

If we `push(7)`, the stack becomes:

```js
[1, 3, 5, 7];
```

If we then `pop()`, the value `7` is removed first.

That is the core stack rule: the most recent value leaves first.

## Stacks In Memory

When a stack is implemented using an array, the values are usually kept in order, and stack operations happen at one end.

```js
let stack = [1, 3, 5];
```

If we treat the end as the top of the stack, then:

- `5` is currently on top
- `push(7)` adds `7` to the top
- `pop()` removes `7` from the top

This is one reason stacks can be efficient. We usually do not need to shift every value around when working at the top.

## Stacks In JavaScript

JavaScript does not have a special built-in `Stack` type, but arrays can be used to behave like stacks.

```js
let stack = [];

stack.push(1);
stack.push(3);
stack.push(5);

console.log(stack); // [1, 3, 5]

stack.pop();

console.log(stack); // [1, 3]
```

For beginner DSA work, this is usually enough to understand the behavior.

The important idea is not the exact JavaScript implementation detail. The important idea is the rule:

- last in
- first out

## Big O of stacks

When we use a stack properly, the main operations are usually efficient:

| Operation | Stack  |
| --------- | ------ |
| Push      | $O(1)$ |
| Pop       | $O(1)$ |
| Peek/top  | $O(1)$ |
| Search    | $O(n)$ |

`push` is usually $O(1)$ because we add to the top.

`pop` is usually $O(1)$ because we remove from the top.

`peek` or `top` is also usually $O(1)$ because we only look at the top value without removing it.

Searching is still usually $O(n)$ because we may need to look through the values one by one.

## Why stacks matter

Stacks are useful when the most recent thing should be handled first.

Common examples include:

- undo operations
- browser history behavior
- function call tracking with the call stack
- expression parsing and matching brackets

## Useful note to remember

Arrays are about indexed access.
Stacks are about access order.

With a stack, we do not care much about the middle. We mostly care about what is on top.

### Summing it up

- A stack follows `Last In, First Out`.
- The main operations are `push`, `pop`, and `peek`.
- Stacks usually work at one end only: the top.
- In JavaScript, arrays can be used to model stack behavior.
- Stack operations at the top are usually $O(1)$.

/*
Prompt:
Given a sorted array of integers, return the first pair whose sum is 0.
Return null if none exists.

Examples:
firstZeroSumPair([-4, -2, -1, 0, 1, 3, 5]) -> [-1, 1]
firstZeroSumPair([1, 2, 3]) -> null

input - arr
output - [num1, num2]
failure return - null
edge cases - empty arr, arr too short, no valid pair
likely pattern - multiple pointers, we need to compare two intergers across a sorted arr
time/space target - o(n) / o(1)
*/

function firstZeroSumPair(numbers) {
	// guard
	if (numbers.length < 2) return null;

	// set our pointers
	let left = 0;
	let right = numbers.length - 1;

	// loop over array and modify pointers when condition is met
	while (left < right) {
		if (numbers[left] + numbers[right] === 0) {
			return [numbers[left], numbers[right]];
		} else if (numbers[left] + numbers[right] > 0) {
			right--;
		} else {
			left++;
		}
	}
	// return something
	return null;
}

module.exports = firstZeroSumPair;

/*
Prompt:
Given an array of integers and a number k, return the maximum sum of any k
consecutive values.

Examples:
maxConsecutiveSum([1, 2, 5, 2, 8, 1, 5], 2) -> 10
maxConsecutiveSum([4, 2, 1, 6], 1) -> 6
maxConsecutiveSum([4, 2], 3) -> null

input: arr, k
output: num (sum)
faulure return null
edge cases: empty arr, arr < k length,
likely approach: sliding window, as the problem stats an array (no mention of sorting) and a sum of consecutive values this is the O(n) time solution for a problem like this
time/space target O(n), O(1)
1
*/

function maxConsecutiveSum(arr, k) {
	// guard
	if (arr.length === 0) return null;
	if (arr.length < k) return null;

	// setup varaibles
	let temp = 0;
	let max = 0;

	// loop through arr 0 -> k and only count those numbers, add to max assign max to temp
	for (let i = 0; i < k; i++) {
		max += arr[i];
	}

	// assign temp to max
	temp = temp + max;

	// loop over the rest of the array
	for (let i = k; i < arr.length; i++) {
		temp = temp + arr[i] - arr[i - k];
		if (temp > max) {
			max = temp;
		}
	}
	return max;
}

module.exports = maxConsecutiveSum;

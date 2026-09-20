/*

You are given an array arr, replace every element in that array with the greatest element among the elements to its right, and replace the last element with -1.

After doing so, return the array.

Example 1:

Input: arr = [2,4,5,3,1,2]

Output: [5,5,3,2,2,-1]
Example 2:

Input: arr = [3,3]

Output: [3,-1]
Constraints:

1 <= arr.length <= 10,000
1 <= arr[i] <= 100,000

*/

class Solution {
	/**
	 * @param {number[]} arr
	 * @return {number[]}
	 */
	replaceElements(arr) {
		// guard against empty arr
		if (arr.length < 1) return [];

		// set a maxRight val final array value then set that value to -1
		let maxRight = arr[arr.length - 1];
		arr[arr.length - 1] = -1;
		// loop over arr from second last index
		for (let i = arr.length - 2; i >= 0; i--) {
			// 1. set temp
			let temp = 0;
			// 2 Loop over check if current val better than max, update it and replace the val
			// we use a temp as intermediary so val isn't lost
			temp = arr[i];
			arr[i] = maxRight;
			maxRight = Math.max(maxRight, temp);
		}

		return arr;
	}
}

/*

input: arr
output: arr to standards, last el -1
brute force: O(N^2) looping over array for each element in the array to find the greatest el
likely pattern: reverse traversal with a running maxRight using constant extra space, 
becasue it relies on elements to it's right

Questions asked to come to the pattern:

1. What does the output rely on? Each element to the right
2. How doe we evaluate the Brute force? "for each index, scan everything to the right"
3. What's the needed information? a running summary, not exact positions
4. Does the problem allow in place updates? only if you preserve the original current value first
5. if i start at the last element what should i write there? -1
6. What's the single biggest piece of information? maxRight number
 */

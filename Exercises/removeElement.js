/** 
Given an integer array nums and an integer val, remove all occurrences of val in nums in-place. The order of the elements may be changed. Then return the number of elements in nums which are not equal to val.

Consider the number of elements in nums which are not equal to val be k, to get accepted, you need to do the following things:

Change the array nums such that the first k elements of nums contain the elements which are not equal to val. The remaining elements of nums are not important as well as the size of nums.
Return k.
Custom Judge:

The judge will test your solution with the following code:

int[] nums = [...]; // Input array
int val = ...; // Value to remove
int[] expectedNums = [...]; // The expected answer with correct length.
                            // It is sorted with no values equaling val.

int k = removeElement(nums, val); // Calls your implementation

assert k == expectedNums.length;
sort(nums, 0, k); // Sort the first k elements of nums
for (int i = 0; i < k; i++) {
    assert nums[i] == expectedNums[i];
}
If all assertions pass, then your solution will be accepted.

Example 1:

Input: nums = [3,2,2,3], val = 3

Output: k = 2, nums = [2,2,_,_]
Explanation: Your function should return k = 2, with the first two elements of nums being 2.
It does not matter what you leave beyond the returned k (hence they are underscores).


Example 2:

Input: nums = [0,1,2,2,3,0,4,2], val = 2

Output: k = 5, nums = [0,1,3,0,4,_,_,_]
Explanation: Your function should return k = 5, with the first five elements of nums containing 0, 0, 1, 3, and 4.
Note that the five elements can be returned in any order.
It does not matter what you leave beyond the returned k (hence they are underscores).


Constraints:

0 <= nums.length <= 100
0 <= nums[i] <= 50
0 <= val <= 100


*/

class Solution {
	/**
	 * @param {number[]} nums
	 * @param {number} val
	 * @return {number}
	 */
	removeElement(nums, val) {
		// guard against empty arr
		if (nums.length < 1) return 0;

		// set pointer 1 and 2
		let i = 0;
		let j = 0;
		// multi pointer loop over arr
		while (j < nums.length) {
			// 1 pointer reads arr
			if (nums[j] === val) {
				j++;
			} else {
				// the next moves and updates if not val
				nums[i] = nums[j];
				i++;
				j++;
			}
		}
		// return k or i at the end#
		return i;
	}
}

/*
j is the read pointer that scans every element in the array.
i is the write pointer that marks where the next non-val element should go.
When nums[j] is not val, we copy it into nums[i] and move i forward.
When nums[j] is val, we skip it and only move j.
By the end, i equals the number of non-val elements written into the front of the array, so returning i gives us k.
*/

/*

You are given a string s consisting of the following characters: '(', ')', '{', '}', '[' and ']'.

The input string s is valid if and only if:

Every open bracket is closed by the same type of close bracket.
Open brackets are closed in the correct order.
Every close bracket has a corresponding open bracket of the same type.
Return true if s is a valid string, and false otherwise.

Example 1:

Input: s = "[]"

Output: true
Example 2:

Input: s = "([{}])"

Output: true
Example 3:

Input: s = "[(])"

Output: false
Explanation: The brackets are not closed in the correct order.

Constraints:

1 <= s.length <= 1000

*/

class Solution {
	/**
	 * @param {string} s
	 * @return {boolean}
	 */
	isValid(s) {
		// create record array for comparing our brackets
		let record = [];

		let bracketLookup = {
			")": "(",
			"}": "{",
			"]": "[",
		};

		// loop over the brackets and append or pop depending on if they are correct
		for (const b of s) {
			if (b in bracketLookup) {
				if (bracketLookup[b] === record[record.length - 1]) {
					// check if the record is the same if so pop
					record.pop();
				} else if (bracketLookup[b] !== record[record.length - 1]) {
					return false;
				}
			} else {
				record.push(b);
			}
		}
		if (record.length < 1 || record == undefined) {
			return true;
		} else {
			return false;
		}
	}
}

/*

input string
output true
failure return false
pattern?: stack, we are removing from the "top" of the stack to confirm valid pairs, if what we're checking
doesn't match the top of the stack pair wise we return false
brute force: o(n^2) we would need to loop over each item in the string for each item to confirm all valid pairs exist
final expected time complexity: O(N)
final expected space complexity: O(N) 

*/

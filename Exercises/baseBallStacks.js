/*

You are keeping the scores for a baseball game with strange rules. At the beginning of the game, you start with an empty record.

Given a list of strings operations, where operations[i] is the ith operation you must apply to the record and is one of the following:

An integer x: Record a new score of x.
'+': Record a new score that is the sum of the previous two scores.
'D': Record a new score that is the double of the previous score.
'C': Invalidate the previous score, removing it from the record.
Return the sum of all the scores on the record after applying all the operations.

Note: The test cases are generated such that the answer and all intermediate calculations fit in a 32-bit integer and that all operations are valid.

Example 1:

Input: ops = ["1","2","+","C","5","D"]

Output: 18
Explanation:

"1" - Add 1 to the record, record = [1].
"2" - Add 2 to the record, record = [1, 2].
"+" - Add 1 + 2 = 3 to the record, record = [1, 2, 3].
"C" - Invalidate and remove the previous score, record = [1, 2].
"5" - Add 5 to the record, record = [1, 2, 5].
"D" - Add 2 * 5 = 10 to the record, record = [1, 2, 5, 10].
The total sum is 1 + 2 + 5 + 10 = 18.
Example 2:

Input: ops = ["5","D","+","C"]

Output: 15
Explanation:

"5" - Add 5 to the record, record = [5].
"D" - Add 2 * 5 = 10 to the record, record = [5, 10].
"+" - Add 5 + 10 = 15 to the record, record = [5, 10, 15].
"C" - Invalidate and remove the previous score, record = [5, 10].
The total sum is 5 + 10 = 15.
Constraints:

1 <= operations.length <= 1000
operations[i] is "C", "D", +, or a string representing an integer in the range [(-30,000), (30,000)].
For operation "+", there will always be at least two previous scores on the record.
For operations "C" and "D", there will always be at least one previous score on the record.

*/

class Solution {
	/**
	 * @param {string[]} operations
	 * @return {number}
	 */
	calPoints(operations) {
		// first create our empty record here
		let record = [];

		// next loop through array to get operations
		for (let i = 0; i < operations.length; i++) {
			if (operations[i] === "D") {
				record.push(Number(record[record.length - 1] * 2));
				// + = add prev 2
			} else if (operations[i] === "+") {
				record.push(record[record.length - 1] + record[record.length - 2]);
				// Last = C == Remove entry, we can simply set this to 0
			} else if (operations[i] === "C") {
				record.pop(record[record.length - 1]);
			} else {
				// if no special case we append our tempscore
				record.push(Number(operations[i]));
			}
		}
		// return score
		return record.reduce(
			(accumulator, currentValue) => accumulator + currentValue,
			0,
		);
	}
}

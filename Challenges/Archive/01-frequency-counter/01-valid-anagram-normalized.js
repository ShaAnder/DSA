/*
Prompt:
Given two strings, return true if they contain the same characters with the
same frequencies, ignoring spaces and case.

Examples:
validAnagramNormalized("rail safety", "fairy tales") -> true
validAnagramNormalized("Dormitory", "dirty room") -> true
validAnagramNormalized("hello", "bello") -> false


input - str1, str2
output - true
failure return - false
edge cases - mismatched str sizes, empty strings, symbols,
likely pattern - frequency counter, we need to check two strings / arr in O(n) time and compare
time/space target - o(n) / o(n)

*/

function validAnagramNormalized(first, second) {
	// normalize strings first
	let firstNorm = first.toLowerCase().match(/[a-z0-9]/g) || [];
	let secondNorm = second.toLowerCase().match(/[a-z0-9]/g) || [];

	// step 2: guard
	if (firstNorm.length !== secondNorm.length) return false;

	// step 3: declare counters
	let freq1 = {};
	let freq2 = {};

	// step 4: loop over arr1 / 2 and store
	for (const val of firstNorm) {
		freq1[val] = (freq1[val] || 0) + 1;
	}
	for (const val of secondNorm) {
		freq2[val] = (freq2[val] || 0) + 1;
	}

	// step 5: loop to compare frequencies
	for (let key in freq1) {
		if (!(key in freq2)) {
			return false;
		}

		if (freq2[key] !== freq1[key]) {
			return false;
		}
	}

	// final step: return something
	return true;
}

module.exports = validAnagramNormalized;

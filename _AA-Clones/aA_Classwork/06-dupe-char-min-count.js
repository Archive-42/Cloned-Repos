/***********************************************************************
Write a function `duplicateCharMinCount(string, minCount)` that will takes
a string as an argument and returns an array of characters that show up
at least `minCount` number of times. The string will have at least one
character.

Examples:

duplicateCharMinCount("apple", 2) // ["p"]
duplicateCharMinCount("banana", 2) // ["a", "n"]
duplicateCharMinCount("What about a longer string?", 3) // ["a", "t", " "]
***********************************************************************/

function duplicateCharMinCount(string, minCount) { // string = 'apple'
	// const characters = string.split('');
	const characters = [...string]; 
	const duplicateCharacters = [];
	for (const currentCharacter of characters) {
		const matches = characters.filter(character => currentCharacter === character);
		console.log(matches);
		if (matches.length >= minCount && !duplicateCharacters.includes(currentCharacter)) {
			duplicateCharacters.push(currentCharacter);
		}
	}
	return duplicateCharacters;
}

/**************DO NOT MODIFY ANYTHING UNDER THIS  LINE*****************/
module.exports = duplicateCharMinCount;

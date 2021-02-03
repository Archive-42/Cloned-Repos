var fs = require('fs');

var song1 = fs.readFileSync('./Brain.mp3');
var song2 = fs.readFileSync('/Users/joe/Fullstack/file/Ghost in the Shell Soundtrack Making of Cyborg.mp3');

console.log(song1.length);
console.log(song2.length);

 var song3 = song1.slice(0, 200000);

fs.writeFile('./new-song-chopped.mp3', song3);
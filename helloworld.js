function say(filename) {
	return fs.readFileSync(filename);
}

var fs = require("fs");

// Adds to our PUBLIC API
module.exports.say = say;
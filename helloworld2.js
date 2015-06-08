//asynquence .then(func) => func receives a done trigger followed by the function return parameters

function readFile(filename) {
	var sq = ASQ();

	/*sq.then(function(done) {
		fs.readFile(filename);
	});*/

	fs.readFile(filename, sq.errfcb());

	return sq;
}

function delayMsg(done, contents) {
	setTimeout(function() {
		done(contents);
	},1000);
}

function say(filename) {
	return readFile(filename)
		.then(delayMsg);
}

var fs = require("fs");
var ASQ = require("asynquence");
require("asynquence-contrib");

module.exports.say = say;
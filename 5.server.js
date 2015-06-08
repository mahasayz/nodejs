function getRand() {
	return Math.random().toString();
}

function delayMsg(done, val) {
	setTimeout(function() {
		console.log(val);
		done(val);
	}, 1000);
}

function handleHTTP(req, res) {

	if (req.method === "GET") {
		if (req.url === "/") {
			res.writeHead(200, { "Content-type": "text/plain" });

			ASQ(function(done){
				done(Math.random());
			})
			.then(delayMsg)
			.then(function(done, num) {
				done("Hello Mahbub " + num);
			})
			.then(delayMsg)
			.val(function(num) {
				res.end(num);
			})
			.or(function(err) {
				console.error("Error: " + err);
			});
			/*setTimeout(function(){
				rand = Math.random();
				setTimeout(function(){
					str += rand.toString();
					setTimeout(function(){
						res.end(str);
					})
				}, 500);
			}, 500);*/


			// res.write("Hello World");
			// res.end(Math.random().toString());
		} else {
			res.writeHead(403);
			res.end("Get outta Here");
		}
	} else {
		res.writeHead(403);
		res.end("Get outta Here");
	}

}

var host = "localhost";
var port = "8006";

var http = require("http");
var http_serv = http.createServer(handleHTTP).listen(port,host);

var ASQ = require("asynquence");
require("asynquence-contrib");
function handleHTTP(req, res) {

	if (req.method === "GET") {
		if (/^\/\d+(?=$|[\/?#])/.test(req.url)) {
			req.addListener("end", function() {
				req.url = req.url.replace(/^\/(\d+).*$/,"/$1.html");
				static_files.serve(req,res);
			});
			req.resume();
		} else {
			res.writeHead(403);
			res.end("Get outta Here");
		}
	} else {
		res.writeHead(403);
		res.end("Get outta Here");
	}

}

function handleIO(socket) {
	function disconnect() {
		clearInterval(intv);
		console.log("Client Disconnected");
	}

	console.log("Client COnnected");

	var intv = setInterval(function() {
		socket.emit("hello", Math.random());
	}, 1000);

	socket.on("disconnect", disconnect);
}

var host = "localhost";
var port = "8006";

var http = require("http");
var http_serv = http.createServer(handleHTTP).listen(port,host);

var ASQ = require("asynquence");
require("asynquence-contrib");

var node_static = require("node-static");
var static_files = new node_static.Server(__dirname);

var io = require("socket.io").listen(http_serv);

io.on("connection", handleIO);

io.configure(function() {
	io.enable("browser client minification");
	io.enable("browser client etag");	// apply etag caching
	io.set("log level", 1);		// reduce logging
	io.set("transports", [
		"websocket",
		"xhr-polling",
		"jsonp-polling"
		]);
});
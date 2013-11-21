//Require HTTP module (to start server) and Socket.IO
var http = require('http'), io = require('socket.io');
var fs = require('fs');

//Start the server at port 8080
var server = http.createServer(function(req, res){ 
	fs.readFile(__dirname + '/socketServer.html', function(err, data) {
		// Send HTML headers and message
		res.writeHead(200,{ 'Content-Type': 'text/html' }); 
		res.end(data);
	});
});
server.listen(5001);

//Create a Socket.IO instance, passing it our server
var socket = io.listen(server);

//Add a connect listener
socket.on('connection', function (socket) {
	socket.emit('news', { hello: 'world' });
	socket.on('my other event', function (data) {
		console.log(data);
	});
});
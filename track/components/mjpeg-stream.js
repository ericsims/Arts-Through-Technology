
var express = require('express');
var app = express();

var content;
var stop = false;

app.get('/', function(request, response) {
	response.send('AR.Drone Image Processing:\
			<br/>\
			<img src=im.mjpeg width=100% heigth=100%>\
			<br/>\
			<a href=im.mjpeg>im.mjepg</a>');
	stop = false;
});

app.get('/im.mjpeg', function(request, res) {
	res.writeHead(200, {
		'Content-Type': 'multipart/x-mixed-replace; boundary=myboundary',
		'Cache-Control': 'no-cache',
		'Connection': 'close',
		'Pragma': 'no-cache'
	});

	var i = 0;

	res.connection.on('close', function() {
		stop = true;
	});

	var send_next = function() {
		if (stop || !content)
			return;
		res.write("--myboundary\r\n");
		res.write("Content-Type: image/jpeg\r\n");
		res.write("Content-Length: " + content.length + "\r\n");
		res.write("\r\n");
		res.write(content, 'binary');
		res.write("\r\n");
		setTimeout(send_next, 100);
	};
	send_next();
});

exports.update = function update(img){
	if(!content)
		console.log("Image server running")
	content = img;
};

var port = 5000;

app.listen(port, function() {
	console.log("Listening on " + port);
});
require('js-yaml');

var fs = require('fs');

var ardrone = require('ar-drone');
var vapix = require('vapix');
var sys = require("sys");
var exec = require('child_process').exec;

var settings = require('./track/config/settings.yaml');
var detection = require('./track/components/detection');
var actions = require('./track/components/actions');

var stdin = process.openStdin();
var target = -1;
var follow = false;
var localize = false;
var streamSource = 'ardrone';

process.argv.forEach(function (val, index, array) {
	if( index == 2 ){
		target = val;
	}
});
if(target < 0){
	console.log('Please set a target number!');
}

if(settings.debug){
	console.log('settings.ardrone.ip1: ' + settings.ardrone.ip1);
}

var client = ardrone.createClient({ip: settings.ardrone.ip1});
client.config('control:altitude_max', 1000);
var pngStream = client.getPngStream();
var camera = new vapix.Camera({
	address: settings.camera.ip,
	port: settings.camera.port,
	username: settings.camera.username,
	password: settings.camera.password
});
var mjpg;
/*exec("ping -c 3 " + settings.camera.ip, function (error, stdout, stderr) {
	if(stdout.indexOf("0% packet loss") != -1){
		console.log('network camera found');
		mjpg = camera.createVideoStream({
			resolution: settings.camera.resolution,
			compression: settings.camera.compression,
			fps: settings.camera.fps
		});
	} else {
		console.log('network camera NOT found!!!');
	}
});*/

pngStream.on('data', function(data){
	if(streamSource == 'ardrone'){
		var XYZ = detection.readImage(data, settings, target, true);
		if(XYZ && follow){
			if(XYZ[0] != -1 && XYZ[1] != -1 && XYZ[2] != -1){
				if(settings.debug){
					console.log(XYZ);
				}
				actions.centerTarget(XYZ, settings, client);
			} else {
				console.log('stop');
				client.stop();
			}
		}
	}
});

if(mjpg){
	mjpg.on('data', function(data) {
		if(streamSource == 'vapix'){
			var XYZ = detection.readImage(data, settings, target, false);
			if(XYZ && follow){
				if(XYZ[0] != -1 && XYZ[1] != -1 && XYZ[2] != -1){
					if(settings.debug){
						console.log(XYZ);
					}
					actions.centerTarget(XYZ, settings, client);
				} else {
					console.log('stop');
					client.stop();
				}
			}
		}
	});
}

stdin.addListener("data", function(data) {
	data = data.toString().substring(0, data.length-1);
	console.log("you entered: [" + data + "]");
	if(data == 'takeoff'){
		takeoff();
	} else if(data == 'land'){
		land();
	} else if(data == 'calibrate'){
		actions.calibrate(client);
	} else if(data == 'hover'){
		actions.hover(client);
	} else if (data.indexOf('set streamSource') != -1) {
		streamSource = data.substring(17);
		console.log('steamSource is now: ' + streamSource);
	} else if (data.indexOf('set target') != -1) {
		target = parseInt(data.substring(10))
		console.log('target is now: ' + target);
	} else if (data == 'start track') {
		if (target > -1){
			follow = true;
			console.log('tracking started');
		} else {
			console.log('target not defined!');
		}
	} else if (data == 'stop track') {
		follow = false;
		console.log('tracking stopped');
	} else if (data == 'exit') {
		process.exit();
	}
});

function takeoff(){
	client.takeoff();
}
function land(){
	client.stop();
	client.land()
}


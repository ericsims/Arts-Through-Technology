require('js-yaml');


var sys = require("sys");
var exec = require('child_process').exec;

var settings = require('./track/config/settings.yaml');
var detection = require('./track/components/detection');

var film = require('film');

var camera = film(videoElement, canvasElement)

camera.snapshot();

camera.on('snapshot', function(data){
	console.log(data);
});

imageStream.on('data', function(data){
	//var XYZ = detection.readImage(data, settings, target, true);
	//if(XYZ){
	//	console.log(XYZ);
	//}
	console.log(data);
});
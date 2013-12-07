require('js-yaml');

var ffmpeg = require('fluent-ffmpeg');

var sys = require("sys");
var exec = require('child_process').exec;

var settings = require('./track/config/settings.yaml');
var detection = require('./track/components/detection');


var XYZ = detection.readImage("./frames/tn_0.36s.jpg", settings, 0, false);
if(XYZ){
	console.log(XYZ);
}

/*
var proc = new ffmpeg({ source: './out.avi' })
.withSize('640x360')	
.takeScreenshots(5, './frames', function(err, filenames) {
	if(err){
		throw err;
	}
	console.log(filenames);
	console.log('screenshots were saved');
});*/
var cv = require('opencv');
var PNG = require('png.js');
var draw = require('./draw');
//var http = require('http');
//var server = require('./mjpeg-stream');

exports.readImage = function readImage(data, settings, index){
	cv.readImage(data, function(err, im){
		points = exports.cvProcess(err, im, settings);
	});
	return points;
};

exports.cvProcess = function cvProcess(err, im_orig, settings) {
	var big = im_orig.copy();
	var im = im_orig.copy();

	if(settings.opencv.saveFiles){
		im.save('./matrix.png');
		if(settings.debug)
			console.log('matrix.png saved');
	}

	im.inRange(settings.opencv.lowThresh, settings.opencv.highThresh);

	if(settings.opencv.saveFiles){
		im.save('./color.png');
		if(settings.debug)
			console.log('color.png saved');
	}

	im.canny(settings.opencv.canny);
	im.dilate(settings.opencv.nIters);

	if(settings.opencv.saveFiles){
		im.save('./canny.png');
		if(settings.debug)
			console.log('canny.png saved');
	}

	var contours = im.findContours();

	if(settings.debug){
		console.log('found contours: ' + contours.size());
		console.log('settings.targetx.minArea: ' + target.minArea);
	}

	if (contours.size() > 0)
		big.drawAllContours(contours, settings.WHITE);

	if(settings.opencv.saveFiles){
		big.save('./big.png');
		if(settings.debug)
			console.log('big.png saved');
	}

	//server.update(big.toBuffer());

	return points;
};

function getCenter(x, y, width, height, settings) {
	var center_x = x + width/2;
	var center_y = y + height/2;
	return [center_x, center_y];
}
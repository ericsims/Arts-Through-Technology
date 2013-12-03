exports.calibrate = function calibrate(client){
	if(client){
		client.ftrim();
		client
		.after(5000, function() {
			client.takeoff();
		})
		.after(5000, function() {
			this.calibrate(0);
		})
		.after(5000, function() {
			this.stop();
			this.land();
		});
	} else {
		console.log('not connected!');
	}
}

exports.hover = function hover(client){
	if(client){
		client
		.after(100, function() {
			client.takeoff();
		})
		.after(30000, function() {
			this.stop();
			this.land();
		});
	} else {
		console.log('not connected!');
	}
}

exports.centerTarget = function centerTarget(cordinates, settings, client){
	if(client){
		x_center = settings.opencv.width / 2;
		y_center = settings.opencv.height / 2;

		LR = cordinates[0] - x_center;
		FB = cordinates[2];
		if(FB > 2) {
			process.stdout.write('front\t\t');
			client.front(settings.ardrone.FBSpeed);
		} else if(FB < 1.5) {
			process.stdout.write('back\t\t');
			client.back(settings.ardrone.FBSpeed);
		} else {
			process.stdout.write('FB center\t\t');
			client.stop();
		}
		if(LR < -25) {
			process.stdout.write('left\n');
			client.counterClockwise(settings.ardrone.turnSpeed);
			client.left(settings.ardrone.LRSpeed);
		} else if(LR > 25) {
			process.stdout.write('right\n');
			client.clockwise(settings.ardrone.turnSpeed);
			client.right(settings.ardrone.LRSpeed);
		} else {
			process.stdout.write('LR center\n');
			client.stop();
		}
	} else {
		console.log('not connected!');
	}
}

exports.setDronePosition = function setDronePosition(cordinates, settings, client){
	if(client){
		x_center = settings.opencv.width / 2;
		y_center = settings.opencv.height / 2;

		LR = cordinates[0] - x_center;
		UD = cordinates[1] - y_center;
		FB = cordinates[2];
		if(LR < -25) {
			process.stdout.write('Up\t\t');
			client.up(settings.ardrone.UDSpeed);
		} else if(LR > 25) {
			process.stdout.write('Down\t\t');
			client.down(settings.ardrone.UDSpeed);
		} else {
			process.stdout.write('UD center\t\t');
			client.stop();
		}
		if(LR < -25) {
			process.stdout.write('left\n');
			client.left(settings.ardrone.LRSpeed);
		} else if(LR > 25) {
			process.stdout.write('right\n');
			client.right(settings.ardrone.LRSpeed);
		} else {
			process.stdout.write('LR center\n');
			client.stop();
		}
	} else {
		console.log('not connected!');
	}
}
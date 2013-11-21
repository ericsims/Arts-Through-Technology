/**
 * Draw a rectangle around the detected contour
 *
 * @param Matrix im Matrix image to draw lines on
 * @param array contours Array of contours returned from canny.findContours
 * @param int index Index in array to draw
 * @param array Array of B,G,R int values of a color to draw with
 */
exports.drawBoundingRect = function(im, boundingRect, color) {
	var firstCorner =  [boundingRect.x, boundingRect.y];
	var secondCorner = [boundingRect.x + boundingRect.width, boundingRect.y];
	var thirdCorner =  [boundingRect.x, boundingRect.y + boundingRect.height];
	var fourthCorner = [boundingRect.x + boundingRect.width, boundingRect.y + boundingRect.height]

	im.line(firstCorner, secondCorner, color);
	im.line(secondCorner, fourthCorner, color);
	im.line(fourthCorner, thirdCorner, color);
	im.line(thirdCorner, firstCorner, color);
}

/**
 * Draw a ellipse on the center of a contour
 *
 * @param Matrix im Matrix image to draw lines on
 * @param array contours Array of contours returned from canny.findContours
 * @param int index Index in array to draw
 * @param array Array of B,G,R int values of a color to draw with
 */
exports.drawCenter = function(im, boundingRect, color, getCenter) {
	var center = getCenter(
		boundingRect.x,
		boundingRect.y,
		boundingRect.width,
		boundingRect.height
	);

	im.ellipse(center[0], center[1], 3, 3, color);
}
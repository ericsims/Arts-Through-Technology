var ffmpeg = require('fluent-ffmpeg');

var proc = new ffmpeg({ source: '/dev/video0' })
  .withAspect('4:3')
  .withSize('640x480')
  .applyAutopadding(true, 'white')
  .saveToFile('/path/to/your_target.avi', function(stdout, stderr) {
    console.log('file has been converted succesfully');
  });
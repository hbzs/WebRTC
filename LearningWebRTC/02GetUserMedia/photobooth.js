var video = document.querySelector('video');
var canvas = document.querySelector('canvas');
var streaming = false;

navigator.mediaDevices.getUserMedia({
    video: true,
    audio: false
}).then(function(localMediaStream) {
    video.srcObject = localMediaStream;
    streaming = true;
}).catch(function(err) {
    console.log('error:' + err);
});

var filters = ['', 'grayscale', 'invert', 'sepia'];
var currentFilterIndex = 0;

document.querySelector('#capture').addEventListener('click', function(event) {
    if (streaming) {
        canvas.width = video.clientWidth;
        canvas.height = video.clientHeight;

        currentFilterIndex = (currentFilterIndex + 1) % 4;
        canvas.className = filters[currentFilterIndex];

        var ctx = canvas.getContext('2d');
        ctx.drawImage(video, 0, 0);

        ctx.fillStyle = 'white';
        ctx.fillText('hbzs', 50, 100);
    }
});
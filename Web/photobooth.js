function hasUserMedia() {
    return !!(navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia);
}

if (hasUserMedia()) {
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

    var video = document.querySelector('video'),
        canvas = document.querySelector('canvas'),
        streaming = false;

    navigator.getUserMedia({
        video: true,
        audio: false
    }, function(stream) {
        video.src = window.URL.createObjectURL(stream);
        streaming = true;
    }, function(error) {
        console.log("Capturing Error:", error);
    });

    document.querySelector('#capture').addEventListener('click', function(event) {
        if (streaming) {
            canvas.width = video.clientWidth * 1.33;
            canvas.height = video.clientHeight * 1.33;

            var context = canvas.getContext('2d');
            context.drawImage(video, 0, 0);
        }
    });
} else {
    alert("Doesn't support getUserMedia");
}
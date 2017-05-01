/* jshint node: true */
/* jshint -W117 */
'use strict';

var constraints = {
    video: {
        mandatory: {
            minAspectRatio: 1.777,
            maxAspectRatio: 1.778
        },
        optional: [
            { maxWidth: 640 },
            { maxHeight: 480 }
        ]
    },
    audio: false
};

if (/Android|iOS|iPhone|iPad|webOS/i.test(navigator.userAgent)) {
    constraints = {
        video: {
            mandatory: {
                minWidth: 480,
                minHeight: 320,
                maxWidth: 1024,
                maxHeight: 768
            }
        },
        audio: false
    };
}

navigator.mediaDevices.getUserMedia(constraints)
    .then(function(localMediaStream) {
        var video = document.querySelector('video');
        video.srcObject = localMediaStream;
    })
    .catch(function(err) {
        console.log('raise an error when capturing:' + err);
    });

navigator.mediaDevices.enumerateDevices()
    .then(function(devices) {
        devices.forEach(function(device) {
            console.log(device.kind + ": " + device.label +
                " id = " + device.deviceId);
        });
    })
    .catch(function(err) {
        console.log(err.name + ": " + err.message);
    });

console.log('浏览器：' + adapter.browserDetails.browser);
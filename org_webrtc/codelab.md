# 用 WebRTC 实时通讯

## 1. 简介

WebRTC 是一个开源项目，要使 Web 和原生应用之间能进行音频、视频和数据的实时通讯。

WebRTC 有几个 JavaScript 的 API —— 点击链接查看示例：

* [`getUserMedia()`](https://webrtc.github.io/samples/src/content/getusermedia/gum/) ： 捕获音视频
* [`MediaRecorder`](https://webrtc.github.io/samples/src/content/getusermedia/record/) ： 录制音视频
* [`RTCPeerConnection`](https://webrtc.github.io/samples/src/content/peerconnection/pc1/) ： 用户间的音视频流
* [`RTCDataChannel`](https://webrtc.github.io/samples/src/content/datachannel/basic/) ： 用户间的数据流

### 我能在哪使用 WebRTC ？

在桌面版 Firefox、Opera 和 Chrome 以及 Android 中。WebRTC 也可用于 iOS 和 Android 的原生应用。

### 信令是什么？

WebRTC 不但使用 RTCPeerConnection 在浏览器之间进行数据流通信，而且需要一个机制来协调通信以及发送控制信息，这一进程被称作信令（signaling）。

WebRTC uses RTCPeerConnection to communicate streaming data between browsers, but also needs a mechanism to coordinate communication and to send control messages, a process known as signaling. Signaling methods and protocols are not specified by WebRTC. In this codelab we use Node, but there are [many alternatives](https://github.com/muaz-khan/WebRTC-Experiment/blob/master/Signaling.md).

### STUN 和 TURN 是什么？

WebRTC is designed to work peer-to-peer, so users can connect by the most direct route possible. However, WebRTC is built to cope with real-world networking: client applications need to traverse [NAT gateways](http://en.wikipedia.org/wiki/NAT_traversal) and firewalls, and peer to peer networking needs fallbacks in case direct connection fails. As part of this process, the WebRTC APIs use STUN servers to get the IP address of your computer, and TURN servers to function as relay servers in case peer-to-peer communication fails. ([WebRTC in the real world](http://www.html5rocks.com/en/tutorials/webrtc/infrastructure/) explains in more detail.)

### WebRTC 安全吗？

Encryption is mandatory for all WebRTC components, and its JavaScript APIs can only be used from secure origins (HTTPS or localhost). Signaling mechanisms aren't defined by WebRTC standards, so it's up to you make sure to use secure protocols.
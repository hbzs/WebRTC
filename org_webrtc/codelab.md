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

WebRTC 不但使用 RTCPeerConnection 在浏览器之间进行数据流通信，而且需要一个机制来协调通信以及发送控制信息，这一过程被称作信令（signaling）。信令的方法和协议不由 WebRTC 规定。在 codelab 中我们使用 Node，但其实有 [许多选择](https://github.com/muaz-khan/WebRTC-Experiment/blob/master/Signaling.md) 。

### STUN 和 TURN 是什么？

WebRTC 被设计成点对点的工作，因此用户之间可以尽可能的直接路由。然而，WebRTC 是构建在现实的网络环境中的：客户端程序需要 [穿透 NAT 网关](https://www.wikiwand.com/zh/NAT%E7%A9%BF%E9%80%8F) 和防火墙，且点对点网络一旦直连失败需要回退。在该过程中，WebRTC 的 API 使用 STUN 服务器来获取你计算机的 IP 地址，且TURN 服务器做为功能上作为轮换服务器，以防点对点交流失败。（[真实世界的 WebRTC](https://www.html5rocks.com/en/tutorials/webrtc/infrastructure/) 解释了更多细节）

### WebRTC 安全吗？

加密对所有 WebRTC 组件都是强制的，它的 JavaScript 的 API 只能用于安全的来源（HTTPS 或者 localhost）。信令的方式没有被 WebRTC 标准定义，因此它是依赖你来确保使用安全的接口。
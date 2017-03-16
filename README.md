# WebRTC

## 测试地址

* https://hbzs.github.io/WebRTC/Web/

## 知识点

* Web Real-Time Communication
* 特点
  * 基于浏览器的实时音视频（数据）通信技术
  * 免插件
  * 开源
    * 源码：https://chromium.googlesource.com/external/webrtc
    * 例子：https://github.com/webrtc
  * W3C 纳入标准：https://www.w3.org/2011/04/webrtc/
  * 跨平台、跨浏览器、跨移动应用（Mac／Windows／Linux／iOS／Android）

## 部分概念

* 服务器

  * 不需要服务端进行数据中转
  * 需要服务器
    * 信令通道
    * 穿越 NAT 和防火墙

* 信令
  * 控制通信开启或关闭的连接控制消息
  * 发生错误时用来彼此告知的消息
  * 媒体流元数据：解码器、解码器配置、带宽、媒体类型等
  * 用来建立安全连接的关键数据
  * 外界所看到的网络上的数据（IP 地址、端口等）

* ICE 协议框架：STUN、NAT、TURN、SDP，帮助 ICE 共同实现了 NAT/防火墙穿越

* SDP：Session Descriptor Protocol，会话描述协议

  * 描述多媒体连接内容的协议，例如分辨率、格式、编码、加密算法等
  * 本质上，描述内容的元数据并不是媒体流本身

## API

* MediaStream（getUserMedia）

  * API 通过设备的摄像头及话筒获得视频、音频的同步流

  * 功能

    * 抽象表示一个音频或者视频流

    * 可包含多个音视频记录

    * 通过 `navigator.getUserMedia()` 获取
      `navigator.getUserMedia(constraints, successCallback, errorCallback);`

      * `constraints`：约束对象控制 MediaStream 的内容（媒体类型、分辨率、帧率）
      * 调用成功，传递流对象／否则，传递错误对象

* RTCPeerConnection

  * 核心组件，用于构建点对点之间稳定、高效的流传输的组件
  * 功能
    * 信令处理
    * 编解码协商
    * 点对点传输
    * 通讯安全保护
    * 带宽管理（手机、PC 质量调节）

* RTCDataChannel
  * 使得浏览器之间（点对点）建立一个高吞吐量、低延时的信道，用于传输任意数据

## P2P 连接过程

1. A、B 连上服务器，建立 TCP 长连接（任意协议：WebSocket/MQTT/Socket 原生/XMPP，此处选择 WebSocket），获得信令通道
2. A 从 `ice server` （STUN Server）获取 `ice candidate` 并发送给 Socket 服务端，并生成包含 `session descriptor` （SDP）的 offer，发送给 Socket 服务端
3. Socket 服务端把 A 的 offer 和 `ice candidate` 转发给 B，B 会保存下 A 这些信息
4. B 发送包含自己的 `session descriptor` 的 `answer` （收到 offer，发送 answer，都是 SDP）和 `ice candidate` 给 Socket 服务端
5. Socket 服务端把 B 的 `answer` 和 `ice candidate` 给 A ，A 保存这些信息

## Web 实现部分细节

### MediaStream

* `video` 的 `autoplay ` 属性
* 旧版兼容：`var getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);`
* `video.src = window.URL.createObjectURL(localMediaStream);`
* `id` 属性来获得其唯一的标识，还可以通过`getAudioTracks()`和`getVideoTracks()`方法来获得流的追踪对象数组（没有开启的话为空数组）
* 约束对象（Constraints）: `video: true,audio: true` 等
* 文档：[MediaDevices.getUserMedia() - Web API 接口 | MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/MediaDevices/getUserMedia#浏览器兼容)

### RTCPeerConnection

* 文档：[RTCPeerConnection - Web API 接口 | MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/RTCPeerConnection)

### RTCDataChannel

* 除了音视频数据流之外的数据（字符、文件等）
* 建立在 `PeerConnection` 上的
* `channel = pc.createDataChannel("someLabel");`

## JSEP

* JavaScript Session Establishment Protocol

## 学习资料

- [即时通信 - 天镶的博客](http://lingyu.wang/#/category/即时通信) （主要）
- [iOS下音视频通信-基于WebRTC - 简书](http://www.jianshu.com/p/c49da1d93df4)
- [WebRTC/WebRTC入门教程.md at master · ChenYilong/WebRTC](https://github.com/ChenYilong/WebRTC/blob/master/WebRTC%E5%85%A5%E9%97%A8%E6%95%99%E7%A8%8B/WebRTC%E5%85%A5%E9%97%A8%E6%95%99%E7%A8%8B.md)
# 《Learning WebRTC》学习

## 基础知识

* 视频通信用户体验优化解决方案：减少丢包、断网恢复、及时响应用户网络变化等
  * 缺陷：需要安装相应插件或应用程序，技术费用和技术壁垒
* WebRTC 目标
  * 全都植入浏览器中，无需缴纳授权费
  * API 内建大量库和框架，解决实际问题，如：网络断开、数据丢失、NAT 穿透等
  * API 集成大量的技术，解决所有繁重的问题
    * 捕捉摄像头和麦克风
      * 检测设备可用性
      * 获取权限
      * 与设备建立连接
      * 从设备获取数据流
    * 音视频编解码
      * codec（多媒体数字信号编解码器）：将视频帧或音频声波分解成许多小数据块，再将它们压缩，便于快速传输；接收端解压
      * 内置的编解码器：H.264（有限支持：[WebRTC支持H264编解码 - 简书](http://www.jianshu.com/p/c33a905b17ff)）、Opus、iSAC、iLBC、VP8
    * 传输层
      * 处理数据包丢失、排序以及建立用户间的连接等问题
      * 轻松获知用户网络的波动，及时对连接状态的变化作出反应
    * 会话（session）管理
      * 信令（Signaling）：建立并管理多个连接
      * 数据传输：通过 RTCDataChannel API 暴露给 JavaScript 层
* WebRTC 标准：W3C（https://www.w3.org/TR/webrtc/） 和 IETF
* 浏览器支持情况：http://caniuse.com/#search=webrtc
  * 目前主要支持的有：Chrome、Firefox、Opera、Edge（EdgeHTML V15）、Android（V5）
* 支持的应用：点对点的连接程序都可以轻松扩展到 WebRTC（文件共享、文本聊天、多人游戏、货币流通等）
  * 低延迟、高性能连接（使用底层协议来提供高速性能）
  * 支持安全连接

## 获取用户媒体

### 访问媒体设备

* 过去浏览器：安装程序，基于 Flash、基于插件
* 通过 JavaScript 访问 MediaStream API
  * stream 对象：用以表示音频或视频形式的实时媒体流
  * 提供设备间切换的功能
  * 提供充分的安全保障：获得用户的访问许可
* `<video>` 元素包含 `autoplay` 属性，移除这个属性，不会自动播放
* 音频反馈现象可以关闭音频


### 限制视频捕捉

* 视频捕捉更复杂的约束限制及相关解释：https://www.w3.org/TR/mediacapture-streams/#constrainable-properties
* 流类型选择场景举例
  * 为了良好用户体验，选取参与视频呼叫用户的最小分辨率请求
  * 保持特定风格或品牌形象，设置特定的宽高
  * 受限的网络连接中限制视频流的分辨率来节省电力或带宽


### 多设备处理

* 循环处理多设备 ： [MediaDevices.enumerateDevices() - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/enumerateDevices)
* 设备信息： [MediaDeviceInfo - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/MediaDeviceInfo)

## 相关知识

* `!!`：将对象转换为布尔值判断对象是否为空
* `/* jshint -W117 */`：抑制代码规范警告
* video 占满：`object-fit: fill;`
* 添加事件类型（click、blur、drag…）：[Event reference | MDN](https://developer.mozilla.org/en-US/docs/Web/Events)
* prefix 相关
  * 检测 prefix 添加：[Autoprefixer CSS online – make your vendor prefixes is actual](https://autoprefixer.github.io/)
  * prefix 库：[postcss/autoprefixer: Parse CSS and add vendor prefixes to rules by Can I Use](https://github.com/postcss/autoprefixer)

## 其它信息

* Chrome：Webkit；Firefox：Moz；微软：MS
* a shim library：https://github.com/webrtc/adapter/
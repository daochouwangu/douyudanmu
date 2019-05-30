# douyudanmu

现已经支持[huya](https://github.com/daochouwangu/douyudanmu/blob/master/huyadanmu.js),[b站直播](https://github.com/daochouwangu/douyudanmu/blob/master/bilibilidanmu.js)
斗鱼弹幕助手，临时用
暂不支持全屏
暂不支持贵族弹幕

### 使用方式
1. 打开房间，切换到h5播放器，等右边弹幕区域加载好
2. 拷贝下方代码
3. 在浏览器（推荐chrome）中按F12打开控制台
4. 在console标签下输入下方代码
5. 回车
6. 再按F12关闭控制台

```
//使用MutationObserver监听DOM变化
var targetNode = document.getElementById('js-player-barrage');
var config = { attributes: false, childList: true, subtree: true };
var callback = function(mutationsList) {
    for(var mutation of mutationsList) {
	if(mutation.addedNodes[0]){
		send(mutation.addedNodes[0].querySelector(".Barrage-content"));
	}
    }
};
var observer = new MutationObserver(callback);
observer.observe(targetNode, config);
var wrapper = document.querySelector("#__h5player").children[3].children[1]
var startTime = 0
var MIN_TIME = 1000
var prevTop = 0
var FONT_SIZE = 50
var BEGIN_TOP = 70 
function send(danmu) {
	if(!danmu) return;
	var dom = danmu.cloneNode(true)
	var now = new Date()
  var clientWidth = wrapper.clientWidth
	dom.style.position = 'absolute'
	dom.style.zIndex = '10000'
	dom.style.transition = 'transform 7s linear'
	dom.style.transform = `translateX(${clientWidth}px)`
	dom.style.fontSize = '20px'
	dom.style.fontWeight = '800'
	if (!danmu.getAttribute('class').includes('color')){
		dom.style.color = '#fff'
		dom.style.textShadow = '#000 1px 0 0,#000 0 1px 0,#000 -1px 0 0,#000 0 -1px 0'
	}
	var top = BEGIN_TOP 
	if (startTime === 0 ) {
		startTime = now 
		prevTime = now 
	} else {
		if(now - startTime <= MIN_TIME) {
			top=prevTop + FONT_SIZE
			prevTop = prevTop + FONT_SIZE
		} else {
			top=BEGIN_TOP 
			prevTop = BEGIN_TOP 
			startTime = now
		}
	}
	dom.style.top = `${top}px`
	wrapper.append(dom)
	setTimeout(function(){dom.style.transform = 'translateX(-200px)'},0)
	setTimeout(function(){dom.remove()},7000)
}
```

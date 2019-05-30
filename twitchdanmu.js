//使用MutationObserver监听DOM变化
var targetNode = document.querySelectorAll('.simplebar-content')[3].firstChild;
var config = { attributes: false, childList: true, subtree: true };
var callback = function(mutationsList) {
  for(var mutation of mutationsList) {
    if(mutation.addedNodes[0]){
      (function(node){
        setTimeout(function(){send(node)},1000)
      })(mutation.addedNodes[0])
    }
  }
};
var observer = new MutationObserver(callback);
observer.observe(targetNode, config);
//建立一个放弹幕的容器
var wrapper = document.createElement('div')
document.body.append(wrapper)
//使用第一行弹幕的时间来控制弹幕的并发
var startTime = 0
var MIN_TIME = 1000
var prevTop = 0
var FONT_SIZE = 50	//弹幕的宽度
var BEGIN_TOP = 70 //弹幕离最上方的距离
function send(danmu) {
	if(!danmu) return;
  if(!danmu.getAttribute('class').includes('chat-line__message')) return;
	var dom = danmu.cloneNode(true)
	var now = new Date()
	dom.style.position = 'fixed'
	dom.style.zIndex = '10000'
	dom.style.transition = 'transform 7s linear'
	dom.style.transform = 'translateX(200px)'
	dom.style.fontSize = '20px'
	dom.style.fontWeight = '800'
  dom.style.color = '#fff'
  dom.style.textShadow = '#000 1px 0 0,#000 0 1px 0,#000 -1px 0 0,#000 0 -1px 0'
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
	dom.style.right='0'
	wrapper.append(dom)
	var clientWidth = document.body.clientWidth
	//弹幕滚动效果
	setTimeout(function(){dom.style.transform = `translateX(-${clientWidth}px)`},0)
	//垃圾回收
	setTimeout(function(){dom.remove()},7000)
}

var Index=0;
//把子页的路径写在数组里面
var subpages = ['game.html','nongfuZhuanqu.html','caiYuanShangCheng.html','shopList.html','geRenZhongXin.html'];
//所有的plus-*方法写在mui.plusReady中或者后面。
mui.plusReady(function() {
//获取当前页面所属的Webview窗口对象
var self = plus.webview.currentWebview();
for (var i = 0; i < 5; i++) {
//创建webview子页
var sub = plus.webview.create(
subpages[i], //子页url
subpages[i], //子页id
{
top: '44px',//设置距离顶部的距离
bottom: '50px'//设置距离底部的距离
}
);
//如不是我们设置的默认的子页则隐藏，否则添加到窗口中
if (i != Index) {
sub.hide();
}
//将webview对象填充到窗口
self.append(sub);
}
});
//当前激活选项
var activeTab = subpages[Index],title=document.querySelector(".mui-title");
//选项卡点击事件
mui('.mui-bar-tab').on('tap', 'a', function(e) {

//获取目标子页的id
var targetTab = this.getAttribute('href');
if (targetTab == activeTab) {
return;
}
//更换标题
title.innerHTML = this.querySelector('.mui-tab-label').innerHTML;
//显示目标选项卡
//plus.webview.getWebviewById(targetTab).reload();
plus.webview.show(targetTab);

//隐藏当前选项卡
plus.webview.hide(activeTab);
//更改当前活跃的选项卡
activeTab = targetTab;

});
window.addEventListener('refresh', function(e){//执行刷新
location.reload();
});


// mui('.mui-bar-tab').on('tap', 'a', function(e){
// 	
// });

var runFlag = true;//true响应请求,false不响应请求
mui('.mui-bar-tab').on('tap', 'a', function(e){
	if(runFlag){
		runFlag = false;
	}
});
setTimeout(function(){
	runFlag = true;
},(1000);

function heightToTop(ele){
    //ele为指定跳转到该位置的DOM节点
    let bridge = ele;
    let root = document.body;
    let height = 0;
    do{
        height += bridge.offsetTop;
        bridge = bridge.offsetParent;
    }while(bridge !== root)
    return height;
}
//按钮点击时
someBtn.addEventListener('click',function(){
    window.scrollTo({
        top:heightToTop(targetEle),

        behavior:'smooth'
    })
})

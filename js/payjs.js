var payType; //支付方式：200 微信支付， 310 到店支付
		var fromType; //代表从哪里过来的
		var orderNbr; // 订单号
		var orderId; // 订单id
		var orderPrice; // 订单价格
		var orderName; // 订单价格
		var projectId; // 项目id
		var serviceType; // 服务类型
		var merchantId; // 商家id
		var parentId;
//实现
mui.plusReady(function() {
			var self = plus.webview.currentWebview();
			fromType = self.fromType;
			orderNbr = self.orderNbr;
			orderId = self.orderId;
			orderPrice = self.orderPrice;
			orderName = self.orderName;
			projectId = self.projectId;
			serviceType = self.serviceType;
			merchantId = self.merchantId;
			parentId = self.parentId;
			// 设置展示数据
			document.getElementById('order-price').innerHTML = '¥' + orderPrice;
			document.getElementById('pay-price').innerHTML = '¥' + orderPrice;
			/*
			 * 获取支付通道
			 */
			plus.payment.getChannels(function(channels) {
				for (var i in channels) {
					var channel = channels[i];
					pays[channel.id] = channel;
					checkServices(channel); //检测是否安装支付服务
					console.log('======安的支付服务=====' + channel.id)
				}
			}, function(e) {
				mui.toast("获取支付失败");
			});
			//选择支付模式
			radioOnChange();
		});
//赋值
document.getElementById('wxpay').addEventListener('tap', function() {
			this.querySelector('input').checked = true;
			payType = '200';
			//			console.log("payType"+payType);
		});
		document.getElementById('ddpay').addEventListener('tap', function() {
			this.querySelector('input').checked = true;
			payType = '310';
			//			console.log("payType"+payType);
		});
//选择支付方式
function radioOnChange() {
			var payRadio = document.getElementsByName("radio1");
			for (var i = 0; i < payRadio.length; i++) {
				if (payRadio[i].checked) {
					payType = payRadio[i].value;
					console.log('====支付方式payType=====' + payType)
				}
			}
		}
//支付
function pay(id) {
			if (w) {
				return;
			} //检查是否请求订单中
			var url = PAYSERVER;
			if (mui.os.ios) {
				systemtype = 'IOS';
			}
			if (wxappid == 'wx741484d992c17831') {
				url += 'orderSn=' + orderNbr + '&cMerchantId=' + MERCHANTID + '&type=' + systemtype + '&payType_appId=2';
			} else {
				url += 'orderSn=' + orderNbr + '&cMerchantId=' + MERCHANTID + '&type=' + systemtype;
			}
			w = plus.nativeUI.showWaiting();
			// 请求支付订单
			var xhr = new XMLHttpRequest();
			xhr.open('GET', url);
			console.log("请求支付订单：" + url)
			xhr.send();
			xhr.onreadystatechange = function() {
				switch (xhr.readyState) {
					case 4:
						w.close();
						w = null;
						if (xhr.status == 200) {
							var data = xhr.responseText;
							console.log("-----请求订单成功-----" + data)
							var prepayid = JSON.parse(data).data.prepayId; //商户订单号
							var timestamp = new Date().getTime(); //当前时间戳
							if (mui.os.ios) {
								timestamp = parseInt(timestamp / 1000);
							}
							var noncestr = generateMixed(16); //16位随机字符串
							var signStr = "appid=" + wxappid + "&noncestr=" + noncestr + "&package=" + "Sign=WXPay" + "&partnerid=" + wxpartnerid + "&prepayid=" + prepayid + "&timestamp=" + timestamp + "&key=" + partnerKey;
							var sign = hex_md5(signStr).toUpperCase(); //生成签名
							var order = '{"appid":"' + wxappid + '","noncestr":"' + noncestr + '","package":"Sign=WXPay","partnerid":"' + wxpartnerid + '","prepayid":"' + prepayid + '","timestamp":' + timestamp + ',"sign":"' + sign + '"}';

							plus.payment.request(pays[id], order, function(result) {
								plus.nativeUI.alert("支付成功", function() {
									orderQueryStatus('0');
									//									back();
								}, "支付");
							}, function(e) {
								//								orderQueryStatus('-1');
								plus.nativeUI.alert("支付失败", null, "支付失败"); // + e.code+e.message
							});
						} else {
							plus.nativeUI.alert("获取订单信息失败！", null, "支付");
						}
						break;
					default:
						break;
				}
			}
		}
//成功或失败返回的状态
function orderQueryStatus(wxCode) {
			var URL_PAY = SERVER_URL + 'wxpay/order/cartOrderQuery.do';
			mui.ajax(URL_PAY, {
				data: {
					orderSn: orderNbr, //730348977370697729订单号
					cMerchantId: MERCHANTID,
					wx_errcode: wxCode,
					type: systemtype
				},
				dataType: 'json',
				type: 'post',
				timeout: 10000,
				success: function(data) {
					/*
					 * 跳到我的订单
					 */
					goMyOrder();
				},
				error: function(xhr, type, errorThrown) {
					mui.toast('网络异常，请稍后再试！');
				}
			});
		}
//我的订单里付款
function updatePayStatusByOrderid() {
			var URL_1 = SERVER_URL + 'updateOrderPayStatusById.do';
			mui.ajax(URL_1, {
				data: {
					orderId: orderId, // 订单号
					payStatus: payType
				},
				dataType: 'json',
				type: 'post',
				timeout: 10000,
				success: function(data) {
					if (data.status == 100) {
						if (payType == 310) {
							if (plus.webview.getWebviewById(parentId)) {
								plus.webview.getWebviewById(parentId).reload();
							}
							if (plus.webview.getWebviewById('order-detail')) {
								plus.webview.getWebviewById('order-detail').close();
							}
							plus.webview.currentWebview().close();
						}
					} else {
						mui.toast(data.msg);
					}
				},
				error: function(xhr, type, errorThrown) {
					mui.toast('网络异常，请稍后再试！');
				}
			});
		}
//跳转到我的订单
function goMyOrder() {
			if (plus.webview.getWebviewById('../order/order-main.html')) {
				mui.fire(plus.webview.getWebviewById('../order/order-main.html'), 'refersh');
				plus.webview.currentWebview().close();
			} else {
				mui.openWindow({
					id: '../order/order-main.html',
					url: '../order/order-main.html',
					waiting: {
						autoShow: true
					}
				});
			}
		}
//返回事件
		mui.back = function() {
			if (fromType != '') {
				// 从我的订单进来
				plus.webview.currentWebview().close();
			} else {
				// 购物车或立即预约，提示订单已经生成
				var btnArray = ['确定', '取消'];
				mui.confirm('\n订单已经生成可以在订单管理查看\n', '', btnArray, function(e) {
					if (e.index == 0) {
						// 确定
						goMyOrder();
					} else {
						// 取消
						var cartOrderView = plus.webview.getWebviewById('cart-order');
						if (cartOrderView) {
							cartOrderView.close();
						}
						var orderView = plus.webview.getWebviewById('order');
						if (orderView) {
							orderView.close();
						}
						plus.webview.currentWebview().close();
					}
				});
			}
		}

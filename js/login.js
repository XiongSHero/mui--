$(function(){
	$('#yanzheng').css('background', '#ccc');
	$('#loginBtn').css('background', '#ccc');
	var result = {
			status: false,
			msg: ''
		};
	function getUserIfo(){
		return {
			userphone:$.trim($('[name="userPhone"]').val()),
			validate:$.trim($('[name="validate"]').val()),
		};
	}
	$('#userPhone').on('input', function(){
		var data = getUserIfo();
		if(/^1\d{10}$/.test(data.userphone)){
			$('#yanzheng').css('background', '#fc0');
			$('#userPhone').blur();
		}else{
			$('#yanzheng').css('background', '#ccc');
		}
	});

	app.duanxinyanzheng(function(){
		// 发送验证码请求
	});
	// 手机号、验证码验证通过，改变登录按钮的颜色
	$('#yanzhengma').on('input', function(){
		var data = getUserIfo();
		if(/^1\d{10}$/.test(data.userphone) && data.validate.length === 4){
			$('#loginBtn').css('background', '#fc0');
		}else{
			$('#loginBtn').css('background', '#ccc');
		}
	});
	// 预加载主页面和我的界面
	mui.plusReady(function(){
		var index = null;
		mui.preload({
				url: 'index.html',
				id: 'index.html',
				extras: {id: '2222'}
			});
			$('#loginBtn').on('tap',function(e){
				// e.preventDefault();
				var data = getUserIfo();
				if(!/^1\d{10}$/.test(data.userphone)){
					result.msg = '请输入合法手机号';
					mui.toast(result.msg);
					return;
				}
				if(data.validate.length !== 4){
					result.msg = '请输入正确的验证码';
					mui.toast(result.msg);
					return;
				}
				
				
				if(/^1\d{10}$/.test(data.userphone) && data.validate.length === 4){
					setTimeout(function(){
						$('#yanzhengma').blur();
					},20)
					// 发送登录请求
					sendAjax();
					var user = {
						id: 'aaa111',
						phone: 13343583390,
						imgUrl: 'images/wode/wode.png',
						account: 0,
						setStateBar: true
					};
					if(index === null){
						index = plus.webview.getWebviewById('index.html')
					}
					mui.fire(index, 'index', user);
					mui.openWindow({
						url: 'index.html',
						id: 'index.html',
						show: {
							autoShow: true,//页面loaded事件发生后自动显示，默认为true
							aniShow: 'slide-in-right',//页面显示动画，默认为”slide-in-right“；
							duration: 300//页面动画持续时间，Android平台默认100毫秒，iOS平台默认200毫秒；
						}
					})
				}
			});
	});
	
	
		function sendAjax(url ,data){
			/* $.ajax({
						url:url,
						type:'post',
						data: data,
						beforeSend:function(){
			
							This.html('正在登录中...');
			
						},
						success:function(result){
							
							if(result.success){
			
								This.html('登录成功');
			
								setTimeout(function(){
			
									if(localStorage.getItem('returnUrl')){
			
										location.href = localStorage.getItem('returnUrl');
			
										localStorage.removeItem('returnUrl');
			
									}else{
			
										location.href = "user.html";
			
									}
									
			
								},2000)
			
							}else{
			
								This.html('登录');
			
								mui.toast(result.message);
			
							}
			
						},
						error:function(error){
							console.log(error)
						}
					}) */
		}
});
$(function(){
	var result = {
			status: false,
			msg: ''
		};
	function getUserIfo(){
		return {
			userphone:$.trim($('[name="userPhone"]').val()),
			password:$.trim($('[name="password"]').val()),
		};
	}
	$('#userPhone').on('input', function(){
		var data = getUserIfo();
		if(/^1\d{10}$/.test(data.userphone)){
			$('#userPhone').blur();
		}
	});
	$('#loginBtn').on('tap', function(e){
		if(!/^1\d{10}$/.test(getUserIfo().userphone)){
			result.msg = '请输入正确的手机号';
			mui.toast(result.msg);
		}else if(getUserIfo().password === ''){
			result.msg = '请输入密码';
			mui.toast(result.msg);
		}else{
			// 发送登录请求
			mui(this).button('loading');
			// 请求成功后，重置按钮
			// mui(this).button('reset');
			
		}
	});
});
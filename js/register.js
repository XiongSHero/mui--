$(function(){
	$('#yanzheng').css('background', '#ccc');
	$('#regBtn').css('background', '#ccc');
	function getUserInfo(){
		return{
			userphone: $.trim($('[name="userPhone"]').val()),
			username:$.trim($('[name="username"]').val()),
			password:$.trim($('[name="password"]').val()),
			yanzhengma:$.trim($('[name="validate"]').val())
		}
	}
	
	// 手机号验证通过，改变验证和注册按钮的颜色
	$('#userPhone').on('input', function(e){
		var userInfo = getUserInfo();
		if(/^1\d{10}$/.test(userInfo.userphone)){
			this.blur();
			$('#yanzheng').css('background', '#fc0');
			$('#regBtn').css('background', '#fc0');
		}
	});
	// 验证码的倒计时以及请求
	app.duanxinyanzheng(function(){
		// 发送验证码请求
		mui.toast(3242)
	});
	function infoValidate(userInfo){
		var data = {
			status: false,
			msg: ''
		};
		if(!/^1\d{10}$/.test(userInfo.userphone)){
			data.msg = '请输入正确的手机号';
			return data;
		}
		if(userInfo.username.length < 3){
			data.msg = '昵称须多于2个字';
			return data;
		}
		if(userInfo.password.length < 6){
			data.msg = '密码长度须大于5';
			return data;
		}
		if(userInfo.yanzhengma.length !== 4){
			data.msg = '验证码的长度须为4';
			return data;
		}
		data.status = true;
		return data;
	}
	
// 	var id = setInterval(function(){
// 		var userInfo = getUserInfo();
// 		var userValidate = infoValidate(userInfo);
// 		if(userValidate.status){
// 			$('#regBtn').css('background', '#fc0');
// 			clearInterval(id);
// 		}
// 	},20);
	$('#regBtn').on('tap',function(){
		var userInfo = getUserInfo();
		var userValidate = infoValidate(userInfo);
		if(!userValidate.status){
			mui.toast(userValidate.msg);
		}else{
			// 请求注册
			//注册成功跳转至登录页面
			mui.openWindow({
				url: 'login.html',
				id: 'login.html',
				show: {
					aniShow: 'pop-in'
				}
			})
		}
	});
});
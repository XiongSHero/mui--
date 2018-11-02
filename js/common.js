$(function () {

	// 页面滚动区域
	mui('.mui-scroll-wrapper').scroll({
		deceleration: 0.0005
	});

	//页面跳转事件
	mui('body').on('tap', 'a', function() {
		var href = this.getAttribute('href');
				
		//非plus环境，直接走href跳转
		if(!mui.os.plus) {
			location.href = href;
			return;
		}
		
		var id = this.getAttribute("data-wid");
		if(!id) {
			id = href;
		}
		if(href && ~href.indexOf('.html')) {
			//打开窗口的相关参数
			var options = {
				waiting: {autoShow: false},
					};
			//打开新窗口
			mui.openWindow({
				url:href,
				id: id,
				options: options
			});
		}
			console.log(href)
	});
});


(function(mui, owner){
	// 获取地址栏参数
	owner.getParamsByUrl = function(url, name) {
	
		var params = url.substr(url.indexOf('?') + 1).split('&');
	
		for (var i = 0; i < params.length; i++) {
	
			var param = params[i].split('=');
	
			if (param[0] == name) {
	
				return param[1];
	
			}
	
		}
		return null;
	};
	/* 获取验证码 */
	owner.duanxinyanzheng = function (callback){
		var flag = true;
		$('#yanzheng').on('tap', function(e){
			var data =$.trim($('[name="userPhone"]').val());
			if(flag && /^1\d{10}$/.test(data)){
				var m = 10, that = this;
				this.innerHTML = m + 's后重发';
				$('#yanzheng').css('background', '#ccc');
				clearInterval(timer);
				var timer = setInterval(function(){
					m--;
					if(m === 0){
						m = '获取验证码';
						clearInterval(timer);
						$('#yanzheng').css('background', '#fc0');
						flag = true;
					}
					that.innerHTML = isNaN(m) ? m : (m + 's后重发');
				},1000);
				flag = false;
			}
			if(!/^1\d{10}$/.test(data)){
				mui.toast('请输入合法手机号');
			}
			if(!flag){
				if (callback) callback();
			}
		});
	}
		/**
		 * 获取当前状态
		 **/
	owner.getState = function () {
		var stateText = localStorage.getItem('$state') || "{}";
		return JSON.parse(stateText);
	};
	
		/**
		 * 设置当前状态
		 **/
	owner.setState = function (state) {
		state = state || {};
		localStorage.setItem('$state', JSON.stringify(state));
	};
	
	owner.createState = function(name, callback) {
		var state = owner.getState();
		state.account = name;
		state.token = "token123456789";
		owner.setState(state);
		return callback();
	};
	
})(mui, window.app={});
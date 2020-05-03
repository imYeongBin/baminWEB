(function(angular, mz) {

	// �ㅼ븘濡� & �ㅼ씠踰꾩궗��
	mz.comm.factory('naver', mz.mold(function(co) {
		var log = co.get('logger').getLogger('naver');
		var http = co.get('http');
		var layerPop = co.get('layerPop');
		var systemPop = co.get('systemPop'); 
		var $timeout = co.get('$timeout');
		var loading = co.get('loading');
		var promise = co.get('promise');
		var o = {}; 
		
		function dimmed(){
			jQuery("body").append('<div id="dc_overlay" style="z-index:100000;position:fixed; '+
					'width:100%; height:100%; top:0px; left:0px; background-color:black; opacity:0.1">');
		};
		function removeDim(){
			jQuery("#dc_overlay").remove();
		};
		
		o.progress = function(callback) {
			$timeout(function() {
				http.post('f.cg.he.co.cc.o.cco.NaverSignCCo.getProgress', {}, false).then(function(rsHttp) {
					if(rsHttp && rsHttp.body) {
						var progress = rsHttp.body.naverProgress || '';
						var type = rsHttp.body.type || '';
						var message = rsHttp.body.naverProgressMessage || '';
						if(progress == 'NAC' || progress == 'NAI') {							// �ㅼ씠踰� 蹂몄씤�몄쬆 痍⑥냼
							if(!message) message = '';
							removeDim();
							layerPop.alert(message);
							} else if(progress == 'NAF') {
							// �ㅼ씠踰� 蹂몄씤�몄쬆 �ㅽ뙣
							if(!message) message = '';
							removeDim();
							layerPop.alert(message);
						} else if(progress == 'NSC' || progress == 'NSI') {
							// �ㅼ씠踰� �꾩옄�쒕챸 痍⑥냼
							if(!message) message = '';
							removeDim();
							layerPop.alert(message);
						} else if(progress == 'NSF') {
							// �ㅼ씠踰� �꾩옄�쒕챸 �ㅽ뙣
							if(!message) message = '';
							removeDim();
							layerPop.alert(message);
						} else if(progress == 'NA') {
							var customer = rsHttp.body.naverAuthCustomer;
							callback({rsl:'1', customer:customer, naverProgress:progress, type:type});
						} else if(progress == 'NL' || progress == 'NS') {
							callback({rsl:'1', naverProgress:progress});
						}
					}
				});
			}, 1000);
		};

		o.retrieveNaverCertificate = function(param, callback) {
			/*http.post('f.cg.he.co.cc.o.cco.NaverSignCCo.retrieveNaverCertificate', param, false).then(function(rsHttp) {
				callback();
			});*/  

			http.post('f.cg.he.co.cc.o.cco.NaverSignCCo.retrieveNaverCertificate', param, false).then(function(rsHttp) {
				if(rsHttp && rsHttp.body.nvrSgnYn != undefined) {
					callback(rsHttp);
				}else{
					callback({nvrSgnYn:false, rsHttp:rsHttp});
				}

			});
			
		};
		
		//�ㅼ씠踰� �꾩씠�� 濡쒓렇��
		o.login = function(param, callback) {
			var path = param.path;
			var url = window.location.protocol + '//' + window.location.host + "/solution/naver/lgin.do?path=" + path;
			var naverWindow = systemPop.open(url, '�ㅼ씠踰꾨줈洹몄씤', {}, {});
			 
			var interval = window.setInterval(function() {
				if(naverWindow == null || naverWindow.closed) {
					window.clearInterval(interval);
					naverWindow = null;
					
					// naver login �뺤씤
					http.post('f.cg.he.co.cc.o.cco.NaverSignCCo.getStatus', {}, false).then(function(rsHttp) {
						if(rsHttp && rsHttp.body) {
							var naverLogin = rsHttp.body.naverLogin;

							if(!naverLogin) { 
								removeDim();
								layerPop.alert("�ㅼ씠踰� �꾩씠�� 濡쒓렇�몄뿉 �ㅽ뙣�섏��듬땲��.");

							} else {

								callback(rsHttp.body);

							}
						}

					});
				}
			},500);
		};
		
		o.auth = function(param, callback) {
			var callbackPageUrl = window.location.protocol + '//' + window.location.host + "/solution/naversign/auth.do";
			var input = {
					callbackPageUrl: callbackPageUrl
			};
			http.post('f.cg.he.co.cc.o.cco.NaverSignCCo.handleAth', input, false).then(function(rsHttp) {
				var resultCode = rsHttp.body.resultCode;
				if(resultCode == '200') {
					var url = rsHttp.body.data.pollingPageUrl;
					
					
					removeDim();
					var startMsg = "�ㅼ씠踰꾩씤利앹쓣 �쒖옉�섍쿋�듬땲��.";
					startMsg +="<br>";
					startMsg +="�앹뾽 李⑤떒 ��, �앹뾽 �덉슜 �� �ㅼ떆 �쒕룄�댁＜�몄슂.";
					layerPop.alert(startMsg).then(function(data) {
						dimmed();
						
						$timeout(function() {
							var naverWindow = systemPop.open(url, 'naverSign', {}, {});

							var interval = window.setInterval(function() {
								if(naverWindow == null || naverWindow.closed) {
									window.clearInterval(interval);
									naverWindow = null;
									 
									o.progress(callback);
								}
							},500); 
						},200);

					});
				} else {
					if(rsHttp.body.data && rsHttp.body.data.rtnMsg && rsHttp.body.data.rtnMsg == 'invalid_param') {
						var msg = "fffff";
						removeDim();
						layerPop.alert(msg);
//						layerPop.open('naverInfoPop', "default/views/biz/cm/mo/lgin/naverInfoPop", {}).then(function() {});
					}else if(rsHttp.body.result=="fail"){
						removeDim();
						layerPop.alert(rsHttp.body.message);
					} else {
						removeDim();
						layerPop.alert("!!!!!!");
					}
				}
			});
		};
		
		//�꾩옄�쒕챸
		o.sign = function(param, callback) {
			var stopFlag = false;
			var callbackPageUrl = window.location.protocol + '//' + window.location.host + "/solution/naversign/sign.do";
			var input = {
					callbackPageUrl: callbackPageUrl
			};
			http.post('f.cg.he.co.cc.o.cco.NaverSignCCo.handleSign', input, false).then(function(rsHttp) {
				var resultCode = rsHttp.body.resultCode;
				
				if(resultCode == '200') {
					var url = rsHttp.body.data.pollingPageUrl;
					removeDim();
					layerPop.alert('!!!!!!!!!!').then(function(data) {
						dimmed();
						$timeout(function() {
							var naverWindow = systemPop.open(url, 'naverSign', {}, {});

							var interval = window.setInterval(function() {
								if(naverWindow == null || naverWindow.closed) {
									window.clearInterval(interval);
									naverWindow = null;
									
									o.progress(callback);
								}
							},500);
							
						},200);

					});
					
				} else {
					if(rsHttp.body.data && rsHttp.body.data.rtnMsg && rsHttp.body.data.rtnMsg == 'invalid_param') {
						var msg = "error ";
						removeDim();
						layerPop.alert(msg);
					}else if(rsHttp.body.result=="fail"){
						removeDim();
						layerPop.alert(rsHttp.body.message);
					} else {
						removeDim();
						layerPop.alert("!!!!!");
					}
				}
			});
		};
		
		return o;
	}));
	
})(angular, mz);
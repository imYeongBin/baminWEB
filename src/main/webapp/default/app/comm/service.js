(function(angular, mz) {

	//�곹뭹 �쎄� �뚯씪 �ㅼ슫濡쒕뱶
	/*mz.comm.service('pdClusPdf', mz.mold(function(logger, http, util, fileUtil, layerPop) {
		var log = logger.getLogger('pdClusPdf');	
		var o = {};
		//�쎄� �뚯씪 �ㅼ슫濡쒕뱶
		o.downPdClus = function(pdCd) {
			log.out("pdCd = " + pdCd);
			if(util.isEmpty(pdCd)) {
				layerPop.alert("�곹뭹 肄붾뱶瑜� �뺤씤�� 二쇱꽭��.");
				return false;
			}
			http.post("f.cg.he.ct.tm.o.bc.CtrCnfBc.retrievePdfFileLst", {pdCd : pdCd}).then(function(result) {
				if (result) {
					if (result.header && result.header.prcesResultDivCd == '0') {
						var isDown = false;
//						6102	6101	1	CM_ATC_FILE_CTG_CD		�쎄�	   
//						6103	6101	2	CM_ATC_FILE_CTG_CD		�곹뭹�붿빟��	   
//						6104	6101	3	CM_ATC_FILE_CTG_CD		�ъ뾽諛⑸쾿��	 
						for(var i=0 ; i<result.body.pdfList.length ; i++) {
							var item = result.body.pdfList[i];
							if('6102' == item.cmAtcFileCtgCd){
					    		isDown = true;
					    		fileUtil.pdfDownload('/hp/fileDownload.do', {
					    			path: util.getCrytoData(item, "atcFilePthNm"),
					    			id: util.getCrytoData(item, "atcFilePthNm"),
					    			orgFileName: item.ortxtFileNm
					    		});
					    	}
						}
						if(!isDown) {
							layerPop.alert("�깅줉�� �곹뭹 �쎄��� �놁뒿�덈떎.");
						}
					} else {
						//error -> msg
						layerPop.alert(result.msg.standMsg);
					}
				}
			});
		};
		
		return o;
	}));*/
	
	// uiControl
	mz.comm.service('bind', function(co){
		var $timeout = co.get('$timeout');
		return {
			select : function(target, id){
				var el = $('#' + id);
				el.parent().on('click', '.select_list a, .slc_drop a', function() {
					$timeout(function() {
						target[id] = el.val();
					}, 10);
				});
			},
			watchLoop : function(scope, fn){
				scope.$watch(fn);
			}
		};
	});
	//rsecure
	/*mz.comm.factory('rsecure', mz.mold(function(logger, ajax, $timeout, $window, co) {
		var log = logger.getLogger('rsecure');
		var o = {};

		//�ㅻ낫�쒕낫�� �몄뀡�� 諛쒓툒 諛� 珥덇린�� �ㅼ젙
		o.initRsecureLoading = function() {
			if($window.loadflag) {
				TK_Rescan();
			} else {
				ajax.form("/solution/touchen/tnksrnd.do", {}).then(function(result) {
					log.out(result);
					$window.TNK_SR = result.data.TNK_SRND;
					$window.bInit = 0;
					$window.bAddListner = 0;
					$window.loadflag = false;
					$window.tekOption.bstart = 0;
					$window.tekOption.srdk = TNK_SR;
					//
					RSecure_Loading();		//�ㅻ낫�쒕낫��
					//
				});
			}
		};
		//媛��곹궎�⑤뱶 珥덇린�� �ㅼ젙
		o.initTranskey = function() {
			if($window.tk && $window.tk.now) {
				$window.tk.close();
			}
			$window.tk = null;
			$window.transkey = [];
			//
			initTranskey();			//媛��곹궎�⑤뱶
		};
		//�ㅻ낫�� 蹂댁븞, �몄뀡�� 諛쒓툒 紐⑤뱶 珥덇린�� �ㅼ젙
		o.initRsecureKey = function(time) {
			$timeout(function() {
				//媛��곹궎�⑤뱶 二쇱꽍泥섎━
				o.initTranskey();
				//
				o.initRsecureLoading();
			}, time || 100);
		};
		
		return o;		
	}));*/
	
	
	//wiselog
	/*mz.comm.factory('wiselog', mz.mold(function(logger, $window, $q, co) {
		var log = logger.getLogger('wiselog');
		
		var info = {};
		var o = {};
		
		o.setUserId = function(id){
			log.out("userId = " + id);
			info.id = id;
		};
		
		o.logging = function() {
			var defered = $q.defer();
			log.out("logging sid = " + _n_sid_properties);
			log.out("loggins _n_bank_uid = " + info.id);
			$window['_n_sid'] = _n_sid_properties;
			$window['_n_bank_uid'] = info.id || '';
			$window['n_logging']();
			
			defered.resolve(true);
			return defered.promise;
		};
		
		o.clickLogging = function(pm) {
			log.out("" + $window.location.host);
			log.out("clickLogging pm = " + pm);
			$window['n_click_logging']($window.location.host + pm);
		};
		
		return o;
	}));*/
	
	// session
	/*mz.comm.factory('session', mz.mold(function(logger, $rootScope, http, menuService, path, $window, $location, wiselog, co, $timeout) {
		var log = logger.getLogger('session');

		return {
			test: function() {
				return http.post('f.cg.he.co.cc.o.bc.SessionRouteBc.getSessionUserInfo', {}, false).then(function(result) {
					if (result && result.body) {
						//怨좉컼ID濡� 議고쉶�� �뺣낫瑜� 媛��몄삩��.
						var userInfo = result.body.userInfo;
						var authCd   = '';
						var pageId = path.getPageId();
						var viewId = path.getViewId();
						var menu = _.filter(mz.menu, function(info) { return menuService.realMenuCheck(info, pageId);})[0];
						var cmCnnAthTpCds  = [];
						
						if(!_.isUndefined(menu)) {
							cmCnnAthTpCds = menu.cmCnnAthTpCd.split(",");
						}
						if (userInfo) {
							authCd = userInfo.authCd;
							//�몄쬆�� �섏뼱 �덈떎硫� �몄쬆�뺣낫瑜� �꾨떖
							$rootScope.$broadcast('event-comm-session', userInfo);
							//
							if(viewId == '/desc'
							&& (-1 < _.indexOf(cmCnnAthTpCds, '5') || -1 < _.indexOf(cmCnnAthTpCds, authCd))) {
								$window.location.replace('/main.do');
								return false;
							}
							//wiselog �ъ슜�� �ㅼ젙
							wiselog.setUserId(userInfo.userId);
						}
						
						if(0 < cmCnnAthTpCds.length
						&& -1 == _.indexOf(cmCnnAthTpCds, '5')
						&& -1 == _.indexOf(cmCnnAthTpCds, authCd)) {
							if(-1 < _.indexOf(mz.paths, '/desc')) {
								$window.location.replace(path.targetUrl(path.getPageId(), '/desc'));
//								$location.path('desc').replace();
							} else {
								//alert("沅뚰븳 泥댄겕 URL濡� �대룞..");
								$window.location.replace("/certification-center/user-authentication.do");
							}
							return false;
						}
						
						//wiselog
						wiselog.logging();
						return true;
					}
				});
			}
		};
	}));*/

	// location
	/*mz.comm.factory('location', mz.mold(function(co, path, $routeParams, $window, $location, $route) {
		var o = {};
		var _recv = {};

		o.getRouteParam = function() {
			return $routeParams;
		};

		o.getSessionParam = function() {
			return _recv.param;
		};

		o.init = function() {
			return co.get('http').post('f.cg.he.co.cc.o.bc.SessionRouteBc.getSessionParam', {}, false).then(function(result) {
				if(result && result.body && result.body.sysInfo) {
					_recv.param = result.body.sysInfo;
				}
			});
		};

		o.makeUrl = function(pageId, viewId) {
			return path.targetUrl(pageId, viewId);
		};

		o.go = function(pageId, viewId, param) {
			pageId = pageId || '';
			viewId = viewId || '';
			
			setSessionParam(param).then(function(result) {
				if (pageId != path.getPageId()) {
					$window.location.href = o.makeUrl(pageId, viewId);
					return;
				}

				if (viewId != path.getViewId()) {
					//console.log("service : offset = " + 0);
					$('html, body').stop().animate({
				        scrollTop: 0
				    }, 0);
					
					$location.path(viewId);
					return;
				}
				$route.reload();

			});
		};

		o.redirect = function(pageId, viewId) {
			$window.location.replace("/transferUrl.do?transfer=" + encodeURIComponent(o.makeUrl(pageId, viewId)));
		};
		
		// sessionRouteParam
		o.getCurrentDateTime = function() { 
			return co.get('http').post('f.cg.he.co.cc.o.bc.SessionRouteBc.getCurrentDateTime', {}, false); };
		
		function setSessionParam(param) {
			return co.get('http').post('f.cg.he.co.cc.o.bc.SessionRouteBc.setSessionParam', param || {}, false);
		}

		return o;
	}));*/
	
	//layer popup
	/*mz.comm.factory('layerPop', mz.mold(function(logger, $rootScope, $compile, $controller, $q, $timeout, ajax, co, wiselog, $window) {
		var o = {};
		var LAYER_INFO  = "layerInfo";
		var LAYER_NM    = "layer-pop-nm";
		//var EVENT_CLEAR = "event.layerPop.clear";
		
		var log = logger.getLogger('layerPop');

		o.open = function(name, tpl, param, fn) {
			if(!_.isUndefined($rootScope[LAYER_INFO]) 
			&& !_.isNull($rootScope[LAYER_INFO])	
			&& !_.isEmpty(getLayerInfo(name))) {
				return;
			}
			//媛��곹궎�⑤뱶媛� �쒖꽦�� �щ� 泥댄겕
			if ($window.tk && $window.tk.now) {
				log.out($window.tk);
				$window.tk.close();
			}
			
			
			var deferred = $q.defer();
			var pm       = _.clone(param);
			
			setLayerInfo(name, {
				param: pm
			});
			
			//wiselog 異붽� (layerPop open��)
			wiselog.clickLogging(makeUrl(tpl));
			//
			reqTpl(name, tpl).then(function(result) {
				if (result) {
					setLayerInfo(name, {
						id: name,
						promise: deferred,
						param: pm
					});
					fn && fn();
				}
			});

			return deferred.promise;
		};

		o.getParam = function($scope) {
			return getLayerInfo($scope[LAYER_NM]).param;
		};
		
		o.clear = function() {
			$rootScope[LAYER_INFO] = null;
			var comm = ['layer_alert', 'layer_help', 'layer_confirm'];
			for(var i = 0; i < comm.length; i++) {
				$rootScope[comm[i]] = {open: false};
			}
			//$rootScope.$broadcast(EVENT_CLEAR, 'clear-all');
		};

		o.close = function($scope, data) {
			getLayerInfo($scope[LAYER_NM]).promise.resolve(data);
			
			closeLayerPopup($scope[LAYER_NM]);
			
			$timeout(function() {
				setLayerInfo($scope[LAYER_NM], {});
				$("#" + $scope[LAYER_NM]).remove();
				$scope.$destroy();
			}, 300);
		};

		o.alert = function(message, option) {
			var deferred = $q.defer();
			var obj = {
				deferred: deferred, 
				message: message || '',
				option: option,
				tpl: 'comm/alert',
				id: 'layer_alert',
				controller: 'layerAlertController'
			};
			makeSystemLayer(obj);
			return deferred.promise;
		};

		o.confirm = function(message, title, option) {
			var deferred = $q.defer();
			var obj = {
				deferred: deferred, 
				message: message || '',
				title: title || '',
				option: option,
				tpl: 'comm/confirm',
				id: 'layer_confirm',
				controller: 'layerConfirmController'
			};
			makeSystemLayer(obj);
			return deferred.promise;
		};
		
		o.loginConfirm = function(message, title, option){
			var deferred = $q.defer();
				var obj = {
				deferred: deferred, 
				message: message || '',
				title: title || '',
				option: option,
				tpl: 'comm/loginConfirm',
				id: 'layer_confirm',
				controller: 'layerConfirmController'
			};
			makeSystemLayer(obj);
			return deferred.promise;
		}

		function makeHtml(html) {
			if($("#layer_popup_container").size() == 0) {
				//layer popup container �꾩튂 �곸슜.(div id='content')
				$("#content").append("<div id='layer_popup_container'></div>");
			}
			if ($("#layer_popup_container > div").size() == 0) {
				$("#layer_popup_container").html(html);
			} else {
				$("#layer_popup_container > div").last().after(html);
			}
		}

		function makeUrl(tpl) {
			return mz.path("/views/" + tpl + ".tpl");
		}

		function reqTpl(name, tpl) {
			var deferred = $q.defer();
			var url = makeUrl(tpl) + "?" + mz.v();

			ajax.tpl(url).then(function(result) {
				if (result.status == 200) {
					var $scope = $("body").scope().$new();
					
					$scope[LAYER_NM] = name; 
					
					
					$scope.$on(EVENT_CLEAR, function(event, data) {
						deferred.reject(false);
						setLayerInfo(name, {});
						$("#" + name).remove();
						$scope.$destroy();
					});
					
					
					// 20191105 : BHY : 媛��낆삁�� �덉씠�댄뙘�� 媛��대뜲 �뺣젹 Class = onlymain 異붽� (吏곹뙋怨� �숈씪�섍쾶 蹂�寃�)
					var html = "<div id=\"" + name + "\" class='onlymain'></div>";
					makeHtml(html);

					$controller(name + 'Controller', {
						co: co,
						$scope: $scope
					});
					
					$("#" + name).html($compile(result.data)($scope));
					openLayerPopup(name, $(this));
					deferred.resolve(true);
				} else {
					deferred.reject(false);
				}
			});
			return deferred.promise;
		}

		function setLayerInfo(name, obj) {
			if (_.isUndefined($rootScope[LAYER_INFO]) || _.isNull($rootScope[LAYER_INFO])) {
				$rootScope[LAYER_INFO] = {};
			}

			$rootScope[LAYER_INFO][name] = obj;
		}

		function getLayerInfo(name) {
			return $rootScope[LAYER_INFO][name];
		}
		
		function makeSystemLayer(obj) {
			var deferred   = obj.deferred;
			var $scope     = $("body").scope().$new();
			var url        = makeUrl(obj.tpl)  + "?" + mz.v();
			var id         = obj.id;
			var controller = obj.controller;
			var message    = obj.message;
			var title      = obj.title || '';
			var option     = obj.option || {};
			
			if($rootScope[id] && $rootScope[id].open) {
				return;
			}
			
			$rootScope[id] = {open: true};
			$scope.title = title;
			$scope.message = message;
			$scope.option = option;
			$scope.promise = deferred;
			
			if (0 < $("#" + id).size()) {
				$("#" + id).remove();
			}
			
			ajax.tpl(url).then(function(result) {
				if (result) {
					makeHtml(result.data);
					open();
				}
			});
			
			function open() {
				$controller(controller, {
					co: co,
					$scope: $scope
				});
				$("#" + id).html($compile($("#" + id).html())($scope));
				openLayerPopup(id, $(this));
			}
		}

		return o;
	}));*/
	
	//system popup
	/*mz.comm.factory('systemPop', mz.mold(function($window, $q) {
		var o = {};

		o.open = function(url, name, param, option, flag) {
			$window.popupParam = $window.popupParam || {};
			$window.popupParam[name] = param;

			option = _.extend({
				width: '900',
				height: '500',
				left: '0',
				top: '0',
				scrollbars: 'yes',
				resizable: 'yes',
				menubar: 'no',
				location: 'no',
				status: 'no',
				toolbar: 'no'
			}, option);
			
			if(_.isUndefined(flag)) {
				flag = true;
			}
			
			if(flag) {
				option.left = (screen.availWidth - option.width) / 2;
				option.top  = (screen.availHeight - option.height) / 2;
			}

			$window.open(mz.WEBROOT + url,
				name,
				_.map(option, function(v, k) {
					return k + '=' + v;
				}).join(','));
		};

		o.close = function() {
			$window.open('about:blank', '_self').close();
		};

		o.getParam = function() {
			if ($window.opener && $window.opener.popupParam) {
				return $window.opener.popupParam[$window.name];
			}
			return null;
		};

		return o;
	}));*/
	
	// serverDateUtil
	/*mz.comm.factory('serverDateUtil', mz.mold(function(co) {
		var log = co.get('logger').getLogger('serverDateUtil');
		var location = co.get('location');
		var $q = co.get('$q');

		var o = {};

		o.chkDateBetween = function(a, b) {
			var deferred = $q.defer();
			if (a.toString().length != 14 || b.toString().length != 14) {
				alert('�뚮씪誘명꽣 �먮━�� �뺤씤');
				deferred.resolve(false);
			} else {
				location.getCurrentDateTime().then(function(result) {
					var now = result.body.currentDateTime;
					var result = a <= now && b >= now;
					log.out('serverDateUtil.chkDateBetween()     a, now, b, result : ', a, now, b, result);
					deferred.resolve(result);
				});
			}
			return deferred.promise;
		};

		return o;
	}));*/

	// mkt
	/*mz.comm.factory('mkt', function(co, $rootScope){
		var $timeout = co.get('$timeout');
		var http = co.get('http');
		var log = co.get('logger').getLogger('mkt');
		var util = co.get('util');
		var analysis = co.get('analysis');
		var path = co.get('path');
		var pageId = path.getPageId();
		
		function commTracking(data){
			var ctcStgeCd = data.ctcStgeCd;
			var dsgIdn = data.dsgIdn;
			var trackingId = '';
			var iwTrackingParam = '';
			var gaEventParam = {};
			if(ctcStgeCd == '3080'){
				if(pageId.indexOf('M-driver.do')>-1){
					trackingId = 'QuotationDriverTM';
					gaEventParam['category'] = 'PWD-auto-and-driver';
					gaEventParam['action'] = '�먮룞李�/�댁쟾�� > M-Drive �댁쟾�먮낫��';
				}else if(pageId.indexOf('carefree-cancer.do')>-1){
					trackingId = 'QuotationCancerTM';
					gaEventParam['category'] = 'PWD-health-and-kids';
					gaEventParam['action'] = '嫄닿컯/�대┛�� > 嫄깆젙�녿뒗 �붾낫��';
				}else if(pageId.indexOf('alpha-plus.do')>-1){
					trackingId = 'QuotationAlphaTM';
					gaEventParam['category'] = 'PWD-health-and-kids';
					gaEventParam['action'] = '嫄닿컯/�대┛�� > �뚰뙆Plus蹂댁옣蹂댄뿕';
				}else if(pageId.indexOf('simpleHealthIns.do')>-1){
					trackingId = 'QuotationSimpleTM';
					gaEventParam['category'] = 'PWD-health-and-kids';
					gaEventParam['action'] = '嫄닿컯/�대┛�� > 媛꾪렪�ъ궗蹂댄뿕';
				}else if(pageId.indexOf('faceTeeth.do')>-1){
					trackingId = 'QuotationTeethTM';
					gaEventParam['category'] = 'PWD-health-and-kids';
					gaEventParam['action'] = '嫄닿컯/�대┛�� > �대ぉ援щ퉬蹂댁옣蹂댄뿕';
				}else if(pageId.indexOf('longevityIns.do')>-1){
					trackingId = 'QuotationLongevityTM';
					gaEventParam['category'] = 'PWD-health-and-kids';
					gaEventParam['action'] = '嫄닿컯/�대┛�� > �쒕갑蹂댄뿕';
				}else if(pageId.indexOf('mom-child.do')>-1){
					trackingId = 'QuotationChildTM';
					gaEventParam['category'] = 'PWD-health-and-kids';
					gaEventParam['action'] = '嫄닿컯/�대┛�� > �퀾om媛숈� �대┛�대낫��';
				}else if(pageId.indexOf('major-disease.do')>-1){
					trackingId = 'QuotationDiseaseTM';
					gaEventParam['category'] = 'PWD-health-and-kids';
					gaEventParam['action'] = '嫄닿컯/�대┛�� > 3��吏덈퀝蹂댁옣蹂댄뿕';
				}else if(pageId.indexOf('frugal-health.do')>-1){
					trackingId = 'QuotationFrugalTM';
					gaEventParam['category'] = 'PWD-health-and-kids';
					gaEventParam['action'] = '嫄닿컯/�대┛�� > The�뚮쑑�쒓굔媛뺣낫��';
				}	
				iwTrackingParam = 'quotation';
				gaEventParam['label']='蹂댄뿕猷� �뺤씤_�꾨즺';
			}else if(ctcStgeCd == '3090'){
				if(pageId.indexOf('M-driver.do')>-1){
					trackingId = 'CounselDriverTM';
				}else if(pageId.indexOf('carefree-cancer.do')>-1){
					trackingId = 'CounselCancerTM';
				}else if(pageId.indexOf('alpha-plus.do')>-1){
					trackingId = 'CounselAlphaTM';
				}else if(pageId.indexOf('simpleHealthIns.do')>-1){
					trackingId = 'CounselSimpleTM';
				}else if(pageId.indexOf('faceTeeth.do')>-1){
					trackingId = 'CounselTeethTM';
				}else if(pageId.indexOf('longevityIns.do')>-1){
					trackingId = 'CounselLongevityTM';
				}else if(pageId.indexOf('mom-child.do')>-1){
					trackingId = 'CounselChildTM';
				}else if(pageId.indexOf('major-disease.do')>-1){
					trackingId = 'CounselDiseaseTM';
				}else if(pageId.indexOf('frugal-health.do')>-1){
					trackingId = 'CounselFrugalTM';
				}
				iwTrackingParam = 'counsel';
				gaEventParam['label']='�곷떞 �좎껌_�꾨즺';
			}
			
			
			if(trackingId!=''){
				analysis.fbPCustom(trackingId);	
				analysis.iwCustom(iwTrackingParam,dsgIdn);
				//�꾪솚 �몃옒��
				analysis.convTracking(iwTrackingParam);
				var pixelParam = {
					mz03 : dsgIdn || ''//�곗텧怨꾧퀬媛쓎d
				}
				analysis.gTagMgrCustomDataLayer(pixelParam);
					
			}
		}
		
		function saveCkLog(param){
			param = param || {};
			return (function(param){
				if(angular){
					if(angular.element($('#container')).injector()){
						if(angular.element($('#container')).injector().has('crossStorage')){
							angular.element($('#container')).injector().get('crossStorage').init();
							angular.element($('#container')).injector().get('crossStorage').insrtTmLog(param);
						}
					}
				}
			})(param);
		}
		
		return {
			log : function(fn){
				fn && $timeout(function(){
					fn();
				},1);
			},
			
			saveLog: function(data){
				data = data || {};
//				http.post('f.cg.he.co.cc.o.cco.MktStageCCo.logStage',data,false).then(function(result){
//					$rootScope.dsgIdn = result.body.dsgIdn;
					if(data.tmMktData){
//						data.tmMktData.dsgIdn = $rootScope.dsgIdn;
						http.post('f.cg.he.co.cc.o.cco.MktStageCCo.logStageTm',data.tmMktData,false).then(function(result){
							$rootScope.dsgIdn = result.body.dsgIdn;
							saveCkLog(result.body);
						});	
					}
//				});
			},

			saveMda : function(data){
				data = data || {};
				http.post('f.cg.he.co.cc.o.bc.MktLogStoreBC.saveMdaLog',data,false);
			},
			updateLog : function(data){
				data = data || {};
				commTracking(data);
//				log.out("data : ",data);
//				http.post('f.cg.he.co.cc.o.cco.MktStageCCo.updateLog',data,false).then(function(result){
					http.post('f.cg.he.co.cc.o.cco.MktStageCCo.updateLogTm',data.tmMktData,false);
//				});;
			},
			
			setLogParam : function(logSetPm,result){
				var logParam = {};
				var getGndrCd = 'M';
				var phoneNo = '';
				var phoneArray = [];
				var getCusNm = '';
				var getBdt = '';

				if(logSetPm.divCd=='CC'){
					phoneNo = util.phoneFormat($('#ccPhone').val());
					getCusNm = $('#ccName').val();
					getBdt = $('#ccBirth').val();
					getGndrCd = $('input[name=ccSex]:checked').val();
					
				}
				if(logSetPm.divCd=='CS'){
					phoneNo = util.phoneFormat($('#csPhone').val());
					getCusNm = $('#csName').val();
					getBdt = $('#csBirth').val();
					if($('input[name=csSex]:checked').val()=="2"){
						getGndrCd = 'F';
					}
				}

				phoneArray = util.getPhoneNumArray(phoneNo);

				logParam = {
					cusNm : getCusNm,
					bdt : getBdt,
					gndrCd : getGndrCd,
					pdCd : logSetPm.pdCd,
					ctcStgeCd : logSetPm.ctcStgeCd,
					bizSysCd : logSetPm.bizSysCd,
					ctcMdiaNo : logSetPm.ctcMdiaNo,
					telArNo : phoneArray[0],
					telofNo : phoneArray[1],
					telSnoDect : phoneArray[2]
				}
				
				if(logSetPm.ctcStgeCd == '3010'){
					logParam.tmMktData = {
						ctcStgeCd : '3010'
						, gndrCd : getGndrCd
						, cusNm : getCusNm
						, bdt : getBdt
						, dsgDivCd : logSetPm.dsgDivCd
						, ctcMdiaNo : logSetPm.ctcMdiaNo
						, bizSysCd : 'TM'
						, cmCommPdCd : logSetPm.cmCommPdCd
						, untPdCd : logSetPm.untPdCd
						, infwPthCd : logSetPm.infwPthCd
					}
				}
				
				return logParam;

			}
		};

	});*/

	// ��異� 媛��κ툑�� �뺤씤
	/*mz.comm.factory('lon', function(co, $q){
		var http = co.get('http');
		var log = co.get('logger').getLogger('lon');
		var util = co.get('util');
		var promise = co.get('promise');
		
		return {
			setPsbLon: function(){
				var deferred = $q.defer();
				var lonInfo = {};
				lonInfo.lonList = [];
				http.post('f.cg.he.ct.to.o.bc.InsCtrLonRqeBc.retrieveInsCtrLonRqeList', {}, false).then(function(result) {
					var process = [];
					_.each(result.body.ctrList, function(obj){
						var param = {polNo : util.getCrytoData( obj, 'polNo')};
						var lonRqeFun = http.post('f.cg.he.ct.to.o.bc.InsCtrLonRqeBc.retrieveInsCtrLonRqe', param, false).then(function(result2) {
							if (_.isUndefined(result2.header) || result2.header.prcesResultDivCd != '0') {
								lonInfo.lastErr = result2.msg.standMsg;
							}
							return result2;
						});
						process.push(lonRqeFun);

					});
					promise.all(process).then(function(result3) {
						var internetPsbAmtTot = 0;	// �명꽣�� ��異쒓��κ툑�� 
						_.each(result3, function(obj){
							
							// ��異쒓��� �먮뒗 遺덇��� 由ъ뒪�� 以� �쒓컻媛� �대젮���쇳븿.
							if (obj.body.lonInfList.length > 0) {
								var lonItem = obj.body.lonInfList[0];
								lonItem.isInternetYN = 'Y';
								internetPsbAmtTot = internetPsbAmtTot + util.parseInt(lonItem.lonRqePsbAmt);
																					
								log.out(lonItem.polNo+' ' +lonItem.isInternetYN +' '+ 'I '  + internetPsbAmtTot);
								
							} else if (obj.body.lonPrhbtInfList.length > 0) {
								var lonItem = obj.body.lonPrhbtInfList[0];
								lonItem.isInternetYN = 'N';
								lonInfo.lonList.push(lonItem);
								log.out(lonItem.polNo+' ' +lonItem.isInternetYN +' '+ 'I '  + internetPsbAmtTot);
								
							} else {
								lonInfo.lastErr = '蹂댄뿕怨꾩빟��異쒖떊泥�“�� �ㅻ쪟';
								lonInfo.lonList.push({});
							}
							
						});
					
						// �명꽣�� ��異쒓��κ툑�� 
						lonInfo.internetPsbAmtTot = internetPsbAmtTot.toString();
						deferred.resolve(true);
						$.cookie('internetPsbAmtTot',lonInfo.internetPsbAmtTot);
					})
				});	
				return deferred.promise;
			},
			getPsbLon: function(){
				return $.cookie('internetPsbAmtTot');
			},

			resetLon: function(){
				$.cookie('internetPsbAmtTot', 0);
			}
		};

	});	*/

	/* - 2016.11.24 ------------------------------- */
	/* - 泥대쪟�� �덉씠�댄뙘�� ------------------------------- */
	/*mz.comm.factory('wakeup', mz.mold(function($rootScope, co) {
		var log = co.get('logger').getLogger('wakeup');
		var layerPop = co.get('layerPop');
		var util = co.get("util");
		var menuService = co.get("menuService");
		var path = co.get("path");
		var pageId = path.getPageId();
		
		// 硫붾돱ID
		var linkList = _.filter(mz.menu, function(info) { 
				return menuService.realMenuCheck(info, pageId);
			});
			
		var lnb      = linkList[linkList.length - 1];
		var paths    = "";
		if(typeof lnb != "undefined" && lnb != ""){
			paths = lnb.path.split(">");
		}

		var play = "";
		var o = {};

		o.controller = function($scope, co){
			var layerPop = co.get('layerPop');
			var $window = co.get('$window');
			var param = layerPop.getParam($scope);
			var wakeup = co.get('wakeup');
			// DPID : �좎엯�� �ㅻ쭏�몄삤�� 濡쒓렇濡� �볦쓬
			$scope.dpid = param.dpid;
			 - public ------------------------------- 
			$scope.close = function() {
				layerPop.close($scope);
			};

			// �ㅻ쭏�몄삤�� > bulbub_popup > DPID�� count 濡쒓렇 �ъ슜 
			$scope.bulbubEcrmLog = function(item, id){
				//log.out("item: ",item);
				if(item != null){
					var url = item.prdUrlWeb; 
					var cusId = id || ""
					if(	cusId != "" && item.reCom == "auto") {
						if(url.indexOf('?') > -1) {
						   url += "&cusId=" + cusId
						} else {
						   url += "?cusId=" + cusId
						}
					}	
					
					transferEcrmLog(item);	
					
					$window.open(url);
				}else{
					$window.open("https://store.meritzfire.com/auto-and-driver/direct-auto.do#!/contractPopup");
					//layerPop.alert("�깅줉�� DPID濡쒓렇媛� �놁뒿�덈떎");
				}	
			}

			// �대┃��, ecrm log �꾩넚
			function transferEcrmLog(pm) {
				//wiselog.ecrmClickLogging(pm.clickUrl);
				$.ajax({
					url : pm.clickUrl,
					dataType: "jsonp"
				});
			}
			
			$scope.LypopTodayX = function() {
				wakeup.getTodayClose();
				$scope.close();
			};

			$scope.$watch('todayX', function(){
				if(typeof $scope.todayX != 'undefined' && $scope.todayX == true){
					wakeup.getTodayClose();
					$scope.close();
				}
			});
		};

		// ���대㉧ �ㅽ��� �� 濡쒓렇 諛� �앹뾽
		o.getTimerPopup = function(){
			
			//------ �κ린泥대쪟�앹뾽 �쒓굅 �쒖떆�� �곸슜
			return false;
			//------ 3/2 �먮났 �덉젙

			var date = new Date();
			var dayHours = date.getHours();
			var timer = 0;

			var currentMenu = util.isNull(paths[paths.length-1]) ? "" : paths[paths.length-1];
				
			//log.out("paths[0] : [",currentMenu ,"] dayHours : [",dayHours, "] timer : [",timer ,"]");
			//log.out("paths.length", paths.length);

			var menuTimer = menuCheck(currentMenu);
			if(paths.length > 0){	
				// �꾩떆 留됱쓬 泥섎━ ( �ъ슜以묒� )
//if(false){					
				if(menuTimer != 0){
					// ���대㉧
					play = setInterval(function(){
						timer += 1000;
						//log.out("timer : ",timer/1000+"珥�");

					 	if(timer == menuTimer.time){
					 		getLayerPop(menuTimer.dpid);
					 	}
					}, 1000);	
				}
//}
			}
		};

		// ���대㉧�뺤�
		o.getTimerStop = function(){ 
			clearInterval(play);
		};

		function menuCheck(currentMenu){
			var data = {};
			
			// �대깽�명럹�댁�, �먯＜李얜뒗吏덈Ц(FAQ)
			if(currentMenu == 2161 || currentMenu == 2128){
				return data = { time : 10000, dpid : 'bulbub_popup'};

			// 蹂댁긽/蹂댄뿕湲덉껌援�
			}else if(currentMenu == 2064){
				return data = { time : 40000, dpid : 'bulbub_accident'};

			// �먮룞李⑤낫��(�ш퀬�묒닔)
			}else if(currentMenu == 2069){
				return data = { time : 30000, dpid : 'bulbub_accident'};
			
			// 媛쒖씤�⑹옄�숈감
			}else if(currentMenu == 2004){
				return data = { time : 20000, dpid : 'bulbub_car'};

			// 利앸챸��/援щ퉬�쒕쪟 諛쒓툒
			}else if(currentMenu == 2115){
				return data = { time : 15000, dpid : 'bulbub_popup'};

			// My Account
			}else if(currentMenu == 2093){
				return data = { time : 40000, dpid : 'bulbub_myaccont'};

			// ���� 硫붿씤		
			}else if(currentMenu == 2242){
				return data = { time : 300000, dpid : 'bulbub_Main' };
			}

			return 0;
		}

		function getLayerPop(dpid){
			layerPop.open('lypop_wakeup', 'biz/pd/ph/comm/lypop_wakeup', {dpid : dpid}).then(function(result) {});
			clearInterval(play);
		}

		//�ㅻ뒛 �섎（ 洹몃쭔蹂닿린
		o.getTodayClose = function(){
			
			util.setCookie('bublubX', 'done', 1);
		}

		return o;
	}));*/

	/**
	 * �곷떞�쒓컙�ㅼ젙
	 * -> default/app/comm/slzDateData.json �� slzMm�� �ㅼ젙 �붿씠 �덉쑝硫� 媛��몄삤怨� 
	 *     �놁쑝硫� 湲곗〈諛⑹떇洹몃�濡� �명똿��
	 */
	/*mz.comm.factory('slzDate', mz.mold(function($rootScope, co) {
		var log = co.get('logger').getLogger('slzDate');
		var http = co.get('http');
		var util = co.get('util');
		var $filter = co.get('$filter');
		var $timeout = co.get('$timeout');
		
		var o = {};
		
		// --媛쒕컻�먯젙�� --------------------------------------------------------
		o.init = function(){
			//1.珥덇린��
			$rootScope.weekDaySlzTime = "";
			$rootScope.saturdaySlzTime = "";
			$rootScope.sundaySlzTime = "";

			o.retrieveCsReqDate();	//�곷떞�쒓컙�ㅼ젙
		};
		
		*//**
		 * �곷떞�쒓컙�ㅼ젙
		 *//*
		o.retrieveCsReqDate = function() {
			var dt = new Date();
			var yyyymm = dt.getFullYear() + util.leftPad((dt.getMonth()+1).toString(), 2, "0");	//�꾩옱�꾩썡
			var startTime="", endTime="";
			var cmDayObj = [];
			
			$rootScope.today = util.formatDate(dt,"yyyymmdd");
			$rootScope.currentTime = util.formatDate(dt,"hh24miss");
				
			//�좎쭨, �쒓컙 �낅젰諛쏆븘�� 泥섎━ => json�� �덈뒗 �쒓컙�대㈃ 泥섎━, �꾨땲硫� 湲곗〈�곗씠�곕줈 泥섎━
//			$.ajax({
//				url: "/default/app/comm/slzDateData.json",
//				dataType:'json',
//				async:false,
//				success: function (data) {
			var param = {};
			var tempCdObj = new Array("1");
			param.tempCdObj = tempCdObj;
			http.post('f.cg.he.cm.ce.o.bc.CnsTmBc.retrieveTempList', param).then(function(result) {
				if(result && result.body && result.body.tempList.length > 0) {
					var data = eval(result.body.tempList[0].voLqtLetCon);
					var cnt = 0;
					angular.forEach(data, function(item) {
						if(item.dt >= $rootScope.today && cnt < 10) {
							cmDayObj.push(item);
							cnt++;
						}
					});
				}
				
				log.out("cmDayObj",cmDayObj);
					
				//json�� �좎쭨媛� 遺�議깊븯嫄곕굹 �놁쓣��
				var cmDaylen = cmDayObj.length;
				var lastDay = cmDaylen==0 ? util.addDays($rootScope.today,-1) : cmDayObj[cmDaylen-1].dt;
				var insLen = 0;
				if(cmDaylen < 5)  {
					for(var i = 0; i < 6; i++) {
						var day = util.addDays(lastDay,i+1);
						var wkd = /��|��/.test(util.getDayOfWeek(day));
						if(!wkd && 5-insLen > 0) {
							cmDayObj.push({"dt":day,"holiDivCd":"2","startTime":"9","endTime":"19"});
							insLen++;
						}
					}
				}
				
				//�곷떞�쒓컙 �ㅼ젙
				$rootScope.cmDayObj = cmDayObj;
				if (cmDayObj[0].dt == $rootScope.today && $rootScope.currentTime >= cmDayObj[0].endTime) {
					$rootScope.cmDay = cmDayObj.slice(1, 5);
					$rootScope.csReqDate = cmDayObj[1].dt;
				} else {
					$rootScope.cmDay = cmDayObj.slice(0, 4);		//�곷떞�쇱옄由ъ뒪��
					$rootScope.csReqDate = cmDayObj[0].dt;		//�좏깮�쒖긽�댁씪��
				}

				isNowInit();
				replaceSelect($("#csReqDate"));
				$rootScope.csReqTime = o.retrieveCsReqTime();	//�좎쭨�� �곕Ⅸ �곷떞�쒓컙 �ㅼ젙
				
				log.out("slzDay",$rootScope.slzDay);
				log.out("cmDay",$rootScope.cmDay);
				log.out("csReqDate",$rootScope.csReqDate);
				
				o.retrieveSlzTime();	//�붾㈃�� 蹂댁뿬吏� �곷떞�쒓컙
			});
		};
		
		*//**
		 * �곷떞�쒓컙�ㅼ젙
		 * 1-��, 2-�됱씪, 3-��
		 *//*
		o.retrieveCsReqTime = function(selectDate) {
			if(angular.isUndefined($rootScope.cmDay))	return;
			if(angular.isUndefined(selectDate) || selectDate == "") selectDate = $rootScope.csReqDate;
			var obj = $filter('filter')($rootScope.cmDay, {dt:selectDate})[0];
			var holiDivCd = obj.holiDivCd;
			var startTime = angular.isUndefined(obj.startTime) ? (holiDivCd == "2" ? 9 : 10) : Number(obj.startTime);
			var endTime = angular.isUndefined(obj.endTime) ? (holiDivCd == "2" ? 19 : 14) : Number(obj.endTime);
			
			var csReqTime = [];
			if(selectDate == $rootScope.today) {
				csReqTime.push({
					val: "000000",
					txt: "利됱떆"
				});
			}
			for(var i = startTime; i <= endTime; i++) {
				var tm = util.leftPad(i.toString(), 2, "0");
//				if(i != (holiDivCd=="2" ? 12 : 0)) {
					if(selectDate == $rootScope.today && $rootScope.currentTime.substring(0,2) >= i)	"";
					else {
						csReqTime.push({
							val: tm + "0000",
							txt: tm + "��"
						});
					}
//				}
			}
			
			return csReqTime;
		};
		
		*//**
		 * TM�곷떞�쒓컙 Return
		 * gb= 1-��, 2-�됱씪, 3-��
		 *//*
		o.getSlzTime = function(gb) {
			var today = $rootScope.today;
			var slzTime = "";
			
			var returnDay = _.filter(util.getListData($rootScope.cmDayObj), function(o) {
					return o.holiDivCd == gb && (o.dt >= today && o.dt <= util.addDays(today, 7));
			})[0];
			if(angular.isUndefined(returnDay) || angular.isUndefined(returnDay.startTime)) {
				return gb == "2" ? "9��~19��" : "";
			} else {
				return returnDay.startTime + "~"+returnDay.endTime+"��";
			}
		}
		
		*//**
		 * �붾㈃�� 蹂댁뿬吏� �곷떞�쒓컙
		 *//*
		o.retrieveSlzTime = function() {
			if($rootScope.weekDaySlzTime != "")	return;
			var today = $rootScope.today;
			
			http.post("f.cg.he.cm.ce.o.bc.CnsTmBc.retrieveInCall", {cmCommCd : '2110'}).then(function(result) {
				if(result) {$rootScope.inCallNmWeek = result.body.inCallNm;}
			});
			http.post("f.cg.he.cm.ce.o.bc.CnsTmBc.retrieveInCall", {cmCommCd : '2115'}).then(function(result) {
				$rootScope.weekDaySlzTime = (result.body.inCallNm ? result.body.inCallNm : '');
			});
			
			http.post("f.cg.he.cm.ce.o.bc.CnsTmBc.retrieveInCall", {cmCommCd : '2120'}).then(function(result) {
				if(result) {$rootScope.inCallNmSat = result.body.inCallNm;}
			});
			http.post("f.cg.he.cm.ce.o.bc.CnsTmBc.retrieveInCall", {cmCommCd : '2125'}).then(function(result) {
				$rootScope.saturdaySlzTime = (result.body.inCallNm ? result.body.inCallNm : '');
			});
			
//			$rootScope.weekDaySlzTime = o.getSlzTime("2");
//			$rootScope.saturdaySlzTime = o.getSlzTime("3");
//			$rootScope.sundaySlzTime = o.getSlzTime("1");
			
		}
		
		*//**
		 * �쒓컙 �ㅼ젙
		 *//*
		function isNowInit() {
			if ($rootScope.csReqDate == $rootScope.today) {
				$rootScope.isNow = true;
			} else {
				$rootScope.isNow = false;
			}
			$timeout(function() {
				replaceSelect($("#csReqTime"));
			}, 100);
		}
		
		return o;
	}));*/
	
})(angular, mz);
(function(angular, mz) {

	//상품 약관 파일 다운로드 
	
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
	
	
	//wiselog
	
	// session

	// location
	mz.comm.factory('location', mz.mold(function(co, path, $routeParams, $window, $location, $route) {
		var o = {};
		var _recv = {};

		o.getRouteParam = function() {
			return $routeParams;
		};

		o.getSessionParam = function() {
			return _recv.param;
		};

		o.init = function() {
/*			return co.get('http').post('f.cg.he.co.cc.o.bc.SessionRouteBc.getSessionParam', {}, false).then(function(result) {
				if(result && result.body && result.body.sysInfo) {
					_recv.param = result.body.sysInfo;
				}
			});*/
		};

		o.makeUrl = function(pageId, viewId) {
			return path.targetUrl(pageId, viewId);
		};

		o.go = function(pageId, viewId, param) {
			pageId = pageId || '';
			viewId = viewId || '';
			
			//setSessionParam(param).then(function(result) {
					$window.location.href = o.makeUrl(pageId, viewId);
					return;

				if (viewId != path.getViewId()) {
					//console.log("service : offset = " + 0);
					$('html, body').stop().animate({
				        scrollTop: 0
				    }, 0);
					
					$location.path(viewId);
					return;
				}
				$route.reload();

			//});
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
	}));
	
	//layer popup
	mz.comm.factory('layerPop', mz.mold(function(logger, $rootScope, $compile, $controller, $q, $timeout, ajax, co, $window) {
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
			//가상키패드가 활성화 여부 체크
			if ($window.tk && $window.tk.now) {
				log.out($window.tk);
				$window.tk.close();
			}
			
			
			var deferred = $q.defer();
			var pm       = _.clone(param);
			
			setLayerInfo(name, {
				param: pm
			});
			
			//wiselog 추가 (layerPop open시)
			//wiselog.clickLogging(makeUrl(tpl));
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
				//layer popup container 위치 적용.(div id='content')
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
					
					/*
					$scope.$on(EVENT_CLEAR, function(event, data) {
						deferred.reject(false);
						setLayerInfo(name, {});
						$("#" + name).remove();
						$scope.$destroy();
					});
					*/
					
					// 20191105 : BHY : 가입예시 레이어팝업 가운데 정렬 Class = onlymain 추가 (직판과 동일하게 변경)
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
	}));
	
	//system popup
	mz.comm.factory('systemPop', mz.mold(function($window, $q) {
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

			var ref = $window.open(mz.WEBROOT + url,
				name,
				_.map(option, function(v, k) {
					return k + '=' + v;
				}).join(','));
			
			return ref;
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
	}));


})(angular, mz);
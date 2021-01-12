/*
 * COPYRIGHT (c) MERITZ Fire Insurance 2015
 * This software is the proprietary information of MERITZ Fire Insurance.
 * 
 * Modeler : 강환기
 *
 * Revision History
 * Author Date       Description
 * ------ ---------- -----------
 * 강환기 2015-08-12 First Draft
 */
(function(angular, mz) {
	
	mz.error = function(){ (window.top || window).location.replace(mz.ERRORPAGE||'/bamin/error.do'); };
	mz.existPage = function(fn){
		var empty = true;
		$.ajax('/'+mz.WEBPAGE,
				{async:false,success:function(data,status){ empty=!(status=='success');}}); 
		return (empty && fn && fn()), !empty;
	};

	/** 하드웨어 종류 */
	mz.device = function() {
		var agent = navigator.userAgent, appver = navigator.appVersion, dv = 'P', os = 'N';
		if (agent.match(/Android|Mobile|iP(hone|od|ad)|BlackBerry|IEMobile|Kindle|NetFront|Silk-Accelerated|(hpw|web)OS|Fennec|Minimo|Opera M(obi|ini)|Blazer|Dolfin|Dolphin|Skyfire|Zune/)) {
			dv = 'M';
			os = _.find({'Android':'A','iPhone':'I','iPod':'I','iPad':'I'}, function(v, k) { return agent.indexOf(k) > -1; }) || 'N';
		}
		if(dv != 'M' && appver.match(/Android|Mobile|iP(hone|od|ad)|BlackBerry|IEMobile|Kindle|NetFront|Silk-Accelerated|(hpw|web)OS|Fennec|Minimo|Opera M(obi|ini)|Blazer|Dolfin|Dolphin|Skyfire|Zune/)) {
			dv = 'M';
			os = _.find({'Android':'A','iPhone':'I','iPod':'I','iPad':'I'}, function(v, k) { return appver.indexOf(k) > -1; }) || 'N';
		}
		return [dv, os];
	}();

	/** 브라우저 종류 반환 */
	mz.browser = function() {
		// 문서모드 null : IE7이하 또는 IE아님
		// 문서모드 5	 : 쿼크
		// 문서모드 7	 : IE7
		// 문서모드 8	 : IE8
		// 문서모드 9	 : IE9
		// 문서모드 10	 : IE10
		// 문서모드 11	 : IE11
		var mode = document.documentMode;

		// IE7 			: 				MSIE 7.0
		// IE8 			: Trident/4.0 	MSIE 8.0
		// IE8 호환성 	: Trident/4.0 	MSIE 7.0
		// IE9 			: Trident/5.0 	MSIE 9.0
		// IE9 호환성 	: Trident/5.0 	MSIE 7.0
		// IE10 		: Trident/6.0 	MSIE 10.0
		// IE10 호환성	: Trident/6.0 	MSIE 7.0
		// IE11 		: Trident/7.0 	rv 11.0
		// IE11 호환성	: Trident/7.0 	MSIE 7.0
		var agent = navigator.userAgent;

		var browser = _.find({
			'Chrome/': 'C',
			'Safari/': 'S',
			'Firefox/': 'F',
			'OPR/': 'O',
			'Opera': 'O',
			'Trident/': 'I',
			'MSIE': 'I'
		}, function(v, k) {
			return agent.indexOf(k) > -1;
		}) || 'N';

		if (browser != 'I') {
			if(browser =='C' || browser =='F'){
				var rv =-1;
				var ua = navigator.userAgent;
				var re = null;
				try{
					if(browser=='C'){
						re = new RegExp("Chrome/([0-9]{1,}[\.0-9]{0,})");
					}else{
						re = new RegExp("Firefox/([0-9]{1,}[\.0-9]{0,})");
					}
					if(re.exec(ua)!=null){
						 rv=parseFloat(RegExp.$1);
					}
					return [browser, rv, rv];
				}catch(ex){
					return [browser, 0, 0];
				}
			}
			
			return [browser, 0, 0];
		}

		if (!!!mode) {
			return [browser, 7, 0];
		}

		var ver = _.find({
			'Trident/4.0': 8,
			'Trident/5.0': 9,
			'Trident/6.0': 10,
			'Trident/7.0': 11
		}, function(v, k) {
			return agent.indexOf(k) > -1;
		}) || 7;

		return [browser, ver, mode];
	}();

	/** core */
	mz.core = angular.module('core', ['ngRoute', 'ngAnimate'/*, 'blockUI'*/]);

	/** comm */
	mz.comm = angular.module('comm', ['core']);

	/** 라이브러리 정보 목록 */
	mz.lib = (function() {
		var o = {};
		var _mzLib = {};

		/**
		 * @method put - 라이브러리 정보 추가
		 * @param {s}    name - 라이브러리 명
		 * @param {o|[]} lib - 라이브러리 정보
		 * @param {s}    lib.base - 라이브러리 
		 * @param {s|[]} modules # - 라이브러리 모듈 명
		 */
		o.put = function(name, lib, modules) {
			_mzLib[name] = {
				lib: lib,
				modules: modules || []
			};
		};

		/**
		 * @method get - 라이브러리 정보 반환
		 * @param {s} name - 라이브러리 명
		 * @return {o}
		 */
		o.get = function(name) {
			return name ? _mzLib[name] : null;
		};

		/**
		 * @method bundle - 라이브러리 묶음 정보 반환
		 * @param {s|[]} names 라이브러리 명
		 * @return {o}
		 */
		o.bundle = function(names) {
			var lib = [],
				list = [],
				modules = [];

			list.push(names);

			_.each(_.compact(_.flatten(list)), function(v) {
				if (o.get(v)) {
					lib.push(o.get(v).lib);
					modules.push(o.get(v).modules);
				}
			});

			modules = _.compact(_.flatten(modules));

			return {
				lib: lib,
				modules: modules
			};
		};

		return o;
	})();

	/**
	 * @method v - nocache용 버전 문자열 생성
	 * @return {s}
	 */
	mz.v = function() {
		return (new Date()).getTime() + (Math.floor(Math.random() * 100) + 1);
	};

	/**
	 * @method path - WEBROOT + APPROOT + 파일PATH 조합 (nocache가 true 일때 캐싱하지 않는다.)
	 * @param {s} uri - file path
	 * @param {b} nocache # - 캐싱여부
	 * @return {s}
	 */
	mz.path = function(uri, nocache) {
		return mz.uri('/' + mz.APPROOT + uri, nocache);
	};

	/**
	 * @method uri - WEBROOT + 파일PATH 조합 (nocache가 true 일때 캐싱하지 않는다.)
	 * @param {s} uri - file path
	 * @param {b} nocache # - 캐싱여부
	 * @return {s}
	 */
	mz.uri = function(uri, nocache) {
		return mz.WEBROOT + uri + (!!nocache ? '?v=' + mz.v() : '');
		console.log("##app.js mz.WEBROOT + uri ###" + mz.WEBROOT + url);
	};

	/**
	 * @method addTag - Head Tag에 element 추가.
	 * @param {s} name - tag name
	 * @param {o} attr - tag attribute
	 * @param {b} sync # - 동기처리 여부
	 */
	mz.addTag = function(name, attr, sync) {
		var head = document.getElementsByTagName('head')[0];
		var el = document.createElement(name);
		_.each(attr, function(v, k) {
			el.setAttribute(k, v);
		});
		sync ? document.write(outerHTML(el)) : head.appendChild(el);
	};

	/**
	 * @method addJs - 입력된 uri의 js를 추가.(nocache가 true 일때 캐싱하지 않는다.)
	 * @param {s} uri - file path
	 * @param {b} nocache # - 캐싱여부
	 */
	mz.addJs = function(uri, nocache) {
		mz.addTag('script', {
			src: mz.uri(uri, nocache)
		}, true);
	};

	/**
	 * @method addCss - 입력된 uri의 link를 추가.(nocache가 true 일때 캐싱하지 않는다.)
	 * @param {s} uri - file path
	 * @param {b} nocache # - 캐싱여부
	 */
	mz.addCss = function(uri, nocache) {
		mz.addTag('link', {
			href: mz.uri(uri, nocache),
			rel: 'stylesheet'
		}, true);
	};

	/**
	 * @method load - 입력된 path의 js를 로드.(nocache가 true 일때 캐싱하지 않는다.)
	 * @param {s}    base - file base path
	 * @param {s|[]} path - file path
	 * @param {b}    nocache # - 캐싱여부
	 */
	mz.load = function(base, path, nocache) {
		var list = [],
			base = _.compact(_.flatten((base || '').split('/'))).join('/');
		list.push(path);
		_.each(_.compact(_.flatten(list)), function(n) {
			var uri = (!!base ? '/' + base : '') + '/' + _.compact(_.flatten(n.split('/'))).join('/');
			var ext = _.last(uri.split('.'));
			if (ext == 'js') {
				mz.addJs(uri, !!nocache);
			}
			if (ext == 'css') {
				mz.addCss(uri, !!nocache);
			}
		}); 
	};

	/**
	 * @method mold - 입력된 함수를 Angular의 Service에 필요한 Constructor로 형성.
	 * @param {f|[]} fn - constructor body
	 * @return {[]}
	 */
	mz.mold = function(fn) {
		return _.isFunction(fn) ? (function(f) {
			var s = f.toString().replace(/\s/g, '').split(')')[0].split('(')[1];
			var m = s ? s.split(',') : [];
			m.push(f);
			return m;
		})(fn) : fn;
	};

	/**
	 * @method run - 모듈 실행 후 입력된 fn을 실행
	 * @param {f} fn - after function
	 */
	mz.run = function(fn) {
		mz.load('', mz.WEBPAGE, true);
		fn();
	};

	/**
	 * @method init - 모듈 초기화
	 * @param {o}    cfg # - 초기화 설정 정보
	 * @param {o|[]} cfg.lib # 라이브러리 정보
	 * @param {s}    cfg.lib.base - 라이브러리 기본 경로
	 * @param {s|[]} cfg.lib.path - 라이브러리 파일 경로
	 * @param {b}    cfg.lib.nocache # - 캐싱여부
	 * @param {s|[]} cfg.modules # - 추가 모듈명
	 * @param {o}    bc # - 비즈니스 호출 모듈 선언
	 */
	mz.init = function(cfg, bc) {
		var lib = [],
			mdules = ['comm'];

		if (cfg && cfg.lib) {
			lib.push(cfg.lib);
			lib = _.compact(_.flatten(lib));

			_.each(lib, function(v) {
				mz.load(v.base, v.path, v.nocache);
			});
		}

		if (cfg && cfg.modules) {
			mdules.push(cfg.modules);
			mdules = _.compact(_.flatten(mdules));
		}

		mz.app = angular.module('app', mdules);

		if (bc) {
			mz.service('bc', ['co', function(co) {
				var http = co.get('http'),
					o = {};
 				_.each(bc, function(v, k) {
					o[k] = function(param) {
						return http.post(v, param);
					};
				});

				return o;
			}]);
		}
	};

	/**
	 * @method config 모듈 설정
	 * @param {o|[]} data - config information
	 * @param {s}    data.path - view path url
	 * @param {s}    data.name - view & controller name
	 * @param {s}    data.tpl - tpl path
	 * @param {s}    otherwise - first view path url
	 */
	mz.config = function(data, otherwise) {
		mz.paths = [];
		mz.app.config(['$routeProvider', 'routeProvider', function($routeProvider, routeProvider) {
			$routeProvider.otherwise({
				redirectTo: otherwise
			});

			_.each(data, function(v) {
				mz.paths.push(v.path);
				v.name = v.name + 'Controller';
				$routeProvider.when(v.path, routeProvider.route(v));
			});
		}]);
	};

	/**
	 * @method controller - controller 선언
	 * @param {s} name - controller name
	 * @param {f|[]} fn - controller constructor
	 */
	mz.controller = function(name, fn) {
		mz.app.controller(name + 'Controller', mz.mold(fn));
	};

	/**
	 * @method service - service 선언
	 * @param {s} name - service name
	 * @param {f|[]} fn - service constructor
	 */
	mz.service = function(name, fn) {
		mz.app.factory(name, mz.mold(fn));
	};

	/**
	 * @method directive - directive 선언
	 * @param {s} name - directive name
	 * @param {f|[]} fn - directive constructor
	 */
	mz.directive = function(name, fn) {
		mz.app.directive(name, mz.mold(fn));
	};

	/**
	 * @method filter - filter 선언
	 * @param {s} name - filter name
	 * @param {f|[]} fn - filter constructor
	 */
	mz.filter = function(name, fn) {
		mz.app.filter(name, mz.mold(fn));
	};

	/**
	 * @method outerHTML - 엘리먼트 outerHTML 반환
	 * @param {o} el - 엘리먼트 객체
	 * @return {s}
	 */
	function outerHTML(el) {
		return el.outerHTML || (function(n) {
			var div = document.createElement('div'),
				h;
			div.appendChild(n);
			h = div.innerHTML;
			div = null;
			return h;
		})(el);
	}
})(angular, mz);
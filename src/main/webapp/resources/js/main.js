
(function(angular, mz) {
	// 모듈 초기화
	var cfg = mz.lib.bundle(['']);
	var bc = {
			test1 : 'com.ppp.bamin.BC.MemberBc.test1',
			test2 : 'ppp.bamin.BC.MemberBc.test1',
			test3 : 'bamin.BC.MemberBc.test1',
			test4 : 'BC.MemberBc.test1'
		/*
		//공지사항 조회
		retrieveNotfMttList : 'f.cg.he.cm.ft.o.bc.NotfMttBc.retrieveNotfMttList',
		//메인 배너조회
		retrieveMainBnrLst : 'f.cg.he.cm.mo.o.bc.MainBnrBc.retrieveMainBnrLst',
		//미지급금 조회
		retrieveUnpyAmt : 'f.cg.he.ct.tr.o.bc.DrmcInsAmtBc.retrieveUnpyAmt'
		*/
	};
	
	mz.init(cfg, bc);
	// 모듈 설정
	mz.config([{
		path: '/',
		name: 'desc',
		tpl: 'memberList'
	},{
		path: '/regist',
		name: 'regist',
		tpl: 'regMember'
	}], '/');
	/**
	 * @method Controller
	 * @param {o} co - 공통컴포넌트
	 * @param {o}  - 스코프
	 */
	mz.controller('desc', function(co, $scope) {
		
		var bc        			= co.get('bc');
		var ajax 		 		= co.get('ajax');
		var $q 					= co.get('$q');
		var $timeout			= co.get('$timeout');
		var $http 				= co.get('$http');
		var location 			= co.get('location');
		
		var retrieveMemberURL 	= "retrieveMember.do";
		
		init();
		
		//회원리스트 조회
		$scope.retrieveMemberList = function (){
			var fn = _$post;
			var url = retrieveMemberURL;
			return fn(url).then(function(result){
				if (!result || result.status != 200) {
					return;
				}
				return result.data.memberList;
				
			}).then(function(result){
				$scope.memberList = result.memberList;
				return result;
			});
		}
		
		$scope.regMember = function(){
			location.go("/main.do","/regist");
		}
		/* - public ------------------------------- */
		/**
		 * 공지사항 화면 이동
		 */
		
		/**
		 * 메뉴 이동
		 */
		
		
		/* - private ------------------------------ */

		/**
		 * @method init - 초기화
		 */
		function init() {
			$scope.memberList = [];

		}
		
		function getListData(obj){
			debugger;
			if (_.isArray(obj)) {
				return obj;
			}
		}
		
		function _$post(url){
			var deferred = $q.defer();

			$timeout(function() {
				$.ajax({
					type: 'POST', 
					url: url,
					contentType: 'application/json; charset=UTF-8',
					success: function(data) {
						deferred.resolve({ data: data, status:200 });
					},
					error: function() {
						deferred.resolve(null);
					}
				});
			},1);
			return deferred.promise;
		}
		
	});
	
	/**
	 * @method registController
	 * @param {o} co - 공통컴포넌트
	 * @param {o}  - 스코프
	 */
	mz.controller('regist', function(co, $scope) {
		
		var bc        			= co.get('bc');
		var ajax 		 		= co.get('ajax');
		var $q 					= co.get('$q');
		var $timeout			= co.get('$timeout');
		var $http 				= co.get('$http');
		var location 			= co.get('location');
		
		init();
		
		//회원리스트 조회
		
		/* - public ------------------------------- */
		/**
		 * 공지사항 화면 이동
		 */
		
		/**
		 * 메뉴 이동
		 */
		
		
		/* - private ------------------------------ */

		/**
		 * @method init - 초기화
		 */
		function init() {
			$scope.memberList = [];

		}
		
		function _$post(url){
			var deferred = $q.defer();

			$timeout(function() {
				$.ajax({
					type: 'POST', 
					url: url,
					contentType: 'application/json; charset=UTF-8',
					success: function(data) {
						deferred.resolve({ data: data, status:200 });
					},
					error: function() {
						deferred.resolve(null);
					}
				});
			},1);
			return deferred.promise;
		}
		
	});
	
	
})(angular, mz);
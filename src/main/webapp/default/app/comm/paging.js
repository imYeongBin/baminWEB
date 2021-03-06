(function(angular, mz) {/*
	*//** ATTR DATA-PAGING : 페이징 *//*
	mz.comm.directive('paging', mz.mold(function() {
		*//**
		 * 디렉티브 내부 scope에 값을 셋팅한다.
		 *//*
		function setScopeValues(scope, attrs) {
			scope.List = [];
			scope.Hide = false;
			scope.page = parseInt(scope.page) || 1;
			scope.total = parseInt(scope.total) || 0;
			//scope.dots = scope.dots || '...';
			scope.ulClass = scope.ulClass || 'ulClass';
			scope.adjacent = parseInt(scope.adjacent) || 2;
			scope.activeClass = scope.activeClass || '';
			scope.disabledClass = scope.disabledClass || 'disabled';

			scope.scrollTop = scope.$eval(attrs.scrollTop);
			scope.hideIfEmpty = scope.$eval(attrs.hideIfEmpty);
			scope.showPrevNext = scope.$eval(attrs.showPrevNext);

			scope.moveFirst = function() {
				internalAction(scope, 1);
			};
			scope.movePrev = function() {
				if (scope.page !== 1) {
					if (scope.page > 1) {
						internalAction(scope, scope.page - 10);
					};
				}
			};
			scope.moveNext = function() {
				if (scope.pageCount > scope.page) {
					if (scope.pageCount <= scope.page + 10) {
						internalAction(scope, scope.pageCount);
					} else {
						internalAction(scope, scope.page + 10);
					}
				}
			};
			scope.moveLast = function() {
				if (scope.pageCount > scope.page) {
					internalAction(scope, scope.pageCount);
				}
			};
			scope.selectedPageSize = function(obj) {
				scope.pageSize = obj.pageSize;
				scope.page = 1;
				scope.pagingAction({
					page: scope.page
				});
			};
		}

		*//**
		 * 셋팅 값 유효성 체크
		 *//*
		function validateScopeValues(scope, pageCount) {
			if (scope.page > pageCount) {
				scope.page = pageCount;
			}
			if (scope.page <= 0) {
				scope.page = 1;
			}
			if (scope.adjacent <= 0) {
				scope.adjacent = 2;
			}
			if (pageCount <= 1) {
				scope.Hide = scope.hideIfEmpty;
			}
		}

		*//**
		 * 액션발생시 호출되며 상위 controller에 인자를 전달하는 액션을 취한다.
		 *//*
		function internalAction(scope, page) {
			if (scope.page != page) {
				scope.page = page;
				scope.pagingAction({
					page: page
				});
				if (scope.scrollTop) {
					scrollTo(0, 0);
				}
			}
		}

		*//**
		 * 보여줄 페이지의 범위를 설정
		 *//*
		function addRange(start, finish, scope) {
			var i = start;
			for (; i <= finish; i++) {
				var item = {
					total: scope.total,
					value: i,
					title: 'Page ' + i,
					liClass: scope.page == i ? scope.activeClass : '',
					action: function() {
						internalAction(scope, this.value);
					}
				};
				scope.List.push(item);
				if (scope.scrollTop) {
					scrollTo(0, 0);
				}
			}
		}

		*//**
		 * 디렉티브 생성시 최초 호출
		 * 페이징 영역을 생성한다.
		 *//*
		function build(scope, attrs) {
			if (!scope.pageSize || scope.pageSize < 0) {
				return;
			}

			setScopeValues(scope, attrs);

			var start, finish, pageCount = Math.ceil(scope.total / scope.pageSize);
			scope.pageCount = pageCount;

			validateScopeValues(scope, pageCount);

			if (pageCount) {
				if (scope.page > 10) {
					var tempPage = scope.page + "";
					var str1 = tempPage.substring(tempPage.length - 2, tempPage.length - 1);
					var str2 = tempPage.substring(tempPage.length - 1, tempPage.length);

					if (str2 === "0") {
						start = scope.page - 9;
					} else {
						start = scope.page - parseInt(str2) + 1;
					}
				} else {
					start = 1;
				}

				if (scope.page === pageCount || start + 9 > pageCount) {
					finish = pageCount;
					scope.lastArea = false;
				} else {
					finish = start + 9;
					scope.lastArea = true;
				}
				addRange(start, finish, scope);
			}
		}
		return {
			restrict: 'A',
			scope: {
				page: '=',
				pageSize: '=',
				total: '=',
				dots: '=',
				lastArea: '=',
				activeClass: '@',
				disabledClass: '@',
				pagingAction: '&'
			},
			templateUrl: mz.path('/views/comm/commPaging.tpl', true),
			link: function(scope, element, attrs) {
				scope.layout = scope.$parent.$parent.layout;
				scope.$watchCollection('[page,total]', function() {
					build(scope, attrs);
				});
			}
		};
	}));
*/})(angular, mz);
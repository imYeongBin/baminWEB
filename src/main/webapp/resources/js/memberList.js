var app = angular.module('myApp',[]);

app.controller('comm', function($scope, $http, $location,$q,$timeout) {
	var url = "./retrieveMemberList.do";
	
	$scope.pageName = "memberListPage";
	$scope.memberList;	
	$scope.memberListFlag= false;
	
	$scope.moveMain = function(){
		location.href="./main.do";
	}
	$scope.moveInsertMember = function(){
		location.href="./moveInsertMember.do";
	}
	
	$scope.retrieveM = function (){
		
		$scope.memberListFlag = true;
		var fn= _$post;
		
		return fn(url).then(function(result){
			var r_tm = new Date();
			if (!result) {
				return;
			}

			if (result.status != 200) {
				return;
			}

			$scope.memberList = getListData(result.data);
			return getListData(result.data);
		}).then(function(result){
			return getListData(result.data);
		});
	}
	
	function getListData(obj){
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
	
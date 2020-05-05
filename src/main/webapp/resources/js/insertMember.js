var app = angular.module('myApp',[]);

app.controller('comm', function($scope, $http, $location,$q,$timeout) {
	var url = "./insertMember.do";
	init();
	setTimeout(function(){
		retrieveLctnCode();
	},300);
	
	$scope.moveMain = function(){
		location.href="./main.do";
	};
	
	function init(){
		
		$scope.attCnt=0;
		$scope.feeBalance=0;
		$scope.showGangseoFlag=false;
		
		$scope.pageName = "insertMemberPage";

	};
	
	$scope.selectChange = function(){
		if($scope.selectedLctn1=="gangseo"){ //강서구 선택
			$scope.showGangseoFlag=true;
		}else {	//이외지역 선택
			
			$scope.selectedLctn2="";
			$scope.showGangseoFlag=false;
		}
		
	}
	
	
	
	
	
	 function retrieveLctnCode(){
		
		var fn= _$post;
		
		return fn(url).then(function(result){
			var r_tm = new Date();
			if (!result) {
				return;
			}

			if (result.status != 200) {
				return;
			}

			$scope.lctnCodeListMap = result.data;
			$scope.selectLctn1=$scope.lctnCodeListMap.lctn1List;
			$scope.selectLctn2=$scope.lctnCodeListMap.lctn2List;
			return result.data;
		}).then(function(result){
			return result.data;
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
				url: './retrieveLctnCode.do',
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
	
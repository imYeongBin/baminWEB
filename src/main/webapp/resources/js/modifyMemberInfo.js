var app = angular.module('myApp',[]);

app.controller('comm', function($scope, $http, $location,$q,$timeout) {
	var modifyMemberInfoUrl = "./modifyMemberInfo.do";
	var retrieveMemberUrl = "./retrieveMemberInfo.do";
	var retrieveLctnCodeUrl = "./retrieveLctnCode.do";
	init();
	
	$scope.moveMain = function(){
		location.href="./main.do";
	};
	
	/*  private  */
	
	function init(){
		//retrieveMemberInfo();
		$scope.attCnt=0;
		$scope.feeBalance=0;
		$scope.showGangseoFlag=false;
		$scope.pageName = "modifyMemberInfo";

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
		var param = {
				
		};
		
		return fn(retrieveLctnCodeUrl,param).then(function(result){
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
	
	
	
	 function retrieveMemberInfo(){
		debugger;
		var fn= _$post;
		var param={
				memberNo : "",
		};
		return fn(retrieveMemberUrl,param).then(function(result){
			debugger;
			if (!result) {
				return;
			}

			if (result.status != 200) {
				return;
			}
			return result.data;
		}).then(function(result){
			return result.data;
		});
	}
	
	 
	 function modifyMemberInfo (){
			
			var fn= _$post;
			var param={
					memberNm : "",
					attCnt : "",
					telNo : "",
					lctn1 : "",
					lctn2 : "",
					gndr : "",
					age : "",
					feeBalance : ""
			};
			
			return fn(modifyMemberInfoUrl,param).then(function(result){
				var r_tm = new Date();
				if (!result) {
					return;
				}

				if (result.status != 200) {
					return;
				}
				return result.data;
			}).then(function(result){
				return result.data;
			});
		}
	 
	 
	 
	 
	/*  public   */
	 
	function getListData(obj){
		if (_.isArray(obj)) {
			return obj;
		}
	}
	
	function _$post(url,param){
		var deferred = $q.defer();
		$timeout(function() {
			$.ajax({
				type: 'POST', 
				url: url,
				data:param,
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
	
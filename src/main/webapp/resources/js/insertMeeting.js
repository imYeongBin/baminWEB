var app = angular.module('myApp',[]);

app.controller('comm', function($scope, $http, $location,$q,$timeout) {
	var url = "./retrieveMeetingList.do";
	
	
	init();
	
	function callHttp(url, inDsMap, callback){
		inDsMap ={
				name : "aaaaaaa",
				age : "22"
		};
		$http.post(url,JSON.stringify(inDsMap)).then(function(result){
			debugger;
			$scope.memberList = getListData(result.data);
		});
		
	}
	
	
	function getListData(obj){
		if (_.isArray(obj)) {
			return obj;
		}
	}
	
	/*  public function  */
	$scope.addMember = function (){
		url ="./retrieveMemberList.do";
		var param = {
		};
		
		callHttp(url, param, function(output){
			debugger;
		})
	}
	
	/* private function  */
	function init(){
		
		$scope.pageName = "insertMeeting";
		$scope.memberList;	
		$scope.showMemberListFlag = true;
		
		
	}//end of init function
	
	$scope.moveMain = function(){
		location.href="./main.do";
	}
	$scope.moveInsertMember = function(){
		location.href="./moveInsertMember.do";
	}
	
	
});
	
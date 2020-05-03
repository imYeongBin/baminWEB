var app = angular.module('myApp',[]);

app.controller('comm', function($scope, $http, $location) {
	
	var URL = "/main.do";
	$scope.pageName = "main Page111111";
	
	
	$scope.goList = function(selType){
		if(selType =='1'){
			location.href="memberList.do";
		}else if(selType =='2'){
			location.href="meetingList.do";
		}else if(selType =='3'){
			location.href="mngEtc.do";
		}
	}

	
	
	
});
	
	

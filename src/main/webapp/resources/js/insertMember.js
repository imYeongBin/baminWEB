var app = angular.module('myApp',[]);

app.controller('comm', function($scope, $http, $location,$q,$timeout) {
	var url = "./insertMember.do";
	
	$scope.pageName = "insertMemberPage";
	$scope.moveMain = function(){
		location.href="./main.do";
	};
	
	$scope.addMember = function(){
		debugger;
		var param = {
				memberNo : $scope.memberNo ||'',
				memberNm : $scope.memberNm||'', 
				telNo : $scope.telNo||'',
				attCnt : $scope.attCnt||'',
				lctn : $scope.lctn||'',
				gndr : $scope.gndr||'',
				age : $scope.age||'',
				feeBalance : $scope.feeBalance||''
		};
		debugger;
		$.ajax({
			data: JSON.stringify(param),
			method : "GET",
			url: url,
			//contentType: 'application/json; charset=UTF-8',
			success: function(data) {
				debugger;
				location.href = "./completeInsert.do";
			},
			error: function(err) {
				console.log(err);
				debugger;
			}
		});
	};
	
	
	
	
});
	
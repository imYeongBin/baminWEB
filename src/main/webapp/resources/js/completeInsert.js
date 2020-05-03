var app = angular.module('myApp',[]);

app.controller('comm', function($scope) {
	var url = "./completeInsert.do";
	
	$scope.moveMain = function(){
		location.href="./main.do";
	}
	
	
});
	
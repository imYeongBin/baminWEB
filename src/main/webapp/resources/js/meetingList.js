var app = angular.module('myApp',[]);

app.controller('comm', function($scope, $http, $location,$q,$timeout) {
	var url = "./retrieveMeetingList.do";
	
	
	init();
	
	function callHttp(url,inDsMap){
		var fn= _$post;
		
		fn(url,inDsMap).then(function(result){
			var r_tm = new Date();
			if (!result) {
				return;
			}

			if (result.status != 200) {
				return;
			}

			$scope.meetingList = getListData(result.data);
		})
	}
	
	function _$post(url,inDsMap){
		var deferred = $q.defer();
		$timeout(function() {
			$.ajax({
				type: 'POST', 
				data: inDsMap||'',
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
	
	
	function getListData(obj){
		if (_.isArray(obj)) {
			return obj;
		}
	}
	
	/*  public function  */
	$scope.retrieveMeetingList = function (){
		$scope.meetingListFlag = true;
		var param = {
		};
		callHttp (url, param);
	}
	
	/* private function  */
	function init(){
		
		$scope.pageName = "meetingListPage";
		$scope.meetingList;	
		$scope.meetingListFlag= false;
		
		
	}//end of init function
	
	$scope.moveMain = function(){
		location.href="./main.do";
	}
	$scope.moveInsertMeeting = function(){
		location.href="./moveInsertMeeting.do";
	}
	
	$scope.retrieveMeetingDetail = function(meeting){
		var meetingNo = meeting.meetingNo;
		if(meetingNo == null || meetingNo == undefined){
			alert("");
		}else{
			//세부조회
			url = "./retrieveMeetingDetail.do";
			var param ={
				meetingNo : meetingNo	
			};
			$scope.meetingDetail = callHttp(url,param);
			
		}
		
	}
	
	

	
});
	
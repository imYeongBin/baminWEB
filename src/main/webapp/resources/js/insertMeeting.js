var app = angular.module('myApp',[]);

app.controller('comm', function($scope, $http, $location,$q,$timeout) {
	var url = "./retrieveMeetingList.do";
	
	var memberArr = [];
	$scope.addedMemberList = [];
	init();

	/*  public function  */
	
	function callHttp(url, inDsMap, callback){
		debugger;
		$http.post(url,inDsMap).then(function(result){
			debugger;
			$scope.memberList = getListData(result.data);
		});
		
	}
	
	function getListData(obj){
		if (_.isArray(obj)) {
			return obj;
		}
	}
	
	$scope.moveMain = function(){
		location.href="./main.do";
	}
	$scope.moveInsertMember = function(){
		location.href="./moveInsertMember.do";
	}

	
	/* private function  */
	function init(){
		$scope.devModeYn = "Y";
		
		$scope.totalMemberFee = 0;
		$scope.totalGuestFee = 0;
		$scope.totalFee = 0 ;
		$scope.pageName = "insertMeeting";
		$scope.memberList;	
		$scope.showMemberListFlag = false;
		$scope.addedMemberNoList;
	}//end of init function
	
	
	
	$scope.addMember = function (){
		
		if($scope.showMemberListFlag ==true){
			$scope.showMemberListFlag = false;
		}else {
			$scope.showMemberListFlag = true;
		}
		
		url ="./retrieveMemberList.do";
		var param = {
/*				meetingDate : $scope.meetingDate,
				lctn : $scope.lctn,
				attCnt : $scope.addedMemberList.length,
				memberFee : $scope.memberFee,
				guestCnt : $scope.guestCnt,
				guestFee : $scope.guestFee,
				totFee : $scope.totFee*/
				name : "aaa"
		};
		
		callHttp(url, param, function(output){
		})
	}
	
	$scope.add = function(member){
			
		if($scope.devModeYn != "Y"){ //개발모드인 경우 패스 
			if($scope.memberFee == undefined || $scope.memberFee == null){
				alert("input memberFee !!");
				return false;
			};
			if(member.feeBalance < $scope.memberFee){
				alert(member.memberNm+"회원 잔액부족!!! ");
				return false;
			};
		}

		
		var memberNo = member.memberNo;
		$scope.flag = false;
		if(memberNo<10){
			memberNo = "0"+memberNo;
		};
		if(memberArr.length==0){
			
			memberArr.push(member);
		}else{
			for(var a=0; a<memberArr.length;a++){
				if(memberArr[a].memberNo == memberNo){
					memberArr.splice(a,1);
					$scope.flag = true;
					break; 
				}
			}
			if(!$scope.flag){
				memberArr.push(member);
			}
		}
		
		$scope.addedMemberList = memberArr;
		$scope.attCnt = $scope.addedMemberList.length;
		$scope.calc();
	}
	
	
	$scope.regMeeting = function (){
		var memberListStr = "";
		for(var a=0; a<$scope.addedMemberList.length; a++){
			memberListStr += $scope.addedMemberList[a].memberNo+"|";
		}
		
		var param= {
				meetingDate : $scope.meetingDate,
				lctn : $scope.lctn,
				memberCnt : $scope.addedMemberList.length,
				memberFee : $scope.memberFee,
				totalMemberFee : $scope.totalMemberFee,
				guestCnt : $scope.guestCnt,
				guestFee : $scope.guestFee,
				totalGuestFee : $scope.totalGuestFee,
				totalFee : Number($scope.totalMemberFee) + Number($scope.totalGuestFee),
				totalCnt : Number($scope.addedMemberList.length) + Number($scope.guestCnt),
				memberListStr : memberListStr
		};
		
		debugger;
		
		url ="./insertMeeting.do";
	
		callHttp(url, param, function(output){
		})
		
	}
	
	
	
	
	$scope.calc = function (){
		if($scope.memberFee != null && $scope.addedMemberList.length != null){
			$scope.totalMemberFee = $scope.memberFee * $scope.addedMemberList.length;
		}else {
			$scope.totalMemberFee = 0;
		}
		if($scope.guestFee != null && $scope.guestCnt!= null){
			$scope.totalGuestFee = $scope.guestFee * $scope.guestCnt;
		}else {
			$scope.totalGuestFee = 0;
		}
		
		$scope.attCnt = $scope.addedMemberList.length;
		$scope.totalCnt = Number($scope.attCnt) + Number($scope.guestCnt);
		$scope.totalFee = Number($scope.totalGuestFee) + Number($scope.totalMemberFee);
		
	};
});
	
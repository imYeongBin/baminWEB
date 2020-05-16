<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html> 
<head>
<c:set var="webRoot" value="${pageContext.request.contextPath}"/>
<%
	String path = request.getContextPath();
	String getServletPath = request.getServletPath().toString();//		/main.do
	String defaultLayout = getServletPath.replace("/", "").replace(".do", "");
	System.out.println("Here is insertMeeting.jsp!!!");
%>
<script type="text/javascript" src="${webRoot}/common/js/underscore/underscore-min.js"></script>
<script type="text/javascript" src="${webRoot}/common/js/jquery/jquery.min.js"></script>
<script type="text/javascript" src="${webRoot}/common/js/jquery/jquery.form.min.js"></script>
<script type="text/javascript" src="${webRoot}/common/js/angular/angular.js"></script>
<script type="text/javascript" src="${webRoot}/common/js/angular/angular-route.js"></script>
<script type="text/javascript" src="${webRoot}/common/js/angular/angular-animate.js"></script>
<script type="text/javascript" src="${webRoot}/common/js/angular-block-ui/angular-block-ui.min.js"></script>

<script src="${webRoot}/resources/js/insertMeeting.js"></script>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body data-ng-app="myApp" data-ng-controller="comm"> 
	<div>
		<div class="input_form" style="float:left">	<!-- input form -->
			<form action="./insertMeeting.do" name="regForm" method="post" accept-charset="utf-8">
				<h3> welcome insertMeeting page!!</h3>
				<!-- input area -->
				<table>
					<tr>
						<th>date</th>
						<td><input type="text" data-ng-model="meetingDate" name="meetingDate" id="meetingDate"></td>
					</tr>
					<tr>
						<th>Location</th>
						<td><input type="text" data-ng-model="lctn" name="lctn" id="lctn"></td>
					</tr>
					<tr>
						<th>member</th>
						<td><a href="#" data-ng-click="addMember()">참가자등록</a></td>
					</tr>

					<tr>
						<th>guestCnt</th>
						<td>
							<input type="text" data-ng-model="guestCnt" name="guestCnt" id="guestCnt">
						</td>
					</tr>
					<tr>
						<th>guestFee</th>
						<td>
							<input type="text" data-ng-model="guestCnt" name="guestCnt" id="guestCnt">
						</td>
					</tr>
					<tr>
						<th>totalCnt</th>
						<td>
							<input type="text" data-ng-model="totalCnt" name="totalCnt" id="totalCnt">
						</td>
					</tr>
					<tr>
						<th>totalFee</th>
						<td>
							<input type="text" data-ng-model="totalFee" name="totalFee" id="totalFee">
						</td>
					</tr>
				</table>
				<!-- button area -->
				<div>
					<input type="submit">
					<a href="#" class="btn btn_confirm" data-ng-click="regMeeting()">confirmed</a>
					<a href="#" class="btn btn_cancel" data-ng-click="cancelReg()">cancelled</a>
					<a href="#" class="btn" data-ng-click="moveMain()">Go to main</a>
				</div>
			</form>
		</div>
		
		<div class="show_memberList"style="float:left" data-ng-if="showMemberListFlag==true">	<!-- show memberList -->
			<h3>memberList</h3>
			<table>
				<tr data-ng-repeat="member in memberList">
					<td>{{member.memberNm}}</td>
				</tr>
			</table>
		</div>
	</div>
	
</body>
</html>
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
	System.out.println("Here is meetingList.jsp!!!");
%>
<script type="text/javascript" src="${webRoot}/common/js/underscore/underscore-min.js"></script>
<script type="text/javascript" src="${webRoot}/common/js/jquery/jquery.min.js"></script>
<script type="text/javascript" src="${webRoot}/common/js/jquery/jquery.form.min.js"></script>
<script type="text/javascript" src="${webRoot}/common/js/angular/angular.js"></script>
<script type="text/javascript" src="${webRoot}/common/js/angular/angular-route.js"></script>
<script type="text/javascript" src="${webRoot}/common/js/angular/angular-animate.js"></script>
<script type="text/javascript" src="${webRoot}/common/js/angular-block-ui/angular-block-ui.min.js"></script>

<script src="${webRoot}/resources/js/meetingList.js"></script>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body data-ng-app="myApp" data-ng-controller="comm"> 
<h3> welcome memberList page!!</h3>
<a href="#" data-ng-click="retrieveMeetingList()">조회하기</a>
<div data-ng-show="meetingListFlag==true">
	<h3>memberList List</h3>
	<table>
		<tr>
			<th>meetingNo</th>
			<th>meetingDate</th>
			<th>lctn</th>
			<th>attCnt</th>
			<th>memberFee</th>
			<th>guestCnt</th>
			<th>guestFee</th>
			<th>totFee</th>
			
		</tr>
		<tr data-ng-repeat="meeting in meetingList" data-ng-click="retrieveMeetingDetail(meeting)">
		<td>{{meeting.meetingNo}}</td>
		<td>{{meeting.meetingDate}}</td>
		<td>{{meeting.lctn}}</td>
		<td>{{meeting.attCnt}}</td>
		<td>{{meeting.memberFee}}</td>
		<td>{{meeting.guestCnt}}</td>
		<td>{{meeting.guestFee}}</td>
		<td>{{meeting.totFee}}</td>
		</tr>
	</table>
</div>

<a href="#" data-ng-click="moveInsertMeeting()">Go to reg Meeting</a>
<a href="#" data-ng-click="moveMain()">Go to main</a>

</body>
</html>
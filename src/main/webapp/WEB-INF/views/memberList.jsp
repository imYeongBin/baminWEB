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
	System.out.println("Here is memberList.jsp!!!");
%>
<script type="text/javascript" src="${webRoot}/common/js/underscore/underscore-min.js"></script>
<script type="text/javascript" src="${webRoot}/common/js/jquery/jquery.min.js"></script>
<script type="text/javascript" src="${webRoot}/common/js/jquery/jquery.form.min.js"></script>
<script type="text/javascript" src="${webRoot}/common/js/angular/angular.js"></script>
<script type="text/javascript" src="${webRoot}/common/js/angular/angular-route.js"></script>
<script type="text/javascript" src="${webRoot}/common/js/angular/angular-animate.js"></script>
<script type="text/javascript" src="${webRoot}/common/js/angular-block-ui/angular-block-ui.min.js"></script>

<script src="${webRoot}/resources/js/memberList.js"></script>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body data-ng-app="myApp" data-ng-controller="comm"> 
<h3> welcome memberList page!!</h3>
<a href="#" data-ng-click="retrieveM()">조회하기</a>
<div data-ng-show="memberListFlag==true">
	<h3>memberList List</h3>
	<table>
		<tr>
			<th>번호</th>
			<th>이름</th>
			<th>지역</th>
			<th>성별</th>
			<th>나이</th>
			<th>연락처</th>
			<th>잔여회비</th>
		</tr>
		<tr data-ng-repeat="mem in memberList">
		<td>{{mem.memberNo}}</td>
		<td>{{mem.memberNm}}</td>
		<td>{{mem.lctn1+" "+mem.lctn2}}</td>
		<td>{{mem.gndr}}</td>
		<td>{{mem.age}}</td>
		<td>{{mem.telNo}}</td>
		<td>{{mem.feeBalance}}</td>
		</tr>
	</table>
</div>

<a href="#" data-ng-click="moveInsertMember()">Go to reg Member</a>
<a href="#" data-ng-click="moveMain()">Go to main</a>

</body>
</html>
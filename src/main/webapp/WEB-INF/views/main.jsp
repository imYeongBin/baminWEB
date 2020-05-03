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
System.out.println("Here is main.jsp!!");
%>
<script type="text/javascript" src="${webRoot}/common/js/underscore/underscore-min.js"></script>
<script type="text/javascript" src="${webRoot}/common/js/jquery/jquery.min.js"></script>
<script type="text/javascript" src="${webRoot}/common/js/jquery/jquery.form.min.js"></script>
<script type="text/javascript" src="${webRoot}/common/js/angular/angular.js"></script>
<script type="text/javascript" src="${webRoot}/common/js/angular/angular-route.js"></script>
<script type="text/javascript" src="${webRoot}/common/js/angular/angular-animate.js"></script>
<script type="text/javascript" src="${webRoot}/common/js/angular-block-ui/angular-block-ui.min.js"></script>
<script type="text/javascript" src="${webRoot}/common/js/library_allinone.js"></script>
<%-- <script type="text/javascript" src="${webRoot}/default/app/comm/common.js"></script> --%>
<%-- 
<script src="${webRoot}/common/app/app.js"></script>
<script src="${webRoot}/common/app/core/core.js"></script>
<script src="${webRoot}/default/app/comm/comm.js"></script>
<script src="${webRoot}/default/app/run.js"></script>
 --%>
<script src="${webRoot}/resources/js/main.js"></script>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body data-ng-app="myApp" data-ng-controller="comm"> 
	<h2>{{pageName}}</h2>
	<h3>333</h3>
	<ul>
		<li><a href="#" data-ng-click="goList(1)">memberList</a></li>
		<li><a href="#" data-ng-click="goList(2)">meetingList</a></li>
		<li><a href="#" data-ng-click="goList(3)">manage ETC</a></li>
	</ul>
</body>
</html>
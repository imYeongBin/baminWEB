<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html> 
<head>

<%
String path = request.getContextPath();
String getServletPath = request.getServletPath().toString();//		/main.do
String defaultLayout = getServletPath.replace("/", "").replace(".do", "");
%>


<script
  src="https://code.jquery.com/jquery-3.4.1.min.js" integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo=" crossorigin="anonymous"></script>
<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/angularjs/1.7.9/angular.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/<%=defaultLayout%>"></script>



<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
<div ng-app="myApp" ng-controller="memberReg">





</div><!-- end of controller -->
</body>
</html>
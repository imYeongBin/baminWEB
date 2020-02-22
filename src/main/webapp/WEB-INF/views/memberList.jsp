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
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/memberList.js"></script>

<% 
%>


<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
<div ng-app="myApp" ng-controller="memberList">
	
	<script type="text/javascript">
	$scope.memberList = <% request.getAttribute("memberList"); %>
	</script>
	<h1>회원관리</h1>
	<div>
		<table>
			<tr>
				<th>회원번호</th>
				<th>이름</th>
				<th>참석수</th>
				<th>연락처</th>
				<th>거주지역</th>
				<th>성별</th>
				<th>나이</th>
				<th>잔여회비</th>
			</tr>
			<tr ng-repeat="item in memberList">
				<td>{{item.memberNo}}</td>
				<td>{{item.memberNm}}</td>
				<td>{{item.attCnt}}</td>
				<td>{{item.telNo}}</td>
				<td>{{item.lctn}}</td>
				<td>{{item.gndr}}</td>
				<td>{{item.age}}</td>
				<td>{{item.feeBalance}}</td>
			</tr>
				
			
		</table>
	</div>




</div><!-- end of controller -->
</body>
</html>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>

<head>
<script
  src="https://code.jquery.com/jquery-3.4.1.min.js" integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo=" crossorigin="anonymous"></script>
<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/angularjs/1.7.9/angular.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/main.js"></script>

<%String path = request.getContextPath(); %>

<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>

<div ng-app="myApp" ng-controller="myCtrl">

<ul>
	<li><a href="<%=path%>/memberList.do">회원명단</a></li>
	<li><a href="<%=path%>/meetingList.do">정모관리</a></li>
	<li><a href="<%=path%>/etcMng.do">기타관리</a></li>
</ul>




</div>

	
<%-- <a href="memberList.do">회원리스트 <%=request.getContextPath() %></a>
<a href="meetingList.do">정모리스트</a>
<a href="etcMng.do">기타관리</a> --%>

</body>
</html>
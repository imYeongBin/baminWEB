<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<%-- <%response.setHeader("X-UA-Compatible","IE=edge"); %> --%>
<c:set var="webRoot" value="${pageContext.request.contextPath}"/>


<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">

<title>BaminchiGo</title>
<script type="text/javascript" src="${webRoot}/common/js/underscore/underscore-min.js"></script>
<script type="text/javascript" src="${webRoot}/common/js/jquery/jquery.min.js"></script>
<script type="text/javascript" src="${webRoot}/common/js/jquery/jquery.form.min.js"></script>
<script type="text/javascript" src="${webRoot}/common/js/angular/angular.js"></script>
<script type="text/javascript" src="${webRoot}/common/js/angular/angular-route.js"></script>
<script type="text/javascript" src="${webRoot}/common/js/angular/angular-animate.js"></script>
<script type="text/javascript" src="${webRoot}/common/js/angular-block-ui/angular-block-ui.min.js"></script>
<script type="text/javascript" src="${webRoot}/common/js/library_allinone.js"></script>
<script type="text/javascript" src="${webRoot}/default/app/comm/common.js"></script>

<script src="${webRoot}/common/app/app.js"></script>
<script src="${webRoot}/common/app/core/core.js"></script>
<script src="${webRoot}/default/app/comm/comm.js"></script>

</head>
<body >

	<div id="wrap">
		<div id="container">
			<div data-ui-snb class="snb" id="snb"></div>
			
			<h1>에러 페이지 입니다.</h1>
			
			
			<div data-ng-view id="content"></div>
		</div>
	</div>




</body>
</html>




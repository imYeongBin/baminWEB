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
	System.out.println("Here is insertMember.jsp!!!");
%>
<script type="text/javascript" src="${webRoot}/common/js/underscore/underscore-min.js"></script>
<script type="text/javascript" src="${webRoot}/common/js/jquery/jquery.min.js"></script>
<script type="text/javascript" src="${webRoot}/common/js/jquery/jquery.form.min.js"></script>
<script type="text/javascript" src="${webRoot}/common/js/angular/angular.js"></script>
<script type="text/javascript" src="${webRoot}/common/js/angular/angular-route.js"></script>
<script type="text/javascript" src="${webRoot}/common/js/angular/angular-animate.js"></script>
<script type="text/javascript" src="${webRoot}/common/js/angular-block-ui/angular-block-ui.min.js"></script>

<script src="${webRoot}/resources/js/insertMember.js"></script>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body data-ng-app="myApp" data-ng-controller="comm"> 
	<form action="./insertMember.do" name="regForm" method="post" accept-charset="utf-8">
	<h3> welcome insertMember page!!</h3>
	<!-- input area -->
		<table>
			<tr>
				<th>이름</th>
				<td><input type="text" data-ng-model="memberNm" name="memberNm" id="memberNm"></td>
			</tr>
			<tr>
				<th>참석수1</th>
				<td><input type="text" data-ng-model="attCnt" value="0" name="attCnt" id="attCnt"></td>
			</tr>		
			<tr>
				<th>연락처1</th>
				<td><input type="text" data-ng-model="telNo" name="telNo" id="telNo"></td>
			</tr>
			<tr>
				<th>지역</th>
				<td>
				<!-- <input type="text" data-ng-model="lctn" name="lctn" id="lctn"> -->
				 
				<select data-ng-model="selectedLctn1" name="selectedLctn1" data-ng-change="selectChange()">
					<option data-ng-repeat="lctn in selectLctn1" value="{{lctn.CODEKEY}}">{{lctn.CODEVALUE}}</option>
				</select>
				
				<select data-ng-show="showGangseoFlag==true" name="selectedLctn2" data-ng-model="selectedLctn2">
					<option data-ng-repeat="lctn in selectLctn2" value="{{lctn.CODEKEY}}">{{lctn.CODEVALUE}}</option>
				</select>
				
				</td> 
				
				
			</tr>
			<tr>
				<th>성별</th>
				<td>
				<!-- <input type="text" data-ng-model="gndr" name="gndr" id="gndr"> -->
					<input type="radio" data-ng-model="gndr" name="gndr" value="M" id="M">
					<label for="M">남</label>
					<input type="radio" data-ng-model="gndr" name="gndr" value="F" id="F">
					<label for="F">여</label>

				</td>
			</tr>
			<tr>
				<th>나이</th>
				<td><input type="text" data-ng-model="age" name="age" id="age"></td>
			</tr>
			<tr>
				<th>회비잔액</th>
				<td><input type="text" data-ng-model="feeBalance" name="feeBalance" id="feeBalance"></td>
			</tr>
		</table>
	<!-- button area -->
	<div>
		<input type="submit">
		<a href="#" class="btn btn_confirm" data-ng-click="addMember()">confirmed</a>
		<a href="#" class="btn btn_cancel" data-ng-click="cancelReg()">cancelled</a>
		<a href="#" class="btn" data-ng-click="moveMain()">Go to main</a>
	</div>
	</form>
</body>
</html>
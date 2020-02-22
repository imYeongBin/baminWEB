<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    
    
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
	<table>	
		<tr>
			<td>번호</td>
			<td>이름</td>
			<td>참석수</td>
			<td>연락처</td>
			<td>지역</td>
			<td>성별</td>
			<td>나이</td>
			<td>잔여회비</td>
		</tr>
		<c:forEach items="${memberList}" var="member">
			<tr>
				<td>${member.memberNo}</td>
				<td>${member.memberNm}</td>
				<td>${member.attCnt}</td>
				<td>${member.telNo}</td>
				<td>${member.lctn}</td>
				<td>${member.gndr}</td>
				<td>${member.age}</td>
				<td>${member.feeBalance}</td>
			</tr>
		</c:forEach>	
	</table>

</body>
</html>
<div>


<table>
	<colgroup>
		<col style="width:5%">
		<col style="width:15%">
		<col style="width:*">
		<col style="width:7%">
	</colgroup>
	<thead>
		<tr class="table_header">
			<th>No</th>
			<th>회원번호</th>
			<th>이름</th>
			<th>나이</th>
			<th>성별</th>
		</tr>
	</thead>
	<tbody>
		<tr data-ng-repeat="member in memberList">
		<td>{{$index+1}}</td>
		<td>{{member.memberNo}}</td>
		<td>{{member.memberNm}}</td>
		<td>{{member.age}}</td>
		<td>{{member.gndr=='1'?'남':'여'}}</td>
	</tr>
	</tbody>
	

</table>
<a href="" data-ng-click="retrieveMemberList()">조회</a>
<a href="" data-ng-click="regMember()">등록페이지</a>
</div>
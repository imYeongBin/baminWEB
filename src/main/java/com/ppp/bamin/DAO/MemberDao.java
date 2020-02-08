package com.ppp.bamin.DAO;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.sql.DataSource;

import com.ppp.bamin.DTO.MemberDto;

public class MemberDao {
	
	DataSource dataSource;
	
	
	public MemberDao() {
		try {
			Context context = new InitialContext();
			dataSource = (DataSource)context.lookup("java:comp/env/jdbc/Oracle11g");
			
		} catch (NamingException e) {
			
			e.printStackTrace();
		}
	}

	public ArrayList<MemberDto> memberList(){
		
		ArrayList<MemberDto> dtos = new ArrayList<MemberDto>();
		Connection connection = null;
		PreparedStatement ps = null;
		ResultSet rs = null;
		
		try {
			connection = dataSource.getConnection();
			String sql = "SELECT "
					+ "memberNo"
					+ ",memberNm"
					+ ",attCnt"
					+ ",telNo"
					+ ",lctn"
					+ ",gndr"
					+ ",age"
					+ ",feeBalance "
					+ "FROM member";
			
			ps = connection.prepareStatement(sql);
			rs = ps.executeQuery();
		
			while(rs.next()) {
				int memberNo = rs.getInt("memberNo");		//회원번호
				String memberNm = rs.getString("memberNm");	//회원이름
				int attCnt = rs.getInt("attCnt");			//참석수
				String telNo = rs.getString("telNo");		//연락처
				String lctn = rs.getString("lctn");		//지역	
				String exYn = rs.getString("exYn");	//강습여부
				String gndr = rs.getString("gndr"); 		//성별
				int age = rs.getInt("age");			//나이
				int feeBalance = rs.getInt("feeBalance");		//회비잔액
				
				
				MemberDto dto = new MemberDto(memberNo,memberNm,attCnt,telNo,lctn,gndr,age,feeBalance);
				dtos.add(dto);
				
			}
			
		} catch (SQLException e) {

			e.printStackTrace();
		}finally {
			
			try {
				if(rs!=null) rs.close();
				if(ps!=null) ps.close();
				if(connection!=null) connection.close();
				
			}catch(Exception e) {
				
			}
		}
		
		return dtos;
	}
	
}

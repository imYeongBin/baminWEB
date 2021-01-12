package com.ppp.bamin.BC.Impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ppp.bamin.BC.MemberBc;
import com.ppp.bamin.DAO.MemberMapper;

@Service
public class MemberBcImpl implements MemberBc {
	
	@Autowired
	private SqlSession sqlSession;
	
	@Override
	public HashMap<String, Object> retrieveMemberList() {
		HashMap<String,Object> returnMap = new HashMap<>();
	
		MemberMapper mapper = sqlSession.getMapper(MemberMapper.class);
		ArrayList<Map<String,Object>> memberList = mapper.retrieveMemberList();
		
		returnMap.put("memberList",memberList);
		
		return returnMap; 
	}

}

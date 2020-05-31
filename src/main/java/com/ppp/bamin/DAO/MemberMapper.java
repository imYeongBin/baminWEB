package com.ppp.bamin.DAO;

import java.util.ArrayList;
import java.util.Map;


public interface MemberMapper {
	
	public ArrayList<Map<String,Object>> retrieveMemberList();
	
	public void memberReg(Map<String, Object> inDsMap);
	
	public Map<String,Object> retrieveMemberInfo();
	//지역코드-대분류 조회
	public ArrayList<Map<String,Object>> retrieveLctn1Code();
	//지역코드-소분류 조회
	public ArrayList<Map<String,Object>> retrieveLctn2Code();
	
}

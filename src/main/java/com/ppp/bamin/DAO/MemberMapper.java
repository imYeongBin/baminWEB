package com.ppp.bamin.DAO;

import java.util.ArrayList;
import java.util.Map;


public interface MemberMapper {
	
	public ArrayList<Map<String,Object>> memberList();
	
	public void memberReg(Map<String, Object> inDsMap);
}

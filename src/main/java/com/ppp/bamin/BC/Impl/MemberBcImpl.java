package com.ppp.bamin.BC.Impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import org.springframework.ui.Model;

import com.ppp.bamin.BC.MemberBc;

public class MemberBcImpl implements MemberBc {

	@Override
	public void retrieveMemberList(Model model) {
	}

	@Override
	public void memberReg(Model model) {
		
	}
	
	@Override
	public ArrayList<Map<String,Object>> retrieveMeetingList (Map<String,Object> inDsMap){
		Map<String,Object> returnMap = new HashMap<String,Object>();
		
		System.out.println("ddddd");
		System.out.println(inDsMap);
		
		ArrayList<Map<String, Object>> meetingList = new ArrayList<Map<String,Object>>();
		
		
		return meetingList ;
	}
	

}

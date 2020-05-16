package com.ppp.bamin.BC;

import java.util.ArrayList;
import java.util.Map;

import org.springframework.ui.Model;

public interface MemberBc {

	public void retrieveMemberList(Model model);
	public void memberReg(Model model);
	public ArrayList<Map<String,Object>> retrieveMeetingList(Map<String,Object> inDsMap);
}

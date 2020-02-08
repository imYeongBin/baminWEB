package com.ppp.bamin.BC.Impl;

import java.util.ArrayList;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.ui.Model;

import com.ppp.bamin.BC.Member;
import com.ppp.bamin.DAO.MemberDao;
import com.ppp.bamin.DTO.MemberDto;

public class MemberImpl implements Member {

	@Override
	public void memberList(Model model) {
		
		MemberDao dao = new MemberDao();
		ArrayList<MemberDto> dtos = dao.memberList();
		
		model.addAttribute("memberList",dtos);
		
	}

}

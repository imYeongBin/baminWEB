package com.ppp.bamin.Controller;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.ppp.bamin.DAO.MemberMapper;

@Controller
public class CommController {
	
	@Autowired
	private SqlSession sqlSession;
	
	
	@RequestMapping("/main.do")
	public String main(Model model) {
		
		return "main";
	}
	
	@RequestMapping("/memberList.do")
	public String memberList(Model model) {
		System.out.println("1");
		MemberMapper mapper = sqlSession.getMapper(MemberMapper.class);
		System.out.println("2");
		model.addAttribute("memberList", mapper.memberList());
		System.out.println("3");
		return "member/memberList";
	}	

	
	
}

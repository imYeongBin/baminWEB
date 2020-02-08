package com.ppp.bamin.Controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.ppp.bamin.BC.Member;
import com.ppp.bamin.BC.Impl.MemberImpl;

@Controller
public class CommController {

	Member memberList;
	
	
	@RequestMapping("/main.do")
	public String main(Model model) {
		
		return "main";
	}
	
	@RequestMapping("/memberList.do")
	public String memberList(Model model) {
		System.out.println("memberList 호출");
		
		memberList = new MemberImpl();
		memberList.memberList(model);
		
		return "member/memberList";
	}
	
	
	@RequestMapping("memberReg")
	public String memberReg(HttpServletRequest request, Model model) {
		System.out.println("memberReg 호출");
		
		model.addAttribute("request",request);
		
		
		return "member/memberReg";
	}
	
	
	
	
}

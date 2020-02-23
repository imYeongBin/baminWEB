package com.ppp.bamin.Controller;

import javax.servlet.http.HttpServletRequest;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.ppp.bamin.DAO.MemberMapper;
import com.sun.xml.internal.ws.client.ResponseContext;

@Controller
public class CommController {
	
	@Autowired
	private SqlSession sqlSession;
	 
	 
//	@RequestMapping("/*")
//	public String main(HttpServletRequest request, Model model) {
//		
//		//String getRequestURI = request.getRequestURI();		//  /namin/main.do
//		//String getContextPath = request.getContextPath();//		/bamin
//		String getServletPath = request.getServletPath().toString();//		/main.do
//		String defaultLayout = getServletPath.replace("/", "").replace(".do", "");
////		System.out.println("##### getRequestURI ##### : "+getRequestURI);
////		System.out.println("##### getRequestURI ##### : "+getContextPath);
////		System.out.println("##### getRequestURI ##### : "+getServletPath);
//		return defaultLayout;
//	}
	
	
	@RequestMapping("/main.do")
	public String main(HttpServletRequest request, Model model) {
		
		//String getRequestURI = request.getRequestURI();		//  /namin/main.do
		//String getContextPath = request.getContextPath();//		/bamin
		String getServletPath = request.getServletPath().toString();//		/main.do
		String defaultLayout = getServletPath.replace("/", "").replace(".do", "");
//		System.out.println("##### getRequestURI ##### : "+getRequestURI);
//		System.out.println("##### getRequestURI ##### : "+getContextPath);
//		System.out.println("##### getRequestURI ##### : "+getServletPath);
		return "main";
	}
	
	
	
	
	@RequestMapping("/memberList.do")
	public String memberList(Model model) {
		
		MemberMapper mapper = sqlSession.getMapper(MemberMapper.class);
		
		model.addAttribute("memberList", mapper.memberList());
		
		return "memberList";
	}	

	
	
}

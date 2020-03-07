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
	 //desktop

	
	private final static String CLIENT_JS = "clientJs";
	private final static String URI_INDEXOF_TXT = ".do";
	@RequestMapping("/**/**")  
	public String main(HttpServletRequest request, Model model) {
		String retVal = "defaultLayout";
		
		int paramIdx = request.getRequestURI().indexOf(URI_INDEXOF_TXT);
		//String requestURIPath = request.getRequestURI().substring(0, paramIdx);
		//System.out.println("requestURIPath : "+requestURIPath);
		
		//String getRequestURI = request.getRequestURI();		//  /bamin/main.do
		String getContextPath = request.getContextPath();//		/bamin
		System.out.println("getContextPath : "+getContextPath);
		
		String getServletPath = request.getServletPath().toString();//		/main.do
		System.out.println("getServletPath : "+getServletPath);

		int idx = getServletPath.indexOf(URI_INDEXOF_TXT);
		String jsPath = getServletPath.substring(0,idx);
		jsPath = "default/app/js"+jsPath+".js";
		System.out.println("jsPath : "+jsPath);

		model.addAttribute("clientJs",jsPath);
		
		
		return retVal;
	}
	
	
	
	
	
	
	
	@RequestMapping("/error.do")  
	public String error(HttpServletRequest request, Model model) {
		String retVal = "error";
		
		
		return retVal;
	}
	
	
	
	
	
	
	
	
	@RequestMapping("/main1.do")
	public String main1(HttpServletRequest request, Model model) {
		
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

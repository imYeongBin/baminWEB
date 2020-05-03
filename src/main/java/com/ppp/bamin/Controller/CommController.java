//package com.ppp.bamin.Controller;
//
//import java.io.IOException;
//import java.util.ArrayList;
//import java.util.Map;
//
//import javax.servlet.http.HttpServletRequest;
//import javax.servlet.http.HttpServletResponse;
//
//import org.apache.ibatis.session.SqlSession;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Controller;
//import org.springframework.ui.Model;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RequestMethod;
//
//import com.ppp.bamin.DAO.MemberMapper;
//import com.sun.xml.internal.ws.client.ResponseContext;
//
//@Controller
//public class CommController {
//	
//	@Autowired
//	private SqlSession sqlSession;
//	 //desktop
//
//	
//	private final static String CLIENT_JS = "clientJs";
//	private final static String URI_INDEXOF_TXT = ".do";
//	@RequestMapping("/**/main.do")  
//	public String main(HttpServletRequest request, Model model) {
//		String retVal = "main";
//		
//		int paramIdx = request.getRequestURI().indexOf(URI_INDEXOF_TXT);
//		//String requestURIPath = request.getRequestURI().substring(0, paramIdx);
//		//System.out.println("requestURIPath : "+requestURIPath);
//		
//		//String getRequestURI = request.getRequestURI();		//  /bamin/main.do
//		String getContextPath = request.getContextPath();//		/bamin
//		System.out.println("getContextPath : "+getContextPath);
//		
//		String getServletPath = request.getServletPath().toString();//		/main.do
//		System.out.println("getServletPath : "+getServletPath);
//
//		int idx = getServletPath.indexOf(URI_INDEXOF_TXT);
//		String jsPath = getServletPath.substring(0,idx);
//		jsPath = "resources/js"+jsPath+".js";
//		System.out.println("jsPath : "+jsPath);
//
//		model.addAttribute("clientJs",jsPath);
//		String defaultLayout = getServletPath.replace("/", "").replace(".do", "");///main
//		retVal = defaultLayout;
//		return retVal;//   return main.jsp
//	}
//	
//	
//	
//	@RequestMapping("/**/memberList.do")  
//	public String memberList(HttpServletRequest request, Model model) {
//		String retVal = "main";
//		
//		int paramIdx = request.getRequestURI().indexOf(URI_INDEXOF_TXT);
//		//String requestURIPath = request.getRequestURI().substring(0, paramIdx);
//		//System.out.println("requestURIPath : "+requestURIPath);
//		
//		//String getRequestURI = request.getRequestURI();		//  /bamin/main.do
//		String getContextPath = request.getContextPath();//		/bamin
//		System.out.println("getContextPath : "+getContextPath);
//		
//		String getServletPath = request.getServletPath().toString();//		/main.do
//		System.out.println("getServletPath : "+getServletPath);
//
//		int idx = getServletPath.indexOf(URI_INDEXOF_TXT);
//		String jsPath = getServletPath.substring(0,idx);
//		jsPath = "resources/js"+jsPath+".js";
//		System.out.println("jsPath : "+jsPath);
//		
//		MemberMapper mapper = sqlSession.getMapper(MemberMapper.class);
//		
//		System.out.println("#####");
//		System.out.println(mapper.retrieveMemberList());//[{lctn=강서구, gndr=M, MEMBERNM=임영빈, ATTCNT=0, MEMBERNO=1, TELNO=01041993679, FEEBALANCE=0, age=32}]
//		
//		model.addAttribute("memberList", mapper.retrieveMemberList());
//		
//		model.addAttribute("clientJs",jsPath);
//		String defaultLayout = getServletPath.replace("/", "").replace(".do", "");///main
//		retVal = defaultLayout;
//		return retVal;//   return main.jsp
//	}
//	
//	
//	
//	@RequestMapping("**/error.do")  
//	public String error(HttpServletRequest request, Model model) {
//		String retVal = "error";
//		
//		
//		return retVal;
//	}
//	
//	
//	@RequestMapping("**/testAjax.do")  
//	public String testAjax(HttpServletRequest request, HttpServletResponse response, Model model) {
//		String testStr = "";
//		System.out.println("testAjax");
//
//		
//		
//		return "testAjax";
//	}
//	
//	
//	
//	
//	
//	
//	
//	@RequestMapping("/main1.do")
//	public String main1(HttpServletRequest request, Model model) {
//		
//		String getRequestURI = request.getRequestURI();		//  /namin/main.do
//		String getContextPath = request.getContextPath();//		/bamin
//		String getServletPath = request.getServletPath().toString();//		/main.do
//		String defaultLayout = getServletPath.replace("/", "").replace(".do", "");
//		System.out.println("##### getRequestURI ##### : "+getRequestURI);
//		System.out.println("##### getContextPath ##### : "+getContextPath);
//		System.out.println("##### getServletPath ##### : "+getServletPath);
//		System.out.println("##### defaultLayout ##### : "+defaultLayout);
//		
//		int idx = getServletPath.indexOf(URI_INDEXOF_TXT);
//		String jsPath = getServletPath.substring(0,idx);
//		jsPath = "default/app/js"+jsPath+".js";
//		System.out.println("jsPath : "+jsPath);
//
//		model.addAttribute("clientJs",jsPath);
//		
//		
//		return defaultLayout;
//	}
//	
//	/*
//	 * @RequestMapping(value="/retrieveMemberList") public String
//	 * retrieveMemberList(HttpServletRequest request, Model model) {
//	 * 
//	 * MemberMapper mapper = sqlSession.getMapper(MemberMapper.class);
//	 * 
//	 * System.out.println("#####");
//	 * System.out.println(mapper.retrieveMemberList());//[{lctn=강서구, gndr=M,
//	 * MEMBERNM=임영빈, ATTCNT=0, MEMBERNO=1, TELNO=01041993679, FEEBALANCE=0, age=32}]
//	 * 
//	 * model.addAttribute("memberList", mapper.retrieveMemberList());
//	 * 
//	 * return "success"; }
//	 */
//}

package com.ppp.bamin.Controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ppp.bamin.BC.MemberBc;
import com.ppp.bamin.DAO.MemberMapper;
import com.sun.xml.internal.ws.client.ResponseContext;

@Controller
public class CommController {
	
	@Autowired
	private SqlSession sqlSession;
	 //desktop
	@Autowired
	private MemberBc MemberBc;
	
	private final static String CLIENT_JS = "clientJs";
	private final static String URI_INDEXOF_TXT = ".do";
	@RequestMapping("/**/main.do")  
	public String main(HttpServletRequest request, Model model) {
		String retVal = "defaultLayout";
		
		int paramIdx = request.getRequestURI().indexOf(URI_INDEXOF_TXT);
		//String requestURIPath = request.getRequestURI().substring(0, paramIdx);
		//System.out.println("requestURIPath : "+requestURIPath);
		
		//String getRequestURI = request.getRequestURI();		//  /bamin/main.do
		String getContextPath = request.getContextPath();//		/bamin
		System.out.println("1.getContextPath : "+getContextPath);
		
		String getServletPath = request.getServletPath().toString();//		/main.do
		System.out.println("2.getServletPath : "+getServletPath);

		int idx = getServletPath.indexOf(URI_INDEXOF_TXT);
		String jsPath = getServletPath.substring(0,idx);
		jsPath = "resources/js"+jsPath+".js";
		System.out.println("3.jsPath : "+jsPath);

		model.addAttribute("clientJs",jsPath);
		String defaultLayout = getServletPath.replace("/", "").replace(".do", "");///main
		System.out.println("4.defaultLayout : "+defaultLayout);
		
		retVal = defaultLayout;
		retVal = "defaultLayout";
		return retVal;//   return main.jsp
	}
	
	
	
	@RequestMapping("BC.**.**")  
	public void testA(HttpServletRequest request, Model model) {

		String getRequestURI = request.getRequestURI();		//  /bamin/main.do
		System.out.println("name ::::::"+getRequestURI);
		
	}
	
	
	
	
	@RequestMapping("**/error.do")  
	public String error(HttpServletRequest request, Model model) {
		String retVal = "error";
		
		
		return retVal;
	}
	
	
	@RequestMapping("**/testAjax.do")  
	public String testAjax(HttpServletRequest request, HttpServletResponse response, Model model) {
		String testStr = "";
		System.out.println("testAjax");

		
		
		return "testAjax";
	}
	
	
  @RequestMapping(value="retrieveMember.do") 
  @ResponseBody		
  public HashMap<String, Object> retrieveMemberList(HttpServletRequest request, Model model) { 
	  HashMap<String, Object> returnMap = new HashMap<String, Object>();
	  HashMap<String, Object> memberList = new HashMap<String, Object>();
	  memberList = MemberBc.retrieveMemberList();
	  System.out.println("##########################");
	  System.out.println(memberList);
	  returnMap.put("memberList",memberList);
	  return returnMap;
  }
 
		
		
	/*
	 * @RequestMapping(value="/retrieveMemberList") public String
	 * retrieveMemberList(HttpServletRequest request, Model model) {
	 * 
	 * MemberMapper mapper = sqlSession.getMapper(MemberMapper.class);
	 * 
	 * System.out.println("#####");
	 * System.out.println(mapper.retrieveMemberList());//[{lctn=강서구, gndr=M,
	 * MEMBERNM=임영빈, ATTCNT=0, MEMBERNO=1, TELNO=01041993679, FEEBALANCE=0, age=32}]
	 * 
	 * model.addAttribute("memberList", mapper.retrieveMemberList());
	 * 
	 * return "success"; 
	 * 
	 * }
	 */
}

package com.ppp.bamin.Controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ppp.bamin.DAO.MemberMapper;
import com.sun.xml.internal.ws.client.ResponseContext;

@Controller
public class mainController {
	
	@Autowired
	private SqlSession sqlSession;
	 //desktop

	
	private final static String CLIENT_JS = "clientJs";
	private final static String URI_INDEXOF_TXT = ".do";
	@RequestMapping("/**/main.do")  
	public String main(HttpServletRequest request, Model model) {
		String retVal = "main";
		System.out.println("call mainController");
		return retVal;
	}
	
	
	
	@RequestMapping("**/memberList.do")  
	public String memberList(HttpServletRequest request, Model model) {
		String retVal = "memberList";
		System.out.println("go MemberList Page");
		return retVal;
	}
	
	@RequestMapping("**/moveInsertMember.do")  
	public String moveInsertMember(HttpServletRequest request, Model model) {
		String retVal = "insertMember";
		System.out.println("go insertMember Page");
		return retVal;
	}
	
	
	@RequestMapping("**/completeInsert.do")  
	public String completeInsert(HttpServletRequest request, Model model) {
		String retVal = "completeInsert";
		System.out.println("go completeInsert Page");
		return retVal;
	}
	
	@RequestMapping(value="**/insertMember.do", method = RequestMethod.GET)  
	@ResponseBody
	public String insertMember(HttpServletRequest request, Model model, @RequestParam("memberNo")String memberNo) {
		System.out.println("$$$$$$$$$$$$$$$$$$");
		
		//MemberMapper mapper = sqlSession.getMapper(MemberMapper.class);

		System.out.println("###### memberNo "+memberNo);
		return "success insert member";
	}
	
	@RequestMapping(value="/retrieveMemberList.do") 
	@ResponseBody
	public List retrieveMemberList(HttpServletRequest request, Model model) {
	  
		MemberMapper mapper = sqlSession.getMapper(MemberMapper.class);
		List list =  new ArrayList<>();
		list = mapper.retrieveMemberList();
		return  list; 
	}
	
	@RequestMapping("**/error.do")  
	public String error(HttpServletRequest request, Model model) {
		String retVal = "error";
		
		System.out.println("call errorController");
		return retVal;
	}
	
	
	
	
}

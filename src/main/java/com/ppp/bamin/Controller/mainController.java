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
	
	@RequestMapping(value="**/insertMember.do")  
	@ResponseBody
	public String insertMember(HttpServletRequest request,HttpServletResponse response, Model model) {
		System.out.println("$$$$$$$$$$$$$$$$$$");
		
		String retVal = "./completeInsert.do";
		
		Map<String,Object> memberRegMap = new HashMap<>();
		String memberNm = request.getParameter("memberNm");
		String telNo = request.getParameter("telNo");
		String attCnt = request.getParameter("attCnt");
		String lctn1 = request.getParameter("selectedLctn1");
		String lctn2 = request.getParameter("selectedLctn2");
		
		System.out.println("lctn1 : "+lctn1);
		System.out.println("lctn2 : "+lctn2);
		String gndr = request.getParameter("gndr");
		String age = request.getParameter("age");
		String feeBalance = request.getParameter("feeBalance");
		if("gangseo".contentEquals(lctn1)) {//강서구를 선택
			memberRegMap.put("lctn1", lctn1);
			memberRegMap.put("lctn2", lctn2);
		}else {//강서구 이외의 지역을 선택
			memberRegMap.put("lctn1", lctn1);
			memberRegMap.put("lctn2", " ");
		}
		
		memberRegMap.put("memberNm", memberNm);
		memberRegMap.put("telNo", telNo);
		memberRegMap.put("attCnt", attCnt);
		
		memberRegMap.put("gndr", gndr);
		memberRegMap.put("age", age);
		memberRegMap.put("feeBalance", feeBalance);
		
		System.out.println("memberRegMap  :  "+memberRegMap);
		MemberMapper mapper = sqlSession.getMapper(MemberMapper.class);
		mapper.memberReg(memberRegMap);
		
		try {
			response.sendRedirect(retVal);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return "";
	}
	
	@RequestMapping(value="/retrieveMemberList.do") 
	@ResponseBody
	public List retrieveMemberList(HttpServletRequest request, Model model) {
	  
		MemberMapper mapper = sqlSession.getMapper(MemberMapper.class);
		List list =  new ArrayList<>();
		list = mapper.retrieveMemberList();
		return  list; 
	}
	
	
	@RequestMapping(value="/retrieveLctnCode.do") 
	@ResponseBody
	public Map retrieveLctnCode(HttpServletRequest request, Model model) {
	  
		Map<String,Object> returnMap = new HashMap<String,Object>();
		MemberMapper mapper = sqlSession.getMapper(MemberMapper.class);
		List lctn1List =  new ArrayList<>();
		List lctn2List =  new ArrayList<>();
		lctn1List = mapper.retrieveLctn1Code();
		lctn2List = mapper.retrieveLctn2Code();
		
		returnMap.put("lctn1List",lctn1List);
		returnMap.put("lctn2List",lctn2List);
		return  returnMap; 
	}
	
	
	@RequestMapping("**/error.do")  
	public String error(HttpServletRequest request, Model model) {
		String retVal = "error";
		
		System.out.println("call errorController");
		return retVal;
	}
	
	
	
	
}

package com.ppp.bamin.Controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedList;
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

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.type.MapType;
import com.google.gson.Gson;
import com.ppp.bamin.DAO.MeetingMapper;
import com.ppp.bamin.DAO.MemberMapper;
import com.sun.xml.internal.ws.client.ResponseContext;

@Controller
public class mainController {

	@Autowired
	private SqlSession sqlSession;
	// desktop

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

	@RequestMapping("**/moveModifyMemberInfo.do")
	public String moveModifyMember(HttpServletRequest request, Model model) {
		String memberNo = request.getParameter("memberNo");
		System.out.println("memberNo : " + memberNo);
		String retVal = "modifyMemberInfo";
		System.out.println("go ModifyMember Page");
		return retVal;
	}

	@RequestMapping("**/moveInsertMeeting.do")
	public String moveInsertMeeting(HttpServletRequest request, Model model) {
		String retVal = "insertMeeting";
		System.out.println("go insertMeeting Page");
		return retVal;
	}

	@RequestMapping("**/completeInsertMember.do")
	public String completeInsert(HttpServletRequest request, Model model) {
		String retVal = "completeInsertMember";
		System.out.println("go completeInsert Page");
		return retVal;
	}

	@RequestMapping(value = "**/insertMember.do")
	@ResponseBody
	public String insertMember(HttpServletRequest request, HttpServletResponse response, Model model) {
		System.out.println("$$$$$$$$$$$$$$$$$$");

		String retVal = "./completeInsertMember.do";

		Map<String, Object> memberRegMap = new HashMap<>();
		String memberNm = request.getParameter("memberNm");
		String telNo = request.getParameter("telNo");
		String attCnt = request.getParameter("attCnt");
		String lctn1 = request.getParameter("selectedLctn1");
		String lctn2 = request.getParameter("selectedLctn2");

		System.out.println("lctn1 : " + lctn1);
		System.out.println("lctn2 : " + lctn2);
		String gndr = request.getParameter("gndr");
		String age = request.getParameter("age");
		String feeBalance = request.getParameter("feeBalance");
		if ("gangseo".contentEquals(lctn1)) {// 강서구를 선택
			memberRegMap.put("lctn1", lctn1);
			memberRegMap.put("lctn2", lctn2);
		} else {// 강서구 이외의 지역을 선택
			memberRegMap.put("lctn1", lctn1);
			memberRegMap.put("lctn2", " ");
		}

		memberRegMap.put("memberNm", memberNm);
		memberRegMap.put("telNo", telNo);
		memberRegMap.put("attCnt", attCnt);

		memberRegMap.put("gndr", gndr);
		memberRegMap.put("age", age);
		memberRegMap.put("feeBalance", feeBalance);

		System.out.println("memberRegMap  :  " + memberRegMap);
		MemberMapper mapper = sqlSession.getMapper(MemberMapper.class);
		mapper.memberReg(memberRegMap);

		try {
			response.sendRedirect(retVal);
		} catch (IOException e) {

			e.printStackTrace();
		}

		return "";
	}

	@RequestMapping(value = "/retrieveMemberList.do")
	@ResponseBody
	public ArrayList<Map<String, Object>> retrieveMemberList(HttpServletRequest request, Model model,
			@RequestBody String inDsMap) {

		MemberMapper mapper = sqlSession.getMapper(MemberMapper.class);
		ArrayList<Map<String, Object>> list = new ArrayList<>();
		list = mapper.retrieveMemberList();
		return list;
	}

	public Map<String, Object> StringToMap(String inputString) {
		ObjectMapper mapper = new ObjectMapper();

		Map<String, Object> returnMap = new HashMap<String, Object>();

		try {
			returnMap = mapper.readValue(inputString, new TypeReference<Map<String, String>>() {
			});

			System.out.println("$$$$$$$");
			System.out.println(returnMap);

		} catch (JsonParseException e) {
			e.printStackTrace();
		} catch (JsonMappingException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return returnMap;

	}

	@RequestMapping(value = "/retrieveMemberInfo.do")
	@ResponseBody
	public Map<String, Object> retrieveMemberInfo(HttpServletRequest request, Model model,
			@RequestBody String inDsMap) {

		System.out.println("#############");
		System.out.println(inDsMap);
		String memberNo = request.getParameter("memberNo");
		System.out.println(memberNo);

		MemberMapper mapper = sqlSession.getMapper(MemberMapper.class);
		Map<String, Object> memberInfo = new HashMap<String, Object>();

		memberInfo = mapper.retrieveMemberInfo();
		return memberInfo;
	}

	@RequestMapping(value = "/retrieveLctnCode.do")
	@ResponseBody
	public Map<String, Object> retrieveLctnCode(HttpServletRequest request, Model model) {

		Map<String, Object> returnMap = new HashMap<String, Object>();
		MemberMapper mapper = sqlSession.getMapper(MemberMapper.class);
		ArrayList<Map<String, Object>> lctn1List = new ArrayList<>();
		ArrayList<Map<String, Object>> lctn2List = new ArrayList<>();
		lctn1List = mapper.retrieveLctn1Code();
		lctn2List = mapper.retrieveLctn2Code();

		returnMap.put("lctn1List", lctn1List);
		returnMap.put("lctn2List", lctn2List);
		return returnMap;
	}

	@RequestMapping(value = "**/insertMeeting.do")
	@ResponseBody
	public String insertMeeting(HttpServletRequest request, HttpServletResponse response, Model model,
			@RequestBody String inDsMap) {
		System.out.println("$$$$$$$$$$$$$$$$$$");
		System.out.println(inDsMap);
		String retVal = "./completeInsertMeeting.do";

		ObjectMapper mapper1 = new ObjectMapper();
		MapType type = mapper1.getTypeFactory().constructMapType(Map.class, String.class, Object.class);
		Map<String, Object> data;
		try {
			data = mapper1.readValue(inDsMap, type);

			Map<String, Object> meetingRegMap = new HashMap<>();
			String meetingDate =data.get("meetingDate").toString();
			System.out.println("meetingDate : "+meetingDate);
			String lctn = data.get("lctn").toString();;
			System.out.println("lctn : "+lctn);
			String memberListStr = (String) data.get("memberListStr");
			System.out.println("memberListSTr : "+memberListStr);
			String memberCnt = data.get("memberCnt").toString();
			System.out.println("memberCnt : "+memberCnt);
			String memberFee = data.get("memberFee").toString();
			System.out.println("memberFee : "+memberFee);
			String totalMemberFee = data.get("totalMemberFee").toString();
			System.out.println("totalMemeberFee : "+totalMemberFee);
			String guestCnt = data.get("guestCnt").toString();
			System.out.println("guestCnt : "+guestCnt);
			String guestFee = data.get("guestFee").toString();
			System.out.println("guestFee : "+guestFee);
			String totalGuestFee = data.get("totalGuestFee").toString();
			System.out.println("totalGuestFee : "+totalGuestFee);
			String totalFee = data.get("totalFee").toString();
			System.out.println("totalFee : "+totalFee);
			String totalCnt = data.get("totalCnt").toString();
			System.out.println("totalCnt : "+totalCnt);

			String[] memberNoList = memberListStr.split("\\|"); // 21 22 23 24
			System.out.println("######### memberNoList.length :" + memberNoList.length + " ############");

			MeetingMapper mapper = sqlSession.getMapper(MeetingMapper.class);

			
			// insert meetingReg
			meetingRegMap.put("meetingDate", meetingDate);
			meetingRegMap.put("lctn", lctn);
			meetingRegMap.put("memberCnt", memberCnt);
			meetingRegMap.put("memberFee", memberFee);
			meetingRegMap.put("totalMemberFee", totalMemberFee);
			meetingRegMap.put("guestCnt", guestCnt);
			meetingRegMap.put("guestFee", guestFee);
			meetingRegMap.put("totalGuestFee", totalGuestFee);
			meetingRegMap.put("totalFee", totalFee);
			meetingRegMap.put("totalCnt", totalCnt);

			System.out.println("memberRegMap  :  " + meetingRegMap);
			mapper.meetingReg(meetingRegMap);
			
			//가장 최신의 meetingNo가져오기
			int latestMeetingSeq = mapper.retrieveLatestMeetingRegSeq();
			
			if (memberNoList.length > 0) {// member 전용
				Map<String, Object> meetingLogMemberMap = new HashMap<String, Object>();
				meetingLogMemberMap.put("guestYn", "0");
				meetingLogMemberMap.put("meetingNo", latestMeetingSeq);
				meetingLogMemberMap.put("memberFee", Integer.parseInt(memberFee));
				meetingLogMemberMap.put("guestFee", 0);
				for (int a = 0; a < memberNoList.length; a++) {
					// insert meetingLog
					meetingLogMemberMap.put("memberNo", memberNoList[a]);

					mapper.insertMeetingLog(meetingLogMemberMap);
				}
			}

			
			  if(guestCnt != null && Integer.parseInt(guestCnt) > 0) { //게스트 전용 
				  int  guestCntInt = Integer.parseInt(guestCnt) ; Map<String, Object>
				  meetingLogGuestMap = new HashMap<String,Object>();
				  meetingLogGuestMap.put("meetingNo", latestMeetingSeq);
				  meetingLogGuestMap.put("guestYn","1");
				  meetingLogGuestMap.put("memberFee",0);
				  meetingLogGuestMap.put("guestFee",Integer.parseInt(guestFee));
				  for(int a=0 ; a<guestCntInt ;a++) {
					  //insert meetingLog 
					  meetingLogGuestMap.put("memberNo","9999");
					  mapper.insertMeetingLog(meetingLogGuestMap);
				  } 
			  }
			 



			response.sendRedirect(retVal);

		} catch (JsonParseException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		} catch (JsonMappingException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		} catch (IOException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}

		return "";
	}

	@RequestMapping("**/meetingList.do")
	public String moveMeetingList(HttpServletRequest request, Model model) {
		String retVal = "meetingList";
		System.out.println("go meetingList Page");
		return retVal;
	}

	@RequestMapping(value = "/retrieveMeetingList.do")
	@ResponseBody
	public ArrayList<Map<String, Object>> retrieveMeetingList(HttpServletRequest request, Model model) {
		System.out.println("#########");
		System.out.println(model);

		MeetingMapper mapper = sqlSession.getMapper(MeetingMapper.class);
		ArrayList<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
		list = mapper.retrieveMeetingList();
		return list;
	}

	@RequestMapping(value = "/retrieveMeetingDetail.do")
	@ResponseBody
	public Map<String, Object> retrieveMeetingDetail(HttpServletRequest request, Model model) {

		MeetingMapper mapper = sqlSession.getMapper(MeetingMapper.class);
		Map<String, Object> returnMap = new HashMap<String, Object>();
		Map<String, Object> inDsMap = new HashMap<String, Object>();
		returnMap = mapper.retrieveMeetingDetail(inDsMap);
		return returnMap;
	}

	@RequestMapping("**/error.do")
	public String error(HttpServletRequest request, Model model) {
		String retVal = "error";

		System.out.println("call errorController");
		return retVal;
	}

}

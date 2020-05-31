package com.ppp.bamin.DAO;

import java.util.ArrayList;
import java.util.Map;


public interface MeetingMapper {
	public ArrayList<Map<String,Object>> retrieveMeetingList();
	
	public void meetingReg(Map<String, Object> inDsMap);
	
	public void insertMeetingLog(Map<String, Object> inDsMap);
	
	public int retrieveLatestMeetingRegSeq(); 
	
	public Map<String, Object> retrieveMeetingDetail(Map<String, Object> inDsMap);
}

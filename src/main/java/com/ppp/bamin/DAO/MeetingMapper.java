package com.ppp.bamin.DAO;

import java.util.ArrayList;
import java.util.Map;


public interface MeetingMapper {
	public ArrayList<Map<String,Object>> retrieveMeetingList();
	public Map<String, Object> retrieveMeetingDetail(Map<String, Object> inDsMap);
}

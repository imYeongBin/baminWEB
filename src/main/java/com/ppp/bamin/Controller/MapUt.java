package com.ppp.bamin.Controller;

import java.util.Map;

public class MapUt {

	public static String getString(Map<String, Object> inDsMap, String name) {
		
		String myValue = "";
			for(Map.Entry<String, Object> item : inDsMap.entrySet()) {
				String key = item.getKey();
				String value = (String) item.getValue();
				
				if(name.equals(key)) {
					myValue = value.toString();
				}
			}
			
		return myValue;
	}
	
	
}

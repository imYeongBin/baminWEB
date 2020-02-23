/*
 * COPYRIGHT (c) MERITZ Fire Insurance 2015
 * This software is the proprietary information of MERITZ Fire Insurance.
 * 
 * Modeler : 媛뺥솚湲�
 *
 * Revision History
 * Author Date       Description
 * ------ ---------- -----------
 * 媛뺥솚湲� 2015-08-12 First Draft
 */
(function(angular, mz) {
	mz.comm.filter('dateFormat', function(co) {
		var util = co.get('util');
		return function(value, token) {
           if(util.isNull(value)) {
               return value;
           }
           
           var length = value.length;
           if(length == 14) {
        	   value = value.substring(0, 8);
        	   length = value.length;
           } else if(length != 6 && length != 8) {
               return value;
           }
           
           if(!angular.isDefined(token)) {
               token = "-";
           }
           
           var date = [];
           date.push(value.substring(0, 4));
           date.push(value.substring(4, 6));
           if(length == 8) {
               date.push(value.substring(6, 8));
           }
           return date.join(token);
       };
	});
	
	mz.comm.filter('numberFormat', function(co) {
		var util = co.get('util');
		return function(value) {
			if(!value){
				 return 0;
			}else{
				return util.addCommas(value + "");				
			}
       };
	});
	
	mz.comm.filter('drmDateFormat', function(co) {
		var util = co.get('util');
		
		return function(value) {
			var week = util.getDayOfWeek(value);
			var a    = util.formatDate(value, 'mm/dd').split("/");
			
			var m = a[0];
			if(m.substring(0, 1) == '0') {
				m = m.substring(1);
			}
			
			var d = a[1];
			if(d.substring(0, 1) == '0') {
				d = d.substring(1);
			}
			
			return m + '/' + d + ' (' + week + ')'; 
		};
	});
	
	mz.comm.filter('sumByKey', function(co) {
		var util = co.get('util');
		return function(data, key) {
			if(typeof(data) == 'undefined' || typeof(key) == 'undefined'){
				return 0;
			}
			var sum = 0;
			for(var i = data.length -1; i >= 0; i--){
				if(util.isNumeric(data[i][key])){
					sum += parseInt(data[i][key]);
				}				
			}
			return sum;
		};
	});
	
})(angular, mz);
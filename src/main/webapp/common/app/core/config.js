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
	mz.core.config(mz.mold(function($logProvider, $locationProvider){
		// 濡쒓퉭�ㅼ젙
		$logProvider.debugEnabled(!!mz.MODE.LOG);
		// �댁돩諭�
		$locationProvider.html5Mode(false).hashPrefix('!');
	}));
})(angular, mz);
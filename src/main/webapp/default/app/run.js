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

	// 紐⑤뱢 �ㅽ뻾
	mz.run(function() {
		//硫붾돱 �몄텧�섍퀬 諛붿씤�� �섍쾶 泥섎━..
		//jquery濡� �몄텧..
		$.ajax({
			url: '/menuList.do',
			type: 'POST',
			data: {},
			success: function(data, status) {
				mz.menu  = data.list;
			},
			error: function() {
				//404 html 蹂댁뿬以���.
				location.replace("/error.do");
			},
			complete: function() {
				try {
					angular.element(document).ready(function() {
						angular.bootstrap(document, ['app']);
					});
				} catch (err) {
					//error �섏씠吏�濡� �대룞
					location.replace("/error.do");
				}
			}
		});
	});

})(angular, mz);
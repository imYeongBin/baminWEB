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
 
	// �ㅼ젙
	mz.core.config(mz.mold(function($httpProvider, blockUIConfig) {
		blockUIConfig.autoBlock = false;
		blockUIConfig.delay = 0;
		$httpProvider.interceptors.push('loadingIntercepter');
	}));

	// 濡쒕뵫以� 紐⑤뱢
	mz.core.factory('loading', mz.mold(function($rootScope, $timeout, blockUI) {
		return {
			on: function() {
				!blockUI.isBlocking && blockUI.start();
			},
			off: function() {
				blockUI.stop();
				if(mz.browser[0] == 'I' && blockUI.state().blockCount == 0) {
					$("body").css("cursor", "default").removeAttr("style");
				}
			}
		};
	}));

	// 濡쒕뵫以� Interceptor
	mz.core.factory('loadingIntercepter', mz.mold(function($q, loading) {
		return {
			request: function(config) {
				loading.on();
				return config;
			},
			requestError: function(rejection) {
				loading.off();
				return $q.rejection;
			},
			response: function(response) {
				loading.off();
				return response || $q.when(response);
			},
			responseError: function(rejection) {
				loading.off();
				return $q.reject(rejection);
			}
		};
	}));
 
})(angular, mz);
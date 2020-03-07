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
	
	// resolve provider
	mz.comm.provider('resolve', mz.mold(function() {
		this.$get = function() {
			return this;
		};
		this.resolve = function() {
			return {
				session: mz.mold(function(session) {
					return session.test();
				}),
				paramInit: mz.mold(function(location) {
					return location.init();
				})/*,
				logging: mz.mold(function(wiselog) {
					return wiselog.logging();
				})
				*/
			};
		};
	}));
})(angular, mz);
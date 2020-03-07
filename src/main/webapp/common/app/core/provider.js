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
	 
	// route provider
	mz.core.provider('route', function() {
		 
		var _resolve = {};

		this.$get = mz.mold(function() {
			return {};
		});
		 
		this.route = function(data) {
			 
			return {
				controller: data.name,
				controllerAs: data.as || 'vm',
				templateUrl: mz.path('/views/' + data.tpl + '.tpl', true),
				resolve: _resolve
			};
		};

		this.resolve = function(v){
			_resolve = v || _resolve;
		};
	});
	 
})(angular, mz);
(function(angular, mz) {
	mz.run(function() {
		$.ajax({
			url: '',
			type: 'POST',
			data: {},
			success: function(data, status) {
				//mz.menu  = data.list;
				console.log("success to run run.js");
			},
			error: function() {
				//404 html
				location.replace("/bamin/error.do");
			},
			complete: function() {
				try {
					angular.element(document).ready(function() {
						angular.bootstrap(document, ['myApp']);
					});
				} catch (err) {
					console.log("##########");
					console.log(err);
					//error 
					location.replace("/bamin/error.do");
				}
			}
		});
	});

})(angular, mz);
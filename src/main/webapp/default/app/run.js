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
				alert("404 에러 낫쪄염 뿌우~");
				location.replace("/bamin/error.do");
			},
			complete: function() {
				try {
					angular.element(document).ready(function() {
						angular.bootstrap(document, ['app']);
					});
					console.log("try success");
				} catch (err) {
					console.log("##########");
					console.log(err);
					//error 
					alert("run 에서 에러낫쪄염 뿌우 ~");
				}
			}
		});
	});

})(angular, mz);
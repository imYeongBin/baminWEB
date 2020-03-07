(function(angular, mz) {
	// search
	
	mz.comm.factory('search', mz.mold(function(co) {
		var $timeout = co.get('$timeout');
		var $q = co.get('$q');
		var $sce = co.get('$sce');
		var util = co.get('util');
		var info = [];
		var ing = false;

		function pushInfo (param, fnc){
			info.push({ pm : param, fn : fnc || function(){} });
		}

		function popInfo (){
			var o = info.pop();
			return info = [], o;
		}

		function search(url, q){
			var deferred = $q.defer();
			$.ajax({ 
				url: url, type: 'POST', 
				data: { 
					q : encodeURIComponent(q) 
				},
				success: function(data){
					deferred.resolve(data);
				},
				error : function(data){
					deferred.resolve([]);
				}
			});
			return deferred.promise;
		}

		function run(url, param, callback, delay){
			pushInfo(util.trim(param || ''), callback);

			if(!ing) {
				ing = true;
				$timeout(function(){
					var input = popInfo();
					if(input){
						if(input.pm){
							search(url, input.pm).then(function(data){
								data.param = input.pm;
								input.fn(data);

								if(info.length){
									run(url);
								}
								ing = false;
							});
						} else {
							input.fn([]);
							ing = false;
						}
					} else {
						ing = false;
					}
				}, delay || 150);
			}
		}

		return {
			ajax : function (url, param, delay){
				var deferred = $q.defer();
				run(url, param, deferred.resolve, delay);
				return deferred.promise;
			},
			highlight : function (target, keyword){
				var html = target || '';
				var word = util.replaceAll(keyword, ' ', '');
				if(html && word){
					var list = _.uniq(_.map(word, function(v){ 
						return v; 
					}));

					_.each(list,function(v){
						html = util.replaceAll(html, v, '<b>'+v+'</b>');
					});

					html = $sce.trustAsHtml(html);
				}

				return html;
			}
		};
	}));
	
})(angular, mz);
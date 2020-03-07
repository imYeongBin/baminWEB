//濡쒓렇 �곸옱 �쒕퉬��
(function(angular, mz) { 
	//�듯빀�숈쓽�뺣낫 ���� �쒕퉬��
	/*mz.comm.factory('agrInf', function(co , $q){
		var log = co.get('logger').getLogger('agrInf');
		var http = co.get('http');
		var o = {};

		o.saveDirslItgrCusAgrInf = function(agrInfData){
			var data = agrInfData || {};
			var infLst = data.agrInfLst || [];
			var deferred = $q.defer();
			
			if(infLst.length>0){
				traceAgrInfLog(data).then(function(result) {
					mz.cmCusAgrIdn = result.body.cmCusAgrIdn||'';
					deferred.resolve(result);
				});	
			}
			return deferred.promise;
		}

		function traceAgrInfLog(data) {
			return http.post('f.cg.he.co.cc.o.bc.DirslItgrCusAgrInfStrBc.saveDirslItgrCusAgrInf', data, false);
		}
		
		return o;
	});*/

	// 留덉��� 濡쒓렇 �좉퇋 怨듯넻 �쒕퉬��
//	mz.comm.factory('mktLog', function(co, $q){
//		var log = co.get('logger').getLogger('mktLog');
//		var $timeout = co.get('$timeout');
//		var http = co.get('http');
//		var analysis = co.get('analysis');
//		
//		var o ={}
//
//		o.saveMktDsgLog = function(data){
//			var data = data || {};
//			var deferred = $q.defer();
//
//			traceMktLog(data).then(function(result){
//				deferred.resolve(result);
//			})
//
//			return deferred.promise;
//		}
//
//		o.saveMktPetDsgLog = function(data){
//			var data = data || {};
//			var deferred = $q.defer();
//
//			traceMktPetLog(data).then(function(result){
//				deferred.resolve(result);
//			})
//
//			return deferred.promise;
//		}
//
//		function traceMktLog(param){
//			return http.post('f.cg.de.co.cc.o.bc.MktLogStoreBC.saveMktLog',param,false);
//		}
//
//		function traceMktPetLog(param){
//			return http.post('f.cg.de.co.cc.o.bc.MktLogStoreBC.saveMktPetDsgLog',param,false);
//		}
//
//		return o;
//	})
})(angular,mz);
/*	
 * COPYRIGHT (c) MERITZ Fire Insurance 2015
 * This software is the proprietary information of MERITZ Fire Insurance.
 * 
 * Modeler : 源�吏�誘�
 *
 * Revision History
 * Author Date       Description
 * ------ ---------- -----------
 * 源�吏�誘� 2015-07-19 First Draft
 */
//���쏱C
(function(angular, mz) {
	 
	// 紐⑤뱢 濡쒕뱶
	mz.load('common/js/crossStorage/', [
	    	                      	    'es6-promise.auto.min.js',                           
	    	                      	    'client.min.js'
	    	                      	],true); 
/*	
	mz.comm.service('crossStorage', function(co, $window, $q, $injector){
		var log = co.get('logger').getLogger('crossStorage');
		var o = {};
		var storage;
		var http = co.get('http');
		
		var ACPTPTN = [
				'/annuity-and-saving',
				'/auto-and-driver',
				'/chat-bot',
				'/event ',
				'/fire-and-life',
				'/health-and-kids',
				'/insGdbk'
		];
		
		o.init = function(){
			var hubEnv = null;
			if($injector.has('util')){
				hubEnv = co.get('util').getDirectHost();
				storage = new CrossStorageClient(hubEnv+'/common/js/crossStorage/crossStorageHub.html');
			}else{
				storage = new CrossStorageClient('https://store.meritzfire.com/common/js/crossStorage/crossStorageHub.html');//硫붾━痢좊떎�대젆�� 怨듭떇 �덊럹�댁�
			}
			return storage; 
		}
		
		o.get = function(key, cb){
			cb = cb || function(){
//				console.log(arguments);
			} ;
			var deferred = $q.defer();
			var retData = '';
			storage.onConnect().then(function(res){
				deferred.resolve(storage.get(key));
			});
			return deferred.promise.then(cb);
		}
		
		o.set =function(key, data, cb){
			cb = cb || function(){
//				console.log(arguments);
			} ;
			var dataStr = JSON.stringify(data);
			var deferred = $q.defer();
			storage.onConnect().then(function(){
				deferred.resolve(
						storage.set(key,dataStr)
				);
			})
			return deferred.promise.then(cb);
		}

		o.getKeys = function(cb){
			cb = cb || function(){
//				console.log(arguments);
			} ;
			var deferred = $q.defer();
				storage.onConnect().then(function(){
					deferred.resolve(
							storage.getKeys()
							);
			});
			return deferred.promise.then(cb);
		}
		
		o.clear = function(cb){
			cb = cb || function(){
//					console.log(arguments);
			} ;
			var deferred = $q.defer();
			storage.onConnect().then(function(){
				deferred.resolve(storage.clear());
			});
			return deferred.promise.then(cb);
		}
		
		o.insrtLog = function(cb){
			
			//�꾩옱 URL怨� �쇱튂�섎뒗 URL�� �놁쓣 寃쎌슦(���곸씠 �꾨땶 寃쎌슦) �곸옱 誘몄떎��
			if(!checkValidUrl()){
				return '';
			}
			
			cb = cb || function(){
//				console.log(arguments);
			} ;
			storage.onConnect().then(function(){
				storage.get('cukiIdn').then(function(cukiIdn){
					var param = {
							 reqUrl : location.href
								,cuki : cukiIdn || ''
								,errMsgCd : ''
								,errMsgCon : ''
					};
					http.post('f.cg.he.co.cc.o.bc.CommReMktLogBc.insertUsrMoveHis', param).then(function(result){
						if(!cukiIdn){
							if(result.body.hasOwnProperty('cukiIdn')){
								storage.set('cukiIdn',result.body.cukiIdn);
							}
						}
					});
				})
			}).catch(function(err){
				console.log(err);
			});
		}
		
		o.insrtTmLog = function(obj){
			storage.onConnect().then(function(){
				storage.get('cukiIdn').then(function(cukiIdn){
					var param = {
							 reqUrl : location.href
							,cuki : cukiIdn || ''
							,dsgIdn : obj.dsgIdn
							,dsgTrgDivCd : getDsgTrgCd().dsgTrgCd ? getDsgTrgCd().dsgTrgCd : ''
//							,dsgDivCd : getDsgTrgCd().dsgDivCd ? getDsgTrgCd().dsgDivCd : ''
					};
					http.post('f.cg.he.co.cc.o.bc.CommReMktLogBc.insertUsrMoveHis', param).then(function(result){
						if(!cukiIdn){
							if(result.body.hasOwnProperty('cukiIdn')){
								storage.set('cukiIdn',result.body.cukiIdn);
							}
						}
					});
				})
			}).catch(function(err){
//				console.log(err);
			});
		}
		
		//URL �꾪꽣留� [�곸옱���� : true, 鍮꾨��� : false]
		function checkValidUrl(){
			
			var validRtn = false;
			
			for(var i = 0; i < ACPTPTN.length; i++){
				if( location.href.indexOf(ACPTPTN[i]) > -1 ){
					validRtn = true;
				}
			}
			
			//console.log(validRtn);
			
			return validRtn;
		}
		
		function getDsgTrgCd(){
			
			var loc = top.window.location.pathname;
			var dsgTrgCd = '';
			var dsgDivCd = '';
			var cm = {
//					'/auto-and-driver/direct-auto.do':'',
//					'/auto-and-driver/direct-auto-business.do':'',
//					'/health-and-kids/direct-medicalInfo.do':''
			};
			var pet = {
//					'/pet/main.do':'',
//					'/pet/product.do':'',
//					'/pet/product-cat.do':''
			};
			if( cm.hasOwnProperty(loc) ){
				dsgTrgCd = 'CM';
				dsgDivCd = '0';
			}else if( pet.hasOwnProperty(loc) ){
				dsgTrgCd = 'PET';
				dsgDivCd = ''
			}else{
				dsgTrgCd = 'TM';
				dsgDivCd = '1'
			}
			return {dsgTrgCd : dsgTrgCd, dsgDivCd : dsgDivCd};
		}
		return o;
	})*/
})(angular, mz);
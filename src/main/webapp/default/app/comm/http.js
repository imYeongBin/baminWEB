/*
 * COPYRIGHT (c) MERITZ Fire Insurance 2015
 * This software is the proprietary information of MERITZ Fire Insurance.
 * 
 * Modeler : 강환기
 *
 * Revision History
 * Author Date       Description
 * ------ ---------- -----------
 * 강환기 2015-08-12 First Draft
 */
(function(angular, mz) {

	mz.comm.factory('http', mz.mold(function(co) {
		var log          		= co.get('logger').getLogger('http');
		var ajax 		 		= co.get('ajax');
		var util 		 		= co.get('util');
		var path 		 		= co.get('path');
		var location 	 		= co.get('location');
		var $window  	 		= co.get('$window');
		var $location 	 		= co.get('$location');
		var $timeout    		= co.get('$timeout');
		var $q 					= co.get('$q');
		var path     	 		= co.get('path');
		var SERVICE_URL  		= mz.DOMAIN + mz.WEBROOT;
		//var SERVICE_URL  		= mz.DOMAIN + mz.WEBROOT;
		//var ERROR_CODE   		= ['FNGFW100062','FNGFW100048', 'FCGCMH00004', 'FCGCMH00005', "FCGCMH00006"];

		/* - public ------------------------------- */

		var o = {};

		o.post = function(id, param, flag) {
			if (!_.isString(id) || !param) {
				alert("요청전문 서비스ID값을 확인해 주세요.");
				return;
			}
			
			var input = inputFilter(id, param);
			var p_id  = id;
			var s_tm  = new Date();
			
			if(_.isUndefined(flag)) {
				flag = true;
			}
			
			var fn= _$post;
			if(flag) {
				fn = ajax.post;
			}

			//log.trace(tm(s_tm), ['S(', id, ')'].join('')+(flag?'+':'-'), param);

			return fn(SERVICE_URL, input).then(function(result){	
				var r_tm = new Date();
				if (!result) {
					// 네트워크장애
					//log.trace(tm(r_tm), ['R(', p_id, ')'].join('')+(flag?'+':'-'), result);
					moveErrorPage();
					return;
				}

				if (result.status != 200) {
					// 404, 500 에러
					//log.trace(tm(r_tm), ['R(', p_id, ')'].join('')+(flag?'+':'-'), 'status:'+result.status);
					moveErrorPage();
					return;
				}

				//log.trace(tm(r_tm), ['R(', p_id, ':',result.status, ')'].join('')+(flag?'+':'-'), result.data);

				return result;
			}).then(function(result){
			});
		};

		return o;

		/* - private ------------------------------ */
		
		function moveErrorPage() {
			alert("http error!!!!!!!");
			$window.location.href = "/bamin/error.do";
			return;
		}

		function tm(date) {
			return util.formatDate(date, "hh24:mi ss.fff");
		}

		function inputFilter(id, param) {
			return {
				header: {
					encryDivCd: '0',
					globId: '',
					rcvmsgSrvId: id,
					resultRcvmsgSrvId: '',
					esbIntfId: '',
					exsIntfId: '',
					ipv6Addr1: '',
					ipv6Addr2: '',
					teleMsgMacAdr: '',
					envirInfoDivCd: '',
					firstTranssLcatgBizafairCd: '',
					transsLcatgBizafairCd: '',
					reqRespnsDivCd: 'Q',
					syncDivCd: 'S',
					teleMsgReqDttm: util.formatDate(new Date(), "yyyymmddhh24missfff"),
					prcesResultDivCd: '',
					teleMsgRespnsDttm: '',
					clienTrespnsDttm: '',
					handcapLcatgBizafairCd: '',
					teleMsgVerDivCd: '',
					langDivCd: 'KR',
					belongGrpCd: '',
					empNo: '',
					empId: '',
					dptCd: '',
					hgrkDptCd: '',
					nxupDptCd: '',
					transGrpCd: 'F',
					resveLet: ''
				},
				body: param
			};
		}
		
		function _$post(url, param){
			var deferred = $q.defer();
			$timeout(function() {
				$.ajax({
					type: 'POST', 
					url: url ,
					contentType: 'application/json; charset=UTF-8',
					data: JSON.stringify(param),
					success: function(data) {
						deferred.resolve({ data: data, status:200 });
					},
					error: function() {
						deferred.resolve(null);
					}
				});
			},1);
			return deferred.promise;
		}
	}));
})(angular, mz);
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
	
	//mz.load('default/app/biz/ct/to/insctrlon/', ['comInsCtrLon.js'], true);

	/**
	 * @method commController - 怨듯넻 而⑦듃濡ㅻ윭
	 * @param {o} co - 怨듯넻而댄룷�뚰듃
	 * @param {o} $scope - �ㅼ퐫��
	 */
	mz.comm.controller('commController', mz.mold(function(co, $scope, logger, location, layerPop) {
		var log = logger.getLogger('commController');
		var svcFunCtrlInfo = co.get('svcFunCtrlInfo');

		$scope.WEBROOT = mz.WEBROOT;
		$scope.DOWNLOADURL = mz.DOWNLOADURL;

		/* - init --------------------------------- */

		init();

		/* - public -------------------------------- */

		$scope.home = function() {
			location.go('/main.do', '/');
		};

		$scope.mobileService = function() {
			location.go('/certification-center/mobile/mobile-web.do', '/');
		};
		
		$scope.counsel = function() {
			location.go('/customer-center/online-counsel.do', '/');
		};

		/*
		$scope.alert = function(message, option) {
			return layerPop.alert({
				message: message,
				option: option,
				tpl: 'comm/alert',
				id: 'layer_alert',
				controller: 'layerAlertController'
			});
		};

		$scope.confirm = function(message, title, option) {
			return layerPop.confirm({
				message: message,
				title: title,
				option: option,
				tpl: 'comm/confirm',
				id: 'layer_confirm',
				controller: 'layerConfirmController'
			});
		};
		*/

		/* - event -------------------------------- */
		/*
		$scope.$on('event-comm-session', function(event, userInfo) {
			log.trace(userInfo);
			if (userInfo) {
				$scope.userNm = userInfo.userNm;
				//濡쒓렇�몄씠 �섏뼱 �몄뀡�� �ъ슜�먭� �덈떎硫� sessionIdleService start()
				var sessionIdleService = co.get('sessionIdleService');
				sessionIdleService.start();
			}
		});
		*/

		$scope.activeClass = function(val) {
			if (_.isUndefined(val) || _.isNull(val) || 0 == $.trim(val).length) {
				return '';
			}
			return 'active';
		};
		
		$scope.setTitle = function(val) {
			if (_.isUndefined(val) || _.isNull(val) || 0 == $.trim(val).length) {
				return false;
			}
			
			document.title = val + " | 硫붾━痢좏솕��";
			return true;
		};
		
		//怨꾩빟�곹깭 class 泥섎━
		$scope.insStatCdNmClass = function(val) {
			var classNm = "link";
			
			if(val == '�좎삁') {
				classNm = "link02";
			} else if(val == '誘몃궔') {
				classNm = "link04";
			} else if(val == '�ㅽ슚') {
				classNm = "link03";
			}
 			
			return classNm;
		};
		
		//怨듯넻 ���� �앹뾽 �몄텧
		$scope.openLayerBank = function(bankList, id) {
			
			$scope.showNotice = false;	//�묒뾽�� 怨듭� �덈궡 硫붿떆吏� �쒖떆 �щ�
			
			//�쒖뒪�� �묒뾽�쒓컙
			//- �쒖뼱 �쒓컙 : 6/16(��) 02�� ~ 06�� (4�쒓컙)
			//- �몄텧 硫붿떆吏� : ��援ъ��� �꾩궛 �묒뾽�쇰줈 �명빐 6/16, 02�쒕��� 06�쒓퉴吏� ��援ъ��됱쓣 �듯븳 嫄곕옒媛� 遺덇��⑸땲��.
			
			var putupStDdTmFn;		// �묒뾽�쒖옉�쇱떆媛�
			var putupEdDdTmFn;	// �묒뾽�꾨즺�쇱떆媛�
			var putupDtlCon;			// 以묐떒���됰찓�쒖�

			svcFunCtrlInfo.getStopMenuList("BK").then(function(result) {
				var list = result.body.list;
				if(list && list.length > 0) {
					list.forEach(function(val, idx){
						if(val.bizNtfyMctgCd == '9000') {							
							putupStDdTmFn = val.putupStDdTmFn.substr(0, 10);
							putupEdDdTmFn = val.putupEdDdTmFn.substr(0, 10);
							putupDtlCon = val.putupDtlCon;

							var stDt = putupStDdTmFn; 		//�쒖옉�쒓컙 (�댁떆媛꾨��� 蹂댁엫)
							var endDt = putupEdDdTmFn;	//醫낅즺�쒓컙 (�댁떆媛꾨��� �덈낫��))
														
							var date = new Date();
							var today = date.getFullYear() + ("0" + (date.getMonth()+1)).slice(-2) + ("0" +date.getDate()).slice(-2) + ("0" + date.getHours()).slice(-2)
							if (eval(stDt) <= eval(today) && eval(today) < eval(endDt))  {
								$('#showNoticeCon').text(putupDtlCon);														
								$scope.showNotice = true;
							}							
						}
					});
				}
			});  			
			
			var param = {
				bankList: _.clone(bankList)	
			};
			
			return layerPop.open("layerBank", "comm/bank", param).then(function(result) {
				log.out("result #######", result);
				//id媛믪뿉 text 蹂�寃� 
				if(result && result.data) {
					var data = result.data;
					$("#" + id)
					.text(data.efctValNm)
					.data("value", data.efctVal);
				}
				return result;
			});
		};

		/* - private ------------------------------ */

		
		/**
		 * @method init - 珥덇린��
		 */
		function init() {
			
			//16.12.13 �곷떞�쒓컙�ㅼ젙
			co.get('slzDate').init();
		}
	}));
	
	mz.comm.controller('layerBankController', mz.mold(function(co, $scope) {
		
		var log       = co.get('logger').getLogger('layerBankController');
		var layerPop  = co.get('layerPop');
		var util      = co.get('util');
		var $timeout  = co.get('$timeout');
		var promise = co.get('promise');
		var serverDateUtil = co.get('serverDateUtil');

		init();
		
		$scope.close = function() {
			layerPop.close($scope, $scope.result);
		};
		
		$scope.clickBank = function(info) {
			$scope.result = {
				data: info	
			};
			$scope.close();
		};
		
		function init() {
			
			var param = layerPop.getParam($scope);
			
			$scope.param  = {}; //�섏뼱�� �뺣낫.
			$scope.result = {}; //遺�紐⑥뿉寃� �섍만 �뺣낫.
			
			if(!_.isUndefined(param)) {
				$scope.param = param;
			}
			
			$timeout(function() {
				var len = $(".layer_content .select_bank li").size();
				var n   = 5 - (len % 5);
				var s   = "";
				for(var i = 0; i < n; i++) {
					s += "<li class=\"ui_last\"></li>";
				}
				$(".layer_content .select_bank li").last().after(s);
			});
		}
	}));

	/**
	 * @method 
	 * @param {[type]} co [description]
	 * @param {[type]} $scope) {		var log [description]
	 * @return {[type]} [description]
	 */
	mz.comm.controller('layerAlertController', mz.mold(function(co, $scope) {
		var log         = co.get('logger').getLogger('layerAlertController');
		var $sce        = co.get('$sce');
		var $rootScope  = co.get('$rootScope');

		var id = "layer_alert";
		/* - init --------------------------------- */

		init();

		/* - private ------------------------------ */
		$scope.confirm = function() {
			$rootScope[id] = {open: false};
			closeLayerPopup(id);
			$scope.promise.resolve(true);
		};


		/**
		 * @method init - 珥덇린��
		 */
		function init() {
			$scope.message = $sce.trustAsHtml($scope.message);

			var option = $scope.option;
			$scope.width = option.width || '440';
		}
	}));

	/**
	 * @method 
	 * @param {[type]} co [description]
	 * @param {[type]} $scope) {		var log [description]
	 * @return {[type]} [description]
	 */
	mz.comm.controller('layerConfirmController', mz.mold(function(co, $scope) {
		var log 	    = co.get('logger').getLogger('layerConfirmController');
		var $sce 	    = co.get('$sce');
		var id 			= "layer_confirm";
		var $rootScope  = co.get('$rootScope');

		/* - init --------------------------------- */

		init();


		/* - private ------------------------------ */
		$scope.confirm = function() {
			$rootScope[id] = {open: false};
			closeLayerPopup(id);
			$scope.promise.resolve(true);
		};


		$scope.cancel = function() {
			$rootScope[id] = {open: false};
			closeLayerPopup(id);
			$scope.promise.resolve(false);
		};

		$scope.callFn = function(name) {
			$scope[name]();
		};

		/**
		 * @method init - 珥덇린��
		 */
		function init() {
			$scope.message = $sce.trustAsHtml($scope.message);

			var option = $scope.option;
			$scope.width = option.width || '440';
			$scope.btn = option.btn || [{
				name: '痍⑥냼',
				css: 'btn_w01',
				fnName: 'cancel'
			}, {
				name: '�뺤씤',
				css: 'btn_n02',
				fnName: 'confirm'
			}];
		}
	}));

	/**
	 * @method 
	 * @param {[type]} co [description]
	 * @param {[type]} $scope) {		var log [description]
	 * @return {[type]} [description]
	 */
	mz.comm.controller('layerCommonController', mz.mold(function(co, $scope) {
		var log = co.get('logger').getLogger('layerCommonController');
		var id = "layerCommon";
		var layerPop = co.get('layerPop');
		var $timeout = co.get('$timeout');
		/* - init --------------------------------- */

		init();

		/* - public ------------------------------ */
		$scope.close = function() {
			log.out('common layer popup close!!!');
			/*
			closeLayerPopup(id);
			$scope.promise.resolve(true);
			*/
			layerPop.close($scope, {
				result: true
			});
		};

		/* - private ------------------------------ */

		/**
		 * @method init - 珥덇린��
		 */
		function init() {
			$timeout(function(){
				window.telecomSlt.init();
			}, 500);
			
			reviCtl();

			$scope.tmprevi = function(day){
				try{
					var REVIDAY = 20190527;
					co.get('http').post('f.cg.he.co.cc.o.bc.SessionRouteBc.getCurrentDateTime', {}, false).then(function(res){
						var reviDate = day * 1;//�쒕쾭�� �꾩옱�좎쭨
						if(reviDate >= REVIDAY){
							$scope.revi0527 = true;
						}else{
							$scope.revi0527 = false;
						}
					});
				}catch(ex){
					
				}
			}
			
		}

		function reviCtl(){
			//bef : data-ng-hide="revi0527"
			//aft : data-ng-show="revi0527"
			try{
				var REVIDAY = 20190527;
				
//				REVIDAY = 20190523;
				
				co.get('http').post('f.cg.he.co.cc.o.bc.SessionRouteBc.getCurrentDateTime', {}, false).then(function(res){
					var reviDate = res.body.currentDate * 1;
					if(reviDate >= REVIDAY){
						$scope.revi0527 = true;
					}else{
						$scope.revi0527 = false;
					}
				});
			}catch(ex){
//				console.log(ex);
			}
		}
	}));


	/**
	 * �대��곗씤利� �덉씠�� �앹뾽.
	 */
	mz.comm.controller('layerMobileCertController', mz.mold(function(co, $scope) {
		var log = co.get('logger').getLogger('layerMobileCertController');
		var id = "layerMobileCert";
		var http = co.get('http');
		var layerPop = co.get('layerPop');
		var util = co.get('util');

		init();

		/* - public ------------------------------ */
		$scope.close = function() {
			layerPop.close($scope, $scope.retData);
		};

		//�몄쬆踰덊샇諛쏄린
		$scope.rqeCellAthNo = function() {
			
			//紐⑤컮�쇱뿉�쒕뒗 濡쒓렇�� 遺덇�泥섎━ (20180918)
			if ('M' === mz.device[0]) {
				alert("紐⑤컮�쇱뿉�쒕뒗 �쒓났�섏� �딅뒗 �쒕퉬�ㅼ엯�덈떎.");
				return false;
			}
			
			//�몄쬆踰덊샇 諛쏄린 validation 泥댄겕..
			requestCheck();

			//if ($scope.valid.telNo.error ) {
				//return false;
			//}

			var type = $('#i_mphone_type option:selected').val();
			var cellNo = util.replaceAll($scope.data.telNo, '-', '');
			var param = {
				"ccoDiv": type,
				"cellNo": cellNo
			};

			log.out("�몄쬆踰덊샇 PARAM ########", param);

			http.post('f.cg.he.co.cc.o.bc.CertMobileBc.rqeCellAthNo', param).then(function(result) {
				if (!util.resultMsg(result)) {
					return false;
				}

				if (result.body.athRsl == '0000') {
					$scope.isRqeSmsAthNo = true;
				}
			});
			
			//$scope.valid.telNo.error = false;
		};


		//蹂몄씤�몄쬆
		$scope.verifyCellAthNo = function() {
			//蹂몄씤�몄쬆 validation check
			verifyCheck();

			if (util.isError($scope.valid)) {
				return false;
			}

			var smsAthNo = $scope.data.smsAthNo;
			var param = {
				"smsAthNo": smsAthNo
			};

			http.post('f.cg.he.co.cc.o.bc.CertMobileBc.verifyCellAthNo', param).then(function(result) {
				if (!util.resultMsg(result)) {
					return false;
				}

				$scope.retData = {
					success: true,
					smsAthNo: smsAthNo
				};
				layerPop.close($scope, $scope.retData);
			});
		};
		
		$scope.loadTermsPopup = function(type) {
			var ctrlNm = "";
			var tplNm = "";
			if (type == '01') {
				//媛쒖씤�뺣낫 �댁슜 諛� �쒓났�숈쓽 �쎄�
				ctrlNm = "layerCommon";
				tplNm = "biz/cm/mo/clus/lypop_indvInf";
			} else if (type == '02') {
				//怨좎쑀�앸퀎 �뺣낫 泥섎━ �숈쓽
				ctrlNm = "layerCommon";
				tplNm = "biz/cm/mo/clus/lypop_identifier";
			} else if (type == '03') {
				//�듭떊�� �댁슜�쎄� �숈쓽
				ctrlNm = "layerCommon";
				var ccoDiv = $('#i_mphone_type option:selected').val();
				log.out("�듭떊�� 援щ텇 = " + ccoDiv);
				if (ccoDiv == '1' || ccoDiv == '5') {
					//SKT �쎄�
					tplNm = "biz/cm/mo/clus/lypop_telecomSK";
				} else if (ccoDiv == '2' || ccoDiv == '6') {
					//KT �쎄�
					tplNm = "biz/cm/mo/clus/lypop_telecomKT";
				} else if (ccoDiv == '3' || ccoDiv == '7') {
					//LGT �쎄�
					tplNm = "biz/cm/mo/clus/lypop_telecomLG";
				}
			} else if (type == '04') {
				//媛쒖씤�뺣낫 �댁슜 諛� �쒓났�숈쓽 �쎄�
				ctrlNm = "layerCommon";
				tplNm = "biz/cm/mo/lgin/lypop_sec_card01";
			} else if (type == '05') {
				//怨좎쑀�앸퀎 �뺣낫 泥섎━ �숈쓽
				ctrlNm = "layerCommon";
				tplNm = "biz/cm/mo/lgin/lypop_sec_card02";
			} else if (type == '06') {
				//�대��� 蹂몄씤�뺤씤 �쒕퉬�� �댁슜�쎄� �숈쓽 �앹뾽
				ctrlNm = "layerCommon";
				tplNm = "biz/cm/mo/clus/lypop_serviceChck";		
			}

			layerPop.open(ctrlNm, tplNm);
		};

		/* - private ------------------------------ */
		function agreeCheck () {
			$scope.valid = $scope.valid || {};
			//�숈쓽�щ�泥댄겕
			$scope.valid.agree = {
				error: false,
				msg: "�숈쓽�� 泥댄겕�� 二쇱뀛�� �⑸땲��."
			};

			if (!$scope.data.agree1 || !$scope.data.agree2 || !$scope.data.agree3) {
				$scope.valid.agree.error = true;
			}
		}
		
		function requestCheck() {
			
			//�숈쓽�щ� �뺤씤
			if (!$scope.layer.i_chk_termsP01 || !$scope.layer.i_chk_termsP02 || !$scope.layer.i_chk_termsP03 || !$scope.layer.i_chk_termsP04) {
				$scope.layer.i_chk_termsP_error = true;
				isValid = false;
				return false;
			} else {
				$scope.layer.i_chk_termsP_error = false;
			}
			
			$scope.valid = $scope.valid || {};

			//�대��곕쾲�몄껜��
			$scope.valid.telNo = {
				error: false,
				msg: '�대��곕쾲�몃� �뺥솗�� �낅젰�섏꽭��.'
			};
			
			if (_.isEmpty($scope.data.telNo) || !util.isMobile($scope.data.telNo)) {
				$scope.valid.telNo.error = true;
			}

			setTimeout(function() {
				errorMthod();
			}, 200);
		}

		function verifyCheck() {
			$scope.valid = $scope.valid || {};			
			//�몄쬆踰덊샇 諛쏄린..�섏뼱 �덈뒗吏� 泥댄겕
			if (!$scope.isRqeSmsAthNo) {
				$scope.valid.telNo = {
					error: true,
					msg: "�몄쬆踰덊샇 諛쏄린瑜� �뚮윭二쇱꽭��."
				};
			}

			//�몄쬆踰덊샇 泥댄겕
			$scope.valid.smsAthNo = {
				error: false,
				msg: "�몄쬆踰덊샇瑜� �뺥솗�� �낅젰�섏꽭��."
			};

			if (_.isEmpty($scope.data.smsAthNo) || $scope.data.smsAthNo.length != 6) {
				$scope.valid.smsAthNo.error = true;
			}
			
			//agreeCheck();
			requestCheck();
			
			setTimeout(function() {
				errorMthod();
			}, 200);
		}
		

		/**
		 * @method init - 珥덇린��
		 */
		function init() {
			$scope.data = {
				type: '1',
				agree1: false,
				agree2: false,
				agree3: false
			}; //layer�먯꽌 愿�由щ릺�� 蹂���..
			//�듭떊�� 肄붾뱶
			$scope.ccoDivList = [{
				cd: '1',
				nm: 'SKT'
			}, {
				cd: '2',
				nm: 'KT'
			}, {
				cd: '3',
				nm: 'LG U+'
			}, {
				cd: '5',
				nm: 'SKT �뚮쑑��'
			}, {
				cd: '6',
				nm: 'KT �뚮쑑��'
			}, {
				cd: '7',
				nm: 'LG U+ �뚮쑑��'
			}];

			$scope.isRqeSmsAthNo = false;
			$scope.retData = {
				success: false
			};

			setTimeout(function() {
				styleFormMethod();
			}, 200);
		}
	}));
	
	/*
	mz.comm.controller('layerSelfLginController', mz.mold(function(co, $scope) {
		var log = co.get('logger').getLogger('layerSelfLginController');
		var http = co.get('http');
		var layerPop = co.get('layerPop');
		var location = co.get('location');
		var util = co.get('util');
		
		init();
		
		function init(){
			
			//�쒖뒪�� �묒뾽�쒓컙
			var stDt = "20160820220000";
			var endDt = "20160821070000";
			var dt = new Date();
			var today = util.formatDate(dt,'yyyymmddhh24miss');
			
			// �쒓컙鍮꾧탳
			if (eval(stDt) < eval(today) && eval(today) < eval(endDt))  {  
				layerPop.open("layerSelfLgin", "biz/cm/mo/emg/lypop_emg", {});
			}else{
				layerPop.open("layerSelfLgin2", "biz/cm/mo/lgin/lypop_lgin", {}).then(function(result) {
					if(result.result) {
						location.redirect(URL);
					}
				});
			}
			
		}
		
	}));
	*/
	
	/**
	 * @method 
	 * @param {[type]} co [description]
	 * @param {[type]} $scope) {		var log [description]
	 * @return {[type]} [description]
	 */
	mz.comm.controller('layerSelfLginController', mz.mold(function(co, $scope) {
		var id = "layerSelfLgin";
		var log = co.get('logger').getLogger('layerSelfLginController');
		var http = co.get('http');
		var layerPop = co.get('layerPop');
		var location = co.get('location');
		var util = co.get('util');
		var ajax = co.get('ajax');
		var athdc = co.get('athdc');
		var $timeout = co.get('$timeout');
		var rsecure = co.get('rsecure');
		var $window = co.get('$window');

		$scope.layer = {};

		/* - init --------------------------------- */

		init();

		/* - public ------------------------------ */
		$scope.layer.close = function(result) {
			layerPop.close($scope, {
				result: result
			});
		};
		/**
		 * [ccoDivList description] �듭떊�� 援щ텇
		 * @type {Array}
		 */
		//�듭떊�� 肄붾뱶
		$scope.layer.ccoDivList = [{
			cd: '1',
			nm: 'SKT'
		}, {
			cd: '2',
			nm: 'KT'
		}, {
			cd: '3',
			nm: 'LG U+'
		}, {
			cd: '5',
			nm: 'SKT �뚮쑑��'
		}, {
			cd: '6',
			nm: 'KT �뚮쑑��'
		}, {
			cd: '7',
			nm: 'LG U+ �뚮쑑��'
		}];
		//湲곕낯 �듭떊�� 肄붾뱶
		$scope.layer.ccoDiv = $scope.layer.ccoDivList[0].cd;
		//�몄쬆踰덊샇 �붿껌 �щ�
		$scope.layer.isRqeSmsAthNo = false;
		/**
		 * @method movePage
		 * @param {[type]} type [description]
		 */
		$scope.layer.movePage = function(type) {
			
			//紐⑤컮�쇱뿉�쒕뒗 濡쒓렇�� 遺덇�泥섎━ (20180918)
			if ('M' === mz.device[0]) {
				alert("紐⑤컮�쇱뿉�쒕뒗 �쒓났�섏� �딅뒗 �쒕퉬�ㅼ엯�덈떎.");
				return false;
			}
			
			if (type == 'certificate') {
				//怨듭씤�몄쬆 �깅줉 �붾㈃ �대룞
				var param = {grupYn: $scope.grupYn};		//�⑥껜蹂댄뿕 蹂댄뿕湲덊솕硫댁뿉�� �몄텧 �щ�
				location.go("/certification-center/user-certificate.do", "/", param);
			}

		};
		$scope.layer.showTab = function(tabId) {
			log.out("tabId = " + tabId);
			$scope.layer.table = tabId;
			$timeout(function() {
				log.out("�붾㈃ �ㅽ��� �곸슜!!");
				styleFormMethod();
			}, 100);
			//
			if ($window.tk && $window.tk.now) {
				log.out($window.tk);
				$window.tk.close();
			}
		};
		/**
		 * @method checkValid
		 * @param {[type]} type [description]
		 * @param {[type]} id [description]
		 * @param {[type]} error [description]
		 */
		$scope.layer.checkValid = function(type, id) {
			var error = false;
			var val = document.getElementById(id).value;
			log.out("val = " + val);
			if (type == 'hp') {
				if (!val || val.length < 10 || !util.isMobile(val)) {
					error = true;
				}
			} else if (type == 'ssn') {
				if (!val || val.length < 6) {
					error = true;
				}
			} else {
				if (!val) {
					error = true;
				}
			}
			$timeout(function() {
				errorMthod();
			}, 10);
			return error;
		};
		/**
		 * @method procLgin
		 * @param {[type]} type [description]
		 */
		$scope.layer.procLgin = function(type) {
			
			//紐⑤컮�쇱뿉�쒕뒗 濡쒓렇�� 遺덇�泥섎━ (20180918)
			if ('M' === mz.device[0]) {
				alert("紐⑤컮�쇱뿉�쒕뒗 �쒓났�섏� �딅뒗 �쒕퉬�ㅼ엯�덈떎.");
				return false;
			}
			
			if (type == '01') {
				//怨듭씤�몄쬆�� 蹂몄씤�몄쬆
				//2李� 異붽��몄쬆�� 寃쎌슦, 1李⑥� �숈씪�� �몄쬆諛⑹떇�� �ъ슜�좎닔 �놁쓬
				if($scope.layer.prevAuthCd && $scope.layer.prevAuthCd == '1') {
					layerPop.alert("�대��� �먮뒗 �좎슜移대뱶濡� 異붽� �몄쬆�� �� 二쇱꽭��.");
					return false;
				}
				//athdc.login(ksbizSignCallback);
				athdc.login(function(result) {
					log.out(result);
					if (result.status == 1) {
						//�몄쬆�� �뺤씤 - 怨듭씤�몄쬆�� 濡쒓렇�� 泥섎━
						lginOfapvAthdc(result.data);
						//
					} else if (result.status == 0) {
						log.out("�몄쬆�� �좏깮 痍⑥냼!!!!1");
						layerPop.alert("�몄쬆�� �좏깮�� 痍⑥냼 �섏��듬땲��. ");
					} else {
						log.out("�꾩옄�쒕챸 �ㅻ쪟:" + result.message + "[" + result.status + "]")
						layerPop.alert("�꾩옄�쒕챸 �ㅻ쪟:" + result.message + "[" + result.status + "]");
					}
				});
			} else if (type == '02') {
				//2李� 異붽��몄쬆�� 寃쎌슦, 1李⑥� �숈씪�� �몄쬆諛⑹떇�� �ъ슜�좎닔 �놁쓬
				if($scope.layer.prevAuthCd && $scope.layer.prevAuthCd != '1') {
					layerPop.alert("怨듭씤�몄쬆�쒕줈 異붽� �몄쬆�� �� 二쇱꽭��.");
					return false;
				}
				//�대��� �몄쬆 蹂몄씤�몄쬆
				lginCellAthNo();
				
			/*
			 * 2016.11.29 �좎슜移대뱶 �몄쬆�쒕퉬�� 以묐떒
			} else if (type == '03') {
				if($scope.layer.prevAuthCd && $scope.layer.prevAuthCd != '1') {
					layerPop.alert("怨듭씤�몄쬆�쒕줈 異붽� �몄쬆�� �� 二쇱꽭��.");
					return false;
				}
				//�좎슜移대뱶 蹂몄씤�몄쬆
				lginCrdtCrd();
			*/
			} else if (type == '04') {
				//�대��� 踰덊샇 �ъ슜�깅줉
				mobileSignGo();
			} else {
				//
				log.out("�몄쬆 ���� �ㅻ쪟 type = " + type);
			}
		};
		/**
		 * @method rqeCellAthNo �대��� �몄쬆踰덊샇 �붿껌
		 */
		$scope.layer.rqeCellAthNo = function() {
			
			//紐⑤컮�쇱뿉�쒕뒗 濡쒓렇�� 遺덇�泥섎━ (20180918)
			if ('M' === mz.device[0]) {
				alert("紐⑤컮�쇱뿉�쒕뒗 �쒓났�섏� �딅뒗 �쒕퉬�ㅼ엯�덈떎.");
				return false;
			}
			
			if($scope.layer.prevAuthCd && $scope.layer.prevAuthCd != '1') {
				layerPop.alert("怨듭씤�몄쬆�쒕줈 異붽� �몄쬆�� �� 二쇱꽭��.");
				return false;
			}
			//�대��� �몄쬆踰덊샇 �붿껌
			rqeCellAthNo();
		};
		
		/**
		 * @method lginAgrChk
		 * @param {[type]} type [description]
		 */
		$scope.lginAgrChk = function(type) {
			
			if (type == '02') {
				//�숈쓽�щ� �뺤씤
				if (!$scope.layer.i_chk_termsP01 || !$scope.layer.i_chk_termsP02 || !$scope.layer.i_chk_termsP03 || !$scope.layer.i_chk_termsP04) {
					$scope.layer.i_chk_termsP_error = true;
					isValid = false;
					return false;
				} else {
					$scope.layer.i_chk_termsP_error = false;
				}
			}
			
			if (type == '03') {
				//�숈쓽�щ� �뺤씤
				if (!$scope.layer.i_chk_termsC01 || !$scope.layer.i_chk_termsC02) {
					$scope.i_chk_termsC_error = true;
					isValid = false;
				} else {
					$scope.i_chk_termsC_error = false;
				}
			}
			
		}
		
		/**
		 * @method mobileSignGo
		 * �대��� 踰덊샇 �ъ슜�깅줉
		 */
		function mobileSignGo() {
			var param = {grupYn: $scope.grupYn};		//�⑥껜蹂댄뿕 蹂댄뿕湲덊솕硫댁뿉�� �몄텧 �щ�
			location.go("/certification-center/user-mobile-certificate.do", "/", param);
		}
		
		/**
		 * @method loadTermsPopup �쎄� �앹뾽 �몄텧
		 * @param {[type]} type [description]
		 */
		$scope.layer.loadTermsPopup = function(type) {
			var ctrlNm = "";
			var tplNm = "";
			if (type == '01') {
				//媛쒖씤�뺣낫 �댁슜 諛� �쒓났�숈쓽 �쎄�
				ctrlNm = "layerCommon";
				tplNm = "biz/cm/mo/clus/lypop_indvInf";
			} else if (type == '02') {
				//怨좎쑀�앸퀎 �뺣낫 泥섎━ �숈쓽
				ctrlNm = "layerCommon";
				tplNm = "biz/cm/mo/clus/lypop_identifier"
			} else if (type == '03') {
				//�듭떊�� �댁슜�쎄� �숈쓽
				ctrlNm = "layerCommon";
				$scope.ccoDiv = $('#layer_i_mphone_type option:selected').val();
				log.out("�듭떊�� 援щ텇 = " + $scope.ccoDiv);
				if ($scope.ccoDiv == '1' || $scope.ccoDiv == '5') {
					//SKT �쎄�
					tplNm = "biz/cm/mo/clus/lypop_telecomSK";
				} else if ($scope.ccoDiv == '2' || $scope.ccoDiv == '6') {
					//KT �쎄�
					tplNm = "biz/cm/mo/clus/lypop_telecomKT";
				} else if ($scope.ccoDiv == '3' || $scope.ccoDiv == '7') {
					//LGT �쎄�
					tplNm = "biz/cm/mo/clus/lypop_telecomLG";
				} else {
					layerPop.alert("�듭떊�� 援щ텇媛믪쓣 �뺤씤�� 二쇱꽭��.");
					return false;
				}
			} else if (type == '04') {
				//媛쒖씤�뺣낫 �댁슜 諛� �쒓났�숈쓽 �쎄�
				ctrlNm = "layerCommon";
				tplNm = "biz/cm/mo/lgin/lypop_sec_card01";
			} else if (type == '05') {
				//怨좎쑀�앸퀎 �뺣낫 泥섎━ �숈쓽
				ctrlNm = "layerCommon";
				tplNm = "biz/cm/mo/lgin/lypop_sec_card02";
			} else if (type == '06') {
				//�대��� 蹂몄씤�뺤씤 �쒕퉬�� �댁슜�쎄� �숈쓽 �앹뾽
				ctrlNm = "layerCommon";
				tplNm = "biz/cm/mo/clus/lypop_serviceChck";		
			} else {
				layerPop.alert("�쎄� 援щ텇�� �뺤씤�� 二쇱꽭��.");
				return false;
			}
			//�쎄� �앹뾽 �쒖떆
			layerPop.open(ctrlNm, tplNm).then(function(result) {
				//callback
				log.out(result);
			});
		};

		/* - private ------------------------------ */
		/**
		 * @method init - 珥덇린��
		 */
		function init() {
			
			$scope.grupYn = "N";	//�⑥껜蹂댄뿕湲� 泥�뎄 �섏씠吏��먯꽌 �몄텧 �щ�

			$scope.lyPm = layerPop.getParam($scope);
			if ($scope.lyPm) {
				if ($scope.lyPm.grupYn) {
					$scope.grupYn = $scope.lyPm.grupYn;
				}
			}
			//log.out("$scope.grupYn:", $scope.grupYn);
			
			//
			$timeout(function() {
				styleFormMethod();
			}, 200);
			//
			//�ㅻ낫�쒕낫��/ 媛��곹궎�⑤뱶 珥덇린��
			rsecure.initRsecureKey(300);
		}
		/**
		 * @method lginOfapvAthdc 怨듭씤�몄쬆�� 蹂몄씤�몄쬆
		 * @param {[type]} data [description]
		 */
		function lginOfapvAthdc(data) {
			var pm = {
				ksbizSig: data,							//�몄쬆�쒕뜲�댄꽣
				prevAuthCd: $scope.layer.prevAuthCd,		//吏곸쟾 �몄쬆�좏삎
				verifyCrlYn: "Y"		//CRL�몄텧�⑥닔 蹂�寃�(20190513)
			};
			http.post("f.cg.he.cm.mo.o.bc.LginBc.lginOfapvAthdc", pm).then(function(result) {
				log.out(result);
				if (result) {
					//prcesResultDivCd 0 �대㈃�깃났, 1 �대㈃�ㅽ뙣
					if (result.header && result.header.prcesResultDivCd == '0') {
						//蹂몄씤�몄쬆 �깃났�щ� �뺤씤
						checkLoginResult(result.body);
					} else {
						//�ㅽ뙣�� �먮윭硫붿떆吏� 泥섎━
						layerPop.alert(result.msg.standMsg);
						return false;
					}
				}
			});
		}
		/**
		 * @method lginCrdtCrd �좎슜移대뱶 蹂몄씤�몄쬆
		 */
		function lginCrdtCrd() {
			var isValid = true;
			//�낅젰泥댄겕
			if (!$scope.layer.i_jumin_a01 || $scope.layer.i_jumin_a01.length < 6 || document.getElementById('layer_i_jumin_a02').value.length < 7) {
				$scope.layer.i_jumin_a01_error = true;
				isValid = false;
			} else {
				$scope.layer.i_jumin_a01_error = false;
			}
			if (!$scope.layer.i_creditCard01 || !$scope.layer.i_creditCard02 || !$scope.layer.i_creditCard03 || document.getElementById('layer_i_creditCard04').value.length == 0) {
				$scope.layer.i_creditCard_error = true;
				isValid = false;
			} else {
				$scope.layer.i_creditCard_error = false;
			}
			if (!$scope.layer.i_periodYear || !$scope.layer.i_periodMonth) {
				$scope.layer.i_period_error = true;
				isValid = false;
			} else {
				$scope.layer.i_period_error = false;
			}
			//移대뱶�좏슚�꾨룄 泥댄겕
			var curYear = new Date().getFullYear() % 2000;
			log.out("curYear = " + curYear % 2000);
			if ($scope.layer.i_periodYear < curYear) {
				log.out("efctYY input invalid!!!");
				$scope.layer.i_period_error = true;
				isValid = false;
			} 
			if (document.getElementById('layer_i_pw').value.length == 0) {
				$scope.layer.i_pw_error = true;
				isValid = false;
			} else {
				$scope.layer.i_pw_error = false;
			}
			//�숈쓽�щ� �뺤씤
			if (!$scope.layer.i_chk_termsC01 || !$scope.layer.i_chk_termsC02) {
				$scope.layer.i_chk_termsC_error = true;
				isValid = false;
			} else {
				$scope.layer.i_chk_termsC_error = false;
			}
			if (!isValid) {
				$timeout(function() {
					errorMthod();
				}, 10);
				return false;
			}
			//二쇰�踰덊샇 �ㅻ낫�쒕낫��(媛��곹궎�⑤뱶) �낅젰 蹂듯샇�� 泥섎━
			var inputData = util.getInputEncData(['layer_i_jumin_a02', 'layer_i_creditCard04', 'layer_i_pw'], document.getElementById("lyfrm"));
			log.out(inputData);
			//
			ajax.form("/solution/touchen/decode.do", inputData).then(function(ajaxRst) {
				log.out("�ㅻ낫�쒕낫�� 蹂듯샇�� 寃곌낵 : ", ajaxRst);
				if(ajaxRst && ajaxRst.data && ajaxRst.data.result) {
					log.out("ajaxRst.data : ", ajaxRst.data);
					var pm = {
						iJuminA01: $scope.layer.i_jumin_a01, //二쇰�踰덊샇 �욎옄由�
						iJuminA02: ajaxRst.data.layer_i_jumin_a02, //二쇰�踰덊샇 �룹옄由� - �몄뀡 ��
						crdtCrdNo1: $scope.layer.i_creditCard01 + $scope.layer.i_creditCard02 + $scope.layer.i_creditCard03, //�좎슜移대뱶踰덊샇
						crdtCrdNo2: ajaxRst.data.layer_i_creditCard04, //�좎슜移대뱶踰덊샇 - �몄뀡��
						efctYY: $scope.layer.i_periodYear, //�좏슚�꾨룄
						efctMM: util.leftPad($scope.layer.i_periodMonth, 2, '0'), //�좏슚��
						pwd: ajaxRst.data.layer_i_pw, 		//鍮꾨�踰덊샇 - �몄뀡��
						prevAuthCd: $scope.layer.prevAuthCd
					};
					http.post("f.cg.he.cm.mo.o.bc.LginBc.lginCrdtCrd", pm).then(function(result) {
						log.out(result);
						if (result) {
							//prcesResultDivCd 0 �대㈃�깃났, 1 �대㈃�ㅽ뙣
							if (result.header && result.header.prcesResultDivCd == '0') {
								//蹂몄씤�몄쬆 �깃났�щ� �뺤씤
								checkLoginResult(result.body);
							} else {
								//�ㅽ뙣�� �먮윭硫붿떆吏� 泥섎━
								layerPop.alert(result.msg.standMsg);
								return false;
							}
						}
					});
				} else {
					layerPop.alert("�곗씠�� �뷀샇�� �몄뀡�ㅺ� 留뚮즺�섏뿀�듬땲��.<br/>�ㅼ떆 �쒕룄�� 二쇱꽭��.").then(function() {
						window.location.reload();
					});
				}
			});
		}
		/**
		 * @method rqeCellAthNo �대��� �몄쬆踰덊샇 諛쒓툒 �붿뿃
		 * @return {[type]} [description]
		 */
		function rqeCellAthNo() {
			
			//�숈쓽�щ� �뺤씤
			if (!$scope.layer.i_chk_termsP01 || !$scope.layer.i_chk_termsP02 || !$scope.layer.i_chk_termsP03 || !$scope.layer.i_chk_termsP04) {
				$scope.layer.i_chk_termsP_error = true;
				isValid = false;
				return false;
			} else {
				$scope.layer.i_chk_termsP_error = false;
			}
			
			var isValid = true;
			//�낅젰�щ� 泥댄겕
			//if (!$scope.layer.i_jumin_b01 || $scope.layer.i_jumin_b01.length < 6 || document.getElementById('layer_i_jumin_b02').value.length < 7) {
			if (!$scope.layer.i_jumin_b01 || $scope.layer.i_jumin_b01.length < 6) {
				$scope.layer.i_jumin_b01_error = true;
				isValid = false;
			} else {
				$scope.layer.i_jumin_b01_error = false;
			}
			//�듭떊��
			$scope.ccoDiv = $('#layer_i_mphone_type option:selected').val();
			log.out("�듭떊�� = " + $scope.ccoDiv);
			//�대��곕쾲�� 
			if (!$scope.layer.i_mphoneNumber || $scope.layer.i_mphoneNumber.length < 10 || !util.isMobile($scope.layer.i_mphoneNumber)) {
				$scope.layer.i_mphoneNumber_error = true;
				isValid = false;
			} else {
				$scope.layer.i_mphoneNumber_error = false;
			}
			//�낅젰 �깃났 �щ�
			if (!isValid) {
				$timeout(function() {
					errorMthod();
				}, 10);
				return false;
			}
			var pm = {
					iJuminB01: $scope.layer.i_jumin_b01, //二쇰�踰덊샇 �욎옄由�
					//ccoDiv: $('#layer_i_mphone_type option:selected').val(), //�듭떊��
					cellSnoAllDect: $scope.layer.i_mphoneNumber //�대��곕쾲��
			};
			
			// �대��곕쾲�� �깅줉�щ� 議고쉶
			log.out("rqeCellAthNo param info ", pm);
			http.post("f.cg.he.co.cc.o.bc.CertMobileBc.lginMobileAthdc", pm).then(function(result) {
				log.out(result);
				if (result) {
					//prcesResultDivCd 0 �대㈃�깃났, 1 �대㈃�ㅽ뙣
					if (result.header && result.header.prcesResultDivCd == '0') {
						//蹂몄씤�몄쬆 諛쏄린
						if(result.body.mobCnt > 0) {
							//$scope.iJuminB02 = result.body.idfNoAllDect;
							$scope.cusId = result.body.cusId; //20170628 怨좉컼ID, 二쇰�踰덊샇��泥�
							$scope.layer.isRqeSmsAthNo = true;
							mobileSmsSend();
						} else {
							//�ㅽ뙣�� �먮윭硫붿떆吏� 泥섎━
							layerPop.alert("�대��� �ъ슜 �깅줉 �대젰�� �놁뒿�덈떎.<br><br> �대��� 踰덊샇瑜� �ъ슜�깅줉�� �댁슜�댁＜�몄슂. ");
							return false;
						}
					}
				}
			});
		}
		
		// �몄쬆踰덊샇 諛쏄린
		function mobileSmsSend() {

			var pm = {
				cusNm: '', //�뚯뒪�몄슜 �꾩떆 異붽�
				chnDivCd: 'W',
				iJuminB01: $scope.layer.i_jumin_b01, //二쇰�踰덊샇 �욎옄由�
				//iJuminB02: $scope.iJuminB02, //二쇰�踰덊샇 �룹옄由� 蹂듯샇�� �곗씠�� ���� �몄뀡��
				cusId: $scope.cusId,	//怨좉컼ID(20160728 二쇰�踰덊샇 ��泥�)
				ccoDiv: $('#layer_i_mphone_type option:selected').val(), //�듭떊��
				cellNo: $scope.layer.i_mphoneNumber, //�대��곕쾲��
				prevAuthCd: $scope.prevAuthCd
			};
			log.out("rqeCellAthId param info ", pm);
			http.post("f.cg.he.co.cc.o.bc.CertMobileBc.rqeCellAthCusId", pm).then(function(result) {
				log.out(result);
				if (result) {
					//prcesResultDivCd 0 �대㈃�깃났, 1 �대㈃�ㅽ뙣
					if (result.header && result.header.prcesResultDivCd == '0') {
						//�몄쬆諛쒖넚 �붿껌 �깃났
						$scope.isRqeSmsAthNo = true;
						return true;
					} else {
						//�ㅽ뙣�� �먮윭硫붿떆吏� 泥섎━
						layerPop.alert(result.msg.standMsg);
						return false;
					}
				}
			});

		}
		/**
		 * @method lginCellAthNo �대��� 蹂몄씤�몄쬆
		 */
		function lginCellAthNo() {
			//�낅젰 泥댄겕
			var isValid = true;
			//�몄쬆踰덊샇 諛쒖넚 �붿껌 �щ�
			if (!$scope.layer.isRqeSmsAthNo) {
				//if(!$scope.layer.i_jumin_b01 || $scope.layer.i_jumin_b01.length < 6 || document.getElementById('layer_i_jumin_b02').value.length < 7) {
				if(!$scope.layer.i_jumin_b01 || $scope.layer.i_jumin_b01.length < 6) {
					$scope.layer.i_jumin_b01_error = true;
				}
				if(!$scope.layer.i_mphoneNumber || $scope.layer.i_mphoneNumber.length < 10 || !util.isMobile($scope.layer.i_mphoneNumber)) {
					$scope.layer.i_mphoneNumber_error = true;
				}
				$timeout(function() {
					errorMthod();
				}, 10);
				//layerPop.alert("�몄쬆踰덊샇 諛쏄린瑜� �듯빐 �몄쬆踰덊샇瑜� �붿껌�� 二쇱꽭��.");
				$scope.layer.i_certiNum_error = true;
				return false;
			}
			if (!$scope.layer.i_certiNum) {
				$scope.layer.i_certiNum_error = true;
				isValid = false;
			} else {
				$scope.layer.i_certiNum_error = false;
			}
			//�숈쓽�щ� �뺤씤
			if (!$scope.layer.i_chk_termsP01 || !$scope.layer.i_chk_termsP02 || !$scope.layer.i_chk_termsP03 || !$scope.layer.i_chk_termsP04) {
				$scope.layer.i_chk_termsP_error = true;
				isValid = false;
			} else {
				$scope.layer.i_chk_termsP_error = false;
			}
			//�낅젰 寃곌낵
			if (!isValid) {
				$timeout(function() {
					errorMthod();
				}, 10);
				return false;
			}

			/*
			var smsAthNo = $scope.layer.i_certiNum;
			var param = {
				"smsAthNo": smsAthNo,
				"process": 'new'
			};

			log.out("�몄쬆踰덊샇 PARAM ########", param);
			http.post('f.cg.he.co.cc.o.bc.CertMobileBc.verifyCellAthNo', param).then(function(result) {
				log.out(result);
				if (result) {
					//prcesResultDivCd 0 �대㈃�깃났, 1 �대㈃�ㅽ뙣
					if (result.header && result.header.prcesResultDivCd == '0') {
						//蹂몄씤�몄쬆 �깃났�щ� �뺤씤
						result.body.athRst = true;
						checkLoginResult(result.body);
					} else {
						//�ㅽ뙣�� �먮윭硫붿떆吏� 泥섎━
						layerPop.alert(result.msg.standMsg);
						return false;
					}
				}
			});
			*/
			
			var pm = {
					smsAthNo: $scope.layer.i_certiNum, //�몄쬆踰덊샇
					prevAuthCd: $scope.prevAuthCd
				};
			
			http.post('f.cg.he.cm.mo.o.bc.LginBc.lginCellAthNo', pm).then(function(result) {
				log.out(result);
				if (result) {
					//prcesResultDivCd 0 �대㈃�깃났, 1 �대㈃�ㅽ뙣
					if (result.header && result.header.prcesResultDivCd == '0') {
						//蹂몄씤�몄쬆 �깃났�щ� �뺤씤
						//result.body.athRst = true;
						checkLoginResult(result.body);
					} else {
						//�ㅽ뙣�� �먮윭硫붿떆吏� 泥섎━
						layerPop.alert(result.msg.standMsg);
						return false;
					}
				}
			});
			
		}
		/**
		 * @method checkLoginResult 
		 */
		function checkLoginResult(data) {
			//蹂몄씤�몄쬆 �깃났�щ� �뺤씤
			if (!data.athRst) {
				//蹂몄씤�몄쬆 �ㅽ뙣
				log.out("蹂몄씤�몄쬆 �ㅽ뙣 寃곌낵 肄붾뱶 athFailCd = " + data.athFailCd);
				if (data.athFailCd == '1') {
					//誘몃벑濡� 怨듭씤�몄쬆�쒖씪 寃쎌슦 - �몄쬆�� �깅줉 �붾㈃ �대룞
					//$scope.movePage('certificate');
					layerPop.alert("�깅줉�� 怨듭씤�몄쬆�쒓� �놁뒿�덈떎.<br/>怨듭씤�몄쬆�쒕� �깅줉 �� �ъ슜�� 二쇱꽭��.");
					return false;
				} else if (data.athFailCd == '2') {
					//�꾩옄湲덉쑖嫄곕옒 �숈쓽 �ㅻ쪟, �꾩옄湲덉쑖嫄곕옒 �숈쓽 �앹뾽 �붾㈃ �쒖떆
					//怨듭씤�몄쬆�� �깅줉��, �꾩옄湲덉쑖嫄곕옒 �뚯썝 �숈쓽 泥닿껐��..
					layerPop.open("layerElcFncTrsc", "biz/cm/mo/lgin/lypop_elcFncTrsc", {}).then(function(result) {
						//callback
						log.out(result);
						if (result.result) {
							//�꾩옄湲덉쑖嫄곕옒 �뚯썝 ���� �꾨즺
							layerPop.alert("�꾩옄湲덉쑖嫄곕옒 怨꾩빟 泥닿껐�� �꾨즺�섏뿀�듬땲��.").then(function() {
								//�몄뀡 濡쒓렇�� 泥섎━ 諛� �붾㈃ �대룞
								login();
							});
						}
					});
				} else if(data.athFailCd == '4') {
					//以묐났 濡쒓렇�� �ㅻ쪟 - ���쒖뒪�쒖뿉 �대� 濡쒓렇�몃릺�� �덉쓬
					//異붽� �몄쬆�� �꾩슂��
					$scope.layer.prevAuthCd = data.prevAuthCd;
					layerPop.alert("�뺤씤�섏꽭��!<br/>�대� 怨좉컼�섏쓽 �뺣낫濡� 濡쒓렇�몃릺�� �덉뒿�덈떎.<br/>怨좉컼�뺣낫 蹂댄샇瑜� �꾪빐 湲곗〈 �뺣낫瑜� 濡쒓렇�꾩썐�섍퀬 �덈줈 濡쒓렇�명븯湲� �꾪빐�쒕뒗 異붽� 蹂몄씤�몄쬆�� �꾩슂�⑸땲��.");
				}
			} else {
				//蹂몄씤�몄쬆�깃났 ��, �몄뀡 濡쒓렇�� 泥섎━ 諛� �붾㈃ �대룞
				login();
			}
		}
		/**
		 * @method login
		 */
		function login() {
			ajax.form("/certification-center/login.do", {}).then(function(result) {
				log.out(result);
				if(result.data.result) {
					$scope.layer.close(true);
				} else {
					layerPop.alert(result.data.msg);
				}
			});
		}

	}));

	/**
	 * @method �대옒�ㅻ챸Controller
	 * @param {o} co - 怨듯넻而댄룷�뚰듃
	 * @param {o}  - �ㅼ퐫��
	 */
	mz.comm.controller('layerElcFncTrscController', mz.mold(function(co, $scope) {
		var id = "layerElcFncTrsc";
		var log = co.get('logger').getLogger('layerElcFncTrscController');
		var http = co.get('http');
		var layerPop = co.get('layerPop');
		var $timeout = co.get('$timeout');
		var param = layerPop.getParam($scope);
		log.out("param info : ", param);
		//
		/* - init --------------------------------- */

		init();

		/* - public ------------------------------- */
		/**
		 * @method close
		 */
		$scope.close = function() {
			layerPop.close($scope, {
				result: false
			});
		};
		/**
		 * @method procAgree
		 */
		$scope.procAgree = function() {
			//�숈쓽�щ� �뺤씤
			if (!$scope.chkAgree) {
				$scope.chkAgreeErr = true;
				return false;
			}
			var pm = param;
			//
			http.post("f.cg.he.cm.mo.o.bc.LginBc.registSimpleElcFncTrscAgrInf", pm).then(function(result) {
				log.out(result);
				if (result) {
					//prcesResultDivCd 0 �대㈃�깃났, 1 �대㈃�ㅽ뙣
					if (result.header && result.header.prcesResultDivCd == '0') {
						//醫낅즺
						layerPop.close($scope, {
							result: true
						});
					} else {
						//�ㅽ뙣�� �먮윭硫붿떆吏� 泥섎━
						layerPop.alert(result.msg.standMsg);
						return false;
					}
				}
			});
		};
		/* - private ------------------------------ */

		/**
		 * @method init - 珥덇린��
		 */
		function init() {
			$timeout(function() {
				styleFormMethod();
			}, 400);
		}
	}));
	
	/**
	 * @method Controller �쒕룄媛쒖젙�꾩쐞�� �꾩떆 �앹뾽
	 * @param {o} co - 怨듯넻而댄룷�뚰듃
	 * @param {o} $scope - �ㅼ퐫��
	 */
	mz.comm.controller('uiInsServiceTipController', function(co, $scope) {
		var log = co.get('logger').getLogger('uiInsServiceTip');
		var layerPop	= co.get('layerPop');
		var util	= co.get('util');
		/* - init --------------------------------- */
		init();
		/* - public ------------------------------- */
		/**
		 * @method close
		 */
		$scope.close = function() { 
			layerPop.close($scope);
		};
		$scope.todayClose = function(){
			util.setCookie("noOpenPop","done", 1);
			layerPop.close($scope);
		}
		/* - private ------------------------------ */
		/**
		 * @method init - 珥덇린��
		 */
		function init() {
		}
	});
	
	/**
	 * @method Controller 蹂몄씤�몄쬆�댁젣�앹뾽
	 * @param {o} co - 怨듯넻而댄룷�뚰듃
	 * @param {o} $scope - �ㅼ퐫��
	 */
	mz.comm.controller('layerProductIntroController', function(co, $scope) {
		var log = co.get('logger').getLogger('layerProductIntroController');
		var layerPop	= co.get('layerPop');
		var $window = co.get('$window');

		/* - init --------------------------------- */
		init();
		/* - public ------------------------------- */
		/**
		 * @method close
		 */
		$scope.close = function() {
			$window.location.replace("/logout.do");
			layerPop.close($scope);
		};

		/* - private ------------------------------ */
		/**
		 * @method init - 珥덇린��
		 */
		function init() {
		}
	});
	
	/**
	 * �대��곗씤利� �덉씠�� �앹뾽.
	 */
	mz.comm.controller('layerInsMobileCertController', mz.mold(function(co, $scope) {
		var log = co.get('logger').getLogger('layerMobileCertController');
		var id = "layerMobileCert";
		var http = co.get('http');
		var location = co.get('location');
		var layerPop = co.get('layerPop');
		var util = co.get('util');

		init();

		/* - public ------------------------------ */
		$scope.close = function() {
			layerPop.close($scope, $scope.retData);
		};

		//�몄쬆踰덊샇諛쏄린
		$scope.rqeCellAthNo = function() {
			
			//紐⑤컮�쇱뿉�쒕뒗 濡쒓렇�� 遺덇�泥섎━ (20180918)
			if ('M' === mz.device[0]) {
				alert("紐⑤컮�쇱뿉�쒕뒗 �쒓났�섏� �딅뒗 �쒕퉬�ㅼ엯�덈떎.");
				return false;
			}
			
			//�몄쬆踰덊샇 諛쏄린 validation 泥댄겕..
			//requestCheck();
			
			var isValid = true;
			
			//�숈쓽�щ� �뺤씤
			if (!$scope.layer.i_chk_termsP01 || !$scope.layer.i_chk_termsP02 || !$scope.layer.i_chk_termsP03 || !$scope.layer.i_chk_termsP04) {
				$scope.layer.i_chk_termsP_error = true;
				isValid = false;
				return false;
			} else {
				$scope.layer.i_chk_termsP_error = false;
			}
			
			$scope.valid = $scope.valid || {};

			//�대��곕쾲�몄껜��
			$scope.valid.telNo = {
				error: false,
				msg: '�대��곕쾲�몃� �뺥솗�� �낅젰�섏꽭��.'
			};
			
			if (_.isEmpty($scope.data.telNo) || !util.isMobile($scope.data.telNo)) {
				$scope.valid.telNo.error = true;
				isValid = false;
			} else {
				$scope.valid.telNo.error = false;
			}
			
			//�낅젰 �깃났 �щ�
			if (!isValid) {
				setTimeout(function() {
					errorMthod();
				}, 200);
				return false;
			}
			

			var pm = {
					"ccoDiv" : $('#i_mphone_type option:selected').val(),
					"iJuminB01": $scope.param.iJuminB01,
					"cellSnoAllDect": util.replaceAll($scope.data.telNo, '-', '')
			};
			
			http.post("f.cg.he.co.cc.o.bc.CertMobileBc.lginMobileAthdc", pm).then(function(result) {
				log.out(result);
				if (result) {
					//prcesResultDivCd 0 �대㈃�깃났, 1 �대㈃�ㅽ뙣
					if (result.header && result.header.prcesResultDivCd == '0') {
						if(result.body.mobCnt > 0) {
							layerPop.alert("�댁쟾�� �깅줉�� �대��곕쾲�� �뺣낫媛� 議댁옱�⑸땲��.<br/>諛붾줈 蹂몄씤�몄쬆(濡쒓렇��)�섏떆硫� �⑸땲��.<br/><br/>�대��� 踰덊샇媛� 蹂�寃쎈맂 寃쎌슦�먮뒗 怨좉컼�뺣낫蹂�寃�<br/>硫붾돱�먯꽌 癒쇱� 蹂�寃쏀빐二쇱떆湲� 諛붾엻�덈떎.<br/>(怨듭씤�몄쬆�� �먰븘�쒕챸 �꾩슂)").then(function(confirm) {
								log.out(confirm);
								return false;
							});
						}else{
							mobileCellSend();
						}
					}
				}
			});
			//$scope.valid.telNo.error = false;
		};
		
		function mobileCellSend() {
			
			var type = $('#i_mphone_type option:selected').val();
			var cellNo = util.replaceAll($scope.data.telNo, '-', '');
			var prcType = "";
			var iJuminB01 = "";
			var iJuminB02 = "";
			
			if(undefined != $scope.param.process || "" != $scope.param.process) {
				prcType = $scope.param.process;
				iJuminB01 = $scope.param.iJuminB01;
				iJuminB02 = $scope.param.iJuminB02;
			}
			
			var param = {
				"process": prcType,
				"iJuminB01": iJuminB01,
				"iJuminB02": iJuminB02,
				"ccoDiv": type,
				"cellNo": cellNo
			};

			log.out("�몄쬆踰덊샇 PARAM ########", param);

			http.post('f.cg.he.co.cc.o.bc.CertMobileBc.rqeCellAthNo', param).then(function(result) {
				//prcesResultDivCd 0 �대㈃�깃났, 1 �대㈃�ㅽ뙣
				if (result.header && result.header.prcesResultDivCd == '0') {
					log.out("rqeCellAthNo result",result);
					if (result.body.athRsl == '0000') {
						$scope.isRqeSmsAthNo = true;
						$scope.param.cusId = result.body.cusId;
						$scope.param.iJuminB02Enc = result.body.iJuminB02;
						$scope.param.cellNo = cellNo;
					}				
				}else{
					//�⑥껜蹂댄뿕 ���곸옄�� 寃쎌슦
					if($scope.grupYn=="Y" && result.msg.standCd == "FCGCUH00001") {
						layerPop.alert("怨좉컼�섍퍡�쒕뒗 �꾩쭅 �뱀궗�� �⑥껜蹂댄뿕 �쇰낫�섏옄濡� �깆옱�섏뼱 �덉� �딆쑝��땲��.<br>�깆옱�붾㈃�쇰줈 �대룞�섍쿋�듬땲��.").then(function() {
							var param = {grupRegYn: "Y"};		//�⑥껜蹂댄뿕 �쇰낫�섏옄 �깆옱�붿껌
							location.go("/compensation/group-insurance/request.do", "/", param);
							return false;
						});	
					} else { 
						//�ㅽ뙣�� �먮윭硫붿떆吏� 泥섎━
						if(result.msg.standCd == "FCGSLF00002") result.msg.standMsg= "�낅젰�섏떊 �대��� 踰덊샇��<BR> �좏깮�섏떊 �대룞�듭떊�ъ쓽 怨좉컼�� �꾨떃�덈떎.";
						layerPop.alert(result.msg.standMsg);
						return false;
					}
				}
			});
		}
		
		//蹂몄씤�몄쬆
		$scope.verifyCellAthNo = function() {
			//蹂몄씤�몄쬆 validation check
			verifyCheck();

			if (util.isError($scope.valid)) {
				return false;
			}

			var smsAthNo = $scope.data.smsAthNo;
			var param = {
				"smsAthNo": smsAthNo,
				"process": 'new'
			};

			// 蹂몄씤�몄쬆 �뺤씤
			http.post('f.cg.he.co.cc.o.bc.CertMobileBc.verifyCellAthNo', param).then(function(result) {
				if (!util.resultMsg(result)) {
					return false;
				}else{
					
					var pm = {
							"cellSnoAllDect": $scope.param.cellNo,
							"ccoDiv": $('#i_mphone_type option:selected').val(),
							cusId : $scope.param.cusId,
							iJuminB01 : $scope.param.iJuminB01,
							iJuminB02 : $scope.param.iJuminB02Enc
						};
					
					log.out("registMobileAthdcInf:",pm)
					// �대��곕쾲�� �깅줉
					http.post('f.cg.he.co.cc.o.bc.CertMobileBc.registMobileAthdcInf',pm).then(function(result) {
						log.out(result);
						if (result) {
							//prcesResultDivCd 0 �대㈃�깃났, 1 �대㈃�ㅽ뙣
							if (result.header && result.header.prcesResultDivCd == '0') {
								//蹂몄씤�몄쬆 �깃났�щ� �뺤씤
								//checkLoginResult(result.body);
							} else {
								//�ㅽ뙣�� �먮윭硫붿떆吏� 泥섎━
								layerPop.alert(result.msg.standMsg);
								return false;
							}
						}
					});
				}

				$scope.retData = {
					success: true,
					smsAthNo: smsAthNo
				};
				layerPop.close($scope, $scope.retData);
			});
		};
		
		$scope.loadTermsPopup = function(type) {
			var ctrlNm = "";
			var tplNm = "";
			if (type == '01') {
				//媛쒖씤�뺣낫 �댁슜 諛� �쒓났�숈쓽 �쎄�
				ctrlNm = "layerCommon";
				tplNm = "biz/cm/mo/clus/lypop_indvInf";
			} else if (type == '02') {
				//怨좎쑀�앸퀎 �뺣낫 泥섎━ �숈쓽
				ctrlNm = "layerCommon";
				tplNm = "biz/cm/mo/clus/lypop_identifier";
			} else if (type == '03') {
				//�듭떊�� �댁슜�쎄� �숈쓽
				ctrlNm = "layerCommon";
				var ccoDiv = $('#i_mphone_type option:selected').val();
				log.out("�듭떊�� 援щ텇 = " + ccoDiv);
				if (ccoDiv == '1' || ccoDiv == '5') {
					//SKT �쎄�
					tplNm = "biz/cm/mo/clus/lypop_telecomSK";
				} else if (ccoDiv == '2' || ccoDiv == '6') {
					//KT �쎄�
					tplNm = "biz/cm/mo/clus/lypop_telecomKT";
				} else if (ccoDiv == '3' || ccoDiv == '7') {
					//LGT �쎄�
					tplNm = "biz/cm/mo/clus/lypop_telecomLG";
				}
			} else if (type == '04') {
				//媛쒖씤�뺣낫 �댁슜 諛� �쒓났�숈쓽 �쎄�
				ctrlNm = "layerCommon";
				tplNm = "biz/cm/mo/lgin/lypop_sec_card01";
			} else if (type == '05') {
				//怨좎쑀�앸퀎 �뺣낫 泥섎━ �숈쓽
				ctrlNm = "layerCommon";
				tplNm = "biz/cm/mo/lgin/lypop_sec_card02";
			} else if (type == '06') {
				//�대��� 蹂몄씤�뺤씤 �쒕퉬�� �댁슜�쎄� �숈쓽 �앹뾽
				ctrlNm = "layerCommon";
				tplNm = "biz/cm/mo/clus/lypop_serviceChck";		
			}

			layerPop.open(ctrlNm, tplNm);
		};

		/* - private ------------------------------ */
		function agreeCheck () {
			$scope.valid = $scope.valid || {};
			//�숈쓽�щ�泥댄겕
			$scope.valid.agree = {
				error: false,
				msg: "�숈쓽�� 泥댄겕�� 二쇱뀛�� �⑸땲��."
			};

			if (!$scope.data.agree1 || !$scope.data.agree2 || !$scope.data.agree3) {
				$scope.valid.agree.error = true;
			}
		}
		
		function requestCheck() {
			
			//�숈쓽�щ� �뺤씤
			if (!$scope.layer.i_chk_termsP01 || !$scope.layer.i_chk_termsP02 || !$scope.layer.i_chk_termsP03 || !$scope.layer.i_chk_termsP04) {
				$scope.layer.i_chk_termsP_error = true;
				isValid = false;
				return false;
			} else {
				$scope.layer.i_chk_termsP_error = false;
			}
			
			$scope.valid = $scope.valid || {};

			//�대��곕쾲�몄껜��
			$scope.valid.telNo = {
				error: false,
				msg: '�대��곕쾲�몃� �뺥솗�� �낅젰�섏꽭��.'
			};
			
			if (_.isEmpty($scope.data.telNo) || !util.isMobile($scope.data.telNo)) {
				$scope.valid.telNo.error = true;
			}

			setTimeout(function() {
				errorMthod();
			}, 200);
		}

		function verifyCheck() {
			$scope.valid = $scope.valid || {};			
			//�몄쬆踰덊샇 諛쏄린..�섏뼱 �덈뒗吏� 泥댄겕
			if (!$scope.isRqeSmsAthNo) {
				$scope.valid.telNo = {
					error: true,
					msg: "�몄쬆踰덊샇 諛쏄린瑜� �뚮윭二쇱꽭��."
				};
			}

			//�몄쬆踰덊샇 泥댄겕
			$scope.valid.smsAthNo = {
				error: false,
				msg: "�몄쬆踰덊샇瑜� �뺥솗�� �낅젰�섏꽭��."
			};

			if (_.isEmpty($scope.data.smsAthNo) || $scope.data.smsAthNo.length != 6) {
				$scope.valid.smsAthNo.error = true;
			}
			
			//agreeCheck();
			requestCheck();
			
			setTimeout(function() {
				errorMthod();
			}, 200);
		}
		

		/**
		 * @method init - 珥덇린��
		 */
		function init() {
			
			$scope.param  = {}; //�섏뼱�� �뺣낫.
			$scope.result = {}; //遺�紐⑥뿉寃� �섍만 �뺣낫.
			
			$scope.data = {
				type: '1',
				agree1: false,
				agree2: false,
				agree3: false
			}; //layer�먯꽌 愿�由щ릺�� 蹂���..
			//�듭떊�� 肄붾뱶
			$scope.ccoDivList = [{
				cd: '1',
				nm: 'SKT'
			}, {
				cd: '2',
				nm: 'KT'
			}, {
				cd: '3',
				nm: 'LG U+'
			}, {
				cd: '5',
				nm: 'SKT �뚮쑑��'
			}, {
				cd: '6',
				nm: 'KT �뚮쑑��'
			}, {
				cd: '7',
				nm: 'LG U+ �뚮쑑��'
			}];

			$scope.isRqeSmsAthNo = false;
			$scope.retData = {
				success: false
			};

			$scope.param = layerPop.getParam($scope);
			log.out("$scope.param:",$scope.param);
			
			$scope.grupYn = "N";	//�⑥껜蹂댄뿕湲� 泥�뎄 �섏씠吏��먯꽌 �몄텧 �щ�

			if ($scope.param) {
				if ($scope.param.grupYn) {
					$scope.grupYn = $scope.param.grupYn;
				}
			}
			//log.out("[mob]$scope.grupYn:", $scope.grupYn);

			
			setTimeout(function() {
				styleFormMethod();
			}, 200);
		}
	}));


})(angular, mz);
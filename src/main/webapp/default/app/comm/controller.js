
(function(angular, mz) {
	mz.comm.controller('commController', mz.mold(function(co, $scope, logger, location, layerPop) {
		var log = logger.getLogger('commController');
		$scope.WEBROOT = mz.WEBROOT;
		$scope.DOWNLOADURL = mz.DOWNLOADURL;
		
		init();
		
		/**
		 * @method init - 초기화
		 */
		function init() {
			console.log("complete open commController.js ");
		}
	}));
	

	/**
	 * @method 
	 * @param {[type]} co [description]
	 * @param {[type]} $scope) {		var log [description]
	 * @return {[type]} [description]
	 */
	mz.comm.controller('layerAlertController', mz.mold(function(co, $scope) {/*
		var log         = co.get('logger').getLogger('layerAlertController');
		var $sce        = co.get('$sce');
		var $rootScope  = co.get('$rootScope');

		var id = "layer_alert";
		 - init --------------------------------- 

		init();

		 - private ------------------------------ 
		$scope.confirm = function() {
			$rootScope[id] = {open: false};
			closeLayerPopup(id);
			$scope.promise.resolve(true);
		};


		*//**
		 * @method init - 초기화
		 *//*
		function init() {
			$scope.message = $sce.trustAsHtml($scope.message);

			var option = $scope.option;
			$scope.width = option.width || '440';
		}
	*/}));

	/**
	 * @method 
	 * @param {[type]} co [description]
	 * @param {[type]} $scope) {		var log [description]
	 * @return {[type]} [description]
	 */
	mz.comm.controller('layerConfirmController', mz.mold(function(co, $scope) {
		/*
		var log 	    = co.get('logger').getLogger('layerConfirmController');
		var $sce 	    = co.get('$sce');
		var id 			= "layer_confirm";
		var $rootScope  = co.get('$rootScope');

		 - init --------------------------------- 

		init();


		 - private ------------------------------ 
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

		*//**
		 * @method init - 초기화
		 *//*
		function init() {
			$scope.message = $sce.trustAsHtml($scope.message);

			var option = $scope.option;
			$scope.noSO = option.noSmartOffer||''; //20200617 LYB: 스마트오퍼 제거 추가
			
			$scope.width = option.width || '440';
			$scope.btn = option.btn || [{
				name: '취소',
				css: 'btn_w01',
				fnName: 'cancel'
			}, {
				name: '확인',
				css: 'btn_n02',
				fnName: 'confirm'
			}];
		}
	*/}));

	/**
	 * @method 
	 * @param {[type]} co [description]
	 * @param {[type]} $scope) {		var log [description]
	 * @return {[type]} [description]
	 */
	mz.comm.controller('layerCommonController', mz.mold(function(co, $scope) {
		/*
		var log = co.get('logger').getLogger('layerCommonController');
		var id = "layerCommon";
		var layerPop = co.get('layerPop');
		var $timeout = co.get('$timeout');
		 - init --------------------------------- 

		init();

		 - public ------------------------------ 
		$scope.close = function() {
			log.out('common layer popup close!!!');
			
			closeLayerPopup(id);
			$scope.promise.resolve(true);
			
			layerPop.close($scope, {
				result: true
			});
		};

		 - private ------------------------------ 

		*//**
		 * @method init - 초기화
		 *//*
		function init() {
			$timeout(function(){
				window.telecomSlt.init();
			}, 500);
			
			reviCtl();

			$scope.tmprevi = function(day){
				try{
					var REVIDAY = 20190527;
					co.get('http').post('f.cg.he.co.cc.o.bc.SessionRouteBc.getCurrentDateTime', {}, false).then(function(res){
						var reviDate = day * 1;//서버의 현재날짜
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
//				//console.log(ex);
			}
		}
	*/}));


	/**
	 * 휴대폰인증 레이어 팝업.
	 */
	mz.comm.controller('layerMobileCertController', mz.mold(function(co, $scope) {
		/*
		var log = co.get('logger').getLogger('layerMobileCertController');
		var id = "layerMobileCert";
		var http = co.get('http');
		var layerPop = co.get('layerPop');
		var util = co.get('util');
		var $timeout = co.get('$timeout');
		var location = co.get('location');
		var ajax = co.get('ajax');
		var athdc = co.get('athdc');
		var rsecure = co.get('rsecure');
		var $window = co.get('$window');
		init();
		
		 - public ------------------------------ 
		$scope.close = function() {
			clearInterval($scope.timerID);
			layerPop.close($scope, $scope.retData);
		};

		//인증번호받기
		$scope.rqeCellAthNo = function() {
			//모바일에서는 로그인 불가처리 (20180918)
			if ('M' === mz.device[0]) {
				alert("모바일에서는 제공하지 않는 서비스입니다.");
				return false;
			}
			
			//인증번호 받기 validation 체크..
			
			//requestCheck();
				

			
			//동의여부 확인
			if (!$scope.agrrList[0].agree || !$scope.agrrList[1].agree || !$scope.agrrList[2].agree || !$scope.agrrList[3].agree) {
				$scope.layer.i_chk_termsP_error = true;
				isValid = false;
				return false;
			} else {
				$scope.layer.i_chk_termsP_error = false;
			}
			
			$scope.valid = $scope.valid || {};

			//휴대폰번호체크
			$scope.valid.telNo = {
				error: false,
				msg: '휴대폰번호를 정확히 입력하세요.'
			};
			
			if (_.isEmpty($scope.data.telNo) || !util.isMobile($scope.data.telNo)) {
				$scope.valid.telNo.error = true;
				return false;
			}
			
			$scope.endTimeFlag= false;
			$scope.chanceLimit = false;
			
			setTimeout(function() {
				// errorMthod();
			}, 200);
		
			
			
			
			//if ($scope.valid.telNo.error ) {
				//return false;
			//}

			var type = $('#i_mphone_type option:selected').val();
			var cellNo = util.replaceAll($scope.data.telNo, '-', '');
			var param = {
				"ccoDiv": type,
				"cellNo": cellNo
			};
			
			
			
			//타이머 넣을 자리
			
			$scope.timerID;//타이머id
			var oTime = 180; //초기화 변수(180초(3분))
			$scope.pTime= oTime; //파라미터
			$scope.EtnTime=180;//인증시간 연장버튼 활성화 대기시간(2분)
			
			//타이머 시작
			$scope.start_timer = function(){
				$scope.endTimeFlag=false;
				$scope.timerError = false;
				$scope.extendChance=0;
				clearInterval($scope.timerID);
				$scope.pTime = oTime;
				$scope.timerID = setInterval(function(){
					decrementTime();
				}, 1000);
			};
			
			 function decrementTime (){
				var x1 = document.getElementById("timer");

				x1.innerHTML = toMinSec($scope.pTime);
				
				if($scope.pTime >0){
					$scope.pTime--;
					
				}else{
					
					$timeout(function() {
						$scope.showError();
					}, 50);
					
					$scope.showTimerFlag = true;
					$scope.rqeMobAthYn = false;
					
					clearInterval($scope.timerID);//인증시간 만료
					
					//layerPop.alert("인증시간이 만료되었습니다.\n\n인증번호 재발송 하신 후 진행하세요.");

				}
			}
			
			$scope.showError = function(){

				$scope.chanceLimit = false;
				$scope.endTimeFlag = true;
				$scope.timerError = true;

			};
			
			function toMinSec(t){
				var hour;
				var min;
				var sec;
				
				hour = Math.floor(t/3600); 
				min = Math.floor(t/60);
				sec = t - (hour*3600) - (min*60);

				//if(hour <10) hour = "0" + hour;
				//if(min < 10) min = "0" + min;
				if(sec < 10) sec = "0" + sec;
				if(min < 10) min = "0" + min;
				return (min +":"+sec);
			}
			
			
			
			
			log.out("인증번호 PARAM ########", param);

			http.post('f.cg.he.co.cc.o.bc.CertMobileBc.rqeCellAthNo', param).then(function(result) {
				if (!util.resultMsg(result)) {

					return false;
				}
				if (result) {
					//prcesResultDivCd 0 이면성공, 1 이면실패
					if (result.header && result.header.prcesResultDivCd == '0') {
						if (result.body.athRsl == '0000') {
							$scope.showTimerFlag=true;
							$scope.chanceLimit=false;
							$scope.isRqeSmsAthNo = true;
							$scope.start_timer();
						}
					} else {
						//실패시 에러메시지 처리
						layerPop.alert(result.msg.standMsg);
						return false;
					}
				}
				
				
				
				
				
				

			});
			
			//$scope.valid.telNo.error = false;
		};
		
		$scope.watchAll = function(){
			$timeout(function(){
				
				if($scope.all_chk == true){
					if(!$scope.agrrList[1].agree ||!$scope.agrrList[2].agree||!$scope.agrrList[3].agree||!$scope.agrrList[0].agree){
						$("#all_chk").closest('.check_style').removeClass('on');
						$("#all_chk").prop('checked', false);
						$scope.all_chk=false;
					}
				}else if($scope.all_chk == false) {
					if($scope.agrrList[1].agree && $scope.agrrList[2].agree && $scope.agrrList[3].agree && $scope.agrrList[0].agree){
						$("#all_chk").closest('.check_style').addClass('on');
						$("#all_chk").prop('checked', true);
						$scope.all_chk=true;
					}
				}
				
			},20);
			
		};
		$scope.checkAll = function() {
			var flag         	= false;
			var chkboxAllDiv = $("#all_chk").closest('.check_style');
			if(chkboxAllDiv.hasClass("on")) {
				flag = false;
				chkboxAllDiv.removeClass("on");
			} else {
				flag = true;
				chkboxAllDiv.addClass("on");
			}
			
			_.each($scope.agrrList, function(v, k) {
				$scope.agrrList[k].agree = flag;
			});
			
			$("input[id^='i_chk_termsP0']").each(function(i) {
				var checkDiv = $(this).closest('.check_style');
				if(flag) {
					checkDiv.addClass('on');
				} else {
					checkDiv.removeClass('on');
				}
			});
			
		};

		$scope.extendTimer = function(){
			$scope.extendChance++;
			if($scope.pTime>360){
			}else if($scope.extendChance>1){
				$scope.chanceLimit=true;
			}else if($scope.endTimeFlag == true){
			}else{
				$scope.pTime += $scope.EtnTime;
			}
		};

		//본인인증
		$scope.verifyCellAthNo = function() {
			//본인인증 validation check
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
				clearInterval($scope.timerID);
				layerPop.close($scope, $scope.retData);
			});
		};
		
		$scope.loadTermsPopup = function(type) {
			var ctrlNm = "";
			var tplNm = "";
			if (type == '01') {
				//개인정보 이용 및 제공동의 약관
				ctrlNm = "layerCommon";
				tplNm = "biz/cm/mo/clus/lypop_indvInf";
			} else if (type == '02') {
				//고유식별 정보 처리 동의
				ctrlNm = "layerCommon";
				tplNm = "biz/cm/mo/clus/lypop_identifier";
			} else if (type == '03') {
				//통신사 이용약관 동의
				ctrlNm = "layerCommon";
				var ccoDiv = $('#i_mphone_type option:selected').val();
				log.out("통신사 구분 = " + ccoDiv);
				if (ccoDiv == '1' || ccoDiv == '5') {
					//SKT 약관
					tplNm = "biz/cm/mo/clus/lypop_telecomSK";
				} else if (ccoDiv == '2' || ccoDiv == '6') {
					//KT 약관
					tplNm = "biz/cm/mo/clus/lypop_telecomKT";
				} else if (ccoDiv == '3' || ccoDiv == '7') {
					//LGT 약관
					tplNm = "biz/cm/mo/clus/lypop_telecomLG";
				}
			} else if (type == '04') {
				//개인정보 이용 및 제공동의 약관
				ctrlNm = "layerCommon";
				tplNm = "biz/cm/mo/lgin/lypop_sec_card01";
			} else if (type == '05') {
				//고유식별 정보 처리 동의
				ctrlNm = "layerCommon";
				tplNm = "biz/cm/mo/lgin/lypop_sec_card02";
			} else if (type == '06') {
				//휴대폰 본인확인 서비스 이용약관 동의 팝업
				ctrlNm = "layerCommon";
				tplNm = "biz/cm/mo/clus/lypop_serviceChck";		
			}

			layerPop.open(ctrlNm, tplNm);
		};

		 - private ------------------------------ 
		function agreeCheck () {
			$scope.valid = $scope.valid || {};
			//동의여부체크
			$scope.valid.agree = {
				error: false,
				msg: "동의에 체크해 주셔야 합니다."
			};

			if (!$scope.data.agree1 || !$scope.data.agree2 || !$scope.data.agree3) {
				$scope.valid.agree.error = true;
			}
		}
		
		function requestCheck() {
			
			//동의여부 확인
			if (!$scope.agrrList[0].agree || !$scope.agrrList[1].agree || !$scope.agrrList[2].agree || !$scope.agrrList[3].agree) {
				$scope.layer.i_chk_termsP_error = true;
				isValid = false;
				return false;
			} else {
				$scope.layer.i_chk_termsP_error = false;
				return true;
			}
			
			$scope.valid = $scope.valid || {};

			//휴대폰번호체크
			$scope.valid.telNo = {
				error: false,
				msg: '휴대폰번호를 정확히 입력하세요.'
			};
			
			if (_.isEmpty($scope.data.telNo) || !util.isMobile($scope.data.telNo)) {
				$scope.valid.telNo.error = true;
				return false;
			}
			
			$scope.endTimeFlag= false;
			$scope.chanceLimit = false;
			
			setTimeout(function() {
				// errorMthod();
			}, 200);
		}

		function verifyCheck() {
			$scope.valid = $scope.valid || {};			
			//인증번호 받기..되어 있는지 체크
			if (!$scope.isRqeSmsAthNo) {
				$scope.valid.telNo = {
					error: true,
					msg: "인증번호 받기를 눌러주세요."
				};
			}

			//인증번호 체크
			$scope.valid.smsAthNo = {
				error: false,
				msg: "인증번호를 정확히 입력하세요."
			};

			if (_.isEmpty($scope.data.smsAthNo) || $scope.data.smsAthNo.length != 6) {
				$scope.valid.smsAthNo.error = true;
			}
			
			//agreeCheck();
			requestCheck();
			
			//200226 : BHY : 접근성 심사 대비 포커스 세팅
			$timeout(function () {
				multiFocusMove();
			}, 50);
		}
		

		*//**
		 * @method init - 초기화
		 *//*
		function init() {
			
			$scope.all_chk = false;
			var accTime = 0;
			$scope.extendChance=0;
			$scope.chanceLimit=false;
			$scope.showTimerFlag=false;
			$scope.endTimeFlag=false;
			$scope.agrrList = [{agree:false},{agree:false},{agree:false},{agree:false},{agree:false}];
			//console.log("#########layerMobileCertController#########");
			$scope.data = {
				type: '1',
				agree1: false,
				agree2: false,
				agree3: false
			}; //layer에서 관리되는 변수..
			//통신사 코드
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
				nm: 'SKT 알뜰폰'
			}, {
				cd: '6',
				nm: 'KT 알뜰폰'
			}, {
				cd: '7',
				nm: 'LG U+ 알뜰폰'
			}];

			$scope.isRqeSmsAthNo = false;
			$scope.retData = {
				success: false
			};

			setTimeout(function() {
				styleFormMethod();
			}, 200);
		}
	*/}));
	
	
	/**
	 * @method 
	 * @param {[type]} co [description]
	 * @param {[type]} $scope) {		var log [description]
	 * @return {[type]} [description]
	 * TODO
	 */
	mz.comm.controller('layerSelfLginController', mz.mold(function(co, $scope) {
		/*
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
		var naver = co.get('naver');
		var promise = co.get('promise');
		$scope.layer = {};
		
		$scope.eventFlag=true;
		
		var endDt = "20200401000000";
		var dt = new Date();
		var today = util.formatDate(dt,'yyyymmddhh24miss');
		// 시간비교
		if (eval(today) > eval(endDt))  {
			$scope.eventFlag=false;
		}
		
		 - init --------------------------------- 
		init();

		 - public ------------------------------ 
		function dimmed(){
			jQuery("body").append('<div id="dc_overlay" style="z-index:100000;position:fixed; width:100%; height:100%; top:0px; left:0px; background-color:black; opacity:0.1">');
		};
		function removeDim(){
			jQuery("#dc_overlay").remove();
		};
		
		$scope.layer.close = function(result) {
			removeDim();
			
			if($scope.timerID){
				clearInterval($scope.timerID);	
			}			
			layerPop.close($scope, {
				result: result
			});
		};
		*//**
		 * [ccoDivList description] 통신사 구분
		 * @type {Array}
		 *//*
		//통신사 코드
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
			nm: 'SKT 알뜰폰'
		}, {
			cd: '6',
			nm: 'KT 알뜰폰'
		}, {
			cd: '7',
			nm: 'LG U+ 알뜰폰'
		}];
		//기본 통신사 코드
		$scope.layer.ccoDiv = $scope.layer.ccoDivList[0].cd;
		//인증번호 요청 여부
		$scope.layer.isRqeSmsAthNo = false;
		*//**
		 * @method movePage
		 * @param {[type]} type [description]
		 *//*
		$scope.layer.movePage = function(type) {
			
			//모바일에서는 로그인 불가처리 (20180918)
			if ('M' === mz.device[0]) {
				alert("모바일에서는 제공하지 않는 서비스입니다.");
				return false;
			}
			
			if (type == 'certificate') {
				//공인인증 등록 화면 이동
				var param = {grupYn: $scope.grupYn};		//단체보험 보험금화면에서 호출 여부
				location.go("/certification-center/user-certificate.do", "/", param);
			}

		};
		$scope.layer.showTab = function(tabId) {
			log.out("tabId = " + tabId);
			$scope.layer.table = tabId;
			$timeout(function() {
				log.out("화면 스타일 적용!!");
				styleFormMethod();
			}, 100);
			//
			if ($window.tk && $window.tk.now) {
				log.out($window.tk);
				$window.tk.close();
			}
		};
		*//**
		 * @method checkValid
		 * @param {[type]} type [description]
		 * @param {[type]} id [description]
		 * @param {[type]} error [description]
		 *//*
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
				// errorMthod();
			}, 10);
			return error;
		};
		*//**
		 * @method procLgin
		 * @param {[type]} type [description]
		 *//*
		$scope.layer.procLgin = function(type) {

			//모바일에서는 로그인 불가처리 (20180918)
			if ('M' === mz.device[0]) {
				alert("모바일에서는 제공하지 않는 서비스입니다.");
				return false;
			}
			
			if (type == '01') {
				//공인인증서 본인인증
				//2차 추가인증의 경우, 1차와 동일한 인증방식은 사용할수 없음
				if($scope.layer.prevAuthCd && $scope.layer.prevAuthCd == '1') {
					layerPop.alert("휴대폰 또는 신용카드로 추가 인증을 해 주세요.");
					return false;
				}
				//athdc.login(ksbizSignCallback);
				athdc.login(function(result) {
					log.out(result);
					if (result.status == 1) {
						//인증서 확인 - 공인인증서 로그인 처리
						lginOfapvAthdc(result.data);
						//
					} else if (result.status == 0) {
						log.out("인증서 선택 취소!!!!1");
						layerPop.alert("인증서 선택을 취소 하였습니다. ");
					} else {
						log.out("전자서명 오류:" + result.message + "[" + result.status + "]")
						layerPop.alert("전자서명 오류:" + result.message + "[" + result.status + "]");
					}
				});
			} else if (type == '02') {
				//2차 추가인증의 경우, 1차와 동일한 인증방식은 사용할수 없음
				if($scope.layer.prevAuthCd && $scope.layer.prevAuthCd != '1') {
					layerPop.alert("공인인증서로 추가 인증을 해 주세요.");
					return false;
				}
				//휴대폰 인증 본인인증
				lginCellAthNo();
			} else if (type == '04') {
				//휴대폰 번호 사용등록
				mobileSignGo();
			} else if(type=='05'){
				naverSgnGo();
			} else if(type=='06'){
				var lypopClose = layerPop.close($scope,"");
				promise.all(lypopClose).then(function(){		
					layerPop.open('lginMobile', "biz/cm/mo/lgin/lgin_mobile",{});
				});
			}else {
				//
				log.out("인증 타입 오류 type = " + type);
			}


			//200226 : BHY : 접근성 심사 대비 포커스 세팅
			$timeout(function () {
				multiFocusMove();
			}, 50);


		};
		*//**
		 * @method rqeCellAthNo 휴대폰 인증번호 요청
		 *//*
		$scope.layer.rqeCellAthNo = function() {
			

			//모바일에서는 로그인 불가처리 (20180918)
			if ('M' === mz.device[0]) {
				alert("모바일에서는 제공하지 않는 서비스입니다.");
				return false;
			}
			
			if($scope.layer.prevAuthCd && $scope.layer.prevAuthCd != '1') {
				layerPop.alert("공인인증서로 추가 인증을 해 주세요.");
				return false;
			}
			//휴대폰 인증번호 요청
			rqeCellAthNo();
		};
		
		*//**
		 * @method lginAgrChk
		 * @param {[type]} type [description]
		 *//*
		$scope.lginAgrChk = function(type) {
			
			if (type == '02') {
				//동의여부 확인
				if (!$scope.layer.i_chk_termsP01 || !$scope.layer.i_chk_termsP02 || !$scope.layer.i_chk_termsP03 || !$scope.layer.i_chk_termsP04) {
					$scope.layer.i_chk_termsP_error = true;
					isValid = false;
					return false;
				} else {
					$scope.layer.i_chk_termsP_error = false;
				}
			}
			
			if (type == '03') {
				//동의여부 확인
				if (!$scope.layer.i_chk_termsC01 || !$scope.layer.i_chk_termsC02) {
					$scope.i_chk_termsC_error = true;
					isValid = false;
				} else {
					$scope.i_chk_termsC_error = false;
				}
			}
			
		}
		
		*//**
		 * @method mobileSignGo
		 * 휴대폰 번호 사용등록
		 *//*
		function mobileSignGo() {
			var param = {grupYn: $scope.grupYn};		//단체보험 보험금화면에서 호출 여부
			location.go("/certification-center/user-mobile-certificate.do", "/", param);
		}
		
		
		*//**
		 * @method nvrSgnGo
		 * 네이버 인증서 로그인 
		 *//*
		function naverSgnGo(){
			dimmed();
			//네이버 아이디 로그인
			naver.login({path:'hp03'}, function(nilrsl) {
				
				//THPNVRCRIF 조회 
				
				http.post("f.cg.he.co.cc.o.cco.NaverSignCCo.retrieveNvrSgnPrfl", {}).then(function(result) {//등록된 인증서가 있는지 조회한다.
					if (result) {
						//prcesResultDivCd 0 이면성공, 1 이면실패
						if (result.header && result.header.prcesResultDivCd == '0') {
							log.out(result.body);							
							var nvrSgnList = result.body.nvrSgnList;
							
							if(nvrSgnList == null || nvrSgnList == undefined ||nvrSgnList.length==0){
								//등록된 인증서가 없으니까 등록해라
								removeDim();
								layerPop.confirm("등록된 인증서가 없습니다. 새로 등록하시겠습니까?","",{noSmartOffer:"Y"}).then(function(confirm){
									if(confirm){
										removeDim();
											location.go("/certification-center/user-certificate.do","/02");
									}else{ 
										removeDim();
										return false;
									}											
								});										
							}else{
								//이미 등록된 인증서가 있으니 인증 진행								
								naver.auth({}, function(narsl) {
									if(narsl && narsl.rsl && narsl.rsl == '1') {
										loginNaverSgn();	
									}
								});
							}
						} else {
							//실패시 에러메시지 처리
							removeDim();
							layerPop.alert(result.msg.standMsg);
							return false;
						}
					}
				});

			});
			
			function loginNaverSgn(){
				http.post("f.cg.he.cm.mo.o.bc.LginBc.retrieveNaverCertificate", {}).then(function(result) {
				log.out(result); 
				if (result) {
					//prcesResultDivCd 0 이면성공, 1 이면실패
					if (result.header && result.header.prcesResultDivCd == '0') {
						log.out(result.body);
						removeDim();
							login();
							//location.go("/customer-center/policy-inquiry/inquiry.do#!");
					} else {
						//실패시 에러메시지 처리
						removeDim();
						layerPop.alert(result.msg.standMsg);
						return false;
					}
				}
			});
			}
			
			function login() {
				ajax.form("/certification-center/login.do", {}).then(function(result) {
					log.out(result);
					if(result.data.result) {
						removeDim();
						$scope.layer.close(true);
						} else {
							removeDim();
						layerPop.alert(result.data.msg);
					}
				});
			}
			
		}
		
		
		
		
		
		
		
		
		
		*//**
		 * @method loadTermsPopup 약관 팝업 호출
		 * @param {[type]} type [description]
		 *//*
		$scope.layer.loadTermsPopup = function(type) {
			var ctrlNm = "";
			var tplNm = "";
			if (type == '01') {
				//개인정보 이용 및 제공동의 약관
				ctrlNm = "layerCommon";
				tplNm = "biz/cm/mo/clus/lypop_indvInf";
			} else if (type == '02') {
				//고유식별 정보 처리 동의
				ctrlNm = "layerCommon";
				tplNm = "biz/cm/mo/clus/lypop_identifier"
			} else if (type == '03') {
				//통신사 이용약관 동의
				ctrlNm = "layerCommon";
				$scope.ccoDiv = $('#layer_i_mphone_type option:selected').val();
				log.out("통신사 구분 = " + $scope.ccoDiv);
				if ($scope.ccoDiv == '1' || $scope.ccoDiv == '5') {
					//SKT 약관
					tplNm = "biz/cm/mo/clus/lypop_telecomSK";
				} else if ($scope.ccoDiv == '2' || $scope.ccoDiv == '6') {
					//KT 약관
					tplNm = "biz/cm/mo/clus/lypop_telecomKT";
				} else if ($scope.ccoDiv == '3' || $scope.ccoDiv == '7') {
					//LGT 약관
					tplNm = "biz/cm/mo/clus/lypop_telecomLG";
				} else {
					layerPop.alert("통신사 구분값을 확인해 주세요.");
					return false;
				}
			} else if (type == '04') {
				//개인정보 이용 및 제공동의 약관
				ctrlNm = "layerCommon";
				tplNm = "biz/cm/mo/lgin/lypop_sec_card01";
			} else if (type == '05') {
				//고유식별 정보 처리 동의
				ctrlNm = "layerCommon";
				tplNm = "biz/cm/mo/lgin/lypop_sec_card02";
			} else if (type == '06') {
				//휴대폰 본인확인 서비스 이용약관 동의 팝업
				ctrlNm = "layerCommon";
				tplNm = "biz/cm/mo/clus/lypop_serviceChck";		
			} else {
				layerPop.alert("약관 구분을 확인해 주세요.");
				return false;
			}
			//약관 팝업 표시
			layerPop.open(ctrlNm, tplNm).then(function(result) {
				//callback
				log.out(result);
			});
		};

		 - private ------------------------------ 
		*//**
		 * @method init - 초기화
		 *//*
		function init() {
			//console.log("#########layerSelfLgintController#########");
			$scope.chanceLimit=false;
			$scope.showTimerFlag=false;
			$scope.endTimeFlag=false;
			
			$scope.grupYn = "N";	//단체보험금 청구 페이지에서 호출 여부

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
			//키보드보안/ 가상키패드 초기화
			//rsecure.initRsecureKey(300);
		}
		*//**
		 * @method lginOfapvAthdc 공인인증서 본인인증
		 * @param {[type]} data [description]
		 *//*
		function lginOfapvAthdc(data) {
			var pm = {
				ksbizSig: data,							//인증서데이터
				prevAuthCd: $scope.layer.prevAuthCd,		//직전 인증유형
				verifyCrlYn: "Y"		//CRL호출함수 변경(20190513)
			};
			http.post("f.cg.he.cm.mo.o.bc.LginBc.lginOfapvAthdc", pm).then(function(result) {
				log.out(result);
				if (result) {
					//prcesResultDivCd 0 이면성공, 1 이면실패
					if (result.header && result.header.prcesResultDivCd == '0') {
						//본인인증 성공여부 확인
						checkLoginResult(result.body);
					} else {
						//실패시 에러메시지 처리
						layerPop.alert(result.msg.standMsg);
						return false;
					}
				}
			});
		} 
		*//**
		 * @method lginCrdtCrd 신용카드 본인인증
		 *//*
		*//**
		 * @method rqeCellAthNo 휴대폰 인증번호 발급 요엋
		 * @return {[type]} [description]
		 *//*
		function rqeCellAthNo() {
			
			//동의여부 확인
			if (!$scope.layer.i_chk_termsP01 || !$scope.layer.i_chk_termsP02 || !$scope.layer.i_chk_termsP03 || !$scope.layer.i_chk_termsP04) {
				$scope.layer.i_chk_termsP_error = true;
				isValid = false;
				return false;
			} else {
				$scope.layer.i_chk_termsP_error = false;
			}
			
			var isValid = true;
			//입력여부 체크
			//if (!$scope.layer.i_jumin_b01 || $scope.layer.i_jumin_b01.length < 6 || document.getElementById('layer_i_jumin_b02').value.length < 7) {
			if (!$scope.layer.i_jumin_b01 || $scope.layer.i_jumin_b01.length < 6) {
				$scope.layer.i_jumin_b01_error = true;
				isValid = false;
			} else {
				$scope.layer.i_jumin_b01_error = false;
			}
			//통신사
			$scope.ccoDiv = $('#layer_i_mphone_type option:selected').val();
			log.out("통신사 = " + $scope.ccoDiv);
			//휴대폰번호 
			if (!$scope.layer.i_mphoneNumber || $scope.layer.i_mphoneNumber.length < 10 || !util.isMobile($scope.layer.i_mphoneNumber)) {
				$scope.layer.i_mphoneNumber_error = true;
				isValid = false;
			} else {
				$scope.layer.i_mphoneNumber_error = false;
			}
			//입력 성공 여부
			if (!isValid) {
				$timeout(function() {
					// errorMthod();
				}, 10);
				return false;
			}
			
			//타이머 넣을 자리
			
			$scope.timerID;//타이머id
			var oTime = 180; //초기화 변수(180초(3분))
			$scope.pTime= oTime; //파라미터
			$scope.etnTime=180;//인증시간 연장버튼 활성화 대기시간(2분)
			
			//타이머 시작
			$scope.start_timer = function(){
				$scope.endTimeFlag=false;
				$scope.timerError = false;
				$scope.extendChance=0;
				clearInterval($scope.timerID);
				$scope.pTime = oTime;
				$scope.timerID = setInterval(function(){					
					decrementTime();
				}, 1000);
			}
			
			 function decrementTime (){
				var x1 = document.getElementById("timer");

				x1.innerHTML = toMinSec($scope.pTime);
				
				if($scope.pTime >0){
					$scope.pTime--;
					
				}else{
					
					$timeout(function() {
						$scope.showError();
					}, 10);


					$scope.rqeMobAthYn = false;
					clearInterval($scope.timerID);//인증시간 만료
					
					//layerPop.alert("인증시간이 만료되었습니다.\n\n인증번호 재발송 하신 후 진행하세요.");

				}
			}
			
			$scope.showError = function(){
				$scope.chanceLimit = false;
				$scope.endTimeFlag=true;
				$scope.timerError = true;

			};
			
			function toMinSec(t){
				var hour;
				var min;
				var sec;
				
				hour = Math.floor(t/3600); 
				min = Math.floor(t/60);
				sec = t - (hour*3600) - (min*60);

				//if(hour <10) hour = "0" + hour;
				//if(min < 10) min = "0" + min;
				if(sec < 10) sec = "0" + sec;
				if(min < 10) min = "0" + min;
				return (min +":"+sec);
			}
			
			
			var pm = {
					iJuminB01: $scope.layer.i_jumin_b01, //주민번호 앞자리
					//ccoDiv: $('#layer_i_mphone_type option:selected').val(), //통신사
					cellSnoAllDect: $scope.layer.i_mphoneNumber //휴대폰번호
			};
			
			// 휴대폰번호 등록여부 조회
			log.out("rqeCellAthNo param info ", pm);
			http.post("f.cg.he.co.cc.o.bc.CertMobileBc.lginMobileAthdc", pm).then(function(result) {
				log.out(result);
				if (result) {
					//prcesResultDivCd 0 이면성공, 1 이면실패
					if (result.header && result.header.prcesResultDivCd == '0') {
						//본인인증 받기
						if(result.body.mobCnt > 0) {
							//$scope.iJuminB02 = result.body.idfNoAllDect;
							$scope.cusId = result.body.cusId; //20170628 고객ID, 주민번호대체
							$scope.layer.isRqeSmsAthNo = true;
							mobileSmsSend();
						} else {
							//실패시 에러메시지 처리
							layerPop.alert("휴대폰 사용 등록 이력이 없습니다.<br><br> 휴대폰 번호를 사용등록후 이용해주세요. ");
							return false;
						}
					}
				}
			});
		}
		
		
		
		var accTime = 0;
		$scope.extendChance=0;
		$scope.extendTimer = function(){
			
			$scope.extendChance++;
			if($scope.pTime>360){
				
			}else if($scope.extendChance>1 && $scope.endTimeFlag == false){
				$scope.endTimeFlag=false;
				$scope.chanceLimit=true;
			}else if($scope.endTimeFlag == true){
				
			}else{
				$scope.pTime += $scope.etnTime;
			}
		};
		
		// 인증번호 받기
		function mobileSmsSend() {
			$scope.showTimerFlag=true;
			$scope.chanceLimit=false;
			var pm = {
				cusNm: '', //테스트용 임시 추가
				chnDivCd: 'W',
				iJuminB01: $scope.layer.i_jumin_b01, //주민번호 앞자리
				//iJuminB02: $scope.iJuminB02, //주민번호 뒷자리 복호화 데이터 저장 세션키
				cusId: $scope.cusId,	//고객ID(20160728 주민번호 대체)
				ccoDiv: $('#layer_i_mphone_type option:selected').val(), //통신사
				cellNo: $scope.layer.i_mphoneNumber, //휴대폰번호
				prevAuthCd: $scope.prevAuthCd
			};
			log.out("rqeCellAthId param info ", pm);
			http.post("f.cg.he.co.cc.o.bc.CertMobileBc.rqeCellAthCusId", pm).then(function(result) {
				log.out(result);
				if (result) {
					//prcesResultDivCd 0 이면성공, 1 이면실패
					if (result.header && result.header.prcesResultDivCd == '0') {
						
						//타이머 시작
						$scope.start_timer();

						//인증발송 요청 성공
						$scope.isRqeSmsAthNo = true;
						return true;
					} else {
						//실패시 에러메시지 처리
						layerPop.alert(result.msg.standMsg);
						return false;
					}
				}
			});

		}
		*//**
		 * @method lginCellAthNo 휴대폰 본인인증
		 *//*
		function lginCellAthNo() {
			//입력 체크
			var isValid = true;
			
			//동의여부 확인
			if (!$scope.layer.i_chk_termsP01 || !$scope.layer.i_chk_termsP02 || !$scope.layer.i_chk_termsP03 || !$scope.layer.i_chk_termsP04) {
				$scope.layer.i_chk_termsP_error = true;
				isValid = false;
				return false;
			} else {
				$scope.layer.i_chk_termsP_error = false;
			}
			
			//인증번호 발송 요청 여부
			if (!$scope.layer.isRqeSmsAthNo) {
				//if(!$scope.layer.i_jumin_b01 || $scope.layer.i_jumin_b01.length < 6 || document.getElementById('layer_i_jumin_b02').value.length < 7) {
				if(!$scope.layer.i_jumin_b01 || $scope.layer.i_jumin_b01.length < 6) {
					$scope.layer.i_jumin_b01_error = true;
				}
				if(!$scope.layer.i_mphoneNumber || $scope.layer.i_mphoneNumber.length < 10 || !util.isMobile($scope.layer.i_mphoneNumber)) {
					$scope.layer.i_mphoneNumber_error = true;
				}
				$timeout(function() {
					// errorMthod();
				}, 10);
				//layerPop.alert("인증번호 받기를 통해 인증번호를 요청해 주세요.");
				$scope.layer.i_certiNum_error = true;
				return false;
			}
			if (!$scope.layer.i_certiNum) {
				$scope.layer.i_certiNum_error = true;
				isValid = false;
			} else {
				$scope.layer.i_certiNum_error = false;
			}

			//입력 결과
			if (!isValid) {
				$timeout(function() {
					// errorMthod();
				}, 10);
				return false;
			}
			
			$scope.endTimeFlag= false;
			$scope.chanceLimit = false;
			
			var smsAthNo = $scope.layer.i_certiNum;
			var param = {
				"smsAthNo": smsAthNo,
				"process": 'new'
			};

			log.out("인증번호 PARAM ########", param);
			http.post('f.cg.he.co.cc.o.bc.CertMobileBc.verifyCellAthNo', param).then(function(result) {
				log.out(result);
				if (result) {
					//prcesResultDivCd 0 이면성공, 1 이면실패
					if (result.header && result.header.prcesResultDivCd == '0') {
						//본인인증 성공여부 확인
						result.body.athRst = true;
						checkLoginResult(result.body);
					} else {
						//실패시 에러메시지 처리
						layerPop.alert(result.msg.standMsg);
						return false;
					}
				}
			});
			
			
			var pm = {
					smsAthNo: $scope.layer.i_certiNum, //인증번호
					prevAuthCd: $scope.prevAuthCd
				};
			
			http.post('f.cg.he.cm.mo.o.bc.LginBc.lginCellAthNo', pm).then(function(result) {
				log.out(result);
				if (result) {
					//prcesResultDivCd 0 이면성공, 1 이면실패
					if (result.header && result.header.prcesResultDivCd == '0') {
						//본인인증 성공여부 확인
						//result.body.athRst = true;
						checkLoginResult(result.body);
						clearInterval($scope.timerID);//인증시간 만료
					} else {
						//실패시 에러메시지 처리
						layerPop.alert(result.msg.standMsg);
						return false;
					}
				}
			});
			
		}
		*//**
		 * @method checkLoginResult 
		 *//*
		function checkLoginResult(data) {
			//본인인증 성공여부 확인
			if (!data.athRst) {
				//본인인증 실패
				log.out("본인인증 실패 결과 코드 athFailCd = " + data.athFailCd);
				if (data.athFailCd == '1') {
					//미등록 공인인증서일 경우 - 인증서 등록 화면 이동
					//$scope.movePage('certificate');
					layerPop.alert("등록된 공인인증서가 없습니다.<br/>공인인증서를 등록 후 사용해 주세요.");
					return false;
				} else if (data.athFailCd == '2') {
					//전자금융거래 동의 오류, 전자금융거래 동의 팝업 화면 표시
					//공인인증서 등록시, 전자금융거래 회원 동의 체결함..
					layerPop.open("layerElcFncTrsc", "biz/cm/mo/lgin/lypop_elcFncTrsc", {}).then(function(result) {
						//callback
						log.out(result);
						if (result.result) {
							//전자금융거래 회원 저장 완료
							layerPop.alert("전자금융거래 계약 체결이 완료되었습니다.").then(function() {
								//세션 로그인 처리 및 화면 이동
								login();
							});
						}
					});
				} else if(data.athFailCd == '4') {
					//중복 로그인 오류 - 타시스템에 이미 로그인되어 있음
					//추가 인증이 필요함
					$scope.layer.prevAuthCd = data.prevAuthCd;
					layerPop.alert("확인하세요!<br/>이미 고객님의 정보로 로그인되어 있습니다.<br/>고객정보 보호를 위해 기존 정보를 로그아웃하고 새로 로그인하기 위해서는 추가 본인인증이 필요합니다.");
				}
			} else {
				//본인인증성공 후, 세션 로그인 처리 및 화면 이동
				login();
			}
		}
		*//**
		 * @method login
		 *//*
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

	*/}));
	
	
	
	/**
	 * @method Controller
	 * @param {o} co - 공통컴포넌트
	 * @param {o}  - 스코프
	 * // TODO 등록	
	 * 
	 */
	mz.comm.controller('lginMobileController', mz.mold(function(co, $scope) {
		/*
		var log = co.get('logger').getLogger('lginMobile');
		var bc = co.get('bc');
		var location = co.get('location');
		var layerPop = co.get('layerPop');
		var util = co.get('util');
		var ajax = co.get('ajax');
		var path = co.get('path');
		var athdc = co.get('athdc');
		var $timeout = co.get('$timeout');
		var $sce = co.get('$sce');
		var rsecure = co.get('rsecure');
		var $window = co.get('$window');
		var loading = co.get('loading');
		var http = co.get('http');
		var promise = co.get('promise');
		log.out('lgin start!!');
		
		
		init();
		*//**
		 * [ccoDivList description] 통신사 구분
		 * @type {Array}
		 *//*
		//통신사 코드
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
			nm: 'SKT 알뜰폰'
		}, {
			cd: '6',
			nm: 'KT 알뜰폰'
		}, {
			cd: '7',
			nm: 'LG U+ 알뜰폰'
		}];
		//기본 통신사 코드
		$scope.ccoDiv = $scope.ccoDivList[0].cd;
		//인증번호 요청 여부
		$scope.isRqeSmsAthNo = false;
		
		
	
		
		function init(){
			$scope.all_chk = false;
			$scope.eventFlag=true;
			$scope.agrrList = [{agree:false},{agree:false},{agree:false},{agree:false},{agree:false}];
			$scope.agrrValidList = [{error:false},{error:false},{error:false},{error:false},{error:false}];
			
			var endDt = "20200401000000";
			var dt = new Date();
			var today = util.formatDate(dt,'yyyymmddhh24miss');
			// 시간비교
			if (eval(today) > eval(endDt))  {
				$scope.eventFlag=false;
			}
			
			
			//
			$scope.chanceLimit=false;
			$scope.showTimerFlag=false;
			$scope.endTimeFlag=false;
			$timeout(function() {
				log.out("화면 스타일 적용!!");
				styleFormMethod();
			}, 200);
			//
			//키보드보안 및 가상키패드 초기화
			//rsecure.initRsecureKey(100);
		}
		
		$scope.close = function () {
			layerPop.close($scope, "");
		};
		

		
		*//**
		 * @method lginCellAthNo 휴대폰 본인인증
		 *//*
		function lginCellAthNo() {
			//입력 체크
			var isValid = true;
			if($scope.endTimeFlag==true){
				//[휴대폰으로 본인인증] 버튼 클릭 했을 때 , 이미 인증 시간초과 된 경우  포커스 이동
				$('#hp_number').focus();
			}else {
				//[휴대폰으로 본인인증] 버튼 클릭 했을 때 , 인증 시간이 남아 있는 경우 multiFocusMove() 
				$timeout(function() {
					// window.etribe.ui.comm.focusSet_ontoError.init();				
					//200226 : BHY : 접근성 심사 대비 포커스 세팅
					multiFocusMove();
				}, 50);
			}

			//동의여부 확인
			if (!$scope.agrrList[0].agree || !$scope.agrrList[1].agree || !$scope.agrrList[2].agree || !$scope.agrrList[3].agree) {
				$scope.chkTermsPError = true;
				isValid = false;
				return false;
			} else {
				$scope.chkTermsPError = false;
			}

			//인증번호 발송 요청 여부
			if (!$scope.isRqeSmsAthNo) {
				//if(!$scope.iJuminB01 || $scope.iJuminB01.length < 6 || document.getElementById('iJuminB02').value.length < 7) {
				if(!$scope.iJuminB01 || $scope.iJuminB01.length < 6) {
					$scope.iJuminB01Error = true;
					
				}
				if(!$scope.cellNo || $scope.cellNo.length < 10 || !util.isMobile($scope.cellNo)) {
					$scope.cellNoError = true;

				}
				$timeout(function() {
					// errorMthod();
				}, 10);
				//layerPop.alert("인증번호 받기를 통해 인증번호를 요청해 주세요.");
				$scope.smsAthNoError = true;
				return false;
			}
			if (!$scope.smsAthNo) {

				$scope.smsAthNoError = true;
				isValid = false;
			} else {
				$scope.smsAthNoError = false;
			}
			
			if($scope.timerError==true){
				isValid=false;
			}
			
			
			//입력 결과
			if (!isValid) {
				$timeout(function() {
					// errorMthod();
				}, 10);
				return false;
			}
			
			$scope.endTimeFlag= false;
			$scope.chanceLimit = false;
			
			var pm = {
					smsAthNo: $scope.smsAthNo, //인증번호
					prevAuthCd: $scope.prevAuthCd
				};
				log.out("rqeCellAthNo param info ", pm);
				http.post("f.cg.he.cm.mo.o.bc.LginBc.lginCellAthNo", pm).then(function(result) {
				//bc.lginCellAthNo(pm).then(function(result) {
					log.out(result);
					if (result) {
						//prcesResultDivCd 0 이면성공, 1 이면실패
						if (result.header && result.header.prcesResultDivCd == '0') {
							//본인인증 성공여부 확인
							checkLoginResult(result.body);
							clearInterval($scope.timerID);//인증시간 만료
						} else {
							//실패시 에러메시지 처리
							layerPop.alert(result.msg.standMsg);
							return false;
						}
					}
				});
		}
		
		
		*//**
		 * @method rqeCellAthNo 휴대폰 인증번호 발급 요엋
		 *//*
		function rqeCellAthNo() {
			//동의여부 확인
			if (!$scope.agrrList[0].agree || !$scope.agrrList[1].agree || !$scope.agrrList[2].agree || !$scope.agrrList[3].agree) {
				$scope.chkTermsPError = true;
				isValid = false;
				return false;
			} else {
				$scope.chkTermsPError = false;
			}

			var isValid = true;
			//입력여부 체크
			//주민번호
			log.out("$scope.iJuminB01 = " + $scope.iJuminB01);
			//log.out(document.getElementById('iJuminB02').value);
			//if (!$scope.iJuminB01 || $scope.iJuminB01.length < 6 || document.getElementById('iJuminB02').value.length < 7) {
			if (!$scope.iJuminB01 || $scope.iJuminB01.length < 6) {
				$scope.iJuminB01Error = true;
				isValid = false;
			} else {
				$scope.iJuminB01Error = false;
			}
			//통신사
			$scope.ccoDiv = $('#i_mphone_type2 option:selected').val();
			log.out("통신사 = " + $scope.ccoDiv);
			//휴대폰번호 
			log.out("$scope.cellNo = " + $scope.cellNo);
			if (!$scope.cellNo || $scope.cellNo.length < 10 || !util.isMobile($scope.cellNo)) {
				$scope.cellNoError = true;
				isValid = false;
			} else {
				$scope.cellNoError = false;
			}
			//입력 성공 여부
			if (!isValid) {
				$timeout(function() {
					// errorMthod();
				}, 10);
				return false;
			}

			//타이머 넣을 자리
			
			$scope.timerID;//타이머id
			var oTime = 180; //초기화 변수(180초(3분))
			$scope.pTime= oTime; //파라미터
			$scope.etnTime=180;//인증시간 연장버튼 활성화 대기시간(2분)
			
			//타이머 시작
			$scope.start_timer = function(){
				$scope.endTimeFlag=false;
				$scope.timerError = false;
				$scope.extendChance=0;
				clearInterval($scope.timerID);
				$scope.pTime = oTime;
				$scope.timerID = setInterval(function(){					
					decrementTime();
				}, 1000);
			}
			
			 function decrementTime (){
				var x1 = document.getElementById("timer");

				x1.innerHTML = toMinSec($scope.pTime);
				
				if($scope.pTime >0){
					$scope.pTime--;
					
				}else{
					
					$timeout(function() {
						$scope.showError();
					}, 10);
					//layerPop.alert("인증시간이 만료되었습니다.\n\n인증번호 재발송 하신 후 진행하세요.");
					//$scope.showTimerFlag = false;
					$scope.rqeMobAthYn = false;

					clearInterval($scope.timerID);//인증시간 만료
				}
			}
			
			$scope.showError = function(){
				$scope.chanceLimit = true;
				$scope.endTimeFlag = true;
				$scope.timerError = true;

			};
			
			function toMinSec(t){
				var hour;
				var min;
				var sec;
				
				hour = Math.floor(t/3600); 
				min = Math.floor(t/60);
				sec = t - (hour*3600) - (min*60);

				//if(hour <10) hour = "0" + hour;
				//if(min < 10) min = "0" + min;
				if(sec < 10) sec = "0" + sec;
				if(min < 10) min = "0" + min;
				return (min +":"+sec);
			}


			
			
			var pm = {
					iJuminB01: $scope.iJuminB01, //주민번호 앞자리
					ccoDiv: $('#i_mphone_type2 option:selected').val(), //통신사
					cellSnoAllDect: $scope.cellNo //휴대폰번호
				};
			// 휴대폰등록여부 조회
			http.post("f.cg.he.co.cc.o.bc.CertMobileBc.lginMobileAthdc", pm).then(function(result) {
			//bc.lginMobileAthdc(pm).then(function(result) {
				log.out(result);
				if (result) {
					//prcesResultDivCd 0 이면성공, 1 이면실패
					if (result.header && result.header.prcesResultDivCd == '0') {
						//본인인증 받기
						if(result.body.mobCnt > 0) {
							//$scope.iJuminB02 = result.body.idfNoAllDect; //20170628 주민번호제거
							$scope.cusId = result.body.cusId; //20170628 고객ID, 주민번호대체
							mobileSmsSend();
						} else {
							//실패시 에러메시지 처리
							//layerPop.alert("휴대폰 번호 사용등록 이력이 없습니다.<br><br>휴대폰 번호 사용등록 후 이용해주세요.");
							layerPop.alert("휴대폰 번호 또는 통신사가 변경되었거나 사용등록 이력이 없습니다.<br>휴대폰 번호 사용등록 또는 변경된 정보로 사용등록 후 이용해주세요.").then(function(result) {
								location.go("/certification-center/user-mobile-certificate.do", "/");
							});
						}
					}
				}
			});
			
		}
		
		var accTime = 0;
		$scope.extendChance=0;
		$scope.extendTimer = function(){
			$('#i_certiNum').focus();
			$scope.extendChance++;
			if($scope.pTime>360){
				
			}else if($scope.extendChance>1 && $scope.endTimeFlag == false){
				$scope.endTimeFlag=false;
				$scope.chanceLimit=true;
			}else if($scope.endTimeFlag == true){
				
			}else{
				$scope.pTime += $scope.etnTime;
			}
		};
		// 인증번호 받기
		function mobileSmsSend() {
			$scope.showTimerFlag=true;
			$scope.chanceLimit=false;
			var pm = {
				cusNm: '', //테스트용 임시 추가
				chnDivCd: 'W',
				iJuminB01: $scope.iJuminB01, //주민번호 앞자리
				//iJuminB02: $scope.iJuminB02, //주민번호 뒷자리 복호화 데이터 저장 세션키
				cusId: $scope.cusId,	//고객ID(20160728 주민번호 대체)
				ccoDiv: $('#i_mphone_type2 option:selected').val(), //통신사
				cellNo: $scope.cellNo, //휴대폰번호
				prevAuthCd: $scope.prevAuthCd
			};
			log.out("rqeCellAthId param info ", pm);
			
			

			
			//인증문자 날리는 부분 임시로 주석처리
			http.post("f.cg.he.co.cc.o.bc.CertMobileBc.rqeCellAthCusId", pm).then(function(result) {
			//bc.rqeCellAthCusId(pm).then(function(result) {
				log.out(result);
				if (result) {
					//prcesResultDivCd 0 이면성공, 1 이면실패 
					if (result.header && result.header.prcesResultDivCd == '0') {
						
						$scope.start_timer();
						//인증발송 요청 성공
						$scope.isRqeSmsAthNo = true;
						return true;
					} else {
						//실패시 에러메시지 처리
						if(result.msg.standCd == "FCGSLF00002") result.msg.standMsg= "입력하신 휴대폰 번호는<BR> 선택하신 이동통신사의 고객이 아닙니다.";
						layerPop.alert(result.msg.standMsg);
						return false;
					}
				}
			});

		}
		
		
		*//**
		 * @method rqeCellAthNo 휴대폰 인증번호 요청
		 *//*
		$scope.rqeCellAthNo = function() {
			
			//모바일에서는 로그인 불가처리 (20180918)
			if ('M' === mz.device[0]) {
				alert("모바일에서는 제공하지 않는 서비스입니다.");
				return false;
			}
			
			//2차 추가인증의 경우, 1차와 동일한 인증방식은 사용할수 없음
			if($scope.prevAuthCd && $scope.prevAuthCd != '1') {
				layerPop.alert("공인인증서로 추가 인증을 해 주세요.");
				return false;
			}

			//휴대폰 인증번호 요청
			rqeCellAthNo();
		};
		
		
		*//**
		 * @method loadTermsPopup 약관 팝업 호출
		 * @param {[type]} type [description]
		 *//*
		$scope.loadTermsPopup = function(type) {
			var ctrlNm = "";
			var tplNm = "";
			if (type == '01') {
				//개인정보 이용 및 제공동의 약관
				ctrlNm = "layerCommon";
				tplNm = "biz/cm/mo/clus/lypop_indvInf";
			} else if (type == '02') {
				//고유식별 정보 처리 동의
				ctrlNm = "layerCommon";
				tplNm = "biz/cm/mo/clus/lypop_identifier";
			} else if (type == '03') {
				//통신사 이용약관 동의
				ctrlNm = "layerCommon";
				$scope.ccoDiv = $('#i_mphone_type2 option:selected').val();
				log.out("통신사 구분 = " + $scope.ccoDiv);
				if ($scope.ccoDiv == '1' || $scope.ccoDiv == '5') {
					//SKT 약관
					tplNm = "biz/cm/mo/clus/lypop_telecomSK";
				} else if ($scope.ccoDiv == '2' || $scope.ccoDiv == '6') {
					//KT 약관
					tplNm = "biz/cm/mo/clus/lypop_telecomKT";
				} else if ($scope.ccoDiv == '3' || $scope.ccoDiv == '7') {
					//LGT 약관
					tplNm = "biz/cm/mo/clus/lypop_telecomLG";
				} else {
					layerPop.alert("통신사 구분값을 확인해 주세요.");
					return false;
				}
			} else if (type == '04') {
				//개인정보 이용 및 제공동의 약관
				ctrlNm = "layerCommon";
				tplNm = "biz/cm/mo/lgin/lypop_sec_card01";
			} else if (type == '05') {
				//고유식별 정보 처리 동의
				ctrlNm = "layerCommon";
				tplNm = "biz/cm/mo/lgin/lypop_sec_card02";
			} else if (type == '06') {
				//휴대폰 본인확인 서비스 이용약관 동의 팝업
				ctrlNm = "layerCommon";
				tplNm = "biz/cm/mo/clus/lypop_serviceChck";
			} else {
				layerPop.alert("약관 구분을 확인해 주세요.");
				return false;
			}
			//약관 팝업 표시
			layerPop.open(ctrlNm, tplNm).then(function(result) {
				//callback
				log.out(result);
			});
		};
		
		
		
		*//**
		 * @method procLgin
		 * @param {[type]} type [description]
		 *//*
		$scope.procLgin = function(type) {

			//시스템 작업시간
			var stDt = "20160820220000";
			var endDt = "20161121070000";
			var dt = new Date();
			var today = util.formatDate(dt,'yyyymmddhh24miss');
			// 시간비교
			if (eval(stDt) < eval(today) && eval(today) < eval(endDt))  {  
				layerPop.open("layerCommon", "biz/cm/mo/emg/lypop_emg", {});
				return;
			}
			
			//모바일에서는 로그인 불가처리 (20180918)
			if ('M' === mz.device[0]) {
				alert("모바일에서는 제공하지 않는 서비스입니다.");
				return false;
			}
			
			if (type == '01') {
				//2차 추가인증의 경우, 1차와 동일한 인증방식은 사용할수 없음
				if($scope.prevAuthCd && $scope.prevAuthCd == '1') {
					layerPop.alert("휴대폰 또는 신용카드로 추가 인증을 해 주세요.");
					return false;
				}
				//공인인증서 본인인증
				athdc.login(ksbizSignCallback);
			} else if (type == '02') {
				//2차 추가인증의 경우, 1차와 동일한 인증방식은 사용할수 없음
				if($scope.prevAuthCd && $scope.prevAuthCd != '1') {
					layerPop.alert("공인인증서로 추가 인증을 해 주세요.");
					return false;
				}
				//휴대폰 인증 본인인증
				lginCellAthNo();

			
			 * 신용카드인증 2016.11.29 서비스 중지
			} else if (type == '03') {
				//2차 추가인증의 경우, 1차와 동일한 인증방식은 사용할수 없음
				if($scope.prevAuthCd && $scope.prevAuthCd != '1') {
					layerPop.alert("공인인증서로 추가 인증을 해 주세요.");
					return false;
				}
				//신용카드 본인인증
				lginCrdtCrd();
			
			} else if (type == '04') {
				//휴대폰 번호 사용등록
				mobileSignGo();
			} else if (type == '05') {
				//네이버 인증서
				naverSgnGo();
			}else if(type=='06'){
				layerPop.open('lgin_mobile', "biz/cm/mo/lgin/lgin_mobile",{});
			} else {
				//
				log.out("인증 타입 오류 type = " + type);
			}

			
		
		$timeout(function() {
				// window.etribe.ui.comm.focusSet_ontoError.init();				
				//200226 : BHY : 접근성 심사 대비 포커스 세팅
				multiFocusMove();
			}, 50);
		
			
		};
		
		*//**
		 * @method checkLoginResult 
		 *//*
		function checkLoginResult(data) {
			//본인인증 성공여부 확인
			if (!data.athRst) {
				//본인인증 실패
				log.out("본인인증 실패 결과 코드 athFailCd = " + data.athFailCd);
				if (data.athFailCd == '1') {
					//미등록 공인인증서일 경우 - 인증서 등록 화면 이동
					//$scope.movePage('certificate');
					layerPop.alert("등록되어 있는 유효한 공인인증서가 없습니다.<br/>공인인증서를 등록 후 사용해 주세요.");
					return false;
				} else if (data.athFailCd == '2') {
					//전자금융거래 동의 오류, 전자금융거래 동의 팝업 화면 표시
					//공인인증서 등록시, 전자금융거래 회원 동의 체결함..
					layerPop.open("layerElcFncTrsc", "biz/cm/mo/lgin/lypop_elcFncTrsc", {}).then(function(result) {
						//callback
						log.out(result);
						if (result.result) {
							//전자금융거래 회원 저장 완료
							layerPop.alert("전자금융거래 계약 체결이 완료되었습니다.").then(function() {
								//세션 로그인 처리 및 화면 이동
								login();
							});
						}
					});
				} else if(data.athFailCd == '4') {
					//중복 로그인 오류 - 타시스템에 이미 로그인되어 있음
					//추가 인증이 필요함
					$scope.prevAuthCd = data.prevAuthCd;
					layerPop.alert("확인하세요!<br/>이미 고객님의 정보로 로그인되어 있습니다.<br/>고객정보 보호를 위해 기존 정보를 로그아웃하고 새로 로그인하기 위해서는 추가 본인인증이 필요합니다.");
				}
			} else { 
				//본인인증성공 후, 세션 로그인 처리 및 화면 이동
				login();
			}
		}
		*//**
		 * @method login 
		 *//*
		function login() {
			ajax.form("/certification-center/login.do", {}).then(function(result) {
				log.out(result);
				if(result.data.result) {
					location.go(window.location.pathname);
				} else {
					layerPop.alert(result.data.msg);
				}
			});
		}

		*//**
		 * @method mobileSignGo
		 * 휴대폰 번호 사용등록
		 *//*
		function mobileSignGo() {
			location.go("/certification-center/user-mobile-certificate.do", "/");
		}
		
		
		$scope.checkAll = function() {
			var flag         	= false;
			var chkboxAllDiv = $("#all_chk").closest('.check_style');
			if(chkboxAllDiv.hasClass("on")) {
				flag = false;
				chkboxAllDiv.removeClass("on");
			} else {
				var allAgree = all_agree();
				promise.all(allAgree).then(function(){
					flag = true;
					chkboxAllDiv.addClass("on");
				});
			}
			setTimeout(function(){
				_.each($scope.agrrList, function(v, k) {
					$scope.agrrList[k].agree = flag;
				});
				
				$("input[id^='i_chk_termsP0']").each(function(i) {
					var checkDiv = $(this).closest('.check_style');
					if(flag) {
						checkDiv.addClass('on');
					} else {
						checkDiv.removeClass('on');
					}
				});
			},50);
		};
		
		*//**
		 * @method checkValid
		 * @param {[type]} type [description]
		 * @param {[type]} id [description]
		 *//*
		$scope.checkValid = function(type, id) {
			if (!$scope.agrrList[0].agree || !$scope.agrrList[1].agree || !$scope.agrrList[2].agree || !$scope.agrrList[3].agree) {
				$scope.chkTermsPError = true;
			} else {
				$scope.chkTermsPError = false;
			}
			
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
				// errorMthod();
			}, 10);
			
			return error;
		};
		
		$scope.watchAll = function(){
			$timeout(function(){
				
				if($scope.all_chk == true){
					if(!$scope.agrrList[1].agree ||!$scope.agrrList[2].agree||!$scope.agrrList[3].agree||!$scope.agrrList[0].agree){
						$("#all_chk").closest('.check_style').removeClass('on');
						$("#all_chk").prop('checked', false);
						$scope.all_chk=false;
					}
				}else if($scope.all_chk == false) {
					if($scope.agrrList[1].agree && $scope.agrrList[2].agree && $scope.agrrList[3].agree && $scope.agrrList[0].agree){
						
						var allAgree = all_agree();
						promise.all(allAgree).then(function(){
							$("#all_chk").closest('.check_style').addClass('on');
							$("#all_chk").prop('checked', true);
							$scope.all_chk=true;
						});
					}
				}
				
			},20);
			
		};
		
		
	*/}));
	
	
	
	/**
	 * @method 클래스명Controller
	 * @param {o} co - 공통컴포넌트
	 * @param {o}  - 스코프
	 */
	mz.comm.controller('layerElcFncTrscController', mz.mold(function(co, $scope) {
		/*
		var id = "layerElcFncTrsc";
		var log = co.get('logger').getLogger('layerElcFncTrscController');
		var http = co.get('http');
		var layerPop = co.get('layerPop');
		var $timeout = co.get('$timeout');
		var param = layerPop.getParam($scope);
		log.out("param info : ", param);
		//
		 - init --------------------------------- 

		init();

		 - public ------------------------------- 
		*//**
		 * @method close
		 *//*
		$scope.close = function() {
			layerPop.close($scope, {
				result: false
			});
		};
		*//**
		 * @method procAgree
		 *//*
		$scope.procAgree = function() {
			//동의여부 확인
			if (!$scope.chkAgree) {
				$scope.chkAgreeErr = true;
				return false;
			}
			var pm = param;
			//
			http.post("f.cg.he.cm.mo.o.bc.LginBc.registSimpleElcFncTrscAgrInf", pm).then(function(result) {
				log.out(result);
				if (result) {
					//prcesResultDivCd 0 이면성공, 1 이면실패
					if (result.header && result.header.prcesResultDivCd == '0') {
						//종료
						layerPop.close($scope, {
							result: true
						});
					} else {
						//실패시 에러메시지 처리
						layerPop.alert(result.msg.standMsg);
						return false;
					}
				}
			});
		};
		 - private ------------------------------ 

		*//**
		 * @method init - 초기화
		 *//*
		function init() {
			$timeout(function() {
				styleFormMethod();
			}, 400);
		}
	*/}));
	
	/**
	 * @method Controller 제도개정을위한 임시 팝업
	 * @param {o} co - 공통컴포넌트
	 * @param {o} $scope - 스코프
	 */
	mz.comm.controller('uiInsServiceTipController', function(co, $scope) {
		/*
		var log = co.get('logger').getLogger('uiInsServiceTip');
		var layerPop	= co.get('layerPop');
		var util	= co.get('util');
		 - init --------------------------------- 
		init();
		 - public ------------------------------- 
		*//**
		 * @method close
		 *//*
		$scope.close = function() { 
			layerPop.close($scope);
		};
		$scope.todayClose = function(){
			util.setCookie("noOpenPop","done", 1);
			layerPop.close($scope);
		}
		 - private ------------------------------ 
		*//**
		 * @method init - 초기화
		 *//*
		function init() {
		}
	*/});
	
	/**
	 * @method Controller 본인인증해제팝업
	 * @param {o} co - 공통컴포넌트
	 * @param {o} $scope - 스코프
	 */
	mz.comm.controller('layerProductIntroController', function(co, $scope) {
		/*
		var log = co.get('logger').getLogger('layerProductIntroController');
		var layerPop	= co.get('layerPop');
		var $window = co.get('$window');

		 - init --------------------------------- 
		init();
		 - public ------------------------------- 
		*//**
		 * @method close
		 *//*
		$scope.close = function() {
			$window.location.replace("/logout.do");
			layerPop.close($scope);
		};

		 - private ------------------------------ 
		*//**
		 * @method init - 초기화
		 *//*
		function init() {
		}
	*/});
	
	/**
	 * 휴대폰인증 레이어 팝업.
	 * TODO
	 */
	mz.comm.controller('layerInsMobileCertController', mz.mold(function(co, $scope) {
		/*
		var log = co.get('logger').getLogger('layerInsMobileCertController');
		var id = "layerMobileCert";
		var http = co.get('http');
		var location = co.get('location');
		var layerPop = co.get('layerPop');	
		var util = co.get('util');
		var $timeout = co.get('$timeout');
		var ajax = co.get('ajax');
		var athdc = co.get('athdc');
		var rsecure = co.get('rsecure');
		var $window = co.get('$window');

		init();

		
		
		 - public ------------------------------ 
		$scope.close = function() {
			layerPop.close($scope, $scope.retData);
		};
		$scope.checkAll = function() {
			var flag         	= false;
			var chkboxAllDiv = $("#all_chk").closest('.check_style');
			if(chkboxAllDiv.hasClass("on")) {
				flag = false;
				chkboxAllDiv.removeClass("on");
			} else {
				flag = true;
				chkboxAllDiv.addClass("on");
			}
			
			_.each($scope.agrrList, function(v, k) {
				$scope.agrrList[k].agree = flag;
			});
			
			$("input[id^='i_chk_termsP0']").each(function(i) {
				var checkDiv = $(this).closest('.check_style');
				if(flag) {
					checkDiv.addClass('on');
				} else {
					checkDiv.removeClass('on');
				}
			});
			
		};
		//인증번호받기
		$scope.rqeCellAthNo = function() {
			//모바일에서#는 로그인 불가처리 (20180918)
			if ('M' === mz.device[0]) {
				alert("모바일에서는 제공하지 않는 서비스입니다.");
				return false;
			}
			
			//인증번호 받기 validation 체크..
			//requestCheck();
			
			var isValid = true;
			
			//동의여부 확인
			if (!$scope.agrrList[0].agree || !$scope.agrrList[1].agree || !$scope.agrrList[2].agree || !$scope.agrrList[3].agree) {
				$scope.layer.i_chk_termsP_error = true;
				isValid = false;
				return false;
			} else {
				$scope.layer.i_chk_termsP_error = false;
			}
			
			$scope.valid = $scope.valid || {};

			//휴대폰번호체크
			$scope.valid.telNo = {
				error: false,
				msg: '휴대폰번호를 정확히 입력하세요.'
			};
			
			if (_.isEmpty($scope.data.telNo) || !util.isMobile($scope.data.telNo)) {
				$scope.valid.telNo.error = true;
				isValid = false;
			} else {
				$scope.valid.telNo.error = false;
			}
			
			//입력 성공 여부
			if (!isValid) {
				setTimeout(function() {
					// errorMthod();
				}, 200);
				return false;
			}
			
//타이머 넣을 자리
			
			$scope.timerID;//타이머id
			var oTime = 180; //초기화 변수(180초(3분))
			$scope.pTime= oTime; //파라미터
			$scope.etnTime=180;//인증시간 연장버튼 활성화 대기시간(2분)
			
			//타이머 시작
			$scope.start_timer = function(){
				$scope.endTimeFlag=false;
				$scope.timerError = false;
				$scope.extendChance=0;
				clearInterval($scope.timerID);
				$scope.pTime = oTime;
				$scope.timerID = setInterval(function(){					
					decrementTime();
				}, 1000);
			}
			
			 function decrementTime (){
				var x1 = document.getElementById("timer");

				x1.innerHTML = toMinSec($scope.pTime);
				
				if($scope.pTime >0){
					$scope.pTime--;
					
				}else{
					
					$timeout(function() {
						$scope.showError();
					}, 10);
					//layerPop.alert("인증시간이 만료되었습니다.\n\n인증번호 재발송 하신 후 진행하세요.");
					//$scope.showTimerFlag = false;
					$scope.rqeMobAthYn = false;

					clearInterval($scope.timerID);//인증시간 만료
					

				}
			}
			
			$scope.showError = function(){
				$scope.chanceLimit = true;
				$scope.endTimeFlag = true;
				$scope.timerError = true;

			};
			
			function toMinSec(t){
				var hour;
				var min;
				var sec;
				
				hour = Math.floor(t/3600); 
				min = Math.floor(t/60);
				sec = t - (hour*3600) - (min*60);

				//if(hour <10) hour = "0" + hour;
				//if(min < 10) min = "0" + min;
				if(sec < 10) sec = "0" + sec;
				if(min < 10) min = "0" + min;
				return (min +":"+sec);
			}
			
			var pm = {
					"ccoDiv" : $('#i_mphone_type option:selected').val(),
					"iJuminB01": $scope.param.iJuminB01,
					"cellSnoAllDect": util.replaceAll($scope.data.telNo, '-', '')
			};
			
			http.post("f.cg.he.co.cc.o.bc.CertMobileBc.lginMobileAthdc", pm).then(function(result) {
				log.out(result);
				if (result) {
					//prcesResultDivCd 0 이면성공, 1 이면실패
					if (result.header && result.header.prcesResultDivCd == '0') {
						if(result.body.mobCnt > 0) {
							layerPop.alert("이전에 등록된 휴대폰번호 정보가 존재합니다.<br/>바로 본인인증(로그인)하시면 됩니다.<br/><br/>휴대폰 번호가 변경된 경우에는 고객정보변경<br/>메뉴에서 먼저 변경해주시기 바랍니다.<br/>(공인인증서 자필서명 필요)").then(function(confirm) {
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
		
		
		var accTime = 0;
		$scope.extendChance=0;
		$scope.extendTimer = function(){
			
			$('#i_certiNum').focus();
			$scope.extendChance++;
			if($scope.pTime>360){
				
			}else if($scope.extendChance>1 && $scope.endTimeFlag == false){
				$scope.endTimeFlag=false;
				$scope.chanceLimit=true;
			}else if($scope.endTimeFlag == true){
				
			}else{
				$scope.pTime += $scope.etnTime;
			}
		};
		
		function mobileCellSend() {
			
			$scope.showTimerFlag=true;
			$scope.chanceLimit=false;
			
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

			log.out("인증번호 PARAM ########", param);
			http.post('f.cg.he.co.cc.o.bc.CertMobileBc.rqeCellAthNo', param).then(function(result) {
				//prcesResultDivCd 0 이면성공, 1 이면실패
				if (result.header && result.header.prcesResultDivCd == '0') {
					log.out("rqeCellAthNo result",result);
					if (result.body.athRsl == '0000') {
						$scope.start_timer();
						$scope.isRqeSmsAthNo = true;
						$scope.param.cusId = result.body.cusId;
						$scope.param.iJuminB02Enc = result.body.iJuminB02;
						$scope.param.cellNo = cellNo;
					}				
				}else{

					//단체보험 대상자일 경우
					if($scope.grupYn=="Y" && result.msg.standCd == "FCGCUH00001") {
						layerPop.alert("고객님께서는 아직 당사의 단체보험 피보험자로 등재되어 있지 않으십니다.<br>등재화면으로 이동하겠습니다.").then(function() {
							var param = {grupRegYn: "Y"};		//단체보험 피보험자 등재요청
							location.go("/compensation/group-insurance/request.do", "/", param);
							return false;
						});	
					} else { 
						//실패시 에러메시지 처리
						if(result.msg.standCd == "FCGSLF00002") result.msg.standMsg= "입력하신 휴대폰 번호는<BR> 선택하신 이동통신사의 고객이 아닙니다.";
						layerPop.alert(result.msg.standMsg);
						return false;
					}
				}
			});
		}
		
		//본인인증
		$scope.verifyCellAthNo = function() {
			//본인인증 validation check
			verifyCheck();

			if (util.isError($scope.valid)) {
				return false;
			}

			var smsAthNo = $scope.data.smsAthNo;
			var param = {
				"smsAthNo": smsAthNo,
				"process": 'new'
			};

			// 본인인증 확인
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
					// 휴대폰번호 등록
					http.post('f.cg.he.co.cc.o.bc.CertMobileBc.registMobileAthdcInf',pm).then(function(result) {
						log.out(result);
						if (result) {
							//prcesResultDivCd 0 이면성공, 1 이면실패
							if (result.header && result.header.prcesResultDivCd == '0') {
								//본인인증 성공여부 확인
								//checkLoginResult(result.body);
							} else {
								//실패시 에러메시지 처리
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
				clearInterval($scope.timerID);
				layerPop.close($scope, $scope.retData);
			});
		};
		
		$scope.loadTermsPopup = function(type) {
			var ctrlNm = "";
			var tplNm = "";
			if (type == '01') {
				//개인정보 이용 및 제공동의 약관
				ctrlNm = "layerCommon";
				tplNm = "biz/cm/mo/clus/lypop_indvInf";
			} else if (type == '02') {
				//고유식별 정보 처리 동의
				ctrlNm = "layerCommon";
				tplNm = "biz/cm/mo/clus/lypop_identifier";
			} else if (type == '03') {
				//통신사 이용약관 동의
				ctrlNm = "layerCommon";
				var ccoDiv = $('#i_mphone_type option:selected').val();
				log.out("통신사 구분 = " + ccoDiv);
				if (ccoDiv == '1' || ccoDiv == '5') {
					//SKT 약관
					tplNm = "biz/cm/mo/clus/lypop_telecomSK";
				} else if (ccoDiv == '2' || ccoDiv == '6') {
					//KT 약관
					tplNm = "biz/cm/mo/clus/lypop_telecomKT";
				} else if (ccoDiv == '3' || ccoDiv == '7') {
					//LGT 약관
					tplNm = "biz/cm/mo/clus/lypop_telecomLG";
				}
			} else if (type == '04') {
				//개인정보 이용 및 제공동의 약관
				ctrlNm = "layerCommon";
				tplNm = "biz/cm/mo/lgin/lypop_sec_card01";
			} else if (type == '05') {
				//고유식별 정보 처리 동의
				ctrlNm = "layerCommon";
				tplNm = "biz/cm/mo/lgin/lypop_sec_card02";
			} else if (type == '06') {
				//휴대폰 본인확인 서비스 이용약관 동의 팝업
				ctrlNm = "layerCommon";
				tplNm = "biz/cm/mo/clus/lypop_serviceChck";		
			}

			layerPop.open(ctrlNm, tplNm);
		};

		 - private ------------------------------ 
		function agreeCheck () {
			$scope.valid = $scope.valid || {};
			//동의여부체크
			$scope.valid.agree = {
				error: false,
				msg: "동의에 체크해 주셔야 합니다."
			};

			if (!$scope.data.agree1 || !$scope.data.agree2 || !$scope.data.agree3) {
				$scope.valid.agree.error = true;
			}
		}
		
		function requestCheck() {
			
			//동의여부 확인
			if (!$scope.agrrList[0].agree || !$scope.agrrList[1].agree || !$scope.agrrList[2].agree || !$scope.agrrList[3].agree) {
				$scope.layer.i_chk_termsP_error = true;
				isValid = false;
				return false;
			} else {
				$scope.layer.i_chk_termsP_error = false;
			}
			
			$scope.valid = $scope.valid || {};

			//휴대폰번호체크
			$scope.valid.telNo = {
				error: false,
				msg: '휴대폰번호를 정확히 입력하세요.'
			};
			
			if (_.isEmpty($scope.data.telNo) || !util.isMobile($scope.data.telNo)) {
				$scope.valid.telNo.error = true;
			}
			
			$scope.endTimeFlag= false;
			$scope.chanceLimit = false;
			
			setTimeout(function() {
				// errorMthod();
			}, 200);
		}

		function verifyCheck() {
			$scope.valid = $scope.valid || {};			
			//인증번호 받기..되어 있는지 체크
			if (!$scope.isRqeSmsAthNo) {
				$scope.valid.telNo = {
					error: true,
					msg: "인증번호 받기를 눌러주세요."
				};
			}
			
			//200226 : BHY : 접근성 심사 대비 포커스 세팅
			$timeout(function () {
				multiFocusMove();
			}, 50);
			
			//인증번호 체크
			$scope.valid.smsAthNo = {
				error: false,
				msg: "인증번호를 정확히 입력하세요."
			};

			if (_.isEmpty($scope.data.smsAthNo) || $scope.data.smsAthNo.length != 6) {
				$scope.valid.smsAthNo.error = true;
			}
			
			//agreeCheck();
			requestCheck();
			
			//200226 : BHY : 접근성 심사 대비 포커스 세팅
			$timeout(function () {
				multiFocusMove();
			}, 50);
		}
		$scope.watchAll = function(){
			$timeout(function(){
				
				if($scope.all_chk == true){
					if(!$scope.agrrList[1].agree ||!$scope.agrrList[2].agree||!$scope.agrrList[3].agree||!$scope.agrrList[0].agree){
						$("#all_chk").closest('.check_style').removeClass('on');
						$("#all_chk").prop('checked', false);
						$scope.all_chk=false;
					}
				}else if($scope.all_chk == false) {
					if($scope.agrrList[1].agree && $scope.agrrList[2].agree && $scope.agrrList[3].agree && $scope.agrrList[0].agree){
						$("#all_chk").closest('.check_style').addClass('on');
						$("#all_chk").prop('checked', true);
						$scope.all_chk=true;
					}
				}
				
			},20);
			
		};

		*//**
		 * @method init - 초기화
		 *//*
		function init() {
			$scope.chanceLimit=false;
			$scope.showTimerFlag=false;
			$scope.endTimeFlag=false;
			$scope.all_chk = false;
			$scope.agrrList = [{agree:false},{agree:false},{agree:false},{agree:false},{agree:false}];
			$scope.agrrValidList = [{error:false},{error:false},{error:false},{error:false},{error:false}];
			$scope.param  = {}; //넘어온 정보.
			$scope.result = {}; //부모에게 넘길 정보.
			
			$scope.data = {
				type: '1',
				agree1: false,
				agree2: false,
				agree3: false
			}; //layer에서 관리되는 변수..
			//통신사 코드
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
				nm: 'SKT 알뜰폰'
			}, {
				cd: '6',
				nm: 'KT 알뜰폰'
			}, {
				cd: '7',
				nm: 'LG U+ 알뜰폰'
			}];

			$scope.isRqeSmsAthNo = false;
			$scope.retData = {
				success: false
			};

			$scope.param = layerPop.getParam($scope);
			log.out("$scope.param:",$scope.param);
			
			$scope.grupYn = "N";	//단체보험금 청구 페이지에서 호출 여부

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
	*/}));


})(angular, mz);
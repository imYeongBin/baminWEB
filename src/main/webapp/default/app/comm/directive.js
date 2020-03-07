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
 * 201906 �ㅻ쪟�섏젙 ecrm 由ы꽩媛믪씠 �녿뒗 寃쎌슦 怨듬�泥섎━
 */  
(function(angular, mz) {

	// uiHeader
	/*mz.comm.directive('uiHeader', mz.mold(function() {
		var o = {};

		o.templateUrl = mz.path('/views/comm/uiHeader.tpl', true);

		o.controller = mz.mold(function(co, $scope) {
			var log = co.get('logger').getLogger('uiHeader');
			var http = co.get('http'); 
			var location = co.get('location');
			var menuService = co.get("menuService");
			var path = co.get("path");
			var util = co.get("util");
			var layerPop = co.get('layerPop');
			var $window = co.get('$window');

			var pageId = path.getPageId();
			var menu = _.filter(mz.menu, function(info) {
				return menuService.realMenuCheck(info, pageId);
			})[0];

			if (!_.isUndefined(menu)) {
				menuService.setGnb(util.trim(menu.path.split(">")[0]));

				//default title setting
				var pathnames = menu.pathname.split(">");
				var title = pathnames[pathnames.length - 1];
				document.title = title + " | 硫붾━痢좏솕��";
			}
			getBanner();
			
			//�� 諛곕꼫 �몄텧 �꾩떆��
			var html = ""
				  html+="<div class='top_bnnr' style='background:#ededed;text-align:center;'><!-- class='default' bgcolor blue -->";
				  html+="<div class='bnnr_innr'>";
				  html+="<img src='/default/images/topEvent/top_bnnr_170101.jpg' alt='2017�� 1�� �곹뭹媛쒖젙�쇰줈 �명빐 �쇰� �곹뭹�� 蹂댄뿕猷뚭퀎�� 諛� 寃곗젣 �쒕퉬�ㅺ� �쇱떆 以묐떒�⑸땲��. 以묐떒 �쇱떆: 2016�� 12�� 31�� 23:00 ~ 2017�� 1�� 1�� 08:00'>" 
			      html+="</div>";
				  html+="</div>";
				 
				  $("#header").before(html);
				  
				  //�쒖뒪�� �묒뾽�쒓컙
				  var startDt = "201612311600";
				  var endDt  = "201701010500";   
				   
				  //�꾩옱 �쒓컙
				  var dt = new Date();
				  var today = util.formatDate(dt,'yyyymmddhh24mi');
				   			
				  // �쒓컙鍮꾧탳
				  if (eval(today) >= eval(startDt)  && eval(today) <= eval(endDt))  {  
					  $(".top_bnnr").css("display","block");
				  }
			
			function getBanner(){
				
				var pageId = path.getPageId();
				
				// 硫붾돱ID
				var linkList = _.filter(mz.menu, function(info) { 
					return menuService.realMenuCheck(info, pageId);
				});
		
				var lnb      = linkList[linkList.length - 1];
				var paths    = "";
				
				if(typeof lnb != "undefined" && lnb != ""){
					paths = lnb.path.split(">");
				}
				var expoMenuNm = util.isNull(paths[0]) ? "" : paths[0];
	
				var pm = {
					cmSysDivCd :'01'			// CM�쒖뒪�쒓뎄遺꾩퐫�� ==> ���� : 01(���쒗솃�섏씠吏�),06(���쒕え諛붿씪��), 吏곹뙋: 02(吏곹뙋�덊럹�댁�), 07(吏곹뙋紐⑤컮�쇱빋)   
					, cmBnnrTpCd :'6350'		// CM諛곕꼫�좏삎肄붾뱶 (媛쒕컻怨�)
					//, cmBnnrTpCd :'6263' 		// CM諛곕꼫�좏삎肄붾뱶 (�댁쁺)
					, startIndex :'1'			// 
					, endIndex   :'2'	 		// 
				    , expoMenuNm: expoMenuNm	// 硫붾돱 �몄텧 援щ텇
				};

			http.post("f.cg.he.cm.mo.o.bc.MainBnrBc.curtainBnrLst", pm).then(function(result) {
				if(result) {
					if(result.header && result.header.prcesResultDivCd == '0') {
							
					    // 而ㅽ듉諛곕꼫 異붽� uiMain�먯꽑 ��젣 
						var ctnBanrList = result.body.list;
						
						if(ctnBanrList.length>0){
							var html = '<div class="top_bnnr" style="width: 100%;background:'+ctnBanrList[0].bkclVal+';text-align:center;top: 0;">'; 
							html +=	'<div class="bnnr_innr" style="margin: 0 auto;">';
							// �대�吏��� 而ㅽ듉諛곕꼫
							if(ctnBanrList[0].cmBnnrTpCd == '6350'){
								if(ctnBanrList.length == 1){	
							 		if(util.trim(ctnBanrList[0].linkUrl)==''){
							 			html +=	'<img src="'+ctnBanrList[0].atcFilePthNm+'" alt="'+ctnBanrList[0].ttlNm+'"></a>';
							 		}else{
							 			if(ctnBanrList[0].cmNewWdwTpCd == '1'){
							 				html +=	'<a href="'+ctnBanrList[0].linkUrl+'" target="_blank"><img  src="'+ctnBanrList[0].atcFilePthNm+'" alt="'+ctnBanrList[0].ttlNm+'"></a>';
							 			}else{
							 				html +=	'<a href="'+ctnBanrList[0].linkUrl+'"><img  src="'+ctnBanrList[0].atcFilePthNm+'" alt="'+ctnBanrList[0].ttlNm+'"></a>';
							 			}
							 			
							 		}						
							 	}else{
							 		html +=	'<div class="event_2type clfix">';
									for(k=0; k<ctnBanrList.length; k++){
										if(ctnBanrList[0].cmNewWdwTpCd == '1'){
											html +=	'<a href="'+ctnBanrList[k].linkUrl+'" target="_blank"><img  src="'+ctnBanrList[k].atcFilePthNm+'" alt="'+ctnBanrList[k].ttlNm+'"></a>';
							 			}else{
							 				html +=	'<a href="'+ctnBanrList[k].linkUrl+'"><img  src="'+ctnBanrList[k].atcFilePthNm+'" alt="'+ctnBanrList[k].ttlNm+'"></a>';
							 			}
							 		}
							 		html +=	'</div>';
							 	}
							 // �쒖뒪�쒗삎 而ㅽ듉諛곕꼫
							}else{
									var putupTrrtDivCd = ctnBanrList[0].putupTrrtDivCd == '01' ? 'error_type' : 'notice_type';
									if(util.trim(ctnBanrList[0].linkUrl) == '' || typeof ctnBanrList[0].linkUrl == 'undefined'){
										html +=' <div class="system_banner clfix">';
									}else{
										html +=' <div class="system_banner clfix" style="cursor:pointer;" onclick="window.open(\''+ctnBanrList[0].linkUrl +'\',\'\')">';	
									}
										html +=' 	<div class="system_ico '+putupTrrtDivCd+'" ></div>';
										html +=' 	<div class="sysetm_txt_wrap">';
										html +=' 		<div class="sys_txt_tit">'+ctnBanrList[0].ttlNm+'</div>';
										html +=' 		<div class="sys_txt_span">'+ctnBanrList[0].putupDtlCon+'</div>';
										html +=' 	</div>';
										html +=' </div>';

							}
							html += '</div></div>';
							angular.element("#header").css("padding-top", "0px");
							$("#header").before(html);
							$(".top_bnnr").css("display","block");
								// 01 > �먮윭 , 02 > 怨듭� 諛곕꼫
								
								var putupTrrtDivCd = ctnBanrList[0].putupTrrtDivCd == '01' ? 'error_type' : 'notice_type';
								if(util.trim(ctnBanrList[0].linkUrl) == '' || typeof ctnBanrList[0].linkUrl == 'undefined'){
									html +=' <div class="system_banner clfix">';
								}else{
									html +=' <div class="system_banner clfix" style="cursor:pointer;" onclick="window.open(\''+ctnBanrList[0].linkUrl +'\',\'\')">';	
								}
								
								html +=' 	<div class="system_ico '+putupTrrtDivCd+'" ></div>';
								html +=' 	<div class="sysetm_txt_wrap">';
								html +=' 		<div class="sys_txt_tit">'+ctnBanrList[0].ttlNm+'</div>';
								html +=' 		<div class="sys_txt_span">'+ctnBanrList[0].putupDtlCon+'</div>';
								html +=' 	</div>';
								html +=' </div>';
							}							 
							html += '</div></div>';
							angular.element("#header").css("padding-top", "0px");
							$(".top_bnnr").prepend(html);
							$(".top_bnnr").css("display","block");
							
								
							
						}
					} else {
						//layerPop.alert(result.msg.standMsg);
					}				
					//window.uiMain.init() ;		
				}
			});
			}
			*//**
			 * �ㅼ씠�됲듃 �곌껐
			 *//*
			$scope.getDirectUrl = function() {
				return util.getDirectHost();
			};

			$scope.curGnbId = menuService.getGnbId();
			
			$scope.movePet = function(){
				var dircHost = util.getDirectHost();
				window.location.href = dircHost + 'pet/main.do';
			}
			
			*//**
			 * 硫붾돱�대룞泥섎━		
			 *//*
			$scope.moveMenu = function(menuId) {
				if (util.isNull(menuId) || menuId == 0) {
					//硫붿씤 �대룞
					location.go("/main.do");
					return;
				}
				menuService.setGnb(menuId);
				var gnb = menuService.getGnb();
				if (gnb) {
					menuService.goMenu(gnb);
				}
			};
			
			*//**
             * 濡쒓렇�� �대깽�� 泥섎━
             *//*
            $scope.isLogin = false;
            $scope.$on('event-comm-session', function(event, userInfo) {
                if (userInfo) {
                    //濡쒓렇�� �섏뼱 �덉쓬
                    log.trace(userInfo);
                    //
                    $scope.isLogin = true;
                }
            });
            $scope.logout = function() {            	
            	layerPop.confirm("蹂몄씤�몄쬆 �댁젣瑜� �섏떆寃좎뒿�덇퉴?", "硫붾━痢좏솕��").then(function(result) {
            		log.out(result);
            		if(result) {
            			$window.location.replace("/logout.do");
            		};
            	});
            	//layerPop.open('layerProductIntro', 'biz/pd/pd/comm/lypop_productIntro').then(function(result) {});
            };
		});

		return o;
	}));*/

	// uiSnb
	/*mz.comm.directive('uiSnb', mz.mold(function() {
		
		var o = {};
		o.templateUrl = mz.path('/views/comm/uiSnb.tpl', true);

		o.link = function(){
			if(location){
				if(location.pathname){
					if(!location.pathname.startsWith('/customer-center')){
						$('.snb_mobile').hide();
					}
				}
			}
		}
		
		o.controller = mz.mold(function(co, $scope) {
			var log = co.get('logger').getLogger('uiSnb');
			var http = co.get('http');
			var location = co.get('location');
			var menuService = co.get("menuService");
			var layerPop = co.get('layerPop');
			var path = co.get('path');
			var util = co.get('util');
			var $timeout = co.get("$timeout");

			//pageId瑜� �댁슜�댁꽌 理쒖긽�� id瑜� 李얜뒗��.
			var pageId = path.getPageId();
			var linkList = _.filter(mz.menu, function(info) {
				return menuService.realMenuCheck(info, pageId);
			});
			
			if (linkList.length == 0) {
				return false;
			}

			var lnb = linkList[linkList.length - 1];
			var paths = lnb.path.split(">");

			//遺�紐� MENU媛� FOOTER�� �� �덉쇅泥섎━..
			if (paths[0] == '2236') {
				paths = [paths[1]];
				$scope.gnbMenuNm = util.trim(lnb.pathname.split(">")[1]);
			} else {
				$scope.gnbMenuNm = util.trim(lnb.pathname.split(">")[0]);
			}

			//1李� 硫붾돱 �명똿.
			menuService.setGnb(util.trim(paths[0]));


			if (paths.length == 2) {
				$scope.curLnbId = util.trim(paths[1]);
			} else if (paths.length == 3) {
				$scope.curLnbId = util.trim(paths[1]);
				$scope.curSnbId = util.trim(paths[2]);
			}

			//lnb setting
			$scope.lnbs = _.sortBy(_.filter(mz.menu, function(info) {
//				console.log(info.hgrkMenuIdn, menuService.getGnbId(), info.menuDivCd);
				return info.hgrkMenuIdn == menuService.getGnbId() && info.menuDivCd == '1';
			}), function(info) {
				return info.srtSq;
			});

			//snb setting
			_.each($scope.lnbs, function(v, k) {
				v["snbs"] = _.sortBy(_.filter(mz.menu, function(info) {
					return v.menuIdn == info.hgrkMenuIdn && info.menuDivCd == '1';
				}), function(info) {
					return info.srtSq;
				});
			});

			$scope.moveLnbMenu = function(lnb) {
				$scope.curLnbId = lnb.menuIdn;
				menuService.goMenu(lnb);
			};

			$scope.moveSnbMenu = function(snb) {
				menuService.goMenu(snb);
			};
			
			$timeout(function() {
				$("ul > li.snb_go").eq(0).addClass("mt20");
				
			}, 100);
			
		});
		
		return o;
	}));*/

	// uiContents
/*	mz.comm.directive('uiContents', mz.mold(function() {
		return {
			templateUrl: mz.path('/views/comm/uiContents.tpl', true)
		};
	}));*/

	//荑좏궎濡쒓렇 �곸옱 �곸뿭
/*	mz.comm.directive('logStorageArea', [function() {
		return {
			controller : mz.mold(function(co, $scope){
				var crossStorage = '';
				if(co.get('crossStorage')){
					crossStorage = co.get('crossStorage');
					*//***
					 * CrossStorage
					 * ����-吏곹뙋 �뚮옯�쇨컙 荑좏궎怨듭쑀 諛� �덉뒪�좊━ �곸옱 湲곕뒫
					 *//*
					crossStorage.init();
					crossStorage.insrtLog();
				};
			})
		}
	}]);*/
	
	// uiFooter
	/*mz.comm.directive('uiFooter', mz.mold(function() {
		var o = {};
		o.templateUrl = mz.path('/views/comm/uiFooter.tpl', true);
		o.controller = mz.mold(function(co, $scope, crossStorage, $q) {
			var log = co.get('logger').getLogger('uiSnb');
			var location = co.get('location');
			var menuService = co.get("menuService");
			var util = co.get('util');
			var wakeup = co.get('wakeup');

			*//**
			 * 硫붾돱�대룞泥섎━		
			 *//*
			$scope.moveMenu = function(menuId) {
				if (util.isNull(menuId) || menuId == 0) {
					//硫붿씤 �대룞
					location.go("/main.do");
					return;
				}
				menuService.setGnb(menuId);
				var gnb = menuService.getGnb();
				if (gnb) {
					menuService.goMenu(gnb);
				}
			};
			
			$scope.stopWakeup = function(){
				if(!angular.element('#clfix li a').hasClass('link_btn on')){
					wakeup.getTimerStop();
				}
			};

			*//***
			 * CrossStorage
			 * ����-吏곹뙋 �뚮옯�쇨컙 荑좏궎怨듭쑀 諛� �덉뒪�좊━ �곸옱 湲곕뒫
			 *//*
			crossStorage.init();
			crossStorage.insrtLog();
			
			
			
		});
		return o;
	}));*/

	mz.comm.directive('mzSelect', mz.mold(function(util) {
		return {
			scope: {
				list: "="
			},
			restrict: 'A',
			link: function(scope, elem, attr) {
				scope.$watch('list', function() {
					replaceSelect(elem);
				});
			}
		};
	}));

	mz.comm.directive('mzEnter', function() {
		return {
			restrict: "A",
			link: function(scope, elem, attrs) {
				elem.bind("keydown keypress", function(event) {
					if (event.which === 13) {
						scope.$apply(function() {
							scope.$eval(attrs.mzEnter);
						});
						event.preventDefault();
					}
				});
			}
		};
	});

	mz.comm.directive('numberMax', mz.mold(function(util) {
		return {
			restrict: 'A',
			require: 'ngModel',
			link: function(scope, elem, attr, ctrl) {
				$(elem).on('keyup', function(e) {
					var val = $(this).val();
					if (util.parseInt(attr.numberMax) < val) {
						var prevVal = val.substring(0, val.length - 1);
						ctrl.$setViewValue(prevVal);
						ctrl.$render();
					}
				});
			}
		};
	}));

	mz.comm.directive('numberOnly', function() {
		return {
			restrict: 'A',
			link: function(scope, elem, attrs) {
				$(elem)
					.css("ime-mode", "disabled")
					.on('keyup', function(e) {
						if (1 < $(this).val().length) {
							$(this).val($(this).val().replace(/[^0-9]/g, ""));
						}
					});
			}
		};
	});

	mz.comm.directive('alphaOnly', function() {
		return {
			restrict: 'A',
			link: function(scope, elem, attrs) {
				$(elem)
					.css("ime-mode", "disabled")
					.on('keyup', function(e) {
						if (1 < $(this).val().length) {
							$(this).val($(this).val().replace(/[^A-z\s]/g, ""));
						}
					});
			}
		};
	});
	
	mz.comm.directive('hangulAlphaOnly', function() {
		return {
			restrict: 'A',
			link: function(scope, elem) {
				$(elem).on('keyup', function() {
					if (1 < $(this).val().length) {
						var reg = /[0-9.~!@\#$%<>^&*\()\-=+_\'`\\\?;:,"\{\}|\/\[\]]/g;						
						var val = $(this).val();

						if (reg.test(val)) {
							$(this).val(val.replace(reg, ""));
						}
					}
				});
			}
		};
	});

	mz.comm.directive('hangulOnly', function() {
		return {
			restrict: 'A',
			link: function(scope, elem, attrs) {
				$(elem)
					.css("ime-mode", "active")
					.on('keyup', function(e) {
						if (1 < $(this).val().length) {
							var reg = /[^媛�-�ｃ꽦-�롢뀖-��\x20]/g;
							var val = $(this).val();

							if (reg.test(val)) {
								$(this).val(val.replace(reg, ""));
							}
						}
					});
			}
		};
	});

	mz.comm.directive('langOnly', function() {
		return {
			restrict: 'A',
			link: function(scope, elem, attrs) {
				$(elem)
					.on('keyup', function(e) {
						if (1 < $(this).val().length) {
							var reg = /[0-9.~!@\#$%<>^&*\()\-=+_\'`\\\?]/g;
							var val = $(this).val();

							if (reg.test(val)) {
								$(this).val(val.replace(reg, ""));
							}
						}
					});
			}
		};
	});

	mz.comm.directive('emailOnly', function() {
		return {
			restrict: 'A',
			link: function(scope, elem, attrs) {
				$(elem)
					.css("ime-mode", "disabled")
					.on('keyup', function(e) {
						if (1 < $(this).val().length) {
							$(this).val($(this).val().replace(/[^(A-z-@.0-9)]/g, ""));
						}
					});
			}
		};
	});
	
	mz.comm.directive('emailChtbot', function() {
		return {
			restrict: 'A',
			link: function(scope, elem, attrs) {
					$(elem)
						.css("ime-mode", "disabled")
						.on('keyup', function(e) {
							if (1 < $(this).val().length) {
								$(this).val($(this).val().replace(/[^0-9a-zA-Z\@._-]/g, ""));
							}
						});
			}
		};
	});

	mz.comm.directive('disNumber', function() {
		return {
			restrict: 'A',
			link: function(scope, elem, attrs) {
				$(elem)
					.on('keyup', function(e) {
						$(this).val($(this).val().replace(/[^\u3131-\u314e|\u314f-\u3163|\uac00-\ud7a3A-z\s]/g, ""));
					});
			}
		};
	});

	mz.comm.directive('commaNumber', function(util) {
		return {
			restrict: 'A',
			link: function(scope, elem, attrs) {
				$(elem)
					.on('keyup', function(e) {
						if (1 < $(this).val().length) {
							var tmp = $(this).val().replace(/[^0-9]/g, "");
							$(this).val(util.addCommas(tmp));
						}
					});
			}
		};
	});

	mz.comm.directive('telNo', mz.mold(function(util) {
		return {
			restrict: 'A',
			link: function(scope, elem, attrs) {
				$(elem)
					.css("ime-mode", "disabled")
					.on('keyup', function(e) {
						if (1 < $(this).val().length) {
							$(this).val($(this).val().replace(/[^0-9]/g, ""));
						}
					})
					.on('focusin', function(e) {
						var that = $(this);
						setTimeout(function() {
							if (that.val() != that.attr("placeholder")) {
								that.attr("maxlength", "11").val(util.replaceAll(that.val(), "-", ""));
							}
						}, 200);
					})
					.on("focusout", function(e) {
						var that = $(this);
						setTimeout(function() {
							if (that.val() != that.attr("placeholder")) {
								that.attr("maxlength", "13").val(util.phoneFormat(that.val()));
							}
						}, 200);
					});
			}
		};
	}));
	
	mz.comm.directive('date', mz.mold(function(util) {
		return {
			restrict: 'A',
			link: function(scope, elem, attrs) {
				$(elem)
					.css("ime-mode", "disabled")
					.on('keyup', function(e) {
						if (1 < $(this).val().length) {
							$(this).val($(this).val().replace(/[^0-9]/g, ""));
						}
					})
					.on('focusin', function(e) {
						var that = $(this);
						setTimeout(function() {
							if (that.val() != that.attr("placeholder")) {
								that.val(util.replaceAll(that.val(), "-", "")).attr("maxlength", "8");
							}
						}, 200);
					})
					.on("focusout", function(e) {
						var that = $(this);
						setTimeout(function() {
							if (that.val() != that.attr("placeholder")) {
								var val = that.val();
								that.attr("maxlength", "10");
								if(val.length == 8) {
									that.val(val.substring(0, 4) + "-" + val.substring(4, 6) + "-" + val.substring(6));
								}
							}
						}, 200);
					});
			}
		};
	}));

	mz.comm.directive('telMaxNo', mz.mold(function(util) {
		return {
			restrict: 'A',
			link: function(scope, elem, attrs) {
				$(elem)
					.css("ime-mode", "disabled")
					.on('keyup', function(e) {
						if (1 < $(this).val().length) {
							$(this).val($(this).val().replace(/[^0-9]/g, ""));
						}
					})
					.on('focusin', function(e) {
						var that = $(this);
						setTimeout(function() {
							if (that.val() != that.attr("placeholder")) {
								that.attr("maxlength", "12").val(util.replaceAll(that.val(), "-", ""));
							}
						}, 200);
					})
					.on("focusout", function(e) {
						var that = $(this);
						setTimeout(function() {
							if (that.val() != that.attr("placeholder")) {
								that.attr("maxlength", "14").val(util.phoneFormat(that.val()));
							}
						}, 200);
					});
			}
		};
	}));

	mz.comm.directive('searchAddr', mz.mold(function(util) {
		return {
			priority: 2,
			restrict: 'A',
			compile: function(element) {
				element.on('compositionstart', function(e) {
					e.stopImmediatePropagation();
				});
			}
		};
	}));

	mz.comm.directive('mzInputText', function() {
		return {
			require: 'ngModel',
			restrict: "A",
			link: function(scope, element, attrs, ctrl) {
				element.bind('compositionstart', function(e) {
					e.stopImmediatePropagation();
				});

				element.on('compositionupdate', function(e) {
					element.triggerHandler('compositionend');
				});
			}
		};
	});

	// uiConsReq
//	mz.comm.directive('uiConsReq', mz.mold(function() {
//		var o = {};
//		o.scope = {
//				callback: '&callback'
//		};
//		o.templateUrl = mz.path('/views/comm/uiConsReq.tpl', true);
//		o.controller = mz.mold(function(co, $scope, $rootScope) {
//			var log = co.get('logger').getLogger('uiConsReq');
//			var http = co.get('http');
//			var util = co.get("util");
//			var bind = co.get("bind");
//			var layerPop = co.get("layerPop");
//			var $timeout = co.get("$timeout");
//			var tmServ = co.get("tmService");
//			var mkt = co.get("mkt");
//			var serviceSlzDate = co.get("slzDate");
//			var SysParking = '0';
//			
//			var $data = $scope[$("[data-ui-cons-req]").attr("id")];
//
//			init();
//
//			function init() {
//				
//				if(		
//								window.location.pathname == '/auto-and-driver/auto/direct-auto-tm.do'
//							|| window.location.pathname == '/auto-and-driver/auto/personal-auto.do' 	
//					){
//					$scope.dircAutoYN = true;
//				}else{
//					$scope.dircAutoYN = false;
//				}
//				
//				$timeout(function() {
//					$("input:radio[name=csSex]").each(function(idx){
//						$(this).parent('div').removeClass(" on");
//					});
//					$("input:radio[name=csSex]").eq(0).prop("checked", true);
//					$("input:radio[name=csSex]:checked").parent('div').addClass(" on");
//				}, 500);
//				
//				$scope.csPdCd = $("[data-ui-cons-req]").attr("pdCd");
//				$scope.csCmCnsTpCd = $("[data-ui-cons-req]").attr("cmCnsTpCd");
//				$scope.isBusiness = $("[data-ui-cons-req]").attr("isBusiness");
//				
//				$scope.csValid = getValid();
//				if ($scope.isBusiness) {
//					$scope.csValid.csBusiness.valid = true;
//					$scope.csValid.csBirth.valid = false;
//				}
//				$scope.csInfo = {};
//
//				retrieveDriAmt();
//				$timeout(function() {
//					styleFormMethod();
//					
//					/**
//					 * �좎쭨�좏깮�� �곕Ⅸ �곷떞�쒓컙 �좏깮媛��� 媛� �ㅼ젙
//					 */
//					bind.select($scope, "csReqDate");
//					$(document.body).on('change',"#csReqDate",function (e) {
//						   var optVal= $("#csReqDate option:selected").val();
//						   $scope.csReqDate = optVal;
//						   $scope.csReqTime= retrieveCsReqTime();
//						   isNowInit();
//					});
//				}, 400);
//				
//				var pam = {bizNtfyLctgCd : 'CF', path : 'path_sysOnOff'};
//				var sysParking = tmServ.getSysOnOff(pam);
//				
//				sysParking.then(function(data){
//					SysParking = data;
//				});
//			}
//
//			/**
//			 * �쒓컙 �ㅼ젙 
//			 */
//			function isNowInit() {
//				if ($scope.csReqDate == $scope.today) {
//					$scope.isNow = true;
//				} else {
//					$scope.isNow = false;
//				}
//				$timeout(function() {
//					replaceSelect($("#csReqTime"));
//				}, 100);
//			}
//			$scope.isShowTime = function(t) {
//				if ($scope.csReqDate != $scope.today) {
//					return true;
//				} else {
//					if ($scope.currentTime < t) {
//						return true;
//					} else {
//						return false;
//					}
//				}
//			}
//
//			$timeout(function() {
//				replaceSelect($("#csReqDate"));
//				replaceSelect($("#csReqTime"));
//				styleFormMethod();
//			}, 400);
//			
//			/**
//			 * @method retrieveDriAmt - �곷떞�щ쭩�쇱떆
//			 */
//			function retrieveDriAmt() {
//
//				//�붾㈃�� 蹂댁뿬吏��� �곷떞�쒓컙
//				$scope.weekDaySlzTime = $rootScope.weekDaySlzTime;
//				$scope.saturdaySlzTime = $rootScope.saturdaySlzTime;
//				$scope.sundaySlzTime = $rootScope.sundaySlzTime;
//				
//				$scope.inCallNmWeek = $rootScope.inCallNmWeek;
//				$scope.inCallNmSat = $rootScope.inCallNmSat;
//				
//				//�좏깮�곷떞�쇱옄
//				$scope.cmDay = $rootScope.cmDay;
//				$scope.csReqDate = angular.isUndefined($scope.cmDay) ? $rootScope.today : $scope.cmDay[0].dt;
//				
//				//�곷떞�쒓컙�ㅼ젙
//				$scope.csReqTime = retrieveCsReqTime();
//			}
//			
//			/**
//			 * 16.11.17 �곷떞�쒓컙�ㅼ젙
//			 */
//			function retrieveCsReqTime() {
//				return serviceSlzDate.retrieveCsReqTime($scope.csReqDate);
//			}
//
//			function getAgree(agr){
//				var arr = new Array();
//				var agrs = agr;
//				this.errMsgCon = "";
//				
//				if(agrs !== undefined){
//					angular.forEach(agrs, function(v, k) {
//						if (v != "Y") {
//							agrYn = 'N';
//							this.errMsgCon = 'NAGRM';
//						}
//						arr.push(v);
//					});
//				}
//				
//				return arr;
//			}
//			
//			function telBan(){
//				
//				if(SysParking === '1'){
//					return "1";
//				}else if(this.errMsgCon === 'NAGRM'){
//					return "1";
//				}else{
//					return "0";
//				}
//				
//				return "0";
//			}
//			
//			/**
//			 * @method registInetCns - �곷떞�좎껌
//			 */
//			function registInetCns(logParam) {
//				var proc = "0";
//				proc = telBan();
//				
//				var pm = {
//					cmCnsParentTpCd: '2101', //�곷떞�좏삎��遺꾨쪟
//					cmCnsTpCd: $scope.csCmCnsTpCd, //�곷떞�좏삎�뚮텇瑜�
//					cmCnsParentTpNm: '蹂댄뿕媛���',
//					pdCd: $scope.csPdCd, //�곹뭹肄붾뱶
//					cmReplyMdCd: '2', //�곷떞諛⑸쾿(1:�대찓��, 2:�꾪솕)
//					cmTelDivCd: '23', //�꾪솕援щ텇(23:�대��꾪솕, 21:�먰깮, 22:吏곸옣)
//					telNo: util.phoneFormat($scope.csInfo.csPhone),
////					rqeDt: $("#csReqDate option:selected").val(), //�붿껌�쇱떆(yyyyMMdd)
////					ctcPsbStTm: $("#csReqTime option:selected").val(), //�붿껌�쒖옉�쒓컙
//					rqeDt: (util.formatDate(new Date(),'yyyymmdd')), //�붿껌�쇱떆(yyyyMMdd)
//					ctcPsbStTm: (util.formatDate(new Date(),'hh24')+'0000'), //�붿껌�쒖옉�쒓컙
//					
//					ctcPsbEdTm: '', //�붿껌醫낅즺�쒓컙
//					pdNm: util.trim($(".top_tit ").text()), //�곹뭹紐�
//					cnsCon: util.trim($(".top_tit ").text()), //�댁슜
//					sndTMDivCd: '1', //TM�꾩넚�щ�
//					cusNm: $scope.csInfo.csName, // 怨좉컼紐�
//					cnsScrPath : 'S',       
//					accountDvrg	:	"3",							//硫뷀떚�� 遺꾧린泥섎━(1:湲곗〈,2:�좉퇋,3:�묒そ)
//					metisFlag				: proc,					//1�대㈃ 硫뷀떚�� �ㅽ뻾 �덈릺寃� �섎㉧吏�媛믪� �꾨� �덉슜
//					smsFlag					: proc					//1�대㈃ 臾몄옄�꾩넚 �ㅽ뻾 �덈릺寃� �섎㉧吏�媛믪� �꾨� �덉슜
//				};
//				if(logParam){
//					pm['ctcMdiaNo'] = logParam.ctcMdiaNo;
//				}
//				if ($scope.csInfo.csBirth != null && $scope.csInfo.csBirth != '') {
//					pm.rsIdNo = $scope.csInfo.csBirth.substr(2, 6) + $("[name=csSex]:checked").val() + "000000";
//				} else {
//					pm.rsIdNo = "000000" + $("[name=csSex]:checked").val() + "000000";
//				}
//
//				if (pm.cmCnsTpCd == "2102") {
//					pm.cmCnsTpNm = "�먮룞李�";
//				} else if (pm.cmCnsTpCd == "2103") {
//					pm.cmCnsTpNm = "�댁쟾��/嫄닿컯/�대┛��";
//				} else if (pm.cmCnsTpCd == "2104") {
//					pm.cmCnsTpNm = "�곌툑/��異�";
//					rtnMdiaInfo(logParam.ctcMdiaNo , pm);
//				} else if (pm.cmCnsTpCd == "2105") {
//					pm.cmCnsTpNm = "�붿옱/�앺솢";
//					rtnMdiaInfo(logParam.ctcMdiaNo , pm);
//				}
//				if ($scope.isBusiness) { 
//					pm.cnsCon = util.trim($(".top_tit ").text()) + " " + $("#csBusiness").val();
//				}
//				
//				http.post("f.cg.he.ct.ts.o.bc.InetCnsBc.registInetCns", pm).then(function(result) {
//					log.out(result.body.SMS.con);
//					if (result) {
//						if (result.header && result.header.prcesResultDivCd == '0') {
//							$scope.callback && $scope.callback(
//									{
//										data: {
//											agrees : getAgree(logParam.agrees),
//											ctcStgeCd : '3090',
//											errMsgCon : result.body.errMsgCon
//										}
//									}
//							);
//							if("60777|60846|60848|60851|60855|60856|71501".indexOf($scope.csPdCd) > -1)//�대깽�몄젣��(�곌툑,��異�,耳��댄봽由�,�щЪ,�깃났,M-PLEX,�먮룞李쮂M)
//								pm.event = false;
//							else pm.event = true; 
//							
//							$scope.inqComplete(pm);
//						} else {
//							layerPop.alert(result.msg.standMsg);
//						}
//					}
//					$timeout(function() {
//						styleFormMethod();
//					}, 100);
//				});
//			}
//
//			// �곷떞�좎껌�꾨즺
//			$scope.inqComplete = function(item) {
//				var ctcMdiaNo = item.ctcMdiaNo;
//				layerPop.open('lypop_pdInquiry', 'biz/pd/pd/comm/lypop_pdInquiry', item).then(function(result) {
//					if(ctcMdiaNo == 'TAN1703NI000001' || ctcMdiaNo == 'TSY1703NI000001') {
//						$('#ly_dir_cs input[type="text"]').val("");	
//					} else {
//						closeCsEvents();
//					}
//					//$route.reload();
//					
//				});
//			};
//
//			function rtnMdiaInfo(ctcMdiaNo, param){
//				if(ctcMdiaNo != undefined && param != undefined){
//					if(ctcMdiaNo == 'THF1703NI000001'){
//						param.ctcMdiaNm = "硫붾━痢� �곕━吏묐낫�� M-House";
//					}else if(ctcMdiaNo == 'TPM1703NI000001'){
//						param.ctcMdiaNm = "硫붾━痢� �щЪ蹂댄뿕 �깃났硫붿씠��";
//					}else if(ctcMdiaNo == 'TPL1703NI000001'){
//						param.ctcMdiaNm = "硫붾━痢� �깃났�ъ뾽�� 醫낇빀蹂댄뿕";
//					}else if(ctcMdiaNo == 'TPX1703NI000001'){
//						param.ctcMdiaNm = "臾대같�� 硫붾━痢� M-PLEX�щЪ蹂댄뿕";
//					}else if(ctcMdiaNo == 'TAN1703NI000001'){
//						param.ctcMdiaNm = "�곌툑��異뺤넀�대낫�� �명썑�앺솢吏��댁씠蹂댄뿕";
//					}else if(ctcMdiaNo == 'TSY1703NI000001'){
//						param.ctcMdiaNm = "紐⑥븘Rich��異뺣낫��";
//					}else{
//						return;
//					}
//					
//					param.accountDvCd = "PI";
//					param.infwDivCd = "2001";
//					param.infwDivNm = "吏곸젒諛⑸Ц";
//				}
//			}
//			
//			// 17.03.07 �곷떞�좎껌 �뱀젙 李⑤떒 �꾪솕踰덊샇 ( �룹옄由� 0000 �ы븿 �쒖뼱)
//			function blockTelNo(val) {
//				var flag = false;
//				var blockNoObj = ["01020000000"];
//				
//				if(blockNoObj.indexOf(val)>-1){
//					flag = true;
//				}else if((util.isRangeLength(val, 9, 11)==true)&&val.substring(7, 11) =="0000"){ 
//					flag = true;
//				}
//				return flag;
//			}
//			
//			
//			// 蹂댁옣�댁슜
//			$scope.goGuarantee = function() {
//				util.goScroll('guarantee');
//			};
//			
//			
//			// 媛��낆삁��
//			$scope.showInfo = function() {				
//				if($scope.csPdCd == '60122' || $scope.csPdCd == '61522'){					// �명썑�앺솢吏��댁씠蹂댄뿕
//					layerPop.open('lypop_odagLifeGrdnIns', 'biz/pd/pa/annsavins/lypop_odagLifeGrdnIns',{pdCd:"60122"}).then(function(result) {});
//				}else if($scope.csPdCd == '60425' || $scope.csPdCd == '61521'){		// 紐⑥븘 Rich��異뺣낫��
//					layerPop.open('lyPop_savIns', 'biz/pd/pa/savins/lyPop_savIns',{pdCd:"60425"}).then(function(result) {});
//				}else if($scope.csPdCd == '60455' || $scope.csPdCd == '61516'){		// �곕━吏묐낫�� M-House
//					layerPop.open('lypop_husInsMHouse', 'biz/pd/pf/fireins/lypop_husInsMHouse',{pdCd:"60455"}).then(function(result) {});
//				}else if($scope.csPdCd == '60771' || $scope.csPdCd == '61517'){		// �щЪ蹂댄뿕 �깃났硫붿씠��
//					layerPop.open('lypop_propIns', 'biz/pd/pf/fireins/lypop_propIns',{pdCd:"60771"}).then(function(result) {});
//				}else if($scope.csPdCd == '60549' || $scope.csPdCd == '61274'){		// M-PLEX�щЪ蹂댄뿕
//					layerPop.open('lypop_mPlexPropIns', 'biz/pd/pf/fireins/lypop_mPlexPropIns',{pdCd:"60549"}).then(function(result) {});
//				}else if($scope.csPdCd == '60571' || $scope.csPdCd == '60901'){		// The利먭굅�� �쒕땲�대낫�λ낫��
//					layerPop.open('lypop_seniGurtIns', 'biz/pd/ph/diszins/lypop_seniGurtIns',{pdCd:"60571"}).then(function(result) {});
//				}else if($scope.csPdCd == '60684' || $scope.csPdCd == '61515'){		// �깃났�ъ뾽��
//					layerPop.open('lypop_sucBizpeSythIns', 'biz/pd/pf/fireins/lypop_sucBizpeSythIns',{pdCd:"60684"}).then(function(result) {});
//				}
//			};
//			
//			// �곷떞�덉빟�좎껌
//			$scope.reservation = function(parent) {
//				
////				var chekName  = "";
////				var chekBirth    = "";
////				var chekPhone = "";
//				
////				if($scope.csPdCd == '60425' || $scope.csPdCd == '61521' || $scope.csPdCd == '60122' || $scope.csPdCd == '61277'){
////					
////					
////					
////					chekName = angular.element('#csName').val();
////					chekBirth = angular.element('#csBirth').val();
////					chekPhone = angular.element('#csPhone').val();
////					
////					// uiConsReq.tpl濡� �먮윭媛� �섍꺼二쇰뒗 濡쒖쭅 �꾩슂
////					
////					$data.er.csName = !chekName;
////					$data.er.csBirth = !chekBirth;
////					$data.er.csPhone = !chekPhone;
////					
////					//$scope.csInfo = !chekName;
////					
////					
////					/** 湲곗〈諛⑹떇
////					 *  js�뚯씪
////					 *    var $data = $scope[$("[data-ui-tm-sub]").attr("id")]; �좎뼵 ��
////					 *    
////					 *    var chekName = valiSpace(angular.element('#ccName').val());
////					 *    $data.er.name = !chekName;					//�대쫫
////					 *    
////					 *    tpl�뚯씪
////					 *    <div class="bx_valid {{tm.er.name? 'error' : ''}}">
////					 */
////				}
//				
//				if(blockTelNo($scope.csInfo.csPhone)){
//					layerPop.alert('�곕씫泥섎� �뺥솗�� �낅젰�섏꽭��.');  
//					return ;
//				}
//				parent = parent.$parent;
//				if ($scope.csValidation()) {
//					// 14�� 誘몃쭔 �좎껌遺덇�.(�ㅽ겕由쏀듃 �ㅻ쪟... �뚯뒪�몃� �꾪빐�� �꾩떆 二쇱꽍)
////					if(birthChk()) {
////						if(parent.logSetPm){
////							saveLog('CS','3010',parent.logSetPm);	
////						}
////						layerPop.open('lypop_privacyInq', 'biz/pd/pd/comm/lypop_privacyInq').then(function(result) {
////							if (result.code) {
////								registInetCns(parent.logSetPm);
////							}
////						});
////					}else{
////						layerPop.alert('留� 14�� 誘몃쭔�� 寃쎌슦 �좎껌�� 遺덇��⑸땲��.');
////					}
//					
//					// �뚰듃�ㅻ� �꾪븳 �꾩떆 �묒뾽
//					if($scope.csPdCd == "61115" || $scope.csPdCd == "61116" || $scope.csPdCd == "61087" || $scope.csPdCd == "61517") {			// �щЪ蹂댄뿕, �깃났�ъ뾽��, M-PLEX 蹂댄뿕�� �앸뀈�붿씪 �낅젰 �놁쓬						
//						if(parent.logSetPm){
//							saveLog('CS','3010',parent.logSetPm);	
//						}
//						layerPop.open('lypop_privacyInq', 'biz/pd/pd/comm/lypop_privacyInq').then(function(result) {
//							if (result.code) {
//								parent.logSetPm.agrees = result;
//								registInetCns(parent.logSetPm);
//							}
//						});
//					} else {
//						if(birthChk()) {
//							if(parent.logSetPm){
//								saveLog('CS','3010',parent.logSetPm);	
//							}
//							layerPop.open('lypop_privacyInq', 'biz/pd/pd/comm/lypop_privacyInq').then(function(result) {
//								if (result.code) {
//									if(!parent.logSetPm){
//										parent.logSetPm = {};
//									}
//									parent.logSetPm.agrees = result;
//									registInetCns(parent.logSetPm);
//								}
//							});
//						}else{
//							layerPop.alert('留� 14�� 誘몃쭔�� 寃쎌슦 �좎껌�� 遺덇��⑸땲��.');
//						}
//					}
//					//test end					
//					
//				}
//			};
//			
//			function birthChk() {
//				
//				var date = new Date();
//				var year = date.getFullYear();
//				var month = (date.getMonth()+1);
//				var day = date.getDate();
//				if(month < 10) month = '0'+month;
//				if(day <10) day = '0'+day;
//				var monthDay = month + day;
//
//				var birth = $scope.csInfo.csBirth;
//				var birthdayy = birth.substr(0,4);
//				var birthdaymd = birth.substr(4,4);
//
//				var age = monthDay < birthdaymd ? year - birthdayy - 1 : year - birthdayy;
//
//	 			if(age < 15) {
//	 				return false;
//	 			}else{
//	 				return true;
//	 			}
//			}
//
//			function saveLog(divCd,ctcStgeCd,logSetPm){
//				logSetPm['ctcStgeCd'] = ctcStgeCd;
//				logSetPm['divCd'] = divCd;
//				logSetPm.dsgDivCd = '2';
//				var logParam = mkt.setLogParam(logSetPm);
//				logParam.telArNo = '';
//				logParam.telSnoDect = '';
//				logParam.telofNo = '';
//				mkt.saveLog(logParam);
//			}
//
//			/**
//			 * Validation
//			 */
//			function getValid() {
//				var valid = {
//					csName: {
//						error: false,
//						msg: '�대쫫�� �뺥솗�� �낅젰�섏꽭��.',
//						select: false,
//						valid: true,
//						intxt:'#csName'
//					},
//					csBirth: {
//						error: false,
//						msg: '�앸뀈�붿씪�� �뺥솗�� �낅젰�섏꽭��.',
//						select: false,
//						valid: true,
//						intxt:'#csBirth'
//					},
//					csBusiness: {
//						error: false,
//						msg: '�낆쥌�� �좏깮�섏꽭��.',
//						select: true,
//						valid: false,
//						intxt:'#csBusiness'
//					},
//					csPhone: {
//						error: false,
//						msg: '�곕씫泥섎� �뺥솗�� �낅젰�섏꽭��.',
//						select: false,
//						valid: true,
//						intxt:'#csPhone'
//					}
//				};
//				return valid;
//			}
//
//			$scope.csValidation = function($event) {
//				var isAll = true;
//				if ($event) {
//					isAll = false;
//				}
//				var validResult = true;
//				if (!isAll) {
//					validResult = valid($event.currentTarget);
//				} else {
//					var resArr = new Array();
//					var sr = true;
//					_.each($scope.csValid, function(v, k) {
//						if (v.valid) {
//							if (sr) {
//								sr = valid('#' + k);
//								resArr.push(sr);
//								if (!sr) {
//									$(v.intxt).focus();
//								}
//							}
//						}
//					});
//					if (_.contains(resArr, false)) {
//						validResult = false;
//					}
//				}
//
//				$timeout(function() {
//					errorMthod();
//				}, 50);
//
//				function valid(target) {
//					var elem = $(target);
//					var id = elem.attr("id");
//					var val;
//
//					/**
//					 * ���됲듃 諛뺤뒪 泥섎━
//					 */
//					if ($scope.csValid[id].select) {
//						val = elem.val();
//					} else {
//						val = $scope.csInfo[id];
//					}
//
//					var result = true;
//					if (_.isUndefined(val) || _.isNull(val) || val == '') {
//						$scope.csValid[id].error = true;
//						result = false;
//					} else {
//						$scope.csValid[id].error = false;
//						if ('csBirth' == id && !util.isDate(val)) {
//							$scope.csValid[id].error = true;
//							result = false;
//						} else if ('csPhone' == id && (!util.isNumeric(val) || !util.isRangeLength(val, 9, 11))) {
//							$scope.csValid[id].error = true;
//							result = false;
//						} else if ('csAgree1' == id && !elem.prop('checked')) {
//							$scope.csValid[id].error = true;
//							result = false;
//						} else if ('csAgree2' == id && !elem.prop('checked')) {
//							$scope.csValid[id].error = true;
//							result = false;
//						}
//					}
//					return result;
//				}
//
//				return validResult;
//			};
//		});
//		return o;
//	}));

	/*// uiInsCalc
	mz.comm.directive('uiInsCalc', mz.mold(function() {
		var o = {};
		o.templateUrl = mz.path('/views/comm/uiInsCalc.tpl', true);
		o.scope = {
			pdCd: '@pdCd',
			cmCntTpCd: '@cmCntTpCd',
			callback: '&callback'
		};
		o.controller = mz.mold(function(co, $scope) {
			var log = co.get('logger').getLogger('uiInsCalc');
			var http = co.get('http');
			var util = co.get("util");
			var layerPop = co.get("layerPop");
			var tmServ = co.get("tmService");
			var $timeout = co.get("$timeout");
			var mkt = co.get("mkt");
			var SysParking = '0';

			init();

			function init() {
				$scope.ccPdCd = $("[data-ui-ins-calc]").attr("pdCd");
				$scope.ccCmCnsTpCd = $("[data-ui-ins-calc]").attr("cmCnsTpCd");
				$scope.ccValid = getValid();
				$scope.ccInfo = {};
				
				//�대쭣媛숈� �대┛�대낫�� �꾩떆議곗튂
				if($scope.ccPdCd == "MCI") {
					$scope.calTitle = "�먮� 蹂댄뿕猷� �뺤씤";
				} else {
					$scope.calTitle = "�� 蹂댄뿕猷� �뺤씤";
				}			
				
				$timeout(function() {
					styleFormMethod();
				}, 400);
				
				var pam = {bizNtfyLctgCd : 'CF', path : 'path_sysOnOff'};
				var sysParking = tmServ.getSysOnOff(pam);
				
				sysParking.then(function(data){
					SysParking = data;
				});
			}

			
			function getAgree(agr){
				var arr = new Array();
				var agrs = agr;
				this.errMsgCon = "�뺤긽";
				
				if(agrs !== undefined){
					angular.forEach(agrs, function(v, k) {
						if (v != "Y") {
							agrYn = 'N';
							this.errMsgCon = 'NAGRM';
						}
						arr.push(v);
					});
				}
				
				return arr;
			}
			
			*//**
			 * @method retrieveInsCalc - 怨꾩궛
			 *//*
			function retrieveInsCalc(logParam) {
				var pm = {
					pdCd: rtnChangePdcd($scope.ccPdCd), //�곹뭹肄붾뱶
					gender: $("[name=ccSex]:checked").val(),
					birthday: $scope.ccInfo.ccBirth
				};
				http.post("f.cg.he.pd.pd.o.bc.InsCalcBc.insCalc", pm).then(function(result) {
					if (result) {
						//prcesResultDivCd 0 �대㈃�깃났, 1 �대㈃�ㅽ뙣
						if (result.header && result.header.prcesResultDivCd == '0') {
							if (result.body.isPossible) {
								premInetCns(result,logParam);
							} else {
								if (result.body.amount == '0' && result.body.isPdCd) {
									layerPop.alert("留� " + result.body.minAge + "~" + result.body.maxAge + "�� 源뚯�留� 媛��낃��ν빀�덈떎.");
								} else {
									layerPop.alert("�곗씠�곌� �놁뒿�덈떎.");
								}
							}
						} else {
							//�ㅽ뙣�� �먮윭硫붿떆吏� 泥섎━
							layerPop.alert(result.msg.standMsg);
							return false;
						}
					}
				});
			}
			
			function telBan(){
				
				if(SysParking === '1'){
					return "1";
				}else if(this.errMsgCon === 'NAGRM'){
					return "1";
				}else{
					return "0";
				}
				
				return "0";
			}

			function premInetCns(result,logParam) {
				var proc = "0";
				var _ = this;
				var arrAgree = getAgree(logParam.agrees);
				var rstBody = result.body;
				
				proc = telBan();
				
				var pm = {
					cmCnsParentTpCd: '2101', //�곷떞�좏삎��遺꾨쪟
					cmCnsTpCd: $scope.ccCmCnsTpCd, //�곷떞�좏삎�뚮텇瑜�
					accountDvCd : 'PI',
					cmCnsParentTpNm: '蹂댄뿕媛���',
					pdCd: $scope.ccPdCd, //�곹뭹肄붾뱶
					cmReplyMdCd: '', //�곷떞諛⑸쾿(1:�대찓��, 2:�꾪솕)
					cmTelDivCd: '23', //�꾪솕援щ텇(23:�대��꾪솕, 21:�먰깮, 22:吏곸옣)
					telNo: util.phoneFormat($scope.ccInfo.ccPhone),
					rqeDt:'', //�붿껌�쇱떆(yyyyMMdd)
					ctcPsbStTm: '', //�붿껌�쒖옉�쒓컙
					ctcPsbEdTm: '', //�붿껌醫낅즺�쒓컙
					pdNm: util.trim($(".top_tit ").text()), //�곹뭹紐�
					cnsCon: "[怨꾩궛�쒕낫�섎즺] " + result.body.amount + "��", //�댁슜
					sndTMDivCd: '1', //TM�꾩넚�щ�
					cusNm: $scope.ccInfo.ccName, // 怨좉컼紐�
					cnsScrPath : 'S'
					,accountDvrg			: "3"											//硫뷀떚�� 遺꾧린泥섎━(1:湲곗〈,2:�좉퇋,3:�묒そ)
					,metisFlag				: proc										//1�대㈃ 硫뷀떚�� �ㅽ뻾 �덈릺寃� �섎㉧吏�媛믪� �꾨� �덉슜
					,smsFlag					: proc										//1�대㈃ 臾몄옄�꾩넚 �ㅽ뻾 �덈릺寃� �섎㉧吏�媛믪� �꾨� �덉슜
				};
				if(logParam){
					pm['ctcMdiaNo'] = logParam.ctcMdiaNo;
				}
				var ccSex = '';
				if( $("[name=ccSex]:checked").val() =='M'){
					ccSex = '1';
				}else if($("[name=ccSex]:checked").val() =='F'){
					ccSex = '2';
				}
				
				if ($scope.ccInfo.ccBirth != null && $scope.ccInfo.ccBirth != '') {
					pm.rsIdNo = $scope.ccInfo.ccBirth.substr(2, 6) + ccSex + "000000";
				} else {
					pm.rsIdNo = "000000" + ccSex + "000000";
				}

				if (pm.cmCnsTpCd == "2102") {
					pm.cmCnsTpNm = "�먮룞李�";
				} else if (pm.cmCnsTpCd == "2103") {
					pm.cmCnsTpNm = "�댁쟾��/嫄닿컯/�대┛��";
				} else if (pm.cmCnsTpCd == "2104") {
					pm.cmCnsTpNm = "�곌툑/��異�";
					rtnMdiaInfo(logParam.ctcMdiaNo , pm);
				} else if (pm.cmCnsTpCd == "2105") {
					pm.cmCnsTpNm = "�붿옱/�앺솢";
				}
				// 
				http.post("f.cg.he.ct.ts.o.bc.InetCnsBc.premInetCns", pm).then(function(result) {
					if (result) {
						if (result.header && result.header.prcesResultDivCd == '0') {
							$scope.callback && $scope.callback({
								data: {
									result: true,
									name: $scope.ccInfo.ccName,
									amount: rstBody.amount,
									pdList: rstBody.pdList,
									agrees : getAgree(logParam.agrees),
									errMsgCon : result.body.errMsgCon === undefined ? _.errMsgCon : result.body.errMsgCon
								}
							});
						} else {
							//layerPop.alert(result.msg.standMsg);
							log.out("premInetCns fail");
						}
					}
					$timeout(function() {
						styleFormMethod();
					}, 100);
				});
			}
			
			function rtnMdiaInfo(ctcMdiaNo, param){
				if(ctcMdiaNo != undefined && param != undefined){
					if(ctcMdiaNo == 'TAN1703NI000001'){
						param.ctcMdiaNm = "�곌툑��異뺤넀�대낫�� �명썑�앺솢吏��댁씠蹂댄뿕";
					}else if(ctcMdiaNo == 'TSY1703NI000001'){
						param.ctcMdiaNm = "紐⑥븘Rich��異뺣낫��";
					}else{
						return;
					}
					param.accountDvCd = "PI";
					param.infwDivCd = "2001";
					param.infwDivNm = "吏곸젒�묒냽";
				}
			}
			
			function rtnChangePdcd(ccpdcd){
				if(ccpdcd == "61094"){
					ccpdcd = "60855";
				}else if(ccpdcd == "61095"){
					ccpdcd = "60856";
				}else{
					return ccpdcd;
				}
				return ccpdcd;
			}
			
			// 17.03.07 �곷떞�좎껌 �뱀젙 李⑤떒 �꾪솕踰덊샇 ( �룹옄由� 0000 �ы븿 �쒖뼱)
			function blockTelNo(val) {
				var flag = false;
				var blockNoObj = ["01020000000"];
				if(blockNoObj.indexOf(val)>-1){
					flag = true;
				}else if((util.isRangeLength(val, 9, 11)==true)&&val.substring(7, 11) =="0000"){ 
					flag = true;
				}
				return flag;
			}

			// 怨꾩궛�좎껌
			$scope.calculation = function(parent) {
				// 
				if(blockTelNo($scope.ccInfo.ccPhone)){
					layerPop.alert('�곕씫泥섎� �뺥솗�� �낅젰�섏꽭��.');
					return ;	
				}
				if ($scope.ccValidation()) {
					// �퀾om媛숈� �대┛�� 蹂댄뿕�� 寃쎌슦 �쒖쇅
					if($scope.ccPdCd == "MCI") {
						if(parent.logSetPm){
							saveLog('CC','3010',parent.logSetPm);	
						}
						layerPop.open('lypop_privacyInsur', 'biz/pd/pd/comm/lypop_privacyInsur').then(function(result) {
							if (result.code) {
								parent.logSetPm.agrees = result;
								retrieveInsCalc(parent.logSetPm);
							}
						});
					} else {
						// 14�� 誘몃쭔 �좎껌遺덇�.
						if(birthChk()) {
							if(parent.logSetPm){
								saveLog('CC','3010',parent.logSetPm);	
							}
							layerPop.open('lypop_privacyInsur', 'biz/pd/pd/comm/lypop_privacyInsur').then(function(result) {
								if (result.code) {
									parent.logSetPm.agrees = result;
									retrieveInsCalc(parent.logSetPm);
								}
							});
						}else{
							layerPop.alert('留� 14�� 誘몃쭔�� 寃쎌슦 �좎껌�� 遺덇��⑸땲��.');
						}
					}					
				}
			};

			function birthChk() {
				
				var date = new Date();
				var year = date.getFullYear();
				var month = (date.getMonth()+1);
				var day = date.getDate();
				if(month < 10) month = '0'+month;
				if(day <10) day = '0'+day;
				var monthDay = month + day;

				var birth = $scope.ccInfo.ccBirth;
				var birthdayy = birth.substr(0,4);
				var birthdaymd = birth.substr(4,4);

				var age = monthDay < birthdaymd ? year - birthdayy - 1 : year - birthdayy;

	 			if(age < 15) {
	 				return false;
	 			}else{
	 				return true;
	 			}
			}
			
			function saveLog(divCd,ctcStgeCd,logSetPm){
				logSetPm['ctcStgeCd'] = ctcStgeCd;
				logSetPm['divCd'] = divCd;
				logSetPm.dsgDivCd = '1';
				var logParam = mkt.setLogParam(logSetPm);
				logParam.telArNo = '';
				logParam.telSnoDect = '';
				logParam.telofNo = '';
				log.out(logParam);
				mkt.saveLog(logParam);
			}

			*//**
			 * Validation
			 *//*
			function getValid() {
				var valid = {
					ccName: {
						error: false,
						msg: '�대쫫�� �뺥솗�� �낅젰�섏꽭��.',
						intxt:'#ccName'
					},
					ccBirth: {
						error: false,
						msg: '�앸뀈�붿씪�� �뺥솗�� �낅젰�섏꽭��.',
						intxt:'#ccBirth'
					},
					ccPhone: {
						error: false,
						msg: '�곕씫泥섎� �뺥솗�� �낅젰�섏꽭��.',
						intxt:'#ccPhone'
					}
				};
				return valid;
			}

			$scope.ccValidation = function($event) {
				var isAll = true;
				if ($event) {
					isAll = false;
				}
				var validResult = true;
				if (!isAll) {
					validResult = valid($event.currentTarget);
				} else {
					var resArr = new Array();
					var sr = true;
					_.each($scope.ccValid, function(v, k) {
						if (sr) {
							sr = valid('#' + k);
							resArr.push(sr);
							if (!sr) {
								$(v.intxt).focus();		
							}
						}
					});
					if (_.contains(resArr, false)) {
						validResult = false;
					}
				}

				$timeout(function() {
					errorMthod();
				}, 50);

				function valid(target) {
					var elem = $(target);
					var id = elem.attr("id");
					var val = $scope.ccInfo[id];
					var result = true;
					if (_.isUndefined(val) || _.isNull(val) || val == '') {
						$scope.ccValid[id].error = true;
						result = false;
					} else {
						$scope.ccValid[id].error = false;
						if ('ccBirth' == id && !util.isDate(val)) {
							$scope.ccValid[id].error = true;
							result = false;
						} else if ('ccPhone' == id && (!util.isNumeric(val) || !util.isRangeLength(val, 9, 11))) {
							$scope.ccValid[id].error = true;
							result = false;
						} else if ('ccAgree1' == id && !elem.prop('checked')) {
							$scope.ccValid[id].error = true;
							result = false;
						} else if ('ccAgree2' == id && !elem.prop('checked')) {
							$scope.ccValid[id].error = true;
							result = false;
						}
					}
					return result;
				}

				return validResult;
			};
		});
		return o;
	}));*/
	
	// 2016.10.13
	// LNB �ㅻ쭏�몄삤�� 硫붾돱蹂� �쒗뵆由� �ㅼ젙
	/*mz.comm.directive('uiSnbLower', mz.mold(function(co) {
		var o = {};

		o.templateUrl = mz.path('/views/comm/snbLower/uiSnbLower.tpl', true);

		o.controller = mz.mold(function(co, $scope) {
			var log = co.get('logger').getLogger('uiSnbLower');
			var menuService = co.get("menuService");
			var path = co.get("path");
			var pageId = path.getPageId();
			var menu = _.filter(mz.menu, function(info) {
				return menuService.realMenuCheck(info, pageId);
			})[0];
			$scope.dpid = ercmSetting.ercmMenu(menu);
			
		});

		// LNB �묒뾽
		var ercmSetting = (function(){

			var ercmMenu = function(menu){
				var menuId = menu.menuIdn;
				var highId = menu.path.split(">")[0];

				var dpid = '';
				// �먮룞李�/�댁쟾��
				if(menuId == '2001' || highId == '2001') dpid = 'auto_driver_lnb';
				// 嫄닿컯/�대┛��
				else if(menuId == '2014' || highId == '2014') dpid = 'health_kids_lnb';
				// �곌툑/��異�
				else if(menuId == '2041' || highId == '2041') dpid = 'saving_lnb';
				// �붿옱/�앺솢
				else if(menuId == '2051' || highId == '2051') dpid = 'fire_lnb';
				// 蹂댁긽/蹂댄뿕湲덉껌援�
				else if(menuId == '2064' || highId == '2064') dpid = 'compensation_lnb';
				// �명꽣�룰퀬媛앹꽱��
				else if(menuId == '2093' || highId == '2093') dpid = 'my_account_lnb';
				// 蹂몄씤�몄쬆�쇳꽣
				else if(menuId == '2130' || highId == '2130') dpid = 'authentication_lnb';
				// �쒕퉬�ㅻ쭩 李얘린(footer)
				else if(menuId == '2238' || highId == '2238') dpid = 'service_network_lnb';
				// �대깽��
				else if(menuId == '2160' || highId == '2160') dpid = 'event_lnb';
				
				return dpid;
			}
			return { ercmMenu : ercmMenu }
		}());
		return o;
	}));*/

	// uiEcrmPd
	/*mz.comm.directive('uiEcrmPd', mz.mold(function() {
		var o = {};
		o.templateUrl = function(elem, attr) {
			var tplNm = "uiEcrmPd";
			if(attr.tplNm){
				tplNm = attr.tplNm;
			}
			return mz.path('/views/comm/'+tplNm+'.tpl', true);
		}

		o.scope = {
			dpId: '@dpId'
		};
		o.controller = mz.mold(function(co, $scope) {
			var log = co.get('logger').getLogger('uiEcrmPd');
			var http = co.get('http');
			var location = co.get('location');
			var $sce = co.get('$sce');
			var $window = co.get('$window');
			//
			$scope.ecrm = {};
			init();

			$scope.ecrm.showPdInfo = function(item) {
				log.out("showPdInfo click !!", item);
				//click event �꾩넚
				transferEcrmLog(item);
				//�섍꼍�� �곕씪 �붾㈃ �대룞
				if ('M' === mz.device[0]) {
					//mobile
					if (item.prdUrlMob) {
						log.out("prdUrlMob = " + item.prdUrlMob);
						$window.open(item.prdUrlMob);
					}
				} else {
					//PC
					var url = item.prdUrlWeb; 
					var cusId = $scope.ecrm.cusId;
					if(	cusId != "" && (item.reCom == "auto" ||  item.reCom == "mangi")) {
						if(url.indexOf('?') > -1) {
						   url += "&cusId=" + cusId
						} else {
						   url += "?cusId=" + cusId
						}
					}	
					if (url) {
						log.out("prdUrlWeb = " + url);
						$window.open(url);
					}
				}
			};

			function init() {
				$scope.ecrm.cusNm = "";
				$scope.ecrm.cusId = "";
				$scope.ecrm.dpType = '1'; //�곹뭹 disp type 珥덇린媛�(1, 2)
				$scope.ecrm.reCom = ""; //lnb�곸뿭 �곹뭹異붿쿇 �ㅺ컪
				$scope.ecrm.reCom1 = ""; //怨좉컼�쇳꽣�곸뿭 �곹뭹異붿쿇 �ㅺ컪
				$scope.ecrm.urlWeb = "";
				$scope.ecrm.urlMob = "";
				$scope.ecrm.dpList = new Array();
				$scope.ecrm.dpList1 = new Array();
				
				retriveEcrmRcmPdInf();
				
			}

			function retriveEcrmRcmPdInf() {
				var pcid = $window.n_GetCookie('PCID', false);
//				console.log("pcid :::::::::::: " + pcid+"       dp   :::::::::::: " + $scope.dpId);
				
				if(pcid == null || pcid == ''){
//					console.log("##########pcid null###########");
					pcid = "123";
				}
				
				var pm = {
					dp: $scope.dpId,
					pcid: pcid
					//cusId: '10021940018' //test
				};
				http.post("f.cg.he.co.cc.o.bc.ECrmRcmBc.recommend", pm).then(function(result) {
					log.out(result);
					if (result) {
						//prcesResultDivCd 0 �대㈃�깃났, 1 �대㈃�ㅽ뙣
						if (result.header && result.header.prcesResultDivCd == '0') {
							if (result.body.status == "Success") {
								//var dpList = result.body.dpList;
								//log.out(dpList);
								$scope.ecrm.cusNm = result.body.cusNm;
								$scope.ecrm.cusId = result.body.customerId;
								if(result.body.dpList && result.body.dpList.dps[0] && result.body.dpList.dps[0].itemList
										&& result.body.dpList.dps[0].itemList.items){
																		
									if($scope.dpId == 'overview_pc'){//���� �덊럹�댁��곸뿭 (濡쒓렇�몄쟾: �꾨Т寃껊룄 �놁쓬 /濡쒓렇�명썑: 異붿쿇�쒕굹由ъ삤 1媛�) �� GNB�� 紐⑤뱺 �곸뿭 �곸슜
										
										log.out(result.body.dpList.dps[0].itemList.items[0].basisInfo.basisList[4].value);
										log.out(result.body.dpList.dps[0].itemList.items[0].basisInfo.basisList[5].value);
										
										var itemName = result.body.dpList.dps[0].itemList.items[0].basisInfo.basisList[4].value;
										
										$scope.ecrm.clickUrl = result.body.dpList.dps[0].itemList.items[0].clickUrl;
										$scope.ecrm.urlWeb = result.body.dpList.dps[0].itemList.items[0].basisInfo.basisList[5].value;									
										$scope.ecrm.urlMob = result.body.dpList.dps[0].itemList.items[0].basisInfo.basisList[6].value;
										
										//�꾩뾽(�댁썝�ш낵��) 媛뺣젰�붿껌 disp_prd_nm �대쫫�쇰줈 李얘쾶�대떖��(�곹뭹肄붾뱶�� 媛쒖젙�뚮쭏�� 諛붾���.)
										if(itemName.indexOf("�먮룞李�") > -1){
											$scope.ecrm.reCom = "auto";
										}else if(itemName.indexOf("�댁쟾��") > -1){
											$scope.ecrm.reCom = "driver";
										}else if(itemName.indexOf("�ы뻾") > -1){
											$scope.ecrm.reCom = "foreign";
										}else if(itemName.indexOf("�곌툑蹂댄뿕") > -1){
											$scope.ecrm.reCom = "annuity";
										}else if(itemName.indexOf("��") > -1){
											$scope.ecrm.reCom = "cancer";
										}else if(itemName.indexOf("�뺢린�곹빐") > -1){
											$scope.ecrm.reCom = "term";
										}else if(itemName.indexOf("��異뺣낫��") > -1){
											$scope.ecrm.reCom = "saving";
										}else if(itemName.indexOf("�대┛��") > -1){
											$scope.ecrm.reCom = "child";
										}else if(itemName.indexOf("怨⑦봽") > -1){
											$scope.ecrm.reCom = "golf";
										}else if(itemName.indexOf("�ㅼ넀") > -1){
											$scope.ecrm.reCom = "medical";
										}else if(itemName.indexOf("TM_ALPA") > -1){
											$scope.ecrm.reCom = "tmAlpa";
										}else if(itemName.indexOf("TM_DRIVERS") > -1){
											$scope.ecrm.reCom = "tmDrivers";
										}else if(itemName.indexOf("TM_KIDS") > -1){
											$scope.ecrm.reCom = "tmKids";
										}else if(itemName.indexOf("TM_CANCER") > -1){
											$scope.ecrm.reCom = "tmCancer";
										}else if(itemName.indexOf("TM_DENTAL") > -1){
											$scope.ecrm.reCom = "tmDental";
										}else if(itemName.indexOf("TM_OLD") > -1){
											$scope.ecrm.reCom = "tmOld";
										}else if(itemName.indexOf("TM_MEDICAL") > -1){
											$scope.ecrm.reCom = "tmMedical";
										}else if(itemName.indexOf("MANGI") > -1){
											$scope.ecrm.reCom = "mangi";
										}else if(itemName.indexOf("TM_CHIME") > -1){		// 2018-12-03 移섎ℓ蹂댄뿕 異붽�
											$scope.ecrm.reCom = "tmChime";
										}else if(itemName.indexOf("TM_AGREE") > -1){
											$scope.ecrm.reCom = "tmAgree";
										}else if(itemName.indexOf("CM_PET") > -1){	// 2018-12-03 移섎ℓ蹂댄뿕 異붽�
											$scope.ecrm.reCom = "cmPet";		
										}else if(itemName.indexOf("TM_SILSOK") > -1){	// 2019-05-22 �щ컮瑜몄떎�띻굔媛뺣낫�� 異붽�
											$scope.ecrm.reCom = "tmSilsok";					
										}else if(itemName.indexOf("TM_XXX") > -1){
											$scope.ecrm.reCom = "tmXxx";
										}
										
									}else{
										var itemList = result.body.dpList.dps[0].itemList.items;
										_.each(itemList, function(item) {
											//log.out("item : ",item);
											var dpItem = {
												clickUrl: item.clickUrl,
												itemValue: _.find(item.basisInfo.basisList, function(n) {
													return n.key == "ITEM_VALUE";
												}).value,
												itemName: _.find(item.basisInfo.basisList, function(n) {
													return n.key == "ITEM_NAME";
												}).value,
												dpType: _.find(item.basisInfo.basisList, function(n) {
													return n.key == "DP_TYPE";
												}).value,
												prdDesc: $sce.trustAsHtml(_.find(item.basisInfo.basisList, function(n) {
													return n.key == "PRD_DESC";
												}).value),
												dispPrdNm: _.find(item.basisInfo.basisList, function(n) {
													return n.key == "DISP_PRD_NM";
												}).value,
												prdUrlWeb: _.find(item.basisInfo.basisList, function(n) {
													return n.key == "PRD_URL_WEB";
												}).value,
												prdUrlMob: _.find(item.basisInfo.basisList, function(n) {
													return n.key == "PRD_URL_MOB";
												}).value
											};
											
											//if(dpItem.dispPrdNm == undefined) return; // 2018.01.11
											
											//�꾩뾽(�댁썝�ш낵��) 媛뺣젰�붿껌 disp_prd_nm �대쫫�쇰줈 李얘쾶�대떖��(�곹뭹肄붾뱶�� 媛쒖젙�뚮쭏�� 諛붾���.)
											
											if(dpItem.dispPrdNm.indexOf("�먮룞李�") > -1){
												$scope.ecrm.reCom1 = "auto";
											}else if(dpItem.dispPrdNm.indexOf("�댁쟾��") > -1){
												$scope.ecrm.reCom1 = "driver";
											}else if(dpItem.dispPrdNm.indexOf("�ы뻾") > -1){
												$scope.ecrm.reCom1 = "foreign";
											}else if(dpItem.dispPrdNm.indexOf("�곌툑蹂댄뿕") > -1){
												$scope.ecrm.reCom1 = "annuity";
											}else if(dpItem.dispPrdNm.indexOf("��") > -1){
												$scope.ecrm.reCom1 = "cancer";
											}else if(dpItem.dispPrdNm.indexOf("�뺢린�곹빐") > -1){
												$scope.ecrm.reCom1 = "term";
											}else if(dpItem.dispPrdNm.indexOf("��異뺣낫��") > -1){
												$scope.ecrm.reCom1 = "saving";
											}else if(dpItem.dispPrdNm.indexOf("�대┛��") > -1){
												$scope.ecrm.reCom1 = "child";
											}else if(dpItem.dispPrdNm.indexOf("怨⑦봽") > -1){
												$scope.ecrm.reCom1 = "golf";
											}else if(dpItem.dispPrdNm.indexOf("�ㅼ넀") > -1){
												$scope.ecrm.reCom1 = "medical";
											}else if(dpItem.dispPrdNm.indexOf("TM_ALPA") > -1){
												$scope.ecrm.reCom1 = "tmAlpa";
											}else if(dpItem.dispPrdNm.indexOf("TM_DRIVERS") > -1){
												$scope.ecrm.reCom1 = "tmDrivers";
											}else if(dpItem.dispPrdNm.indexOf("TM_KIDS") > -1){
												$scope.ecrm.reCom1 = "tmKids";
											}else if(dpItem.dispPrdNm.indexOf("TM_CANCER") > -1){
												$scope.ecrm.reCom1 = "tmCancer";
											}else if(dpItem.dispPrdNm.indexOf("TM_DENTAL") > -1){
												$scope.ecrm.reCom1 = "tmDental";
											}else if(dpItem.dispPrdNm.indexOf("TM_OLD") > -1){
												$scope.ecrm.reCom1 = "tmOld";
											}else if(dpItem.dispPrdNm.indexOf("TM_MEDICAL") > -1){
												$scope.ecrm.reCom1 = "tmMedical";
											}else if(dpItem.dispPrdNm.indexOf("MANGI") > -1){
												$scope.ecrm.reCom1 = "mangi";
											}else if(dpItem.dispPrdNm.indexOf("TM_CHIME") > -1){	// 2018-12-03 移섎ℓ蹂댄뿕 異붽�
												$scope.ecrm.reCom1 = "tmChime";
											}else if(dpItem.dispPrdNm.indexOf("TM_AGREE") > -1){
												$scope.ecrm.reCom1 = "tmAgree";
											}else if(dpItem.dispPrdNm.indexOf("CM_PET") > -1){ //20190215[m11800501] �ㅻ쭏�몄삤�� 諛곕꼫異붽� (�ロ띁誘쇳듃 or 留덉��낅룞��)
												$scope.ecrm.reCom1 = "cmPet";	
											}else if(dpItem.dispPrdNm.indexOf("TM_SILSOK") > -1){	// 2019-05-22 �щ컮瑜몄떎�띻굔媛뺣낫�� 異붽�
												$scope.ecrm.reCom1 = "tmSilsok";				
											}else if(dpItem.dispPrdNm.indexOf("TM_XXX") > -1){
												$scope.ecrm.reCom1 = "tmXxx";
											}

											// 2016.10.13 異붽�
											$scope.dpItemList = dpItem;
											
											dpItem.reCom = $scope.ecrm.reCom1;
											
											$scope.ecrm.dpType = dpItem.dpType;
											
											if($('#ecrm_default').length > 0){
												$scope.ecrm.dpList1.push(dpItem);
											}else{
												$scope.ecrm.dpList.push(dpItem);
											}
										});
									}
								}
							}
						}
					}
				});
			}
			
			$scope.ecrm.showEcrm = function() {
				
				transferEcrmLog({clickUrl:$scope.ecrm.clickUrl});
				
				if ('M' === mz.device[0]) {
					$window.open($scope.ecrm.urlMob);
				} else {					
					$window.open($scope.ecrm.urlWeb);
				}
			};
			
			*//**
			 * �대┃��, ecrm log �꾩넚
			 *//*
			function transferEcrmLog(pm) {
				//wiselog.ecrmClickLogging(pm.clickUrl);
				$.ajax({
					url : pm.clickUrl,
					dataType: "jsonp"
				});
			}
		});
		return o;
	}));*/
	
	// uiEcrmSnb
	/*mz.comm.directive('uiEcrmSnb', mz.mold(function() {
		var o = {};
		o.templateUrl =  mz.path('/views/comm/uiEcrmSnb.tpl', true);
				
		o.scope = {
			dpId: '@dpId',
			menuIdn: '@menuIdn'
		};
		
		o.controller = mz.mold(function(co, $scope) {
			var log = co.get('logger').getLogger('uiEcrmPd');
			var http = co.get('http');
			var location = co.get('location');
			var $sce = co.get('$sce');
			var $window = co.get('$window');

			$scope.ecrm = {};
			
			var menuIdns ={
				
				 * ctrDivCd
				 * �쇰컲 : 1, �κ린 : 6, �먮룞李� : 7
				 * 
				2100 : {dpid: "Hidden_B", ctrDivCd: "7"}, // 怨꾩빟蹂�寃�
       			2122 : {dpid: "Hidden_A", ctrDivCd: "6"}, // �⑹엯/�섍툒
       			2065 : {dpid: "Hidden_C", ctrDivCd: "6"}  // �곹빐/吏덈퀝 蹂댁긽
			}
			
			$scope.menuIdns = menuIdns;
			
			var bool = false;
			var dpid = "";
			var id = $scope.menuIdn;
			
			for(menu in menuIdns) {
				if(id == menu) {
					bool = true;
					dpid = menuIdns[menu].dpid;
				}
			}
			
			if(bool) {
				$scope.dpid = dpid;
			}
			
		});
		
		return o;
	}));*/

	// uiEcrmSnbSub
	/*mz.comm.directive('uiEcrmSnbSub', mz.mold(function() {
		var o = {};
		o.templateUrl = function(elem, attr) {
			var tplNm = "uiEcrmSnbSub";
			if(attr.tplNm){
				tplNm = attr.tplNm;
			}
			return mz.path('/views/comm/'+tplNm+'.tpl', true);
		}

		o.scope = {
			dpId: '@dpId'
		};
		o.controller = mz.mold(function(co, $scope) {
			var log = co.get('logger').getLogger('uiEcrmPd');
			var http = co.get('http');
			var location = co.get('location');
			var $sce = co.get('$sce');
			var $window = co.get('$window');
			//
			$scope.ecrm = {};
			init();

			$scope.ecrm.showPdInfo = function(item) {
				transferEcrmLog(item);
				
				var url = item.prdUrlWeb; 
				var cusId = $scope.ecrm.cusId;
				if(	cusId != "") {
					if(url.indexOf('?') > -1) {
					   url += "&cusId=" + cusId
					} else {
					   url += "?cusId=" + cusId
					}
				}	
				if (url) {
					log.out("prdUrlWeb = " + url);
					$window.open(url);
				}
				
			};

			function init() {
				$scope.ecrm.cusNm = "";
				$scope.ecrm.cusId = "";
				$scope.ecrm.dpType = '1'; //�곹뭹 disp type 珥덇린媛�(1, 2)
				$scope.ecrm.reCom = ""; //lnb�곸뿭 �곹뭹異붿쿇 �ㅺ컪
				$scope.ecrm.reCom1 = ""; //怨좉컼�쇳꽣�곸뿭 �곹뭹異붿쿇 �ㅺ컪
				$scope.ecrm.urlWeb = "";
				$scope.ecrm.urlMob = "";
				$scope.ecrm.dpList = new Array();
				$scope.ecrm.dpList1 = new Array();
				
				http.post('f.cg.he.co.cc.o.bc.SessionRouteBc.getSessionUserInfo', {}, false).then(function(result) {
					if (result && result.body && result.body.userInfo) {
						var dpid = $scope.dpId
						if(dpid) {
							//�듯빀怨꾩빟議고쉶
							http.post('f.cg.he.ct.tm.o.bc.CtrCnfBc.retrieveItgrCtr', {}, false).then(function(ctrResult) {
								var menuIdns = $scope.$parent.menuIdns;
								var menu =  $scope.$parent.menuIdn;
								var key = menuIdns[menu].ctrDivCd;
								var bool = true;
								
								ctrResult.body.ctrList.forEach(function(ctr) {
									if(ctr.ctrDivCd  ==  key)  bool = false;
								});
								
								if(bool) {
									retriveEcrmRcmPdInf();
								}
							});
							
						}
					}
				});
				
			}

			function retriveEcrmRcmPdInf() {
				var pcid = $window.n_GetCookie('PCID', false);
//				console.log("pcid :::::::::::: " + pcid+"       dp   :::::::::::: " + $scope.dpId);
				
				if(pcid == null || pcid == ''){
//					console.log("##########pcid null###########");
					pcid = "123";
				}
				
				var pm = {
					dp: $scope.dpId,
					pcid: pcid
					//cusId: '10021940018' //test
				};
				http.post("f.cg.he.co.cc.o.bc.ECrmRcmBc.recommend", pm).then(function(result) {
					log.out(result);
					if (result) {
						//prcesResultDivCd 0 �대㈃�깃났, 1 �대㈃�ㅽ뙣
						if (result.header && result.header.prcesResultDivCd == '0') {
							if (result.body.status == "Success") {
								//var dpList = result.body.dpList;
								//log.out(dpList);
								$scope.ecrm.cusNm = result.body.cusNm;
								$scope.ecrm.cusId = result.body.customerId;
								if(result.body.dpList && result.body.dpList.dps[0] && result.body.dpList.dps[0].itemList
										&& result.body.dpList.dps[0].itemList.items){
									
										var itemList = result.body.dpList.dps[0].itemList.items;
										_.each(itemList, function(item) {
											//log.out("item : ",item);
											var dpItem = {
												clickUrl: item.clickUrl,
												itemValue: _.find(item.basisInfo.basisList, function(n) {
													return n.key == "ITEM_VALUE";
												}).value,
												itemName: _.find(item.basisInfo.basisList, function(n) {
													return n.key == "ITEM_NAME";
												}).value,
												dpType: _.find(item.basisInfo.basisList, function(n) {
													return n.key == "DP_TYPE";
												}).value,
												prdDesc: $sce.trustAsHtml(_.find(item.basisInfo.basisList, function(n) {
													return n.key == "PRD_DESC";
												}).value),
												dispPrdNm: _.find(item.basisInfo.basisList, function(n) {
													return n.key == "DISP_PRD_NM";
												}).value,
												prdUrlWeb: _.find(item.basisInfo.basisList, function(n) {
													return n.key == "PRD_URL_WEB";
												}).value,
												prdUrlMob: _.find(item.basisInfo.basisList, function(n) {
													return n.key == "PRD_URL_MOB";
												}).value
											};
										
										var ecrmIndex = [
								       		  {name: "�먮룞李�", recom: "auto"},
								       		  {name: "�댁쟾��", recom: "driver"},
								       		  {name: "�ы뻾", recom: "foreign"},
								       		  {name: "�곌툑蹂댄뿕", recom: "annuity"},
								       		  {name: "��", recom: "cancer"},
								       		  {name: "�뺢린�곹빐", recom: "term"},
								       		  {name: "��異뺣낫��", recom: "saving"},
								       		  {name: "�대┛��", recom: "child"},
								       		  {name: "怨⑦봽", recom: "golf"},
								       		  {name: "�ㅼ넀", recom: "medical"},
								       		  {name: "TM_ALPA", recom: "tmAlpa"},
								       		  {name: "TM_DRIVERS", recom: "tmDrivers"},
								       		  {name: "TM_KIDS", recom: "tmKids"},
								       		  {name: "TM_CANCER", recom: "tmCancer"},
								       		  {name: "TM_DENTAL", recom: "tmDental"},
								       		  {name: "TM_OLD", recom: "tmOld"},
								       		  {name: "TM_MEDICAL", recom: "tmMedical"},
								       		  {name: "�붿옱", recom: "fire"},
								       		  {name: "MANGI", recom: "mangi"} 
								       	];	
											
										ecrmIndex.forEach(function(obj) {
											if(dpItem.dispPrdNm.indexOf(obj.name) > -1){
												$scope.ecrm.reCom1 = obj.recom;
											}
										});

										// 2016.10.13 異붽�
										$scope.dpItemList = dpItem;
										
										dpItem.reCom = $scope.ecrm.reCom1;
										
										$scope.ecrm.dpType = dpItem.dpType;
										
										if($('#ecrm_default').length > 0){
											$scope.ecrm.dpList1.push(dpItem);
										}else{
											$scope.ecrm.dpList.push(dpItem);
										}
									});
									
								}
							}
						}
					}
				});
			}
			
			$scope.ecrm.showEcrm = function() {
				
				transferEcrmLog({clickUrl:$scope.ecrm.clickUrl});
				
				if ('M' === mz.device[0]) {
					$window.open($scope.ecrm.urlMob);
				} else {					
					$window.open($scope.ecrm.urlWeb);
				}
			};
			
			*//**
			 * �대┃��, ecrm log �꾩넚
			 *//*
			function transferEcrmLog(pm) {
				//wiselog.ecrmClickLogging(pm.clickUrl);
				$.ajax({
					url : pm.clickUrl,
					dataType: "jsonp"
				});
			}
		});
		return o;
	}));	*/
	
	/*
	mz.comm.directive('faqList', mz.mold(function() {
		var o = {};
		
		o.templateUrl = mz.path('/views/comm/faqList.tpl', true);
		
		o.scope = {
			ntbdIdn: '@ntbdIdn',
			vdeoEscCon: '@vdeoEscCon'
		};
		
		o.controller = mz.mold(function(co, $scope) {
			var log      = co.get('logger').getLogger('faqList');
			var location = co.get('location');
			var util     = co.get("util"); 
			var http     = co.get('http');
			var $sce     = co.get('$sce');
			var $timeout = co.get('$timeout');
			
			init();
			
			
			$scope.openFaq = function() {
				location.go('/customer-center/faq.do');
			};
			$scope.getTrustAsHtml = function(html){
				return $sce.trustAsHtml(html);
			};
			
			function pdFaqList() {

				var pm = {
					vdeoesccon : $scope.vdeoEscCon || '',
					ntbdidn : $scope.ntbdIdn  //faq寃뚯떆�� 援щ텇肄붾뱶
				};
				
				log.out("pdFAqList param ########", pm);
				
				http.post('f.cg.he.ct.tq.o.bc.FaqBc.pdFaqList', pm, false).then(function(result) {
					log.out(result);
					if(result) {
						if(result.header && result.header.prcesResultDivCd == '0') {
							//success
							$scope.faqFreList = util.getListData(result.body.list);
							for(var i=0 ; i < $scope.faqFreList.length; i++) {
								$scope.faqFreList[i].dtl = util.replaceAll($scope.faqFreList[i].dtl, '\n', '<br>');
								$scope.faqFreList[i].dtl = util.replaceAll($scope.faqFreList[i].dtl, ' ', '&nbsp;');
							}
							
							$timeout(function() {
								//accordionMethod();
							}, 200);
						}
					}
				});
			}
			
			function init() {
				pdFaqList();
			}
		});
		
		return o;
	}));
	
	//�곹뭹 promotion event
	mz.comm.directive('uiProdEvent', mz.mold(function() {
		var o = {};
		
		o.templateUrl = mz.path('/views/comm/uiProdEvent.tpl', true);
		
		o.controller = mz.mold(function(co, $scope) {
			var log      = co.get('logger').getLogger('uiProdEvent');
			
			init();
			
			function init() {
				log.out("�곹뭹 promotion event directive");
			}
		});
		
		return o;
	}));

	// �ㅻ쭏�몄삤�� �뚮줈�낅같��
	mz.comm.directive('uiSmtflt', mz.mold(function() {
		var o = {};
		
		o.templateUrl = mz.path('/views/biz/ct/td/smtoffrflt/smtfloating.tpl', true);

		o.controller = mz.mold(function(co, $scope, $timeout) {
			var log      = co.get('logger').getLogger('uiSmtflt');
			var http = co.get('http');
			var $window = co.get('$window');
			var menuService = co.get("menuService");
			var path = co.get("path");
			var pageId = path.getPageId();
			var menu = _.filter(mz.menu, function(info) {
				return menuService.realMenuCheck(info, pageId);
			})[0];

			init();

			function init(){
				$scope.ecrm = new Array();
				$scope.ecrmPlus = new Array();
				$scope.fltFlag = false;
				$scope.ecrm.reCom = "";
				$scope.ecrm.cusNm = "";
				$scope.ecrm.cusId = "";
				
				if(menu){
					$scope.menuIdn = menu.menuIdn;
					log.out("$scope.menuIdn :",$scope.menuIdn);
				}

				// 濡쒓렇�� �щ�
				http.post('f.cg.he.co.cc.o.bc.SessionRouteBc.getSessionUserInfo', {}, false).then(function(result) {
					if (result && result.body && result.body.userInfo) {
						angular.forEach(fltMenuMng(), function(value, key) {
							if(!$scope.fltFlag){
								if($scope.menuIdn == value){
									$scope.fltFlag = true;
								}else{
									$scope.fltFlag = false;	
								}	
							}
						});
					}
				}).then(function(){
					if($scope.fltFlag){
						// �ㅻ쭏�몄삤�� (怨좉컼蹂� 異붿쿇)
						ecrm('LOGIN_FLOATING');
						$('.floating_myAccount_con').parent().css('display','block');
					}
				}).then(function(){
					// animate
					setInterval(myAccount_floating.move2,2000);
				});
			}

			// �뚮줈�낅같�� �곸슜硫붾돱
			function fltMenuMng(){
				// 愿�由ъ옄�� �꾩슂
				return $scope.fltMenu = {
						  myAccount : '2093' 	// my account
						, inquiry : '2096'		    // 怨꾩빟�뺤씤
						, application : '2118'	    // 蹂댄뿕怨꾩빟��異� �좎껌
						, lgtmPrmm : '2123'		// �κ린蹂댄뿕猷뚮궔��
						, comsMain : '2064' 	    // 蹂댁긽蹂댄뿕湲덉껌援� 硫붿씤
						,insAmtClmPsst: '2067' //蹂댄뿕湲덉껌援ы쁽��
						,comsDetlInq: '2072'     //蹂댁긽�댁뿭 �뺤씤
						,fireIns: '2051'              //�붿옱/�앺솢
						,ovseTrvIns: '2058'       // �댁쇅�ы뻾蹂댄뿕
						,annSavIns:	'2041'       // �곌툑/��異�
					};
			}

			function pdImgSet(dispPrdNm, no){
				var val = "/default/images/common/float_img";
				var alt = "";
				if(dispPrdNm.indexOf("�먮룞李�") > -1){
					val += "03.png";
					alt = "二쇳뻾嫄곕━ �좎씤 理쒕� 33% �먮룞李⑤낫��";
					$scope.ecrm.reCom = "auto";
				}else if(dispPrdNm.indexOf("�ы뻾") > -1){
					val += "04.png";
					alt = "�ㅻ젅�� �댁쇅�ы뻾 �꾩닔��! �댁쇅�ы뻾蹂댄뿕";
				}else if(dispPrdNm.indexOf("TM_ALPA") > -1){
					val += "01.png";
					alt = "180留뚯씠 �좏깮�� �섎즺�ㅻ퉬蹂댄뿕 �뚰뙆Plus 蹂댁옣蹂댄뿕";
				}else if(dispPrdNm.indexOf("TM_DRIVERS") > -1){
					val += "07.png";
					alt = "�댁쟾�먯쓽 �꾩닔��!! �댁쟾�먮낫��";
				}else if(dispPrdNm.indexOf("TM_KIDS") > -1){
					val += "06.png";
					alt = "�� �꾩씠瑜� �꾪븳! �좏깮! �대┛�대낫��";
				}else if(dispPrdNm.indexOf("TM_CANCER") > -1){
					val += "05.png";
					alt = "李⑤퀎�붾맂 �붿튂猷뚮퉬 蹂댁옣 �붿튂猷뚮낫��";
				}else if(dispPrdNm.indexOf("TM_DENTAL") > -1){
					val += "02.png";
					alt = "�꾪뵆����/釉뚮┸吏� 媛쒖닔 �쒗븳�녿뒗 移섏븘蹂댄뿕";
				}else if(dispPrdNm.indexOf("TM_MEDICAL") > -1){
					val += "08.png";
					alt = "�섎즺�ㅻ퉬蹂댄뿕��  硫붾━痢좏솕�� �섎즺�ㅻ퉬蹂댄뿕";
				}

				// 2017.07.24
				// �대�吏�媛� �녿뒗 寃쎌슦? ( �ㅻ쭏�몄삤�쇱そ�먯꽌 �대�吏�媛� �녿뒗 �곹뭹�� �뷀뤃�몃줈 �ㅼ젙�섏� �딅룄濡� �섍린濡쒗븿 )
				if(!(val.indexOf("png") > -1)){		// 湲곕낯�� �먮룞李⑥씠誘몄�吏�留� �댁“嫄댁쓣 ���� �쇱� �녿룄濡� �대떦�먭� �ㅼ젙�댁쨾�쇳븿
					val += "01.png";
				}

				return no == 1 ? val : alt ;
			}

			function ecrm(dpId){
				var pcid = $window.n_GetCookie('PCID', false);
				
				if(pcid == null || pcid == ''){
					pcid = "123";
				}
				
				var pm = {
					dp: dpId,
					pcid: pcid
				};
				
				$scope.imgUrl = "";
				http.post("f.cg.he.co.cc.o.bc.ECrmRcmBc.recommend", pm).then(function(result) {
					//log.out("result :::: ",result);
					if(result && result.body && result.body.dpList &&  result.body.dpList.dps[0] && result.body.dpList.dps[0].itemList && result.body.dpList.dps[0].itemList && result.body.dpList.dps[0].itemList.items){
						if(result.body.dpList.dps[0].itemList.items.length > 0){
							$scope.items = result.body.dpList.dps[0].itemList.items;
							$scope.ecrm.cusNm = result.body.cusNm;
							$scope.ecrm.cusId = result.body.customerId;
							angular.forEach($scope.items, function(value, key) {

								// 怨좉컼蹂� 異붿쿇 DPID
								if(dpId == 'LOGIN_FLOATING'){
									$scope.ecrmSet(value);

									if($scope.ecrm.length == 1){		// 留덉�留됱뿉 �볦븘以� 泥ル쾲吏� �곹뭹 ����
										$scope.ecrmPlusSet(value);
									}else if($scope.ecrm.length == 3){	// 泥ル쾲吏� ���ν빐以� �곹뭹 留덉�留됱뿉 異붽�
										$scope.ecrmAdd();
									}
								}else{
								// 湲곕낯 異붿쿇 DPID
									if($scope.ecrm.length == 0){
										if(result.body.dpList.dps[0].itemList){
											$scope.ecrmSet(value);
										}

										// 泥ル쾲吏� ecrm value ����
										if($scope.ecrm.length == 1){
											$scope.ecrmPlusSet(value);
										}
									// 湲곕낯吏��� DPID (LOGIN_FLOATING_v2)
									}else if($scope.ecrm.length < 3){
										$scope.vFlag = true;
										var i = 0;
										$scope.cmprEcrm = result.body.dpList.dps[0].itemList.items;
										
										if(typeof $scope.ecrm[key] != 'undefined'){
											angular.forEach($scope.cmprEcrm, function(v, k) {
												if($scope.ecrm.length+i < 3){
													if($scope.ecrm[k].itemVal != value.basisInfo.basisList[0].value){
														$scope.ecrmSet(value);
														i++;
													}
												}
											});
										}else{
											if($scope.ecrm[key-1].itemVal != value.basisInfo.basisList[0].value){
												// �ъ슜�� 異붿쿇�곹뭹怨� 以묐났�쒖쇅�섍쾶 Defulat 異붿쿇
												$scope.ecrmSet(value);
											}
										}
										if($scope.ecrm.length == 3){
											$scope.ecrmAdd();
										}
									}
								}
							});
							//log.out("$scope.ecrm: ",$scope.ecrm);
						}
					}
				}).then(function(){
					if(dpId != 'LOGIN_FLOATING_v2'){
						// �ㅻ쭏�몄삤��1 
						ecrm('LOGIN_FLOATING_v2');	
					}
				});
			}

			// 異붿쿇�곹뭹 �ㅼ젙
			$scope.ecrmSet = function(value){
				
				//201906 �ㅻ쪟�섏젙 ecrm 由ы꽩媛믪씠 �녿뒗 寃쎌슦 怨듬�泥섎━
				$scope.ecrm.push({
					  itemVal : value.basisInfo.basisList[0] ? value.basisInfo.basisList[0].value : ""
					, prdImgBurl : value.basisInfo.basisList[8] ? value.basisInfo.basisList[8].value : ""
					, webUrl : value.basisInfo.basisList[5] ? value.basisInfo.basisList[5].value : ""
					, clickUrl :value.clickUrl
					, imgUrl : value.basisInfo.basisList[4] ? pdImgSet(value.basisInfo.basisList[4].value, 1) : ""
					, alt : value.basisInfo.basisList[4] ? pdImgSet(value.basisInfo.basisList[4].value, 2) : ""
				});	
			}

			// 異붿쿇�곹뭹 �ㅼ젙 (而⑥뀎 蹂�寃쎌쑝濡쒖씤�� 異붿쿇�곹뭹 animate 1,2,3,1 �� 蹂댁뿬二쇨린 �꾪븳 異붽� �ㅼ젙)
			$scope.ecrmPlusSet = function(value){
				
				//201906 �ㅻ쪟�섏젙 ecrm 由ы꽩媛믪씠 �녿뒗 寃쎌슦 怨듬�泥섎━
				$scope.ecrmPlus.push({
					  itemVal : value.basisInfo.basisList[0] ? value.basisInfo.basisList[0].value : ""
					, prdImgBurl : value.basisInfo.basisList[8] ? value.basisInfo.basisList[8].value :""
					, webUrl : value.basisInfo.basisList[5] ? value.basisInfo.basisList[5].value : ""
					, clickUrl :value.clickUrl
					, imgUrl : value.basisInfo.basisList[4] ? pdImgSet(value.basisInfo.basisList[4].value, 1) : ""
					, alt : value.basisInfo.basisList[4] ? pdImgSet(value.basisInfo.basisList[4].value, 2) : ""
				});	
			}
			
			$scope.ecrmAdd = function(){
				var reCom = $scope.ecrm.reCom;
				$scope.ecrm = $scope.ecrm.concat($scope.ecrmPlus);
				$scope.ecrm.reCom = reCom
			}

			$scope.showPdInfo = function(item) {
				//click event �꾩넚
				transferEcrmLog(item);
				
				if (item.webUrl) {
					$window.open(item.webUrl);
				}
				
				var url = item.webUrl; 
				var cusId = $scope.ecrm.cusId;
				if(	cusId != "" && $scope.ecrm.reCom == "auto") {
					if(url.indexOf('do?') > -1) {
					   url += "&cusId=" + cusId
					} else {
					   url += "?cusId=" + cusId
					}
				}	
				if (url) {
					log.out("prdUrlWeb = " + url);
					$window.open(url);
				}
			};

			// �대┃��, ecrm log �꾩넚
			function transferEcrmLog(pm) {
				//wiselog.ecrmClickLogging(pm.clickUrl);
				$.ajax({
					url : pm.clickUrl,
					dataType: "jsonp"
				});
			}
		});
		
		return o;
	}));
	
	mz.comm.directive('uiPmmifloat', mz.mold(function() {
		var o = {};
		
		o.templateUrl = mz.path('/views/comm/uiPmmifloat.tpl', true);
		
		o.scope = {};
		
		o.controller = mz.mold(function(co, $scope) {
			var log = co.get('logger').getLogger('uiPmmifloat');
			var http = co.get('http');
			var $window = co.get('$window');
			var menuService = co.get("menuService");
			var path = co.get("path");
			var pageId = path.getPageId();
			var list = _.filter(mz.menu, function(info) { return menuService.realMenuCheck(info, pageId);});
			var lnb = (list && list.pop());
			var menuIdDepth = lnb.path.split(">")[lnb.path.split(">").length-1];
			var menuId = lnb.path.split(">")[0];
			
			init();
			
			function init(){				
				$('#pmmifloating').css('display','none');				
				switch(menuIdDepth){
					case '2307' : case '2347' : case '3096' : case '2019' :
					case '2016' : case '2350' :  case '2352' :
					case '3095' : case '2022' : case '2354' :
					case '2351' :
					case '3107' : // �щ컮瑜� 移섎ℓ媛꾨퀝蹂댄뿕
					//200131 add
//					case '' :
					case '3113' : 
					case '3114' : 
					case '3115' : 
					case '3116' : 
					case '3111' : // �щ컮瑜몄떎�띻굔媛뺣낫��
					case '2025' : // �щ컮瑜몄떎�띻굔媛뺣낫��
						
						return $('#pmmifloating').css('display','block');
						
					//case '2001' : case '2014' : case '2041' : case '2051' :	//誘몃뱾 �섏씠吏�
					case '2017' :											//嫄닿컯/�듯빀 
					case '2020' : case '2264' :								//嫄닿컯/吏덈퀝
					case '2030' :							 				//嫄닿컯/�곹빐蹂댄뿕
					case '2043' : 											//�곌툑��異�
					case '2046' : 											//��異�
					case '2056' : case '2351' : case '2053' : case '2054' : //�붿옱蹂댄뿕
					case '2055' :
					case '3105' : // �щ컮瑜몄떆�덉뼱�붾낫��
					case '3110' : // �щ컮瑜몄떎�띻컙�몃낫��
					case '2348' : // �щ컮瑜멸컙�몃낫��
					case '2318' : // �좊퀝�� �ㅼ넀�섎즺鍮꾨낫��
					case '2308' : // �ㅼ씠�됲듃 �ㅼ넀�섎즺鍮꾨낫��
					case '1990' : // �퀾om媛숈� �띾뫁�대낫��
					case '2349' : // �ъ씤�먮씪�댄봽(二쇳깮)
						
					//200131
//					case '' : 
					case '3108' : case '5375' : 
						
						return $('#pmmifloating').css('display','block').find('.insu').css('display', 'none');
					default : return  $('#pmmifloating').css('display','none');
				}
			}			
		});		
		return o;		
	}));*/
	
})(angular, mz);
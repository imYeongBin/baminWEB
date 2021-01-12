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
 * 201906 오류수정 ecrm 리턴값이 없는 경우 공란처리
 * 202002 CTA영역 입력란 아래 에러메시지 노출 TM상담 validateion 기준 적용
 */  
(function(angular, mz) {


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
							var reg = /[^가-힣ㄱ-ㅎㅏ-ㅣ\x20]/g;
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
	
})(angular, mz);
// skip navigation
function skip_navigating() {
    if ($("body").attr("data-scraction") != 0) {
        if ($('.layer_wrap').css('visibility') == 'visible') {
            $(".skipnav").attr("tabindex", 1);
        } else {
            $(".skipnav").attr("tabindex", 0).focus();
        }
    }

    $(".skipnav a").each(function() {
        $(this).attr('link', $(this).attr('href').split('#')[1]).attr('href', '#');
    });
    $("a[href^='#']").click(function(e) {
        e.preventDefault();
        var anchortarget = $(this).attr("link");
        $("#" + anchortarget).attr("tabindex", 0).focus();
    });
    $(".skipnav a").focus(function() {
        $(".skipnav a").removeClass("on");
        $(this).addClass("on");
    })
    $(".skipnav a").blur(function() {
        $(".skipnav a").removeClass("on");
    })
    $('.bx_error em').addClass('emAcc')
}

function skipNavCont() {
    $('.skipnav').find('a').eq(0).on('click', function() {
        $('#content').attr({
            tabindex: -1
        }).focus()
    })
}

function skipNavGnb() {
    $('.skipnav').find('a').eq(1).on('click', function() {
        $('#gnb').attr({
            tabindex: -1
        }).focus()
    })
}

function skipNavFooter() {
    $('.skipnav').find('a').eq(2).on('click', function() {
        $('#footer').attr({
            tabindex: -1
        }).focus()
    })
}

function replaceRadio() {
    $("div.radio_style input.radio").each(function(i) {
        var that = $(this);
        that.unwrap();
        makeRadio(that);

        //_radioFocusCheck(that, "i_chkPeople");
        _radioFocusCheck(that, "i_rdo01");
    });
}

// 2019.02.15 : 라디오버튼 선택 후 초점체크 함수
function _radioFocusCheck(_obj, _name) {
    if (_obj.is(":focus") == true) return false;
    if (_obj.parent().hasClass("on") && _obj.attr("name") == _name) {
        _obj.focus();
    }
}

//make radio
function makeRadio(obj) {
    if (obj.parent().hasClass("radio_style")) {
        return false;
    }
    // 부모 감싸기
    obj.wrap('<div class="radio_style"></div>');

    var radioStyle = obj.parent();
    // 체크파악
    radioStyle.each(function() {
        
        if ($(this).find('.radio').is(':checked') == true) {
            $(this).closest('.radio_style').addClass('on');
        }
        // 선택 불가
        if ($(this).find('.radio').is(':disabled') == true) {
            $(this).closest('.radio_style').addClass('disable');
        }
    });

    radioStyle.find('.radio').on({
        change: function() {
            if ($(this).is(':checked') == true) {
                $('input:radio[name=' + $(this).attr('name') + ']').closest('.radio_style').removeClass('on');
                $(this).closest('.radio_style').addClass('on');
            }
        },
        focusin: function() {
            $(this).closest('.radio_style').addClass('focus');
            
        },
        focusout: function() {
            $(this).closest('.radio_style').removeClass('focus');
        }
    });
}

function replaceCheckbox() {
    $("div.check_style input.checkbox").each(function(i) {
        var that = $(this);
        that.unwrap();
        makeCheckbox(that);
    });
}

//make checkbox
function makeCheckbox(obj) {
    if (obj.parent().hasClass("check_style")) {
        return false;
    }

    // 부모 감싸기
    obj.wrap('<div class="check_style"></div>');

    var checkbox = obj.parent();

    // 체크파악
    checkbox.each(function() {
        if ($(this).find('.checkbox').is(':checked') == true) {
            $(this).closest('.check_style').addClass('on');
        }
        // 선택 불가
        if ($(this).find('.checkbox').is(':disabled') == true) {
            $(this).closest('.check_style').addClass('disable');
        }
    });

    checkbox.find('.checkbox').on({
        change: function() {
            if ($(this).is(':checked') == true) {
                $(this).closest('.check_style').addClass('on');
            } else {
                $(this).closest('.check_style').removeClass('on');
            }
        },
        focusin: function() {
            $(this).closest('.check_style').addClass('focus');
        },
        focusout: function() {
            $(this).closest('.check_style').removeClass('focus');
        },
        keydown: function(e) {
            if (e.keyCode == 13) {
                if ($(this).closest('.check_style').hasClass('on')) {
                    $(this).closest('.check_style').removeClass('on');
                } else {
                    $(this).closest('.check_style').addClass('on');
                }
                if ($(this).attr('id') == 'all_chk' || $(this).attr('id') == 'i_chkbox_all') {
                    $(this).trigger('click');
                }
            }
        },
    });
}

function replaceSelect(obj, time) {
    time = time || 100;

    setTimeout(function() {
        removeSelect(obj);
        makeSelect(obj);
    }, time);
}

function removeSelect(obj) {
    var div = obj.closest("div.ipt_select");
    if (0 < div.size()) {
        div.html(obj);
    }
}

//make selectbox
function makeSelect(obj) {
    if (obj.parent().hasClass("select_style")) {
        return false;
    }
    // 부모 감싸기
    obj.wrap('<div class="select_style"></div>');
    obj.after('<div class="slc_drop"></div>');

    $('.slc_drop').each(function() {
        if ($(this).find('.slc_inner').length <= 0) {
            $(this).append('<ul class="slc_inner"></ul>');
        }
    })

    $iptSlc = obj.closest('.ipt_select').eq(0);

    var blankNum = 0;

    $iptSlc.find('.select_style').each(function() {
        //select가 selected일때 a링크 추출
        if ($(this).find('.select').attr("id") == "mDate") {
            $(this).find('.select').after('<a href="#" class="slc_target" title="' + $(this).find('.select').attr("title") + '">' + $(this).find('.select option').eq(0).text() + '</a>');
        } else {
            $(this).find('.select').after('<a href="#" class="slc_target" title="' + $(this).find('.select').attr("title") + '">' + $(this).find('.select option:selected').text() + '</a>');
        }

        for (var i = 0; i <= $(this).find('.select option').length - 1; i++) {
            if ($(this).find('.select option').eq(i).hasClass('dis')) {
                blankNum = blankNum + 1;
            } else {
                $(this).find('.slc_drop .slc_inner').append('<li><a href="#" title="' + $(this).find('.select option').eq(i).text() + '">' + $(this).find('.select option').eq(i).text() + '</a></li>');
            }
        }
    });

    obj.each(function() {
        // 값에 따른 label 활성화
        var $label = null;
        if ($(this).find('option:selected').val()) {
            $(this).next('.slc_target').addClass('select');
        } else {
            $(this).next('.slc_target').removeClass('select');
        }
    });

    $iptSlc.find('.slc_target').on({
        click: function(e) {
            e.preventDefault();

            // 셀렉트가 은행일 경우 버튼식으로 변경
            if ($(this).prev('select.select_bank').length) {
                var rem = 0;
                if ($(this).closest('.select_style').find('select >option').length <= 6) {
                    //$(this).closest('.select_style').removeClass('boxtype')
                } else if ($('select.select_bank').find('>option').length > 6) {
                    if (4 - ($(this).closest('.select_style').find('>option').length - blankNum) % 4 != 0) {
                        rem = 4 - ($(this).closest('.select_style').find('select >option').length - blankNum) % 4;
                    } else {
                        rem = 4 - $(this).closest('.select_style').find('select >option').length % 4;
                    }
                    $(this).closest('.select_style').addClass('boxtype').find('.slc_inner').css({
                        zIndex: 10,
                        top: 30,
                        left: 'auto'
                    });
                    if ($(this).closest('.select_style').find('.slc_drop .ui_last').length <= 0) {
                        for (var j = 0; j < rem; j++) {
                            $(this).closest('.select_style').find('.slc_inner').append('<li><a href="#" class="ui_last" onclick="return false;">&nbsp;</a></li>');
                        }
                    }
                }
                if ($(this).hasClass('open') == true) {
                    $(this).removeClass('open').next('.slc_drop').stop().slideUp(200);
                } else {
                    $('.slc_drop').stop().slideUp(200);
                    $('.slc_target').removeClass('open');
                    $(this).addClass('open').next('.slc_drop').stop().slideDown(200);
                }
            }
            // 그 이외에는 셀렉트로 변경(6개 이상일때는 스크롤)
            else {
                // option 6개 이상일때 "scroll_view" 클래스 추가
                if ($(this).closest('.select_style').find('select >option').length > 6) {
                    $(this).next('.slc_drop').addClass('scroll_view');
                }
                if ($(this).hasClass('open') == true) {
                    $(this).removeClass('open').next('.slc_drop').stop().slideUp(200);
                } else {
                    $('.slc_drop').stop().slideUp(200);
                    $('.slc_target').removeClass('open');
                    $(this).addClass('open').next('.slc_drop').stop().slideDown(200, function() {
                        // option 6개 이상일때 스크롤 생성
                        if ($(this).closest('.select_style').find('select >option').length > 6) {
                            $(this).show().jScrollPane({
                                mouseWheelSpeed: 50
                            });
                        }
                    });
                }
            }

            // 타켓이 바깥일 경우
            $(document).on('click', function(e) {
                if ($(e.target).next(".slc_drop").size() == 0) {
                    $('.slc_drop').stop().slideUp(200);
                    $('.slc_target').removeClass('open');
                    //이벤트 해제
                    $(document).off("click");
                }
            });

            //select가 disabled 일때
            if ($(this).prev('.select').is(':disabled')) {
                $(this).removeClass('open').next('.slc_drop').hide();
            }
        }
    });
    $iptSlc.find('.slc_drop li a').on({
        click: function(e) {
            e.preventDefault();
            var slcTxt = $(this).text();
            var idx = $(this).closest('li').index();
            $(this).closest('.select_style').find('.slc_target').text(slcTxt);

            var div = $(this).closest('.select_style');

            div.find('.slc_target').eq(0).removeClass('open');
            $(this).closest('.slc_drop').stop().slideUp(200);

            //selected 초기화..
            div.find('.select option').attr('selected', false);
            if (div.find('.select option').hasClass('dis')) {
                div.find('.select option').eq(idx + 1).attr('selected', 'selected');
            } else {
                //div.find('.select option').eq(idx).attr('selected' , 'selected');
                // 2016.12.09 상담일자 value 오류
                div.find('.select option').eq(idx).prop('selected', true);
            }
            div.find('.slc_target').eq(0).focus();
            if (div.find('.select').hasClass('uichange')) {
                div.find('.select').trigger('change')
            }
            $(this).closest('.select_style').find('.slc_target').focus();

            // 값에 따른 label 활성화
            var $label = null;
            if (div.find('.select option:selected').val()) {
                $(this).closest('.select_style').find('.slc_target').addClass('select');
            } else {
                $(this).closest('.select_style').find('.slc_target').removeClass('select');
            }
        }
    });
}

//designStyle Form
var styleFormMethod = function(obj) {
    var $ipt = $('.ipt'),
        $iptSlc = $('.ipt_select');

    var root = obj || $("body");
    // 라디오 경우
    if ($('input[type="radio"]').hasClass('radio') == true) {
        $('input.radio').each(function(i) {
            makeRadio($(this));
        });
    }

    // 체크 박스 경우
    if ($('input[type="checkbox"]').hasClass('checkbox') == true) {
        $('input.checkbox').each(function(i) {
            makeCheckbox($(this));
        });
    }

    // 셀렉트 박스 경우
    if ($('select').hasClass('select') == true) {
        $('select.select').each(function(i) {
            makeSelect($(this));
        });
    }

    // 기본 인풋 텍스트
    root.find('.ipt_style').each(function() {
        $(this).on({
            focusin: function() {
                var $focWidth = '100%';

                $('span.foc').remove();
                // table input
                if ($(this).closest('td').length) {
                    $(this).closest('td').addClass('bx_foc').append('<span class="foc"></span>');
                }
                // 댓글 작성 input
                if ($(this).closest('.reply').length) {
                    if ($(this).closest('.reply_name').length) {
                        $(this).closest('.reply_name').addClass('bx_foc').append('<span class="foc"></span>');
                    }
                    if ($(this).closest('.reply_cont').length) {
                        $(this).closest('.reply_cont').addClass('bx_foc').append('<span class="foc"></span>');
                        $focWidth = '720px';
                    }
                }
                // 수정 댓글 input
                if ($(this).closest('.reply_list').length) {
                    $(this).closest('li').addClass('bx_foc').append('<span class="foc"></span>');
                    $focWidth = '770px';
                }
                //검색 input
                if ($(this).closest('.search').length) {
                    $(this).closest('.search').addClass('bx_foc').append('<span class="foc"></span>');
                }

                // focus motion
                $(this).closest('.bx_foc').find('.foc').stop().animate({
                    width: $focWidth
                });

            },
            focusout: function() {
                // table
                if ($(this).closest('td').length) {
                    $(this).closest('td').removeClass('bx_foc');
                    $(this).closest('td').find('.foc').remove();
                }
                // 댓글 작성 input
                if ($(this).closest('.reply').length) {
                    $(this).closest('.reply').removeClass('bx_foc');
                    $(this).closest('.reply').find('.foc').remove();
                }
                // 수정 댓글 input
                if ($(this).closest('.reply_list').length) {
                    $(this).closest('.reply_list').find('li').removeClass('bx_foc');
                    $(this).closest('.reply_list').find('li').find('.foc').remove();
                }
                //검색
                if ($(this).closest('.search').length) {
                    $(this).closest('.search').removeClass('bx_foc');
                    $(this).closest('.search').find('.foc').remove();
                }
            }
        });
        $(this).trigger('focusout');

        // placeholder
        if ($('.ie8').length || $('.ie9').length) {
            var input = $(this);

            if (input.attr('type') != 'password') {
                if (input.val() == '' || input.val() == input.attr('placeholder')) {
                    input.val(input.attr('placeholder')).addClass('placeholdersjs');
                }

                $(input).focus(function() {
                    if (input.val() == input.attr('placeholder')) {
                        input.val('').removeClass('placeholdersjs');
                    }
                });

                $(input).blur(function() {
                    if (input.val() == '' || input.val() == input.attr('placeholder')) {
                        input.val(input.attr('placeholder')).addClass('placeholdersjs');
                    }
                });
            } else {
                if (input.val() == '' || input.val() == input.attr('placeholder')) {
                    input.wrap('<div class="bx_pwd"></div>');
                    input.after('<span class="placeholder_pwd">' + input.attr('placeholder') + '</span>');

                    var ipt_style = $(this).attr('style');

                    if (input.attr('style')) {
                        input.closest('.bx_pwd').attr({
                            style: ipt_style
                        });
                    } else {
                        input.closest('.bx_pwd').css({
                            width: '100%'
                        });
                    }
                    input.closest('.bx_pwd').on({
                        click: function() {
                            $(this).find('.placeholder_pwd').hide();
                            $(this).find('input').focus();
                        }
                    });
                    input.on({
                        blur: function() {
                            if (input.val() == '' || input.val() == input.attr('placeholder')) {
                                $(this).next('.placeholder_pwd').show();
                            }
                        },
                        focus: function() {
                            $(this).next('.placeholder_pwd').hide();
                        }
                    });
                }
            }
        }
    });


    // 파일 첨부 있을 경우
    if (root.find('.btn_addfile').length) {
        var $btnFile = root.find('.btn_addfile'),
            $inputFile = root.find('.add_file'),
            $inputText = root.find('.txt_file');

        $btnFile.off("click").on({
            click: function(e) {
                e.preventDefault();
                $(this).prev('.add_file').trigger('click');
            }
        });
        $inputText.off("click").on({
            click: function(e) {
                e.preventDefault();
                $(this).next('.add_file').trigger('click');
            }
        });
        $inputFile.off("change").on({
            change: function(e) {
                e.preventDefault();
                var pathHeader = $(this).val().lastIndexOf("\\"),
                    pathMiddle = $(this).val().lastIndexOf("."),
                    pathEnd = $(this).val().length,
                    fileName = $(this).val().substring(pathHeader + 1, pathMiddle),
                    extName = $(this).val().substring(pathMiddle + 1, pathEnd),
                    allFileName = fileName + "." + extName;

                if (fileName.length) {
                    $(this).prev('.txt_file').val(allFileName);
                    //ie8 or ie9일 경우 클래스 placeholdersjs 제거
                    if ($('.ie8').length || $('.ie9').length) {
                        $(this).prev('.txt_file').removeClass('placeholdersjs');
                    }
                } else {
                    $(this).prev('.txt_file').val('');
                    //ie8 or ie9일 경우 클래스 placeholdersjs 추가
                    if ($('.ie8').length || $('.ie9').length) {
                        $(this).prev('.txt_file').addClass('placeholdersjs');
                    }
                }


                // 값에 따른 label 활성화
                if ($(this).prev('.txt_file').val()) {
                    var $label = $(this).prev('.txt_file').attr('id');
                    $('label').each(function() {
                        if ($(this).attr('for') == $label) {
                            $(this).closest('th').addClass('active');
                        }
                    });
                } else {
                    var $label = $(this).prev('.txt_file').attr('id');
                    $('label').each(function() {
                        if ($(this).attr('for') == $label) {
                            $(this).closest('th').removeClass('active');
                        }
                    });
                }
            }
        });
    }

    //textarea 자동높이 조절
    if (root.find('textarea').length) {
        var textarea = root.find('textarea');
        var txtareaFnc = function() {
            textarea.autosize();
            textarea.on({
                focusout: function() {
                    if ($(this).val().length == false) {
                        // 댓글
                        if ($(this).closest('.reply_list').length || $(this).closest('.reply_box').length) {
                            $(this).outerHeight(47);
                        } else {
                            $(this).outerHeight(18);
                        }
                    }
                }
            });
        }
        txtareaFnc();
    }

    //인풋 수정시 커서 이동
    root.find('.btn_edit').on({
        click: function(e) {
            e.preventDefault();
            $(this).closest('.ipt_edit').find('.ipt_style').trigger('focus');
        }
    });

    //textarea 스크롤 디자인
    if (root.find('.txtarea').length) {
        if (root.find('.txtarea').hasClass('none') == false) {
            root.find('.txtarea .view').jScrollPane({
                mouseWheelSpeed: 100,
                hijackInternalLinks: true
            });
        }
    }

    if ((".et_datepicker").length > 0) {
        window.etribe.ui.comm.datePicker.init();
    } //180412 hjl

    scrollReset();
}


// 200219 : BHY : 웹접근성 탭 포커스 활성화 (공통) : 개발파일에서 호출
var companyTabFuc = function () {
    var $ciTab = $(".tab , .commTab"),
        $li = $ciTab.find("li");

    $li.each(function (e) {
        var $target = $(this).find("a");
        if ($(this).hasClass("on")) {
            $target.focus();
        }
    });
}

// 200220 : BHY : 웹접근성 error포커스 input으로 이동 (공통) : 개발파일에서 호출
var commFocusMove = function () {
    var $errText = $(".bx_error , .txt_error");
    var $childTarget = $errText.first().find('em');

    if ($childTarget.is(":visible")) {
        $childTarget.attr('tabindex', '0').focus();
        $childTarget.on('focusout', function (e) {
            $(this).removeAttr('tabindex');
            $errText.prev().find("input").first().focus();
        });
    }
}

// 200224 : BHY : 웹접근성 error포커스 input으로 이동 (공통)
var multiFocusMove = function () {
    var $errText = $(".bx_error , .txt_error");
    var $childTarget = $errText.find('em');
    var elArry = []
    
    $childTarget.each(function (idx) {
        var $this = $(this);
        
        if ($this.hasClass("ng-animate")) {
            if ($this.hasClass("ng-hide") === false) {
                elArry.push($this);
            }
        } else {
            // 협력업체 지급보험금조회 로그인 포커스 체크
            if ($this.parents(".txt_error").is(":visible") || $this.is(":visible")) {
                elArry.push($this);
            }
        }
    });
    
    
    (function focusEventHandler() {
        if (elArry[0] == null) {
            $(".blank_btn").find("a").focus();
            return false;
        }; 

        elArry[0].attr('tabindex', '0').focus();
        elArry[0].on('focusout', function (e) {
            var $this = $(this),
                $target = $this.parents($errText).prev();
            
            if ($target.find("input").hasClass("checkbox")) {
                checkboxCheck($this);
            }
            if ($target.find("input").hasClass("radio")) {
                radioCheck($this);
            }
            if ($target.find("textarea").hasClass("ipt_style")) {
                textareaCheck($this);
            }
            if ($target.find("input").hasClass("ipt_style")) {
                textCheck($this);
            }
            if ($target.find("a").hasClass("slc_target") || $target.find("a").hasClass("btn_bank")) {
                selectCheck($target);
            }
            $(this).removeAttr('tabindex');
        });        
    }());  

    // checkbox check
    function checkboxCheck(_this) {
        var $prevEl = _this.parents(".bx_error").prev(),
            $checkbox = $prevEl.find("input[type=checkbox]");

        if ($checkbox.length > 1) {
            $checkbox.not(":checked").first().focus();
        } else {
            moveFocus($checkbox);
        }
    }

    // radio check
    function radioCheck(_this) {
        var $prevEl = _this.parents(".bx_error").prev(),
            $radio = $prevEl.find("input[type=radio]"),
            $radioFirst = $prevEl.find(".ipt").find("input[type=radio]"),
            $radioSec = $prevEl.find(".ipt_con").find("input[type=radio]"),
            isRadioFirst = ($radioFirst.parent().hasClass("on")) ? true : false,
            isRadioSecond = ($radioSec.parent().hasClass("on")) ? true : false;

        if ($radio.length > 0) {
            if (isRadioFirst === false && isRadioSecond === false) {
                moveFocus($radioFirst);
            } else if (isRadioFirst === true && isRadioSecond === false) {
                moveFocus($radioSec);
            }
        }
    }

    // textarea check
    function textareaCheck(_this) {
        var $prevEl = _this.parents(".bx_error").prev(),
            $textarea = $prevEl.find("textarea");

        if ($textarea.length > 0) {
            moveFocus($textarea);
        }
    }

    // text check
    function textCheck(_this) {
        var $prevEl = _this.parents(".bx_error , .txt_error").prev(),
            $text = $prevEl.find("input[type=text]");

        if ($text.length > 0) {
            if (_this.hasClass("payinsu_pass")) {
                $prevEl.find("td").last().find("input").focus();
            } else {
                moveFocus($text);
            }
        }
    }

    // select check
    function selectCheck($target) {
        var $select = $target.find("a.slc_target , a.btn_bank");

        if ($select.length > 0) {
            $select.each(function (idx) {
                if ($select.eq(0).hasClass("select")) {
                    $select.last().focus();
                } else {
                    moveFocus($select);
                }
                
            })
        }
    }
   
    function moveFocus(_target) {
        _target.first().focus();
    }
}


// BHY : 2019.02.26 : errorMessage Line Animate (RF)
var errorMthod = function() {
    var tag = {},
        opt = {};

    (function objSet() {
        tag.$mother = $('.search_addr , .certificate_cont');
        tag.$boxError   = tag.$mother.find(".bx_error");
        tag.$boxEm      = tag.$boxError.find("em").first();
        tag.$target 	= $('.bx_error td');
        tag.$searchWord = $('.search_word');
        tag.replyBox 	= $('.reply_box');

        opt.speed = 100;
    }());

    (function findMessage() {
        tag.$target.not('.blank').each(function() {
            setMessageLine($(this));
            errorFocus();
        });
    }());

    // 200220 : BHY : 웹접근성 error포커스 input으로 이동
    function errorFocus() {
        tag.$boxEm.attr('tabindex', '0').focus();
        tag.$boxEm.on('focusout', function (e) {
            $(this).removeAttr('tabindex');
            tag.$boxError.prev().find("input").first().focus();
        });
    }

    function setMessageLine($this) {
        var $this 		= $this,
            $em 		= $this.find('em'),
            $span 		= $em.append('<span>'),
            _lineChk 	= $em.css('display') == 'block';

        if (_lineChk) {
            $em.find("span").addClass("foc");
            $em.find("span").stop().animate({
                width: '100%'
            }, opt.speed);
        } else {
            $em.remove('.foc');
        }
    }

    if (tag.$searchWord.length) {
        tag.$searchWord.each(function() {
            if ($(this).closest('fieldset').next('.bx_error').find('em').css('display') == 'block') {
                $(this).closest('fieldset').next('.bx_error').find('em').append('<span class="foc"></span>');

                if ($(this).closest('fieldset').find('.search .ipt_select').length) {
                    // motion
                    $(this).closest('fieldset').next('.bx_error').find('.foc').stop().animate({
                        left: -$('.ipt_select').outerWidth(),
                        width: $(this).find('.search').width()
                    });
                } else {
                    // motion
                    $(this).closest('fieldset').next('.bx_error').find('.foc').stop().animate({
                        width: $(this).find('.search').width()
                    });
                }

            } else {
                $(this).closest('fieldset').next('.bx_error').find('em').remove('.foc');
            }
        });
    }

    if (tag.replyBox.length) {
        tag.replyBox.each(function() {
            if ($(this).find('.bx_error').find('em').css('display') == 'block') {
                $(this).find('.bx_error').find('em').append('<span class="foc"></span>');

                // motion
                $(this).find('.bx_error').find('.foc').stop().animate({
                    width: $(this).find('.reply_cont .ipt_style').width()
                });
            } else {
                $(this).find('.bx_error').find('em').remove('.foc');
            }
        });

    }
}

//tooltip
var tooltipMethod = function() {
    var $obj = $('#container'),
        $layerTooltip = $('.layer_tip');

    $obj.on('click', '.i_tip', function(e) {
        $('.layer_tip').hide();
        $(this).next($layerTooltip).show().attr("tabindex", 0).focus();
        $layerTooltip.find('.btn_close').on('click', function() {
            $(this).closest($layerTooltip).prev('.i_tip').focusin();
        });

        if ($('.txtarea').length) {
            if ($('.txtarea').hasClass('none') == false) {
                $('.txtarea .view').jScrollPane({
                    mouseWheelSpeed: 100,
                    hijackInternalLinks: true
                });
            }
        }
    });


    // 닫기 버튼 클릭시
    $obj.on('click', '.layer_tip .btn_tooltip_close', function(e) {
        $(this).closest('.layer_tip').attr({
            'style': '',
            'tabindex': ''
        });
        $(this).closest('.layer_tip').prev('.i_tip').focus();
    });
}

//accordion
var accordionMethod = function() {
    $(".actru_list dl dt a").on('click', function(e) {
        //$(".faq_list dl dt a , .actru_list dl dt a").on('click', function(e){
        e.preventDefault();
        if ($(this).closest('dt').hasClass('open') == true) {
            $(this).attr('title', '펼치기').closest('dt').removeClass('open').next('dd').stop().slideUp(100);
        } else {
            $(this).attr('title', '펼치기').closest($('div')).find('dl dt').removeClass('open').next('dd').stop().slideUp(100);
            $(this).attr('title', '접기').closest('dt').addClass('open').next('dd').stop().slideDown(100);
        }
    });
}

//faq
var faqMethod = function() {
    var $obj = $('#container');

    $obj.on('click', '.faq_list dl dt a', function(e) {
        e.preventDefault();
        var $faq = $('.faq_list'),
            $answer = $faq.find('dd');

        if ($(this).closest('dt').hasClass('open') == true) {
            $(this).closest('dt').removeClass('open').next('dd').stop().slideUp(100);
            $(this).closest('dt').find('.ui_status').text('펼치기');
        } else {
            $faq.find('dt').removeClass('open').next('dd').stop().slideUp(100);
            $(this).closest('dt').addClass('open').next('dd').stop().slideDown(100);
            $faq.find('dt').find('.ui_status').text('펼치기');
            $(this).closest('dt').find('.ui_status').text('접기');
        }
    });

}

//require doc
var requireSlide = function() {
    var $obj = $('#container');

    $obj.on('click', '.require_doc  ul li > a', function(e) {
        e.preventDefault();
        var $requireDoc = $('.require_doc'),
            $cont = $requireDoc.find('.cont');

        if ($(this).hasClass('open') == true) {
            $(this).attr('title', '접힘').removeClass('open').next($cont).stop().slideUp(100);
        } else {
            $requireDoc.find('li > a').attr('title', '접힘').removeClass('open').next($cont).hide();
            $(this).attr('title', '펼침, 선택됨').addClass('open').next($cont).stop().slideDown(100);
        }
    });

}

//tabHeight
var tabHeight = function() {
    var $tab = $('.tab'),
        $tabActiveLi = $('.tab > ul > li.on');

    if ($tab.length) {
        $tabActiveLi.each(function() {
            if (!$tabActiveLi.find('> ul').length) {
                $(this).css({
                    'min-height': 'auto'
                });
            } else {
                $(this).css({
                    'height': $(this).find(' > a').height() + $(this).find(' > ul').height() + 14
                });
            }
        });
    }
}

//termMenu
var termMenu = function() {
    var $obj = $('#container');

    $obj.on('click', '.term_menu li a', function(e) {
        e.preventDefault();
        $('.term_menu li').removeClass('on');
        $(this).closest('li').addClass('on');
        $(this).closest('.term_menu').nextAll('.terms_txt').find('.txtarea .view').attr('tabindex', 0).focus();
    });
}

//tabContent
var tabContent = function() {
    var $obj = $('#container');
    $obj.on('click', '.tab_btn a', function(e) {
        e.preventDefault();
        var $idx = $(this).index();
        $('.tab_btn a').attr('class', 'btn btn_w02');
        $(this).attr('class', 'btn btn_n01');
        $('.tab_btn a').find('span').nextAll().remove('i').remove('span');
        $(this).find('span').after('<i class="i_next"></i><span class="hide_txt">_선택</span>');

        // show / hide
        $('.tab_area').removeClass('on');
        $('.tab_area').eq($idx).addClass('on');
        $('.tab_area').eq($idx).find('.txtarea .view').jScrollPane({
            mouseWheelSpeed: 100,
            hijackInternalLinks: true
        });
    });

}

// 댓글 작성
var replyMethod = function() {
    var $replyList = $('.reply_list > ul > li');

    $replyList.on('click', '.btn_edit', function() {
        $(this).closest('.reply_btn').prev('.ipt_style').removeAttr('disabled').addClass('active');
        $(this).closest('.reply_btn').next('.enroll').css('display', 'block');
        $(this).closest('.reply_btn').hide();
    });
}

// 슬라이더 홍보센터
var sliderPublic = function() {
    setTimeout(function() {
        var $sliderObj = $('.slide_advbox'),
            $slider = $sliderObj.find('.slide_advlist > ul'),
            $sliderList = $slider.find(' > li');

        if ($sliderObj.length) {
            //debugger;
            var $limgL = Math.abs($sliderList.filter(':last-child').css('margin-left').split('px')[0]),
                $ceil = $sliderList.width() + $limgL;
            var isitMove = false;

            $sliderObj.each(function() {
                var $slideThis = $(this);
                //init
                $slideThis.find($slider).css('left', 0);

                // 슬라이드 리스트가 3개이상일 경우에만 적용
                if ($slideThis.find($sliderList).length > 3) {
                    // 이전 버튼
                    $slideThis.on('click', '.btn_prev', function(e) {
                        e.preventDefault();
                        if (isitMove == false && $slideThis.find($slider).css('left') < '0px') {
                            isitMove = true;
                            $(this).closest($sliderObj).find($slider).stop().animate({
                                left: '+=' + $ceil
                            }, {
                                duration: 200,
                                complete: function() {
                                    isitMove = false;
                                }
                            });
                        }
                        return false;
                    });

                    // 다음 버튼
                    $slideThis.on('click', '.btn_next', function(e) {
                        e.preventDefault();
                        if (isitMove == false && parseInt($slideThis.find($slider).css('left')) > -$ceil * ($slideThis.find($sliderList).length - 3)) {
                            isitMove = true;
                            $(this).closest($sliderObj).find($slider).stop().animate({
                                left: '-=' + $ceil
                            }, {
                                duration: 200,
                                complete: function() {
                                    isitMove = false;
                                }
                            });
                        }
                        return false;
                    });
                }
            });
        }
    }, 500);
}

//운전자 범위 선택
var driveScopeSlc = function() {
    var $driver_range = $('.driver_range'),
        $privacy = $driver_range.find('.bx_coverage > div.range06'),
        $driver_detail = $('.driver_detail');

    // 지정 1인(타인)을 제외한 운전자 범위 선택시
    $driver_range.on('change', '.driver_select .ipt_radio input[type="radio"]', function() {
        var $idx = $(this).closest('.ipt_radio').attr('class').split('ipt_radio driver_chk0')[1];

        //20180110 오류제거
        // 2016.10.01 지정1인 한정특약폐지
        //var insValdt = $('#insValdt').val();
        //if(($idx == 2 || $idx == 3) && insValdt > 20160930) {
        //	$idx = 4;
        //}

        // 가족 + 형제자매 / 누구나 선택시 (기명1인 제외 전체로 변경 20180110)
        if ($idx == 2 || $idx == 3 || $idx == 4 || $idx == 5) {
            $driver_range.find('.driver_select .ipt_check input[type="checkbox"]').removeAttr('checked');
            $driver_range.find('.driver_select .ipt_check input[type="checkbox"]').attr({
                'disabled': 'disabled'
            });
            $driver_range.find('.driver_select .ipt_check .check_style').removeClass('on');
            $driver_range.find('.driver_select .ipt_check .check_style').addClass('disable');

            $driver_range.find('.driver_coverage .driver_info').addClass('on');
            $driver_range.find('.driver_coverage .bx_coverage > div').removeClass('on');
            $driver_range.find('.driver_coverage .bx_coverage > div.range0' + $idx).addClass('on');

        }
        // 그이외
        else {
            $driver_range.find('.driver_coverage .bx_coverage > div.range0601').removeClass('on');
            $driver_range.find('.driver_coverage .bx_coverage > div.range0602').removeClass('on');
            $driver_range.find('.driver_coverage .bx_coverage > div.range0603').removeClass('on');
            $driver_range.find('.driver_select .ipt_check .check_style').removeClass('on');
            $driver_range.find('.driver_select .ipt_check .check_style').removeClass('disable');
            $driver_range.find('.driver_select .ipt_check input[type="checkbox"]').removeAttr('checked');
            $driver_range.find('.driver_select .ipt_check input[type="checkbox"]').removeAttr('disabled');

            $driver_range.find('.driver_coverage .driver_info').addClass('on');
            $driver_range.find('.driver_coverage .bx_coverage > div').not($privacy).removeClass('on');
            $driver_range.find('.driver_coverage .bx_coverage > div.range0' + $idx).addClass('on')

            // 지정 1인(타인) 선택시
            $driver_range.on('change', '.driver_select .ipt_check input[type="checkbox"]', function() {
                if ($(this).closest('.check_style').hasClass('on') == false) {
                    $driver_range.find('.driver_coverage .bx_coverage > div').removeClass('on');
                    $driver_range.find('.driver_coverage .bx_coverage > div.range0' + $idx).addClass('on');
                    $driver_detail.removeClass('on')
                    $driver_detail.filter('.driver_detail0' + $idx).addClass('on');
                } else {
                    $driver_range.find('.driver_coverage .bx_coverage > div').removeClass('on');
                    $driver_range.find('.driver_coverage .bx_coverage > div.range060' + $idx).addClass('on');
                    $driver_detail.removeClass('on')
                    $driver_detail.filter('.driver_detail060' + $idx).addClass('on');
                }
            });

        }

        // init
        init();

        // 하단 입력
        $driver_detail.removeClass('on');
        $('[class*="driver_chk"]').removeClass('on').find('.bx_tooltip').removeClass('on');
        $driver_detail.filter('.driver_detail0' + $idx).addClass('on');
        $('.driver_chk0' + $idx).addClass('on').find('.bx_tooltip').addClass('on');

    });

    // init
    function init() {
        if ($driver_range.find('.driver_select .ipt_check .check_style').hasClass('disable')) {
            $driver_range.find('.driver_select .ipt_check').addClass('on');
        } else {
            $driver_range.find('.driver_select .ipt_check').removeClass('on');
        }
    }

}

// 보장 내용 변경
var guaranteeChange = function() {
    var $guarantee = $('.guarantee_list');

    // reset
    $('.guarantee_cont > a').removeClass('on');
    $guarantee.find('> dl .guarantee_change').hide();

    $('.guarantee_cont > a').on('click', function() {
        if (!$(this).closest('dl').find('.guarantee_change').hasClass('none')) {
            if ($(this).hasClass('on')) {
                $('.guarantee_cont > a').removeClass('on');
                $guarantee.find('> dl .guarantee_change').stop().slideUp(200);
                $(this).closest('dd').find('.hide_txt').text('펼치기');
            } else {
                $('.guarantee_cont > a').removeClass('on');
                $guarantee.find('> dl .guarantee_change').stop().slideUp(200);
                $(this).addClass('on').closest('.guarantee_cont').next('.guarantee_change').stop().slideDown(200);
                $guarantee.find('dd').find('.hide_txt').text('펼치기');
                $(this).closest('dd').find('.hide_txt').text('접기');
            }
        }
    });


    $guarantee.find('> dl').each(function() {
        $(this).find('.guarantee_change > ul > li').on('change', '.ipt_radio input[type="radio"]', function() {
            $(this).closest('li').addClass('on').siblings('li').removeClass('on');
        });
    });
}

// 바로계산
window.uiReckoning = (function() {
    var el, btnRec, showRec, showRecFocus;

    function init() {
        el = $('.uiReckoning');
        btnRec = el.find('.btn_reckoning');
        showRec = el.find('.bx_direct_cc');
        showRecFocus = showRec.find('.last > a:last');

        bindEvents();
    }

    function bindEvents() {
        btnRec.on('click', function(e) {
            e.preventDefault();
            btnRec.toggleClass('on');
            if (btnRec.hasClass('on')) {
                showRec.fadeIn();
                showRecFocus.on('focusout', function() {
                    //console.log(showRecFocus)
                    btnRec.removeClass('on');
                })
            } else {
                btnRec.removeClass('on');
                showRec.fadeOut();
            }
        })
    }
    return {
        init: init
    }
})();

// snb
window.uiSnb = (function() {
    var el, addList, addLink;

    function init() {
        el = $('.snb');
        addList = el.find('.add_dep');
        addLink = addList.find('a');

        bindEvents();
    }

    function bindEvents() {
        addLink.on('click', function() {
            $(this).parent().addClass('on');
            $(this).next().slideDown();
            if ($(this).parent().siblings().hasClass('on')) {
                $(this).parent().siblings().removeClass('on');
                $(this).parent().siblings().find('ul').hide();
            }
        })
    }
    return {
        init: init
    }
})();

//보장내용 버튼 클릭 이벤트
window.idScroll = (function() {
    var el, elBtn, guarantBtn;

    function init() {
        el = $('.bx_mydirect');
        elBtn = el.find('.btn_area');
        guarantBtn = elBtn.find('a');

        bindEvent();
    }

    function bindEvent() {
        guarantBtn.on('click', function(e) {
            e.preventDefault();
            if ($(this).find('span').text() == "보장내용") {
                $('html, body').animate({
                    scrollTop: $('#guarantee').offset().top
                });
            }
        })
    }

    return {
        init: init
    }
})();

//상품상세 꼭 알아두실 사항
window.anchorVeiw = (function() {
    var el, anchorLst, anchorVw;

    function init() {
        el = $('.layer_content');
        anchorLst = el.find('.top_anchor_list');
        anchorLstLi = anchorLst.find('li');
        anchorLstA = anchorLstLi.find('a');
        anchorVw = $('.anchor_view');

        bindEvent();
    }

    function bindEvent() {
        anchorLstA.on('click', function() {
            anchorLstLi.removeClass('on');
            $(this).parent().addClass('on');
            eq = $(this).parent().index();
            if ($(this).closest('ul').hasClass('list02')) {
                eq = eq + 7
            } else if ($(this).closest('ul').hasClass('list03')) {
                eq = eq + 14
            }
            anchorVw.hide();
            anchorVw.eq(eq).show();

            $('.doscroll .layer_content').jScrollPane({
                mouseWheelSpeed: 100,
                hijackInternalLinks: true
            });
            anchirFocusMove($(this));
        })
    }

    // 200217 : BHY : 웹접근성 포커스 관련 추가
    function anchirFocusMove(_this) {
        var $this = _this,
            waText = "<span class='hide_txt'>현재 탭 활성화</span>";

        anchorLstA.find("span").remove();
        $this.append(waText);    
    }

    return {
        init: init
    }
})();

// 사이트맵 전체메뉴 고정
var siteFixMenu = function() {
    var $siteMenu = $('.site_nav');

    if ($siteMenu.length) {
        $(window).scroll(function() {
            $siteMenu.find('li a').trigger('blur');

            // 메뉴 고정
            if ($(this).scrollTop() > 211) {
                $siteMenu.addClass('fixed');
            } else {
                $siteMenu.removeClass('fixed');
            }

            // 메뉴 활성화
            // 자동차/운전자
            if ($(this).scrollTop() <= $('#a2').offset().top - 176) {
                $siteMenu.find('li').removeClass('on')
                $siteMenu.find('li').eq(0).addClass('on');
            }
            // 건강/어린이
            else if ($(this).scrollTop() <= $('#a3').offset().top - 176) {
                $siteMenu.find('li').removeClass('on')
                $siteMenu.find('li').eq(1).addClass('on');
            }
            // 연금/저축
            else if ($(this).scrollTop() <= $('#a4').offset().top - 176) {
                $siteMenu.find('li').removeClass('on')
                $siteMenu.find('li').eq(2).addClass('on');
            }
            // 생활/레저
            else if ($(this).scrollTop() <= $('#a5').offset().top - 176) {
                $siteMenu.find('li').removeClass('on')
                $siteMenu.find('li').eq(3).addClass('on');
            }
            // 보상/보험금청구
            else if ($(this).scrollTop() <= $('#a6').offset().top - 176) {
                $siteMenu.find('li').removeClass('on')
                $siteMenu.find('li').eq(4).addClass('on');
            }
            //인터넷고객센터
            else if ($(this).scrollTop() <= $('#a7').offset().top - 176) {
                $siteMenu.find('li').removeClass('on')
                $siteMenu.find('li').eq(5).addClass('on');
            }
            // Direct Lab.
            else if ($(this).scrollTop() <= $('#a8').offset().top - 176) {
                $siteMenu.find('li').removeClass('on')
                $siteMenu.find('li').eq(6).addClass('on');
            }
            // 본인인증센터
            else if ($(this).scrollTop() <= $('#a9').offset().top - 176) {
                $siteMenu.find('li').removeClass('on')
                $siteMenu.find('li').eq(7).addClass('on');
            } else {
                $siteMenu.find('li').removeClass('on')
                $siteMenu.find('li').eq(8).addClass('on');
            }
        });

        $siteMenu.on('click', 'li a', function(e) {
            e.preventDefault();
            var $target = $(this).attr('href').split('#')[1];

            if ($target.length) {
                $siteMenu.find('li').removeClass('on');
                $(this).closest('li').addClass('on');

                if ($(this).closest('.site_nav').hasClass('fixed')) {
                    $('body, html').stop().animate({
                        scrollTop: $('#' + $target).offset().top - 60
                    }, 10);
                } else {
                    $('body, html').stop().animate({
                        scrollTop: $('#' + $target).offset().top - 0
                    }, 10);
                }
            }
        });

        $(window).trigger('scroll');
    }
}

// 사이트맵 전체메뉴 고정
var siteFixMenu02 = function() {
    
    var $siteMenu = $('.site_shortcut'),
        $link = $siteMenu.find("li > a"),
        $siteMenuH = $siteMenu.height(),
        boxArray = [],
        _bool = false;
    
    $(".sitemap_box").each(function () {
        var _list = $(this).find("h3").attr("id");
        boxArray.push(_list);
    });
    
    if (boxArray.length === 11) {
        setTimeout(function () {
            _bool = true
        }, 1500);
    }
    
    if ($siteMenu.length) {
        $(window).scroll(function() {
            $siteMenu.find('li a').trigger('blur');

            // 메뉴 고정
            if ($(this).scrollTop() > 211) {
                $siteMenu.addClass('fixed');
            } else {
                $siteMenu.removeClass('fixed');
            }

            // 메뉴 활성화
            // 자동차/운전자
            if ($(this).scrollTop() <= $('#a2').offset().top - ($siteMenuH + 22)) {
                $siteMenu.find('li').removeClass('on')
                $siteMenu.find('li').eq(0).addClass('on');
            }
            // 건강/어린이
            else if ($(this).scrollTop() <= $('#a3').offset().top - ($siteMenuH + 22)) {
                $siteMenu.find('li').removeClass('on')
                $siteMenu.find('li').eq(1).addClass('on');
            }
            // 연금/저축
            else if ($(this).scrollTop() <= $('#a4').offset().top - ($siteMenuH + 22)) {
                $siteMenu.find('li').removeClass('on')
                $siteMenu.find('li').eq(2).addClass('on');
            }
            // 화재/생활
            else if ($(this).scrollTop() <= $('#a6').offset().top - ($siteMenuH + 22)) {
                $siteMenu.find('li').removeClass('on')
                $siteMenu.find('li').eq(3).addClass('on');
            }
            // Foreign
            else if ($(this).scrollTop() <= $('#a7').offset().top - ($siteMenuH + 22)) {
                $siteMenu.find('li').removeClass('on')
                $siteMenu.find('li').eq(5).addClass('on');
            }
            // 이벤트
            // else if ($(this).scrollTop() <= $('#a8').offset().top - ($siteMenuH + 22)) {
            //     $siteMenu.find('li').removeClass('on')
            //     $siteMenu.find('li').eq(6).addClass('on');
            // }
            // 인터넷고객센터
            else if ($(this).scrollTop() <= $('#a8').offset().top - ($siteMenuH + 22)) {
                $siteMenu.find('li').removeClass('on')
                $siteMenu.find('li').eq(6).addClass('on');
            }
            // 보상/보험금청구
            else if ($(this).scrollTop() <= $('#a9').offset().top - ($siteMenuH + 22)) {
                $siteMenu.find('li').removeClass('on')
                $siteMenu.find('li').eq(7).addClass('on');
            }
            // 본인인증센터
            else if ($(this).scrollTop() <= $('#a10').offset().top - ($siteMenuH + 22)) {
                $siteMenu.find('li').removeClass('on')
                $siteMenu.find('li').eq(8).addClass('on');
            }
            //회사소개
            else if ($(this).scrollTop() <= $('#a11').offset().top - ($siteMenuH + 22)) {
                $siteMenu.find('li').removeClass('on')
                $siteMenu.find('li').eq(9).addClass('on');
            }
            //공시실
            else if ($(this).scrollTop() <= $('#a12').offset().top - ($siteMenuH + 22)) {
                $siteMenu.find('li').removeClass('on')
                $siteMenu.find('li').eq(10).addClass('on');
            }
            //소비자보호광장
            else {
                $siteMenu.find('li').removeClass('on')
                $siteMenu.find('li').eq(11).addClass('on');
            }
        });

        $link.on('click', function(e) {
            e.preventDefault();

            if (_bool === false) return false;

            var $target = $(this).attr('href').split('#')[1];
            var eqa = $(this).parent('li').index()

            if ($target.length) {
                $siteMenu.find('li').removeClass('on');
                $(this).closest('li').addClass('on');

                if ($(this).closest('.site_shortcut').hasClass('fixed')) {
                    $('body, html').stop().animate({
                        scrollTop: $('#' + $target).offset().top - ($siteMenuH + 20)
                    }, 10);

                } else {
                    $('body, html').stop().animate({
                        scrollTop: $('#' + $target).offset().top - ($siteMenuH * 2 + 50)
                    }, 10);

                }
            }
        });
        $(window).trigger('scroll');
    }
}

// 동영상 나레이션 보기
var movieNarShow = function() {
    var $obj = $('#container');

    $obj.on('click', '.movie_about .btn_area .btn', function(e) {
        e.preventDefault();

        if ($(this).hasClass('on')) {
            $(this).removeClass('on');
            $('.movie_narration').hide();
        } else {
            $(this).addClass('on');
            $('.movie_narration').show();
        }

        // 디자인 스크롤
        if ($('.txtarea').length) {
            if ($('.txtarea').hasClass('none') == false) {
                $('.txtarea .view').jScrollPane({
                    mouseWheelSpeed: 100,
                    hijackInternalLinks: true
                });
            }
        }
    });
}

//20160218 수정 : 버튼2개 버전 추가
// 상조서비스 업&다운
var prematToggle = function() {
    var $pdsvc_box = $('.pdsvc_box'),
        $btn = $pdsvc_box.find('.bx_btn a'),
        $btn2 = $('.pdsvc_boxs .bx_btn').eq(0).find('a');
    $btn3 = $('.pdsvc_boxs .bx_btn').eq(1).find('a');

    $btn.on('click', function() {
        if ($(this).closest($pdsvc_box).hasClass('on') == true) {
            $(this).attr('title', '펼치기').closest($pdsvc_box).removeClass('on');
            $(this).find('i').attr('class', 'i_topen_r');
        } else {
            $(this).attr('title', '접기').closest($pdsvc_box).addClass('on');
            $(this).find('i').attr('class', 'i_tclose_r');
        }
    });

    //index 값을 못가져오는 에러있음
    $btn2.on('click', function() {
        $('.pdsvc_boxs .open').eq(0).toggle();
        $(this).attr('title', $(this).attr('title') == '펼치기' ? '접기' : '펼치기').find('i').toggleClass('i_topen_r').toggleClass('i_tclose_r');
    });
    $btn3.on('click', function() {
        $('.pdsvc_boxs .open').eq(1).toggle();
        $(this).attr('title', $(this).attr('title') == '펼치기' ? '접기' : '펼치기').find('i').toggleClass('i_topen_r').toggleClass('i_tclose_r');
    });


}

//  캐릭터 선택
var dollMethod = function() {

    // 몬디탭
    var $merrydoll_list = $('.merrydoll_list .doll');

    $merrydoll_list.each(function() {
        $(this).find('dl dd li').eq(0).addClass('on');

        $merrydoll_list.find('dl dd li a').on('click', function(e) {
            e.preventDefault();

            var $idx = $(this).closest('li').index(),
                $class = $(this).closest('li.doll').attr('class').split('doll ')[1],
                $visSrc = $(this).find('img').attr('src').split('thum')[0];

            $(this).closest('dl').next('p').find('img').attr('src', $visSrc + "img_doll_" + $class + "0" + ($idx + 1) + ".jpg");
            imgClick($idx, $(this));

        });

        function imgClick(cnt, target) {
            var obj = target.closest('.merrydoll_list .doll').find("dl dd ul");
            var objC = obj.find(">li");
            var newDoll = objC.eq(cnt).find(">a");
            var newDollImg = newDoll.find(">img").get(0);

            target.closest('li').addClass('on').siblings().removeClass('on');

            target.closest('li').each(function() {
                $(this).siblings().find('img').each(function() {
                    $(this).attr('src', $(this).attr('src').replace('_on.jpg', '_off.jpg'));
                });
            });

            newDollImg.src = newDollImg.src.replace("_off.jpg", "_on.jpg");

        }
    });
}



// 유병자 건강보험 상담센터
window.sickMethod = (function() {
    var $sickMenu, $sickCont, $sick_top, _thisHref;

    function init() {
        $sickMenu = $('.sick_menu');
        $sickCont = $('.sick_cont');
        $sick_top = $('.btn_sick_top');
        $('.top_vis').css({
            display: 'block'
        });
        $('.sick_tit').css({
            display: 'block'
        });
        $sick_top.hide();

        bindEvents();
    }

    function bindEvents() {
        $sickMenu.find('ul li').on('click', 'a', function(e) {
            var a = $('.sick_menu').offset().top;
            var $target_a = $($(this).attr('href'));

            e.preventDefault();
            //_thisHref = $(this).attr('href');
            $sickMenu.find('ul li').removeClass('active');
            $sickMenu.find('ul li a').removeClass('active');
            $(this).closest('li').addClass('active');

            $('.top_vis').hide();
            $('.sick_tit').hide();
            $sickCont.show();

            scrollAni();

            setTimeout(function() {
                $('.sick_view').removeAttr('tabindex')
                $target_a.attr("tabindex", 0).focus();

                $('html,body').animate({
                    scrollTop: $('.sick_menu').offset().top
                }); /* 180515 $('html,body').animate({ scrollTop : 566 }); */

            }, 150);


        });

        $sickMenu.on('mouseenter', 'ul li', function() {
            $sickMenu.find('ul li').removeClass('on');
            $(this).addClass('on');
        }).on('mouseleave', 'ul li', function() {
            $sickMenu.find('ul li').removeClass('on');
        });

        $sickMenu.on('focusin', ' ul li a', function() {
            $sickMenu.find('ul li').removeClass('on');
            $(this).closest('li').addClass('on');
        }).on('focusout', ' ul li a', function() {
            $sickMenu.find('ul li').removeClass('on');
        });

        $sick_top.on('click', function(e) {
            e.preventDefault();
            $sickMenu.find('ul li').removeClass('active');
            $sickMenu.find('ul li a').removeClass('active');
            $sickMenu.removeClass('active');
            $sickCont.hide();
            $sick_top.hide();
            $('.top_vis').show();
            $('.sick_tit').show();

        });
    }

    function scrollAni() {
        if (!$sickMenu.hasClass('active')) {

            $sickMenu.stop(true, false).animate({
                marginTop: -460
            }, {
                duration: 150,
                complete: function() {
                    //$(this).css('margin-top' , 0);
                    $(this).addClass('active');
                    $(this).find('br').remove();
                    $sick_top.show();
                }
            });

            $('.sick_cont').on('jsp-scroll-y', function(event, scrollPositionY, isAtTop, isAtBottom) {
                if (scrollPositionY <= 599) {
                    $('.sick_menu li').removeClass('active');
                    $('.sick_menu .menu01').addClass('active');
                    $('.sick_menu .menu05 a').removeClass('on');
                }
                if (600 <= scrollPositionY) {
                    $('.sick_menu li').removeClass('active');
                    $('.sick_menu .menu02').addClass('active');
                    $('.sick_menu .menu05 a').removeClass('on');
                }
                if (1200 <= scrollPositionY) {
                    $('.sick_menu li').removeClass('active');
                    $('.sick_menu .menu03').addClass('active');
                    $('.sick_menu .menu05 a').removeClass('on');
                }
                if (1800 <= scrollPositionY) {
                    $('.sick_menu li').removeClass('active');
                    $('.sick_menu .menu04').addClass('active');
                    $('.sick_menu .menu05 a').removeClass('on');
                }
                if (2400 <= scrollPositionY) {
                    $('.sick_menu li').removeClass('active');
                    $('.sick_menu .menu05').addClass('active');
                    $('.sick_menu .menu05 a').removeClass('on');
                    $('.sick_menu .menu05 a').eq(0).addClass('on');
                }
                if (3000 <= scrollPositionY) {
                    $('.sick_menu .menu05 a').removeClass('on');
                    $('.sick_menu .menu05 a').eq(1).addClass('on');
                }

            }).jScrollPane({
                mouseWheelSpeed: 100,
                hijackInternalLinks: true,
                /*animateScroll: true*/
            });
        }
    }

    return {
        init: init
    };
})();

//openLayerPopup
var openLayerPopup = function(id) {
    $('.skipnav').attr('tabIndex', 1); //레이어 떴을때 스킵네비로 이동 방지

    var $layer_pop = $('#' + id + " > div").eq(0);

    mz.focusList = mz.focusList || [];
    mz.focusList.push($("*:focus"));

    $layer_pop.fadeIn().addClass('on');
    $layer_pop.find('.layer_wrap').attr("tabindex", 0);
    $('html, body').stop().animate({
        //scrollTop: 0
    }, 0);
    uiLyer.init();
};

//closeLayerPopup
var closeLayerPopup = function(id) {
    $('.skipnav').attr('tabIndex', 0);

    var $layer_pop = $('#' + id + " > div").eq(0);
    $layer_pop.removeClass('on').fadeOut();
    $('a.lypop_current').focus();
    $('a.lypop_current').removeClass('lypop_current');

    setTimeout(function() {
        var obj = mz.focusList.pop();
        obj && obj.get(0) && $(obj.get(0)).focus();
    }, 100);
};

//autocomplete
var autocomplete = function() {
    var $autocomplete = $('.autocomplete'),
        $textarea = $autocomplete.find('.txtarea');
    if ($textarea.find('.inner').height() > 358) {
        $('.jspContainer').css({
            height: 358
        });
        $textarea.css({
            height: 358
        });
    } else {
        $('.jspContainer').css({
            height: $textarea.find('.inner').height()
        });
        $textarea.css({
            height: 'auto'
        });
    }
    if ($textarea.length) {
        if ($textarea.hasClass('none') == false) {
            $('.txtarea .view').jScrollPane({
                mouseWheelSpeed: 100,
                hijackInternalLinks: true
            });
        }
    }
}

// footer
window.uiFooter = (function() {
    var el, f_btn, f_show, showHeight;

    function init() {
        el = $('.ui_fmenu');
        f_btn = el.find('.link_btn');
        f_show = el.find('.ui_show');

        bindEvents();
    }

    function bindEvents() {
        f_btn.on('click', function() {
            if (!f_show.is(":visible")) {
                f_btn.addClass('on'); //2015-12-21 추가
                f_show.slideDown(300);
                $('html, body').animate({
                    scrollTop: $('#footer').offset().top
                }, 300);
                f_show.show();
                f_btn.find('.hide_txt').text('접기') //2016-01-12 추가
                setTimeout(function() {
                    showHeight = el.height() - 42;
                    f_show.css('height', showHeight);
                }, 500)
            } else if (f_show.is(":visible")) {
                f_btn.removeClass('on'); //2015-12-21 추가
                f_show.slideUp(300, function() {
                    f_btn.find('.hide_txt').text('펼치기') //2016-01-12 추가
                    f_show.hide();
                })
            }
        })
    }
    return {
        init: init
    }
})();

//top버튼 이벤트
window.topEvent = (function() {
    var el, el2, el3;

    function init() {
        el = $('.topbtn');
        el2 = $('aside>.fltop_btn');
        el3 = $('#pmmifloating').find('.fs_wrap.best');


        if ($('#pmmifloating').css('display') == 'none') {
            if ($(window).scrollTop() == 0) {
                el.hide();
            }
        } else {
            el.hide();
        }

        bindEvent();
    }

    function bindEvent() {

        if ($('#pmmifloating').css('display') == 'none') {
            $(window).scroll(function() {
                if ($(window).scrollTop() == 0) {
                    el.hide();
                } else if ($(window).scrollTop() >= 200) {
                    el.fadeIn(200);
                }
            });
        }


        el.on('click', function() {
            //$(window).scrollTop(0,0);
            $('html,body').animate({
                scrollTop: 0
            }, 200)
        });
        el2.on('click', function() {
            $('html,body').animate({
                scrollTop: 0
            }, 200)
        })
        el3.on('click', function() {
            $('html,body').animate({
                scrollTop: 0
            }, 200)
        })
    }

    return {
        init: init
    }
})();

// 탭 썸네일
window.uiFrTab = (function() {
    var el, fr_tab_list, fr_tab_a;

    function init() {
        el = $('.fr_tab');
        fr_tab_list = el.find('ul > li');
        fr_tab_a = fr_tab_list.find('a');

        bindEvents();
    }
    // 200217 : BHY : 웹접근성 활성화 탭 정보제공 추가
    function bindEvents() {
        var waText = "<span class='hide_txt'>현재 탭 활성화</span>";

        fr_tab_a.first().append(waText);

        fr_tab_list.each(function() {
            fr_tab_a.on('click', function(e) {
                e.preventDefault();

                if (!$(this).parent().hasClass('on')) {
                    $(this).parent().addClass('on');
                    $(this).append(waText);
                    $(this).parent().siblings().removeClass('on');
                    $(this).parent().siblings().find('span').remove();
                } else {
                    $(this).parent().addClass('on');
                }
            })
        })
    }
    return {
        init: init
    }
})();

// promotion event
window.promotionEvent = (function() {
    var el, pmtBtn, pmtBtnA, pmtEvent, pmtEventCls;

    function init() {
        el = $('.bn_event');
        pmtBtn = el.find('.btn_img');
        pmtBtnA = pmtBtn.find('a');
        pmtEvent = el.find('.bn_event_detail');
        pmtEventCls = pmtEvent.find('.close');

        bindEvents();
    }

    function bindEvents() {
        pmtBtnA.on('click', function() {
            el.addClass('open');
            // pmtBtn.hide();
            // pmtEvent.slideDown();
        })
        pmtEventCls.on('click', function() {
            el.removeClass('open');
            // pmtEvent.hide();
            // pmtBtn.show();
        })
    }
    return {
        init: init
    }
})();

// 알뜰한 내 보험료 확인
window.uiSideLayer = (function() {
    var el, layerCc, layerCs, layerCcBtn, layerCsBtn, showDirCc, showDirCs;

    function init() {
        el = $('.bx_mydirect');
        layerCc = el.find('.dir_cc');
        layerCcBtn = layerCc.find('.btn_dir_cc');
        layerCs = el.find('.dir_cs');
        layerCsBtn = layerCs.find('.btn_dir_cs');
        showDirCc = layerCc.find('.ly_mydirect');
        showDirCs = layerCs.find('.ly_mydirect');
        hideDir = el.find('.close');

        bindEvents();
    }

    function bindEvents() {
        layerCcBtn.on('click', function(e) {
            e.preventDefault();
            showDirCc.fadeIn("100");
        })
        layerCsBtn.on('click', function(e) {
            e.preventDefault();
            showDirCs.fadeIn("100");
        })
        hideDir.on('click', function() {
            showDirCc.fadeOut("100");
            showDirCs.fadeOut("100");
        })
    }
    return {
        init: init,
    }
})();

function closeCcEvents() {
    $('#ly_dir_cc').fadeOut("100");
    $('#ly_dir_cc input[type="text"]').val("");
    //$('#ly_dir_cc input:radio:eq(0)').prop("checked", true);
    //$('#ly_dir_cc .radio_style').addClass("on");
    //$('#ly_dir_cc .radio_style:eq(1)').removeClass("on");
}

function closeCsEvents() {
    $('#ly_dir_cs').fadeOut("100");
    $('#ly_dir_cs input[type="text"]').val("");
    //$('#ly_dir_cs input:radio:eq(0)').prop("checked", true);
    //$('#ly_dir_cs .radio_style').addClass("on");
    //$('#ly_dir_cs .radio_style:eq(1)').removeClass("on");
}

// 자동차 변경(차량대체) 선택
window.uiCarSearch = (function() {
    var el, index, steps, stepText, stepTexts;

    function init() {
        el = $('.select_car');
        steps = el.find('.bx');

        steps.find('.car_list li').removeClass('on');

        el.find('>div').each(function() {
            index = $(this).index() + 1
            bindStep(index);
        })
    }

    function scrollInit() {
        $('.bx .view').jScrollPane({
            mouseWheelSpeed: 100,
            hijackInternalLinks: true,
            animateScroll: true
        });

    }

    function bindStep(index) {

        $('.step0' + index).off('click', '.car_list>li>a').on('click', '.car_list>li>a', function(e) {
            e.preventDefault();
            var step1CarIdx = $(this).closest('li').index();
            var _this = $(this)
            //console.log('step',index)
            //console.log('stepIdx',step1CarIdx)
            stepSetEvent(index, _this);

            stepText = $(this).find('span').eq(0).text();

            $('.select_car_depth').find('li').eq(index - 1).find('span').text(stepText);
            $('.select_car_depth').find('li').eq(index - 1).addClass('on');

            if (index == 1 && step1CarIdx == 11) {
                etcCarPosition(index, step1CarIdx);
                $('.select_car_depth').find('li').eq(0).find('span').eq(0).text('제조사');
                $('.select_car_depth').find('li').eq(0).removeClass('on');
            }

            if (index == 5 && $('.step05 ').eq(0).is(':visible')) {

                $('.step0' + (index - 1)).removeClass('open');
                $('.step0' + index).removeClass('selected').addClass('open');

            } else if ($('.step05 ').eq(1).is(':visible')) {
                radioEvent();
            }

            scrollInit();

            api = $('.step0' + index + ' .view').data('jsp');
            api.scrollToElement($('.step0' + index).find('li').eq(step1CarIdx))

            getCars(index, step1CarIdx)
            scrollInit();
        })

    }

    function etcCarbindEvent(index) {
        $('.step01').off('click', '.ui_etc_car>li>a').on('click', '.ui_etc_car>li>a', function(e) {
            var step1EtcCarIdx = $(this).closest('li').index();
            var _this = $(this)
            stepSetEvent(index, _this)

            stepTexts = $(this).find('span').eq(0).text();

            $('.select_car_depth').find('li').eq(index - 1).find('span').text(stepTexts);
            $('.select_car_depth').find('li').eq(index - 1).addClass('on');

            getEtcCars(index)
        })
    }

    function stepSetEvent(index, _this) {
        $('.step0' + index).find('li').removeClass('on');
        $('.step0' + (index + 1)).find('li').removeClass('on');
        _this.closest('li').addClass('on');

        if (_this.find('.hide_txt').length <= 0) {
            $('.step0' + index).find('li a .hide_txt').remove();
            _this.find('span').eq(0).after('<span class="hide_txt">_선택</span>');
        }

        if ($('.step0' + index).hasClass('open')) {
            $('.step0' + index).removeClass('open').addClass('selected');
            $('.step0' + (index + 1)).addClass('open');
        } else if ($('.step0' + index).hasClass('selected')) {
            for (var i = index; i < steps.length - 1; i++) {
                var titleText = $('.select_car_depth').find('li').eq(i).attr('title');

                $('.step0' + (i + 1)).removeClass('open');
                $('.step0' + (i + 1)).removeClass('selected');
                $('.select_car_depth').find('li').eq(i).removeClass('on');

                $('.select_car_depth').find('li').eq(i).find('span').text(titleText);
                $('.select_car_depth').find('li').eq(i).removeClass('on');
            }

            $('.step0' + (index + 1)).removeClass('selected').addClass('open');
        }
    }

    function etcCarPosition(index, step1CarIdx) {

        if (!$('.step01').find('.etc').hasClass('etc_on')) {
            $('.step02').removeClass('open');
            $('.step01').removeClass('selected').addClass('open');
            $('.step01').find('li').removeClass('on');
            $('.step01').find('.etc').addClass('etc_on');
            scrollInit();
            api = $('.step01 .view').data('jsp');
            api.scrollBy(0, $('.step01').find('li').eq(11).offset().top);
            etcCarbindEvent(index)
        } else {
            $('.step02').removeClass('open');
            $('.step01').removeClass('selected').addClass('open');
            $('.step01').find('li').removeClass('on');
            $('.step01').find('.etc').removeClass('etc_on');
            api = $('.step01 .view').data('jsp');
            //api.destroy();
        }

    }

    function getCars(index, step1CarIdx, car) {

        if (index == 1) {
            //var car ='<li><a href="#"><span class="prd_name">i30</span></a></li><li><a href="#"><span class="prd_name">i40</span></a></li><li><a href="#"><span class="prd_name">LF소나타</span></a></li><li><a href="#"><span class="prd_name">갤로퍼</span></a></li><li class=""><a href="#"><span class="prd_name">그랜져</span></a></li><li><a href="#"><span class="prd_name">그레이스</span></a></li><li><a href="#"><span class="prd_name">다이너스티</span></a></li><li><a href="#"><span class="prd_name">마르샤</span></a></li><li><a href="#"><span class="prd_name">라비타</span></a></li><li><a href="#"><span class="prd_name">맥스크루즈</span></a></li><li><a href="#"><span class="prd_name">싼타페</span></a></li><li></li>';
            $('.step02 ul').html(car).promise().done(function() {
                bindStep(index);
            });
        }

        if (index == 2) {
            $('.step02 ul').html(car).promise().done(function() {
                bindStep(index);
            });
            $('.step02').find('.nano-pane').hide();
        } else if (index == 3) {
            $('.step03 ul').html(car).promise().done(function() {
                bindStep(index);
            });
        } else if (index == 4) {
            $('.step04 ul').html(car).promise().done(function() {
                bindStep(index);
            });
        }

    }

    function getEtcCars(index) {
        //var car;
        //var car = '<li><a href="#"><span class="prd_name">AVALON</span></a></li><li><a href="#"><span class="prd_name">CAMRY</span></a></li><li><a href="#"><span class="prd_name">PRIUS</a></li><li><a href="#"><span class="prd_name">PRIUS V</span></a></li><li><a href="#"><span class="prd_name">RAV4</span></a></li><li><a href="#"><span class="prd_name">SIENA</span></a></li><li></li><li></li><li></li><li></li><li></li><li></li>';
        $('.step02 .car_list').html(car).promise().done(function() {
            bindStep(index);
        });
    }

    function radioEvent() {
        $('.step05').eq(1).find('li .ipt_radio :radio').off('change').on('change', function() {
            $('.board_write').slideUp();
            $('.radio_style').removeClass('on');
            $(this).closest('.radio_style').addClass('on');
            $(this).closest('.ipt_radio').next('.board_write').slideDown(function() {
                scrollInit();
            });
        })

        $('.step05').eq(1).find('li .board_write .ipt_check .checkbox').on('change', function(e) {
            if ($('.step05').eq(1).find('li .board_write .ipt_check .check_style').hasClass('on')) {
                $('.step05').find('.car_cont .btn_g01s').removeClass('disable');
            } else if (!$('.step05').eq(1).find('li .board_write .ipt_check .check_style').hasClass('on')) {
                $('.step05').find('.car_cont .btn_g01s').addClass('disable');
            }
        })

    }

    return {
        init: init
    }
})();

//Mondi-Car 지원 차량 레이어 팝업 탭
window.uiMondiCarLayer = (function() {
    var el, elTab, tabBox, tabList, elCont;

    function init() {
        el = $('.smart_car');
        elTab = el.find('.tab_list');
        tabBox = elTab.find('ul');
        tabList = tabBox.find('li');
        elCont = el.find('.smart_cont');

        bindEvent();
    }

    function bindEvent() {
        tabList.on('click', 'a', function() {
            var tabIdx = $(this).closest('li').index();
            tabList.removeClass('on');
            $(this).closest('li').addClass('on');

            elCont.removeClass('on');
            elCont.eq(tabIdx).addClass('on');
            $('.smart_d_layer ').jScrollPane({
                mouseWheelSpeed: 100,
                hijackInternalLinks: true,
                animateScroll: true
            });
        })
    }

    return {
        init: init
    }
})();

//레이어 위치 및 스크롤 옵션
window.uiLyer = (function() {

    var el, heigth, checkr, checkedready = false,
        elcount;

    function init() {
        heigth = $(window).height();
        el = $('.layer_wrap');
        el = $('.layer_wrap')[el.length - 1]
        el = $(el);
        el.css({
            visibility: "hidden"
            //opacity : 0,
            //height : 140
        })
        if (el.length > 0) {
            checkr = setInterval(check_reay, 500);
        }
    }

    function check_reay() {

        //엘리먼트의 높이를 재서 브라우저에 그려 졌는지 확인!
        if (el.height() > 150) {
            bindEvents();
            clearInterval(checkr);
        }
    };

    function bindEvents() {

        if (el.hasClass('doscroll')) {
            $('.doscroll .layer_content').jScrollPane({
                mouseWheelSpeed: 100,
                hijackInternalLinks: true,
                animateScroll: true
            });
        }
        if (el.height() > $(window).height()) {

            el.css({
                visibility: "visible",
                top: ($(window).scrollTop() - 105)
            }).focus();
        } else {
            el.offset({
                top: (heigth - el.height()) / 2 + $(window).scrollTop()
            });
            el.css({
                visibility: "visible",
                opacity: 1
            }).focus();

        }

    }
    return {
        init: init
    }
})();

window.goDirect = (function() {
    var directUrl, el

    function init() {
        bindEvent();
    }

    function bindEvent() {
        call_panel();
        get_url();
    }

    function call_panel() {
        //높이 계산
        // 스크롤 높을때
        // 낮을때
        var panelHTML2 = '';
        panelHTML2 += '<div id="goDirect" style="position:fixed;top:0;left:0;right:0;bottom:0;z-index:1;overflow:auto;"></div>';

        var panelHTML = '';
        panelHTML += '	<div id="uiDirectPannel" style="position:relative;width:1200px;height:840px;padding:1px 3px 3px 1px;background: url(/subscribe/images/pd/pn/bg_layer_sdw.png) no-repeat left 30px;z-index: 105;margin:0 auto;">';
        panelHTML += '<iframe name="contract"  style="width:100%; height:800px;  overflow-y: hidden; border:none;margin-top:30px" scrolling="no" id="directFrame"></iframe>';
        panelHTML += '		<a href="#" class="frame_close" style="display:inline-block;position:absolute;top:0px;right:3px;padding-left:20px;font-size:18px;color:#555555;text-decoration:none;line-height:20px;background:url(/subscribe/images/pd/pn/bg_btn_frame.png) no-repeat left 2px" id="frame_close">종료</a>';
        panelHTML += '	</div>';
        $('body').append(panelHTML2).css({
            overflow: 'hidden'
        });
        $('#goDirect').animate({
            backgroundColor: '#B5B5B5'
        }, function() {
            $('#goDirect').append(panelHTML)
            setPosition();
        })
        //$('body').append(panelHTML).css({overflow: 'hidden'});
    }

    function setPosition() {
        el = $('#uiDirectPannel');

        var width = $(window).width();
        var height = $(window).height()


        $(window).on('resize', function(e) {
            height = $(window).height();

            if (840 < height) {
                el.css({
                    marginTop: ((height - 840) / 2)
                });
            } else {
                $('body').css({
                    width: 800
                });
            }

        }).trigger('resize');

        set_url()
        closebind();

    }

    function closebind() {

        $('#frame_close').on('click', function() {
            $('#uiDirectPannel').remove();
            $('#goDirect').animate({
                backgroundColor: '#ffffff'
            }, function() {
                $('.ui_layer_frame , #goDirect').remove();
                $('body').removeAttr('style')
            })

        });

    }

    function set_url() {
        $('#directFrame').attr('src', 'https://storetest.meritzfire.com:19144/auto-and-driver/direct-auto/contract.do#!/i')
    }

    function get_url() {
        // 비동기 호출로 URL 변경 가능//
        directUrl = ""
        //set_url()
    };

    return {
        init: init
    }
})();

//main direct lab info
window.dLabInfo = (function() {
    var el;

    function init() {
        el = $('.main_cont04');
        dlabCont = el.find('.dlab');
        dlabList = dlabCont.find('li');
        dlabList.find('a:not(:first)').width(140);

        bindEvent();
    }

    function bindEvent() {
        dlabList.on('click', '>a', function(e) {
            var dlabIdx = $(this).parent().index();

            if (!$(this).parent().hasClass('on')) {
                e.preventDefault();

                dlabList.find('a').stop().animate({
                    width: 140
                }, 200, function() {
                    dlabList.removeClass('on');
                });
            }

            setTimeout(function() {
                dlabList.eq(dlabIdx).addClass('on');
                dlabList.eq(dlabIdx).find('a').stop().animate({
                    width: 610
                }, 300);
            }, 250);
        })
    }

    return {
        init: init
    }
})();
//main visual event
window.MainVisCalc = (function() {
    //	var el, switchEl, option2Radio, option3Radio;
    //	var option
    //	var option1
    //	var option2
    //	var option3
    //	var disCountVal
    //	var movePx
    //	var calcCount;
    //	var calcCountTxt;
    //
    function init() {
        //
        //		el = $('.cont_inner');
        //		switchEl = el.find('.option_group a');
        //		option2Radio = el.find('.option_group .item02');
        //		option3Radio = el.find('.option_group .item03');
        //		option = 1
        //		option1 = 0.162
        //		option2 = 1
        //		option3 = 1
        //		disCountVal = 0;
        //		movebar = 0;
        //
        //		var options = {
        //			useEasing : true,
        //			useGrouping : true,
        //			separator : ',',
        //			decimal : '.',
        //			prefix : '',
        //			suffix : ''
        //		};
        //		calcCount = new CountUp(el.find('.result .count')[0], 0, 0, 1, 1, options);
        //		calcCountTxt = new CountUp(el.find('.value_area_result')[0], 0, 0, 1, 1, options);
        //		calcCount.start();
        //		calcCountTxt.start();
        //
        //		if(!el.find('.option_group .btn_bar_area').hasClass('off')){
        //			switchEl.attr('data-per',0.162);
        //			option = switchEl.attr('data-per');
        //			option1 = Math.round((1-option)*1000)/1000;
        //		}else{
        //			switchEl.attr('data-per',1);
        //			option = switchEl.attr('data-per');
        //			option1 = Math.round((1-option)*1000)/1000;
        //		}
        //
        //		moveAni();
        //		bindEvent();
    }
    //
    //	function bindEvent(){
    //		// 인터넷 할인 적용
    //		switchEl.on('click', function(){
    //			if(!el.find('.option_group .btn_bar_area').hasClass('off')){
    //				$('.btn_bar_area').addClass('off');
    //				option = switchEl.attr('data-per',0);
    //				option1 = Math.round((1-option)*1000)/1000;
    //			}else{
    //				$('.btn_bar_area').removeClass('off');
    //				option = switchEl.attr('data-per',0.162);
    //				option1 = Math.round((1-option)*1000)/1000;
    //			}
    //			option1 = Math.round((1-switchEl.attr('data-per'))*1000)/1000;
    //
    //			moveAni();
    //		});
    //
    //		// 주행거리
    //		option2Radio.find('.select_radio input').on('change', function(){
    //			$(this).closest('.step01').prev().removeClass();
    //			$(this).closest('.step01').prev().addClass('step_bar '+ $(this).attr('id'));
    //
    //			replaceImg('#step00', 'off');
    //			replaceImg('#step01', 'off');
    //			replaceImg('#step02', 'off');
    //			replaceImg('#step03', 'off');
    //			replaceImg('#step04', 'off');
    //
    //			if($(this).attr('id') == 'step00'){
    //				replaceImg('#step00', 'on');
    //			}else if($(this).attr('id') == 'step01'){
    //				replaceImg('#step00', 'on');
    //				replaceImg('#step01', 'on');
    //			}else if($(this).attr('id') == 'step02'){
    //				replaceImg('#step01', 'on');
    //				replaceImg('#step02', 'on');
    //			}else if($(this).attr('id') == 'step03'){
    //				replaceImg('#step02', 'on');
    //				replaceImg('#step03', 'on');
    //			}else if($(this).attr('id') == 'step04'){
    //				replaceImg('#step03', 'on');
    //				replaceImg('#step04', 'on');
    //			}
    //
    //			option2 = Math.round((1-$(this).attr('data-per'))*1000)/1000;
    //
    //			moveAni();
    //		});
    //
    //		// 무사고 경력
    //		option3Radio.find('.select_radio input').on('change', function(){
    //			$(this).closest('.step01').prev().removeClass();
    //			$(this).closest('.step01').prev().addClass('step_bar '+ $(this).attr('id'));
    //
    //			replaceImg('#step06', 'off');
    //			replaceImg('#step07', 'off');
    //
    //			if($(this).attr('id') == 'step06'){
    //				replaceImg('#step06', 'on');
    //			}else if($(this).attr('id') == 'step07'){
    //				replaceImg('#step07', 'on');
    //			}
    //
    //			option3 = Math.round((1-$(this).attr('data-per'))*1000)/1000;
    //
    //			moveAni();
    //		});
    //
    //	}
    //
    //	function replaceImg(obj, onOff){
    //		// var img1 = $(obj).next('label').find('img');
    //		var img1 = $(obj).next('label');
    //
    //		if(onOff == 'on'){
    //			// img1.attr({src: img1.attr('src').replace(/_off.gif/g, '_on.gif')});
    //			img1.addClass('on');
    //		}else if(onOff == 'off'){
    //			//img1.attr({src: img1.attr('src').replace(/_on.gif/g, '_off.gif')});
    //			img1.removeClass('on');
    //		}
    //	}
    //
    //	function moveAni(){
    //
    //		disCountVal = Math.round((1-(option1*option2*option3))*1000)/10
    //		if(disCountVal == 100){
    //			disCountVal = 45.3;
    //		}
    //		per = disCountVal/45.3*100;
    //
    //		moveBar = Math.round(-85*per/100);
    //		moveArrow = Math.round(-23*per/100);
    //		moveIcon = Math.round(49*per/100);
    //
    //		//el.find('.result .count').text(disCountVal);
    //		calcCount.update(disCountVal);
    //
    //		if(disCountVal == 0){
    //			el.find('.value_area .result').hide();
    //			var valueImg = el.find('.value_area img');
    //			valueImg.attr({src: valueImg.attr('src').replace(/_on.png/g, '_off.png')});
    //		}else{
    //			el.find('.value_area .result').show();
    //			calcCountTxt.update(disCountVal);
    //
    //			var valueImg = el.find('.value_area img');
    //			valueImg.attr({src: valueImg.attr('src').replace(/_off.png/g, '_on.png')});
    //		}
    //
    //		$('.img_drt_bg').stop().animate({top:-85 - moveBar});
    //		$('.img_drt').stop().animate({top:49 + moveIcon});
    //		$('.discout_group > .txt_area').stop().animate({top:-23 - moveArrow})
    //	}
    //
    return {
        init: init
    }
})();

//main sub roll
window.mainEvtRoll = (function() {
    var el, slide_wrap, slide_box, slide_item, slide_bullet, slideStopNgo, slide_item_length, slide_box_width, slideIdx, bn_slide_Time, playBool;

    function init() {
        el = $('.main_cont03');
        slide_wrap = el.find('.r_img_area');
        slide_box = slide_wrap.find('>.uiEvent');
        slide_item = slide_box.find('>li');

        slide_bullet = el.find('.ul_btn > a:not(:last)');
        slideStopNgo = el.find('.ul_btn > a:last');

        slide_item_length = slide_item.length;

        bn_slide_Time = setInterval(function() {}, 10000);
        slideIdx = 0;
        playBool = false;

        slide_item.css({
            opacity: 0,
            display: 'none'
        })
        slide_item.eq(0).css({
            opacity: 1,
            display: 'block'
        })

        bindEvent();
        setRollTime();

    }

    function bindEvent() {

        slide_bullet.bind('click', function(e) {
            e.preventDefault();

            bulletIdx = $(this).index();

            slideIdx = bulletIdx;

            slide_bullet.removeClass('on');
            slide_bullet.eq(slideIdx).addClass('on');

            bnSlideAni();
        });

        slide_bullet.bind('mouseover', function() {
            clearInterval(bn_slide_Time);
            bn_slide_Time = null;
        }).bind('mouseout', function() {
            if (playBool === false && bn_slide_Time === null) {
                setRollTime();
            }
        });

        slide_wrap.bind('mouseover', function() {
            clearInterval(bn_slide_Time);
            bn_slide_Time = null;
        }).bind('mouseout', function() {
            if (playBool === false && bn_slide_Time === null) {
                setRollTime();
            }
        });

        slideStopNgo.on('click', function() {

            if (!playBool) {

                clearInterval(bn_slide_Time);
                bn_slide_Time = null;

                slideStopNgo.removeClass('stop').addClass('play');
                slideStopNgo.find('.hide_txt').text('play');

            } else if (playBool && bn_slide_Time === null) {

                slideStopNgo.removeClass('play').addClass('stop');
                slideStopNgo.find('.hide_txt').text('stop');
                setRollTime();
            }

            playBool = !playBool;

        });
    }

    function bnSlideAni() {

        slide_item.stop(true, true).animate({
            opacity: 0
        }, 700).hide(700);
        slide_item.eq(slideIdx).css({
            opacity: 0
        }).stop(true, true).animate({
            opacity: 1
        }, 800).show();
        slide_bullet.removeClass('on');
        slide_bullet.eq(slideIdx).addClass('on');
    }

    function bnSlideCalc() {

        slideIdx = (slideIdx < 0) ? slide_item_length - 1 : (slideIdx > slide_item_length - 1) ? 0 : slideIdx;
    }

    function bnAutoSlide() {
        if (slide_item_length > 1) {
            slideIdx++;
            bnSlideCalc();
            bnSlideAni();
        } else if (slide_item_length === 1) {
            return false;
        }
    }

    function setRollTime() {
        bn_slide_Time = setInterval(bnAutoSlide, 3000)
    }

    return {
        init: init
    }
})();

//main Sns roll
window.mainSnsRoll = (function() {
    var el, slide_wrap, slide_box, slide_item, slide_bullet, slideStopNgo, slide_item_length, slide_box_width, slideIdx, bn_slide_Time, playBool;

    function init() {
        el = $('.main_cont04');
        slide_wrap = el.find('.k_sns');
        slide_box = slide_wrap.find('>.uiSns');
        slide_item = slide_box.find('>li');

        slide_bullet = el.find('.ul_btn > a:not(:last)');
        slideStopNgo = el.find('.ul_btn > a:last');

        slide_item_length = slide_item.length;

        bn_slide_Time = setInterval(function() {}, 10000);
        slideIdx = 0;
        playBool = false;

        slide_item.css({
            opacity: 0,
            display: 'none'
        })
        slide_item.eq(0).css({
            opacity: 1,
            display: 'block'
        })

        bindEvent();
        setRollTime();

    }

    function bindEvent() {

        slide_bullet.bind('click', function(e) {
            e.preventDefault();

            bulletIdx = $(this).index();

            slideIdx = bulletIdx;

            slide_bullet.removeClass('on');
            slide_bullet.eq(slideIdx).addClass('on');

            bnSlideAni();
        });

        slide_bullet.bind('mouseover', function() {
            clearInterval(bn_slide_Time);
            bn_slide_Time = null;
        }).bind('mouseout', function() {
            if (playBool === false && bn_slide_Time === null) {
                setRollTime();
            }
        });

        slide_wrap.bind('mouseover', function() {
            clearInterval(bn_slide_Time);
            bn_slide_Time = null;
        }).bind('mouseout', function() {
            if (playBool === false && bn_slide_Time === null) {
                setRollTime();
            }
        });

        slideStopNgo.on('click', function() {

            if (!playBool) {

                clearInterval(bn_slide_Time);
                bn_slide_Time = null;

                slideStopNgo.removeClass('stop').addClass('play');
                slideStopNgo.find('.hide_txt').text('play');

            } else if (playBool && bn_slide_Time === null) {

                slideStopNgo.removeClass('play').addClass('stop');
                slideStopNgo.find('.hide_txt').text('stop');
                setRollTime();
            }

            playBool = !playBool;

        });
    }

    function bnSlideAni() {

        slide_item.stop(true, true).animate({
            opacity: 0
        }, 700).hide(700);
        slide_item.eq(slideIdx).css({
            opacity: 0
        }).stop(true, true).animate({
            opacity: 1
        }, 800).show();
        slide_bullet.removeClass('on');
        slide_bullet.eq(slideIdx).addClass('on');
    }

    function bnSlideCalc() {

        slideIdx = (slideIdx < 0) ? slide_item_length - 1 : (slideIdx > slide_item_length - 1) ? 0 : slideIdx;
    }

    function bnAutoSlide() {
        if (slide_item_length > 1) {
            slideIdx++;
            bnSlideCalc();
            bnSlideAni();
        } else if (slide_item_length === 1) {
            return false;
        }
    }

    function setRollTime() {
        bn_slide_Time = setInterval(bnAutoSlide, 3500)
    }

    return {
        init: init
    }
})();

//메인 기능 전체 초기화(직판)
window.uiMain = (function() {
    function init() {
        MainVisCalc.init();
        dLabInfo.init(); //메인 다이렉트 연구소 안내
        mainEvtRoll.init(); //메인 이벤트 배너 롤링
        mainSnsRoll.init(); //메인 sns 배너 롤링
        mainCtn.init(); //메인 커튼 베너
    }
    return {
        init: init
    }
})();

//메인 비주얼 롤링(대표)
window.main_de = (function() {
    function init() {
        playMain()
    }

    function playMain() {
        mainSubRoll.init();
        mainVisual.init();
    }
    return {
        init: init,
        playMain: playMain
    }
})();

function noticePop() {
    location.href = "https://www.meritzfire.com/footer/notice.do#!/01";
}

//메인 커튼 배너 기능
window.mainCtn = (function() {
    function init() {
        checkTpl()
    }

    function checkTpl() {
        //시스템 작업시간(커튼배너 노출시간)
        var stDt = "2018072016"; //시작시간 (이시간부터 보임)
        var endDt = "2018072207"; //종료시간 (이시간부터 안보임)
        var date = new Date();
        var today = date.getFullYear() + ("0" + (date.getMonth() + 1)).slice(-2) + ("0" + date.getDate()).slice(-2) + ("0" + date.getHours()).slice(-2)

        var tplUrl = '/default/views/comm/topEvent/topEvent.tpl';
        $.ajax({
            url: tplUrl,
            type: 'HEAD',
            error: function() {
                //console.log("topEvent error!");

            },
            success: function() {

                $.post(tplUrl, function(data) {
                    $('#header').prepend(data);
                    // 메인배너 팝업
                    if (eval(stDt) <= eval(today) && eval(today) < eval(endDt)) {
                        $('.top_bnnr').show();
                    }
                    bindEvent()
                });



            }
        });


    }


    function bindEvent() {
        $('a.btn_bnnr_close').on('click', function(e) {
            e.preventDefault()
            $('.top_bnnr ').slideUp('fast', function() {
                $(this).remove();
            })
        })
    }

    return {
        init: init,
    }
})();

window.mainVisual = (function() {
    var el, viv, cntrl, timer, nowStatus = 0,
        checkINter, endAnimation, psce = 7000;

    function init() {
        el = $('.main_vis')
        viv = el.find('ul li')
        cntrl = el.find('.control > a')
        cntrleq = cntrl.length - 1;
        timerb = el.find('.timer_bar span')
        bindEvent()
        playing(0)
    }

    function reset() {
        timerb.stop();
        timerb.css({
            width: 1
        })
    }



    function stop() {
        reset()
        timerb.stop();
    }

    function playing(idx) {
        viewcrl(nowStatus)
        showcon(nowStatus)
        timerb.css({
            width: 1
        })
        if (!cntrl.eq(cntrleq).hasClass('play')) {

            timerb.animate({
                width: "100%"
            }, psce, function() {

                timerb.css({
                    width: '1px'
                })


                if (nowStatus < cntrleq - 1) {
                    nowStatus++

                } else {
                    nowStatus = 0;
                }
                playing(nowStatus);
            })

        }

        //2018-01-23 웹접근성 추가
        if (!cntrl.eq(cntrleq).hasClass('play') || !cntrl.eq(cntrleq).hasClass('pause')) {
            cntrl.find('.hide_txt').remove();
            cntrl.eq(idx).append('<span class="hide_txt">현재 선택</span>');
        }

    }
    // <span class="hide_txt">현재 선택</span>
    function bindEvent() {
        reset()
        cntrl.off('click').on('click', function(e) {
            e.preventDefault();
            if ($(this).index() == cntrleq) {
                setPs($(this).attr('class'))
                if (!$(this).find('.hide_txt').length) {
                    $(this).append('<span class="hide_txt">현재 선택</span>');
                }
            } else {
                setControll($(this).index())
                cntrl.find('.hide_txt').remove();
            }

        });

    }

    function viewcrl(idx) {
        cntrl.removeClass('on')
        cntrl.eq(idx).addClass('on')
    }

    function setControll(idx) {
        nowStatus = idx;
        reset()
        playing(idx);

        // cntrl.removeClass('on')
        // cntrl.eq(idx).addClass('on')
        //cntrl.eq(cntrleq).removeClass('play').addClass('pause').text('잠시멈춤')

    }

    function showcon(idx) {
        viv.removeClass('on').hide()
        viv.eq(idx).addClass('on').fadeIn(300)


    }

    function setPs(name) {
        if (name == "pause") {
            cntrl.eq(cntrleq).removeClass('pause').addClass('play').text('재생')
            stop();

        } else {

            cntrl.eq(cntrleq).removeClass('play').addClass('pause').text('잠시멈춤')

            playing();
            endAnimation = true;
        }
    }
    return {
        init: init,
        reset: reset,
        stop: stop

    }

})();

//메인 서브 롤링
window.mainSubRoll = (function() {
    var el, prodList, arrClass;

    function init() {
        el = $('.rolling');
        prodList = el.find('li');
        prodControll = el.find('.control');
        bindEvent();
    }

    function bindEvent() {
        prodControll.on('click', '>a', function() {
            var btnIdx = $(this).index();

            $(this).closest('.control').find('>a').removeClass('on');
            $(this).addClass('on');
            $(this).closest('.rolling').find('ul li').removeClass('on');
            $(this).closest('.rolling').find('ul li').eq(btnIdx).addClass('on');
        });
    }

    return {
        init: init
    }
})();

//본인인증 통신사 약관 2016-03-03
window.telecomSlt = (function() {
    var el, telecomTab, telecomTabList, tabIdx, telecomView, telecomNum;

    function init() {
        el = $('.telecom_area');
        telecomTab = el.find('.telecom_tab');
        telecomTabList = telecomTab.find('li');
        tabIdx = telecomTabList.index();
        telecomView = el.find('.layer_content');
        telecomNum = telecomView.find('.telecom_num');

        bindEvent();
    }

    function bindEvent() {
		if(!telecomTabList.eq(0).children('a').find('.hide_txt').length > 0){
			telecomTabList.eq(0).children('a').trigger('click')
		}
        telecomTabList.on('click', '>a', function(e) {
            e.preventDefault();
            var tabIdx = $(this).closest('li').index();

            $(this).parent().siblings().removeClass('on');
			$(this).parent().siblings().find('.hide_txt').remove();
            $(this).parent().addClass('on');
            $(this).parent().append('<span class="hide_txt">현재 선택</span>');
            //console.log(tabIdx);
            telecomNum.eq(tabIdx).show();
            telecomNum.eq(tabIdx).siblings().hide();
            $('.doscroll .layer_content').jScrollPane({
                mouseWheelSpeed: 100,
                hijackInternalLinks: true
            })
        })


    }

    return {
        init: init
    }
})();

// 재물메이트
window.bxConsultant = (function() {
    var el;

    function init() {
        el = $('.bx_consultant');
        bttn = el.find('.btn');
        bttnIco = bttn.find('i');

        bindEvent();
    }

    function bindEvent() {
        bttn.on('click', function(e) {
            e.preventDefault();
            if (!bttnIco.hasClass('i_open')) {
                bttnIco.addClass('i_open');
            } else {
                bttnIco.removeClass('i_open');
            }
            el.next().toggle();
        })
    }

    return {
        init: init
    }
})();

//2016-05-26 운전자 가입사례
window.joinCase = (function() {
    var el, tabBtnArea, tabBtnAreaLi, tabBtnAreaLiA, tabViewArea, tabViewAreaBox01, tabViewAreaBox02, clickViewbox01, clickViewbox02;

    function init() {
        el = $('.join_case');
        tabBtnArea = el.find(".tab_btn_area");
        tabBtnAreaLi = tabBtnArea.find("li");
        tabBtnAreaLiA = tabBtnAreaLi.find("a");

        tabViewArea = el.find(".tab_view_area");
        tabViewAreaBox01 = tabViewArea.find('.viewbox01');
        clickArea01 = tabViewAreaBox01.find('.click_area');
        clickAreaA01 = clickArea01.find('a');

        tabViewAreaBox02 = tabViewArea.find('.viewbox02');
        clickArea02 = tabViewAreaBox02.find('.click_area');
        clickAreaA02 = clickArea02.find('a');


        clickViewbox01 = tabViewAreaBox01.find('.click_viewbox');
        clickViewboxList01 = clickViewbox01.find('li');

        clickViewbox02 = tabViewAreaBox02.find('.click_viewbox');
        clickViewboxList02 = clickViewbox02.find('li');

        bindEvents();

    }

    function bindEvents() {

        tabBtnAreaLiA.on('click', function(e) {
            e.preventDefault;

            var tabBtn = $(this).parent();
            var idx = $(this).parent().index();

            $('.click_viewbox li').hide(); // 테이블 초기화
            $('.click_area li').removeClass('on'); // 말풍선 초기화

            if (!tabBtn.hasClass('on')) {
                tabBtn.addClass('on');
                tabBtn.siblings().removeClass('on');
            } else {
                tabBtn.siblings().removeClass('on');
            }

            if (idx == 0) {
                tabViewArea.find('.viewbox01').show();
                tabViewArea.find('.viewbox02').hide();
                $('.click_area li:first-child').addClass('on');
                $('.click_viewbox li:first-child').show();
            } else {
                tabViewArea.find('.viewbox01').hide();
                tabViewArea.find('.viewbox02').show();
                $('.click_area li:first-child').addClass('on');
                $('.click_viewbox2 li:first-child').show();
            }
        })

        clickAreaA01.on('click', function(e) {
            e.preventDefault;

            var clickBtn = $(this).parent()
            var idx = $(this).parent().index();


            if (!clickBtn.hasClass('on')) {
                clickBtn.addClass('on');
                clickBtn.siblings().removeClass('on');
            } else {
                clickBtn.siblings().removeClass('on');

            }

            if (idx == 0) {
                clickViewboxList01.hide();
                clickViewboxList01.eq('0').fadeIn('slow');
            } else if (idx == 1) {
                clickViewboxList01.hide();
                clickViewboxList01.eq('1').fadeIn('slow');
            } else {
                clickViewboxList01.hide();
                clickViewboxList01.eq('2').fadeIn('slow');
            }
        })

        clickAreaA02.on('click', function(e) {
            e.preventDefault;

            var clickBtn = $(this).parent()
            var idx = $(this).parent().index();


            if (!clickBtn.hasClass('on')) {
                clickBtn.addClass('on');
                clickBtn.siblings().removeClass('on');
            } else {
                clickBtn.siblings().removeClass('on');

            }

            if (idx == 0) {
                clickViewboxList02.hide();
                clickViewboxList02.eq('0').fadeIn('slow');
            } else if (idx == 1) {
                clickViewboxList02.hide();
                clickViewboxList02.eq('1').fadeIn('slow');
            } else {
                clickViewboxList02.hide();
                clickViewboxList02.eq('2').fadeIn('slow');
            }
        })
    }

    return {
        init: init
    };

})();

// 유병자 가입사례 팝
window.uiItgrInsPop = (function() {
    var el, btn01, btn02, btn03;

    function init() {
        el = $('.ui_itgrIns');
        tabBtn = el.find('.sick_menu');
        tabBtnLi = tabBtn.find('li');
        tabBtnLiA = tabBtnLi.find('a');
        $sickMenu = $('.sick_menu');

        bindEvent();
    }

    function bindEvent() {
        $sickMenu.find('ul li').on('click', 'a', function(e) {
            var a = $('.sick_menu').offset().top;

            e.preventDefault();
            $sickMenu.find('ul li').removeClass('active');
            $sickMenu.find('ul li a').removeClass('active');
            $sickMenu.find('ul li a .hide_txt').remove();
            $(this).append('<span class="hide_txt">현재 선택</span>');
            $(this).closest('li').addClass('active');
        });

        $sickMenu.on('mouseenter', 'ul li', function() {
            $sickMenu.find('ul li').removeClass('on');
            $(this).addClass('on');
        }).on('mouseleave', 'ul li', function() {
            $sickMenu.find('ul li').removeClass('on');
        });

        $sickMenu.on('focusin', ' ul li a', function() {
            $sickMenu.find('ul li').removeClass('on');
            $(this).closest('li').addClass('on');
        }).on('focusout', ' ul li a', function() {
            $sickMenu.find('ul li').removeClass('on');
        });

        tabBtnLiA.on('click', function(e) {
            e.preventDefault();
            var idx = $(this).parent().index();
            $('.itg_cont').hide().removeAttr('tabindex');
            $('.itg_cont').eq(idx).show().attr('tabindex', '0').focus();
            $('.doscroll .layer_content').jScrollPane({
                mouseWheelSpeed: 100,
                hijackInternalLinks: true
            });
        });
    }

    return {
        init: init
    }
})();

/* 170605 마이어카운트 플로팅배너 */
var myAccount_floating = (function() {
    var num = 0;

    return {
        /* 170714

        move2:function(){
        	$('.bodyCon>ul').children('li').eq(num).children('.textCon').css('margin-top','50px');
        	$('.bodyCon>ul').children('li').eq(num).children('.textCon').animate({'margin-top':0},300,function(){});
        	$('.bodyCon>ul').children('li').eq(num).siblings().removeClass('on').children('.textCon').css('font-family','RixSGo M');
        	$('.bodyCon>ul').children('li').eq(num).addClass('on').children('.textCon').css('font-family','RixSGo B');
        	num++;
        	if(num>2){
        		num=0;
        	}
        }
        */
        move2: function() {
            //console.log("num::::::::::"+num);

            if (num > 3) {
                num = 1;
                $('.bodyCon>ul').css('margin-left', '-10px')
            }
            var tr = -1 * 130 * (num);
            $('.bodyCon>ul').stop().animate({
                'margin-left': tr
            }, 400);
            num++;
        }
    };
})();

if (typeof window.etribe === 'undefined') window.etribe = {};

/* 채팅창 리사이즈 & 드래그 */
window.etribe.chatDragResize = (function() {
    var window_resize_disable;
    var before_min_height;
    var after_min_height;
    var chattion_win;
    var default_width;
    var default_height;

    // cookie
    ! function(e) {
        var n = !1;
        if ("function" == typeof define && define.amd && (define(e), n = !0), "object" == typeof exports && (module.exports = e(), n = !0), !n) {
            var t = window.Cookies,
                o = window.Cookies = e();
            o.noConflict = function() {
                return window.Cookies = t, o
            }
        }
    }(function() {
        function e() {
            for (var e = 0, n = {}; e < arguments.length; e++) {
                var t = arguments[e];
                for (var o in t) n[o] = t[o]
            }
            return n
        }

        function n(t) {
            function o(n, r, i) {
                var c;
                if ("undefined" != typeof document) {
                    if (arguments.length > 1) {
                        if (i = e({
                                path: "/"
                            }, o.defaults, i), "number" == typeof i.expires) {
                            var a = new Date;
                            a.setMilliseconds(a.getMilliseconds() + 864e5 * i.expires), i.expires = a
                        }
                        i.expires = i.expires ? i.expires.toUTCString() : "";
                        try {
                            c = JSON.stringify(r), /^[\{\[]/.test(c) && (r = c)
                        } catch (s) {}
                        r = t.write ? t.write(r, n) : encodeURIComponent(String(r)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent), n = encodeURIComponent(String(n)), n = n.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent), n = n.replace(/[\(\)]/g, escape);
                        var f = "";
                        for (var u in i) i[u] && (f += "; " + u, i[u] !== !0 && (f += "=" + i[u]));
                        return document.cookie = n + "=" + r + f
                    }
                    n || (c = {});
                    for (var p = document.cookie ? document.cookie.split("; ") : [], d = /(%[0-9A-Z]{2})+/g, l = 0; l < p.length; l++) {
                        var g = p[l].split("="),
                            m = g.slice(1).join("=");
                        '"' === m.charAt(0) && (m = m.slice(1, -1));
                        try {
                            var C = g[0].replace(d, decodeURIComponent);
                            if (m = t.read ? t.read(m, C) : t(m, C) || m.replace(d, decodeURIComponent), this.json) try {
                                m = JSON.parse(m)
                            } catch (s) {}
                            if (n === C) {
                                c = m;
                                break
                            }
                            n || (c[C] = m)
                        } catch (s) {}
                    }
                    return c
                }
            }
            return o.set = o, o.get = function(e) {
                return o.call(o, e)
            }, o.getJSON = function() {
                return o.apply({
                    json: !0
                }, [].slice.call(arguments))
            }, o.defaults = {}, o.remove = function(n, t) {
                o(n, "", e(t, {
                    expires: -1
                }))
            }, o.withConverter = n, o
        }
        return n(function() {})
    });

    function init() {
        chattion_win = $('.chattion_win');

        window_resize_disable = false;
        before_min_height = 580;
        after_min_height = 95;
        default_width = 400;
        default_height = 650;


        chattion_win
            .draggable({
                containment: 'window',
                iframeFix: true,
                handle: '.chatbot_handle',
                scroll: false,
                start: function(event, ui) {
                    window_resize_disable = true;
                },
                stop: function(event, ui) {
                    before_min_height = chattion_win.height();
                    window_resize_disable = false;
                    saveData();
                }
            })
            .resizable({
                containment: 'document',
                handles: 'all',
                /* handles: '.ui-resizable-handle', */
                maxHeight: 750,
                maxWidth: 550,
                minHeight: default_height,
                minWidth: default_width,
                start: function(event, ui) {
                    window_resize_disable = true;
                    $('iframe').css('pointer-events', 'none');
                },
                stop: function(event, ui) {
                    before_min_height = chattion_win.height();
                    window_resize_disable = false;
                    $('iframe').css('pointer-events', 'auto');
                    saveData();
                }
            });

        loadData();

        if (chattion_win.height() < 150) {
            chattion_win.removeClass('ui-state-disabled').addClass('ui-resizable-disabled isMin');
            chattion_win.draggable('option', 'disabled', true);
            $('.chatbot_min').addClass('isMin');
            if (before_min_height < default_height) {
                before_min_height = default_height
            }
        }

        if (chattion_win.hasClass('isMin')) {
            chattion_win.css({
                'top': 'auto',
                'left': 'auto'
            });
        }

        $('.chatbot_min').on('click', function(e) {
            e.preventDefault();

            if (chattion_win.hasClass('isMin')) {
                disableMinSize();
                $('.chatbot_min').removeClass('isMin');
				$('.chatbot_min').find('.hide_txt').text('챗봇 접기');
            } else {
                enableMinSize();
                chattion_win.css({
                    'top': 'auto',
                    'left': 'auto',
                    'right': '16px',
                    'bottom': '10px'
                }).css({
                    'top': 'unset',
                    'left': 'unset',
                    'right': '16px',
                    'bottom': '10px'
                });
                $('.chatbot_min').addClass('isMin');
				$('.chatbot_min').find('.hide_txt').text('챗봇 펼치기');
            }
            saveData();
        });

        $(window).on('resize.chatbot', function() {
            if (window_resize_disable) {
                return;
            }
            /*
             * chattion_win.position({ of: 'body', my: 'right bottom', at:
             * 'right bottom', collision: 'fit fit', top:'unset', left:'unset' })
             */
            saveData();
        });
    }

    function init_u_ie11() {
        $('.chatbot_handle').css('visibility', 'hidden');
        if ($('.ui-resizable-handle').length > 0) {
            $('.ui-resizable-handle').css('visibility', 'hidden')
        }

        chattion_win = $('.chattion_win');

        window_resize_disable = false;
        before_min_height = 580;
        after_min_height = 95;
        default_width = 400;
        default_height = 650;

        loadData();

        if (chattion_win.height() < 150) {
            chattion_win.removeClass('ui-state-disabled').addClass('ui-resizable-disabled isMin');
            $('.chatbot_min').addClass('isMin');
        }

        if (chattion_win.hasClass('isMin')) {
            chattion_win.css({
                'top': 'auto',
                'left': 'auto'
            });
        }

        $('.chatbot_min').on('click', function(e) {
            e.preventDefault();

            if (chattion_win.hasClass('isMin')) {
                disableMinSize();
                $(this).removeClass('isMin');
            } else {
                enableMinSize();
                $('.chat_agree').css('display', 'none');
                chattion_win.css({
                    'top': 'auto',
                    'left': 'auto',
                    'right': '16px',
                    'bottom': '10px'
                }).css({
                    'top': 'unset',
                    'left': 'unset',
                    'right': '16px',
                    'bottom': '10px'
                });
                $(this).addClass('isMin');
            }
            saveData();
        });

        $(window).on('resize.chatbot', function() {
            if (window_resize_disable) {
                return;
            }
            /*
             * chattion_win.position({ of: 'body', my: 'right bottom', at:
             * 'right bottom', collision: 'fit fit', top:'unset', left:'unset' })
             */
            saveData();
        });
    }

    function enableMinSize() {
        before_min_height = chattion_win.height();
        chattion_win.addClass('isMin').css({
            height: after_min_height
        });
        $(window).triggerHandler('resize.chatbot');
        if (window.document.documentMode > 10 || window.document.documentMode == undefined) {
            chattion_win.draggable('option', 'disabled', true);
            chattion_win.removeClass('ui-state-disabled').addClass('ui-resizable-disabled');
			if (chattion_win.hasClass('isMin')) {
				$('.chatbot_min').find('.hide_txt').text('챗봇 펼치기');
			}else if(!chattion_win.hasClass('isMin')){
				$('.chatbot_min').find('.hide_txt').text('챗봇 접기');		
			}
        }
    }

    function disableMinSize() {
        if (before_min_height < 100) {
            before_min_height = default_height;
        }
        chattion_win.removeClass('isMin').css({
            height: before_min_height
        });
        $(window).triggerHandler('resize.chatbot');
        if (window.document.documentMode > 10 || window.document.documentMode == undefined) {
            chattion_win.draggable('option', 'disabled', false);
            chattion_win.removeClass('ui-resizable-disabled');
			if (chattion_win.hasClass('isMin')) {
				$('.chatbot_min').find('.hide_txt').text('챗봇 펼치기');
			}else if(!chattion_win.hasClass('isMin')){
				$('.chatbot_min').find('.hide_txt').text('챗봇 접기');		
			}
        }
        var chat_position2 = {
            top: $('#chatbot_wrap').find('.chattion_win').css('top') + 104,
            left: $('#chatbot_wrap').find('.chattion_win').css('left') + 24
        };
        $('.chat_agree').css(chat_position2)
    }

    function loadData() {
        var chat_position, chat_size, chat_position2;

        if (Cookies.get('chat_position') && Cookies.get('chat_position') != "undefined") {
            chat_position = JSON.parse(Cookies.get('chat_position'));
            if (chat_position.left == 0) {
                $('#chatbot_wrap').find('.chattion_win').css({
                    'top': 'auto',
                    'left': 'auto',
                    'right': '16px',
                    'bottom': '10px'
                }).css({
                    'top': 'unset',
                    'left': 'unset',
                    'right': '16px',
                    'bottom': '10px'
                });
            } else {
                chattion_win.css(chat_position);
                chat_position2 = {
                    top: chat_position.top + 104,
                    left: chat_position.left + 24
                };
                $('.chat_agree').css(chat_position2)
            }

        } else {
            $('#chatbot_wrap').find('.chattion_win').css({
                'top': 'auto',
                'left': 'auto',
                'right': '16px',
                'bottom': '10px'
            }).css({
                'top': 'unset',
                'left': 'unset',
                'right': '16px',
                'bottom': '10px'
            });
        }

        if (Cookies.get('chat_size')) {
            chat_size = JSON.parse(Cookies.get('chat_size'));

            before_min_height = chat_size.before_min_height;

            if (chat_size.height < after_min_height || chat_size.height == null) {
                /* 타이밍 늦어져서 height값 못 읽어와서 1로 넘어올 경우 대비 */
                chat_size.width = default_width;
                $('#chatbot_wrap').find('.chattion_win').css({
                    'top': 'auto',
                    'left': 'auto',
                    'right': '16px',
                    'bottom': '10px'
                }).css({
                    'top': 'unset',
                    'left': 'unset',
                    'right': '16px',
                    'bottom': '10px'
                });
            }

            chattion_win.css(chat_size);

            //			if(chattion_win.css('height') == '95px'){
            //				setTimeout(function(){
            //					$('#chatbot_wrap').find('.chattion_win').removeClass('ui-state-disabled').addClass('ui-resizable-disabled isMin');
            //				}, 400);
            //			}

            if (window.innerHeight <= chat_size.height) {
                enableMinSize();
                setTimeout(function() {
                    $(window).triggerHandler('resize.chatbot');
                }, 100);
            }

        } else {
            chattion_win.css({
                'width': default_width,
                'height': default_height
            });
            if (chattion_win.css('height') == '95px') {
                setTimeout(function() {
                    $('#chatbot_wrap').find('.chattion_win>.chatbot_min').addClass('isMin');
                    $('#chatbot_wrap').find('.chattion_win').removeClass('ui-state-disabled').addClass('ui-resizable-disabled isMin');
					if (chattion_win.hasClass('isMin')) {
						$('.chatbot_min').find('.hide_txt').text('챗봇 펼치기');
					}else if(!chattion_win.hasClass('isMin')){
						$('.chatbot_min').find('.hide_txt').text('챗봇 접기');		
					}
                }, 300);
            }
        }
        if (chattion_win.css('height') == '95px') {
            setTimeout(function() {
                $('#chatbot_wrap').find('.chattion_win>.chatbot_min').addClass('isMin');
                $('#chatbot_wrap').find('.chattion_win').removeClass('ui-state-disabled').addClass('ui-resizable-disabled isMin');
				if (chattion_win.hasClass('isMin')) {
					$('.chatbot_min').find('.hide_txt').text('챗봇 펼치기');
				}else if(!chattion_win.hasClass('isMin')){
					$('.chatbot_min').find('.hide_txt').text('챗봇 접기');		
				}
            }, 300);
        }

    }

    function saveData() {
        var chat_position = chattion_win.position();
        if (chat_position != undefined) {
            var chat_position2 = {
                top: chat_position.top + 104,
                left: chat_position.left + 24
            };
            $('.chat_agree').css(chat_position2);
        }
        var chat_size = {
            width: chattion_win.width(),
            height: chattion_win.height(),
            before_min_height: before_min_height
        };

        Cookies.set('chat_position', JSON.stringify(chat_position));
        Cookies.set('chat_size', JSON.stringify(chat_size));
    }

    function under_ie11() {
        var min = $('#chatbot_wrap').find('.chattion_win').find('.chatbot_min');
        min.on('click', function(e) {
            e.preventDefault();

            if (min.hasClass('isMin')) {
                min.removeClass('isMin').parent().css('height', '580px');
            } else {
                min.addClass('isMin').parent().css('height', '95px');
				if (chattion_win.hasClass('isMin')) {
					$('.chatbot_min').find('.hide_txt').text('챗봇 펼치기');
				}else if(!chattion_win.hasClass('isMin')){
					$('.chatbot_min').find('.hide_txt').text('챗봇 접기');		
				}
            }
        });
    }

    return {
        init: init,
        init_u_ie11: init_u_ie11
    };
})();


// 200218 : BHY : 웹접근성 포커스 관련 추가
window.chk_errmeritz = (function () {
    var ck_btn;

    function init() {
        ck_btn = $(".chk_errmeritz");
        bindEvent();
    }
    function bindEvent() {
        ck_btn.on({
            click: function () {
                var $this = $(this);
                focusMoveEvent($this);
            }
        });
    }
    
    function focusMoveEvent(_this) {
        var targetBtn = _this,
            errorText = $('.frmbox').find('.txt_error');

        // 내보험료 에러메세지 포커스이동
        targetBtn.parents('.frmbox').find('.error').first().find('.txt_error').attr('tabindex', '0').focus();
        errorText.on('focusout', function(e) {
            $(this).removeAttr('tabindex');
            $(this).siblings().find("input[type=text]").focus();
        });
    }
    return {
        init: init
    }
})();




//챗봇 플로팅 배너 시나리오
(function($) {
    'use strict'
    // namespace
    if (typeof window.etribe === 'undefined') window.etribe = {}
    if (typeof window.etribe.chatbot === 'undefined') window.etribe.chatbot = {}


    var ns = window.etribe.chatbot
    /**
     * 상담로봇 몬디의 행동을 제어한다
     */
    ns.mondiManager = (function() {
        var type1, type2, type3, type4, popTween;
		var chatTextArr = [
 			       			['반가워요! 저는 인공지능 상담로봇 몬디입니다'],
 			       			['어려운 보험은 NO! 쉽게 알려드릴게요'],
 			       			['보험이 궁금할 때, 저에게 물어보세요'],
 			       			['보험이 궁금할 때, 저에게 물어보세요']
 			       		];
    		var changeupTextArr = [
    			['보험 가입할 때 무엇을 알아봐야 할까요?'],
    			['보험 비교포인트, 하나씩 알려드릴게요'],
    			['보험이 궁금할 때, 저에게 물어보세요'],
    			['보험이 궁금할 때, 저에게 물어보세요']
    		];
    		var nudgeTextArr = [
    			['나는 어떤 보험이 필요할까요?'],
    			['어려운 보험은 NO! 쉽게 알려드릴게요'],
    			['보험이 궁금할 때, 저에게 물어보세요'],
    			['보험이 궁금할 때, 저에게 물어보세요']
    		];
    		var changeupTextArr2 = [
    			['보험 가입할 때 무엇을 알아봐야 할까요?'],
    			['보험 비교포인트, 하나씩 알려드릴게요'],
    			['보험이 궁금할 때, 저에게 물어보세요'],
    			['보험이 궁금할 때, 저에게 물어보세요']
    		];
          
          var lastWArr = [
	            {
	                'bubble_txt': null,
	                'textWidth': null,
	                'textHeight': null
	            },{
	                'bubble_txt': null,
	                'textWidth': null,
	                'textHeight': null
	            },{
	                'bubble_txt': null,
	                'textWidth': null,
	                'textHeight': null
	            },{
	                'bubble_txt': null,
	                'textWidth': null,
	                'textHeight': null
	            }
          ];
        var currentType = "chatt_type";

        var imgConArr = ['/default/images/common/chattbot/ico_chatbot_body01.png', '/default/images/common/chattbot/ico_chatbot_body02.png', '/default/images/common/chattbot/ico_chatbot_body01.png', '/default/images/common/chattbot/ico_chatbot_body02.png'];

        var impl = {
            init: function() {
                // console.info('initialize')

                type1 = new TimelineMax({
                    paused: true
                })
                type1.timeScale(1)
                type1.addLabel('type1');

                type1.add([
                        TweenMax.to('.chat_step04', 0.1, {
                            display: 'none'
                        }), TweenMax.to('.txt_chat_last', 0.1, {
                            display: 'none'
                        })
                    ])
                    .add(TweenMax.to('.chatting_sol_wrap', 0.5, {
                        opacity: 1
                    }))

                type1.add(TweenMax.fromTo('.chatting_sol_wrap', 0.2, {
                        autoAlpha: 0,
                        scale: 0
                    }, {
                        autoAlpha: 1,
                        scale: 1,
                        ease: Power2.easeOut
                    }))
                    .add(TweenMax.to('.chatting_sol_wrap', 0.1, {
                        opacity: 1
                    }))
                    .add([TweenMax.fromTo('.chat_mondi_con_img', 0.3, {
                        'opacity': 0
                    }, {
                        'opacity': 1,
                        ease: Power1.easeOut
                    }), TweenMax.fromTo('.chat_mondi_con>div', 0.3, {
                        'opacity': 0
                    }, {
                        'opacity': 1,
                        ease: Power1.easeOut
                    })])
                    .add([TweenMax.to('.chatting_sol_wrap', 0.2, {
                        opacity: 1
                    }),
                    function() {
                        // 190411 : BHY : 챗봇 닫기생성
                        chatBotClose();
                    }])


                    .add([
                        TweenMax.to('.chat_step01', 0.5, {
                            display: 'block',
                            autoAlpha: 0
                        }),
                        TweenMax.to('.chat_step02', 0.5, {
                            display: 'block',
                            autoAlpha: 1
                        })
                    ])
                    .add(TweenMax.to('.chatting_sol_wrap', 0.5, {
                        opacity: 1
                    }))
                    .add([
                        TweenMax.to('.chat_step01', 0.5, {
                            autoAlpha: 1
                        }),
                        TweenMax.to('.chat_step02', 0.5, {
                            autoAlpha: 0
                        })
                    ])
                    .add([
                        TweenMax.to('.chatting_sol_wrap', 2, {
                            opacity: 1
                        }),
                        function() {
                            talking_bubble(false, chatTextArr[0].join('<br>'), 'chatt_type')
                        }
                    ]);
                if (chatTextArr.length > 1 && chatTextArr[1].toString().length > 2) {
                    type1.add(TweenMax.to('.chatting_sol_wrap', 2, {
                            opacity: 1
                        }))
                        .add([
                            TweenMax.to('.chatting_sol_wrap', 2, {
                                opacity: 1
                            }),
                            function() {
                                talking_bubble(true, chatTextArr[1].join('<br>'), 'chatt_type')
                                mondi_chang('chat_step03')
                            }
                        ]);
                }

                if (chatTextArr.length > 2 && chatTextArr[2].toString().length > 2) {
                    type1.add(TweenMax.to('.chatting_sol_wrap', 2, {
                        opacity: 1
                    }))
                    type1.add([
                        TweenMax.to('.chatting_sol_wrap', 2, {
                            opacity: 1
                        }),
                        function() {
                            talking_bubble(true, chatTextArr[2].join('<br>'), 'chatt_type');
                            mondi_chang2('chat_step04');
                        }
                    ]);
                }

                if (chatTextArr.length > 3 && chatTextArr[3].toString().length > 2) {
                    type1.add(TweenMax.to('.chatting_sol_wrap', 1, {
                            opacity: 1
                        }))
                        .add([
                            TweenMax.to('.chatting_sol_wrap', 2, {
                                opacity: 1
                            }),
                            function() {
                                talking_bubble(true, chatTextArr[3].join('<br>'), 'chatt_type')
                                mondi_chang2('chat_step04');
                            }
                        ]);
                }

                type1.add(TweenMax.to('.chatting_sol_wrap', 2, {
                        opacity: 1
                    }))
                    .add([
                        TweenMax.to('.chatting_sol_wrap', 2, {
                            opacity: 1
                        }),
                        function() {
                            final_ani()
                        }
                    ])
                    .add(TweenMax.to('.chatting_sol_wrap', 7, {
                        opacity: 1
                    }))


                type2 = new TimelineMax({
                    paused: true
                });
                type2.addLabel('type2')
                // .add(TweenMax.to('.chatting_sol_wrap', 0.5, { autoAlpha: 1 }))
                type2.add(TweenMax.fromTo('.chatting_sol_wrap', 0.001, {
                        autoAlpha: 0,
                        scale: 0
                    }, {
                        autoAlpha: 1,
                        scale: 1,
                        ease: Power2.easeOut
                    }))
                    .add([TweenMax.fromTo('.chat_mondi_con_img', 0.3, {
                        'opacity': 0
                    }, {
                        'opacity': 1,
                        ease: Power1.easeOut
                    }), TweenMax.fromTo('.chat_mondi_con>div', 0.3, {
                        'opacity': 0
                    }, {
                        'opacity': 1,
                        ease: Power1.easeOut
                    })])
                type2.add([
                        TweenMax.to('.chatting_sol_wrap', 2, {
                            opacity: 1
                        }),
                        function() {
                            talking_bubble(true, changeupTextArr[0].join('<br>'), 'now_type')
                            mondi_chang('chat_step05')
                        }
                    ])
                    .add(TweenMax.to('.chatting_sol_wrap', 1, {
                        opacity: 1
                    }));


                if (changeupTextArr.length > 1 && changeupTextArr[1].toString().length > 2) {
                    type2.add([
                        TweenMax.to('.chatting_sol_wrap', 2, {
                            opacity: 1
                        }),
                        function() {
                            talking_bubble(true, changeupTextArr[1].join('<br>'), 'now_type')
                            mondi_chang('chat_step06')
                        }
                    ]);
                }

                if (changeupTextArr.length > 2 && changeupTextArr[2].toString().length > 2) {
                    type2.add(TweenMax.to('.chatting_sol_wrap', 2, {
                        opacity: 1
                    }))
                    type2.add([
                        TweenMax.to('.chatting_sol_wrap', 2, {
                            opacity: 1
                        }),
                        function() {
                            talking_bubble(true, changeupTextArr[2].join('<br>'), 'now_type');
                            mondi_chang2('chat_step04');
                        }
                    ]);
                }

                if (changeupTextArr.length > 3 && changeupTextArr[3].toString().length > 2) {
                    type2.add(TweenMax.to('.chatting_sol_wrap', 1, {
                            opacity: 1
                        }))
                        .add([
                            TweenMax.to('.chatting_sol_wrap', 2, {
                                opacity: 1
                            }),
                            function() {
                                talking_bubble(true, changeupTextArr[3].join('<br>'), 'now_type');
                                mondi_chang2('chat_step04');
                            }
                        ]);
                }


                type2.add(TweenMax.to('.chatting_sol_wrap', 2, {
                        opacity: 1
                    }))
                    .add([
                        TweenMax.to('.chatting_sol_wrap', 2, {
                            opacity: 1
                        }),
                        function() {
                            final_ani()
                        }
                    ])
                    .add(TweenMax.to('.chatting_sol_wrap', 7, {
                        opacity: 1
                    }))

                type3 = new TimelineMax({
                    paused: true
                })
                type3.addLabel('type3')
                // .add(TweenMax.to('.chatting_sol_wrap', 0.5, { autoAlpha: 1
                // }))
                type3.add(TweenMax.fromTo('.chatting_sol_wrap', 0.001, {
                        autoAlpha: 0,
                        scale: 0
                    }, {
                        autoAlpha: 1,
                        scale: 1,
                        ease: Power2.easeOut
                    }))
                    .add([TweenMax.fromTo('.chat_mondi_con_img', 0.3, {
                        'opacity': 0
                    }, {
                        'opacity': 1,
                        ease: Power1.easeOut
                    }), TweenMax.fromTo('.chat_mondi_con>div', 0.3, {
                        'opacity': 0
                    }, {
                        'opacity': 1,
                        ease: Power1.easeOut
                    })])
                type3.add([
                    TweenMax.to('.chatting_sol_wrap', 2, {
                        opacity: 1
                    }),
                    function() {
                        talking_bubble(true, nudgeTextArr[0].join('<br>'), 'nuts_type')
                        mondi_chang('chat_step04')
                    }
                ]);

                if (nudgeTextArr.length > 1 && nudgeTextArr[1].toString().length > 2) {
                    type3.add(TweenMax.to('.chatting_sol_wrap', 2, {
                            opacity: 1
                        }))
                        .add([
                            TweenMax.to('.chatting_sol_wrap', 2, {
                                opacity: 1
                            }),
                            function() {
                                talking_bubble(true, nudgeTextArr[1].join('<br>'), 'nuts_type')
                                mondi_chang('chat_step07')
                            }
                        ])
                }

                if (nudgeTextArr.length > 2 && nudgeTextArr[2].toString().length > 2) {
                    type3.add(TweenMax.to('.chatting_sol_wrap', 2, {
                        opacity: 1
                    }))
                    type3.add([
                        TweenMax.to('.chatting_sol_wrap', 2, {
                            opacity: 1
                        }),
                        function() {
                            talking_bubble(true, nudgeTextArr[2].join('<br>'), 'nuts_type');
                            mondi_chang2('chat_step04');
                        }
                    ]);
                }

                if (nudgeTextArr.length > 3 && nudgeTextArr[3].toString().length > 2) {
                    type3.add(TweenMax.to('.chatting_sol_wrap', 1, {
                            opacity: 1
                        }))
                        .add([
                            TweenMax.to('.chatting_sol_wrap', 2, {
                                opacity: 1
                            }),
                            function() {
                                talking_bubble(true, nudgeTextArr[3].join('<br>'), 'nuts_type');
                                mondi_chang2('chat_step04');
                            }
                        ]);
                }

                type3.add(TweenMax.to('.chatting_sol_wrap', 2, {
                        opacity: 1
                    }))
                    .add([
                        TweenMax.to('.chatting_sol_wrap', 2, {
                            opacity: 1
                        }),
                        function() {
                            final_ani()
                        }
                    ])
                    .add(TweenMax.to('.chatting_sol_wrap', 7, {
                        opacity: 1
                    }))

                type4 = new TimelineMax({
                    paused: true
                });
                type4.addLabel('type4')
                // .add(TweenMax.to('.chatting_sol_wrap', 0.5, { autoAlpha: 1 }))
                type4.add(TweenMax.fromTo('.chatting_sol_wrap', 0.001, {
                        autoAlpha: 0,
                        scale: 0
                    }, {
                        autoAlpha: 1,
                        scale: 1,
                        ease: Power2.easeOut
                    }))
                    .add([TweenMax.fromTo('.chat_mondi_con_img', 0.3, {
                        'opacity': 0
                    }, {
                        'opacity': 1,
                        ease: Power1.easeOut
                    }), TweenMax.fromTo('.chat_mondi_con>div', 0.3, {
                        'opacity': 0
                    }, {
                        'opacity': 1,
                        ease: Power1.easeOut
                    })])

                type4.add([
                        TweenMax.to('.chatting_sol_wrap', 2, {
                            opacity: 1
                        }),
                        function() {
                            talking_bubble(true, changeupTextArr2[0].join('<br>'), 'now_type2')
                            mondi_chang('chat_step05')
                        }
                    ])
                    .add(TweenMax.to('.chatting_sol_wrap', 1, {
                        opacity: 1
                    }));


                if (changeupTextArr2.length > 1 && changeupTextArr2[1].toString().length > 2) {
                    type4.add([
                        TweenMax.to('.chatting_sol_wrap', 2, {
                            opacity: 1
                        }),
                        function() {
                            talking_bubble(true, changeupTextArr2[1].join('<br>'), 'now_type2')
                            mondi_chang('chat_step06')
                        }
                    ]);
                }

                if (changeupTextArr2.length > 2 && changeupTextArr2[2].toString().length > 2) {
                    type4.add(TweenMax.to('.chatting_sol_wrap', 2, {
                        opacity: 1
                    }))
                    type4.add([
                        TweenMax.to('.chatting_sol_wrap', 2, {
                            opacity: 1
                        }),
                        function() {
                            talking_bubble(true, changeupTextArr2[2].join('<br>'), 'now_type2');
                            mondi_chang2('chat_step04');
                        }
                    ]);
                }

                if (changeupTextArr2.length > 3 && changeupTextArr2[3].toString().length > 2) {
                    type4.add(TweenMax.to('.chatting_sol_wrap', 1, {
                            opacity: 1
                        }))
                        .add([
                            TweenMax.to('.chatting_sol_wrap', 2, {
                                opacity: 1
                            }),
                            function() {
                                talking_bubble(true, changeupTextArr2[3].join('<br>'), 'now_type2');
                                mondi_chang2('chat_step04');
                            }
                        ]);
                }


                type4.add(TweenMax.to('.chatting_sol_wrap', 2, {
                        opacity: 1
                    }))
                    .add([
                        TweenMax.to('.chatting_sol_wrap', 2, {
                            opacity: 1
                        }),
                        function() {
                            final_ani()
                        }
                    ])
                    .add(TweenMax.to('.chatting_sol_wrap', 7, {
                        opacity: 1
                    })
                )
            }
        }

        // 말쓰기
        function talking_bubble(dot, bubble_txt, bubble_type) {
            if (bubble_txt.length < 1) return;
            var textWidth = 0
            var textHeight = 0
            $('.chat_bubble').removeClass('chatt_type now_type nuts_type now_type2')
            $('.chat_bubble').addClass(bubble_type).css({
                opacity: 0
            })

            if ($('.chat_mondi_con_img>img').attr('src') != imgConArr[0]) {
                $('.chat_mondi_con_img>img').attr('src', imgConArr[0]);
                //TweenMax.fromTo('.chat_mondi_con_img>img', 1.3, { autoAlpha: 0, scale: 0 }, { autoAlpha: 1, scale: 1, ease: Power2.easeOut });
                TweenMax.fromTo('.chat_mondi_con_img>img', 1.3, {
                    autoAlpha: 0
                }, {
                    autoAlpha: 1,
                    ease: Power2.easeOut
                });
            }


            $('.chat_bubble').css({
                width: 500,
                height: 'auto',
                display: 'block',
                opacity: 0
            })
            $('.txt_chat01').css({
                display: 'inline-block',
                opacity: 0,
                visibility: 'visible'
            })
            $('.txt_chat01').html(bubble_txt)

            textWidth = $('.txt_chat01').width()
            textHeight = $('.txt_chat01').height()

            $('.chat_bubble').css({
                width: 45,
                height: 'auto'
            }).delay(600).animate({
                opacity: 1
            }, 200)

            $('.txt_chat_last').hide()

            // 도트 말풍선일때 true
            if (dot == true) {
                //	        $('.txt_chat01').hide()
                //	        $('.dot_wrap').delay(300).fadeIn().delay(1700).fadeOut(0)
                //	        setTimeout(function(){
                //	          $('.dot_wrap').hide()
                //
                //	          setTimeout(function(){
                //	            $('.chat_bubble').css({ width: textWidth, height: textHeight })
                //	          }, 50);
                //	          $('.txt_chat01').css({opacity: 0}).hide();
                //	          $('.txt_chat01').animate({opacity: 1}, 500).fadeIn();
                //	        }, 1700)
                $('.dot_wrap').hide()

                setTimeout(function() {
                    $('.chat_mondi_con_img>img').attr('src', imgConArr[1]);
                    //TweenMax.fromTo('.chat_mondi_con_img>img', 0.3, { autoAlpha: 0, scale: 0 }, { autoAlpha: 1, scale: 1, ease: Power2.easeOut });
                    TweenMax.fromTo('.chat_mondi_con_img>img', 1.3, {
                        autoAlpha: 0
                    }, {
                        autoAlpha: 1,
                        ease: Power2.easeOut
                    });
                    $('.chat_bubble').css({
                        width: textWidth,
                        height: textHeight
                    })
                }, 800);
                $('.txt_chat01').animate({
                    opacity: 1
                }, 500).fadeIn();
                // 도트 말풍선없이 바로 나올때 false
            } else {
                $('.dot_wrap').hide()

                setTimeout(function() {
                    $('.chat_mondi_con_img>img').attr('src', imgConArr[1]);
                    //TweenMax.fromTo('.chat_mondi_con_img>img', 0.3, { autoAlpha: 0, scale: 0 }, { autoAlpha: 1, scale: 1, ease: Power2.easeOut });
                    TweenMax.fromTo('.chat_mondi_con_img>img', 1.3, {
                        autoAlpha: 0
                    }, {
                        autoAlpha: 1,
                        ease: Power2.easeOut
                    });
                    $('.chat_bubble').css({
                        width: textWidth,
                        height: textHeight
                    })
                }, 800);
                $('.txt_chat01').animate({
                    opacity: 1
                }, 500).fadeIn();
            }
        }

        // 캐릭터 변경 관련 모션
        function mondi_chang(mond_type) {
            //	      var mond_type
            //	      $('.chat_step01').fadeIn()
            //	      $('.chat_step04').fadeOut()
            //	      $('.chat_step03').fadeOut()
            //	      $('.chat_step01').delay(1800).fadeOut()
            //	      setTimeout(function () {
            //	        $('.chat_step03').find('img').attr('src', '/default/images/common/' + mond_type + '.png')
            //	      }, 500)
            //	      $('.chat_step03').delay(1900).fadeIn()
        }

        function mondi_chang2(mond_type) {
            //		      var mond_type
            //		      $('.chat_step01').fadeIn()
            //		      $('.chat_step04').fadeOut()
            //		       $('.chat_step03').fadeOut()
            //		       $('.chat_step01').delay(1800).fadeOut()
            //		      setTimeout(function () {
            //		        $('.chat_step03').find('img').attr('src', '/default/images/common/' + mond_type + '.png')
            //		      }, 500)
            //		      $('.chat_step03').delay(1400).fadeIn()
        }

        // 마지막 캐릭터와 말풍선 변경 모션
        function final_ani() {
            $('.chat_mondi_con>div').css('opacity', 1);
            $('.chat_bubble').fadeOut()
            //		    $('.chat_step03').fadeOut()
            //		    $('.chat_step04').fadeIn()

            $('.txt_chat_last').delay(300).fadeIn();

            var textWidth = 0;
            var textHeight = 0

            $('.txt_chat_last').css({
                width: 'auto',
                height: 'auto',
                display: 'block',
                opacity: 0
            })
            $('.txt_chat_last').find('span').css({
                display: 'inline-block',
                opacity: 0,
                visibility: 'visible'
            })

            var str;
            if (currentType == 'chatt_type') {
                if (lastWArr[0].textWidth && lastWArr[0].textWidth != undefined) {
                    textWidth = lastWArr[0].textWidth + 5;
                    textHeight = lastWArr[0].textHeight;
                    str = lastWArr[0].bubble_txt;
                } else {
                    textWidth = 14 * chatTextArr[chatTextArr.length - 1][0].length + 5;
                    textHeight = 26;
                    str = chatTextArr[chatTextArr.length - 1][0];
                }

            } else if (currentType == 'now_type') {
                if (lastWArr[1].textWidth && lastWArr[1].textWidth != undefined) {
                    textWidth = lastWArr[1].textWidth + 5;
                    textHeight = lastWArr[1].textHeight;
                    str = lastWArr[1].bubble_txt;
                } else {
                    textWidth = 14 * changeupTextArr[changeupTextArr.length - 1][0].length + 5;
                    textHeight = 26;
                    str = changeupTextArr[changeupTextArr.length - 1][0];
                }
            } else if (currentType == 'nuts_type') {
                if (lastWArr[2].textWidth && lastWArr[2].textWidth != undefined) {
                    textWidth = lastWArr[2].textWidth + 5;
                    textHeight = lastWArr[2].textHeight;
                    str = lastWArr[2].bubble_txt;
                } else {
                    textWidth = 14 * nudgeTextArr[nudgeTextArr.length - 1][0].length + 5;
                    textHeight = 26;
                    str = nudgeTextArr[nudgeTextArr.length - 1][0];
                }
            } else if (currentType == 'now_type2') {
                if (lastWArr[3].textWidth && lastWArr[3].textWidth != undefined) {
                    textWidth = lastWArr[3].textWidth + 5;
                    textHeight = lastWArr[3].textHeight;
                    str = lastWArr[3].bubble_txt;
                } else {
                    textWidth = 14 * changeupTextArr2[changeupTextArr2.length - 1][0].length + 5;
                    textHeight = 26;
                    str = changeupTextArr2[changeupTextArr2.length - 1][0];
                }
            }

            if (textHeight < 26) {
                textHeight = 26;
            }

            $('.txt_chat_last').find('span').html(str + "<em></em>");
            $('.txt_chat_last').delay(600).animate({
                opacity: 1,
                height: textHeight
            }, 200);
            $('.txt_chat_last').find('span').animate({
                opacity: 1
            }, 500).fadeIn();

        }


        function killAll() {
            if (typeof(type1) != "undefined" && typeof(type1) != undefined) {
                type1.seek(0.1).kill();
                type2.seek(0.1).kill();
                type3.seek(0.1).kill();
                type4.seek(0.1).kill();

                $('.chat_mondi_con>div').css('opacity', 1);
            }
        }

        // 채팅창 떴을때
        function wait_move() {
            if (typeof(type1) != "undefined" && typeof(type1) != undefined) {
                type1.seek(0.1).kill();
                type2.seek(0.1).kill();
                type3.seek(0.1).kill();
                type4.seek(0.1).kill();
                //		    	$('.chat_step01').hide();
                //		    	$('.chat_step02').hide();
                //		    	$('.chat_step03').hide();
                //		    	$('.chat_step04').hide();
                //		    	$('.chat_step05').hide();
                //		    	$('.chat_step06').hide();
            } else {
                $('.chatting_sol_wrap').attr('style', 'opacity:1');
            }
            final_ani();
        }

        function aryDefine(ary) {
            var num;
            var resultAry = new Array();
            for (var i = 0; i < ary.length; i++) {
                if (ary[i] != "") {
                    resultAry.push(ary[i]);
                }
            }
            return resultAry;
        }

        function start_pop() {
            $('.chat_mondi_tooltip_span').css('visibility', 'visible');
            popTween = new TimelineMax({
                paused: true
            })
            popTween.timeScale(1)
            popTween.addLabel('type1');

            popTween.add([TweenMax.set('.chat_mondi_tooltip_span', {
                    transformOrigin: '0% 0%'
                }), TweenMax.to('.chat_mondi_tooltip_span', 0.4, {
                    width: '100%',
                    ease: Expo.easeOut
                })])
                .add(TweenMax.to('.chat_mondi_tooltip_span', 2.5, {
                    opacity: 1
                }))
                .add(TweenMax.to('.chat_mondi_tooltip_span', 0.18, {
                    width: 0,
                    ease: Power1.easeOut,
                    onComplete: function() {
                        $('.chat_mondi_tooltip').css('visibility', 'hidden')
                    }
                }))
        }

        // 190411 : BHY : 챗봇 닫기생성
        function chatBotClose() {
            var $chatbotClose = $(".chatbotClose");

            $chatbotClose.fadeIn();
            $chatbotClose.find("a.btnClose").on({
                click : function(e) {
                    e.preventDefault();
                    $(this).parent().hide();
                    $(this).closest(".chatarea").hide();
                }
            });
        }

        return {
            init: function() {
                /**
                 * ①initialize
                 */
                // console.debug('mondi, int.');
                //       impl.init()
            },
            chat: function(text, num) {

                //
                if (text && text.length) {
                    text = aryDefine(text);
                    chatTextArr = text;
                    if (num == null || num == "" || num == undefined) {
                        num = 0;
                    }
                    lastWArr[0] = {
                        "bubble_txt": text[num][0],
                        "textWidth": 14 * String(text[num][0]).length,
                        "textHeight": 26
                    };
                }
                // console.debug('mondi, chat, chatTextArr : ', chatTextArr);
                killAll();
                impl.init();
                //  $('.chat_mondi_con_img>img').attr('src',imgConArr[0]);

                type1.restart();
                currentType = "chatt_type";
            },
            changeup: function(text, num) {

                /**
                 * ②즉시전환 시나리오 실행
                 *
                 * @arguments - text (array) 노출될 문자열
                 */
                if (text && text.length) {
                    text = aryDefine(text);
                    changeupTextArr = text;
                    if (num == null || num == "" || num == undefined) {
                        num = 1;
                    }
                    lastWArr[1] = {
                        "bubble_txt": text[num][0],
                        "textWidth": 14 * String(text[num][0]).length,
                        "textHeight": 26
                    };
                }
                //console.debug('mondi, changeup, changeupTextArr : ', changeupTextArr);
                killAll();
                impl.init()
                // $('.chat_mondi_con_img>img').attr('src',imgConArr[1]);

                type2.restart();
                currentType = "now_type";
            },
            nudge: function(text, num) {

                /**
                 * ③넛지 시나리오 실행
                 *
                 * @arguments - text (array) 노출될 문자열
                 */
                if (text && text.length) {
                    text = aryDefine(text);
                    nudgeTextArr = text;
                    if (num == null || num == "" || num == undefined) {
                        num = 0;
                    }
                    //		          num = num || 0;
                    //		          if($.trim(num) === '') num = 0;
                    lastWArr[2] = {
                        "bubble_txt": text[num][0],
                        "textWidth": 14 * String(text[num][0]).length,
                        "textHeight": 26
                    };
                }
                // console.debug('mondi, nudge, nudgeTextArr : ', nudgeTextArr);
                killAll();
                impl.init()
                //$('.chat_mondi_con_img>img').attr('src',imgConArr[2]);

                type3.restart();
                currentType = "nuts_type";
            },
            changeup2: function(text, num) {

                /**
                 * ④ 넛지 다음 시나리오 실행 (즉시전환 시나리오와 움직임이 같아서 2로 명명)
                 *
                 * @arguments - text (array) 노출될 문자열
                 */
                if (text && text.length) {
                    text = aryDefine(text);
                    changeupTextArr2 = text;
                    if (num == null || num == "" || num == undefined) {
                        num = 1;
                    }
                    lastWArr[3] = {
                        "bubble_txt": text[num][0],
                        "textWidth": 14 * String(text[num][0]).length,
                        "textHeight": 26
                    };
                }

                //  console.debug('mondi, changeup2, changeupTextArr2 : ', changeupTextArr2);
                killAll();
                impl.init()
                //$('.chat_mondi_con_img>img').attr('src',imgConArr[3]);

                type4.restart();
                currentType = "now_type2";
            },

            wait: function() {
                wait_move();
            },
            pop_show: function() {
                start_pop();
                popTween.restart();
            }
        }
    })()

    ns.mondiImgManager = (function() {
        var timeout;
        var impl = {
            init: function(src) {
                $('.chatbanner .chat_bann_wrap a img').attr('src', src);
                clearTimeout(timeout);
                showBanner(true);
            }
        };

        return {
            init: function(src) { //initialize
                impl.init(src);
            }
        }

        function hideBanner(num1, num2) {
            if ($('#container').length > 0) {
                var lnbbannl = $('#container').offset().left + 30;
            } else {
                var lnbbannl = $('#content').offset().left + 30;
            }

            $(".chat_bann_wrap").animate({
                'bottom': "0"
            }, 400)

            $(".chat_bann_wrap").delay(num1).animate({
                "width": "106px",
                "border-radius": "53px"
            }, 400);
            $(".chatbanner").delay(num2).animate({
                "left": lnbbannl,
                "width": "110px"
            }, 400);
            $('.btn_img_chat_close').delay(num2).animate({
                "opacity": "0"
            }, 400);
            $(".chat_bann_cant").delay(num2).animate({
                "left": "-55px",
                "margin-left": "0"
            }, 400, function() {
                $('.btn_img_chat_close').on('click', function() {
                    $(".chatbanner").removeClass('on chat_bann_small').css('display', 'none');
                });
                $(".chatbanner").addClass("chat_bann_small");
                $('.btn_img_chat_close.close2').animate({
                    "opacity": "1"
                }, 400);
                $(".chatbanner").animate({
                    "bottom": "30px"
                }, 400).animate({
                    "bottom": "20px"
                }, 300);
                $(".chat_bann_small .chat_bann_wrap").on('mouseover', function() {
                    $(this).off('mouseover');
                    $('.btn_img_chat_close.close2').animate({
                        "opacity": "0"
                    }, 100);
                    showBanner(false);
                });
            })
        }

        function showBanner(first) {
            $(".chatbanner").removeClass("chat_bann_small").addClass('on');
            if ($('#content').length > 0) {
                var bannl = $('#content').offset().left + 30;
            } else {
                var bannl = 0.5 * $('window').width() + 400;
            }

            if (first == true) { //처음 시작할때만 밑에서 위로 올라옴
                $(".chatbanner").css({
                    'bottom': 0,
                    'left': 0,
                    'width': '100%'
                });
                $(".chat_bann_wrap").css('bottom', '-106px');
            }

            $(".chatbanner").animate({
                "bottom": "0"
            }, 100, function() {
                $('.btn_img_chat_close').on('click', function() {
                    $(".chatbanner").removeClass('on chat_bann_small').css('display', 'none');
                });
                if (first == true) {
                    $(".chat_bann_cant").animate({
                        "left": bannl
                    }, 400, function() {
                        $(".chat_bann_wrap").animate({
                            "bottom": 0,
                            "width": "100%",
                            "border-radius": "0"
                        }, 300);
                    });
                    $('.btn_img_chat_close').css('visibility', 'visible');
                } else {
                    $(".chat_bann_wrap").animate({
                        "bottom": 0,
                        "width": "100%",
                        "border-radius": "0"
                    }, 300);
                    $(".chat_bann_cant").animate({
                        "left": bannl
                    }, 400);
                }

                $(".chatbanner").animate({
                    "left": "0",
                    "width": "100%"
                }, 400);

                $('.btn_img_chat_close').animate({
                    "opacity": "1"
                }, 400);
                //			            timeout= setTimeout(function() {
                //				            hideBanner(0,400);
                //				        }, 20000);
            });

        }
    })()

    if (typeof window.etribe.ui === 'undefined') window.etribe.ui = {};
    if (typeof window.etribe.ui.comm === 'undefined') window.etribe.ui.comm = {};

    var nsUiComm = window.etribe.ui.comm;

    nsUiComm.focusSet_ontoError = (function() {
        var impl = {
            init: function() {
                var errorBox = $('.bx_error'),
                idName;


                if (errorBox.length > 0) {
                    for (var j = 0; j < errorBox.find('em').length; j++) {
                        var em = errorBox.find('em').eq(j);

                        if (em.css('display') != 'none') {
                            em.attr('tabIndex', 0).focus();
                            em.on('blur', function() {
                                //em.attr('tabIndex','initial');
                                if (em.data('ng-show')) {
                                    idName = em.data('ng-show').split('.')[1];
                                }
                                if (em.data('ng-if')) {
                                    idName = em.data('ng-if').split('.')[1];
                                }
                                if (em.data('ng-bind')) {
                                    idName = em.data('ng-bind').split('.')[1];
                                }
                                $('*[id^=' + idName + ']').focus();
                                
                                //20190207 웹접근성 관련 수정 (tabIndex 관련 무한루프 수정)
                                em.removeAttr('tabIndex');      
                                
                                
                                $(this).removeAttr('tabindex');
                                errorBox.prev().find("input").first().focus();

                            });
                            break;
                        } else {
                            if (j == errorBox.length - 1) {
                                return "noE";
                            }
                        }
                    }
                } else {
                    return "noE";

                }
            }
        };

        return {
            init: function() { //initialize
                impl.init();
            }
        }
    })();


    nsUiComm.focusSet_ontoError2 = (function() {
        /* tm용 */
        var impl = {
            init: function() {
                var errorBox = $('.txt_error');

                if (errorBox) {
                    for (var j = 0; j < errorBox.length; j++) {
                        var p = errorBox.eq(j);
                        if (p.css('display') != 'none') {
                            var errorHtml = p.html();
                            p.attr('tabIndex', 0).html('<span class="hide_txt">오류알림</span>' + errorHtml).focus();
                            //							p.blur(function(){
                            //								p.parent().find('group').children('input').focus();
                            //								//alert(p.parent().find('group').length);
                            //
                            //							})
                            break;
                        } else {
                            if (j == errorBox.length - 1) {
                                return "noE";
                            }
                        }
                    }
                } else {
                    return "noE";
                }

            }
        };

        return {
            init: function() { //initialize
                impl.init();
            }
        }
    })();


    nsUiComm.errorTxtSet = (function() {
        var impl = {
            init: function() {
                
                $('html').find('.bx_error').each(function() {
                    $(this).find('em').each(function() {
                        var errorMessage = $(this).text();
                        $(this).attr('tabIndex', 0).html('<span class="hide_txt">오류알림</span>' + errorMessage);

                    });
                });
                $('html').find('.txt_error').each(function() {
                    var errorHtml = $(this).html();
                    $(this).attr('tabIndex', 0).html('<span class="hide_txt">오류알림</span>' + errorHtml);
                });
            }
        };
        return {
            init: function() {
                impl.init();
            }
        }
    })();

    nsUiComm.tmTab = (function() {
        var impl = {
            init: function() {
                var el = $('.tm_bd_tabInCon');
                var tabList = el.find('.tabCon').find('li').not('.disable');
                tabList.on('click', '>button', function(e) {
                    var dlabIdx = $(this).parent().index();

                    if (!$(this).parent().hasClass('on')) {
                        e.preventDefault();
                        tabList.removeClass('on');
                        $('.tabContentsCon').removeClass('on');
                    }
                    tabList.eq(dlabIdx).addClass('on');
                    $('.tabContentsCon').eq(dlabIdx).addClass('on');
                    // - 2019.01.25 웹접근성 관련 탭 hidden 텍스트 추가
                    tabList.find('.hide_txt').remove();
                    tabList.eq(dlabIdx).append('<span class="hide_txt">현재 선택</span>')
                    // -// 2019.01.25 웹접근성 관련 탭 hidden 텍스트 추가
                })
            }
        };
        return {
            init: function() {
                impl.init();
            }
        }

    })();

    nsUiComm.datePicker = (function() {
        function init() {
            $(".et_datepicker,.et_datepicker1").datepicker({
                showAnim: 'slideDown',
                dateFormat: 'yymmdd',
                prevText: '<',
                nextText: '>',
                monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
                monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
                dayNames: ['일', '월', '화', '수', '목', '금', '토'],
                dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
                dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
                showOn: 'button',
                buttonImage: '/default/images/common/ico_calendar.gif',
                buttonImageOnly: true,
                showMonthAfterYear: true,
                changeMonth: true,
                changeYear: true,
                yearSuffix: '.',
                allowInputToggle: true,
            });

            $(".et_datepicker,.et_datepicker1").on('click', function() {
                $(this).datepicker('show');
            })
        }
        return {
            init: init
        };
    })();

    //플로팅 배너 애니
    var nsUiComm = window.etribe.ui.comm;

    nsUiComm.floatBaAni = (function() {
        var curIndex = 0;
        var term = 2000;
        var interval, float;

        var impl = {
            init: function() {
                float = $('#pmmifloating').find('.fs_wrap.best');
                if ($('#pmmifloating').find('.fs_wrap.insu').length > 0) {
                    setTop();
                }
                moveAni();
            }
        };
        return {
            init: function() { //initialize
                impl.init();
            }
        }

        function moveAni() {
            var len = float.find('li').length;

            interval = setInterval(function() {
                float.find('li').eq(curIndex).find('span').addClass('on');
                setTimeout(function() {
                    float.find('li').eq(curIndex).find('span').removeClass('on');
                    curIndex++;
                    if (curIndex >= len) {
                        curIndex = 0;
                    }
                }, 800);

            }, term);
        }

        function setTop() {
            if ($(".floatSet_area.insu").length > 0 && $("#tm>.bx_mydirect2").length > 0) {
                var float = $(".floatSet_area");
                var h = $("#tm>.bx_mydirect2").offset().top;
                var l = $("#tm>.bx_mydirect2").offset().left;
                // float.css('top',h);
                float.animate({
                    'top': h,
                }, 200);
                $('.fs_wrap.insu').animate({
                    'left': l + 200,
                    'opacity': 1
                }, 200);

                $(window).on('resize', function() {
                    l = $("#tm>.bx_mydirect2").offset().left;
                    $('.fs_wrap.insu').css({
                        'left': l + 200
                    });
                })
            }

        }

    })();

    //생년월일 입력란 ui 개선
    nsUiComm.birthCheck = (function() {
        var impl = {
            init: function() {
                inputCheck();
            }
        };
        return {
            init: function() {
                impl.init();
            }
        }

        function inputCheck() {
            if ($('input:text').length > 0) {
                var inp;
                $('input:text').each(function() {
                    if (String($(this).attr('data-ng-model')).indexOf('birth') > -1) {
                        inputChangeCheck($(this));
                    }
                });
            } else {
                return false;
            }

        }

        function inputChangeCheck(input) {
            var preStr = "";
            input.on('keyup', function(e) {
                if ((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 96 && e.keyCode <= 105)) {
                    if (preStr.length < 10) {
                        preStr += e.key;
                        if (preStr.length == 4 || preStr.length == 7) {
                            preStr += " ";
                        }
                    }

                    $(this).val(preStr);

                } else {
                    if (e.keyCode != 8) {

                        $(this).val(preStr);

                    } else {
                        preStr = $(this).val();
                    }
                }
            });

        }
    })();



})(window.jQuery)

//보상/보험금청구 : 해외거주자전용 보험금 접수 창구 파일등록
function add_file_fuc() {
    var file_add_btn = $('.file_add_btn');
    if (file_add_btn.length > 0) {
        file_add_btn.on('click', function(e) {
            e.preventDefault();
            var board = $(this).parent().parent().next();
            var totalLen = board.find('tr.th').length;

            var th = board.find('tr:eq(0)').clone();
            var td = board.find('tr:eq(1)').clone();

            board.find('tbody').append(th).append(td);
            board.find('tr:last-child').prev().find('td').text('파일선택' + (totalLen + 1));
            delete_fine_func('.btn_delfile');

        })

    }
}

function delete_fine_func(obj) {
    if ($('.board_write').length > 0) {
        var board = $(obj).closest('.board_write');
        var totalLen = board.find('tr.th').length;

        $(obj).each(function() {
            $(this).on('click', function(e) {
                e.preventDefault();
                totalLen = board.find('tr.th').length;
                if (totalLen > 1) {

                    $(this).closest('tr').prev().remove();
                    $(this).closest('tr').remove();
                    for (var i = 0; i < totalLen; i++) {
                        board.find('tr.th').eq(i).find('td').text('파일선택' + (i + 1));
                    }
                }
            });
        });
    }
}

function hashTagTrigHis(){
	//챗봇 해시태그 트리거 클릭시 이력클래스 적용 200525
	if( !!$('.hashTagCon > a').size() ){
		$('.hashTagCon > a').on('click', function(arg){
			$(this).addClass('clicked');
		});
	}
}

function sitemap_link() {
    $(document).on('click', '.site_shortcut>ul>li>a', function() {
        var $thisI = $(this).parents('li').index(),
            $current_Id = $('.site_shortcut').find('ul>li').eq($thisI).find('a').attr('href').substring(1);
        $('.sitemap_box').find('.stit').removeAttr('tabindex');
        $('.sitemap_box').find('#' + $current_Id).attr('tabindex', '0').focus();
    });
}

// 2019.01.29 공시정보관리지침 웹접근성 스크롤 수정(참고 : styleFormMethod)
var styleFormMethod02 = function(obj) {
    var $ipt = $('.ipt'),
        $iptSlc = $('.ipt_select');

    var root = obj || $("body");
    //textarea 자동높이 조절
    if (root.find('textarea').length) {
        var textarea = root.find('textarea');
        var txtareaFnc = function() {
            textarea.autosize();
            textarea.on({
                focusout: function() {
                    if ($(this).val().length == false) {
                        // 댓글
                        if ($(this).closest('.reply_list').length || $(this).closest('.reply_box').length) {
                            $(this).outerHeight(47);
                        } else {
                            $(this).outerHeight(18);
                        }
                    }
                }
            });
        }
        txtareaFnc();
    }
    //textarea 스크롤 디자인
    if (root.find('.txtarea').length) {
        if (root.find('.txtarea').hasClass('none') == false) {
            root.find('.txtarea .view').jScrollPane({
                mouseWheelSpeed: 100,
                hijackInternalLinks: true
            });
        }
    }
}

// 20200521 : KJW : 상품 플로팅배너(보장분석/상담번호/채팅상담/탑 버튼) 스크롤 이벤트
var ET_bestWScroll = function(){
	var scroll_el = $('.bestWScroll'),
		scroll_stand_cont = $('#tm').find('.chat_cta_form'),
		scroll_stand_offT = scroll_stand_cont.offset().top,
		scroll_stand_height = scroll_stand_cont.height(),
		scroll_standard = scroll_stand_offT + (scroll_stand_height/2);
	/* 스크롤인식 후 on off */
	function scrollCheck(){
		$(window).on('scroll',function(){
			var winScroll = $(window).scrollTop();
			if(winScroll > scroll_standard){
				scroll_el.fadeIn();
			}else{
				scroll_el.fadeOut();
			}
		});
	}
	/* 해당 함수 초기세팅  */
	function init(){
		if(scroll_el.length > 0){
			scrollCheck();
		}
	}

	init();
}

pmmifloating = function(){
	var check_ctaFloat = setInterval(function(){
		if($('#pmmifloating').find('.fs_wrap.best').length > 0 && $('#tm').find('.bx_mydirect2').length > 0){
			//플로팅배너 스크롤이벤트
			ET_bestWScroll();
			window.etribe.ui.comm.floatBaAni.init();
		 	return clearInterval(check_ctaFloat);
		}
	}, 100);
}

$(function() {
    skip_navigating();
    tooltipMethod();
    faqMethod();
    requireSlide();
    termMenu();
    tabContent();
    window.main_de.init();
    sitemap_link(); //2019.01.29 웹접근성 사이트맵 관련 포커스
    //window.etribe.chatBanner_move();//채팅 배너 움직임
    setTimeout(function() {
        //accordionMethod();
        skip_navigating();
        autocomplete();
        setTimeout(function(){
            styleFormMethod();

            //챗봇 해시태그 트리거 클릭시 이력클래스 적용 200525
            hashTagTrigHis();
            
        },5000)
        tabHeight();
        uiFooter.init();
        // uiFrTab.init();
        uiSideLayer.init();
        sliderPublic();
        driveScopeSlc();
        guaranteeChange();
        movieNarShow();
        dollMethod();
        replyMethod();
        uiReckoning.init();
        uiSnb.init();
        idScroll.init(); //보장내용 버튼 클릭 이벤트
        anchorVeiw.init(); //상품상세 꼭 알아두실 사항
        topEvent.init(); //top버튼 이벤트
        siteFixMenu(); //사이트맵
        siteFixMenu02(); //사이트맵(대)
        prematToggle();
        sickMethod.init();
        uiCarSearch.init();
        uiMondiCarLayer.init();
        promotionEvent.init();
        add_file_fuc(); //보상보험금 청구 > 해외거주자전용 보험금 청구 파일 등록
        delete_fine_func('.btn_delfile'); //보상보험금 청구 > 해외거주자전용 보험금 청구 파일 삭제
        
        
        /* ie 10이하 체크 */
        if (window.document.documentMode > 10 || window.document.documentMode == undefined) {
            window.etribe.chatDragResize.init();
        } else {
            //	$('#chatbot_wrap').find('.chattion_win').addClass('under_ie11');
            //	window.etribe.chatDragResize.under_ie11();
            window.etribe.chatDragResize.init_u_ie11();
        }
        
        window.etribe.ui.comm.errorTxtSet.init();
        
        
        setTimeout(function() {
            if ((".tm_bd_tabInCon").length > 0) {
                window.etribe.ui.comm.tmTab.init();
            }
            
			
			if($('#tm').find('.bx_mydirect2').length > 0){
				ET_bestWScroll();
			}
            chk_errmeritz.init(); //2020.02.18 웹접근성 관련 상품안내 페이지 우측, 중간 "내 보험료 확인" error 포커스

            //챗봇 해시태그 트리거 클릭시 이력클래스 적용 200525
            hashTagTrigHis();

        }, 1500);
        
    }, 1000);

    setTimeout(function() {
        accordionMethod();
        historyOn();
        historyTit();
        tabsTotal();
        tabsCar();
        $("#ccName").focus();
    }, 1500);


    /* 180129 */
    setTimeout(function() {
        skip_navigating();
        uiFrTab.init();
        uiSideLayer.init();
        styleFormMethod02(); //2019.01.29 웹접근성 관련 ie 스크롤 view
        $("#ccName").focus();

    }, 2500);
    
});

function mLayer() {
    var tplUrl = '/default/views/biz/cm/cc/main/lypop_product_intro.tpl';
    $.post(tplUrl, function(data) {
        content = data;
        $('#content').append(content);
    }).done(function() {
        uiLyer.init();
    });
}

function carTodayCancel(){
    var offset = $('#carTodatCancelBtnBox').offset();
    $('html, body').animate({scrollTop : offset.top}, 400);
}


// 회사소개 - 메리츠 발자취 
function historyOn(){
    var lastHistoryCnt = $(".history .history_ul>li:last");
    lastHistoryCnt.addClass("on");
}

function historyTit(){
    var historyTit = $('.history .history_ul>li h3');
    $(document).on("click", ".history .history_ul>li h3 a", function(){
        historyTit.parent().removeClass("on");
        $(this).parent('h3').parent().addClass("on");
    });
}


// 새 탭 정리
function tabsTotal() {
	$(function(){  	
		$(".tabBox > ul > li > a").on('click',function() {
			var $this = $(this).parent();
			if(!$this.hasClass("on")){  			
				tabChoice($this);
				$this.find(".tabs > li").eq(0).addClass("on");
				$this.find(".tabs > li").eq(0).siblings().removeClass("on");
			}
		}) 	
		$(".tabs > li > a").on('click',function() {   	
			var $this = $(this).parent();		
			tabChoice($this);
		})   	
		function tabChoice(el){
			el.addClass("on"); 
			el.siblings().removeClass("on"); 
		}
	});
}

function tabsCar() {
    $(function() {
        $(".car_prov .prov_tab li").on("click",function() {
            $(this).parent().find("li").addClass("on");
            $(this).siblings().removeClass("on");
        });
        $(".car_prov .prov_tab li:first").addClass("on");
    });
}

// 200623 : KSH : 스크롤 있는 팝업에서 필요시 높이값 리셋하는 기능
function scrollReset(){
	$(".layer_wrap_in.scrollResetFunc").on("click",function(){
		$('.doscroll .layer_content').jScrollPane({
                mouseWheelSpeed: 100,
                hijackInternalLinks: true,
                animateScroll: true
            });
	})
}

// 200623 : KSH : 스크롤 있는 팝업에서 필요시 높이값 리셋하는 기능
function all_agree() {
    $(function() {
        setTimeout(function() {
           var element = $('.doscroll .layer_content').jScrollPane({
                mouseWheelSpeed: 100,
                hijackInternalLinks: true,
                animateScroll: true
            });
            var api = element.data('jsp');
            var btnTopVal = $('.mobile_regi_btn').offset().top;
            api.scrollToY(btnTopVal);
        });
    });
}

// 200706 : BHY : 채팅배너 리뉴얼
// @ 챗봇 세트별 지연시간은 개발로직에서 30초, 마지막 60초 세팅되어 있음.
window.uiNewChatBanner = (function () {
    var obj = {}, opt = {};
    function init(text, idxTtx) {
        tagSet();
        readySet(text, idxTtx);
    }
    
    // DOM
    function tagSet(text, idxTtx) {
        obj.target        = document.querySelector(".newChatBanner");
        obj.inner         = obj.target.querySelector(".inner");
        obj.mask          = obj.inner.querySelector(".mask");
        obj.swiperWrapper = obj.mask.querySelector(".swiper-wrapper");
        obj.swiperSlide   = obj.swiperWrapper.children;
        obj.pdCta         = document.querySelector(".btn_cta_comm");
        obj.tmCta         = document.getElementById("callHeader");
        
        opt.scroll        = null;
        opt.active        = "open";
        opt.tmPos         = "tmPos";
        opt.dummyArr      = [
                                ['반가워요! 저는 인공지능 상담로봇 몬디입니다.'],
                                ['메리츠 올바른 정기보험을 소개할께요! 더자세히 알아보세요!'],
                                ['말풍선을 눌러 "정기보험 비교포인트" 알아보세요'],
                                ['올바른 정기보험, 더 자세히 알아볼까요?']
                            ];
    };
    
    // 기본체크 : 시나리오, 랜딩 하단 CTA
    function readySet(text, idxTtx) {
        if (text.length > 0) {
            // 30초후 시나리오 업데이트시 DOM초기화
            domResetFunc();
            opt.dummyArr = text;
            setScenario();
        }
    }

    // 시나리오 DOM 셋팅
    function setScenario() {
        var frag = document.createDocumentFragment();

        opt.dummyArr.forEach(function (item) {
            obj.creatElm = document.createElement("div");
            obj.creatElm.classList.add("swiper-slide");
            obj.span = document.createElement("span");
            obj.creatElm.appendChild(obj.span);
            obj.span.textContent = item;

            frag.appendChild(obj.creatElm);
        });
        obj.swiperWrapper.appendChild(frag);

        setScenarioSlide();
    }

    // 시나리오 셋팅이 끝나면 API호출
    function setScenarioSlide() {

        var scenario_swiper = new Swiper('.slide_scenario', {
            loop: false,
            speed: 700,
            direction: 'vertical',
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
                stopOnLastSlide: true,         // true : 마지막슬라이드에서 멈춘다. (loop: true 제외)
            },
            touchRatio: 0,
            roundLengths: true,
            simulateTouch: false,
            autoplayDisableOnInteraction: false
            // debugger: true,
        });

        // 30초후 시나리오 업데이트시 swiper업데이트
        if (obj.swiperSlide.length > 0) {
            scenario_swiper.update();
        }
        // chatbotPause(scenario_swiper)
        chatbotScrollCheck(scenario_swiper);
    }
    
    // DOM초기화 함수
    function domResetFunc() {
        if (obj.swiperSlide.length > 0) {
            obj.swiperWrapper.textContent = '';
        }
    }   
    
    // 스크롤 체크 함수
    function chatbotScrollCheck(scenario_swiper){
        $(window).scroll(function(){
            var footerOffset = $("#footer").offset().top;
            var scrollValue = $(window).scrollTop();
            var windowHeight = $(window).height();
            var chatBannerWarp = $(".newChatBanner");

            if(scrollValue+windowHeight <= footerOffset){
                chatBannerWarp.removeClass("hideChat");
                chatbotStart(scenario_swiper);
            }else{
                chatBannerWarp.addClass("hideChat");
                chatbotPause(scenario_swiper);
            }
        })
    }


    // 일시정지 기능
    function chatbotPause(scenario_swiper){
        scenario_swiper.autoplay.stop();
    }

    // 재생 기능
    function chatbotStart(scenario_swiper){
        scenario_swiper.autoplay.start();
    }

    return {
        init: init
    }
})();
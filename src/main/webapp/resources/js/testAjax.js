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
}
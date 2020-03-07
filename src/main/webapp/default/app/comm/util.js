(function(angular, mz) {
	
	mz.core.factory('util', mz.mold(function(layerPop) {
		var o = {};
		
		//�대��� �곗냽踰덊샇 �ㅻ쪟 DATA
		var MOB_ERROR = ['00000000','11111111','22222222',
		                 '33333333','44444444','55555555','66666666','77777777','88888888','99999999'];
		
		var TEL_ERROR_NUM1 = ['02']; //�먰깮,吏곸옣踰덊샇泥댄겕...

		var TEL_ERROR_NUM2 = ['031','032','033','041','042','043','044','051','052','053','054','055',
			     		      '061','062','063','064','070','080']; //�먰깮,吏곸옣踰덊샇泥댄겕...

		var TEL_ERROR_NUM3 = ['0130','0303','0502','0505','0506','0507','0707','0504']; //�먰깮,吏곸옣踰덊샇泥댄겕...

		
		
		o.isNull = function(val) {
			return _.isUndefined(val) || _.isNull(val);
		};

		//StringUtil
		//二쇱뼱吏� 臾몄옄�댁씠 null �먮뒗 怨듬갚�� 寃쎌슦 李� 諛섑솚
		o.isEmpty = function(s) {
			if (!_.isString(s)) return false;
			if (s == null || s === '') {
				return true;
			}
			return false;
		};

		//�낅젰�� 臾몄옄�댁씠 �レ옄�� �뚰뙆踰노줈留� 援ъ꽦�섏뼱�덈뒗吏� 泥댄겕
		o.isAlphaNumeric = function(s) {
			if (!_.isString(s)) return false;
			return /^[A-Za-z0-9]+$/.test(s);
		};

		//�낅젰�� 臾몄옄�댁씠 �レ옄濡쒕쭔 援ъ꽦�섏뼱�덈뒗吏� 泥댄겕
		o.isNumeric = function(s) {
			if (!_.isString(s)) return false;
			return /^[0-9]+$/.test(s);
		};

		//�낅젰�� 臾몄옄�댁씠 �뚰뙆踰노줈留� 援ъ꽦�섏뼱�덈뒗吏� 泥댄겕
		o.isAlpha = function(s) {
			if (!_.isString(s)) return false;
			return /^[A-Za-z]+$/.test(s);
		};

		//�낅젰�� 臾몄옄�댁씠 �쒓�濡쒕쭔 援ъ꽦�섏뼱 �덈뒗吏� 泥댄겕
		o.isHangul = function(s) {
			if (!_.isString(s)) return false;
			return /^[��-��|��-��|媛�-��]+$/.test(s);
		};
		
		//�낅젰�� 臾몄옄�댁씠 �쒓�, �뚰뙆踰녹쑝濡쒕쭔 援ъ꽦�섏뼱 �덈뒗吏� 泥댄겕
		o.isHangulAlpha = function(s) {
			if (!_.isString(s)) return false;
			return /^[��-��|��-��|媛�-��|A-Z|a-z]+$/.test(s);
		};

		//�대떦�섎뒗 臾몄옄�댁뿉 ���� 湲몄씠 諛섑솚
		o.getLength = function(s) {
			if (!_.isString(s)) return 0;
			return s.length;
		};

		//�대떦�섎뒗 臾몄옄�댁뿉 ���댁꽌 byte �⑥쐞�� ���댁꽌 湲몄씠 怨꾩궛�댁꽌 珥� 湲몄씠 諛섑솚
		//�쒓��� 3Byte
		o.getByteLength = function(s) {
			if (!_.isString(s)) return 0;
			var b, i, c = 0;
			for (b = i = 0; c = s.charCodeAt(i++); b += c >> 11 ? 3 : c >> 7 ? 2 : 1);
			return b;
		};

		//臾몄옄�댁쓽 �쇱そ�� 怨듬갚 臾몄옄�� �쒓굅
		o.leftTrim = function(s) {
			if (!_.isString(s)) return '';
			return s.replace(/^\s+/, "");
		};

		//臾몄옄�댁쓽 �ㅻⅨ履쎌쓽 怨듬갚 臾몄옄�� �쒓굅
		o.rightTrim = function(s) {
			if (!_.isString(s)) return '';
			return s.replace(/\s+$/, "");
		};

		//臾몄옄�댁쓽 怨듬갚 臾몄옄�� �쒓굅
		o.trim = function(s) {
			if (!_.isString(s)) return '';
			return s.replace(/^\s+|\s+$/g, "");
		};

		//�대떦�섎뒗 臾몄옄�댁뿉 ���댁꽌 �낅젰�� 湲몄씠留뚰겮 遺�議깊븳 湲몄씠瑜� �쇱そ遺��� 怨듬갚�쇰줈 梨꾩썙�ｋ뒗��.
		o.leftPad = function(s, len, c) {
			if (!_.isString(s) || !_.isString(c)) return '';
			if (!_.isNumber(len) || len <= o.getLength(s)) return s;
			if (o.getLength(c) != 1) return s;

			var padLen = len - o.getLength(s);
			for (var i = 0; i < padLen; i++) {
				s = c + s;
			}
			return s;
		};

		//�대떦�섎뒗 臾몄옄�댁뿉 ���댁꽌 �낅젰�� 湲몄씠留뚰겮 遺�議깊븳 湲몄씠瑜� �ㅻⅨ履쎈��� 吏��뺣맂 臾몄옄濡� 梨꾩썙�ｋ뒗��.
		o.rightPad = function(s, len, c) {
			if (!_.isString(s) || !_.isString(c)) return '';
			if (!_.isNumber(len) || len <= o.getLength(s)) return s;
			if (o.getLength(c) != 1) return s;

			var padLen = len - o.getLength(s);
			for (var i = 0; i < padLen; i++) {
				s += c;
			}
			return s;
		};

		o.addCommas = function(s) {
			if (_.isNumber(s)) s = '' + s;
			if (!_.isString(s)) return '';

			var x, x1, x2 = '';
			x = s.split('.');
			x1 = x[0];
			x2 = x.length > 1 ? '.' + x[1] : '';
			var rgx = /(\d+)(\d{3})/;
			while (rgx.test(x1)) {
				x1 = x1.replace(rgx, '$1' + ',' + '$2');
			}
			return x1 + x2;
		};

		//�낅젰�� 臾몄옄�댁씠 二쇱뼱吏� 臾몄옄�닿낵 �쇱튂�섎뒗 紐⑤뱺 臾몄옄�댁쓣 諛붽퓭�쇳븷 臾몄옄�대줈 蹂�寃�
		o.replaceAll = function(s, bs, as) {
			if (!_.isString(s) || !_.isString(bs) || !_.isString(as)) return '';
			return s.split(bs).join(as);
		};

		//HTML tag媛� �ㅼ뼱�덈뒗 臾몄옄�댁뿉 ���� unescape�댁���.
		o.replaceHtmlEscape = function(s) {
			if (!_.isString(s)) return '';
			return _.escape(s);
		};

		//unescaped�� 臾몄옄�댁뿉 ���� HTML tag �뺥깭濡� 諛붽퓭以���.
		o.removeEscapeChar = function(s) {
			if (!_.isString(s)) return '';
			return _.unescape(s);
		};

		//DateUtil
		//�낅젰�� �쇱옄媛� �좏슚�� �쇱옄�몄� 泥댄겕
		o.isDate = function(s) {
			if (!_.isString(s) || o.isEmpty(s) || o.getLength(s) != 8) return false;

			var year = Number(s.substring(0, 4));
			var month = Number(s.substring(4, 6));
			var day = Number(s.substring(6, 8));

			if (1 > month || 12 < month) {
				return false;
			}

			var lastDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
			var lastDay = lastDays[month - 1];

			if (month == 2 && (year % 4 == 0 && year % 100 != 0 || year % 400 == 0)) {
				lastDay = 29;
			}

			if (1 > day || lastDay < day) {
				return false;
			}

			return true;
		};

		//�낅젰�� �쒓컙�� �좏슚�쒖� 泥댄겕
		o.isTime = function(s) {
			if (!_.isString(s) || o.isEmpty(s) || o.getLength(s) != 6) return false;

			var h = Number(s.substring(0, 2));
			var m = Number(s.substring(2, 4));
			var s = Number(s.substring(4, 6));

			if (0 > h || 23 < h) {
				return false;
			}

			if (0 > m || 59 < m) {
				return false;
			}

			if (0 > s || 59 < s) {
				return false;
			}

			return true;
		};
		
		//�낅젰�� �쒓컙�� �좏슚�쒖� 泥댄겕
		o.isHour = function(s) {
			if (!_.isString(s) || o.isEmpty(s) || o.getLength(s) != 2) return false;

			var h = Number(s);

			if (0 > h || 23 < h) {
				return false;
			}
			
			return true;
		};
		
		//�낅젰諛쏆� �쇱옄瑜� Date�뺤쑝濡� 蹂���
		o.strToDate = function(s) {
			if (!_.isString(s)) return null;

			var array = s.split(' ');
			var date = array[0];
			var time = '000000';

			if (2 == array.length) {
				time = array[1];
			}

			if (!o.isDate(date)) return null;
			if (!o.isTime(time)) return null;

			var year = date.substring(0, 4);
			var month = Number(date.substring(4, 6)) - 1;
			var day = date.substring(6, 8);
			var hour = time.substring(0, 2);
			var minute = time.substring(2, 4);
			var second = time.substring(4, 6);

			return new Date(year, o.leftPad('' + month, 2, '0'), day, hour, minute, second);
		};

		o.formatDate = function formatDate(d, f) {
			if (!_.isString(f)) return '';

			if (_.isDate(d)) {
				return f.replace(/(yyyy|yy|mm|dd|hh24|hh|mi|ss|fff|a\/p)/gi, function($1) {
					switch ($1) {
						case "yyyy":
							return '' + d.getFullYear();
						case "yy":
							return o.leftPad('' + (d.getFullYear() % 1000), 4, '0').substring(2, 4);
						case "mm":
							return o.leftPad('' + (d.getMonth() + 1), 2, '0');
						case "dd":
							return o.leftPad('' + d.getDate(), 2, '0');
						case "hh24":
							return o.leftPad('' + d.getHours(), 2, '0');
						case "hh":
							return o.leftPad('' + ((h = d.getHours() % 12) ? h : 12), 2, '0');
						case "mi":
							return o.leftPad('' + d.getMinutes(), 2, '0');
						case "ss":
							return o.leftPad('' + d.getSeconds(), 2, '0');
						case "fff":
							return o.leftPad('' + d.getMilliseconds(), 3, '0');
						case "a/p":
							return d.getHours() < 12 ? "�ㅼ쟾" : "�ㅽ썑";
						default:
							return $1;
					}
				});
			} else if (_.isString(d)) {
				return formatDate(o.strToDate(d), f);
			}

			return '';
		};

		//�낅젰諛쏆� �쇱옄�� �붿씪 諛섑솚
		o.getDayOfWeek = function(s) {
			if (!o.isDate(s)) return '';
			var week = ['��', '��', '��', '��', '紐�', '湲�', '��'];
			return week[o.strToDate(s).getDay()];
		};

		//�낅젰諛쏆� �� �좎쭨 �ъ씠�� �쇱옄 怨꾩궛
		o.getDay = function(sd, ed) {
			if (!o.isDate(sd) || !o.isDate(ed)) return -1;
			if (Number(ed) < Number(sd)) return -2;

			var newSd = o.strToDate(sd);
			var newEd = o.strToDate(ed);
			var diffTime = newEd.getTime() - newSd.getTime();

			return Math.floor(diffTime / (1000 * 60 * 60 * 24));
		};

		//�낅젰諛쏆� �쇱옄�� ���댁꽌 �대떦 �쇰쭔�� �뷀븳 �쇱옄 諛섑솚. 留덉씠�덉뒪 �쇱옄�� �낅젰諛쏆� �쇱옄蹂대떎 �댁쟾�� �쇱옄濡� 怨꾩궛�댁꽌 諛섑솚
		o.addDays = function(s, d, f) {
			if (!o.isDate(s) || !_.isNumber(d)) return '';
			var newDt = o.strToDate(s);
			newDt.setDate(newDt.getDate() + (d));
			return o.formatDate(newDt, f || 'yyyymmdd');
		};

		//�낅젰諛쏆� �쇱옄�� ���댁꽌 �대떦 媛쒖썡�섎쭔�� �뷀븳 �쇱옄 諛섑솚. 留덉씠�덉뒪 媛쒖썡�섎뒗 �낅젰諛쏆� �쇱옄蹂대떎 �댁쟾 �쇱옄濡� 怨꾩궛�댁꽌 諛섑솚
		o.addMonths = function(s, m, f) {
			if (!o.isDate(s) || !_.isNumber(m)) return '';
			var newDt = o.strToDate(s);
			newDt.setMonth(newDt.getMonth() + (m));
			return o.formatDate(newDt, f || 'yyyymmdd');
		};

		//�낅젰諛쏆� �쇱옄�� ���댁꽌 �대떦 �꾩닔留뚰겮 �뷀븳 �쇱옄 諛섑솚. 留덉씠�덉뒪 �꾩닔�� �낅젰諛쏆� �쇱옄蹂대떎 �댁쟾 �쇱옄濡� 怨꾩궛�댁꽌 諛섑솚
		o.addYears = function(s, y, f) {
			if (!o.isDate(s) || !_.isNumber(y)) return '';
			var newDt = o.strToDate(s);
			newDt.setFullYear(newDt.getFullYear() + (y));
			return o.formatDate(newDt, f || 'yyyymmdd');
		};

		//�낅젰諛쏆� �쇱옄�� 留덉�留� �� 諛섑솚
		o.getLastDay = function(s, f) {
			if (!o.isDate(s)) return '';
			var newDt = o.strToDate(s);
			newDt.setMonth(newDt.getMonth() + 1);
			newDt.setDate(0);
			return o.formatDate(newDt, f || 'yyyymmdd');
		};
		
		o.checkDateOver = function(s, f) {
			if (!o.isDate(s)) return '';
			
			if(s > f){
				return false;
			}
			
			return true;
		}; 
		
		//NumberUtil
		o.strToInt = function(s) {
			if (!_.isString(s)) return 0;
			return parseInt(s, 10);
		};

		o.parseInt = function(s) {
			return parseInt(s, 10);
		};

		//ValidationUtil
		//臾몄옄�댁쓽 湲몄씠媛� 理쒖냼, 理쒕� 湲몄씠 �ъ씠�� 議댁옱�섎뒗吏� 泥댄겕
		o.isRangeLength = function(s, min, max) {
			if (!_.isString(s) || !_.isNumber(min) || !_.isNumber(max)) return false;

			var len = o.getLength(s);
			if (min <= len && len <= max) {
				return true;
			}

			return false;
		};

		//臾몄옄�댁쓽 湲몄씠媛� byte �⑥쐞濡� 怨꾩궛�덉쓣�� 理쒖냼, 理쒕� 湲몄씠 �ъ씠�� 議댁옱�섎뒗吏� 泥댄겕
		o.isRangeByteLength = function(s, min, max) {
			if (!_.isString(s) || !_.isNumber(min) || !_.isNumber(max)) return false;

			var len = o.getByteLength(s);
			if (min <= len && len <= max) {
				return true;
			}

			return false;
		};

		//�낅젰�� �대찓�쇱＜�뚭� �좏슚�쒖씠硫붿씪二쇱냼�몄� 寃�利앺븳��.
		o.isEmail = function(s) {
			if (!_.isString(s)) return false;
			return /^([0-9a-zA-Z]+)([0-9a-zA-Z\._-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,3}$/.test(s);
			//return /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/.test(s);
		};
		
		o.phoneFormat = function(val) {
			if (o.isNull(val)) {
				return "";
			}

			val = o.replaceAll(val, "-", "");
			
			if(val.length == 12){
				var val = val.substring(0,4)+'-'+val.substring(4,8)+'-'+val.substring(8,12);
				return val;
			}
			
			return val.replace(/(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/, "$1-$2-$3");
		};
		
		//�몃뱶�곗뿰�띻컳��踰덊샇泥댄겕(AS-IS濡쒖쭅)
		o.checkSameTelNo = function(s) {
			var sameCnt = 0;
			var ret = false;
			
			s = o.phoneFormat(s);
			
			//�곗냽�� �レ옄 泥댄겕..
			var array = s.split("-");
			var str   = array[1] + '' + array[2];
			
			for (var i=0; i < str.length  ; i++) {
			  var chr_pass_0 = str.charAt(0);
			  var chr_pass_1 = str.charAt(i);
			 
			  //�숈씪臾몄옄 移댁슫��
			  if(chr_pass_0 == chr_pass_1) sameCnt++;

			}	
			if(str.length == sameCnt)  ret = true;

			return ret;
		};

		//�낅젰�� �대��곕쾲�멸� �좏슚�� 踰덊샇�몄� 寃�利앺븳��.
		o.isMobile = function(s) {
			if (!_.isString(s)) return false;
			
			var checkSameNo = _.find(MOB_ERROR, function(v){
				 //�곗냽踰덊샇 �먮윭媛� �ы븿�� 寃쎌슦 �ㅻ쪟踰덊샇 由ы꽩
				 return s.indexOf(v) > -1;
			 });
			
			if(_.isString(checkSameNo)) return false;
			
			s = o.phoneFormat(s); 
			
			//return /^01([0|1|6|7|8|9]?)-?([0-9]{3,4})-?([0-9]{4})$/.test(s);
			return /^(?:(010-?\d{4})|(01[1|6|7|8|9]-?\d{3,4}))-?(\d{4})$/.test(s);
		};

		//�낅젰�� �꾪솕踰덊샇媛� �좏슚�� 踰덊샇�몄� 寃�利앺븳��.
		o.isTel = function(s) {
			if (!_.isString(s)) return false;
			
			s = o.phoneFormat(s); 
			
			return /^\d{2,3}-\d{3,4}-\d{4}$/.test(s);
		};
		
		o.isAccount = function(s) {
			if (!_.isString(s)) return false;
			
			var len = s.length;
			
			return (10 <= len && len <= 14);
		};


		o.getCrytoData = function(obj, key) {
			return obj[key + '#[E]'] || '';
		};
		o.setCrytoData = function(obj, key, value){
			return obj[key + '#[E]'] =  value;
		};

		o.getListData = function(obj) {
			if (_.isArray(obj)) {
				return obj;
			}

			var a = [];
			if (_.isUndefined(obj) || _.isNull(obj)) {
				return a;
			}
			a.push(obj);
			return a;
		};

		o.resultMsg = function(result) {
			if (_.isUndefined(result) || _.isNull(result)) {
				return false;
			}

			if (result.body && result.body.resultMsg) {
				layerPop.alert(result.body.resultMsg);
				return false;
			}

			if (result.msg && result.msg.standMsg) {
				layerPop.alert(result.msg.standMsg);
				return false;
			}

			if (_.isUndefined(result.body) || _.isNull(result.body)) {
				return false;
			}

			return true;
		};

		o.validation = function(valid, object) {
			var succ = true;

			_.each(valid, function(v, k) {
				var val = object[k];

				if (_.isUndefined(val) || _.isNull(val) || val == '') {
					valid[k].error = true;
					succ = false;
				}
			});


			return succ;
		};

		o.existy = function(x) {
			return x != null
		};

		o.cat = function() {
			var head = _.first(arguments);
			if (o.existy(head)) {
				return head.concat.apply(head, _.rest(arguments));
			} else
				return [];
		};

		o.construct = function(head, tail) {
			return o.cat([head], _.toArray(tail));
		};

		o.mapKeyReName = function(obj, newNames) {
			return _.reduce(newNames, function(o, nu, old) {
					if (_.has(obj, old)) {
						o[nu] = obj[old];
						return o;
					} else return o;

				},

				_.omit.apply(null, o.construct(obj, _.keys(newNames))));
		};

		o.isError = function(valid) {
			var flag = false;
			_.each(valid, function(v, k) {
				if (valid[k].error) {
					flag = true;
					return false;
				}
			});

			return flag;
		};

		/**
		 * �ㅻ낫�쒕낫��/媛��곹궎�⑤뱶 �낅젰 object
		 */
		o.getInputEncData = function(ids, formObj) {
			var inputData = {
				ids: ids,
				transkeyUuid: tk.transkeyUuid
			};
			var isMakeEncData = false;
			var idsBuf = "";
			for (var i = 0; i < ids.length; i++) {
				var id = ids[i];
				//var tkCheckObj = document.getElementsByName("Tk_" + id + "_checkbox");
				//var tkCheckObj = document.getElementById("Tk_" + id + "_checkbox");
				var tkCheckObj = $("input[type=hidden][name=Tk_" + id + "_checkbox]");
				var tkCheckVal = "";
				if (tkCheckObj == undefined) {
					tkCheckVal = "e2e";
				} else {
					//tkCheckVal = tkCheckObj.value;
					tkCheckVal = tkCheckObj.val();
				}
				if (tkCheckVal == 'transkey') {
					//媛��곹궎�⑤뱶�쇨꼍��
					var values = tk.inputFillEncData(document.getElementById(id)); //inputFillEncData 濡쒖쭅 �쒖썙�� �꾩넚�댁빞 ��
					var name = document.getElementById(id).name;
					var hidden = values.hidden;
					var hmac = values.hmac;
					inputData["name_" + id] = name;
					inputData["hidden_" + id] = hidden;
					inputData["hmac_" + id] = hmac;
				} else if (tkCheckVal == 'e2e') {
					//�ㅻ낫�쒕낫�덉씪 寃쎌슦
					if (!isMakeEncData) {
						if (TK_makeEncData(formObj)) {
							inputData.hid_key_data = encodeURIComponent(document.getElementById("hid_key_data").value);
							inputData.hid_enc_data = encodeURIComponent(document.getElementById("hid_enc_data").value);
							isMakeEncData = true;
						}
					}
				}
				inputData["Tk_" + id + "_checkbox"] = tkCheckVal;
			}
			return inputData;
		};

		/**
		 * 紐⑤컮�� 媛��곹궎�⑤뱶 �낅젰 object
		 */
		o.getMobileInputEncData = function(ids, formObj) {
			var inputData = {
				ids: ids,
				transkeyUuid: mtk.transkeyUuid
			};
			var isMakeEncData = false;
			var idsBuf = "";
			for (var i = 0; i < ids.length; i++) {
				var id = ids[i];

				//媛��곹궎�⑤뱶�쇨꼍��
				var values = mtk.inputFillEncData(document.getElementById(id)); //inputFillEncData 濡쒖쭅 �쒖썙�� �꾩넚�댁빞 ��
				var name = document.getElementById(id).name;
				var hidden = values.hidden;
				var hmac = values.hmac;
				inputData["name_" + id] = name;
				inputData["hidden_" + id] = hidden;
				inputData["hmac_" + id] = hmac;

				inputData["Tk_" + id + "_checkbox"] = 'transkey';
			}
			return inputData;
		};

		/**
		 * �먰깮/吏곸옣踰덊샇 4�먮━ �좏슚�� 泥댄겕...
		 */
		o.isTelFstNum = function(number){
			var fNum = '';
			if(number && number.length > 3){
				//�먯옄由ш퉴吏�泥댄겕
				fNum = _.find(TEL_ERROR_NUM1, function(v){
					return number.substring(0,2).indexOf(v) > -1;
				});
				if(!fNum){
					//�몄옄由ъ껜��
					fNum = _.find(TEL_ERROR_NUM2, function(v){
						return number.substring(0,3).indexOf(v) > -1;
					});
					if(!fNum){
						//�ㅼ옄由ъ껜��
						fNum = _.find(TEL_ERROR_NUM3, function(v){
							return number.substring(0,4).indexOf(v) > -1;
						});
					}
				}
			}
			if(!fNum){
				return false;
			}else{
				return true;
			}
			
		};
		
		/**
		 * �붾㈃ �ㅽ겕濡� �대룞
		 */
		o.goScroll = function(id) {
			var offset = $('#'+id).offset().top;
			$('html, body').stop().animate({
				scrollTop: offset
			}, 'normal');
			$("#"+id).attr({tabindex:-1}).focus()
			$("body").attr("data-scraction","0")
		};
		
		/**
		 * direct 吏곹뙋 url 
		 */
		o.getDirectHost = function() {
			var directUrl = "";
			if (mz.ENVIRINFODIVCD == 'D') {
				directUrl = "https://storedev.meritzfire.com:19144/"; 
			} else if (mz.ENVIRINFODIVCD == 'T') {
				directUrl = "https://storetest.meritzfire.com:19144/";
			} else {
				directUrl = "https://store.meritzfire.com/";
			}
			return directUrl;
		};
		
		/**
		 * �ル낫��(ppmint) 吏곹뙋 url 
		 */
		o.getPetHost = function() {
			var directUrl = "";
			if (mz.ENVIRINFODIVCD == 'D') {
				directUrl = "https://wwwdev.ppmint.com:19146/";
			} else if (mz.ENVIRINFODIVCD == 'T') {
				directUrl = "https://wwwtest.ppmint.com:19146/";
			} else {
				directUrl = "https://www.ppmint.com/";
			}
			return directUrl;
		};
		
		/**
		 * 荑좏궎 �뗮똿 
		 */
		o.setCookie = function(name,value,expiredays){
			var todayDate = new Date(); 
			if (expiredays == null){
				 // 荑좏궎媛� ���λ맆 湲곌컙�� �ㅼ젙 null �쇨꼍�� default �섎（ 
				 expiredays = 1;
			}
			todayDate.setDate( todayDate.getDate() + expiredays ); 
			document.cookie = name + "=" + escape( value ) + "; path=/; expires=" + todayDate.toGMTString() + ";"
			
		}
		

		/**
		 * 荑좏궎 媛��몄삤湲� 
		 */
		o.getCookie = function(name){
			var nameOfCookie = name + "="; 
			var x = 0; 
			while ( x <= document.cookie.length ){ 
				var y = (x+nameOfCookie.length); 
				if ( document.cookie.substring( x, y ) == nameOfCookie ) { 
					if ( (endOfCookie=document.cookie.indexOf( ";", y )) == -1 ) 
						endOfCookie = document.cookie.length; 
					return unescape( document.cookie.substring( y, endOfCookie ) ); 
				} 
				x = document.cookie.indexOf( " ", x ) + 1; 
				if ( x == 0 ) 
					break; 
			 } 
			 return ""; 
		}

		o.getPhoneNumArray = function (phoneNumStr){		
			return String(phoneNumStr).replace(/(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/,"$1-$2-$3").split('-');
		}
		
		
		return o;
	}));
	
})(angular, mz);
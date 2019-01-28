/**
 * Date对象原型增加format方法
 * @param fmt
 * @returns {*}
 */
Date.prototype.format = function(fmt){
    let o = {
        "M+": this.getMonth() + 1, //month
        "d+": this.getDate(), //day
        "H+": this.getHours(), //hour
        "m+": this.getMinutes(), //minute
        "s+": this.getSeconds(), //second
        "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
        "S": this.getMilliseconds() //millisecond
    };
    if (typeof fmt === "undefined" || fmt == null || fmt == "")
        fmt = "yyyy-MM-dd";
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return fmt;
};
Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o){
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
};
export default class Format {
    constructor(){
        this.stripTagsRE = /<\/?[^>]+>/gi;
        this.stripScriptsRe = /(?:<script.*?>)((\n|\r|.)*?)(?:<\/script>)/ig;
        this.nl2brRe = /\r?\n/g;
        this.formatCleanRe = /[^\d\.]/g;
        this.I18NFormatCleanRe;
        this.singleton= true;
        this.thousandSeparator= ",";
        //小数分隔符
        this.decimalSeparator=".";
        //货币的精确到2位小数
        this.currencyPrecision= 2;
        //货币符号
        this.currencySign= '$';
        this.currencyAtEnd= false;

        this.Number = {
            //限制一个数字类型的大小范围， 如果小于最小范围， 那么返回最小值
            //如果大于最大范围， 那么返回最大值
            constrain: function (number, min, max) {
                number = parseFloat(number);
                if (!isNaN(min)) {
                    number = math.max(number, min);
                }
                if (!isNaN(max)) {
                    number = math.min(number, max);
                }
                return number;
            },

            //精确到几位
            toFixed: function (value, precision) {
                if (isToFixedBroken) {
                    precision = precision || 0;
                    var pow = math.pow(10, precision);
                    return (math.round(value * pow) / pow).toFixed(precision);
                }

                return value.toFixed(precision);
            },

            //Box.Number.num('1.23', 1); // returns 1.23
            //Box.Number.num('abc', 1);  // returns 1
            num: function (value, defaultValue) {
                if (isFinite(value)) {
                    value = parseFloat(value);
                }
                return !isNaN(value) ? value : defaultValue;
            },

            from: function (value, defaultValue) {
                return Box.Number.num(value, defaultValue)
            },

            randomInt: function (from, to) {
                return math.floor(math.random() * (to - from + 1) + from);
            },

            correctFloat: function (n) {
                return parseFloat(n.toPrecision(14));
            }
        }
    }

    isNullOrUndefined(value) {
        return (value === null) || (value === undefined);
    }

    undef(value) {
        return value !== undefined ? value : "";
    }
    //格式化数字，digits：保留小数位数
    renderNumric(data, digits, defaultVal) {
        if (!data) {
            return defaultVal || "--";
        }
        if (typeof data === "string"){
            data = parseFloat(data.replace(/,/g, ""));
        }
        if (!data) {
            return defaultVal || "--";
        }
        return this.renderFormat(data, digits);
    }
    //格式化数字
    renderFormat(data, digits) {
        if (typeof digits === "undefined" || digits == null || !digits) {
            digits = 0;
        }
        var fmt = '0,0.';
        for (i = 0; i < digits; i++) {
            fmt = fmt + '0';
        }
        return this.number(data, fmt);
    }
    //format.number(123456.9, '0.0000') --> 123456.9000
    number(v, formatString) {
        if (!formatString) {
            return v;
        }
        v = this.Number.num(v, NaN);
        if (isNaN(v)) {
            return "";
        }
        var comma = this.thousandSeparator,
            dec = this.decimalSeparator,
            i18n = false,
            neg = v < 0,
            hasComma,
            psplit;

        v = Math.abs(v);

        if (formatString.substr(formatString.length - 2) == '/i') {
            if (!this.I18NFormatCleanRe) {
                this.I18NFormatCleanRe = new RegExp('[^\\d\\' + this.decimalSeparator + ']', 'g');
            }
            formatString = formatString.substr(0, formatString.length - 2);
            i18n = true;
            hasComma = formatString.indexOf(comma) != -1;
            psplit = formatString.replace(this.I18NFormatCleanRe).split(dec);
        } else {
            hasComma = formatString.indexOf(',') != -1;
            psplit = formatString.replace(this.formatCleanRe, '').split('.');
        }

        if (1 < psplit.length) {
            v = v.toFixed(psplit[1].length);
        } else if (2 < psplit.length) {
            alert("Invalid number format, should have no more than 1 decimal");
            return;
        } else {
            v = v.toFixed(0);
        }

        var fnum = v.toString();
        psplit = fnum.split('.');
        if (hasComma) {
            var cnum = psplit[0],
                parr = [],
                j = cnum.length,
                m = Math.floor(j / 3),
                n = cnum.length % 3 || 3,
                i;

            for (i = 0; i < j; i += n) {
                if (i !== 0) {
                    n = 3;
                }

                parr[parr.length] = cnum.substr(i, n);
                m -= 1;
            }
            fnum = parr.join(comma);
            if (psplit[1]) {
                fnum += dec + psplit[1];
            }
        } else {
            if (psplit[1]) {
                fnum = psplit[0] + dec + psplit[1];
            }
        }

        return (neg ? '-' : '') + formatString.replace(/[\d,?\.?]+/, fnum);
    }

    //万元为单位，格式化数字，digits：保留小数位数
    renderWanYuan(data, digits, defaultVal) {
        if (!data) {
            return defaultVal || "--";
        }
        if (typeof data === "string"){
            data = parseFloat(data.replace(/,/g, ""));
        }
        return this.renderFormat(data / 10000, digits);
    }
    //亿元为单位，格式化数字，digits：保留小数位数
    renderYiYuan(data, digits, defaultVal) {
        if (!data) { return defaultVal || "--"; }
        if (typeof data === "string")
            data = parseFloat(data.replace(/,/g, ""));
        if (!data) { return defaultVal || "--"; }
        return this.renderFormat(data / 100000000, digits);
    }
    //百分比格式化数字，digits：保留小数位数
    renderPercent(data, digits, defaultVal) {
        if (!data) {
            return defaultVal || "--";
        }
        if (typeof data === "string"){
            data = parseFloat(data.replace(/,/g, ""));
        }
        return this.renderFormat(data * 100, digits);
    }
    //百分比格式化数字，digits：保留小数位数
    renderPercentWith(data, digits, defaultVal) {
        if (!data) {
            return defaultVal || "--%";
        }
        if (typeof data === "string"){
            data = parseFloat(data.replace(/,/g, ""));
        }
        return this.renderFormat(data * 100, digits) + '%';
    }
    //格式化数字，digits：保留小数位数
    renderNumricZero(data, digits, defaultVal) {
        if (this.isNullOrUndefined(data)) {
            return defaultVal || "--";
        }
        if (typeof data === "string")
            data = parseFloat(data.replace(/,/g, ""));
        if (this.isNullOrUndefined(data)) {
            return defaultVal || "--";
        }
        return this.renderFormat(data, digits);
    }
    //格式化日期
    renderDate(date, defaultVal) {
        if (typeof date === "undefined" || date == null) {
            return defaultVal || "--";
        }
        if (typeof date === "string") {
            var v = date.replace(/\..*/g, "").replace(/[^/\d\s]+/g, " ").split(" ");
            date = new Date();
            date.setFullYear(v[0]);
            date.setDate(v[2] || 1);
            date.setMonth((v[1] - 1));
            date.setDate(v[2] || 1);
            date.setMonth((v[1] - 1));
            date.setHours(v[3] || 0);
            date.setMinutes(v[4] || 0);
            date.setSeconds(v[5] || 0);
        }
        if (date.toString() === 'Invalid Date')
            return defaultVal || "--";
        return date.format("yyyy-MM-dd");
    }

    /**
     * 对象数组reduce方法
     * @param res  传入的对象数组
     * @param conditionFnc 需要循环规划的条件参数
     * @param conditionAdd 需要最终累加的字段参数
     */
    static reduceArray(res, conditionFnc, conditionAdd){
        return res.reduce((resp, obj)=> {
            let originObj = resp.find(item => item[conditionFnc] === obj[conditionFnc]);
            if (originObj) {
                originObj[conditionAdd]+= obj[conditionAdd];
            } else {
                resp.push(obj)
            }
            return resp;
        }, []);
    }

    /**
     * 获取当前日期的前或者后几天的日期
     * @param AddDayCount
     * @returns {string}
     * @constructor
     */
    GetDateStrFB(AddDayCount,type) {
        var dd = new Date();
        /**
         * 0代表获得当前日期的后面几天
         * 1代表获得当前日期的前面几天
         */
        type === 0 ? dd.setDate(dd.getDate() + AddDayCount) : dd.setDate(dd.getDate() - AddDayCount);
        var y = dd.getFullYear();
        var m = dd.getMonth() + 1;//获取当前月份的日期
        var d = dd.getDate();
        return y + "-" + m + "-" + d;
    }
}
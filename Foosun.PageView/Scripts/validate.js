﻿///<reference path="lightBox_min.js"/>
///<reference path="../../js/jquery-1.4.2.js"/>
String.prototype.Trim = function () {
    return this.replace(/(^\s*)|(\s*$)/g, "");
}
String.prototype.LTrim = function () {
    return this.replace(/(^\s*)/g, "");
}
String.prototype.RTrim = function () {
    return this.replace(/(\s*$)/g, "");
}
function HtmlEncode(str) {
    var s = "";
    if (str.length == 0) return "";
    s = str.replace(/&/g, "&gt;");
    s = s.replace(/</g, "&lt;");
    s = s.replace(/>/g, "&gt;");
    s = s.replace(/ /g, "&nbsp;");
    s = s.replace(/\'/g, "'");
    s = s.replace(/\"/g, "&quot;");
    s = s.replace(/\n/g, "<br>");
    return s;
}

function HTMLDecode(str) {
    var s = "";
    if (str.length == 0) return "";
    s = str.replace(/&amp;/g, "&");
    s = s.replace(/&lt;/g, "<");
    s = s.replace(/&gt;/g, ">");
    s = s.replace(/&nbsp;/g, " ");
    s = s.replace(/&#39;/g, "\'");
    s = s.replace(/&quot;/g, "\"");
    return s;
}

function isDate(value) {
    var r = value.match(/^(\d{4})(-|\/)(\d{1,2})\2(\d{1,2})$/); //2004
    if (r == null) {
        //Invalid date
        return false;
    }
    else {
        //Check month and day whether or not valid
        var d = new Date(r[1], r[3] - 1, r[4]);
        return (d.getFullYear() == r[1] && (d.getMonth() + 1) == r[3] && d.getDate() == r[4]);
    }
}

//函数名：chkdate
//功能介绍：检查是否为日期
//参数说明：要检查的字符串
//返回值：0：不是日期  1：是日期
function chkdate(datestr) {
    var lthdatestr;
    if (datestr != "")
        lthdatestr = datestr.length;
    else
        lthdatestr = 0;

    var tmpy = "";
    var tmpm = "";
    var tmpd = "";
    //var datestr;
    var status;
    status = 0;
    if (lthdatestr == 0)
        return 0;


    for (i = 0; i < lthdatestr; i++) {
        if (datestr.charAt(i) == '-') {
            status++;
        }
        if (status > 2) {
            //alert("Invalid format of date!");
            return 0;
        }
        if ((status == 0) && (datestr.charAt(i) != '-')) {
            tmpy = tmpy + datestr.charAt(i)
        }
        if ((status == 1) && (datestr.charAt(i) != '-')) {
            tmpm = tmpm + datestr.charAt(i)
        }
        if ((status == 2) && (datestr.charAt(i) != '-')) {
            tmpd = tmpd + datestr.charAt(i)
        }

    }
    year = new String(tmpy);
    month = new String(tmpm);
    day = new String(tmpd)
    //tempdate= new String (year+month+day);
    //alert(tempdate);
    if ((tmpy.length != 4) || (tmpm.length > 2) || (tmpd.length > 2)) {
        //alert("Invalid format of date!");
        return 0;
    }
    if (!((1 <= month) && (12 >= month) && (31 >= day) && (1 <= day))) {
        //alert ("Invalid month or day!");
        return 0;
    }
    if (!((year % 4) == 0) && (month == 2) && (day == 29)) {
        //alert ("This is not a leap year!");
        return 0;
    }
    if ((month <= 7) && ((month % 2) == 0) && (day >= 31)) {
        //alert ("This month is a small month!");
        return 0;

    }
    if ((month >= 8) && ((month % 2) == 1) && (day >= 31)) {
        //alert ("This month is a small month!");
        return 0;
    }
    if ((month == 2) && (day == 30)) {
        //alert("The Febryary never has this day!");
        return 0;
    }

    return 1;
}
//函数名：fucCheckNUM
//功能介绍：检查是否为数字
//参数说明：要检查的数字
//返回值：1为是数字，0为不是数字
function IsNumber(NUM) {
    //debugger;
    var i, j, strTemp;
    strTemp = "0123456789";
    if (NUM.length == 0)
        return false;
    for (i = 0; i < NUM.length; i++) {
        j = strTemp.indexOf(NUM.charAt(i));
        if (j == -1) {
            //说明有字符不是数字
            return false;
        }
    }
    //说明是数字
    return true;
}

function ValidateFunction(strContent, strRegString) {
    if ("string" != typeof (strContent) || "string" != typeof (strRegString)) {
        return false;
    }
    var reg = new RegExp(strRegString);
    return reg.test(strContent);
}

function IsEmpty(strContent) {
    var regStr = "^\\s*$";
    return ValidateFunction(strContent, regStr);
}
//焦点离开时 根据id，判断是否为空值 错误信息赋值给id+Err的标签中
function IsEmptyFocusOut(id, errorMsg) {
    $("#" + id).focusout(function () {
        $("#" + id + "Err").html("");
        //debugger;
        // txtNameErr
        if (IsEmpty($("#" + id).val())) {
            $("#" + id + "Err").html(errorMsg);
            return false;
        }
        else {
            return true;
        }
    });
}

//焦点离开时 根据name，判断是否为空值 错误信息赋值给id+Err的标签中
function IsEmptyForName(obj, name, errorMsg) {
    //debugger;
    var element = obj.find("[name='" + name + "']");
    var err = obj.find("[name='" + name + "Err']");
    err.html("");
    //debugger;
    // txtNameErr
    if (IsEmpty(element.val())) {
        err.html(errorMsg);
        return false;
    }
    else {
        return true;
    }
}
//焦点离开时 根据name，判断是否为空值 错误信息赋值给id+Err的标签中
function IsEmptyForNameGetMsg(obj, name, errorMsg) {
    //debugger;
    var element = obj.find("[name='" + name + "']");
    var err = obj.find("[name='" + name + "Err']");
    err.html("");
    //debugger;
    // txtNameErr
    if (IsEmpty(element.val())) {
        err.html(errorMsg);
        return errorMsg;
    }
    else {
        return "";
    }
}

//焦点离开时 根据id，判断是否为数字 错误信息赋值给id+Err的标签中
function IsNumFocusOut(id, errorMsg) {
    $("#" + id).focusout(function () {
        $("#" + id + "Err").html("");
        // txtNameErr
        //debugger;
        if (!IsNumber($("#" + id).val())) {
            $("#" + id + "Err").html(errorMsg);
            return false;
        }
        else {
            return true;
        }
    });
}
///点击保存时 根据ID 判断是否为空，错误信息赋值给id+Err的标签中
function IsEmptyGetErrMsg(id, errorMsg) {
    $("#" + id + "Err").html("");
    if (IsEmpty($("#" + id).val())) {
        $("#" + id + "Err").html(errorMsg);
        return errorMsg;
    }
    else {
        return "";
    }
}

///点击保存时 根据ID 判断是否为数字，错误信息赋值给id+Err的标签中
function IsNumGetErrMsg(id, errorMsg) {
    $("#" + id + "Err").html("");
    if (!IsNumber($("#" + id).val())) {
        $("#" + id + "Err").html(errorMsg);
        return errorMsg;
    }
    else {
        return "";
    }
}
//焦点离开时 根据id，判断文本域是否为空值 或者超出字数限制 错误信息赋值给id+Err的标签中
function IsEmptyGetErrMsgForTextArea(id, errorMsg, len) {
    $("#" + id + "Err").html("");
    //debugger;
    // txtNameErr
    if (IsEmpty($("#" + id).val())) {
        $("#" + id + "Err").html(errorMsg);
        return errorMsg;
    }
    else {
        //debugger;
        return CommentLengthValidatorForIDfocusout(id, len);
    }
}
//焦点离开时 根据name，判断文本域是否为空值 或者超出字数限制 错误信息赋值给id+Err的标签中
function IsEmptyGetErrMsgForTextAreaByName(obj, name, errorMsg, len) {
    var element = obj.find("[name='" + name + "']");
    var err = obj.find("[name='" + name + "Err']");
    err.html("");
    //debugger;
    // txtNameErr
    if (IsEmpty(element.val())) {
        err.html(errorMsg);
        return errorMsg;
    }
    else {
        return CommentLengthValidatorByName(obj, name, len);
    }
}

//焦点离开时 根据id，判断文本域是否为空值 或者超出字数限制 错误信息赋值给id+Err的标签中
function IsEmptyFocusOutForTextArea(id, errorMsg, len) {
    $("#" + id).focusout(function () {
        $("#" + id + "Err").html("");
        //debugger;
        // txtNameErr
        if (IsEmpty($("#" + id).val())) {
            $("#" + id + "Err").html(errorMsg);
            return false;
        }
        else {
            //debugger;
            return CommentLengthValidatorForIDfocusout(id, len);
        }
    });
}
function CommentLengthValidatorForIDfocusout(id, len) {
    var mesgBox = $("#" + id + "Err");
    var obj = $("#" + id).val();
    if (obj.length > len) {
        obj = obj.substr(0, len);
        mesgBox.html("您输入信息过长，最多允许您输入：" + len + "个字");
        return mesgBox.html();
    }
    else {
        mesgBox.html("");
        return "";
    }
}
function CommentLengthValidatorByName(objInput, name, len) {
    var mesgBox = objInput.find("[name='" + name + "Err']");
    var obj = objInput.find("[name='" + name + "']").val();
    if (obj.length > len) {
        obj = obj.substr(0, len);
        mesgBox.html("您输入信息过长，最多允许您输入：" + len + "个字");
        return mesgBox.html();
    }
    else {
        mesgBox.html("");
        return "";
    }
}
//一些对列表的逻辑操作
//加入收藏
function JobCollect(jobid) {
    $.ajax({
        type: "POST",
        url: "JobAjaxHandler.ashx",
        data: { Action: "AddJobRecord", JobID: jobid, t: Math.random() },
        timeout: 60000,
        async: false,
        success: function (msg) {
            //alert(msg);
            //"200"; // "收藏成功"; "-100";// "您已收藏过该工作职位";
            if (msg == "200") {
                ShowIframeLayer("JobCollect.aspx", "465px", "325px");
            } else {
                //alert("您已收藏过该工作职位");
                ShowIframeLayer("JobHaveCollect.aspx", "465px", "325px");
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("textStatus:" + textStatus + "  errorThrown:" + errorThrown);
        }
    });
}
//申请工作
function JobApply(jobid, companyid, hrEmail, position, divResumeJQueryObject, name, sex) {
    //debugger; //divResumeJQueryObject[0].outerHTML
    var resumeDiv = divResumeJQueryObject[0].outerHTML;
    $.ajax({
        type: "POST",
        url: "JobAjaxHandler.ashx",
        data: { Action: "AddJobApply", JobID: jobid, CompanyID: companyid, HREmail: hrEmail, Position: position, ResumeDiv: resumeDiv, Name: name, Sex: sex, t: Math.random() },
        timeout: 60000,
        async: false,
        success: function (msg) {
            var msg1 = "";
            // window.parent.ShowIframeLayer("JobApplySucess.aspx?num=" + 1, "464px", "327px");
            // return;
            // alert(msg);
            //                window.parent.HideLayer();
            //                location.href = "about:blank";
            //                //大于5次就不显示加学分文字
            //               window.parent.ShowDivResumeOK(6);
            //              return;
            //alert(msg); //200 成功（但不添加学分） 300 超过5次 "-100";// "请先填写简历，然后再进行投递！";"-200";//发邮件失败 "202";//添加学分
            if (msg == "200") {
                window.parent.HideLayer();
                location.href = "about:blank";
                //大于5次就不显示加学分文字
                // window.parent.ShowDivResumeOK(6);
                window.parent.ShowIframeLayer("JobApplySucess.aspx?num=" + 6, "464px", "327px");
                // window.parent.divResumeOK.layerMood.Show();
            } else if (msg == "202") {
                window.parent.HideLayer();
                location.href = "about:blank";
                //大于5次就不显示加学分文字
                //window.parent.ShowDivResumeOK(1);
                window.parent.ShowIframeLayer("JobApplySucess.aspx?num=" + 1, "464px", "327px");
            }
            else if (msg == "300") {
                //alert("您对该职位的申请已超过5次");
                msg1 = encodeURI("您对该职位的申请已超过上限");
                window.parent.ShowIframeLayer("AlertDiv.aspx?msg=" + msg1, "465px", "172px");

            } else if (msg == "-100") {
                //alert("请先填写简历，然后再进行投递！");
                msg1 = encodeURI("请先填写简历，然后再进行投递！");
                window.parent.ShowIframeLayer("AlertDiv.aspx?msg=" + msg1, "465px", "172px");

            } else if (msg == "-200") {
                //alert("发送邮件失败！请重试");
                //debugger;
                msg1 = encodeURI("发送邮件失败！请重试");
                window.parent.ShowIframeLayer("AlertDiv.aspx?msg=" + msg1, "465px", "172px");

            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("textStatus:" + textStatus + "  errorThrown:" + errorThrown);
        }
    });
}
//推荐给好友
function JobToFriend(jobid, positionName, companyName) {
    ShowIframeLayer("JobRecommend.aspx?jobid=" + escape(jobid) + "&position=" + encodeURI(positionName) + "&company=" + encodeURI(companyName), "465px", "290px");
}

//删除收藏的职位
function JobDelete(jobid) {
    if (confirm("确定删除该收藏记录？")) {
        $.ajax({
            type: "POST",
            url: "JobAjaxHandler.ashx",
            data: { Action: "DeleteJobRecord", JobID: jobid, t: Math.random() },
            timeout: 60000,
            async: false,
            success: function (msg) {
                //alert(msg);
                location.reload();
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert("textStatus:" + textStatus + "  errorThrown:" + errorThrown);
            }
        });
    }
}

//判断是否有简历
function IsHaveResume() {
    var b = false;
    $.ajax({
        type: "POST",
        url: "JobAjaxHandler.ashx",
        data: { Action: "IsHaveResume", t: Math.random() },
        timeout: 60000,
        async: false,
        success: function (msg) {
            //alert(msg);
            if (msg == "1")
                b = true;
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("textStatus:" + textStatus + "  errorThrown:" + errorThrown);
        }
    });
    return b;
}

//预览简历
function ResumePreview(jobid, companyid, hremail, position) {
    //divResumePre.layerMood.Show();
    //alert(jobid);
    //debugger;
    if (IsLogin()) {
        if (IsHaveResume()) {
            ShowIframeLayer("ResumePreview.aspx?jobid=" + jobid + "&companyid=" + companyid + "&hremail=" + hremail + "&position=" + encodeURI(position) + "", "584px", "467px");
        } else {
            ShowIframeLayer("JobCreatResumeTip.aspx", "462px", "172px");
        }
    }
}
//显示快速登录弹层
function ShowLoginLayer() {
    //alert("请先登录！");
    quickLoginLayer();
}
function quickLoginLayer() {
    ShowIframeLayer("EasyLoginIndex.aspx", "466px", "323px");
}
/*//弹层*/
//    var layer = null;

//    function ShowIframeLayer(url, width, height) {
////         window.frames["layerIframe"].document.write("");
//        $("#divIframeLayer").css("width", width);
//        $("#divIframeLayer").css("height", height);
//        $("#layerIframe").attr("src", url);

//        ShowLayer("divIframeLayer");
//    }
//    function ShowLayer(layerId) {
//        HideLayer();
//        layer = new LightBox(layerId, { "Color": "#000000" });
//        layer.Show();
//    }
//    function HideLayer() {
//        if (layer != null) {
//            layer.Close();
//            layer = null;
//        }
//    }
//end 弹层



/**

* @func checkIdCard
* @desc 身份证验证函数
* @author Lone Chain
* @version 1.0.0
* @date 2011-9-19
* @parame {String} idcard 要验证的身份证号码字符串
* @return {Object¦Boolen} 验证成功返回一个包含省份、生日、性别的对象， 失败返回false
*/
function checkIdCard(idcard) {
    var cities = {
        11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古",
        21: "辽宁", 22: "吉林", 23: "黑龙江",
        31: "上海", 32: "江苏", 33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东",
        41: "河南", 42: "湖北", 43: "湖南", 44: "广东", 45: "广西", 46: "海南",
        50: "重庆", 51: "四川", 52: "贵州", 53: "云南", 54: "西藏",
        61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏", 65: "新疆",
        71: "台湾",
        81: "香港", 82: "澳门",
        91: "国外"
    };
    //debugger;
    idcard = idcard.toString();
    //验证位数是否正确
    var info = idcard.length == 15 ?
        idcard.match(/^([1-9]\d)\d{4}(\d{2})(\d{2})(\d{2})\d{2}(\d)$/i) :
        idcard.match(/^([1-9]\d)\d{4}(\d{4})(\d{2})(\d{2})\d{2}(\d)[\dx]$/i);
    if (info == null)
        return false;
    if (!info.length) {
        return false;
    }
    //验证省份是否正确
    if (!cities[info[1]]) {
        return false;
    }
    //验证生日是否正确
    var birthday = new Date(info[2], info[3] - 1, info[4]);
    if (!(
        (birthday.getFullYear() == info[2] || birthday.getYear() == info[2]) &&
        birthday.getMonth() + 1 == parseInt(info[3], 10) &&
        birthday.getDate() == parseInt(info[4], 10)
    )) {
        return false;
    }
    //18位身份证校验
    if (info[0].length == 18) {
        var sum = 0;
        info[0] = info[0].replace(/x/i, 'a');
        for (var i = 17; i >= 0; i--) {
            sum += (Math.pow(2, i) % 11) * parseInt(info[0].charAt(17 - i), 11);
        }
        if ((sum % 11) != 1) {
            return false;
        }
    }

    return {
        city: cities[info[1]],
        birthday: birthday,
        sex: info[5] % 2 ? "男" : "女"
    };
}




//示例：
//view source
//print?
//var s = ´320521720807024´;
//var b = checkIdCard(s);
//if (b)
//{
//    alert(´身份证号码正确，省份：´ + b.city + ´, 生日：´ + b.birthday + ´, 性别：´ + b.sex);

//}else{
//alert(´身份证号码不正确´);


//}



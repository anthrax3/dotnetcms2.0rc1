﻿<%@ Page Language="C#" AutoEventWireup="true" Inherits="TempletEditor" ValidateRequest="false"
    ResponseEncoding="utf-8" CodeBehind="TempletEditor.aspx.cs" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <title>模版编辑</title>
    <link rel="stylesheet" type="text/css" href="/CSS/base.css" />
    <link rel="stylesheet" type="text/css" href="/CSS/style.css" />
    <link rel="stylesheet" type="text/css" href="/CSS/<%Response.Write(Foosun.Config.UIConfig.CssPath());%>/css/blue.css" />
    <script src="/controls/kindeditor/kindeditor.js" type="text/javascript"></script>
    <link href="/controls/kindeditor/themes/default/default.css" rel="stylesheet" type="text/css" />
    <link href="/controls/kindeditor/plugins/code/prettify.css" rel="stylesheet" type="text/css" />
    <script src="/controls/kindeditor/plugins/code/prettify.js" type="text/javascript"></script>
    <script src="/controls/kindeditor/lang/zh_CN.js" type="text/javascript"></script>
    <script src="/Scripts/jquery.js" type="text/javascript"></script>
    <script src="/Scripts/public.js" type="text/javascript"></script>
    <link href="/CSS/jquery-ui-1.10.2.custom.css" rel="stylesheet" type="text/css" />
    <script src="/Scripts/jquery-ui-1.10.2.custom.min.js" type="text/javascript"></script>
    <script src="/Scripts/jquery.bgiframe.js" type="text/javascript"></script>
    <script src="/Scripts/SelectAction.js" type="text/javascript"></script>
    <script language="javascript" type="text/javascript">
        var editor;
        KindEditor.ready(function (K) {
            editor = K.create('#ContentTextBox', {
                allowPreviewEmoticons: false,
                allowImageUpload: false,
                filterMode: false,
                items: [
						'source', 'fontname', 'fontsize', '|', 'forecolor', 'hilitecolor', 'bold', 'italic', 'underline',
						'removeformat', '|', 'justifyleft', 'justifycenter', 'justifyright', 'insertorderedlist',
						'insertunorderedlist', '|', 'emoticons', 'image', 'link']
            });
        });
    </script>
</head>
<body>
    <form id="fromeditor" runat="server">
    <div class="mian_body">
        <div class="mian_wei">
            <div class="mian_wei_min">
                <div class="mian_wei_left">
                    <h3>
                        在线编辑</h3>
                </div>
                <div class="mian_wei_right">
                     导航：<a href="javascript:openmain('../main.aspx')">首页</a>&gt;&gt;<a href="TempletManageList.aspx" class="xa3">模板管理</a>&gt;&gt;在线编辑<asp:TextBox
                        ID="FilePath" runat="server" Visible="False"></asp:TextBox>
                </div>
            </div>
        </div>
        <div class="mian_cont">
            <div class="nwelie">
                <div class="lanlie_lie">
                    <div class="newxiu_base">
                        <table class="nxb_table">
                            <tr>
                                <td>
                                    <div class="mo_bj">
                                        <span>特殊页面标签：</span>
                                        <asp:DropDownList ID="LabelList1" runat="server" class="select2">
                                            <asp:ListItem Value="">=单页面标签=</asp:ListItem>
                                            <asp:ListItem Value="{#Page_Title}">页面标题</asp:ListItem>
                                            <asp:ListItem Value="{#Page_MetaKey}">meta关键字</asp:ListItem>
                                            <asp:ListItem Value="{#Page_MetaDesc}">meta描述</asp:ListItem>
                                            <asp:ListItem Value="{#Page_Split}">内容分页</asp:ListItem>
                                            <asp:ListItem Value="{#Page_Content}">内容</asp:ListItem>
                                            <asp:ListItem Value="{#Page_Navi}">导航</asp:ListItem>
                                        </asp:DropDownList>
                                        <input id="Button9" class="insubt1" type="button" value="插入" onclick="javascript:getValue(document.fromeditor.LabelList1.value);" />
                                        <select id="history" class="select2">
                                            <option value="">=归档页面标签=</option>
                                            <optgroup label="列表标签">
                                                <option value="{#history_list}">列表</option>
                                                <option value="{#history_PageTitle}">页面标题</option>
                                            </optgroup>
                                            <optgroup label="内容页标签">
                                                <option value="{#history_PageTitle}">内容标题</option>
                                                <option value="{#history_PageAuthor}">作者</option>
                                                <option value="{#history_PageSouce}">来源</option>
                                                <option value="{#history_PageContent}">内容</option>
                                                <option value="{#history_PageCreatTime}">创建时间</option>
                                            </optgroup>
                                        </select>
                                        <input id="Button4" class="insubt1" type="button" value="插入" onclick="javascript:getValue(document.fromeditor.history.value);" />
                                        <asp:DropDownList ID="Search1" runat="server" CssClass="mselect5">
                                            <asp:ListItem Value="">=搜索页面标签=</asp:ListItem>
                                            <asp:ListItem Value="{#Page_SearchContent}">列表(标题/内容)</asp:ListItem>
                                            <asp:ListItem Value="{#Page_SearchPages}">分页</asp:ListItem>
                                        </asp:DropDownList>
                                        <input id="Button5" class="insubt1" type="button" value="插入" onclick="javascript:getValue(document.fromeditor.Search1.value);" />
                                        <asp:DropDownList ID="Comm1" runat="server" CssClass="mselect5">
                                            <asp:ListItem Value="">=评论页面标签=</asp:ListItem>
                                            <asp:ListItem Value="{#Page_CommTitle}">评论内容[通用]</asp:ListItem>
                                            <asp:ListItem Value="{#Page_CommPages}">分页[通用]</asp:ListItem>
                                            <asp:ListItem Value="{#Page_Commidea}">显示观点统计[通用]</asp:ListItem>
                                            <asp:ListItem Value="{#Page_CommStat}">评论数据统计[通用]</asp:ListItem>
                                            <asp:ListItem Value="{#Page_PageTitle}">评论页面标题[评论独立列表]</asp:ListItem>
                                            <asp:ListItem Value="{#Page_PostComm}">发表评论[评论独立列表]</asp:ListItem>
                                            <asp:ListItem Value="{#Page_NewsURL}">新闻连接[评论独立列表]</asp:ListItem>
                                        </asp:DropDownList>
                                        <input id="Button6" class="insubt1" type="button" value="插入" onclick="javascript:getValue(document.fromeditor.Comm1.value);" />
                                        
                                    </div>
                                    <div class="mo_bj">
                                        <asp:DropDownList ID="LabelList" runat="server" CssClass="mselect5">
                                        </asp:DropDownList>
                                        <input id="sbutton1" class="insubt1" type="button" value="插入" onclick="javascript:getValue(document.fromeditor.LabelList.value);" />
                                        <input id="sbutton2" class="xsubmit6" type="button" value="系统标签(内置)" onclick="javascript:selectFile('ContentTextBox','系统标签','Label1',500,500)" />
                                        <input id="sbutton3" class="xsubmit8" type="button" value="动态栏目/专题标签(内置)" onclick="javascript:selectFile('ContentTextBox','动态栏目/专题标签','Labelm',800,500)" />
                                        <input id="sbutton4" class="xsubmit6" style="color: Red;" type="button" value="自定义标签"
                                            onclick="javascript:selectFile('ContentTextBox','自定义标签','Label',600,500)" />
                                        <input id="sbutton5" class="xsubmit6" type="button" value="选择自由标签" onclick="javascript:selectFile('ContentTextBox','自定义标签','freeLabel',600,500)" />
                                        <asp:DropDownList ID="classlist" runat="server">
                    <asp:ListItem Value="">=终极列表分页[选用]=</asp:ListItem>
                    <asp:ListItem Value="{PageLists}">分页在插入位置显示</asp:ListItem>
                    </asp:DropDownList>
                    <input id="Button8" type="button" class="insubt1" value="插入" onclick="javascript:getValue(document.fromeditor.classlist.value);" />
                                    </div>
                                    <div class="mo_bj">
                                        <asp:Button ID="Button2" runat="server" CssClass="xsubmit5" Text="保存模板" OnClick="Button1_ServerClick" />
                                        <input type="button" name="Submit" value=" 恢 复 " class="xsubmit5" onclick="javascript:UnDo();" />
                                        <span style="color: #999999;"><span
                                                id="dirPath" runat="server" /></span>
                                    </div>
                                    <div class="mo_bi">
                                        <textarea name="ContentTextBox" style="width: 100%; height: 500px" id="ContentTextBox"
                                            runat="server"></textarea>
                                    </div>
                                    <div class="mo_bi">
                                        站点目录：{$InstallDir} 模板路径：{@dirTemplet} 您可以直接在模板中插入此标签替代您的图片，<br />
                                        自定义标签格式：{FS_xx}<br />
                                        (内置)系统标签：{FS_S_xx}<br />
                                        (内置)动态栏目标签：{FS_Class*_xx}(不调用子类)，{FS_Class*C_xx}(调用子类)，xx为栏目的ClassID<br />
                                        (内置)动态专题标签：{FS_Special*_xx}，xx为专题的SpecialID<br />
                                        自由标签：{FS_FREE_xx}<br />
                                        <span>特别注意：标签严格区分大小写</span>
                                    </div>
                                    <div class="mo_bj">
                                        <asp:Button ID="Button3" runat="server" CssClass="xsubmit2" Text="保存模板" OnClick="Button1_ServerClick" />
                                        <input type="button" name="Submit" class="xsubmit2" value=" 恢 复 " onclick="javascript:UnDo();" />
                                        &nbsp;&nbsp;<a style="color: Red;" onclick="{if(confirm('确定要切换到文本编辑吗?请在切换前先保存您的数据，否则会丢失!\n确定切换吗？')){return true;}return false;}"
                                            href="Txteditor.aspx?dir=<%Response.Write(Dir); %>&filename=<%Response.Write(FileName); %>">切换到文本编辑器</a>
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <br />
        <br />
    </div>
    <div id="dialog-message" title="提示">
    </div>
    </form>
</body>
<script language="javascript" type="text/javascript">
    function UnDo() {
        if (confirm('你确定要取消所做的更改吗?')) {
            document.fromeditor.reset();
        }
    }
    function getValue(value) {
        if (value != "")
            Insert(value);
    }
    function Insert(value) {
        if (value != "") {
            editor.insertHtml(value);
        }
    }
</script>
</html>

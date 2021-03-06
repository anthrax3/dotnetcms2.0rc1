﻿<%@ Page Language="C#" ContentType="text/html" ResponseEncoding="utf-8" AutoEventWireup="true" Inherits="user_constr_Constrlist" Debug="true" Codebehind="Constrlist.aspx.cs" %>
<%@ Register Src="../../controls/PageNavigator.ascx" TagName="PageNavigator" TagPrefix="uc1" %>
<%@ Import NameSpace="System.Data"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <link type="text/css" rel="stylesheet" href="../css/base.css" />
    <link type="text/css" rel="stylesheet" href="../css/style.css" />
    <script src="/Scripts/jquery.js" type="text/javascript"></script>
    <script src="/Scripts/public.js" type="text/javascript"></script>
<title><%Response.Write(Foosun.Config.UIConfig.HeadTitle); %></title>
        
    <script type="text/javascript" language="javascript">
        $(function () {
            $("input[name='Checkbox2']").click(function () {
                if (this.checked) {
                    $("input[name='Checkbox1']").attr('checked', true);
                }
                else {
                    $("input[name='Checkbox1']").attr('checked', false);
                }
            });
        });
        </script>
</head>
<body class="main_big">
<form id="form1" name="form1" method="post" action="" runat="server"> 
<table width="100%"  border="0" cellpadding="0" cellspacing="0" class="toptable">
        <tr>
          <td height="1" colspan="2"></td>
        </tr>
        <tr>
          <td width="57%" class="matop_tab_left"><strong  style="font-size:14px; line-height:35px; margin-left:10px;">
              文章管理</strong></td>
    <td width="43%" class="list_link"  style="PADDING-LEFT: 14px" ><div style="text-align:right; margin-right:10px;">位置导航：<a href="../main.aspx" target="sys_main" class="list_link">首页</a><img alt="" src="../images/navidot.gif" border="0" /><a href="Constrlist.aspx" class="menulist">文章管理</a></div></td>
        </tr>
</table>
      <table width="100%" border="0" align="center" cellpadding="3" cellspacing="1" class="Navitable">
        <tr>
          <td style="padding-left:14px;">          
          <a href="Constr.aspx" class="menulist">发表文章</a>&nbsp; &nbsp;<a href="Constrlistpass.aspx" class="topnavichar" >所有退稿</a>&nbsp; &nbsp;<a href="Constrlist.aspx" class="menulist">文章管理</a>&nbsp; &nbsp;<a href="ConstrClass.aspx" class="menulist">分类管理</a>&nbsp; &nbsp;<a href="Constraccount.aspx" class="menulist">账号管理</a></td>
          <td align="right" style="padding-right:28px;"><a href="javascript:PUnlock();" class="topnavichar">批量锁定</a>&nbsp; &nbsp;<a href="javascript:Plock();" class="topnavichar" >批量解锁</a>&nbsp; &nbsp;<a href="javascript:PDel();" class="topnavichar">批量删除</a></td>
        </tr>
</table>
<div id="no" runat="server"></div>
    <asp:Repeater ID="DataList1" runat="server" >
    <HeaderTemplate>
    <table width="98%" border="0" align="center" cellpadding="5" cellspacing="1" bgcolor="#FFFFFF" class="liebtable">
    <tr onmouseout="this.className='off'" onmouseover="this.className='on'" class="off">
    <th align="center" width="35%">标题</th>
    <th align="center" width="10%">分类</th>
    <th align="center" width="15%">添加时间</th>
    <th align="center" width="25%">被采用┊状态┊投稿┊退稿┊推荐</th>
    <th align="center" width="15%">操作&nbsp; &nbsp;<input type="checkbox" name="Checkbox2" /></th>
    </tr>
    <div id="tnzlist" runat="server"></div>
    </HeaderTemplate>
    <ItemTemplate>
        <tr onmouseout="this.className='off'" onmouseover="this.className='on'" class="off">
        <td align="left" ><%#((DataRowView)Container.DataItem)["Titles"]%></td>
        <td align="center"><%#((DataRowView)Container.DataItem)["cNames"]%></td>
        <td align="center" ><%#((DataRowView)Container.DataItem)["creatTime"]%></td>
        <td align="center" ><%#((DataRowView)Container.DataItem)["isChecks"]%></td>
        <td align="center"><%#((DataRowView)Container.DataItem)["idc"]%></td>            
        </tr>
     </ItemTemplate>
     <FooterTemplate>
     </table>
     </FooterTemplate>
    </asp:Repeater>
<table width="98%" border="0" align="center" cellpadding="3" cellspacing="2" style="height: 20px">
<tr><td align="right" style="width: 928px">
    <uc1:PageNavigator ID="PageNavigator1" runat="server" />
</td></tr>
</table>
<br />
<br />
<table width="100%" height="74" border="0" cellpadding="0" cellspacing="0" class="copyright_bg">
  <tr>
    <td><div align="center"><%Response.Write(CopyRight); %></div></td>
  </tr>
</table>
</form>
</body>
<script language="javascript" type="text/javascript">
function Lock(ID)
{
   if(confirm("你确定要解除锁定吗?"))
   { 
    self.location="?Type=Lock&ID="+ID;
   }
}
function UnLock(ID)
{
   if(confirm("你确定要锁定吗?"))
   { 
    self.location="?Type=UnLock&ID="+ID;
   }
}
function del(ID)
{
   if(confirm("你确定要删除吗?"))
   { 
        self.location="?Type=del&ID="+ID;
   }
}
function PDel()
{
    if(confirm("你确定要彻底删除吗?"))
    {
	    document.form1.action="?Type=PDel";
	    document.form1.submit();
	}
}
function PUnlock()
{
    if(confirm("你确定要批量解锁吗?"))
    {
        document.form1.action="?Type=PUnlock";
	    document.form1.submit();
	}
}
function Plock()
{
    if(confirm("你确定要批量锁定吗"))
    {
	    document.form1.action="?Type=Plock";
	    document.form1.submit();
	}
}
</script>
</html>

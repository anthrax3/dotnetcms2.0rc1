﻿using System;
using System.Collections.Generic;

using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;
using Foosun.CMS;

namespace Foosun.PageView.manage.sys
{
    public partial class AdminAdd : Foosun.PageBasic.ManagePage
    {
        public AdminAdd()
        {
            Authority_Code = "Q011";
        }
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                Response.CacheControl = "no-cache";

                //copyright.InnerHtml = CopyRight;
                GetAdminGroupID();
                SiteList();
            }
        }

        /// <summary>
        /// 用于获得管理员组下拉选择框
        /// </summary>
        /// <returns>返回下拉选择框</returns>
        protected void GetAdminGroupID()
        {
            Foosun.CMS.Admin ac = new Foosun.CMS.Admin();
            DataTable Ds = ac.GetAdminGroupList();
            AdminGroup.DataTextField = "GroupName";          //设置下拉列表框显示的文本
            AdminGroup.DataValueField = "adminGroupNumber";  //设置下拉列表框显示的文本项的值
            AdminGroup.DataSource = Ds;                      //指定列表框数据源
            AdminGroup.DataBind();                           //绑定数据源
        }

        protected void Button1_Click(object sender, EventArgs e)
        {
            if (Page.IsValid == true)                       //判断是否验证成功
            {
                Foosun.Model.AdminInfo aci = new Foosun.Model.AdminInfo();
                aci.UserName = Request.Form["TxtUserName"];
                aci.UserPassword = Common.Input.MD5(Request.Form["UserPwd"].ToString(), true);
                aci.RealName = Request.Form["RealName"];
                aci.isAdmin = 1;
                aci.Email = Request.Form["Email"];
                aci.UserFace = "/sysImages/user/noHeadpic.gif";
                aci.userFacesize = "50|50";
                aci.RegTime = DateTime.Now;
                aci.SiteID = Request.Form["SiteID"];
                aci.LoginNumber = 0;
                aci.OnlineTF = 0;
                //aci.isIDcard = 1;
                aci.OnlineTime = 0;
                aci.isLock = 0;
                aci.aPoint = 0;
                aci.ePoint = 0;
                aci.cPoint = 0;
                aci.gPoint = 0;
                aci.iPoint = 0;
                RootPublic pd = new RootPublic();
                aci.UserGroupNumber = pd.GetRegGroupNumber();
                if (this.AdminGroup.SelectedValue != "")
                {
                    aci.adminGroupNumber = Request.Form["AdminGroup"];
                }
                else
                {
                    PageError("请先创建管理组再添加管理员!", "");
                }
                aci.isSuper = 0;
                aci.OnlyLogin = 1;//int.Parse(Request.Form["MoreLogin"]);
                aci.isChannel = int.Parse(Request.Form["isChannel"]);
                aci.isChSupper = int.Parse(Request.Form["isChSupper"]);
                aci.Iplimited = Request.Form["Iplimited"];
                if (aci.isChannel == 0) { aci.isChSupper = 0; }
                int result = 0;
                Foosun.CMS.Admin ac = new Foosun.CMS.Admin();
                result = ac.Add(aci);
                if (result == 1)
                    Common.MessageBox.ShowAndRedirect(this, "添加管理员成功!", "AdminList.aspx");
                else if (result == 2)
                    Common.MessageBox.Show(this, "管理员已经存在!");
                else
                    Common.MessageBox.Show(this, "添加管理员失败!");
            }
        }


        /// <summary>
        /// 获取频道列表
        /// </summary>
        /// <returns>返回获取频道列表</returns>
        protected void SiteList()
        {
            Foosun.CMS.Admin ac = new Foosun.CMS.Admin();
            DataTable Ds = ac.GetSiteList();
            string str_SiteIDTempstr = "";
            str_SiteIDTempstr = "<select name=\"SiteID\" style=\"width:206px;\" >";
            str_SiteIDTempstr += "<option value=\"0\">请选择频道</option>";
            if (Ds != null)
            {
                int Cnt = Ds.Rows.Count;
                for (int i = 0; i < Cnt; i++)
                {
                    str_SiteIDTempstr += "<option value=\"" + Ds.Rows[i]["ChannelID"].ToString() + " \">" + Ds.Rows[i]["CName"].ToString() + "</option>";
                }
                Ds.Clear();
                Ds.Dispose();
            }
            str_SiteIDTempstr += "</select>";
            Site_Span.InnerHtml = str_SiteIDTempstr;
        }
    }
}
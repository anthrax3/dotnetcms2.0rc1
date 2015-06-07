﻿using System;
using System.Data;
using System.Configuration;
using System.Collections;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Web.UI.HtmlControls;
using Foosun.CMS;

public partial class user_ConstrClass_up : Foosun.PageBasic.UserPage
{
    Constr con = new Constr();
    /// <summary>
    /// 初始化
    /// </summary>
    /// <param name="sender"></param>
    /// <param name="e"></param>
    /// 
    #region 初始化
    protected void Page_Load(object sender, EventArgs e)
    {
        
        Response.CacheControl = "no-cache";
        if (!IsPostBack)
        {
            string Ccids = Common.Input.Filter(Request.QueryString["Ccid"].ToString());
            DataTable dt = con.Sel7(Ccids);
            int cut = dt.Rows.Count;
            cNameBox.Text = dt.Rows[0]["cName"].ToString();
            ContentBox.Text = dt.Rows[0]["Content"].ToString();
            if (cut==0)
            {
                PageError("对不起参数错误", "");
            }
        }
    }
    #endregion
    /// <summary>
    /// 修改数据
    /// </summary>
    /// <param name="sender"></param>
    /// <param name="e"></param>
    /// 
    #region 修改数据
    protected void Button1_Click(object sender, EventArgs e)
    {
        if (Page.IsValid)
        {
            string Ccid1 = Common.Input.Filter(Request.QueryString["Ccid"].ToString());
            string cName = Common.Input.Htmls(Request.Form["cNameBox"].ToString());
            string Content = Common.Input.Htmls(Request.Form["ContentBox"].ToString());
            Foosun.Model.STConstrClass stcn;
            stcn.cName = cName;
            stcn.Content = Content;

            if (con.Update2(stcn, Ccid1)!=0)
            { 
                PageRight("修改成功","ConstrClass.aspx");
            }
                else
            {
                PageError("修改失败<br>", "ConstrClass.aspx");
            }       
        }
    }
    #endregion
    /// <summary>
    /// 页面转向
    /// </summary>
    /// <param name="sender"></param>
    /// <param name="e"></param>
    /// 
    #region 页面转向
    protected void Button2_Click(object sender, EventArgs e)
    {
        Response.Redirect("ConstrClass.aspx");
    }
    #endregion
}
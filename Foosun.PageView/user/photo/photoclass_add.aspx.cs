﻿//=====================================================================
//==                  (c)2011 Foosun Inc.By doNetCMS1.0              ==
//==                     Forum:bbs.foosun.net                        ==
//==                     WebSite:www.foosun.net                      ==
//=====================================================================
using System;
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

public partial class user_photo_photoclass_add : Foosun.PageBasic.UserPage
{
    Photo pho = new Photo();
    protected void Page_Load(object sender, EventArgs e)
    {
        Response.CacheControl = "no-cache";
        
    }
    protected void Button1_Click(object sender, EventArgs e)
    {
        int isDisclass = 0;
        string DisID = "";       
        DateTime Creatime = DateTime.Now;
        string ClassID = Common.Rand.Number(12);
        string ClassName = Common.Input.Htmls(Request.Form["ClassName"].ToString());
        string UserNum = Foosun.Global.Current.UserNum;

        if (Page.IsValid)
        {
            if (pho.Add_2(ClassName, ClassID, Creatime, UserNum, isDisclass, DisID) != 0)
            {
                PageRight("添加分类成功", "photoclass.aspx");
            }
            else 
            {
                PageError("添加失败", "photoclass.aspx");
            }
        }
    }
}




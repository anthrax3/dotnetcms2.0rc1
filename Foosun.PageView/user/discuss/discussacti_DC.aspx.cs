//=====================================================================
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

public partial class user_discussacti_DC : Foosun.PageBasic.UserPage
{
    Discuss dis = new Discuss();
    protected void Page_Load(object sender, EventArgs e)
    {
        if(!this.IsPostBack)
        {
            
            string Aid=Common.Input.Filter(Request.QueryString["Aid"].ToString());
            DataTable sle_Actives = dis.sel_15(Aid);
            Activesubject.Text = sle_Actives.Rows[0]["Activesubject"].ToString();
            ActivePlace.Text = sle_Actives.Rows[0]["ActivePlace"].ToString();
            ActiveExpense.Text = sle_Actives.Rows[0]["ActiveExpense"].ToString();
            Anum.Text = sle_Actives.Rows[0]["Anum"].ToString();
            ActivePlan.Text = sle_Actives.Rows[0]["ActivePlan"].ToString();
            Contactmethod.Text = sle_Actives.Rows[0]["Contactmethod"].ToString();
            Cutofftime.Text = sle_Actives.Rows[0]["Cutofftime"].ToString();
            CreaTime.Text = sle_Actives.Rows[0]["CreaTime"].ToString();
            UserName.Text = sle_Actives.Rows[0]["UserName"].ToString();
        }
    }

    protected void Button1_Click(object sender, EventArgs e)
    {
        Response.Redirect("discussacti_list.aspx");
    }
}
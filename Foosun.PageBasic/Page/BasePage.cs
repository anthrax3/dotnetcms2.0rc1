using System;
using System.Web;
using System.Web.UI;
using System.Web.UI.HtmlControls;
using Foosun.CMS;
using Foosun.Config;
using Foosun.Model;

namespace Foosun.PageBasic
{
	public class BasePage : System.Web.UI.Page {
		protected readonly int PAGESIZE = Config.UIConfig.GetPageSize();
		protected internal UserLogin _UserLogin;
		protected internal string CopyRight = "(c)2002-2013 Foosun Inc. By " + Foosun.Config.verConfig.Productversion;
		protected void AddStyleSheet(Page page, string cssPath) {
			HtmlLink link = new HtmlLink();
			link.Href = cssPath;
			link.Attributes["rel"] = "stylesheet";
			link.Attributes["type"] = "text/css";
		}

		public BasePage() {
			_UserLogin = new UserLogin();
		}

		protected void PageRight(string rightMsg, string url) {
			PageRight(rightMsg, url, false, false);
		}


		protected void PageRight(string rightMsg, string url, bool noHistory) {
			PageRight(rightMsg, url, false, noHistory);
		}
		protected void PageRight(string errMsg, string url, bool retrunurl, bool noHistory) {
			WebHint.ShowRight(errMsg, url, retrunurl, noHistory);
		}

		protected void PageError(string errMsg, string url) {
			PageError(errMsg, url, false);
		}

		protected void PageError(string errMsg, string url, bool retrunurl) {
			WebHint.ShowError(errMsg, url, retrunurl);
		}

		/// <summary>
		/// �˳�
		/// </summary>
		protected virtual void Logout() {
			//�õ��û�����
			HttpCookie cook = HttpContext.Current.Request.Cookies["SITEINFO"];
			if (cook != null) {
				//�����û���cookieΪ����
				cook.Expires = DateTime.Now.AddDays(-1);
				cook.Value = null;
				Response.Cookies.Add(cook);
			}
		}
		/// <summary>
		/// ִ��һ��JS���
		/// </summary>
		/// <param name="sentence">Ҫִ�е����</param>
		protected void ExecuteJs(string sentence) {
			Context.Response.Write("<script language=\"javascript\" type=\"text/javascript\">");
			Context.Response.Write(sentence);
			Context.Response.Write("</script>");
		}
		/// <summary>
		/// ����û���Ϣ�Ự�Ƿ�ʱ
		/// </summary>
		/// <returns></returns>
		protected bool Validate_Session() {
			return !Foosun.Global.Current.IsTimeout();
		}

		protected void LoginResultShow(EnumLoginState state) {
			string dimm = Foosun.Config.UIConfig.dirDumm.Trim();
			if (dimm != string.Empty) {
				dimm = "/" + dimm;
			}
			string ErrorMsg = string.Empty;
			int isAdminReturn = 0;
			switch (state) {
				case EnumLoginState.Err_IPLimited:
					ErrorMsg = "��IP[" + Common.Computer.GetIP() + "]�����ƣ����ܵ�½!";
					isAdminReturn = 2;
					break;
				case EnumLoginState.Err_Locked:
					ErrorMsg = "���Ѿ�������!";
					isAdminReturn = 2;
					break;
				case EnumLoginState.Err_AdminLogined:
                    Response.Write("<script language=\"javascript\">window.parent.location.href=\"" + dimm + "/" + Foosun.Config.UIConfig.dirMana + "/login.aspx?urls=" + Request.Url + "\";</script>");
					Response.End();
					break;
				case EnumLoginState.Err_UnEmail:
					ErrorMsg = "����ûͨ�������ʼ�������ܵ�½��ϵͳ!";
					isAdminReturn = 0;
					break;
				case EnumLoginState.Err_TimeOut:
                    Response.Write("<script language=\"javascript\">window.parent.location.href=\"" + dimm + "/" + Foosun.Config.UIConfig.dirUser + "/login.aspx?urls=" + Request.Url + "\";</script>");
					Response.End();
					break;
				case EnumLoginState.Err_AdminTimeOut:
                    Response.Write("<script language=\"javascript\">window.parent.location.href=\"" + dimm + "/" + Foosun.Config.UIConfig.dirMana + "/login.aspx?urls=" + Request.Url + "\";</script>");
					Response.End();
					break;
				case EnumLoginState.Err_UnMobile:
					ErrorMsg = "����ûͨ���ֻ���֤�����ܵ�½��ϵͳ!<li><a href=\"" + dimm + "/" + UIConfig.dirUser + "info/MobileValidate.aspx?uid=" + Global.Current.UserName + "\"><font color=\"Blue\">����˴���֤�����ֻ�</font></li>";
					isAdminReturn = 0;
					break;
				case EnumLoginState.Err_UnCert:
					ErrorMsg = "<script language=\"javascript\" type=\"text/javascript\">alert('����û��֤���ϣ�\\n�� [ȷ��] ����ʵ����֤��');top.location.href='" + dimm + "/" + UIConfig.dirUser + "/info/userinfo_idcard.aspx?type=CreatCert\';</script>";
					isAdminReturn = 0;
					break;
				case EnumLoginState.Err_NoAuthority:
					ErrorMsg = "��û�д���Ĳ���Ȩ��!";
					isAdminReturn = 1;
					break;
				case EnumLoginState.Err_AdminLocked:
					ErrorMsg = "���ѱ�����";
					isAdminReturn = 1;
					break;
				case EnumLoginState.Err_DbException:
					ErrorMsg = "ϵͳ����<li><span style=\"color:red\">����ԭ��</span></li><li>�����ݿ��������ͨ��ʧ�ܡ�</li><li>���ݿ������ַ�������ȷ��</li><li>���ݿⷢ���쳣��</li>";
					isAdminReturn = 2;
					break;
				case EnumLoginState.Err_UserNumInexistent:
					ErrorMsg = "�û�������";
					isAdminReturn = 2;
					break;
				case EnumLoginState.Err_AdminNumInexistent:
					ErrorMsg = "Ȩ�޲��㣡";
					isAdminReturn = 1;
					break;
				case EnumLoginState.Err_DurativeLogError:
					ErrorMsg = "���������½�����Ѿ�������,��" + _UserLogin.GetLoginSpan() + "���Ӻ��ٵ�¼!";
					isAdminReturn = 0;
					break;
				case EnumLoginState.Err_NameOrPwdError:
					ErrorMsg = "�û��������ڻ����������";
					isAdminReturn = 2;
					break;
				case EnumLoginState.Err_GroupExpire:
					ErrorMsg = "�����ʺ��ѹ���";
					isAdminReturn = 0;
					break;
				case EnumLoginState.Err_NotAdmin:
					ErrorMsg = "��Ǹ�������ǹ���Ա�����Ĳ����Ѿ���¼��<li>����IP��[" + Common.Computer.GetIP() + "]�ѱ���¼</li>";
					isAdminReturn = 1;
					break;
				case EnumLoginState.Succeed:
					return;
				default:
					ErrorMsg = "�쳣����" + state.ToString();
					isAdminReturn = 2;
					break;
			}
			string Returnurl = string.Empty;
			switch (isAdminReturn) {
				case 0:
					Returnurl = dimm + "/" + Foosun.Config.UIConfig.dirUser + "/login.aspx?urls=" + Request.Url;
					break;
				case 1:
					if (state == EnumLoginState.Err_NoAuthority) {
						Returnurl = dimm + "/" + Foosun.Config.UIConfig.dirMana + "/main.aspx";
					}
					else {
                        Returnurl = dimm + "/" + Foosun.Config.UIConfig.dirMana + "/login.aspx?urls=" + Request.Url;
					}
					break;
				default:
					Returnurl = dimm + "/";
					break;
			}
            if (state == EnumLoginState.Err_NameOrPwdError ||state== EnumLoginState.Err_DbException)
            {
                Common.MessageBox.Show(this, ErrorMsg, "����", "");
            }
            else
            {                
                PageError(ErrorMsg, Returnurl, true);
            }
		}
		protected void CheckUserLogin() {
			if (!Validate_Session())
				LoginResultShow(EnumLoginState.Err_TimeOut);
			else
				LoginResultShow(CheckUserLogin(Foosun.Global.Current.UserNum, false));
		}
		protected void CheckUserLoginCert() {
			if (!Validate_Session())
				LoginResultShow(EnumLoginState.Err_TimeOut);
			else
				LoginResultShow(CheckUserLogin(Foosun.Global.Current.UserNum, true));
		}
		protected void CheckAdminLogin() {
			if (!Validate_Session())
				LoginResultShow(EnumLoginState.Err_AdminTimeOut);
			else
				LoginResultShow(CheckAdminLogin(Foosun.Global.Current.UserNum));
		}
		/// <summary>
		/// �����ͨ��Ա��¼״̬
		/// </summary>
		/// <param name="UserNum"></param>
		/// <param name="IsCert"></param>
		/// <param name="LimitedIP"></param>
		/// <returns></returns>
		private EnumLoginState CheckUserLogin(string UserNum, bool IsCert) {
			return _UserLogin.CheckUserLogin(UserNum, IsCert);
		}
		/// <summary>
		/// ������Ա��¼״̬
		/// </summary>
		/// <param name="UserNum"></param>
		/// <param name="LimitedIP"></param>
		/// <returns></returns>
		private EnumLoginState CheckAdminLogin(string UserNum) {
			return _UserLogin.CheckAdminLogin(UserNum);
		}
		/// <summary>
		/// �û���¼
		/// </summary>
		/// <param name="UserName"></param>
		/// <param name="Password"></param>
		/// <param name="info"></param>
		/// <param name="IsAdmin"></param>
		/// <returns></returns>
		protected EnumLoginState Login(string UserName, string Password, out GlobalUserInfo info, bool IsAdmin) {
			if (IsAdmin)
				return _UserLogin.AdminLogin(UserName, Password, out info);
			else
				return _UserLogin.PersonLogin(UserName, Password, out info);

		}
		/// <summary>
		/// �����û���¼
		/// </summary>
		/// <param name="UserName"></param>
		/// <param name="Password"></param>
		/// <param name="info"></param>
		/// <returns></returns>
		protected EnumLoginState Login(string UserName, string Password, out GlobalUserInfo info) {
			return _UserLogin.PersonLogin(UserName, Password, out info);
		}
		/// <summary>
		/// �����û���¼
		/// </summary>
		/// <param name="UserName"></param>
		/// <param name="Password"></param>
		protected void Login(string UserName, string Password) {
			GlobalUserInfo info;
			EnumLoginState state = _UserLogin.PersonLogin(UserName, Password, out info);
			if (state == EnumLoginState.Succeed)
				Global.Current.Set(info);
			else
				LoginResultShow(state);
		}
	}
}

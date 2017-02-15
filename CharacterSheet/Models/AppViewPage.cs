using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Web;
using System.Web.Mvc;

namespace CharacterSheet.Models
{
    public abstract class AppViewPage<TModel> : WebViewPage<TModel>
    {
        protected AppUserPrincipal CurrentUser => new AppUserPrincipal(User as ClaimsPrincipal);
    }

    public abstract class AppViewPage : AppViewPage<dynamic>
    {
    }





}
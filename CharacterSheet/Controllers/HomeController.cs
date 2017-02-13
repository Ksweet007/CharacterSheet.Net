using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Web.Mvc;

namespace CharacterSheet.Controllers
{
    public class HomeController : BaseController
    {
        public ActionResult Index()
        {
            return View();
        }

        protected override void OnException(ExceptionContext context)
        {
            context.ExceptionHandled = true;
            context.Result = View("ServerError");
            base.OnException(context);
            context.HttpContext.Response.TrySkipIisCustomErrors = true;
        }
    }
}

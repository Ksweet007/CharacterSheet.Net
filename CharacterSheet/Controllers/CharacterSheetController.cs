using System.Web.Mvc;
using CharacterSheet.Controllers.Api;

namespace CharacterSheet.Controllers
{
    [Authorize]
    public class CharacterSheetController : BaseController
    {
        public ActionResult Index()
        {
            return View();
            //return Redirect( Url.Content( "~/index.htm" ) );
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
using System.Web.Mvc;

namespace CharacterSheet.Controllers
{
    public class CharacterSheetController : Controller
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
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CharacterSheet.Controllers
{
    public class CharacterSheetController : Controller
    {

        public ActionResult Index()
        {

            return Redirect( Url.Content( "~/index.htm" ) );
        }
    }
}
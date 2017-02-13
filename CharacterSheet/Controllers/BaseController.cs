using System.Security.Claims;
using System.Web.Mvc;
using CharacterSheet.Models;

namespace CharacterSheet.Controllers
{
    public abstract class BaseController : Controller
    {
        public AppUserPrincipal CurrentUser => new AppUserPrincipal(User as ClaimsPrincipal);
    }


}
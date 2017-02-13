using System.Security.Claims;
using System.Web.Http;
using CharacterSheet.Models;

namespace CharacterSheet.Controllers.Api
{
    public class BaseApiController : ApiController
    {
        public BaseApiController()
        {
            
        }

        public AppUserPrincipal CurrentUser => new AppUserPrincipal(User as ClaimsPrincipal);
    }
}
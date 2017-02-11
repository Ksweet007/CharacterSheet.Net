using System.Security.Claims;

namespace CharacterSheet.Models
{
    public class AppUserPrincipal : ClaimsPrincipal
    {
        public AppUserPrincipal(ClaimsPrincipal principal)
            : base(principal)
        {
        }

        public string Name => FindFirst(ClaimTypes.Name).Value;
    }
}
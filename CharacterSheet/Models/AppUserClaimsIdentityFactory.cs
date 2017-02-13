using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity;

namespace CharacterSheet.Models
{
    public class AppUserClaimsIdentityFactory : ClaimsIdentityFactory<AppUser, string>
    {
        public override async Task<ClaimsIdentity> CreateAsync (UserManager<AppUser,string> manager,
            AppUser user,string authenticationType)
        {
            var identity = await base.CreateAsync(manager, user, authenticationType);
            
            return identity;
        }
    }
}
using Microsoft.AspNet.Identity.EntityFramework;

namespace CharacterSheet.Models
{
    public class AppUserDbContext : IdentityDbContext<AppUser>
    {
        public AppUserDbContext()
            : base("Users")
        {
        }

        
    }
}
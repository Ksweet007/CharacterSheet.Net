using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.Identity.EntityFramework;

namespace CharacterSheet.Models
{
    public class AppUser : IdentityUser
    {
        public string Country { get; set; }
        public int Age { get; set; }
    }
}
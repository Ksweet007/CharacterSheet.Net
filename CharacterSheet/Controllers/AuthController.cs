using System;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using CharacterSheet.Models;
using Microsoft.AspNet.Identity;
using Microsoft.Owin.Security;

namespace CharacterSheet.Controllers
{
    [AllowAnonymous]
    public class AuthController : BaseController
    {
        private readonly UserManager<AppUser> userManager;

        public AuthController()
            : this(Startup.UserManagerFactory.Invoke())
        {   
        }
        
        public AuthController(UserManager<AppUser> userManager)
        {
            this.userManager = userManager;
        }

        [HttpGet]
        public ActionResult Login(string returnUrl)
        {
            var model = new LogInModel
            {
                ReturnUrl = returnUrl
            };

            return View(model);
        }

        [HttpPost]
        public async Task<ActionResult> Login(LogInModel model)
        {
            if (!ModelState.IsValid)
            {
                return View();
            }

            var user = await userManager.FindAsync(model.UserName, model.Password);

            if (user != null)
            {
                await SignIn(user);
                return RedirectToAction("index", "CharacterSheet");
            }
            
            //User Auth failed
            ModelState.AddModelError("", "Invalid Email or Password");
            return View();

        }

        public ActionResult LogOut()
        {
            GetAuthenticationManager().SignOut(DefaultAuthenticationTypes.ApplicationCookie);
            return RedirectToAction("index", "CharacterSheet");
        }

        [HttpGet]
        public ActionResult Register()
        {
            return View();
        }
        
        [HttpPost]
        public async Task<ActionResult> Register(RegisterModel model)
        {
            if (!ModelState.IsValid)
            {
                return View();
            }

            var user = new AppUser
            {
                UserName = model.UserName,
                Email = model.Email
            };

            var result = await userManager.CreateAsync(user, model.Password);

            var userRole = await userManager.AddToRoleAsync(user.Id, "User");

            if (result.Succeeded)
            {
                await SignIn(user);
                return RedirectToAction("index", "CharacterSheet");
            }

            foreach (var error in result.Errors)
            {
                ModelState.AddModelError("", error);
            }

            return View();
        }

        private string GetRedirectUrl(string returnUrl)
        {
            if (string.IsNullOrEmpty(returnUrl) || !Url.IsLocalUrl(returnUrl))
            {
                return Url.Action("Index", "CharacterSheet");
            }

            return returnUrl;
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                userManager?.Dispose();
            }
            base.Dispose(disposing);
        }

        private async Task SignIn(AppUser user)
        {
            var identity = await userManager.CreateIdentityAsync(user, DefaultAuthenticationTypes.ApplicationCookie);
            
            GetAuthenticationManager().SignIn(identity);
        }

        private IAuthenticationManager GetAuthenticationManager()
        {
            var ctx = Request.GetOwinContext();
            return ctx.Authentication;
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
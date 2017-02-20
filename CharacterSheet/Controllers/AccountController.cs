//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Threading.Tasks;
//using System.Web;
//using System.Web.Mvc;
//using CharacterSheet.Models;
//using Microsoft.AspNet.Identity;
//using Microsoft.AspNet.Identity.Owin;

//namespace CharacterSheet.Controllers
//{
//    [AllowAnonymous]
//    public class AccountController : BaseController
//    {
//        private readonly UserManager<AppUser> userManager;

//        public AccountController()
//            : this(Startup.UserManagerFactory.Invoke())
//        {
//        }

//        public AccountController(UserManager<AppUser> userManager)
//        {
//            this.userManager = userManager;
//        }


//        public ActionResult ForgotPassword()
//        {
//            return View();
//        }

//        [HttpPost]
//        [ValidateAntiForgeryToken]
//        public async Task<ActionResult> ForgotPassword(ForgotPasswordViewModel model)
//        {
//            if (ModelState.IsValid)
//            {
//                var user = await userManager.FindByNameAsync(model.Email);
//                if (user == null || !(await userManager.IsEmailConfirmedAsync(user.Id)))
//                {
//                    // Don't reveal that the user does not exist or is not confirmed
//                    return View("ForgotPasswordConfirmation");
//                }
                
//                // Send an email with this link
//                // string code = await UserManager.GeneratePasswordResetTokenAsync(user.Id);
//                // var callbackUrl = Url.Action("ResetPassword", "Account", new { userId = user.Id, code = code }, protocol: Request.Url.Scheme);		
//                // await UserManager.SendEmailAsync(user.Id, "Reset Password", "Please reset your password by clicking <a href=\"" + callbackUrl + "\">here</a>");
//                // return RedirectToAction("ForgotPasswordConfirmation", "Account");
//            }

//            // If we got this far, something failed, redisplay form
//            return View(model);
//        }

//        public ActionResult ForgotPasswordConfirmation()
//        {
//            return View();
//        }

//        public ActionResult ResetPassword(string code)
//        {
//            return code == null ? View("Error") : View();
//        }

//        [HttpPost]       
//        [ValidateAntiForgeryToken]
//        public async Task<ActionResult> ResetPassword(ResetPasswordViewModel model)
//        {
//            if (!ModelState.IsValid)
//            {
//                return View(model);
//            }
//            var user = await userManager.FindByNameAsync(model.Email);
//            if (user == null)
//            {
//                // Don't reveal that the user does not exist
//                return RedirectToAction("ResetPasswordConfirmation", "Account");
//            }
//            var result = await UserManager.ResetPasswordAsync(user.Id, model.Code, model.Password);
//            if (result.Succeeded)
//            {
//                return RedirectToAction("ResetPasswordConfirmation", "Account");
//            }
//            AddErrors(result);
//            return View();
//        }
        
//        [AllowAnonymous]
//        public ActionResult ResetPasswordConfirmation()
//        {
//            return View();
//        }

//        [AllowAnonymous]
//        public async Task<ActionResult> SendCode(string returnUrl, bool rememberMe)
//        {
//            var userId = await SignInManager.GetVerifiedUserIdAsync();
//            if (userId == null)
//            {
//                return View("Error");
//            }
//            var userFactors = await userManager.GetValidTwoFactorProvidersAsync(userId);
//            var factorOptions = userFactors.Select(purpose => new SelectListItem { Text = purpose, Value = purpose }).ToList();
//            return View(new SendCodeViewModel { Providers = factorOptions, ReturnUrl = returnUrl, RememberMe = rememberMe });
//        }

//        //
//        // POST: /Account/SendCode
//        [HttpPost]
//        [AllowAnonymous]
//        [ValidateAntiForgeryToken]
//        public async Task<ActionResult> SendCode(SendCodeViewModel model)
//        {
//            if (!ModelState.IsValid)
//            {
//                return View();
//            }

//            // Generate the token and send it
//            if (!await SignInManager.SendTwoFactorCodeAsync(model.SelectedProvider))
//            {
//                return View("Error");
//            }
//            return RedirectToAction("VerifyCode", new { Provider = model.SelectedProvider, ReturnUrl = model.ReturnUrl, RememberMe = model.RememberMe });
//        }


//        private void AddErrors(IdentityResult result)
//        {
//            foreach (var error in result.Errors)
//            {
//                ModelState.AddModelError("", error);
//            }
//        }
//    }
//}
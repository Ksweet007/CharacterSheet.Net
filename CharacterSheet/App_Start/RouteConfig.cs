using System.Web.Mvc;
using System.Web.Routing;

namespace CharacterSheet
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            //routes.MapRoute(
            //    name: "Default",
            //    url: "{controller}/{action}/{id}",
            //    defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional }
            //);

            routes.MapRoute(
                name: "LogOut",
                url: "auth/{action}",
                defaults: new { controller = "Auth", action = "index" }
            );

            //routes.MapRoute(
            //    name: "LogOut",
            //    url: "auth/logout",
            //    defaults: new { controller = "Auth", action = "logout" }
            //);

            //routes.MapRoute(
            //    name: "LogIn",
            //    url: "auth/login",
            //    defaults: new { controller = "Auth", action = "login" }
            //);

            //routes.MapRoute(
            //    name: "Register",
            //    url: "auth/register",
            //    defaults: new { controller = "Auth", action = "login" }
            //);

            routes.MapRoute(
                name: "EmptyDefault",
                url: "",
                defaults: new { controller = "CharacterSheet", action = "index" }
            );
        }
    }
}

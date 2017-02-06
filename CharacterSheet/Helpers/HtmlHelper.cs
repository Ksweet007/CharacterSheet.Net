using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Newtonsoft.Json;

namespace CharacterSheet.Helpers
{
    public class HtmlHelper
    {
        public static MvcHtmlString ToJson(object obj)
        {
            return new MvcHtmlString(JsonConvert.SerializeObject(obj));
        }
    }
}
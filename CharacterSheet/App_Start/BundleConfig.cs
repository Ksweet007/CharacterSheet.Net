﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Optimization;

namespace CharacterSheet
{
    internal static class BundleConfig
    {
        private class BundleConfigOrderer : IBundleOrderer
        {
            IEnumerable<BundleFile> IBundleOrderer.OrderFiles(BundleContext context, IEnumerable<BundleFile> files)
            {
                return files;
            }
        }

        internal static void RegisterBundles(BundleCollection bundles)
        {
            var minifyJs = Convert.ToBoolean(System.Configuration.ConfigurationManager.AppSettings["MinifyJs"] ?? "true");
            var vendorBundle = new ScriptBundle("~/scripts/vendor")                
                //.Include("~/assets/js/jquery.js")
                .Include("~/assets/js/jquery-1.12.2.min.js")
                .Include("~/assets/js/bootstrap.js")
                .Include("~/lib/propeller/js/propeller.js");
                

            if (!minifyJs)
            {
                vendorBundle.Transforms.Clear(); //disables minification
            }
            vendorBundle.Orderer = new BundleConfigOrderer();
            bundles.Add(vendorBundle);

            var vendorBundleTwo = new ScriptBundle("~/scripts/vendortwo")
                .Include("~/lib/knockout/knockout-3.4.0.js")                
                .Include("~/lib/knockout/knockout-es5.js")
                .Include("~/lib/knockout/knockout.punches.js")
                .Include("~/lib/knockout/ko.plus.js")
                .Include("~/lib/knockout/knockout.reactor.js")
                .Include("~/lib/knockout/knockout.mapping.js")                
                .Include("~/lib/fuse.js")
                .Include("~/assets/js/wNumb.js")
                .Include("~/assets/js/nouislider.js");


            if (!minifyJs)
            {
                vendorBundleTwo.Transforms.Clear(); //disables minification
            }
            vendorBundleTwo.Orderer = new BundleConfigOrderer();
            bundles.Add(vendorBundleTwo);

            var styleBundle = new StyleBundle("~/content/css")
                .Include("~/lib/font-awesome/css/font-awesome.css")
                .Include("~/assets/css/bootstrap.css")
                .Include("~/assets/css/propeller.css")
                .Include("~/themes/css/propeller-theme.css")
                .Include("~/assets/css/sidebar.css");

                styleBundle.Orderer = new BundleConfigOrderer();
                bundles.Add(styleBundle);


        }
    }
}

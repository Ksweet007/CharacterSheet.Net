define(['plugins/router', 'durandal/app', '_custom/deferred', '_custom/services/WebAPI'], function (router, app, deferred, charajax) {
  var self = this;
  self.isAdmin = ko.observable(false);

    return {
        router: router,
        activate: function (foo) {

            return charajax.universal('api/IsAdmin', '', 'GET').done(function (result) {
                var res = result;
                if (res) {
                    self.isAdmin(true);
                    router.map([
                    {route: '', title: 'Class List', moduleId: 'landingpage/landingpage', nav: false},
                    {route: 'admin*details', title: 'Admin', moduleId: 'admin/admin', nav: true, hash: "#admin", adminLink:true},
                    {route: 'home', title: 'Home', moduleId: 'landingpage/landingpage', nav: true, hash: "#home"},
                    {route: 'classlist', title: 'Class List', moduleId: 'selectclass/selectclass', nav: true},
                    {route: 'classdetails/:id', title: 'Class Details', moduleId: 'classdetails/classdetails', nav: false, hash: '#classdetails'},
                    {route: 'manageclass/:id*details', title: 'Manage Class', moduleId: 'manageclass/manageclass', nav: false, hash: '#manageclass/:id'},
                    {route: 'logout', title: 'Logout', moduleId: 'logout/logout', nav: false}
                    ]).buildNavigationModel();
                }
                else {
                    router.map([
                     {route: '', title: 'Class List', moduleId: 'landingpage/landingpage', nav: false},
                     {route: 'home', title: 'Home', moduleId: 'landingpage/landingpage', nav: true, hash: "#home"},
                     {route: 'classlist', title: 'Class List', moduleId: 'selectclass/selectclass', nav: true},
                     {route: 'classdetails/:id', title: 'Class Details', moduleId: 'classdetails/classdetails', nav: false, hash: '#classdetails'},
                     {route: 'manageclass/:id*details', title: 'Manage Class', moduleId: 'manageclass/manageclass', nav: false, hash: '#manageclass/:id'},
                     {route: 'logout', title: 'Logout', moduleId: 'logout/logout', nav: false}
                    ]).buildNavigationModel();
                }

                return router.activate();

            });

        },
        canDeactivate: function (arg) {
            var foo = arg;
            return app.showMessage('Are you sure you want to leave this page?', 'Navigate', ['Yes', 'No']);
        }
    };
});

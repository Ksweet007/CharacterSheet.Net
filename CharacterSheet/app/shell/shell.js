define(['plugins/router', 'durandal/app', '_custom/deferred', '_custom/services/WebAPI'], function (router, app, deferred, charajax) {
  var self = this;
  self.isAdmin = ko.observable(false);

    return {
        router: router,
        activate: function (foo) {

            return charajax.universal('api/IsAdmin', '', 'GET').done(function (result) {
                var res = result;
                var routesToMap = [
                {route: '', title: 'Class List', moduleId: 'landingpage/landingpage', nav: false, adminLink:false},
                {route: 'logout', title: 'Logout', moduleId: 'logout/logout', nav: false, adminLink:false},
                {route: 'login', title: 'Login', moduleId: 'login/login', nav: false, adminLink:false},
                {route: 'home', title: 'Home', moduleId: 'landingpage/landingpage', nav: true, hash: "#home", adminLink:false},
                {route: 'classlist', title: 'Class List', moduleId: 'selectclass/selectclass', nav: true, adminLink:false},
                {route: 'classdetails/:id', title: 'Class Details', moduleId: 'classdetails/classdetails', nav: false, hash: '#classdetails', adminLink:false},
                {route: 'manageclass/:id*details', title: 'Manage Class', moduleId: 'manageclass/manageclass', nav: false, hash: '#manageclass/:id', adminLink:false}]

                if(res){
                    self.isAdmin(true);
                    routesToMap.push({route: 'admin*details', title: 'Admin', moduleId: 'admin/admin', nav: true, hash: "#admin", adminLink:true});
                }

                router.map(routesToMap).buildNavigationModel();
                return router.activate();
            });

        },
        canDeactivate: function (arg) {
            var foo = arg;
            return app.showMessage('Are you sure you want to leave this page?', 'Navigate', ['Yes', 'No']);
        }
    };
});

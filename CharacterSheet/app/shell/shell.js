define(function (require) {
    var _i = {
        ko: require('knockout'),
        $: require('jquery'),
        router: require('plugins/router'),
        charajax: require('_custom/services/WebAPI'),
        app: require('durandal/app'),
        deferred: require('_custom/deferred'),
        moment: require('moment')
    };

    return function () {
        var self = this;
        self.isAdmin = ko.observable(false);
        self.classList = ko.observableArray([]);

        self.lastSavedTime = _i.ko.observable('');
        self.sessionHasSaved = _i.ko.computed(function(){
          return self.lastSavedTime() !== '';
        });
        self.isSaving = _i.ko.observable(false);

        _i.app.on('view:saved').then(function () {
            var lastSaved = _i.moment().format('LTS');
            self.lastSavedTime(lastSaved);
        });

        self.getAdmin = function () {
            return _i.charajax.universal('api/IsAdmin', '', 'GET').done(function (response) {
                if (response) {
                    self.isAdmin(true);
                }
            });
        };

        self.getClassList = function () {
            var promise = _i.deferred.create();
            _i.charajax.getJSON('/api/GetClassList').done(function (response) {
                self.classList(response);
                promise.resolve();
            });
            return promise;
        };

        self.getNavData = function () {
            var deferred = _i.deferred.create();
            var promise = _i.deferred.waitForAll(self.getAdmin());

            promise.done(function () {
                self.getClassList().done(function () {
                    deferred.resolve();
                });

            });

            return deferred;
        };

        self.router = _i.router;

        self.activate = function (foo) {
            return self.getNavData().done(function (result) {
                var routesToMap = [
					{
					    route: '',
					    title: 'Home',
					    moduleId: 'home/home',
					    nav: false,
					    adminLink: false
					}, {
					    route: 'logout',
					    title: 'Logout',
					    moduleId: 'logout/logout',
					    nav: false,
					    adminLink: false
					}, {
					    route: 'login',
					    title: 'Login',
					    moduleId: 'login/login',
					    nav: false,
					    adminLink: false
					}, {
					    route: 'home',
					    title: 'Home',
					    moduleId: 'home/home',
					    nav: true,
					    hash: "#home",
					    adminLink: false
					}, {
					    route: 'classlist',
					    title: 'Class List',
					    moduleId: 'selectclass/selectclass',
					    nav: true,
					    adminLink: false
					}, {
					    route: 'skills',
					    title: 'Skill List',
					    moduleId: 'skills/skills',
					    nav: true,
					    adminLink: false
					},
           {
					    route: 'classdetails/:id',
					    title: 'Class Details',
					    moduleId: 'classdetails/classdetails',
					    nav: false,
					    hash: '#classdetails',
					    adminLink: false
					}]

              if (self.isAdmin()) {
                  routesToMap.push({
                      route: 'adminfeatures',
                      title: 'Features',
                      moduleId: 'adminfeatures/adminfeatures',
                      nav: true,
                      hash: "#adminfeatures",
                      adminLink: true
                  });
              }

                self.router.map(routesToMap).buildNavigationModel();
                return self.router.activate();
            });
        };

    };
});

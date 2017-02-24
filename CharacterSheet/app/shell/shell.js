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
        // self.classList = ko.observableArray([]);

        self.getAdmin = function () {
            return _i.charajax.universal('api/IsAdmin', '', 'GET').done(function (response) {
                if (response) {
                    self.isAdmin(true);
                }
            });
        };

        // self.getClassList = function () {
        //     var promise = _i.deferred.create();
        //     _i.charajax.getJSON('/api/GetClassList').done(function (response) {
        //         self.classList(response);
        //         promise.resolve();
        //     });
        //     return promise;
        // };

        self.getNavData = function () {
            var promise = _i.deferred.waitForAll(self.getAdmin());
			var deferred = _i.deferred.create();

            promise.done(function () {
                deferred.resolve();
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
					    linktype: 'user'
					}, {
					    route: 'home',
					    title: 'Home',
					    moduleId: 'home/home',
					    nav: true,
					    hash: "#home",
					    linktype: 'user'
					}, {
					    route: 'classlist',
					    title: 'Class List',
					    moduleId: 'selectclass/selectclass',
					    nav: true,
					    linktype: 'class'
					},{
					    route: 'armor',
					    title: 'Armor',
					    moduleId: 'armor/armor',
					    nav: true,
					    hash: '#armor',
					    linktype: 'equipment'
					},{
					    route: 'weapon',
					    title: 'Weapon',
					    moduleId: 'weapon/weapon',
					    nav: true,
					    hash: '#weapon',
					    linktype: 'equipment'
					},{
					    route: 'skills',
					    title: 'Skill List',
					    moduleId: 'skills/skills',
					    nav: true,
					    linktype: 'general'
					},{
					    route: 'classdetails/:id',
					    title: 'Class Details',
					    moduleId: 'classdetails/classdetails',
					    nav: false,
					    hash: '#classdetails',
					    linktype: ''
					}]

              if (self.isAdmin()) {
                  routesToMap.push({
                      route: 'adminfeatures',
                      title: 'Features',
                      moduleId: 'adminfeatures/adminfeatures',
                      nav: true,
                      hash: "#adminfeatures",
                      linktype: 'admin'
                  });
              }

                self.router.map(routesToMap).buildNavigationModel();
                return self.router.activate();
            });
        };

    };
});

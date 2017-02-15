define(function (require) {
    var _i = {
        ko: require('knockout'),
        $: require('jquery'),
        search: require('_custom/services/search'),
        charajax: require('_custom/services/WebAPI'),
        app: require('durandal/app'),
        list: require('_custom/services/listmanager'),
        deferred: require('_custom/deferred'),
        router: require('plugins/router'),
        system: require('durandal/system')
    };

    return function () {
        var self = this;
        self.displayName = "Choose your path";
        self.classList = _i.ko.observableArray([]);

        self.router = _i.router.createChildRouter().makeRelative({ moduleId: 'admin', fromParent: true })
            .map([
                { route: ['', 'landing'], moduleId: 'landing/landing', title: 'Admin Landing', type: 'global', nav: false },
                { route: 'proficiency', moduleId: 'proficiency/proficiency', title: 'Proficiencies', type: 'global', nav: true },
                { route: 'skills', moduleId: 'skills/skills', title: 'Skills', type: 'global', nav: true },
                { route: 'features', moduleId: 'features/features', title: 'Features', type: 'global', nav: true }
            ]).buildNavigationModel();

        self.globaladmin = _i.ko.computed(function () {
            return _i.ko.utils.arrayFilter(self.router.navigationModel(), function (route) {
                return route.type === 'global';
            });
        });

        self.classadmin = _i.ko.computed(function () {
            return _i.ko.utils.arrayFilter(self.router.navigationModel(), function (route) {
                return route.type === 'class';
            });
        });

        self.activate = function () {
            return _i.charajax.getJSON('/api/GetClassList').done(function (response) {
                self.data = response;
                self.classList(response);
            });
        };
    };


});

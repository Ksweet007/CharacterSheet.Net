define(function(require) {
	var _i = {
		ko: require('knockout'),
		$: require('jquery'),
		router: require('plugins/router'),
		charajax: require('_custom/services/WebAPI'),
		app: require('durandal/app'),
		deferred: require('_custom/deferred')
	};

	return function() {
		var self = this;
		self.isAdmin = ko.observable(false);
		self.classList = ko.observableArray([]);

		self.getAdmin = function() {
			var promise = _i.deferred.create();
			return _i.charajax.universal('api/IsAdmin', '', 'GET').done(function(response) {
				if (response) {
					self.isAdmin(true);
				}
			});
			return promise;
		};

		self.getClassList = function() {
			var promise = _i.deferred.create();
			_i.charajax.getJSON('/api/GetClassList').done(function(response) {
				self.classList(response);
				promise.resolve();
			});
			return promise;
		};

		self.getNavData = function() {
			var deferred = _i.deferred.create();
			var promise = _i.deferred.waitForAll(self.getAdmin());

			promise.done(function() {
				self.getClassList().done(function() {
					deferred.resolve();
				});

			});

			return deferred;
		};

		self.router = _i.router;

		self.activate = function(foo) {
			return self.getNavData().done(function(result) {
				var routesToMap = [
					{route: '',title: 'Class List',moduleId: 'landingpage/landingpage',nav: false,adminLink: false},
                    {route: 'logout',title: 'Logout',moduleId: 'logout/logout',nav: false,adminLink: false},
                    {route: 'login',title: 'Login',moduleId: 'login/login',nav: false,adminLink: false},
                    {route: 'home',title: 'Home',moduleId: 'landingpage/landingpage',nav: true,hash: "#home",adminLink: false},
                    {route: 'classlist',title: 'Class List',moduleId: 'selectclass/selectclass',nav: true,adminLink: false},
                    {route: 'classdetails/:id',title: 'Class Details',moduleId: 'classdetails/classdetails',nav: false,hash: '#classdetails',adminLink: false},
                    {route: 'manageclass/:id*details',title: 'Manage Class',moduleId: 'manageclass/manageclass',nav: false,hash: '#manageclass/:id',adminLink: false}]

				if (self.isAdmin()) {					
					routesToMap.push({route: 'adminfeatures',title: 'Features',moduleId: 'adminfeatures/adminfeatures',nav: true,hash: "#adminfeatures",adminLink: true});
				}

				self.router.map(routesToMap).buildNavigationModel();
				return self.router.activate();
			});
		}

		self.canDeactivate = function(arg) {
			var foo = arg;
			return _i.app.showMessage('Are you sure you want to leave this page?', 'Navigate', ['Yes', 'No']);
		}

	};
});

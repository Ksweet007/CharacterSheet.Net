define(function(require) {
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

	return function() {
		var self = this;

		self.router = _i.router
			.createChildRouter()
			.makeRelative({moduleId: 'admin', fromParent: true})
			.map([
        {	route: ['', 'landing'], 		moduleId: 'landing/landing',  title: 'Admin Landing',   nav: true }
			]).buildNavigationModel();

		self.displayName = "Choose your path";
		self.classList = _i.ko.observableArray([]);

		self.activate = function() {
			return _i.charajax.getJSON('/api/GetClassList').done(function(response) {
				self.data = response;
				self.classList(response);
			});
		};

	};
});

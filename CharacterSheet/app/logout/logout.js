define(function(require) {
	var _i = {
		ko: require('knockout'),
		$: require('jquery'),
		charajax: require('_custom/services/WebAPI'),
    auth: require('_custom/services/authentication')
	};

	return function() {
		var self = this;
		self.displayName = "Logout";

		self.activate = function() {
      _i.auth.removeAuthToken;
			return _i.charajax.post('/Account/LogOff',{});
		};

	};
});

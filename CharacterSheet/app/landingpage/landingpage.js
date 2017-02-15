define(function(require) {
	var _i = {
		ko: require('knockout'),
		$: require('jquery'),
		charajax: require('_custom/services/WebAPI')
	};

	return function() {
		var self = this;
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

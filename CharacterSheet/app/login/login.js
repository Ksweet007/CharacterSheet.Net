define(function(require) {
	var _i = {
		ko: require('knockout'),
		$: require('jquery'),
		charajax: require('_custom/services/WebAPI'),
        auth: require('_custom/services/authentication')
	};

	return function() {
		var self = this;

		self.activate = function() {
		    // return _i.charajax.post('/auth/logout', {}).done(function(){
			// 	location.href = '#';
			// });
		};

        self.login = function(obj,event){
            auth.login();
        };

	};
});

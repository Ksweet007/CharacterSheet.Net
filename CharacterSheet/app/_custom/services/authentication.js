define(function() {
	var _i = {
		$: require('jquery'),
		deferred: require('_custom/deferred')
	};

	function AuthCls() {};

  AuthCls.prototype.removeAuthToken = function() {
    sessionStorage.removeItem('accessToken');
    //location.href = '#classdetails/' + item.classId;
  };


return new AuthCls();


});

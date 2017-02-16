define(function() {
	var _i = {
		$: require('jquery'),
		deferred: require('_custom/deferred')
	};

	function AuthCls() {};

  AuthCls.prototype.login = function(username, password, returnUrl) {
    var data = {};
    data.UserName = username;
    data.Password = password;

    var token = _i.$('input[name="__RequestVerificationToken"]').val();

    _i.$.ajax({
        url: "",
        // url: "/Auth/Login",
        method: "POST",
        data: {
            model: data,
            __RequestVerificationToken: token,
            returnUrl:""
        },
        success: function () {
            alert("success");
        },
        error: function(){
            alert("fail");
        }
    })
  };

return new AuthCls();


});

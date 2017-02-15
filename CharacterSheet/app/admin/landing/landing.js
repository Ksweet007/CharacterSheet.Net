define(function (require) {
  var _i ={
    ko: require('knockout'),
    $: require('jquery'),
    charajax: require('_custom/services/WebAPI')
  }


return function(){
    var self = this;
    self.username = _i.ko.observable('');

    self.activate = function() {
      return _i.charajax.universal('api/GetUserName', '', 'GET').done(function(result) {
        self.username = result;

      });
    };



  };

});

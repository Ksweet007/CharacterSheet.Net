﻿define(function (require) {
  var _i = {
      ko: require('knockout'),
  };
    var NavAway = function() {
      var self = this;

    };

    NavAway.prototype.saveContinue = function() {
        _i.dialog.close(this, 'save');
    };

    NavAway.prototype.nosaveContinue = function() {
        _i.dialog.close(this, 'continue');
    };

    NavAway.prototype.cancel = function() {
        _i.dialog.close(this, 'cancel');
    };

    NavAway.show = function(){
        return _i.dialog.show(new NavAway());
    };

    return NavAway;
});
define(function (require) {
  var _i = {
      ko: require('knockout'),
      dialog: require('plugins/dialog')
  };
    var CustomModal = function() {
    };

    CustomModal.prototype.saveContinue = function() {
        _i.dialog.close(this, 'save');
    };

    CustomModal.prototype.nosaveContinue = function() {
        _i.dialog.close(this, 'continue');
    };

    CustomModal.prototype.cancel = function() {
        _i.dialog.close(this, 'cancel');
    };

    CustomModal.show = function(){
        return _i.dialog.show(new CustomModal());
    };

    return CustomModal;
});

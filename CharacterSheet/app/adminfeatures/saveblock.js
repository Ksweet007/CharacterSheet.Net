define(function (require) {
  var _i = {
      ko: require('knockout'),
      dialog: require('plugins/dialog')
  };
    var CustomModal = function() {
        this.input = _i.ko.observable('');
    };

    CustomModal.prototype.ok = function() {
        _i.dialog.close(this, this.input());
    };

    CustomModal.prototype.canDeactivate = function () {
        return _i.dialog.showMessage('Are you sure that\'s your favorite color?', 'Just Checking...', ['Yes', 'No']);
    };

    CustomModal.show = function(){
        return _i.dialog.show(new CustomModal());
    };

    return CustomModal;
});

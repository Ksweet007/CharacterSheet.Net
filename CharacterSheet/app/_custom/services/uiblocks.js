define(function(require){
    var _i = {
		$: require('jquery'),
    ko: require('knockout'),
    dlg: require('plugins/dialog')
	};

    function UiBlocksCls() {};

    UiBlocksCls.prototype.showSaveNavModal = function(){
      $('#saveblock').show('toggle');
      //$('#myModal').modal('toggle')
      //$('#myModal').modal('hide')
      //$('#myModal').modal('handleUpdate')
    };

  return new UiBlocksCls();
});

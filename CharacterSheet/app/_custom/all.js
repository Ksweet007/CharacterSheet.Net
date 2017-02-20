define(function(require) {
	var _i = {
		ko: require('knockout')
	};

	require('./cls');

  require('./bindinghandlers/contentEditable');
  require('./bindinghandlers/dropdown');
  require('./bindinghandlers/fadeVisible');
  require('./bindinghandlers/htmlEditable');
  require('./bindinghandlers/rangeslider');
  require('./bindinghandlers/rippleeffect');
  require('./bindinghandlers/sidebarcollapse');
  require('./bindinghandlers/alert');

  require('./dialog/captureDialogKeyEvents');

  require('./events/captureKeyEvents');

  require('./koFunctions/changeTracker');

 
  _i.ko.components.register('nav-header', { require: './_custom/components/navheader/navheader' });

});

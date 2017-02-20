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
  
  require('./koFunctions/changeTracker');

});

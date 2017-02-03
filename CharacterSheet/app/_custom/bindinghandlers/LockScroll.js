define(function (require) {
    var _i = {
        $: require('jquery'),
        ko: require('knockout')
    };

    _i.ko.bindingHandlers.LockScroll = {
        init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
            require('domainmanipulations/LockScroll').runOnBindingHandler();
        }
    };
});

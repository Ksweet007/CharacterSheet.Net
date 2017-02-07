define(function(require) {
    var _i = {
        ko: require('knockout'),
        $: require('jquery'),
        search: require('_custom/services/search'),
        charajax: require('_custom/services/WebAPI'),
        app: require('durandal/app'),
        list: require('_custom/services/listmanager'),
        deferred: require('_custom/deferred'),
        system: require('durandal/system')
    };
    var firstVm = _i.ko.observable();

    var vm = {
        activate:activate,
        title:'First Tab',
        deactivate:deactivate,
        firstVm:firstVm,
    };

    return vm;

    function activate(id) {
        _i.system.log('First Tab Activated');
        return loadObservables(id);
    }

    function deactivate() {
        _i.system.log('First Tab Deactivated');
    }

    function loadObservables(id) {
        firstVm({ id:id, name:'First Tab Content' });
    }

});

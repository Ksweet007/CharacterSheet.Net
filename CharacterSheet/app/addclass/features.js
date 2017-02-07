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

    return function(){
        var self = this;
		self.firstVm = _i.ko.observable();
        self.data = null;
		self.classId = null;
		self.displayName = "Add Class";
		self.name = _i.ko.observable('');


        self.activate = function(id) {
            self.classId = id;
            return self.getClassData().done(function(response) {
                _i.system.log('First Tab Activated');
                 self.loadObservables(id);
            });
        }

        self.deactivate = function() {
            return _i.system.log('First Tab Deactivated');
        }

        self.loadObservables = function(id){
            self.firstVm({ id:id, name:'Features' });
        }

        self.getClassData = function() {
            var deferred = _i.deferred.create();
            _i.charajax.getJSON('api/GetSheetFields/' + self.classId).done(function(response) {
                self.classData = response;
                self.data = response;
                self.name = response.name;
                self.classId = response.classId;


                deferred.resolve();
            });

            return deferred;
        };


    };

});

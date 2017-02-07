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
		self.skills = _i.ko.observableArray([]);
		self.chosenSkills = _i.ko.observableArray([]);
		self.classSkills = _i.ko.observableArray([]);

        self.activate = function(id) {
            self.classId = id;
            return self.getClassData().done(function(response) {
                _i.system.log('First Tab Activated');
                 loadObservables(id);
            });
        }

        function deactivate() {
            _i.system.log('First Tab Deactivated');
        }

        function loadObservables(id){
            self.firstVm({ id:id, name:'First Tab Content' });
        }

        self.getClassData = function() {
            var deferred = _i.deferred.create();
            _i.charajax.getJSON('api/GetSheetFields/' + self.classId).done(function(response) {
                self.classData = response;
                self.data = response;
                self.name = response.name;
                self.classId = response.classId;
                if (response.ClassSkills.length > 0) {
                    self.skills(response.ClassSkills);
                } else {
                    self.skills(response.skills);
                }

                _i.list.sortAlphabetically(self.skills());
                deferred.resolve();
            });

            return deferred;
        };


    };

    // var firstVm = _i.ko.observable();
    //
    // var vm = {
    //     activate:activate,
    //     title:'First Tab',
    //     deactivate:deactivate,
    //     firstVm:firstVm,
    // };
    //
    // return vm;



});

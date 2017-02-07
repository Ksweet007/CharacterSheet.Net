define(function (require) {
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

    return function () {
        var self = this;
        self.secondVm = _i.ko.observable();
        self.data = null;
        self.classId = null;
        self.name = _i.ko.observable('');

        /*NEED TO ADD CLASS-PROFICIENCY INFORMATION*/
        /*PROFICIENCIES*/
        self.proficiencies = _i.ko.observableArray([]);
        self.skills = _i.ko.observableArray([]);
        self.chosenSkills = _i.ko.observableArray([]);
        self.classSkills = _i.ko.observableArray([]);

        self.profTypeList = [{
            Value: 1, Name: "Armor"
        }, {
            Value: 2, Name: "Weapon"
        }, {
            Value: 3, Name: "Tool"
        }, {
            Value: 4, Name: "Save"
        }, {
            Value: 5, Name: "Skill"
        }];


        self.activate = function (id) {
            self.classId = id;
            return self.getClassData().done(function (response) {
                _i.system.log('First Tab Activated');
                self.loadObservables(id);
            });
        }

        self.getClassData = function () {
            var deferred = _i.deferred.create();
            _i.charajax.getJSON('api/GetClassProficiencies/' + self.classId).done(function (response) {
                self.classData = response;
                self.data = response;
                self.name = response.name;
                self.classId = response.classId;
                self.proficiencies(self.classData.Proficiencies);
                self.proficiencies().forEach(function (item) {
                    item.proficiencyTypeList = self.profTypeList;
                });
                if (response.ClassSkills.length > 0) {
                    self.skills(response.ClassSkills);
                } else {
                    self.skills(response.skills);
                }
                _i.list.sortAlphabetically(self.skills());


                self.armorProfList = _i.ko.observableArray(self.proficiencies().filter(function(item) {
                    return item.ProficiencytypeId === 1;
                }));
                self.weaponProfList = _i.ko.observableArray(self.proficiencies().filter(function (item) {
                    return item.ProficiencytypeId === 2;
                }));
                self.toolProfList = _i.ko.observableArray(self.proficiencies().filter(function (item) {
                    return item.ProficiencytypeId === 3;
                }));
                self.saveProfList = _i.ko.observableArray(self.proficiencies().filter(function (item) {
                    return item.ProficiencytypeId === 4;
                }));
                self.skillProfList = _i.ko.observableArray(self.proficiencies().filter(function (item) {
                    return item.ProficiencytypeId === 5;
                }));

                
                deferred.resolve();
            });

            return deferred;
        };




        self.deactivate = function () {
            return _i.system.log('Second Tab Deactivated');
        }

        self.loadObservables = function (id) {
            self.secondVm({ id: id, name: 'Proficiencies' });
        }

    };

});

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
        self.data = null;
        self.proficiencies = _i.ko.observableArray([]);
        self.newproficiencies = _i.ko.observableArray([]);
        self.proficiencyTypes = _i.ko.observableArray([]);

        self.activate = function () {
            return self.getProficiencyData().done(function (response) {
                var mappedProfs = _i.ko.utils.arrayMap(self.proficiencies(), function (prof) {
                    prof.ProficiencyTypeList = self.proficiencyTypes;
                    return prof;
                });

                self.proficiencies(mappedProfs);

            });
        };

        self.getProficiencyData = function () {
            var deferred = _i.deferred.create();
            var promise = _i.deferred.waitForAll(self.getProficiencyTypes());

            promise.done(function () {
                self.getProficiencies().done(function () {
                    deferred.resolve();
                });
            });

            return deferred;
        };

        self.getProficiencies = function () {
            var promise = _i.deferred.create();
            _i.charajax.universal('api/GetAllProficiencies', '', 'GET').done(function (response) {
                self.proficiencies(response);
                _i.list.sortByProficiencyTypeName(self.proficiencies());

                promise.resolve();
            });
            return promise;
        };

        self.getProficiencyTypes = function () {
            var promise = _i.deferred.create();
            _i.charajax.universal('api/GetAllProficiencyTypes', '', 'GET').done(function (response) {
                self.proficiencyTypes(response);
                _i.list.sortAlphabetically(self.proficiencyTypes());

                promise.resolve();
            });
            return promise;
        };

        self.addProficiency = function () {
            var newObj = _i.ko.observable();
            var obj = {};
            obj.ProficiencyId = 0;
            obj.ProficiencyTypeList = self.proficiencyTypes;
            obj.ProficiencytypeId = 0;
            obj.Name = '';
            newObj(obj);
            self.newproficiencies.push({
                ProficiencyId: 0,
                ProficiencyTypeList: self.proficiencyTypes,
                ProficiencytypeId: 0,
                Name: ''
            });
        };

        self.removeProficiency = function (prof) {
            var profToDelete = prof;
            _i.charajax.delete('/api/RemoveProficiency/' + profToDelete.ProficiencyId,'').done(function (response) {
                self.newproficiencies.remove(function(item){return item.ProficiencyId === profToDelete.ProficiencyId})

                console.log('Deleted Proficiency --> ' + response);
            });
            self.proficiencies.remove(prof);
        };

        self.saveProficiency = function (prof) {
            _i.charajax.put('/api/AddProficiency', prof).done(function (response) {
                self.newproficiencies.remove(function(item){return item.Name === response.Name})
                response.ProficiencyTypeList = self.proficiencyTypes;
                self.proficiencies.push(response);
                console.log('Added new Proficiency --> ' + response);
            });
        };

    }
});

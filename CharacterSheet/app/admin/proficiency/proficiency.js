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

    return function() {
        var self = this;
        self.data = null;
        self.proficiencies = _i.ko.observableArray([]);
        self.proficiencyTypes = _i.ko.observableArray([]);
        self.skills = _i.ko.observableArray([]);

        self.activate = function() {
            return self.getProficiencyData().done(function(response) {

                self.proficiencies = _i.ko.utils.arrayMap(self.proficiencies(),function(prof){
                    prof.ProficiencyTypeList = self.proficiencyTypes;
                    return prof;
                });

            });
        };

        self.getProficiencyData = function() {
    			var deferred = _i.deferred.create();
    			var promise = _i.deferred.waitForAll(self.getSkillData(),self.getProficiencyTypes());

    			promise.done(function() {
    				self.getProficiencies().done(function() {
    					deferred.resolve();
    				});
    			});

    			return deferred;
    		};

        self.getProficiencies = function(){
          var promise = _i.deferred.create();
          _i.charajax.universal('api/GetAllProficiencies','','GET').done(function(response){
            self.proficiencies(response);
            _i.list.sortByProficiencyTypeName(self.proficiencies());

            promise.resolve();
          });
          return promise;
        };

        self.getSkillData = function(){
            var promise = _i.deferred.create();
            _i.charajax.universal('api/GetAllSkills','','GET').done(function(response){
              self.skills(response);
              _i.list.sortAlphabetically(self.skills());

              promise.resolve();
            });
            return promise;
        };

        self.getProficiencyTypes = function(){
          var promise = _i.deferred.create();
          _i.charajax.universal('api/GetAllProficiencyTypes','','GET').done(function(response){
            self.proficiencyTypes(response);
            _i.list.sortAlphabetically(self.proficiencyTypes());

            promise.resolve();
          });
          return promise;
        };

        self.addProficiency = function() {
			var newObj = _i.ko.observable();
			newObj.ProficiencyId = 0;
			newObj.ProficiencyTypeList = self.proficiencyTypes;
			newObj.Name = '';
			self.proficiencies.push(newObj);
		};

        self.removeProficiency = function (prof) {
            self.proficiencies.remove(prof);
        };

        self.addContact = function () {
            self.proficiencies.push({
                Name: "",
                phones: ko.observableArray()
            });
        };


    }
});

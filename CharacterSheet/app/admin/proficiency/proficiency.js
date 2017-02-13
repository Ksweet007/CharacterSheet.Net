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
        self.proficiencyTypes = _i.ko.observableArray([]);
        self.skills = _i.ko.observableArray([]);

        self.activate = function() {
            return charajax.universal('api/GetAllProficiencies', '', 'GET').done(function(result) {

            });
        };

        self.getProficiencyData = function() {
    			var deferred = _i.deferred.create();
    			var promise = _i.deferred.waitForAll(self.getSkillData(),self.getProficiencyTypes());

    			promise.done(function() {
    				self.getClassData().done(function() {
    					deferred.resolve();
    				});
    			});

    			return deferred;
    		};

        self.getSkillData = function(){
            var promise = _i.deferred.create();
            _i.charajax.universal('api/GetAllSkills','','GET').done(function(result){
              self.skills(response);
              _i.list.sortAlphabetically(self.skills());

              promise.resolve();
            });
            return promise;
        };

        self.getProficiencyTypes = function(){
          var promise = _i.deferred.create();
          _i.charajax.universal('api/GetAllProficiencyTypes','','GET').done(function(result){
            self.proficiencyTypes(response);
            _i.list.sortAlphabetically(self.proficiencyTypes());

            promise.resolve();
          });
          return promise;
        };


    }
});

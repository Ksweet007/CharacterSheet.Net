define(function (require) {
    var _i = {
        ko: require('knockout'),
        $: require('jquery'),
        charajax: require('_custom/services/WebAPI'),
        list: require('_custom/services/listmanager'),
        deferred: require('_custom/deferred')
    };

    return function () {
        var self = this;
        self.levels = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
        self.typeToShow = _i.ko.observable("all");
        self.features = _i.ko.observableArray([]);
        self.newfeatures = _i.ko.observableArray([]);
        self.featuresToShow = _i.ko.computed(function() {
          var desiredType = self.typeToShow();
          if (desiredType === "all") {
            return self.features();
          }

        return _i.ko.utils.arrayFilter(self.features(), function(feature) {
          return feature.Name === desiredType;
          });
        });

        self.activate = function () {
            return self.getFeatures().done(function (response) {
            });
        };

        self.getFeatures = function () {
            var promise = _i.deferred.create();
            _i.charajax.universal('api/GetAllFeatures', '', 'GET').done(function (response) {
                self.features(response);
                _i.list.sortAlphabetically(self.features());

                promise.resolve();
            });
            return promise;
        };

        self.addFeature = function () {
            self.newfeatures.push({
              Name:'',
              FeatureId : 0,
              Levelgained : 1,
              Description : '',
              RecoveryType : '',
              ActionType : ''
            });
        };

        self.showFeatureElement = function(elem) {
          if (elem.nodeType === 1) {
            $(elem).hide().slideDown()
          }
        };

        self.hideFeatureElement = function(elem) {
          if (elem.nodeType === 1) {
            $(elem).slideUp(function() {
              $(elem).remove();
            })
          }
        };

        self.showFeatureDetails = function(obj,event){
          self.typeToShow = obj.Name;
        };

        // var val = replacementObj[replacementKey];
        // if (localizeReplacementValues) {
        //     val = self.localize(replacementObj[replacementKey]);
        // }
        // text = text.replace('||' + replacementKey + '||', val);

        //
        // self.removeProficiency = function (prof) {
        //     var profToDelete = prof;
        //     _i.charajax.delete('/api/RemoveProficiency/' + profToDelete.ProficiencyId,'').done(function (response) {
        //         self.newproficiencies.remove(function(item){return item.ProficiencyId === profToDelete.ProficiencyId})
        //
        //         console.log('Deleted Proficiency --> ' + response);
        //     });
        //     self.proficiencies.remove(prof);
        // };
        //
        // self.saveProficiency = function (prof) {
        //     _i.charajax.put('/api/AddProficiency', prof).done(function (response) {
        //         self.newproficiencies.remove(function(item){return item.Name === response.Name})
        //         response.ProficiencyTypeList = self.proficiencyTypes;
        //         self.proficiencies.push(response);
        //         console.log('Added new Proficiency --> ' + response);
        //     });
        // };

    }
});

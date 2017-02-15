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
        self.classes = _i.ko.observableArray([]);
        self.idToShow = _i.ko.observable(0);
        self.features = _i.ko.observableArray([]);
        self.newfeatures = _i.ko.observableArray([]);
        self.featuresToList = _i.ko.computed(function() {
          var desiredType = self.typeToShow();
          var desiredId = self.idToShow();
          if (desiredType === "all") {
            return self.features();
          }
          return _i.ko.utils.arrayFilter(self.features(), function(feature) {
            return feature.Name === desiredType;
          });
        });

        self.selectedFeature = _i.ko.computed(function(){
            var desiredId = self.idToShow();
            if(desiredId === 0){
              return {Name:'', FeatureId : 0, Levelgained : 1, Description : '', RecoveryType : '', ActionType : '', isSelected: _i.ko.observable(false), classes: self.classes(),selectedClasses:[]}
            }

           return _i.ko.utils.arrayFilter(self.features(), function(feature) {
              return feature.FeatureId === desiredId;
            })[0];

        });

        self.activate = function () {
            return self.getFeatureData().done(function (response) {
            });
        };

        self.getFeatures = function () {
            var promise = _i.deferred.create();
            _i.charajax.universal('api/GetAllFeatures', '', 'GET').done(function (response) {
              response.forEach(function(item){
                if(item.Classes.length > 0){
                  var clsList = [];
                  item.Classes.forEach(function(cls){
                    clsList.push(cls.Name);
                  });
                  item.classList = clsList.join(', ');
                }
              });

              self.features(response);
              _i.list.sortAlphabetically(self.features());

              promise.resolve();
            });
            return promise;
        };

        self.getFeatureData = function () {
            var deferred = _i.deferred.create();
            var promise = _i.deferred.waitForAll(self.getFeatures());

            promise.done(function () {
                self.getClassList().done(function () {
                    deferred.resolve();
                });
            });

            return deferred;
        };

        self.getClassList = function () {
            var promise = _i.deferred.create();
            _i.charajax.universal('api/GetClassList', '', 'GET').done(function (response) {
              response.forEach(function(cls){
                cls.isSelected = _i.ko.observable(false);
              });

              self.classes(response);
              _i.list.sortAlphabetically(self.classes());

              promise.resolve();
            });
            return promise;
        };

        self.addFeature = function () {
            self.newfeatures.push({Name:'', FeatureId : 0, Levelgained : 1, Description : '', RecoveryType : '', ActionType : '' });
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

        self.selectFeature = function(obj,event){
          if(obj.FeatureId === self.idToShow()){
            self.typeToShow("all");
            self.idToShow(0);
          }else{
            self.typeToShow(obj.Name);
            self.idToShow(obj.FeatureId);
          }
        };

        self.saveFeature = function(feature){
          feature.classes = _i.ko.utils.arrayFilter(feature.classes, function(cls){
            for(var i = 0; i < feature.selectedClasses.length; i++){
              if(cls.classId ===  feature.selectedClasses[i]){
                return true;
              }
              return false;
            }
          });

          _i.charajax.put('api/AddFeature/', feature).done(function (response) {

            self.idToShow(0);
            self.features.push(response);
            self.typeToShow("all");
          });
        };

    }
});

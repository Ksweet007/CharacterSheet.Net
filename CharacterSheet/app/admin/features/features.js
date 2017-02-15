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
              return {Name:'', FeatureId : 0, Levelgained : 1, Description : '', RecoveryType : '', ActionType : '', isSelected: _i.ko.observable(false)}
            }

           return _i.ko.utils.arrayFilter(self.features(), function(feature) {
              return feature.FeatureId === desiredId;
            })[0];

        });

        self.activate = function () {
            return self.getFeatures().done(function (response) {
            });
        };

        self.getFeatures = function () {
            var promise = _i.deferred.create();
            _i.charajax.universal('api/GetAllFeatures', '', 'GET').done(function (response) {
              response.forEach(function(item){
                var clsCombined = '';
                if(item.Classes.length > 0){
                  var clsList = [];
                  item.Classes.forEach(function(cls){
                    clsList.push(cls.Name);
                  });
                  clsCombined = ' - ' + clsList.join(', ');
                }
                item.classList = clsCombined;
              });

              self.features(response);
              _i.list.sortAlphabetically(self.features());

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
          _i.charajax.put('api/AddFeature', feature).done(function (response) {
            self.idToShow(0);
            self.features.push(response);
            self.typeToShow("all");
          });
        };

    }
});

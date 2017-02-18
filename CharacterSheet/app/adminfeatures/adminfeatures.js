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
    // ****Page states**** //
        //Editing
        //Add newfeatures
        //View All Features
        self.features = _i.ko.observableArray([]);
        self.isEditing = _i.ko.observable(false);
        self.typeToShow = _i.ko.observable("all");
        self.featureState = _i.ko.observable("Edit");
        self.idToShow = _i.ko.observable(0);
        self.selectState = _i.ko.observable('show all');

        // self.isEdit = _i.ko.computed(function(){
        //   var state = self.featureState();
        //   if(state === "Edit"){
        //     return true;
        //   }
        //   return false;
        // });

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
              return {Name:_i.ko.observable(''), FeatureId : 0, Levelgained : _i.ko.observable(1), Description : _i.ko.observable(''), RecoveryType : _i.ko.observable(''), ActionType : _i.ko.observable(''), isSelected: _i.ko.observable(false)}
            }

           return _i.ko.utils.arrayFilter(self.features(), function(feature) {
              return feature.FeatureId() === desiredId;
            })[0];

        });

        self.activate = function () {
            return self.getFeatures().done(function (response) {
            });
        };

        self.getFeatures = function () {
            var promise = _i.deferred.create();
            _i.charajax.universal('api/GetAllFeatures', '', 'GET').done(function (response) {
            var mapped = _i.ko.mapping.fromJS(response)

            self.features(mapped());
            _i.list.sortAlphabeticallyObservables(self.features());

              promise.resolve();
            });
            return promise;
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
            self.typeToShow(obj.Name());
            self.idToShow(obj.FeatureId());
            self.selectState('select');

        };

        self.cancel = function(){
            self.typeToShow("all");
            self.idToShow(0);
            self.selectState('show all');
        };

        self.addFeature = function(feature){
            var dataToSave = _i.ko.toJS(feature);
            //Set page states here
            _i.charajax.post('api/AddFeature',dataToSave).done(function(response){
                self.features.push(response);
            });
        };

        self.saveEdits = function(feature){
            var dataToSave = _i.ko.toJS(feature);
            self.idToShow(-1);
          _i.charajax.put('api/EditFeature', dataToSave).done(function (response) {
            self.idToShow(0);
            self.features.push(response);
            self.typeToShow("all");
          });
        };

        self.editFeature = function(feature){
            self.isEditing(true);
        };

        self.deleteFeature = function(feature){
          _i.charajax.delete('api/RemoveFeature/' + feature.FeatureId,'').done(function (response) {
            self.features.remove(feature);
          });
        };

    }
});

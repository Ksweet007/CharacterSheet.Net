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
        self.features = _i.ko.observableArray([]);
        self.newFeature = _i.ko.observable();
        self.isEditing = _i.ko.observable(false);
        self.selectedFeature = _i.ko.observable();
        self.currentState = _i.ko.observable('view');

        self.featuresToList = _i.ko.computed(function() {
            var stateToShow = self.currentState();
            if (stateToShow === "view") {
                return self.features();
            }
                return [];
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

        self.selectFeature = function(obj){
            self.selectedFeature(obj);
            self.currentState('edit');
        };

        self.createNewFeature = function(feature){
            self.currentState('new');
            self.newFeature({
                Name:_i.ko.observable(''),
                FeatureId : 0,
                Levelgained : _i.ko.observable(1),
                Description : _i.ko.observable(''),
                RecoveryType : _i.ko.observable(''),
                ActionType : _i.ko.observable(''),
                isSelected: _i.ko.observable(false)
            });
        };

        self.editFeature = function(feature){
            self.isEditing(true);
            self.currentState('edit');
        };

        self.returnToSelect = function(feature){
            self.isEditing(false);
            self.currentState('view');
        };

        self.cancelEdit = function(){
            self.isEditing(false);
        };

        self.saveEdits = function(feature){
            var dataToSave = _i.ko.toJS(feature);
            _i.charajax.put('api/EditFeature', dataToSave).done(function (response) {
                self.features.push(response);
                self.currentState('view');
            });
        };

        self.saveNewFeature = function(feature){
            var dataToSave = _i.ko.toJS(feature);

            _i.charajax.post('api/AddFeature',dataToSave).done(function(response){
                self.features.push(response);
                self.currentState('view');
            });
        };

        self.deleteFeature = function(feature){
          _i.charajax.delete('api/RemoveFeature/' + feature.FeatureId,'').done(function (response) {
            self.features.remove(feature);
            self.currentState('view');
          });
        };

    }
});

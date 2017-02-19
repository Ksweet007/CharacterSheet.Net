define(function (require) {
    var _i = {
        ko: require('knockout'),
        $: require('jquery'),
        utils: require('_custom/services/utils'),
        charajax: require('_custom/services/WebAPI'),
        list: require('_custom/services/listmanager'),
        deferred: require('_custom/deferred'),
        app: require('durandal/app')
    };

    return function () {
        var self = this;
        self.features = _i.ko.observableArray([]);
        self.newFeature = _i.ko.observable();
        self.deleteList = _i.ko.observableArray([]);
        self.isEditing = _i.ko.observable(false);
        self.selectedFeature = _i.ko.observable();
        self.currentState = _i.ko.observable('view');

        self.dirtyItems = _i.ko.computed(function () {
            return _i.ko.utils.arrayFilter(self.features(), function (item) {
                return item.dirtyFlag.isDirty();
            });
        });

        self.isDirty = _i.ko.computed(function () {
            return self.dirtyItems().length > 0 || self.deleteList().length > 0;
        });

        self.featuresToList = _i.ko.computed(function () {
            var stateToShow = self.currentState();
            if (stateToShow === "view") {
                return self.features();
            }
            return [];
        });

        self.activate = function () {
            return self.getFeatures();
        };

        self.canDeactivate = function () {
            var promise = _i.deferred.create();

            if (self.isDirty() || self.deleteList().length > 0) {
                _i.app.showMessage('You have Pending Changes. Do you want to Save?', 'Navigate', ['Save and Continue', 'Continue']).always(function (response) {
                    if (response === 'Save and Continue') {
                        _i.app.trigger('view:navsave', self.save);
                        promise.resolve(true);
                    } else if (response === 'Continue') {
                        promise.resolve(true);
                    }
                });
            }

            return promise;
        };

        self.getFeatures = function () {
            _i.charajax.getJSON('api/GetAllFeatures', '').done(function (response) {
                var mapped = _i.ko.mapping.fromJS(response);
                mapped().forEach(function (item) {
                    item.dirtyFlag = new _i.ko.dirtyFlag(item);
                });
                self.features(mapped());

                _i.list.sortAlphabeticallyObservables(self.features());
            });
        };

        self.selectFeature = function (obj) {
            self.selectedFeature(obj);
            self.currentState('edit');
        };

        self.createNewFeature = function (feature) {
            self.currentState('new');
            self.newFeature({
                Name: _i.ko.observable(''),
                FeatureId: 0,
                Levelgained: _i.ko.observable(1),
                Description: _i.ko.observable(''),
                RecoveryType: _i.ko.observable(''),
                ActionType: _i.ko.observable(''),
                isSelected: _i.ko.observable(false),
                dirtyFlag: _i.ko.observable(this)
            });
        };

        self.editFeature = function () {
            self.isEditing(true);
            self.currentState('edit');
        };

        self.returnToSelect = function (feature) {
            self.isEditing(false);
            self.currentState('view');
        };

        self.cancelEdit = function () {
            self.isEditing(false);
        };

        // self.saveEdits = function (feature) {
        //     var dataToSave = _i.ko.toJS(feature);
        //     _i.charajax.put('api/EditFeature', dataToSave).done(function (response) {
        //         feature.dirtyFlag().reset;
        //         self.currentState('view');
        //     });
        // };

        // self.saveNewFeature = function (feature) {
        //     var dataToSave = _i.ko.toJS(feature);
        //     _i.charajax.post('api/AddFeature', dataToSave).done(function (response) {
        //         self.features.push(response);
        //         self.currentState('view');
        //     });
        // };

        self.deleteFeature = function (feature) {
            _i.charajax.delete('api/RemoveFeature/' + feature.FeatureId, '').done(function (response) {
                self.features.remove(feature);
                self.currentState('view');
            });
        };

        self.save = function () {
            var isSaveState = self.isDirty() || self.selectedFeature.FeatureId === 0;
            var isDeleteState = self.deleteList().length > 0;

            if (isSaveState) { //ADD OR EDIT
                var dataToSave = {
                    Name: self.selectedFeature().Name(),
                    FeatureId: self.selectedFeature().FeatureId(),
                    Levelgained: self.selectedFeature().Levelgained(),
                    Description: self.selectedFeature().Description(),
                    RecoveryType: self.selectedFeature().RecoveryType(),
                    ActionType: self.selectedFeature().ActionType()
                };

                if (dataToSave.FeatureId > 0) { //EDIT
                    return _i.charajax.put('api/EditFeature', dataToSave).done(function (response) {
                        self.selectedFeature().dirtyFlag.reset;
                        self.isEditing(false);
                        self.currentState('view');
                    });
                } else { //ADD
                    return _i.charajax.post('api/AddFeature', dataToSave).done(function (response) {
                        self.features.push(response);
                        self.currentState('view');
                    });
                }
            } else if (isDeleteState) { //DELETE
                return _i.charajax.delete('api/RemoveFeature/' + feature.FeatureId, '').done(function (response) {
                    self.features.remove(feature);
                    self.currentState('view');
                });
            } else {
                return _i.deferred.createResolved(true);
            }

        };

    }
});

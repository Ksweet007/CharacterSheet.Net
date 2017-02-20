define(function (require) {
    var _i = {
        ko: require('knockout'),
        $: require('jquery'),
        utils: require('_custom/services/utils'),
        charajax: require('_custom/services/WebAPI'),
        list: require('_custom/services/listmanager'),
        deferred: require('_custom/deferred'),
        app: require('durandal/app'),
        CustomModal: require('./saveblock'),
        alert: require('_custom/services/alert')
    };

    return function () {
        var self = this;

        /*====================FEATURE SETUP====================*/
        self.features = _i.ko.observableArray([]);
        self.newFeature = _i.ko.observable();
        self.selectedFeature = _i.ko.observable();
        self.featuresToList = _i.ko.computed(function () {
            var stateToShow = self.currentState();
            if (stateToShow === "view") {
                return _i.list.sortAlphabeticallyObservables(self.features());
            }
            return [];
        });
        
        self.currentState = _i.ko.observable('view');

        /*====================CHANGE TRACKER SETUP====================*/
        self.isDirty = _i.ko.computed(function () {
            return self.dirtyItems().length > 0;
        });
        self.dirtyItems = _i.ko.computed(function () {
            return _i.ko.utils.arrayFilter(self.features(), function (item) {
                return item.dirtyFlag.isDirty();
            });
        });
        
        /*==================== PAGE/DATA SETUP ====================*/       
        self.activate = function () {
            return _i.charajax.getJSON('api/GetAllFeatures', '').done(function (response) {
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

        self.resetFromEditState = function () {
            self.selectedFeature().dirtyFlag.reset();
            self.currentState('view');
        };

        self.cancelEdit = function () {
            self.resetFromEditState();
        };

        self.returnToSelect = function () {
            self.currentState('view');
        };

        self.showAlertMsg = function (alertType, textToShow) {
            var alertConfig = { message: alertType, type: textToShow };
            _i.app.trigger('view:saved');
            _i.alert.showAlert(alertConfig);
        };

        self.triggerAlertsAndSetState = function (alertType, textToShow, pageState) {
            var alertConfig = { message: alertType, type: textToShow };
            _i.app.trigger('view:saved');
            _i.alert.showAlert(alertConfig);
            if (pageState !== '') {
                self.currentState(pageState);
            }
        };

        self.saveNewFeature = function (featureToAdd) {
            return _i.charajax.post('api/AddFeature', featureToAdd).then(function (response) {
                self.features.push(response);
                self.showAlertMsg("success", "New Feature Saved", "view");
            });
        };

        self.deleteFeature = function (featureToDelete) {
            return _i.charajax.delete('api/RemoveFeature/' + featureToDelete.FeatureId, '').then(function (response) {
                var alertMsg = "Feature Deleted: " + featureToDelete.Name();                
                self.features.remove(featureToDelete);
                self.showAlertMsg("danger", alertMsg, "view");
            });
        };

        self.save = function () {
            var isSaveState = self.isDirty() && self.selectedFeature.FeatureId > 0;

            if (!isSaveState) {
                return _i.deferred.createResolved();
            }

            var dataToSave = {
                Name: self.selectedFeature().Name(),
                FeatureId: self.selectedFeature().FeatureId(),
                Levelgained: self.selectedFeature().Levelgained(),
                Description: self.selectedFeature().Description(),
                RecoveryType: self.selectedFeature().RecoveryType(),
                ActionType: self.selectedFeature().ActionType()
            };

            return _i.charajax.put('api/EditFeature', dataToSave).then(function (response) {
                self.selectedFeature().dirtyFlag.reset();                
                self.showAlertMsg("success", "Feature Edit Saved", "view");
            });

        };

    }
});

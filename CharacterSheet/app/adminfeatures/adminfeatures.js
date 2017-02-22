define(function (require) {
    var _i = {
        ko: require('knockout'),
        $: require('jquery'),
        utils: require('_custom/services/utils'),
        charajax: require('_custom/services/WebAPI'),
        list: require('_custom/services/listmanager'),
        deferred: require('_custom/deferred'),
        alert: require('_custom/services/alert')
    };

    return function () {
        var self = this;
        self.currentState = _i.ko.observable('view');

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

        /*====================CHANGE TRACKER SETUP====================*/
        self.dirtyItems = _i.ko.computed(function () {
            return _i.ko.utils.arrayFilter(self.features(), function (item) {
                return item.dirtyFlag.isDirty();
            });
        });
        self.isDirty = _i.ko.computed(function () {
            return self.dirtyItems().length > 0;
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

        /*==================== PAGE ACTIONS ====================*/
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

        /* Set the selected feature and put our page in to edit state */
        self.selectFeature = function (obj) {
            self.selectedFeature(obj);
            self.currentState('edit');
        };

        /* Cancel edit, reset our dirty flag, set page to view state */
        self.cancelEdit = function () {
            self.selectedFeature().dirtyFlag.reset();
            self.currentState('view');
        };

        /* Cancel creating new feature. Set page to view state */
        self.cancelNew = function () {
            self.currentState('view');
        };

        /* Set config values for Alert, trigger alert, then change page state */
        self.triggerAlertsAndSetState = function (alertType, textToShow, pageState) {
            var alertConfig = { type: alertType, message: textToShow };
            _i.alert.showAlert(alertConfig);
            self.currentState(pageState);
        };

        /* Save new Feature with ajax then add the returned feature to our feature list (so it has the newly assigned DB ID value, then alert the user */
        self.saveNewFeature = function (featureToAdd) {
			var dataToSave = {
				Name: featureToAdd.Name(),
				FeatureId: 0,
				Levelgained: featureToAdd.Levelgained(),
				Description: featureToAdd.Description(),
				RecoveryType: featureToAdd.RecoveryType(),
				ActionType: featureToAdd.ActionType()
			};

            return _i.charajax.post('api/AddFeature', dataToSave).then(function (response) {
                self.features.push(response);
                self.triggerAlertsAndSetState("success", "New Feature Saved", "view");
            });
        };

        /* Delete the Feature, remove it from our list of Features, then alert the user */
        self.deleteFeature = function (featureToDelete) {
            return _i.charajax.delete('api/RemoveFeature/' + featureToDelete.FeatureId, '').then(function (response) {
                var alertMsg = "Feature Deleted: " + featureToDelete.Name();
                self.features.remove(featureToDelete);
                self.triggerAlertsAndSetState("danger", alertMsg, "view");
            });
        };

        /* Save Edits made to a Feature, then reset that Feature's dirtyFlag and alert the user */
        self.save = function () {
            var isSaveState = self.isDirty() && self.selectedFeature().FeatureId() > 0;

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
                self.triggerAlertsAndSetState("success", "Feature Edit Saved", "view");
            });

        };

    }
});

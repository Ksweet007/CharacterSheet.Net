define(function (require) {
    var _i = {
        ko: require('knockout'),
        $: require('jquery'),
        charajax: require('_custom/services/WebAPI'),
        list: require('_custom/services/listmanager'),
        deferred: require('_custom/deferred'),
        alert: require('_custom/services/alert'),
		confirmdelete: require('confirmdelete/confirmdelete')
    };

    return function () {
        var self = this;

		/*==================== PAGE-STATE OBSERVABLES ====================*/
		self.isAddingNew = _i.ko.observable(false);
		self.isEditing = _i.ko.observable(false);
		self.showAll = _i.ko.observable(true);

        /*==================== FEATURE OBSERVABLES ====================*/
        self.features = _i.ko.observableArray([]);
        self.newFeature = _i.ko.observable();
        self.selectedFeature = _i.ko.observable();

        self.featuresToShow = _i.ko.computed(function () {
            if (self.showAll()) {
                return self.features().sort(function (left, right) { return left.Levelgained() == right.Levelgained() ? 0 : (left.Name() < right.Name() ? -1 : 1) });
            }
			return[];
        });

        /*====================CHANGE TRACKER SETUP====================*/
        self.dirtyItems = _i.ko.computed(function () {
            return _i.ko.utils.arrayFilter(self.features(), function (item) {
                return item.dirtyFlag.isDirty();
            });
        });
        self.isDirty = _i.ko.computed(function () {
			if(self.dirtyItems().length > 0 || self.isAddingNew()){
				return true;
			}
            return false;
        });

        /*==================== PAGE/DATA SETUP ====================*/
        self.activate = function () {
            return self.getFeatures().done(function(){
			});
        };

		self.getFeatures = function(){
			var promise = _i.deferred.create();
			_i.charajax.get('api/GetAllFeatures', '').done(function (response) {
                var mapped = _i.ko.mapping.fromJS(response);
                mapped().forEach(function (item) {
                    item.dirtyFlag = new _i.ko.dirtyFlag(item);
                });
                self.features(mapped());

                _i.list.sortAlphabeticallyObservables(self.features());

				promise.resolve();
            });

			return promise;
		};

		/*==================== ALERT THEN CHANGE PAGE STATE ====================*/
		self.resetToBaseList = function (alertType, textToShow, pageState) {
			var alertConfig = { type: alertType, message: textToShow };
			_i.alert.showAlert(alertConfig);
			self.isAddingNew(false);
			self.isEditing(false);
			self.showAll(true);
		};

        /*==================== PAGE ACTIONS ====================*/

		/* Set the selected feature and put our page in to edit state */
		self.selectFeatureToEdit = function (obj) {
			self.selectedFeature(obj);

			self.isAddingNew(false);
			self.isEditing(true);
			self.showAll(false);
		};

        self.openCreateForm = function (feature) {
			self.isAddingNew(true);
			self.isEditing(false);
			self.showAll(false);

            self.newFeature({
				FeatureId: _i.ko.observable(0),
				Name: _i.ko.observable(''),
                Levelgained: _i.ko.observable(1),
                Description: _i.ko.observable(''),
                RecoveryType: _i.ko.observable(''),
                ActionType: _i.ko.observable(''),
                isSelected: _i.ko.observable(false)
            });
        };

        /* Close the editor (new or edit) and return to the base list */
		self.cancelEditor = function () {
			self.isAddingNew(false);
			self.isEditing(false);
			self.showAll(true);
		};

		/*==================== SAVE/EDIT/DELETE ====================*/

        self.deleteFeature = function (featureToDelete) {
			_i.confirmdelete.show().then(function(response){
				if(response.accepted){
					_i.charajax.delete('api/RemoveFeature/' + featureToDelete.FeatureId(), '').then(function (response) {
						var alertMsg = "Feature Deleted: " + featureToDelete.Name();
						self.features.remove(featureToDelete);
						self.resetToBaseList("error", "Feature Deleted");
					});
				}
			});
        };

        self.save = function (featureToSave) {
			var isEditState = self.isDirty() && self.isEditing();
            var isNewState = self.isAddingNew() && featureToSave.FeatureId() === 0;

            var dataToSave = {
                Name: featureToSave.Name(),
                FeatureId: featureToSave.FeatureId(),
                Levelgained: featureToSave.Levelgained(),
                Description: featureToSave.Description(),
                RecoveryType: featureToSave.RecoveryType(),
                ActionType: featureToSave.ActionType()
            };

			if(isNewState){
				return _i.charajax.post('api/AddFeature/', dataToSave).then(function (response) {
					var mapped = _i.ko.mapping.fromJS(response);
					mapped.dirtyFlag = new _i.ko.dirtyFlag(mapped);

	                self.features.push(mapped);
	                self.resetToBaseList("success", "New Feature Added");
	            });
			}

			if(isEditState){
				return _i.charajax.put('api/EditFeature/', dataToSave).then(function (response) {
					self.selectedFeature().dirtyFlag.reset();
					self.resetToBaseList("success", "Feature Edit Saved");
				});
			}

			if(!isNewState && !isEditState){
					return _i.deferred.createResolved();
			}

        };

    }
});

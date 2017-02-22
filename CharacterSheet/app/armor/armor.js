define(function(require) {
	var _i = {
		ko: require('knockout'),
		$: require('jquery'),
		charajax: require('_custom/services/WebAPI'),
		list: require('_custom/services/listmanager'),
		deferred: require('_custom/deferred')
	};

	return function() {
		var self = this;

		/*====================Type Setup====================*/
		//self.armorType = _i.ko.observableArray(['Light','Medium','Heavy','Shield']);
		self.armorType = _i.ko.observableArray(["light armor","medium armor","heavy armor","shield"]);

		/*====================ARMOR SETUP====================*/
		self.armors = _i.ko.observableArray([]);
        self.newArmor = _i.ko.observable();
        self.selectedArmor = _i.ko.observable();
		self.armorsToShow = _i.ko.computed(function() {
			return self.armors().filter(function(armor) {
			  return self.armorType().includes(armor.ProficiencyName().toLowerCase());
			} );
		});

        /*====================CHANGE TRACKER SETUP====================*/
        self.dirtyItems = _i.ko.computed(function () {
            return _i.ko.utils.arrayFilter(self.armors(), function (item) {
                return item.dirtyFlag.isDirty();
            });
        });
        self.isDirty = _i.ko.computed(function () {
            return self.dirtyItems().length > 0;
        });

		/*==================== PAGE/DATA SETUP ====================*/
		self.isAddingNew = _i.ko.observable();
		self.activate = function() {
			return _i.charajax.get('api/GetAllArmor', '').done(function(response) {
				var mapped = _i.ko.mapping.fromJS(response);
				mapped().forEach(function (item) {
                    item.dirtyFlag = new _i.ko.dirtyFlag(item);
                });

				self.armors(mapped());

				_i.list.sortAlphabeticallyObservables(self.armors());
			});
		};

		/*==================== ALERT THEN CHANGE PAGE STATE ====================*/
	    self.resetToBaseList = function (alertType, textToShow, pageState) {
	        var alertConfig = { type: alertType, message: textToShow };
	        _i.alert.showAlert(alertConfig);
	        self.isAddingNew(false);
	    };


        /*==================== SAVE/EDIT/DELETE ====================*/
		self.saveNewFeature = function (armorToAdd) {
            return _i.charajax.post('api/AddArmor', armorToAdd).then(function (response) {
                self.armors.push(response);
                self.resetToBaseList("success", "New Armor Added");
            });
        };

        self.save = function () {
            var isSaveState = self.isDirty() && self.selectedArmor().ArmorId() > 0;

            if (!isSaveState) {
                return _i.deferred.createResolved();
            }

            var dataToSave = {
                ArmorId: self.selectedArmor().ArmorId(),
				ArmorProficiencyId: self.selectedArmor().ArmorProficiencyId(),
                ArmorClass: self.selectedArmor().ArmorClass(),
				Cost: self.selectedArmor().Cost(),
				Name: self.selectedArmor().Name(),
				ProficiencyName: self.selectedArmor().ProficiencyName(),
				ProficiencyTypeId: self.selectedArmor().ProficiencyTypeId(),
				Stealth: self.selectedArmor().Stealth(),
				Strength: self.selectedArmor().Strength(),
                Weight: self.selectedArmor().Weight()
            };

            return _i.charajax.put('api/EditFeature', dataToSave).then(function (response) {
                self.selectedArmor().dirtyFlag.reset();
                self.triggerAlertsAndSetState("success", "Feature Edit Saved", "view");
            });

        };





	}
});

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
		self.armorType = _i.ko.observableArray(["light armor","medium armor","heavy armor","shield"]);
		self.isAddingNew = _i.ko.observable(false);

		/*====================ARMOR SETUP====================*/
		self.armors = _i.ko.observableArray([]);
        self.newArmor = _i.ko.observable();
        self.selectedArmor = _i.ko.observable();
		self.armorsToShow = _i.ko.computed(function() {
			return self.armors().filter(function(armor) {
			  return self.armorType().includes(armor.ProficiencyName().toLowerCase());
			});
		});

        /*====================CHANGE TRACKER SETUP====================*/
        self.dirtyItems = _i.ko.computed(function () {
            return _i.ko.utils.arrayFilter(self.armors(), function (item) {
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

		/*==================== PAGE FUNCTIONS ====================*/
		self.openCreateForm = function (obj){
			self.isAddingNew(true);
			self.newArmor({
                ArmorId: 0,
				ArmorProficiencyId: _i.ko.observable(0),	//This associates it to a specific Prof Type I.E Light Armor
				ProficiencyName: _i.ko.observable(''),	//Tied To ArmorProficiencyId as it's descriptor
                ArmorClass: _i.ko.observable(''),
				Cost: _i.ko.observable(''),
				Name: _i.ko.observable(''),
				ProficiencyTypeId: 1, //What is the parent Proficiency. For this page it's Armor so ID 1
				Stealth: _i.ko.observable(''),
				Strength: _i.ko.observable(''),
                Weight: _i.ko.observable('')
			});

		};

        self.cancelNew = function () {
            self.isAddingNew(false);
        };

        /*==================== SAVE/EDIT/DELETE ====================*/
		self.saveNewArmor = function (armorToAdd) {
			var dataToSave = {
				ArmorId: 0,
				ArmorProficiencyId: armorToAdd.ArmorProficiencyId(),
				ArmorClass: armorToAdd.ArmorClass(),
				Cost: armorToAdd.Cost(),
				Name: armorToAdd.Name(),
				ProficiencyName: armorToAdd.ProficiencyName(),
				ProficiencyTypeId: 1,
				Stealth: armorToAdd.Stealth(),
				Strength: armorToAdd.Strength(),
				Weight: armorToAdd.Weight()
			};

            return _i.charajax.post('api/AddArmor', dataToSave).then(function (response) {
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

            return _i.charajax.put('api/AddArmor', dataToSave).then(function (response) {
                self.selectedArmor().dirtyFlag.reset();
                self.isAddingNew(false);
            });

        };

	}
});

define(function(require) {
	var _i = {
		ko: require('knockout'),
		$: require('jquery'),
		charajax: require('_custom/services/WebAPI'),
		list: require('_custom/services/listmanager'),
		deferred: require('_custom/deferred'),
		alert: require('_custom/services/alert'),
		confirmdelete: require('confirmdelete/confirmdelete')
	};

	return function() {
		var self = this;

		/*====================Type Setup====================*/
		self.selectedWeaponType = _i.ko.observableArray([]);
		self.weaponTypes = _i.ko.observableArray([]);
		self.isAddingNew = _i.ko.observable(false);
		self.isEditing = _i.ko.observable(false);
		self.showAll = _i.ko.observable(true);

		/*====================WEAPON SETUP====================*/
		self.weapons = _i.ko.observableArray([]);
		self.newWeapon = _i.ko.observable();
		self.selectedWeapon = _i.ko.observable();
		self.selectedProperty = _i.ko.observableArray([]);
		self.weaponsToShow = _i.ko.computed(function() {
			var returnList = self.weapons().filter(function(weap) {
				return self.selectedWeaponType().includes(weap.ProficiencyName());
			});
			returnList.forEach(function(weap){
				weap.Damage = weap.DamageDieCount() + 'd' + weap.DamageDie();
				weap.Properties = weap.WeaponProperties().join(',');
			});
			return returnList.sort(function (left, right) { return left.ProficiencyName() == right.ProficiencyName() ? 0 : (left.ArmorClass() < right.ArmorClass() ? -1 : 1) });
		});

        /*====================CHANGE TRACKER SETUP====================*/
        self.dirtyItems = _i.ko.computed(function () {
            return _i.ko.utils.arrayFilter(self.weapons(), function (item) {
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
			return self.getPageData().done(function(){
			});
		};

		self.getPageData = function(){
			var deferred = _i.deferred.create();
			var promise = _i.deferred.waitForAll(self.getWeaponProficiencies());

			promise.done(function(){
				self.getWeapons().done(function(){
					deferred.resolve();
				});
			});

			return deferred;
		};

		self.getWeaponProficiencies = function(){
			var deferred = _i.deferred.create();
			_i.charajax.get('api/GetWeaponProficiencyTypes','').done(function(response){
				var mapped = _i.ko.mapping.fromJS(response);

				response.forEach(function(item){
					self.selectedWeaponType().push(item.Name);
				});

				self.weaponTypes(response);
				deferred.resolve();
			});
			return deferred;
		};

		self.getWeapons = function(){
			var promise = _i.deferred.create();
			_i.charajax.get('api/GetAllWeapons', '').done(function(response) {
				response.forEach(function(weap){
					weap.dirtyFlag = new _i.ko.dirtyFlag(weap);
				});

				var mapped = _i.ko.mapping.fromJS(response);
				self.weapons(mapped());

				_i.list.sortAlphabeticallyObservables(self.weapons());

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

		/*==================== PAGE FUNCTIONS ====================*/
		self.selectWeaponToEdit = function(obj){
			self.selectedWeapon(obj);

			self.isAddingNew(false);
			self.isEditing(true);
			self.showAll(false);
		};

		self.openCreateForm = function (obj){
			self.isAddingNew(true);
			self.isEditing(false);
			self.showAll(false);

			self.newWeapon({
                Id: _i.ko.observable(0),
				ProficiencyId: _i.ko.observable(0),	//This associates it to a specific Prof Type I.E Light Armor
				ProficiencyName: _i.ko.observable(''),	//Tied To ArmorProficiencyId as it's descriptor
                ArmorClass: _i.ko.observable(''),
				Cost: _i.ko.observable(''),
				Name: _i.ko.observable(''),
				ProficiencyId: _i.ko.observable(1), //What is the parent Proficiency. For this page it's Armor so ID 1
				Stealth: _i.ko.observable(false),
				Strength: _i.ko.observable(''),
                Weight: _i.ko.observable('')
			});

		};

        self.cancelNew = function () {
			self.isAddingNew(false);
			self.isEditing(false);
			self.showAll(true);
        };

        /*==================== SAVE/EDIT/DELETE ====================*/
		self.deleteWeapon = function(obj){
			_i.confirmdelete.show().then(function(response){
				if(response.accepted){
					_i.charajax.delete('api/DeleteWeapon/' + obj.Id(),'').done(function(response){
						self.weapons.remove(obj);
					});
				}
			});
		};

        self.save = function (weaponToSave) {
			// var isEditState = self.isDirty() && self.isEditing();
			// var isNewState = self.isAddingNew();
			//
            // var dataToSave = {
            //     Id: weaponToSave.Id(),
			// 	ProficiencyId: weaponToSave.ProficiencyId(),
            //     ArmorClass: weaponToSave.ArmorClass(),
			// 	Cost: weaponToSave.Cost(),
			// 	Name: weaponToSave.Name(),
			// 	ProficiencyName: weaponToSave.ProficiencyName(),
			// 	ProficiencyId: weaponToSave.ProficiencyId(),
			// 	Stealth: weaponToSave.Stealth(),
			// 	Strength: weaponToSave.Strength(),
            //     Weight: weaponToSave.Weight()
            // };
			//
			// if(isNewState){
	        //     return _i.charajax.post('api/AddArmor/', dataToSave).done(function (response) {
			// 		var mapped = _i.ko.mapping.fromJS(response);
			// 		mapped.dirtyFlag = new _i.ko.dirtyFlag(mapped);
			//
	        //         self.armors.push(mapped);
	        //         self.resetToBaseList("success", "New Armor Added");
	        //     });
			// }
			//
			// if(isEditState){
	        //     return _i.charajax.put('api/EditArmor/', dataToSave).done(function (response) {
	        //         self.selectedArmor().dirtyFlag.reset();
			// 		self.resetToBaseList("success", "Armor Edit Saved");
	        //     });
			// }
			//
			// if(!isNewState && !isEditState){
			// 	return _i.deferred.createResolved();
			// }

        };

	}
});
define(function(require) {
	var _i = {
		ko: require('knockout'),
		$: require('jquery'),
		search: require('_custom/services/search'),
		charajax: require('_custom/services/WebAPI'),
		app: require('durandal/app'),
		list: require('_custom/services/listmanager'),
		deferred: require('_custom/deferred'),
		system: require('durandal/system')
	};

	return function() {
		var self = this;
		self.secondVm = _i.ko.observable();
		self.data = null;
		self.classId = null;
		self.name = _i.ko.observable('');

		/*PROFICIENCIES*/
		self.proficiencies = _i.ko.observableArray([]);
		self.skills = _i.ko.observableArray([]);
		self.chosenSkills = _i.ko.observableArray([]);
		self.chosenProficiencies = _i.ko.observableArray([]);
		self.classSkills = _i.ko.observableArray([]);
		self.classProfs = _i.ko.observableArray([]);
		self.classProfList = _i.ko.observableArray([]);
		self.armorProfList = _i.ko.observableArray([]);
		self.weaponProfList = _i.ko.observableArray([]);
		self.saveProfList = _i.ko.observableArray([]);
		self.toolProfList = _i.ko.observableArray([]);
		self.proficienciesToAdd = _i.ko.observableArray([]);

		self.proficienciesToAdd = _i.ko.observableArray(_i.ko.utils.arrayMap(self.proficienciesToAdd(), function(prof) {
			return {
				ProficiencyId:0,
				Name:'',
				ProficiencyTypeList:self.profTypeList
			};
		}));

		self.activate = function(id) {
			self.classId = id;
			return self.getProficiencyData().done(function(response) {
				_i.system.log('First Tab Activated');
				self.loadObservables(id);
			});
		}

		self.getProficiencyData = function() {
			var deferred = _i.deferred.create();
			var promise = _i.deferred.waitForAll(self.getSkillData());

			promise.done(function() {
				self.getClassData().done(function() {
					deferred.resolve();
				});
			});

			return deferred;
		};

		self.getSkillData = function() {
			var promise = _i.deferred.create();
			_i.charajax.getJSON('api/GetClassSkills/' + self.classId).done(function(response) {

				self.skills(response.AllSkills);
				_i.list.sortAlphabetically(self.skills());

				if (response.ClassSkills.length > 0) {
					response.ClassSkills.forEach(function(item) {
						self.chosenSkills().push(item.skillId);
					});
				}

				promise.resolve();
			});

			return promise;
		};

		self.getClassData = function() {
			var deferred = _i.deferred.create();
			_i.charajax.getJSON('api/GetClassProficiencies/' + self.classId).done(function(response) {
				self.data = response;
				self.name = response.name;

				if (response.ArmorProficiencies.length > 0) {
					var classProfs = [];
					response.ArmorProficiencies.forEach(function(item) {
						classProfs.push(item.Name);
					});

					self.proficiencies.push({ProficiencyType: "Armor", ProficiencyList: classProfs.join(', ')});
				}

				if (response.SaveProficiencies.length > 0) {
					var classProfs = [];
					response.SaveProficiencies.forEach(function(item) {
						classProfs.push(item.Name);
					});

					self.proficiencies.push({ProficiencyType: "Save", ProficiencyList: classProfs.join(', ')});
				}

				if (response.WeaponProficiencies.length > 0) {
					var classProfs = [];
					response.WeaponProficiencies.forEach(function(item) {
						classProfs.push(item.Name);
					});

					self.proficiencies.push({ProficiencyType: "Weapon", ProficiencyList: classProfs.join(', ')});
				}

				if (response.ToolProficiencies.length > 0) {
					var classProfs = [];
					response.ToolProficiencies.forEach(function(item) {
						classProfs.push(item.Name);
					});

					self.proficiencies.push({ProficiencyType: "Tool", ProficiencyList: classProfs.join(', ')});
				}

				deferred.resolve();
			});

			return deferred;
		};

		self.profTypeList = [
			{
				ProficiencyTypeId: 1,
				Name: "Armor"
			}, {
				ProficiencyTypeId: 2,
				Name: "Weapon"
			}, {
				ProficiencyTypeId: 3,
				Name: "Tool"
			}, {
				ProficiencyTypeId: 4,
				Name: "Save"
			}, {
				ProficiencyTypeId: 5,
				Name: "Skill"
			}
		];

		self.addProficiencies = function(obj, evt) {
			//After saving update our list with return value
			var profsToSave = self.proficienciesToAdd();

			_i.charajax.put('/api/AddProficiencies', profsToSave).done(function(response) {
				console.log('Added Proficiency ---> ' + response);
			});
		};

		self.addSkills = function(obj, evt) {
			//After saving update our list with return value
			var skillstoSave = _i.ko.observableArray([]); //self.chosenSkills();

			self.chosenSkills().forEach(function(id){
				self.skills().forEach(function(skill){
					if(skill.skillId === id){
						var newSkl = {};
						newSkl.abilityScoreId = skill.AbilityScoreId;
						newSkl.name = skill.name;
						newSkl.skillId = skill.skillId;

						skillstoSave().push(newSkl);
					}
				});
			});

			_i.charajax.put('/api/AddSkills/' + self.classId, skillstoSave()).done(function(response) {
				console.log('Added Skils ---> ' + response);
			});

		};

		self.addProf = function() {
			var newObj = {};
			newObj.ProficiencyId = 0;
			newObj.ProficiencyTypeList = self.profTypeList;
			newObj.Name = '';
			self.proficienciesToAdd.push({ProficiencyId: 0,ProficiencyTypeId:0, ProficiencyTypeList: self.profTypeList, Name: ""});
		};

		self.deactivate = function() {
			return _i.system.log('Second Tab Deactivated');
		}

		self.loadObservables = function(id) {
			self.secondVm({id: id, name: 'Proficiencies'});
		}

	};

});

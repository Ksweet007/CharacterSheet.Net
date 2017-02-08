
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

		self.profTypeList = [{
			Value: 1,
			Name: "Armor",
        }, {
			Value: 2,
			Name: "Weapon"
        }, {
			Value: 3,
			Name: "Tool"
        }, {
			Value: 4,
			Name: "Save"
        }, {
			Value: 5,
			Name: "Skill"
        }];

		self.activate = function(id) {
			self.classId = id;
			return self.getProficiencyData().done(function(response) {
				_i.system.log('First Tab Activated');
				self.loadObservables(id);
			});
		}

		self.getProficiencyData = function() {
			var deferred = _i.deferred.create();
			var promise = _i.deferred.waitForAll(
				self.getSkillData()
			);

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

          self.skills(response.Skills);
		      _i.list.sortAlphabetically(self.skills());

          promise.resolve();
			});

			return promise;
		};

		self.getClassData = function() {
			var deferred = _i.deferred.create();
			_i.charajax.getJSON('api/GetClassProficiencies/' + self.classId).done(function(response) {
				self.data = response;
				self.name = response.name;
				self.proficiencies.push(response.ArmorProficiencies);
        self.proficiencies.push(response.SaveProficiencies);
        self.proficiencies.push(response.WeaponProficiencies);
        self.proficiencies.push(response.ToolProficiencies);

				deferred.resolve();
			});

			return deferred;
		};

		self.deactivate = function() {
			return _i.system.log('Second Tab Deactivated');
		}

		self.loadObservables = function(id) {
			self.secondVm({
				id: id,
				name: 'Proficiencies'
			});
		}

	};

});

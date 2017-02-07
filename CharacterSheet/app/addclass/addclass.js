define(function(require) {
	var _i = {
		ko: require('knockout'),
		$: require('jquery'),
		search: require('_custom/services/search'),
		charajax: require('_custom/services/WebAPI'),
		app: require('durandal/app'),
		list: require('_custom/services/listmanager'),
		deferred: require('_custom/deferred'),
		router: require('plugins/router'),
		system: require('durandal/system')
	};
	return function () {
		var self = this;
		self.masterVm = _i.ko.observable();
		self.router = _i.router
			.createChildRouter()
			.makeRelative({moduleId: 'addclass', fromParent: true, dynamicHash: ':id'})
			.map([{
			    route: ['features', ''], moduleId: 'features', title: 'Features', nav: true, hash: '#features'},
			    { route: ['proficiencies'], moduleId: 'proficiencies', title: 'Proficiencies', nav: true }
			]).buildNavigationModel();

		self.data = null;
		self.classId = null;
		self.displayName = "Add Class";
		self.name = _i.ko.observable('');
		self.skills = _i.ko.observableArray([]);
		self.chosenSkills = _i.ko.observableArray([]);
		self.classSkills = _i.ko.observableArray([]);
		self.profChoice = _i.ko.observable('');
		self.lastSavedJson = ko.observable("");

		/*PROFICIENCIES*/
		self.proficiencies = _i.ko.observableArray([]);

		/*FEATURES*/
		self.features = _i.ko.observableArray([]);
		self.levelCount = _i.ko.observableArray([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]);

		self.getPageData = function() {
			var deferred = _i.deferred.create();
			var promise = _i.deferred.waitForAll(
				self.getClassFeatures()
			);

			promise.done(function() {
				self.getClassData().done(function() {
					deferred.resolve();
				});
			});
			return deferred;
		};

		self.getClassFeatures = function() {
			var promise = _i.deferred.create();
			_i.charajax.getJSON('api/GetClassFeatures/' + self.classId).done(function(response) {
				self.features(response);
				self.features().forEach(function(item) {
					item.LevelCount = self.levelCount();
				});

				promise.resolve();
			});

			return promise;
		};

		self.getClassData = function() {
			var deferred = _i.deferred.create();
			_i.charajax.getJSON('api/GetSheetFields/' + self.classId).done(function(response) {
				self.classData = response;
				self.data = response;
				self.name = response.name;
				self.classId = response.classId;
				self.proficiencies(self.classData.Proficiencies);
				self.proficiencies().forEach(function(item) {
					item.proficiencyTypeList = self.profTypeList;
				});

				if (response.ClassSkills.length > 0) {
					self.skills(response.ClassSkills);
				} else {
					self.skills(response.skills);
				}

				_i.list.sortAlphabetically(self.skills());
				deferred.resolve();
			});

			return deferred;
		};

		self.addClass = function(item, event) {
			_i.charajax.put('/api/AddClass', dataToSend).done(function(response) {
				console.log(response);
				self.name('');
				self.description('');
				self.primaryability('');
				self.hitdieperlevel('');
				self.hpatfirstlevel('');
				self.hpathigherlevels('');
			});
		}

		self.addClassForm = function() {}


		self.profTypeList = [{
				Value: 1,
				Name: "Armor"
			},
			{
				Value: 2,
				Name: "Weapon"
			},
			{
				Value: 3,
				Name: "Tool"
			},
			{
				Value: 4,
				Name: "Save"
			},
			{
				Value: 5,
				Name: "Skill"
			}
		];

		self.proficiencies = _i.ko.observableArray(
			_i.ko.utils.arrayMap(self.proficiencies(), function(prof) {
				return {
					proficiencyId: prof.proficiencyId,
					profTypeId: prof.profTypeId,
					profName: prof.profName,
					proficiencyTypeList: _i.ko.observableArray(prof.proficiencyTypeList)
				};
			}));

		self.addProf = function(item, event) {
			self.proficiencies.push({
				ProficiencyId: 0,
				ProficiencytypeId: 0,
				Name: "",
				proficiencyTypeList: self.profTypeList
			});
		};

		self.addFeature = function() {
			self.features.push({
				FeatureId: 0,
				Name: "",
				Description: "",
				ActionType: "",
				RecoveryType: "",
				LevelGained: 0,
				ClassId: self.classId,
				LevelCount: self.levelCount()
			});
		};

		self.save = function() {
			var profsToSave = self.proficiencies();

			_i.charajax.put('/api/AddProficiencies', profsToSave).done(function(response) {
				console.log('Added Proficiency ---> ' + response);
			});
		};

		self.saveFeature = function() {
			var featuresToSave = self.features();

			_i.charajax.put('/api/AddFeatureList', featuresToSave).done(function(response) {
				console.log('Added Features ---> ' + response);
			});
		};

		self.activate = function(id) {
			self.classId = id;
			return self.getPageData().done(function(response) {
				_i.system.log('Master View ' + id + ' Activated');
				self.loadObservables(id);
			});
		}

		self.deactivate = function() {
			return _i.system.log('Master View ' + self.masterVm().id + ' Deactivated');
		}

		self.loadObservables = function(id) {
			self.masterVm({
				id: id,
				name: 'Add Class - ' + self.name
			});
		}

	};


});

define(function(require) {
	var _i = {
		ko: require('knockout'),
		$: require('jquery'),
		search: require('_custom/services/search'),
		charajax: require('_custom/services/WebAPI'),
		app: require('durandal/app'),
		list: require('_custom/services/listmanager'),
		deferred: require('_custom/deferred')
	};

	return function() {
		var self = this;
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
		self.proficienciesListToBind = _i.ko.observableArray([]);





		self.getPageData = function(){
			var deferred = _i.deferred.create();
			var promise = _i.deferred.waitForAll(
				self.getFeatures()
			);

			promise.done(function(){
				self.getClassData().done(function(){
					deferred.resolve();
				});
			});
			return deferred;
		};

		self.getClassData = function(){
			var deferred = _i.deferred.create();
			_i.charajax.getJSON('api/GetSheetFields/1').done(function(response) {
				self.classData = response;
				self.data = response;
				self.name = response.name;
				self.classId = response.classId;
				self.proficienciesListToBind(self.classData.Proficiencies);

				self.proficienciesListToBind().forEach(function(item){
					item.proficiencyTypeList = self.profTypeList;
				});

				self.proficiencies(response.Proficiencies);

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

		self.activate = function() {
			return self.getClassData().done(function(response) {
				//Get feature information

			});
		}

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
				Value: 1,	Name: "Armor"},
			{	Value: 2,	Name: "Weapon"},
			{	Value: 3,	Name: "Tool"},
			{	Value: 4,	Name: "Save"},
			{	Value: 5,	Name: "Skill"}];

		self.proficienciesListToBind = _i.ko.observableArray(
			_i.ko.utils.arrayMap(self.proficiencies(), function(prof) {
				return {
					proficiencyId: prof.proficiencyId,
					profTypeId: prof.profTypeId,
					profName: prof.profName,
					proficiencyTypeList: _i.ko.observableArray(prof.proficiencyTypeList)
				};
			}));

		self.addProf = function(item, event) {
			self.proficienciesListToBind.push({
				ProficiencyId: 0,
				ProficiencytypeId: 0,
				Name: "",
				proficiencyTypeList: self.profTypeList
			});
		};

		self.save = function() {
			var profsToSave = self.proficienciesListToBind();

			_i.charajax.put('/api/AddProficiencies', profsToSave).done(function(response) {
				console.log('Added Proficiency ---> ' + response);
			});
			self.lastSavedJson(JSON.stringify(ko.toJS(self.proficienciesListToBind), null, 2));
		};

	};
});

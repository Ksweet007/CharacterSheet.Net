define(function(require) {
	var _i = {
		ko: require('knockout'),
		$: require('jquery'),
		search: require('_custom/services/search'),
		charajax: require('_custom/services/WebAPI'),
		app: require('durandal/app'),
		list: require('_custom/services/listmanager')
	};

	return function() {
		var self = this;
		self.data = null;
		self.displayName = "Add Class";
		self.name = _i.ko.observable('');
		self.skills = _i.ko.observableArray([]);
		self.chosenSkills = _i.ko.observableArray([]);
		self.classSkills = _i.ko.observableArray([]);
		self.profChoice = _i.ko.observable('');

		self.activate = function() {
			return _i.charajax.getJSON('api/GetSheetFields/1').done(function(response) {
				self.data = response;
				self.name = response.name;

				for(var i=0; i < response.Proficiencies.length; i++){
					var prof = {
						proficiencyId : response.Proficiencies[i].ProficiencyId,
						profTypeId : response.Proficiencies[i].ProficiencytypeId,
						profName : response.Proficiencies[i].Name,
						proficiencyTypeList: self.profTypeList
					};
					self.proficienciesListToBind.push(prof);
				}

				self.proficiencies(response.Proficiencies);

				if (response.ClassSkills.length > 0) {
					self.skills(response.ClassSkills);
				} else {
					self.skills(response.skills);
				}

				_i.list.sortAlphabetically(self.skills());
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

		self.proficiencies = _i.ko.observableArray([]);
		self.profTypeList =  [
			{Value: 1,Name: "Armor"},
			{Value: 2,Name: "Weapon"},
			{Value: 3,Name: "Tool"},
			{Value: 4,Name: "Save"},
			{Value: 5,Name: "Skill"}];

		self.proficienciesListToBind = _i.ko.observableArray(
			_i.ko.utils.arrayMap(self.proficiencies(),function(prof){
			return{
				proficiencyId : prof.proficiencyId,
				profTypeId : prof.profTypeId,
				profName : prof.profName,
				proficiencyTypeList : _i.ko.observableArray(prof.proficiencyTypeList)
			};
		}));

		self.addProf = function(item,event) {
			self.proficienciesListToBind.push({
				proficiencyId : 0,
				profTypeId : 0,
				profName : "",
				proficiencyTypeList: self.profTypeList
			});
		};

	};
});

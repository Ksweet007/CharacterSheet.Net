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
		self.proficiencies = _i.ko.observableArray([]);
		self.chosenSkills = _i.ko.observableArray([]);
		self.classSkills = _i.ko.observableArray([]);
		//self.proficiencies = _i.ko.observableArray([]);
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

		self.proficienciesListToBind = _i.ko.pureComputed(function() {
			return _i.ko.utils.arrayMap(self.proficiencies(),function(item){
				return {ProficiencytypeId: item.ProficiencytypeId,Name: item.Name}
			});
		});


		self.proficienciesListToBind = _i.ko.pureComputed(function() {
			return _i.ko.utils.arrayMap(self.proficiencies(), function(item) {
				return {
					ProficiencytypeId: item.ProficiencytypeId,
					Name: item.Name
				};
			});
		});


		self.profChoice = _i.ko.observable('');

		self.deactivate = function() {
			return _i.app.trigger('view:done', 'Details');
		};

		self.canDeactivate = function() {
			_i.app.trigger('view:done', 'Details');
			return true;
		};

		self.activate = function() {
			return _i.charajax.getJSON('api/GetSheetFields/1').done(function(response) {
				self.data = response;
				self.name = response.name;
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

		self.addProf = function() {
			self.proficiencies.push({
				ProficiencytypeId: "",
				Name: ""
			});
		};

	};
});

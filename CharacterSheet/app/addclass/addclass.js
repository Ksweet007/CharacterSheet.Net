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
		self.profTypeList = _i.ko.observableArray( [{
				ProficiencytypeId: _i.ko.observable(1),
				Name: _i.ko.observable("Armor")
			},
			{
				ProficiencytypeId: _i.ko.observable(2),
				Name: _i.ko.observable("Weapon")
			},
			{
				ProficiencytypeId: _i.ko.observable(3),
				Name: _i.ko.observable("Tool")
			},
			{
				ProficiencytypeId: _i.ko.observable(4),
				Name: _i.ko.observable("Save")
			},
			{
				ProficiencytypeId: _i.ko.observable(5),
				Name: _i.ko.observable("Skill")
			}
		]);

		self.proficienciesListToBind = _i.ko.pureComputed(function() {
			return _i.ko.utils.arrayMap(self.proficiencies(),function(item){
				return {
					ProficiencytypeId: item.ProficiencytypeId,
					Name: item.Name
				}
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

		self.addProf = function(item,event) {
			self.proficiencies.push({
				ProficiencytypeId: "",
				Name: ""
			});
		};

	};
});

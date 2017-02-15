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
		self.skills = _i.ko.observableArray([]);
		self.typeToShow = _i.ko.observable("all");
    self.displayAdvancedOptions = _i.ko.observable(false);
		self.newskills = _i.ko.observableArray([]);
		self.skillsToShow = _i.ko.computed(function() {
			var desiredType = self.typeToShow();
			if (desiredType === "all") {
				return self.skills();
			}

			return _i.ko.utils.arrayFilter(self.skills(), function(skill) {
				return skill.AbilityScore.Name === desiredType;
				});
			});

        self.addSkill = function (type) {
            self.skills.push({
                name: "New Skill",
                type: type
            });
        };

		self.showSkillElement = function(elem) {
			if (elem.nodeType === 1) {
				$(elem).hide().slideDown()
			}
		};

		self.hideSkillElement = function(elem) {
			if (elem.nodeType === 1) {
				$(elem).slideUp(function() {
					$(elem).remove();
				})
			}
		};

		self.activate = function() {
			return self.getSkillData().done(function(response) {
            });
		};

		self.getSkillData = function() {
			var promise = _i.deferred.create();
			_i.charajax.universal('api/GetAllSkills', '', 'GET').done(function(response) {
				self.skills(response);
				_i.list.sortAlphabetically(self.skills());

				promise.resolve();
			});
			return promise;
		};

		// self.addSkill = function() {
		// 	var newObj = _i.ko.observable();
		// 	var obj = {};
		// 	obj.ProficiencyId = 0;
		// 	obj.ProficiencyTypeList = self.proficiencyTypes;
		// 	obj.ProficiencytypeId = 0;
		// 	obj.Name = '';
		// 	newObj(obj);
		// 	self.newproficiencies.push({ProficiencyId: 0, ProficiencyTypeList: self.proficiencyTypes, ProficiencytypeId: 0, Name: ''});
		// };

		// self.removeProficiency = function(prof) {
		// 	var profToDelete = prof;
		// 	_i.charajax.delete('/api/RemoveProficiency/' + profToDelete.ProficiencyId, '').done(function(response) {
		// 		self.newproficiencies.remove(function(item) {
		// 			return item.ProficiencyId === profToDelete.ProficiencyId
		// 		})
        //
		// 		console.log('Deleted Proficiency --> ' + response);
		// 	});
		// 	self.proficiencies.remove(prof);
		// };
        //
		// self.saveProficiency = function(prof) {
		// 	_i.charajax.put('/api/AddProficiency', prof).done(function(response) {
		// 		self.newproficiencies.remove(function(item) {
		// 			return item.Name === response.Name
		// 		})
		// 		response.ProficiencyTypeList = self.proficiencyTypes;
		// 		self.proficiencies.push(response);
		// 		console.log('Added new Proficiency --> ' + response);
		// 	});
		// };

	}
});

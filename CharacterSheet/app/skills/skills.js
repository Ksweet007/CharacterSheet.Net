define(function (require) {
    var _i = {
        ko: require('knockout'),
        $: require('jquery'),
        charajax: require('_custom/services/WebAPI'),
        list: require('_custom/services/listmanager'),
        deferred: require('_custom/deferred'),
    };

    return function () {
        var self = this;

        /*====================Ability Setup====================*/
        self.abilities = _i.ko.observableArray(['Strength','Dexterity','Constitution','Wisdom','Intelligence','Charisma']);
		// //self.selectedAbilities = _i.ko.observableArray(self.abilities); This is another way to do Checkbox check state using a simple array with the observableArray
        /*====================SKILL SETUP====================*/
        self.skills = _i.ko.observableArray([]);
        self.typeToShow = _i.ko.observable("all");
        self.selectedSkill = _i.ko.observable();

		self.skillsToShow = _i.ko.computed(function(){

		});

        // self.skillsToShow = _i.ko.computed(function () {
        //     var desiredType = self.typeToShow();
        //     if (desiredType === "all") {
        //         return _i.list.sortAlphabeticallyObservables(self.skills());
        //     }
        //     return _i.ko.utils.arrayFilter(self.skills(), function(skill){
        //       return skill.AbilityScore.Name() === desiredType;
        //     });
        // });

        /*==================== PAGE/DATA SETUP ====================*/
        self.activate = function () {
            return _i.charajax.get('api/GetAllSkills', '').done(function (response) {
                var mapped = _i.ko.mapping.fromJS(response);
                self.skills(mapped());

                _i.list.sortAlphabeticallyObservables(self.skills());
            });
        };

        /*==================== PAGE ACTIONS ====================*/

        /* Return to the main skill list from the details panel */
        self.returnToViewAll = function () {
            self.typeToShow('viewall');
        };
    }
});

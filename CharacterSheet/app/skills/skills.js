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

        /*====================SKILL SETUP====================*/
        self.skills = _i.ko.observableArray([]);
        self.selectedSkill = _i.ko.observable();
        self.pageState = _i.ko.observable('viewall');
        self.skillsToShow = _i.ko.computed(function () {
            var stateToShow = self.pageState();
            if (stateToShow === "viewall") {
                return _i.list.sortAlphabeticallyObservables(self.skills());
            }
        });

        /*==================== PAGE/DATA SETUP ====================*/
        self.activate = function () {
            return _i.charajax.get('api/GetAllSkills', '').done(function (response) {
                var mapped = _i.ko.mapping.fromJS(response);
                self.skills(mapped());

                _i.list.sortAlphabeticallyObservables(self.skills());
            });
        };

        /*==================== PAGE ACTIONS ====================*/

        /* Set the selected skill and put our page in to detail view state */
        self.selectSkill = function (obj) {
            self.selectedSkill(obj);
            self.pageState('detailview');
        };

        /* Return to the main skill list from the details panel */
        self.returnToViewAll = function () {
            self.pageState('viewall');
        };
    }
});

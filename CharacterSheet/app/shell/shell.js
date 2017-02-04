define(['plugins/router', 'durandal/app'], function (router, app,vemod) {
    var self = this;
    self.searchTerm = ko.observable();
    self.classDetailsComplete = ko.observable(false);
    self.classSelected = ko.observable(false);
    self.raceSelected = ko.observable(false);
    self.classAdded = ko.observable(true);

    app.on('view:done').then(function(viewname){
        if(viewname === 'Race List'){
            self.classDetailsComplete(true);
        }
        else if (viewname === 'Class List') {
            self.classSelected(true);
        }
        else if (viewname === 'Details') {
            self.classDetailsComplete(true);
        }
    });

    return {
        router: router,
        search: function(data,event) {

            if(router.activeItem() && router.activeItem().search){
                var searchResults = router.activeItem().search(self.searchTerm());
            }
            else{
                app.showMessage('Search not implemented for this view.');
            }

        },
        activate: function (foo) {
            router.map([
                { route: '', title:'Class List', moduleId: 'selectclass/selectclass', nav: true, isComplete:self.classSelected,ident:"classlist" },
				{ route: 'SelectRace', title: 'Race List', moduleId: 'selectrace/selectrace', nav: true, isComplete:self.raceSelected,ident:"selectrace" },
                { route: 'classdetails/:id', title: 'Class Details', moduleId: 'classdetails/classdetails', hash: '#classdetails', nav: false, isComplete: self.classDetailsComplete, ident: "classdetails" },
                { route: 'Add Class', title: 'Add Class', moduleId: 'addclass/addclass', nav: true, isComplete: self.classAdded, ident: 'addclass' }

            ]).buildNavigationModel();

            return router.activate();
        },
        canDeactivate: function (arg) {
            var foo = arg;
            return app.showMessage('Are you sure you want to leave this page?', 'Navigate', ['Yes', 'No']);
        }
    };
});

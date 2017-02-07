
define(['plugins/router', 'durandal/app'], function(router, app, vemod) {
	var self = this;
	self.searchTerm = ko.observable();
	self.classDetailsComplete = ko.observable(false);
	self.classSelected = ko.observable(false);
	self.raceSelected = ko.observable(false);
	self.classAdded = ko.observable(true);

	app.on('view:done').then(function(viewname) {
		if (viewname === 'Race List') {
			self.classDetailsComplete(true);
		} else if (viewname === 'Class List') {
			self.classSelected(true);
		} else if (viewname === 'Details') {
			self.classDetailsComplete(true);
		}
	});

	return {
		router: router,
		search: function(data, event) {

			if (router.activeItem() && router.activeItem().search) {
				var searchResults = router.activeItem().search(self.searchTerm());
			} else {
				app.showMessage('Search not implemented for this view.');
			}

		},
		activate: function(foo) {
			router.map([{
					route: '',
					title: 'Class List',
					moduleId: 'landingpage/landingpage',
					nav: false,
					ident: "classlist"
				},
				{
					route: 'classlist',
					title: 'Class List',
					moduleId: 'selectclass/selectclass',
					nav: true,
					ident: "classlist"
				},
				{
					route: 'selectrace',
					title: 'Race List',
					moduleId: 'selectrace/selectrace',
					nav: true,
					ident: "selectrace"
				},
				{
					route: 'classdetails/:id',
					title: 'Class Details',
					moduleId: 'classdetails/classdetails',
					nav: false,
					hash: '#classdetails',
					ident: "classdetails"
				},
				{
					route: 'addclass(/:id)',
					title: 'Add Class',
					moduleId: 'addclass/addclass',
					nav: true,
					hash: '#addclass',
					ident: 'addclass'
				}

			]).buildNavigationModel();

			return router.activate();
		},
		canDeactivate: function(arg) {
			var foo = arg;
			return app.showMessage('Are you sure you want to leave this page?', 'Navigate', ['Yes', 'No']);
		}
	};
});


define(['plugins/router', 'durandal/app'], function(router, app, vemod) {
	var self = this;
	// self.searchTerm = ko.observable();
	// self.classDetailsComplete = ko.observable(false);
	// self.classSelected = ko.observable(false);
	// self.raceSelected = ko.observable(false);
	// self.classAdded = ko.observable(true);
	//
	// app.on('view:done').then(function(viewname) {
	// 	if (viewname === 'Race List') {
	// 		self.classDetailsComplete(true);
	// 	} else if (viewname === 'Class List') {
	// 		self.classSelected(true);
	// 	} else if (viewname === 'Details') {
	// 		self.classDetailsComplete(true);
	// 	}
	// });

	return {
		router: router,
		activate: function(foo) {

			router.map([{
					route: '',
					title: 'Class List',
					moduleId: 'landingpage/landingpage',
					nav: false
				},
				{
					route: 'admin',
					title: 'Admin',
					moduleId: 'admin/admin',
					nav: true,
					hash: "#admin"
				},
				{
					route: 'classlist',
					title: 'Class List',
					moduleId: 'selectclass/selectclass',
					nav: true
				},
				// {
				// 	route: 'selectrace',
				// 	title: 'Race List',
				// 	moduleId: 'selectrace/selectrace',
				// 	nav: true,
				// 	ident: "selectrace"
				// },
				{
					route: 'classdetails/:id',
					title: 'Class Details',
					moduleId: 'classdetails/classdetails',
					nav: false,
					hash: '#classdetails'
				},
				{
					route: 'manageclass/:id*details',
					title: 'Manage Class',
					moduleId: 'manageclass/manageclass',
					nav:false,
					hash: '#manageclass/:id'
        },
				{
					route: 'logout',
					title: 'Logout',
					moduleId: 'logout/logout',
					nav:false,
					hash: '#logout'
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

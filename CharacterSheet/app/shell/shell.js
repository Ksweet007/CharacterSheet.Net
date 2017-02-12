define(['plugins/router', 'durandal/app'], function(router, app, vemod) {
	
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
					route: 'home',
					title: 'Home',
					moduleId: 'landingpage/landingpage',
					nav: true,
					hash: "#home"
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
					nav:false

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

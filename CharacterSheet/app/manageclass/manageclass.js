define(function(require) {
	var _i = {
		ko: require('knockout'),
		$: require('jquery'),
		search: require('_custom/services/search'),
		charajax: require('_custom/services/WebAPI'),
		app: require('durandal/app'),
		list: require('_custom/services/listmanager'),
		deferred: require('_custom/deferred'),
		router: require('plugins/router'),
		system: require('durandal/system')
	};

	return function () {
		var self = this;
		self.masterVm = _i.ko.observable();
		self.router = _i.router
			.createChildRouter()
			.makeRelative({moduleId: 'manageclass', fromParent: true, dynamicHash: ':id'})
			.map([{
			    route: ['features', ''], moduleId: 'features', title: 'Features', nav: true, hash: '#features'},
			    { route: ['proficiencies'], moduleId: 'proficiencies', title: 'Proficiencies', nav: true },
				{ route: ['classinfo'], moduleId: 'classinfo', title: 'Class Info', nav: true }
			]).buildNavigationModel();


		self.data = null;
		self.classId = null;
		self.displayName = "Manage Class";
		self.name = _i.ko.observable('');
		self.lastSavedJson = ko.observable("");

		/*FEATURES*/
		self.features = _i.ko.observableArray([]);
		self.levelCount = _i.ko.observableArray([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]);

		self.getPageData = function() {
			var deferred = _i.deferred.create();
			var promise = _i.deferred.waitForAll(
				self.getClassFeatures()
			);

			promise.done(function() {
				self.getClassData().done(function() {
					deferred.resolve();
				});
			});
			return deferred;
		};

		self.getClassFeatures = function() {
			var promise = _i.deferred.create();
			_i.charajax.getJSON('api/GetClassFeatures/' + self.classId).done(function(response) {
				self.features(response);
				self.features().forEach(function(item) {
					item.LevelCount = self.levelCount();
				});

				promise.resolve();
			});

			return promise;
		};

		self.getClassData = function() {
			var deferred = _i.deferred.create();
			_i.charajax.getJSON('api/GetClassDetails/' + self.classId).done(function(response) {
				self.classData = response;
				self.data = response;
				self.name = response.Name;
				self.classId = response.classId;

				deferred.resolve();
			});

			return deferred;
		};

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

		self.addFeature = function() {
			self.features.push({
				FeatureId: 0,
				Name: "",
				Description: "",
				ActionType: "",
				RecoveryType: "",
				LevelGained: 0,
				ClassId: self.classId,
				LevelCount: self.levelCount()
			});
		};

		self.saveFeature = function() {
			var featuresToSave = self.features();

			_i.charajax.put('/api/AddFeatureList', featuresToSave).done(function(response) {
				console.log('Added Features ---> ' + response);
			});
		};

		self.activate = function(id) {
			self.classId = id;
			return self.getPageData().done(function(response) {
				_i.system.log('Master View ' + id + ' Activated');
				self.loadObservables(id);
			});
		}

		self.deactivate = function() {
			return _i.system.log('Master View ' + self.masterVm().id + ' Deactivated');
		}

		self.loadObservables = function(id) {
			self.masterVm({
				id: id,
				name: 'Manage Class - ' + self.name
			});
		}

	};


});

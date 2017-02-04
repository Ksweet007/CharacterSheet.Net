define(function(require) {
	var _i = {
		ko: require('knockout'),
		$: require('jquery'),
		search: require('_custom/services/search'),
		charajax: require('_custom/services/WebAPI'),
		app: require('durandal/app')
	};

	return function() {
		var self = this;
		self.data = null;
		self.displayName = "Add Class";
		self.classList = _i.ko.observableArray([]);
		self.isList = _i.ko.observable(false);
		self.classToAdd = _i.ko.observable();

		self.deactivate = function() {
			return _i.app.trigger('view:done', 'Details');
		};

		self.canDeactivate = function() {
			_i.app.trigger('view:done', 'Details');
			return true;
		};

		self.activate = function(classname) {
			var data = {
			name: '',
			description: '',
			primaryability: '',
			hitdieperlevel: '',
			hpatfirstlevel: '',
			hpathigherlevels: ''}

			self.classList.push(data);
		}

		self.addClass = function(item,event) {
			var dataToSend = {
				name: item.name,
				description: item.description,
				primaryability: item.primaryability,
				hitdieperlevel: item.hitdieperlevel,
				hpatfirstlevel: item.hpatfirstlevel,
				hpathigherlevels: item.hpathigherlevels
			};

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

		self.addClassForm = function(){
			var data = {
			name: '',
			description: '',
			primaryability: '',
			hitdieperlevel: '',
			hpatfirstlevel: '',
			hpathigherlevels: ''}

			self.isList(true);
			self.classList.push(data);
		}

		self.addClassList = function(){
			var dataToSend = {};
			_i.charajax.put('/api/addclasslist',dataToSend).done(function(response){
				console.log('SUCCESS------>' + response)
			});
			var listToSend = self.classList();
		}

	};
});

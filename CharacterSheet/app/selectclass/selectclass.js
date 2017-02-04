define(function(require) {
	var _i = {
		ko: require('knockout'),
		$: require('jquery'),
		search: require('_custom/services/search'),
		list: require('_custom/services/listmanager'),
		charajax: require('_custom/services/WebAPI'),
		app: require('durandal/app')
	};

	return function() {
		var self = this;
		self.isComplete = _i.ko.observable(false);
		self.data = null;
		self.initialClassList = _i.ko.observableArray([]);
		self.classList = _i.ko.observableArray([]);
		self.selectedClassId = _i.ko.observable(0);
		self.displayName = 'Select Class';
		self.classDetails = _i.ko.observable();

		self.classFadeIn = function(elem) {
			if (elem.nodeType === 1) _i.$(elem).hide().slideDown()
		}
		self.classFadeOut = function(elem) {
			if (elem.nodeType === 1) _i.$(elem).slideUp(function() {
				$(elem).remove();
			})
		}

		self.classListToBind = _i.ko.pureComputed(function() {
			var desiredType = self.selectedClassId();
			if (desiredType === 0) return self.classList();
			return ko.utils.arrayFilter(self.classList(), function(item) {
				return item.id === desiredType;
			});
		});

		self.activate = function() {
			return _i.charajax.get('classes/_all_docs?include_docs=true').done(function(response) {
				var mappedList = _i.$.map(response.rows, function(obj, index) {
					var item = obj.doc;
					item.id = obj.id;
					item.key = obj.key

					return item;
				});

				self.data = mappedList;
				self.classList(mappedList);
			});
		};

		self.search = function(searchTerm) {
			if (!searchTerm || searchTerm === "") {
				self.classList(self.data);
			} else {
				var searchResults = _i.search.searchClassname(self.data, searchTerm);
				self.classList(searchResults);
			}
		};

		self.canDeactivate = function() {
			_i.app.trigger('view:done', 'Class List');
			return true;
		};

		self.selectClass = function (item, event) {
			self.isComplete(true);
			_i.app.trigger('view:done', 'Class List');
			var $element = _i.$(event.target);
			if (item.id === self.selectedClassId()) {
				self.selectedClassId(0);
			} else {
				self.selectedClassId(item.id);
				onclick = location.href = '#classdetails/' + item.id;
			}
		};

	};
});

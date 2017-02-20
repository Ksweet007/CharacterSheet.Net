define(function(require) {
	var _i = {
		ko: require('knockout'),
		utils: require('_custom/services/utilities'),
		$: require('jquery')
	};

	// function Item(id, name) {
	//     this.id = ko.observable(id);
	//     this.name = ko.observable(name);
	//     this.dirtyFlag = new ko.dirtyFlag(this);
	// }
    //   this.items = ko.observableArray([
    //     new Item(1, "one"),
    //     new Item(2, "two"),
    //     new Item(3, "three")
    // ]);

var obj = {
	Name: _i.ko.observable(''),
	FeatureId: 0,
	Levelgained: _i.ko.observable(1),
	Description: _i.ko.observable(''),
	RecoveryType: _i.ko.observable(''),
	ActionType: _i.ko.observable(''),
	isSelected: _i.ko.observable(false)
}

	_i.ko.dirtyFlag = function(root, isInitiallyDirty) {
		var result = function() {},
			_initialState = _i.ko.observable(_i.ko.toJSON(root)),
			_isInitiallyDirty = _i.ko.observable(isInitiallyDirty);

		result.isDirty = _i.ko.computed(function() {
			return _isInitiallyDirty() || _initialState() !== _i.ko.toJSON(root);
		});

		result.reset = function() {
			_initialState(_i.ko.toJSON(root));
			_isInitiallyDirty(false);
		};

		return result;
	};

});

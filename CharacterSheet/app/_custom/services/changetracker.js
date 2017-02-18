define(function(require){
    var _i = {
        $ : require('jquery'),
        ko : require ('knockout')
    }

    function ChangeTrackerCls() { }
//http://jsfiddle.net/rniemeyer/dtpfv/
//http://www.knockmeout.net/2011/05/creating-smart-dirty-flag-in-knockoutjs.html
    ChangeTrackerCls.prototype.dirtyFlag = function (root, isInitiallyDirty) {
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

    return new ChangeTrackerCls();

});

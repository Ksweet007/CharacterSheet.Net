define(function(require) {
    var _i = {
        ko: require('knockout')
    };
    function ListManagerCls() { }

    ListManagerCls.prototype.getNextSequenceNumber = function (sequenceList) {
        if (sequenceList.length < 1) {
            return 1;
        }
        return sequenceList.reduce(function (previousValue, currentValue) {
            if (previousValue.Sequence === 0) {
                return 0;
            }
            return Math.max(previousValue.Sequence || previousValue, currentValue.Sequence);
        }) + 1;
    };

    ListManagerCls.prototype.sequenceAddSingle = function (mainList, newItemToAdd) {
        if (mainList.length < 1) {
            newItemToAdd.sequence = 1;
        }
        newItemToAdd.sequence = mainList.reduce(function (previousValue, currentValue) {
            if (previousValue.Sequence === 0) {
                return 0;
            }
            return Math.max(previousValue.Sequence || previousValue, currentValue.Sequence);
        }) + 1;
    };

    ListManagerCls.prototype.sequenceAddList = function (mainList, newSequenceList) {
        newSequenceList.forEach(function (item) {
            if (mainList.length < 1) {
                item.sequence = 1;
            }
            item.sequence = mainList.reduce(function (previousValue, currentValue) {
                if (previousValue.Sequence === 0) {
                    return 0;
                }
                return Math.max(previousValue.Sequence || previousValue, currentValue.Sequence);
            }) + 1;
        });
    };

    ListManagerCls.prototype.sortAlphabetically = function(list) {
        if (!list || list.length ===0) {
            return [];
        }
        list.forEach(function (element) {
                element.disable = _i.ko.observable(false);
            });
            list.sort(function (a, b) {
                var nameA = a.name.toUpperCase(); // ignore upper and lowercase
                var nameB = b.name.toUpperCase(); // ignore upper and lowercase
                if (nameA < nameB) {
                    return -1;
                }
                if (nameA > nameB) {
                    return 1;
                }

                return 0;
            });
            return list;
    };


    return new ListManagerCls();
});

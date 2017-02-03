define(function(require) {
	var _i = {
		$: require('jquery'),
		ko: require('knockout')
	};

	function splitUp(arr, n) {
		var rest = arr.length % n, // how much to divide
			restUsed = rest, // to keep track of the division over the elements
			partLength = Math.floor(arr.length / n),
			result = [];

		for (var i = 0; i < arr.length; i += partLength) {
			var end = partLength + i,
				add = false;

			if (rest !== 0 && restUsed) { // should add one element for the division
				end++;
				restUsed--; // we've used one division element now
				add = true;
			}

			result.push(arr.slice(i, end)); // part of the array

			if (add) {
				i++; // also increment i in the case we added an extra element for division
			}
		}

		return result;
	}

	function forRender(arr, data) {
		//Need to determine if I need 1,2,3 columns
		//$(arr[1]).addClass('testo');
		//arr[1].className = "";
		if (_i.ko.utils.domData.get(arr)) {
			var foo = 'bar';
		}
	}


	_i.ko.bindingHandlers.columnbuilder = {
		init: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
			var $element = _i.$(element);
			var value = _i.ko.unwrap(valueAccessor());
			//need to pass in selectedClassId too
			var leftArray = _i.ko.observableArray([]);
			var middleArray = _i.ko.observableArray([]);
			var rightArray = _i.ko.observableArray([]);

			var splitArray = splitUp(value.data(), 3);

			leftArray(splitArray[0]);
			middleArray(splitArray[0]);
			rightArray(splitArray[0]);

			var newAccessor = function() {
				return {
					data: value.data,
					afterAdd: value.afterAdd,
					beforeRemove: value.beforeRemove
				}
			};
			return _i.ko.bindingHandlers.foreach.init(element, newAccessor, allBindings, viewModel, bindingContext);

		},
		update: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
			var value = _i.ko.unwrap(valueAccessor());

			var newAccessor = function() {
				return {
					data: value.data,
					afterAdd: value.afterAdd,
					beforeRemove: value.beforeRemove,
				}
			};

			_i.ko.bindingHandlers.foreach.update(element, newAccessor, allBindings().columnbuilder, viewModel, bindingContext);

		}
	};
});

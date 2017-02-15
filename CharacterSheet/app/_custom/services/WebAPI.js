define(function(require) {
	var _i = {
		$: require('jquery'),
		deferred: require('_custom/deferred')
	};

	function ApiCls() {}
	ApiCls.prototype.ajax = function(config) {
		var dfd = _i.$.Deferred();
		var promise = _i.$.ajax(config);
		promise.done(function() {
			dfd.resolve.apply(this, arguments);
		}).fail(function(jqXHR, textStatus, errorThrown) {
			dfd.reject.apply(this, arguments);
		});

		return dfd.promise();
	};

	ApiCls.prototype.get = function(url, data) {
		//https://docs.cloudant.com/document.html https://docs.cloudant.com/database.html#get-documents
		//  /_all_docs?keys=["somekey","someotherkey"]

		return this.ajax({
			type: 'GET',
			url: url,
			headers: {
				"Authorization": "Basic " + btoa('ksweet007' + ":" + '@Manda!!o5'),
				"Content-Type": "application/json"
			},
			dataType: 'json',
			data: data
		});
	};

	ApiCls.prototype.getJSON = function(url, data) {
		return this.ajax({
			url: url,
			data: JSON.stringify(data),
			headers: {
				"Content-Type": "application/json"
			},
			dataType: 'json'
		});
	};

	ApiCls.prototype.getlocal = function(url, data) {
		return _i.$.getJSON(url, data);
	};

	ApiCls.prototype.put = function(url, data) {
		return this.ajax({
			headers: {
				"Content-Type": "application/json"
			},
			url: url,
			data: JSON.stringify(data),
			method: 'PUT'
		});
	};

	ApiCls.prototype.post = function(url, data) {
		return this.ajax({
			url: url,
			headers: {
				"Content-Type": "application/json"
			},
			dataType: 'json',
			data: JSON.stringify(data),
			method: 'POST'
		});
	};

	ApiCls.prototype.delete = function(url, data) {
		//   https://$USERNAME.cloudant.com/$DATABASE/$DOCUMENT_ID?rev=$REV
		return this.ajax({
			url: url,
			data: JSON.stringify(data),
			method: 'DELETE',
			dataType: 'json'
		});
	};

	ApiCls.prototype.universal = function(url, data, method, async) {
		return this.ajax({
			url: url,
			data: JSON.stringify(data),
			method: method.toUpperCase(),
			async: async !== false
		});
	};

	ApiCls.prototype.AddClass = function(classToAdd) {
		var stringifiedObj = JSON.stringify(classToAdd);

		_i.$.ajax({
			type: 'POST',
			url: 'https://ksweet007.cloudant.com/classes',
			headers: {
				"Authorization": "Basic " + btoa('ksweet007' + ":" + '@Manda!!o5'),
				"Content-Type": "application/json"
			},
			data: stringifiedObj,
			dataType: 'application/json'

		}).done(function(data) {
			console.log(data);
		});
	};
	return new ApiCls();
});

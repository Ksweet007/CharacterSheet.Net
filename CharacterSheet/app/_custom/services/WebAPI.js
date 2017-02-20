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
		return this.ajax({
			type: 'GET',
			url: url,
			headers: {
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
            type: 'PUT',
            contentType: "application/json; charset=utf-8",
			url: url,
			data: JSON.stringify(data)
		});
	};

	ApiCls.prototype.post = function(url, data) {
		return this.ajax({
			url: url,
			headers: {
				"Content-Type": "application/json"
			},
			dataType: 'application/json',
			data: JSON.stringify(data),
			method: 'POST'
		});
	};

	ApiCls.prototype.delete = function(url, data) {
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

	return new ApiCls();
});

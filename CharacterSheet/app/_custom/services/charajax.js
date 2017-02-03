define('services/WebAPI', function() {
	var _i = {
		$: require('jquery'),
		deferred: require('_custom/deferred')
	};

	function ApiCls() {};

	ApiCls.prototype.ajax = function() {
		config = _i.$.extend({
            url: 'https://ksweet007.cloudant.com/' + config.url,
            headers:{
                Authorization: 'Basic' + btoa('ksweet007' + ":" + '@Manda!!o5'),
                contentType: 'application/json',
            },
			dataType: 'application/json',
		}, config);

		var dfd = _i.$.Deferred();
        var promise = _i.$.ajax(config);
        promise.done(function () {
                    dfd.resolve.apply(this, arguments);
        }).fail(function (jqXHR, textStatus, errorThrown) {
            dfd.reject.apply(this, arguments);
        });
	};

	ApiCls.prototype.getJSON = function(url, data) {
        //  https://$USERNAME.cloudant.com/$DATABASE/_all_docs
        //  /_all_docs?keys=["somekey","someotherkey"]
        // Need to give Creates an ID
        // Key acts as the unique identifier in this table so classname, or powersource for class
        //When saving someones character the key needs to be their username, maybe a GUID?
		//var stringifiedObj = JSON.stringify(datatosend);

		return this.ajax({
			url: 'https://ksweet007.cloudant.com/classes',
			data: JSON.stringify(data)
		});
	};

    ApiCls.prototype.put = function (url, data) {
        //   https://$USERNAME.cloudant.com/$DATABASE/$DOCUMENT_ID
        return this.ajax({
            url: url,
            data: JSON.stringify(data),
            method: 'PUT'
        });
    };

    ApiCls.prototype.post = function (url, data) {
        //  https://$USERNAME.cloudant.com/$DATABASE
        return this.ajax({
            url: url,
            data: JSON.stringify(data),
            method: 'POST'
        });
    };

    ApiCls.prototype.delete = function (url, data) {
        //   https://$USERNAME.cloudant.com/$DATABASE/$DOCUMENT_ID?rev=$REV
        return this.ajax({
            url: url,
            data: JSON.stringify(data),
            method: 'DELETE',
            dataType: 'text'
        });
    };

    ApiCls.prototype.universal = function (url, data, method, async) {
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

        return new ApiCls();
	};


});

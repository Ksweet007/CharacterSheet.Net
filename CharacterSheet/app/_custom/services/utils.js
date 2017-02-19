define(function(require){
    var _i = {
		$: require('jquery')
	};

    function UtilsCls() {};

    UtilsCls.prototype.escapeJSON = function(str){
      return str.replace(/\n/g, "\\\\n").replace(/\r/g, "\\\\r").replace(/\t/g, "\\\\t");
    };

    // UtilCls.prototype.getArrayFromObj = function(obj) {
    //     return Object.keys(obj).map(function(key) { return obj[key]; });
    // };

    return new UtilsCls();

});

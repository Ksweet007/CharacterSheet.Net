define(function(require){
    var _i = {
		$: require('jquery'),
		deferred: require('_custom/deferred'),
        charajax: require('_custom/services/WebAPI')
	};

    function UtilsCls() {};

    UtilsCls.prototype.saveFile = function(text, filename) {
        var a = document.createElement('a');
        a.setAttribute('href', 'data:text/plain;charset=utf-u,' + encodeURIComponent(text));
        a.setAttribute('download', filename);
        a.click()
    };

    UtilsCls.prototype.readFiles = function(item, evt){
    //https://www.html5rocks.com/en/tutorials/file/dndfiles/
    //https://www.w3.org/TR/file-upload/
        var files = evt.target.files;
        var output = [];
        for (var i = 0, f; f = files[i]; i++) {
            var file = f;

            var reader = new FileReader();

            //read into memory
            reader.readAsText(file);
            reader.onload = loaded;
        }

    };

    UtilsCls.prototype.readDocsToSingleFile = function(item, evt){
    //https://www.html5rocks.com/en/tutorials/file/dndfiles/
    //https://www.w3.org/TR/file-upload/

        return _i.charajax.get('classes/_all_docs?include_docs=true').done(function(response){
            var files = _i.$.map(response.rows, function(obj, index) {
                var item = obj.doc;
                item.id = obj.id;
                item.key = obj.key

                return item;
            });

            saveLocalFile(JSON.stringify(files),'allclasses.txt');
        });

    };

    function saveLocalFile(text, filename){
        var a = document.createElement('a');
        a.setAttribute('href', 'data:text/plain;charset=utf-u,' + encodeURIComponent(text));
        a.setAttribute('download', filename);
        a.click()
    }


    function writeToSingleFile(evt){
        var fileString = evt.target.result;
        var asObject = JSON.parse(fileString);
        asObject._id = asObject.name;
        return asObject;
    }

    function loaded(evt){
        var fileString = evt.target.result;
        var asObject = JSON.parse(fileString);
        asObject._id = asObject.name;

        _i.charajax.post('subraces/', asObject).done(function(response){

        });
    }

    return new UtilsCls();

});

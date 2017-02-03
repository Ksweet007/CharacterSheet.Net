define(function(require) {

//This file is an example of how to bring back a list of JSON objects with a type associated to the index

	// var classes = _i.classlist.getClass;
	// self.data = classes();
	// var barbie = self.data["Barbarian"];
	// for(var i in self.data){
	// 	self.classList.push([i,self.data[i]]);
	// }
	function CharCopCls() {}

	CharCopCls.prototype.getClass = function() {
		return{
			"Barbarian" : {
				"name": "Barbarian"
			},
			"Bard":{
				"name": "Bard"
			}
		}

	}
	return new CharCopCls();
});

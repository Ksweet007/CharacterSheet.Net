define(function(require) {
	var _i = {
		ko: require('knockout'),
		$: require('jquery'),
		search: require('_custom/services/search'),
		charajax: require('_custom/services/WebAPI'),
		app: require('durandal/app'),
		list: require('_custom/services/listmanager'),
		deferred: require('_custom/deferred'),
		system: require('durandal/system')
	};

	return function() {
		var self = this;
		self.thirdVm = _i.ko.observable();
		self.data = null;
		self.classId = null;
        self.RestTypeList =[
			{
				Name:"Long Rest"
			},{
				Name:"Short Rest"
			}];

		/*FEATURES*/
		self.features = _i.ko.observableArray([]);
        self.featuresList = _i.ko.observableArray(_i.ko.utils.arrayMap(self.features(), function(prof) {
            return {
                FeatureId : 0,
                Name : '',
                Description : '',
                ActionType : '',
                RecoveryType : '',
                Levelgained : 0,
                ClassId : self.classId,
                RestType: _i.ko.observable(),
                RestTypeList : self.RestTypeList
            };
        }));

		self.activate = function(id) {
			self.classId = id;
			return self.getFeatureData().done(function(response) {
				_i.system.log('Third Tab Activated');
				self.loadObservables(id);
			});
		}

		self.getFeatureData = function() {
            var deferred = _i.deferred.create();
			return _i.charajax.getJSON('api/GetClassFeatures/' + self.classId).done(function(response) {
				response.forEach(function(item){
					item.RestTypeList = self.RestTypeList;
					item.RecoveryType = _i.ko.observable('');
					self.features().push(item);
				});


                deferred.resolve();
			});
            return deferred;
		};

		self.addFeature = function(obj, evt) {

			var deaturesToSave = self.proficiencies();

			// _i.charajax.put('/api/AddProficiencies', profsToSave).done(function(response) {
			// 	console.log('Added Proficiency ---> ' + response);
			// });
		};

		self.addFeature = function() {
			var newObj = {};
			newObj.FeatureId = 0;
			newObj.Name = self.profTypeList;
			newObj.Description = '';
            newObj.ActionType = '';
            newObj.RecoveryType = '';
            newObj.Levelgained = 0;
            newObj.ClassId = self.classId;
            newObj.RestTypeList = self.RestTypeList;

            self.features.push(newObj);
		};

        // self.addProf = function() {
        //     var newObj = {};
        //     newObj.ProficiencyId = 0;
        //     newObj.ProficiencyTypeList = self.profTypeList;
        //     newObj.Name = '';
        //
        //     self.proficienciesToAdd.push({ProficiencyId: 0,ProficiencyTypeId:0, ProficiencyTypeList: self.profTypeList, Name: ""});
        // };

		self.deactivate = function() {
			return _i.system.log('Second Tab Deactivated');
		}

		self.loadObservables = function(id) {
			self.thirdVm({id: id, name: 'Proficiencies'});
		}

	};

});

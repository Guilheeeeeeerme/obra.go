module.exports = function(module){

	module.service('QuestService', QuestService);

	QuestService.$inject = ['$http'];

	function QuestService($http){

		var url = 'https://159.203.178.207/';

		return {
			getQuests: getQuests
		}

		function getQuests(){
			return $http.get( url + 'api/quest.json');
		}
	
	}
}






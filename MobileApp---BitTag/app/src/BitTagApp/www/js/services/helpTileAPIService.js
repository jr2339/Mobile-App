angular.module('helpTileApp.services')

.factory('helpTileAPIService', ['$http', function($http){

	var helpTileAPIService = {};
	var user = {};

	helpTileAPIService.login = function(username, password){
		var url = "api/b2user/b2user/jsonLogin?username=" + username + "&password=" + password;
		return $http.get(url);
	};

	helpTileAPIService.getTiles = function(searchTerm, pageNumber){
		var url = "api/ht/jsonSearch/query/" + searchTerm + "/page/0/itemsPerPage/20";
		return $http.get(url);
	};

	helpTileAPIService.addComment = function(tileid, comment){
		var url = "api/ht/jsonCreateComment/id/" + tileid + "?tileid=" + tileid + "&comment=" + comment;
		return $http.get(url);
	};

	helpTileAPIService.addNewCollection = function(collectionName){
		var url = "api/collection/jsonCreate?name=" + collectionName;
		return $http.get(url);
	}

	helpTileAPIService.addToCollection = function(tileId, collectionId){
		var url = "api/ht/jsonAddToCollection?collectionId=" + collectionId + "&id=" + tileId;
		return $http.get(url);
	}

	helpTileAPIService.removeFromCollection = function(tileId, collectionId){
		var url = "api/ht/jsonRemoveFromCollection?collectionId=" + collectionId + "&id=" + tileId;
		return $http.get(url);
	}

	helpTileAPIService.setUser = function(username) {
		user = username;
	};

	helpTileAPIService.getUser = function(){
		return user;
	};

	helpTileAPIService.checkCurrentUser = function(){
		return $http.get('api/b2profile/jsonCurrentUser');
	}

	return helpTileAPIService;
}]);

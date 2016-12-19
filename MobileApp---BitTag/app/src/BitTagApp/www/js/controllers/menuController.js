angular.module('helpTileApp.controllers')

.controller('MenuCtrl', ['$scope', '$location', function($scope, $location){

	$scope.isActive = function(viewLocation)
	{
		return $location.path() != '/app/login';
	}

}]);
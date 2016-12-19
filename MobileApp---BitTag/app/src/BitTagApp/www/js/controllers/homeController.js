angular.module('helpTileApp.controllers')

.controller('HomeCtrl', ['$rootScope', '$scope', '$http', 'helpTileAPIService', '$ionicHistory', '$state', function($rootScope, $scope, $http, helpTileAPIService, $ionicHistory, $state){

	$scope.search = {};

	$scope.homeTiles = [];

	$scope.mode = "Your Tiles";



	$scope.updateTiles = function(){
		helpTileAPIService.checkCurrentUser()
		.success(function(response){
			if(response[0].result != "false"){
				var displayName = response[0].displayName;
				displayName = displayName.replace(/(\w+).*/,"$1");
				helpTileAPIService.setUser(response[0]);
				helpTileAPIService.getTiles(displayName)
				.success(function(response) {
					$scope.homeTiles = response[0];
				});
			}else{
				$ionicHistory.nextViewOptions({disableBack: true});
				//redirects to our home page
				$state.go('app.login');
			}
		});
	};

	$scope.search = function(){
		$scope.homeTiles = [];
		if($scope.search.term == ''){
			$scope.updateTiles();
			return;
		}
		helpTileAPIService.getTiles($scope.search.term)
		.success(function(response) {
			$scope.homeTiles = response[0];
		});
	}

	$scope.$on('updateTiles', function(){
		$scope.updateTiles();
	});

	$scope.$watch('homeTiles', function(){
		$rootScope.$broadcast('tileupdate', $scope.homeTiles);
		if($scope.homeTiles.length == 0){
			$scope.mode = "Your Tiles";
		}else{
			$scope.mode = "Results";
		}
	});
	$scope.updateTiles();

}]);

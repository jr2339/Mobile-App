angular.module('helpTileApp.controllers')

.controller('LogInCtrl', ['$scope', '$state', '$http', '$ionicHistory', 'helpTileAPIService', function($scope, $state, $http, $ionicHistory, helpTileAPIService){

	$scope.getUsername = function(){
		var username = window.localStorage.getItem("username");
		return username ? username : "";
	};

	$scope.getPassword = function(){
		var password = window.localStorage.getItem("password");
		return password ? password : "";
	};

	$scope.saveData = function(){
		window.localStorage.setItem("username", $scope.current.name);
		window.localStorage.setItem("password", $scope.current.password);
		$scope.stored.name = $scope.getUsername();
		$scope.stored.password = $scope.getPassword();

		var username = $scope.stored.name;
		var password = $scope.stored.password;

		//Service function to store username and password and log the user in
		helpTileAPIService.login(username, password)
		.success(function(response) {
			console.log(response);
			if (response[0].displayName!=null) {
				var displayName = response[0].displayName;
				displayName = displayName.replace(/(\w+).*/,"$1");
				helpTileAPIService.setUser(response[0]);
				$ionicHistory.nextViewOptions({disableBack: true});
				//redirects to our home page
				$state.go('app.home');
			}
			else{
				alert('Username and/or Password is incorrect!');
				$scope.current.name = "";
				$scope.current.password = "";
			}
		});
	};

	$scope.current = {};
	$scope.current.name = $scope.getUsername();
	$scope.current.password = $scope.getPassword();
	$scope.stored = angular.copy($scope.current);
}]);

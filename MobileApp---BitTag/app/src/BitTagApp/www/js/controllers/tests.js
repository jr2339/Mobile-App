describe('HelpTile', function ()
{
  beforeEach(angular.mock.module('helpTileApp.controllers'));

  var $controller;

  beforeEach(angular.mock.inject(function(_$controller_)
  {
	  $controller = _$controller_;
  }));

  describe('isEmpty', function()
  {
	  it('should return true since there are zero tiles in array', function()
	  {
		  var $scope;
		  var controller = $controller('TileCtrl', {$scope : $scope});
		  expect($scope.tiles.isEmpty()).toBe(true);
	  });
  });

  describe('showCommentBox', function()
  {
	  it('should return true for comment box and false for everything else', function()
	  {
		  var $scope;
		  var controller = $controller('TileCtrl', {$scope : $scope});
		  $scope.setBoxState('tileid', 1);
		  expect($scope.commentBoxVisible('tileid').toBe(true);
		  expect($scope.shareBoxVisible('tileid').toBe(false);
		  expect($scope.organizeBoxVisible('tileid').toBe(false);
	  });
  });
});
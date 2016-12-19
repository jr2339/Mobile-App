angular.module('helpTileApp.controllers')

.controller('TileCtrl', ['$scope', 'helpTileAPIService', function($scope, helpTileAPIService){
	$scope.tiles = [];

	$scope.currentUser = {};

	/*
		For Box States
		0 = None
		1 = Comment Box
		2 = Share Box
	*/
	$scope.boxStates = [];

	$scope.comment = "";

	$scope.collection = "";

	$scope.isEmpty = function(){
		if($scope.tiles.length == 0){
			return true;
		}else{
			return false;
		}
	};

	$scope.$on('tileupdate', function(event, data){
		$scope.tiles = data;
		//$scope.boxStates = [];
		$scope.currentUser = helpTileAPIService.getUser();
	});

	$scope.followTag = function(link){
		console.log(link);
		var count = 0;
		var ref = window.open(link.siteUrl, '_blank', 'hidden=false');
		ref.addEventListener('loadstop', function(){
			if(count == 0){
				console.log('doneLoading');
				ref.executeScript({file: "https://code.jquery.com/jquery-2.2.1.min.js"}, function(){
					console.log('executing');
					ref.executeScript({file: "https://www.cefns.nau.edu/~jrf254/test.js"});
				});
				count = 1;
			}else if(count == 1){
				console.log('executing');
				ref.executeScript({file: "https://www.cefns.nau.edu/~jrf254/test.js"});
				count = 2;
			}else{
				console.log('done doing');
			}

		});
		ref.show();
	}

	$scope.setBoxState = function(tileid, state){
		$scope.boxStates[tileid] = state;
	}

	$scope.toggleCommentBox = function(tileid){
		$scope.setBoxState(tileid, $scope.boxStates[tileid] == 1 ? 0 : 1);
	}

	$scope.toggleShareBox = function(tileid){
		$scope.setBoxState(tileid, $scope.boxStates[tileid] == 2 ? 0 : 2);
	}

	$scope.toggleOrganizeBox = function(tileid){
		$scope.setBoxState(tileid, $scope.boxStates[tileid] == 3 ? 0 : 3);
	}

	$scope.commentBoxVisible = function(tileid){
		return $scope.boxStates[tileid] == 1;
	}

	$scope.shareBoxVisible = function(tileid){
		return $scope.boxStates[tileid] == 2;
	}

	$scope.organizeBoxVisible = function(tileid){
		return $scope.boxStates[tileid] == 3;
	}

	$scope.addComment = function(tile){
		helpTileAPIService.addComment(tile.id, $scope.comment)
		.success(function(response){
			$scope.$emit('updateTiles');
		});

		$scope.comment = "";
	}

	$scope.addNewCollection = function(tile){
		helpTileAPIService.addNewCollection($scope.collection)
		.success(function(response){
			$scope.addToCollection(tile.id, response[0].id);
		});
	}

	$scope.addToCollection = function(tile, collection){
		var tileMatch = findTile(tile.id);
		if(tileMatch){
			tileMatch.collections.push(collection);
		}
		helpTileAPIService.addToCollection(tile.id, collection.id)
		.success(function(response){
			if(!response[0].approved && tileMatch){
				tileMatch.collections.pop();
			}
		});
	}

	$scope.removeFromCollection = function(tile, collection){
		var tileMatch = findTile(tile.id);
		if(tileMatch){
			tileMatch.collections.forEach(function(item, index){
				if (item.id == collection.id){
					tileMatch.collections.splice(index, 1);
				}
			});
		}
		helpTileAPIService.removeFromCollection(tile.id, collection.id)
		.success(function(response){
			var index = tileMatch.collections.indexOf(collection);
			if(index > -1){
				tileMatch.collections.push(collection);
			}
		});
	}

	$scope.inUserCollection = function(collectionId, collection){
		var i = collection.length;
		while(i--){
			if(collectionId == collection[i].id){
				return true;
			}
		}
		return false;
	}

	$scope.shareTile = function(link){
		var ref = window.open(link, '_system', 'hidden=false');
	}

	findTile = function(tileId){
		var returnTile = null;
		$scope.tiles.forEach(function(tile){
			if (tile.id == tileId){
				returnTile = tile;
			}
		});
		return returnTile;
	}
}]);

function triviaCtrl($scope, $http){
	var url = "https://www.googleapis.com/freebase/v1/mqlread";

	$scope.songs = [];

	$scope.submitArtist = function(){
		buildArtistQuery($scope.artistName);
	};

	// Separating out the query building from the app logic
	buildArtistQuery = function(name){
		var query = {
			'name': name,
			'type': '/music/artist',
			'/music/artist/album': [{
				"name": null,
				"id": null,
				"releases": [{
					"track": []
				}]
			}]
		};

		accessFreebase({query: JSON.stringify([query])}, parseAlbums);
	};

	// Abstracted MQL query method; stub for refactoring
	accessFreebase = function(params, parserMethod){
		$http.get(url, {params: params})
			.success(function(data, status, headers, config){
				parserMethod(data);
			}).error(function(data, status, headers, config){
				console.log(status + ': ERROR');
			});
	};

	// Abstracted album parsing
	parseAlbums = function(data){
		albums = data.result[0]['/music/artist/album'];
		console.log(albums);
		
		// for(i = 0; i < albums.length; i++){
			// console.log(albums[i]);
			// buildAlbumQuery(albums[i]);
		// }
	};

	// Abstracted song selection logic
	parseSongs = function(data){
		console.log(data.result);
	};
}
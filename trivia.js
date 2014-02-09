function triviaCtrl($scope, $http){
	var url = "https://www.googleapis.com/freebase/v1/mqlread";

	$scope.submitArtist = function(){
		// this.artist = $scope.artistName;

		buildArtistQuery($scope.artistName);
	};

	// Separating out the query building from the app logic
	buildArtistQuery = function(name){
		var query = {
			'name': name,
			'id': null,
			'type': '/music/artist',
			'/music/artist/album': []
		};

		accessFreebase({query: JSON.stringify([query])}, parseAlbums);
	};

	buildAlbumQuery = function(name){
		// var query = {
		// 	'name': null,
		// 	'type': '/music/album',
		// 	'/music/artist': []
		// };

		// accessFreebase({query: JSON.stringify([query])}, parseSongs);
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
		console.log(data.result);
		albums = data.result[0]['/music/artist/album'];
		
		for(i = 0; i < albums.length; i++){
			console.log(albums[i]);
			// buildAlbumQuery(albums[i]);
		}
	};

	// Abstracted song selection logic
	parseSongs = function(data){
		console.log(data.result);
	};
}
function triviaCtrl($scope, $http){
	var url = "https://www.googleapis.com/freebase/v1/mqlread";

	$scope.submitArtist = function(){
		buildParams($scope.artistName, true);
	};

	// Separating out the query building from the app logic
	buildParams = function(name, userSubmission){
		var query,
			parserMethod;

		if(userSubmission){
			query = {
				'name': name,
				'type': '/music/artist',
				'/music/artist/album': []
			};
			parserMethod = parseAlbums;
		}else{
			query = {
				'name': name,
				'type': '/music/album',
				'/music/album/tracks': []
			};
			parserMethod = parseSongs;
		}

		accessFreebase({query: JSON.stringify([query])}, parserMethod);
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
		
		for(i = 0; i < albums.length; i++){
			parseSongs(albums[i]);
		}
	};

	// Abstracted song selection logic
	parseSongs = function(data){
		console.log(data);
	};
}
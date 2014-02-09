function triviaCtrl($scope, $http){
	var url = "https://www.googleapis.com/freebase/v1/mqlread";

	$scope.submitArtist = function(){
		buildParams($scope.artistName, true);
	};

	// Separating out the query building from the app logic
	buildParams = function(name, userSubmission){
		var query = {
				'name': name,
				'type': '/music/artist',
				'/music/artist/album': []
			};

		var params = {
			query: [[query]]
		};

		accessFreebase(params);
	};

	// Abstracted MQL query method; stub for refactoring
	accessFreebase = function(params){
		$http.get(url, {params: params})
			.success(function(data, status, headers, config){
				parseAlbums(data);
			}).error(function(data, status, headers, config){
				console.log(status + ': ERROR');
			});
	};

	// Abstracted album parsing
	parseAlbums = function(data){
		albums = data.result[0]['/music/artist/album'];
		console.log(albums);
	};

	// Abstracted song selection logic
	parseSongs = function(data){

	};
}
function triviaCtrl($scope, $http){
	var url = "https://www.googleapis.com/freebase/v1/mqlread";

	$scope.submitArtist = function(){
		console.log($scope.artistName);

		var params = {
			query: [[{
				'name': $scope.artistName,
				'type': '/music/artist',
				'/music/artist/album': []
			}]]
		};

		$http.get(url, {params: params})
			.success(function(data, status, headers, config){
				parseAlbums(data);
			}).error(function(data, status, headers, config){
				console.log(status + ': ERROR');
			});
	};

	// Abstracted MQL query method; stub for refactoring
	accessFreebase = function(){

	};

	// Abstracted album parsing
	parseAlbums = function(data){
		albums = data.result[0]['/music/artist/album'];
	};

	// Abstracted song selection logic
	parseSongs = function(data){
		
	};
}
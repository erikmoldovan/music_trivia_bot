function triviaCtrl($scope, $http){

	// VARIABLE DECLARATION

	var url = "https://www.googleapis.com/freebase/v1/mqlread";
	var $notification = $('.notification');

	$scope.songs = [];
	$scope.answer = {};

	// SCOPE METHODS

	// Handles form submission and processing
	$scope.submitArtist = function(){
		// Reset songs model
		$scope.songs = [];
		$scope.answer = {};

		if(!$scope.artistName){
			$notification.text('Please enter a valid music artist name')
				.addClass('red')
				.fadeIn("fast");
		}else{
			$notification.fadeOut("fast");

			buildArtistQuery($scope.artistName);
			$('.questions').fadeIn();
		}
	};

	// Handles answer check
	$scope.checkAnswer = function(e){
		if(this.song.album_name == $scope.answer.album_name){
			$notification.text('Correct!')
				.addClass('green');
		}else{
			$notification.text('Wrong answer. It was \"' + $scope.answer.track + '\"')
				.addClass('red');
		}

		$notification.slideDown();
	}

	// HELPER FUNCTIONS

	// Separating out the query building from the app logic
	buildArtistQuery = function(name){
		var query = {
			'name': name,
			'type': '/music/artist',
			'/music/artist/album': [{
				"name": null,
				"releases": [{
					"track": []
				}]
			}]
		};

		accessFreebase({query: JSON.stringify([query])}, parseAlbums);
	};

	// Abstracted MQL query method
	accessFreebase = function(params, parserMethod){
		$http.get(url, {params: params})
			.success(function(data, status, headers, config){
				parserMethod(data);
			}).error(function(data, status, headers, config){
				console.log(status + ': ERROR');
			});
	};

	// Generate random number
	generateRand = function(array){
		return Math.floor(Math.random() * array.length);
	};

	// Abstracted album parsing
	parseAlbums = function(data){
		var maxItems = 5;
		var albums = data.result[0]['/music/artist/album'];

		for(i = 0; i < maxItems; i++){
			var canPass = false;

			do{
				// Randomize the album selected for fun
				var album = albums[generateRand(albums)],
					tracks = album.releases[0].track,
					track = tracks[generateRand(tracks)];

				// Makes sure that the edge case of an undefined track does not happen
				// It happens more than you think...
				if(track != undefined) canPass = true;
			}while(!canPass);

			$scope.songs.push({
				"album_name": album.name,
				"track": track
			});
		}

		$scope.answer = $scope.songs[generateRand($scope.songs)];
	};
}
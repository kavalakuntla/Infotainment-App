var app = angular.module('wikiApp', ["ngRoute"]).config(function($sceDelegateProvider) {
  $sceDelegateProvider.resourceUrlWhitelist(['**']);
});

app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "wiki.htm"
    })
    .when("/wikiSearch", {
        templateUrl : "wikiSearch.htm",
        controller : "wikiCtrl"
    })
    .when("/movies", {
        templateUrl : "movies.htm",
        controller : "moviesCtrl"
    })
    .when("/movie-info", {
        templateUrl : "movieinfo.htm",
        controller : "moviesCtrl"
    })
    .when("/songs", {
        templateUrl : "songs.htm",
        controller : "songsCtrl"
    })
    .when("/song-info", {
        templateUrl : "songinfo.htm",
        controller : "songsCtrl"
    })
});

app.controller('wikiCtrl', function($scope,$http) {
	$scope.randomLink = "https://en.wikipedia.org/wiki/Special:Random";
	$scope.searchWiki = function() {
		$scope.searchTermArr = [];
		url='https://en.wikipedia.org/w/api.php?action=opensearch&search='+$scope.searchTerm+'&format=json';
		$http.jsonp(url).then(function(response){
			$scope.searchTermArr.push(response.data[1]);
			$scope.searchTermArr.push(response.data[2]);
			$scope.searchTermArr.push(response.data[3]);
		});
	 }
});

app.controller('moviesCtrl', function($scope, $rootScope, $http) {
	$rootScope.moviesArray = [];
	$scope.searchMovies = function() {
		url = 'http://www.omdbapi.com/?s='+$scope.searchTerm+'&apikey=dae5e797';
		$http.jsonp(url).then(function(response){
  			$rootScope.moviesArray.push(response.data.Search);
  			console.log($rootScope.moviesArray[0][1]);
		})
 	}

 	$scope.movieInfo = function(id) {
 		$rootScope.movie = {}
 		$rootScope.movieTitle = 'Haooo'
 		url = 'http://www.omdbapi.com/?i='+id+'&apikey=dae5e797';
 		$http.jsonp(url).then(function(response){
 				$rootScope.movie  = response.data;	
  				$rootScope.movieTitle = $rootScope.movieinfo.Title;
  				console.log($rootScope.movie);
		});
 	};
 })

app.controller('songsCtrl', function($scope, $rootScope, $http) {
	$scope.searchSongs = function() {
		$scope.songsArray = [];
		url = 'http://ws.audioscrobbler.com/2.0/?method=track.search&api_key=9b71656a42d8a0793da8570274f7cf6e&track='+$scope.searchTerm+'&format=json';
		$http.get(url).then(function(response){
			$scope.songsArray.push(response.data.results.trackmatches.track);
			console.log($scope.songsArray)
		})
 	}

 	$scope.songInfo = function(id) {
 		$rootScope.song = {}
 		url = 'http://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=9b71656a42d8a0793da8570274f7cf6e&mbid='+id+'&format=json';
 		$http.jsonp(url).then(function(response){
  			$rootScope.song = response.data.track;
		});
 	};
});


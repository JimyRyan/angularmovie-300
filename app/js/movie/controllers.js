"use strict";

angular.module('angularMovieCore').controller("homeController", function($scope) {

  $scope.user = '';

});

angular.module('angularMovieCore').controller("loadingController", function($scope, $rootScope) {

  $rootScope.$on('$stateChangeStart' ,function() {
      console.log('start');
  });

  $rootScope.$on('$stateChangeStart' ,function() {
    console.log('start');
  });

});

angular.module('angularMovieCore').controller("moviesController", function($scope, Movie) {

  // display mode by default
  $scope.tableView = false;
  // icon by mode by default
  $scope.tableViewIcon = 'icon-th icon-white';

  // function called when changing view mode
  $scope.toogleView = function() {
    $scope.tableView = !$scope.tableView;

    if ($scope.tableView === false) {
      $scope.tableViewIcon = 'icon-th-list icon-white';
    } else {
      $scope.tableViewIcon = 'icon-th icon-white';
    }
  };

  Movie.fetch().success(function(resp) {
    $scope.movies = resp;
  });

  $scope.deleteMovie = function(index) {
    Movie.remove($scope.movies[index].id)
      .success(function(resp) {
        $scope.movies.splice(index, 1);
      }
    );
  };

});

angular.module('angularMovieCore').controller('editMovieController', function(movie, $scope, Movie, $location) {

  $scope.movie = movie;


  $scope.updateMovie = function(movie) {
    Movie.update(movie)
      .success(function() {
        $location.path('/movies');
      })
      .error(function(resp) {
        console.log(resp);
      });
  };
});

angular.module('angularMovieCore').controller("movieFormController", function($scope, Movie) {

  $scope.showAlert = false;

  $scope.addMovie = function(movie) {
    Movie.create(movie)
      .success(function(movie) {
        $scope.movies.push(movie);
        $scope.movie     = {};
        $scope.showAlert = false;
        $('#movie-form-modal').modal('hide');
      })
      .error(function(resp, statusCode) {
        console.log('Error : ' + statusCode);
      });
  };
});

"use strict";

angular.module('angularMovieApp', ['ngRoute', 'angularMovieUI', 'angularMovieCore']);

angular.module('angularMovieApp').config(function($routeProvider, MovieProvider) {
  $routeProvider
    .when('/home', {
      templateUrl : 'partials/home.html',
      controller  : 'homeController'
    })
    .when('/movies', {
      templateUrl : 'partials/movies.html',
      controller  : 'moviesController'
    })
    .when('/movies/edit/:id', {
      templateUrl : 'partials/edit.html',
      controller  : 'editMovieController'
    })
    .otherwise({
      redirectTo : '/home'
    });

  MovieProvider.setUri('/server/api/movies');
});
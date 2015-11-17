"use strict";

angular.module('angularMovieApp', ['ui.router', 'angularMovieUI', 'angularMovieCore']);

angular.module('angularMovieApp').config(function($stateProvider, $urlRouterProvider, MovieProvider) {

  $stateProvider
    .state('home', {
        url:    '/home',
        templateUrl : 'partials/home.html',
        controller  : 'homeController'
    })
    .state('movies', {
        url:    '/movies',
        templateUrl : 'partials/movies.html',
        controller  : 'moviesController'
    })
    .state('movies/edit/:id', {
        url:    '/movies/edit/:id',
        templateUrl : 'partials/edit.html',
        controller  : 'editMovieController',
        resolve: {
            movie: function (Movie, $stateParams) {
                return Movie.fetchOne($stateParams.id).then(function (response) {
                    return response.data;
                })
            }
        }
    });



    $urlRouterProvider.otherwise('/home');

  MovieProvider.setURI('/server/api/movies');
});
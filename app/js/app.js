"use strict";

angular.module('angularMovieApp', ['ui.router', 'pascalprecht.translate', 'angularMovieUI', 'angularMovieCore']);

angular.module('angularMovieApp').config(function($stateProvider, $urlRouterProvider, $translateProvider, MovieProvider) {

  $stateProvider
    .state('home', {
      url         : '/home',
      templateUrl : 'partials/home.html',
      controller  : 'homeController'
    })
    .state('movie', {
      url         : '/movies/:id',
      templateUrl : 'partials/movie.html',
      controller  : 'movieController',
      resolve     : {
        movie : function($stateParams, Movie) {
          return Movie.fetchOne($stateParams.id);
        }
      }
    })
    .state('movies', {
      url         : '/movies',
      templateUrl : 'partials/movies.html',
      controller  : 'moviesController'
    })
    .state('editmovie', {
      url         : '/movies/edit/:id',
      templateUrl : 'partials/edit.html',
      controller  : 'editMovieController'
    })


  $urlRouterProvider.otherwise('/home');

  MovieProvider.setURI('/server/api/movies');

  // https://github.com/angular-translate/angular-translate/wiki/Asynchronous-loading

  $translateProvider.useStaticFilesLoader({
      prefix: 'locales/',
      suffix: '.json'
  });
  $translateProvider.preferredLanguage('enUS');

});
"use strict";

angular.module('angularMovieApp', ['ui.router', 'angularMovieUI', 'angularMovieCore', 'pascalprecht.translate']);

angular.module('angularMovieApp').config(function($stateProvider, $urlRouterProvider, MovieProvider) {

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
    });


  $urlRouterProvider.otherwise('/home');

  MovieProvider.setURI('/server/api/movies');
});

angular.module('angularMovieApp').config(['$translateProvider', function ($translateProvider) {
  "use strict";
  $translateProvider.useStaticFilesLoader({
    prefix: 'locales/',
    suffix: '.json'
  });
  $translateProvider.preferredLanguage('frFR');
}]);

// Modifie pour tout les appels
/*
angular.module('angularMovieApp').config(function ($httpProvider) {
  $httpProvider.defaults.transformResponse.push
  (function (data, headerGetter) {
    return angular.fromJson(data).data;
  });
});
*/


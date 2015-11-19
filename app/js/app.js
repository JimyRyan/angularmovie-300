"use strict";

angular.module('angularMovieApp', ['ui.router', 'angularMovieUI', 'angularMovieCore', 'pascalprecht.translate', 'ngCookies', 'ui.bootstrap']);

angular.module('angularMovieApp').config(function($httpProvider, $stateProvider, $urlRouterProvider, MovieProvider, AuthProvider) {

  $httpProvider.interceptors.push('httpInterceptorService');

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
  AuthProvider.setURI('/server/auth');
});

angular.module('angularMovieApp').config(['$translateProvider', function($translateProvider) {
  "use strict";
  $translateProvider.useStaticFilesLoader({
    prefix : 'locales/',
    suffix : '.json'
  });
  $translateProvider.preferredLanguage('frFR');
}]);

// Interceptor
// Pour qu'il soit appelé, la ligne "$httpProvider.interceptors.push('httpInterceptorService');" doit être ajoutée au dessus
// Ajouter $httpProvider a la config
angular.module('angularMovieApp').factory('httpInterceptorService', httpIntService);

function httpIntService($q, $rootScope) {
  return {
    responseError: function(rejection) {
      if (rejection.status == 401) {
        console.log('401 !');
        // Send an event
        $rootScope.$emit('401_ERROR', 'need to be log');
      }
      return $q.reject(rejection);
    }
  }
}

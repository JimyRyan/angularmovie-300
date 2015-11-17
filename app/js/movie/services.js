(function() {
  "use strict";

  angular.module('angularMovieCore').provider('Movie', MovieProvider);

  function MovieProvider() {

    var _this = this;

    var API_URI = null;

    var _data = null;

    _this.setUri = function(uri) {
      API_URI = uri;
    };

    _this.$get = MovieService;

    MovieService.$inject = ['$http'];

    function MovieService($http) {

      var service = {
        fetch: function () {

          if (!_data) {
            _data = $http.get(API_URI);
          }

          return _data;
        },

        create: function (movie) {
          return $http.post(API_URI, movie);
        },

        remove: function (id) {
          return $http.delete(API_URI + '/' + id);
        },

        fetchOne: function (id) {
          return $http.get(API_URI + '/' + id);
        },

        update: function (movie) {
          return $http.put('/server/api/movies', movie);
        }
      };

      return service;

    }

  };

})();

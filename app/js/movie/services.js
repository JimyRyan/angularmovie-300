"use strict";

angular.module('angularMovieCore').provider("Movie", function() {
  var _this   = this,
      API_URI = '',
      API_OPTIONS = {
        transformResponse: function (data, headerGetter) {
            // data : une String JSON
            // angular.fromJson(data) : STRING => OBJ
            return angular.fromJson(data).data;
          }
      };

  _this.setURI = function(URI) {
    API_URI = URI;
  };

  _this.$get = ['$http', function($http) {
    return {
      fetch    : fetch,
      search   : search,
      create   : create,
      remove   : remove,
      fetchOne : fetchOne,
      update   : update
    };

    function fetch() {
      // Modification uniquement pour ce service
      return $http.get(API_URI, API_OPTIONS);
    }

    function search(title) {
      return $http.get(API_URI + '/search?title=' + title);
    }

    function create(movie) {
      return $http.post(API_URI, movie);
    }

    function remove(id) {
      return $http.delete(API_URI + '/' + id);
    }

    function fetchOne(id) {
      return $http.get(API_URI + '/' + id);
    }

    function update(movie) {
      return $http.put(API_URI, movie);
    }
  }];
});

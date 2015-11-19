(function() {
  'use strict';

  angular.module('app.interceptors')
    .factory('csrfInterceptorService', ['$rootScope', '$q', '$log', '$cookies', csrfInterceptorService]);

  function csrfInterceptorService($rootScope,
                                 $q,
                                 $log,
                                 $cookies) {

    return {
      responseError : function(rejection) {
        if (rejection.status >= 400) {
          $log.error(rejection.status + ' responded');
          $rootScope.$emit(errInterceptorConfig.ERR_EVENT, rejection);
        }
        return $q.reject(rejection);
      }
        ,
        request: function(config) {

          config.headers['X-XSRF-TOKEN'] = $cookies.get('SfeirToken');

          return config;
        }

    };
  }
})();

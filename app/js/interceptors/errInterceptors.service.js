(function() {
  'use strict';

  angular.module('app.interceptors')
    .factory('errInterceptorService', ['$rootScope', '$q', '$log', 'errInterceptorConfig', '$cookies', errInterceptorService]);

  function errInterceptorService($rootScope,
                                 $q,
                                 $log,
                                 errInterceptorConfig, $cookies) {

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

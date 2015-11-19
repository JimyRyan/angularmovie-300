(function() {
  'use strict';

  angular.module('app.interceptors', ['ngCookies'])
    .config(['$httpProvider', function($httpProvider) {
      $httpProvider.interceptors.push('errInterceptorService');
      $httpProvider.interceptors.push('csrfInterceptorService');
    }]);
})();

"use strict";
/*
(function() {

    angular.module('angularMovieInjector', [httpIntService, 'angularMovieCore'])
        .provider('Injector', function() {


            .factory('httpInterceptorServer', [httpIntService]);

                function httpIntService(Auth) {
                    return {
                        'responseError': function (rejection) {
                            if (rejection.status == 401) {
                                Auth.getCredentials();
                            }
                        }
                    }
                }



        });

})();
*/
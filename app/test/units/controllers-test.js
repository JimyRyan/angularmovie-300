"use strict";

describe('[Controllers] angularMovieCore :: mainController', function() {
    var controller,
        rootScope,
        scope;

    beforeEach(module('angularMovieCore'));

    beforeEach(inject(function($controller, $injector, $rootScope) {
        rootScope = $rootScope;
        scope = $rootScope.$new();
        controller = $controller('mainController', {
            $scope: scope,
            $rootScope: $rootScope,
            $translate: {}
        });
    }));

    it('should have a default state', function() {
        expect(scope.loading).toBeFalsy();
    });

    it('should toggle loading state on events', function() {
        scope.$emit('$stateChangeStart');
        expect(scope.loading).toBeTruthy();
    });
});




describe('angularMovieCore :: moviesController', function() {
    var API_URI = '/server/api/movies',
        controller,
        rootScope,
        scope,
        httpBackend,
        Movie;

    beforeEach(module('angularMovieCore'));

    beforeEach(inject(function($controller, $rootScope, _Movie_) {
        rootScope = $rootScope;
        scope = $rootScope.$new();
        Movie = _Movie_;

        // spyOne : Check que l'appel au service est demandé (NE CHECK PAS LES DATAS)

        // Slide 1 : Service injecter (and.callThrought
        //spyOn(...).and.callTrhw :> Permet d'éviter que le code s'arret au moment ou cela s'arret

        // Slide 2 : call Fake
        //spyOn(...).and.callFake :> Permet de retourner le résultat que l'on souhait (cf. function() { ...})
        spyOn(Movie, 'fetch').and.callFake(function() {
            return {
                success: function(callback) {
                    callback([
                        {id: 1, name:"Name 1"},
                        {id: 2, name:"Name 2"}
                    ]);
                }
            };
        });

        controller = $controller('moviesController', {
            $scope: scope,
            $rootScope: $rootScope,
            Movie: Movie
        });

        // Equivalent
        // beforeEach(inject(function($controller, $injector, $rootScope, _Movie_) {
        //     rootScope = $rootScope;
        //     scope = $rootScope.$new();
        //     controller = $controller('moviesController', {
        //         $scope: scope,
        //         Movie: _Movie_,
        //         $filter: {}
        //     });
        // }));
    }));

    it('should fetch datas', function() {
        expect(Movie.fetch).toHaveBeenCalled();
    });

});


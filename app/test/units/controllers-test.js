"use strict";

// Controller "basic"
describe('[Controllers] angularMovieCore :: mainController => Basic', function() {
    var controller,
        rootScope,
        scope;

    beforeEach(module('angularMovieCore'));

    beforeEach(inject(function($controller, $injector, $rootScope) {
        rootScope = $rootScope;
        scope = $rootScope.$new();
        controller = $controller('mainController', {
            $scope: scope,
            $rootScope: $rootScope
        });
    }));

    it('should not be in loading state', function() {
        expect(scope.loading).toBeFalsy();
    });

    it('should toggle loading state on events', function() {
        scope.$emit('$stateChangeStart');
        expect(scope.loading).toBeTruthy();
    });
});


// Controller avec valeur mocké (le tableau Movie) via $provide
describe('angularMovieCore :: moviesController => Mock', function() {
    var API_URI = '/server/api/movies',
        MOCK_TITLE = 'The Hobbit', // Mock the title
        controller,
        rootScope,
        scope,
        Movie;  // The mocked service

    beforeEach(module('angularMovieCore'));

    // Mock
    beforeEach(function() {
        module(function($provide) {
            $provide.value('Movie', {
                fetch: function() {
                    return {
                        success: function(callback) {
                            callback(
                                {id: 0, title: MOCK_TITLE}
                            );
                        }
                    }
                }
            });
        });
    });

    beforeEach(inject(function($controller, $rootScope, _Movie_) {
        rootScope = $rootScope;
        scope = $rootScope.$new();
        Movie = _Movie_;

        controller = $controller('moviesController', {
            $scope: scope,
            Movie : Movie
        });

    }));

    it('should have the same title as provided', function() {
        expect(scope.movies.title).toEqual(MOCK_TITLE);
    });

});


// Controlleur avec service Injecté
describe('angularMovieCore :: moviesController => Inject service', function() {
    var API_URI = '/server/api/movies',
        controller,
        rootScope,
        scope,
        Movie;

    beforeEach(module('angularMovieCore'));

    beforeEach(inject(function($controller, $rootScope, _Movie_) {
        rootScope = $rootScope;
        scope = $rootScope.$new();
        Movie = _Movie_;

        // spyOne : Check que l'appel au service est demandé (NE CHECK PAS LES DATAS)

        //spyOn(...).and.callThrough :> Permet d'éviter que le code s'arret au moment ou cela s'arret

        spyOn(Movie, 'fetch').and.callThrough();

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


// Controlleur avec service Mocké
describe('angularMovieCore :: moviesController => Mock service', function() {
    var API_URI = '/server/api/movies',
        controller,
        rootScope,
        scope,
        Movie;

    beforeEach(module('angularMovieCore'));

    beforeEach(inject(function($controller, $rootScope) {
        rootScope = $rootScope;
        scope = $rootScope.$new();
        Movie = {
            fetch: function(){}
        };

        // spyOne : Check que l'appel au service est demandé (NE CHECK PAS LES DATAS)

        //spyOn(...).and.callFake :> Permet de retourner le résultat que l'on souhait (cf. function() { ...})

        spyOn(Movie, 'fetch').and.callFake(function() {
            return {
                success: function(callback) {
                    callback([
                        {id: 1, name: 'Frodon Sacquet'},
                        {id: 2, name: 'Bilbon Sacquet'}
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
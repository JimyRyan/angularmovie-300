"use strict";

describe('[Services]', function() {

    var API_URI = '/server/api/movies';
    var httpBackend;
    var Movie;

    beforeEach(module('angularMovieCore', function(MovieProvider) {
        MovieProvider.setURI(API_URI);
    }));

    beforeEach(inject(function($httpBackend, _Movie_) {
        httpBackend = $httpBackend;
        Movie = _Movie_;

    }));

    // Je suis dans le service : je check le comportement lors des appels

    it('should fetch :: list', function() {
        httpBackend.whenGET(API_URI).respond([
            {id: 0, name: 'Back to the future 1'},
            {id: 1, name: 'Wayne\'s World'}
        ]);
        // fetch => Retourne 1 array
        Movie.fetch().success(function(resp) {
            expect(resp.length).toEqual(2);
        });

        // Reset for next call
        httpBackend.flush();
    });


    it('should fetchOne :: id', function() {
        httpBackend.whenGET(API_URI+'/1').respond(
            {id: 1, name: 'Back to the future 1'}
        );
        // fetchOne => Retourne 1 object
        Movie.fetchOne(1).success(function(resp) { // 1 -> id
            expect(resp.id).toEqual(1); // dans la réponse, id = 1 (cf. param)
        });

        // Reset for next call
        httpBackend.flush();
    });
});



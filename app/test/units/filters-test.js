"use strict";

describe('[Filters] angularMovieUI', function() {

    beforeEach(module('angularMovieUI'));

    describe('poster filter', function() {

        var posterFilter;
        beforeEach(inject(function($filter) {
            posterFilter = $filter('poster');
        }));

        it('should return the image url when there is one', function() {
            expect(posterFilter('/mylittlepony.png')).toEqual('/mylittlepony.png');
        });
        it('should return a default image url otherwise', function() {
            expect(posterFilter(null)).toEqual('img/no-poster.jpg');
            expect(posterFilter('')).toEqual('img/no-poster.jpg');
        });
    });


});
describe('angularMovieUI', function() {

    var scope;

    beforeEach(module('angularMovieUI'));

    beforeEach(inject(function($injector, $rootScope) {
        scope = $rootScope.$new();
    }));

    it('should be valid for a good name', inject(function($compile) {
        scope.director = "Jimy Ryan";

        var element = angular.element('<input type="text" ng-model="director" director-validator>');

        $compile(element)(scope);
        scope.$apply();

        expect(element[0].classList
            .contains('ng-valid-director')).toBeTruthy();
        expect(element[0].classList
            .contains('ng-invalid-director')).toBeFalsy();
    }));


    it('should be invalid for a bad name', inject(function($compile) {
        scope.director = "JimyRyan";

        var element = angular.element('<input type="text" ng-model="director" director-validator>');

        $compile(element)(scope);
        scope.$apply();

        expect(element[0].classList
            .contains('ng-valid-director')).toBeFalsy();
        expect(element[0].classList
            .contains('ng-invalid-director')).toBeTruthy();
    }));
});

describe('Movies page', function() {

    beforeEach(function(){
        browser.get('http://localhost:9000/#/movies');
    });

    // http://angular.github.io/protractor/#/api?view=ProtractorBy
    // by.repeater : Find elements inside an ng-repeat.

    //Expected Conditions : https://github.com/angular/protractor/commit/9bc1c53e40161521b0c125a810f86235c974f100
    //    http://stackoverflow.com/questions/27737333/expected-conditions-in-protractor

    it('Length of movies', function() {
        var divs = element.all(by.repeater('movie in filteredMovies'));
        expect(divs.count()).toEqual(9);
        expect(divs.get(0).$('.caption h3 span').getText()).toEqual('AVATAR');
    });

    it('Search input', function() {
        var input = element(by.model('search')), divs;
        input.sendKeys('sei');
        divs = element.all(by.repeater('movie in filteredMovies'));
        expect(divs.count()).toEqual(3);
    });

    it('Sort movies by date', function() {
        var input = element(by.buttonText('Trier par année')), divs;
        input.click();
        divs = element.all(by.repeater('movie in filteredMovies'));
        expect(divs.get(0).$('.caption h3 span').getText()).toEqual('YIP MAN 2');
    });

    // Test directive
    it('Check add movie unique', function() {
        var buttonAdd = element(by.buttonText('Ajouter un film')), divs;
        buttonAdd.click();

        // Wait for pop-up loaded
        var formAdd = element(by.id('movie-form-modal'));
        // Wait pop-up be loaded and rendered
        browser.wait(protractor.ExpectedConditions.presenceOf(formAdd), 10000); // 10 sec
        expect(formAdd.isPresent()).toBeTruthy();

        // Enter new movie title
        var inputTitle = formAdd.element(by.model('movie.title'));
        expect(inputTitle.isPresent()).toBeTruthy();

        // Be sure the input is displayed before type the title
        browser.wait(protractor.ExpectedConditions.visibilityOf(inputTitle), 10000);
        expect(inputTitle.isDisplayed()).toBeTruthy();

        inputTitle.sendKeys('Avatar');

        var titleError = formAdd.all(by.css('.control-group .help-block')).get(1);

        if (titleError.isDisplayed()) {
            expect(titleError.getText()).toEqual('Le titre n\'est pas disponible');
        } else {
            // The error is not found :( the test is false !
            expect(false).toBe(true);
        }
    });

});
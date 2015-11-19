describe('Protractor Demo App', function() {

    it('Affichage de la liste des films + utilisation des filtres', function() {
        browser.get('http://localhost:9000/#/movies');

        // Envoie Avatar
        element(by.model('search')).sendKeys('Avatar');

        expect(element(by.model('movie.title')).getText()).toEqual('Avatar');


        //expect(element.all(by.css('.thumbnails')).count()).toBeGreaterThan(0);

        //expect(element.all(by.css('.thumbnails div[title="movie.releaseYear"]')).count()).toBeGreaterThan(0);


    });

});
"use strict";

/**
 * inspired by http://www.adobe.com/devnet/html5/articles/angularjs-directives-and-the-computer-science-of-javascript.html
 * by Burke Holland
 */
angular.module('angularMovieUI').directive('editable', function() {

  return {
    restrict    : 'E',
    replace     : true,
    templateUrl : "partials/editable.html",
    scope       : {
      label : '@',
      text  : '='
    },
    link        : function(scope, element, attrs) {

      // editMode is disable by default
      scope.editMode = false;

      // if label attribut is not provide then remove
      // the label element
      if (!attrs.label) {
        element.find('label').remove();
      }

      // find the input elemnt of this directive ...
      var input = element.find('input');
      // and listen for blur event
      input.bind('blur', function() {
        // since blur event occured ouside the angular execution context
        // we need to call scope.$apply to tell angularjs about the changes
        scope.$apply(function() {
          // the change is to disable the editMode
          scope.editMode = false;
        });

      });

    }
  }

});

angular.module('angularMovieUI').directive('movieRating1', function() {

  return {
    restrict    : 'E',
    replace     : true,
    scope       : {
      rate : '@'
    },
    link        : function(scope, element, attrs, ctrl, transclude) {


      var count = 0;
      do {
        transclude(function (data) {
          element.append(data);
        });
        count++;
      } while (parseInt(scope.rate) > count);

    },
    transclude : true,
    template: '<div></div>' // Dans le template : pas besoin de placer le scope
  }

});



angular.module('angularMovieUI').directive('movieRating2', function() {

  return {
    restrict    : 'E',
    transclude : true,
    scope       : {
      rate : '=ngModel',  // = : Obligatoire (dans le HTML : ... ng-model="movie.rate" ... (<rating ng-model="movie.rate" max="5"><i class="fa fa-star"></i></rating>)
      max: '=?'     // =? : Optionel
    },
    link        : function(scope, element, attrs) {

      scope.max = scope.max || 5;

      scope.rateArray = [];

      for (var i = 0 ; i < scope.rate ; i++) {
        scope.rateArray.push({'filled': (i < scope.rate ? true : false)}); //filled => étoile remplie...
      };

    },
    template   : // Dans le template : pas besoin de placer le scope
    '  <div><span ng-repeat="star in rateArray">' +
    '    <ng-transclude></ng-transclude>' +
    '  </span></div>'

  }

});


angular.module('angularMovieUI').directive('movieRating3', function() {
  return {
    restrict   : 'E',
    transclude : true,
    template   : '<ul class="rating readonly">' + // Dans le template : pas besoin de placer le scope
    '  <li ng-repeat="star in stars" class="star" ng-class="{filled: star.filled}">' +
    '    <ng-transclude></ng-transclude>' +
    '  </li>' +
    '</ul>',
    scope      : {
      ratingValue : '=ngModel',
      max         : '=?'
    },
    link       : function(scope, element, attributes) {
      scope.max = scope.max || 5;

      function updateValue() {
        scope.stars = [];
        for (var i = 0; i < scope.max; i++) {
          scope.stars.push({
            filled : i < scope.ratingValue
          });
        }
      }
      scope.$watch('ratingValue', function(newValue) {
        if (newValue || scope.stars == undefined) {
          updateValue();
        }
      });
    }
  };
});

angular.module('angularMovieUI').directive('movieRating4', function() {
  return {
    restrict   : 'E',
    transclude : true,
    template   : '<ul class="rating {readonly: readonly}">' + // Dans le template : pas besoin de placer le scope
    '  <li ng-repeat="star in stars" class="star" ng-class="{filled: star.filled}" ng-click="rate($index)">' +
    '    <ng-transclude></ng-transclude>' +
    '  </li>' +
    '</ul>',
    scope      : {
      ratingValue : '=ngModel',
      max         : '=?',
      readonly    : '=?'
    },
    link       : function(scope, element, attributes) {
      scope.max = scope.max || 5;
      scope.readonly = scope.readonly || false;

      function updateValue() {
        scope.stars = [];
        for (var i = 0; i < scope.max; i++) {
          scope.stars.push({
            filled : i < scope.ratingValue
          });
        }
      }
      scope.rate = function(index) {
        if (scope.readonly === false) {
          scope.ratingValue = index + 1;
        }
      };
      scope.$watch('ratingValue', function(newValue) {
        if (newValue || scope.stars == undefined) {
          updateValue();
        }
      });
    }
  };
});

// Sync validator
angular.module('angularMovieUI').directive('directorValidator', function() {
  return {
    require : 'ngModel',
    link : function($scope, element, attrs, ngModel) {
      ngModel.$validators.director = function(value) {
        if(value) {
          return value.split(' ').length > 1;
        }
      };
    }
  }
});


// Async validator
angular.module('angularMovieUI')
    .directive('titleValidator', titleValidatorDirective);

titleValidatorDirective.$inject = ['Movie', '$q'];

function titleValidatorDirective(Movie, $q) {
  return {
    restrict : 'A',
    require  : 'ngModel',
    link     : function(scope, element, attrs, ngModel) {
      // http://jaysoo.ca/2014/10/14/async-form-errors-and-messages-in-angularjs/
      //
      ngModel.$asyncValidators.unique = titleValidator;
    }
  };

  function titleValidator(value) {
    // Promise

    var deferred = $q.defer();

    Movie.search(value)
    .then(function(result) {
      deferred.reject(); // Le reject falidator a besoin d'un reject (ignore le false)
    })
    .catch(function(result) {
      deferred.resolve();
    });

    return deferred.promise;
  }
}

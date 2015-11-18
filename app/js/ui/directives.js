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
    template: '<div></div>'
  }

});



angular.module('angularMovieUI').directive('movieRating2', function() {

  return {
    restrict    : 'E',
    replace     : true,
    transclude : true,
    scope       : {
      rate : '=ngModel',  // Obligatoire
      max: '=?'     // Optionel
    },
    link        : function(scope, element, attrs) {

      scope.max = scope.max || 5;

      console.log(scope.max);

      scope.rateArray = [];

      for (var i = 0 ; i < scope.rate ; i++) {
        scope.rateArray.push({'filled': true}); //filled => étoile remplie...
      };

      console.log(scope.rateArray);
    },
    //template: '<div><span ng-repeat="i in scope.rateArray"><ng-transclude></ng-transclude></span></div>',
    template   : '<ul class="rating readonly">' +
    '  <li ng-repeat="star in scope.rateArray" class="star" ng-class="{filled: star.filled}">' +
    '    <ng-transclude></ng-transclude>' +
    '  </li>' +
    '</ul>'

  }

});
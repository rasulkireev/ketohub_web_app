'use strict';

var ketoHubApp = angular.module('ketoHubApp', ['firebase']);

ketoHubApp.controller('ketoHubCtrl',
                      function($scope, $firebaseObject, $window) {
  var ref = $window.firebase.database().ref();
  $scope.recipes = $firebaseObject(ref.child('recipes'));

  $scope.recipes.$loaded()
    .then(function() {
      // Add thumbnail attribute to each recipe.
      for (var key in $scope.recipes) {
        if (key.lastIndexOf('$', 0) !== 0 && key != 'forEach') {
          $scope.recipes[key].thumbnail_url =
            'https://storage.googleapis.com/ketohub/' + key + '_thumbnail.jpg';
        }
      }
    });
});

'use strict';

var ketoHubApp = angular.module('ketoHubApp', ['firebase']);

ketoHubApp.controller('ketoHubCtrl',
                      function($scope, $firebaseObject, $window) {
  var ref = $window.firebase.database().ref();
  $scope.recipes = $firebaseObject(ref.child('recipes'));
});

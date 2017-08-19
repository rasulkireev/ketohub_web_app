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

ketoHubApp.filter('rootDomain', function() {
  var extractHostname = function(url) {
    var hostname;

    // Remove protocol, and get hostname.
    if (url.indexOf('://') > -1) {
      hostname = url.split('/')[2];
    } else {
      hostname = url.split('/')[0];
    }

    // Strip port number.
    hostname = hostname.split(':')[0];

    // Strip query string.
    hostname = hostname.split('?')[0];

    return hostname;
  };

  return function(url) {
    var domain = extractHostname(url);
    var domainParts = domain.split('.');
    var domainsPartsLength = domainParts.length;

    if (domainsPartsLength > 2) {
      domain = domainParts[domainsPartsLength - 2] + '.' +
               domainParts[domainsPartsLength - 1];
    }
    return domain;
  };
});

'use strict';

var ketoHubApp = angular.module('ketoHubApp', ['firebase']);

ketoHubApp
.constant('buttonActiveClass', 'btn-primary')
.constant('recipesPerPage', 2)
.controller('ketoHubCtrl',
            function($scope, $firebaseArray, $window, buttonActiveClass, recipesPerPage) {
  $scope.currentPage = 1;
  $scope.pageSize = recipesPerPage;

  var ref = $window.firebase.database().ref();
  $scope.recipes = $firebaseArray(ref.child('recipes'));
  console.log('got recipes');
  console.log($scope.recipes);

  $scope.recipes.$loaded()
    .then(function() {
  		console.log('loaded recipes');
		  console.log($scope.recipes);

      // Add thumbnail attribute to each recipe.
      for (var key in $scope.recipes) {
        if (key.lastIndexOf('$', 0) !== 0 && key != 'forEach') {
          $scope.recipes[key].thumbnail_url =
            'https://storage.googleapis.com/ketohub/' + key + '_thumbnail.jpg';
        }
      }
    });

  $scope.selectPage = function(newPage) {
    $scope.currentPage = newPage;
  };

  $scope.getPageClass = function(page) {
    return $scope.currentPage == page ? buttonActiveClass : '';
  };
});

ketoHubApp
.filter('rootDomain', function() {
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
})
.filter('range', function($filter) {
  return function (data, page, size) {
    console.log('in range filter');
    console.log(data);
    console.log(page);
    console.log(size);
    if (angular.isArray(data) && angular.isNumber(page) && angular.isNumber(size)) {
      var startIndex = (page - 1) * size;
      if (data.length < startIndex) {
        return [];
      } else {
        return $filter('limitTo')(data.splice(startIndex), size);
      }
    } else {
      return data;
    }
  }
})
.filter('pageCount', function() {
  return function(data, size) {
    if (angular.isArray(data)) {
      var result = [];
      for (var i = 0; i < Math.ceil(data.length / size); i++) {
        result.push(i);
      }
      return result;
    } else {
      return data;
    }
  }
});

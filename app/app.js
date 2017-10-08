'use strict';

var ketoHubApp = angular.module('ketoHubApp', ['firebase', 'ui.bootstrap']);

ketoHubApp
.constant('buttonActiveClass', 'btn-primary')
.constant('recipesPerPage', 10)
.constant('maxPageButtons', 6)
.constant('recipeCategories',
    ['breakfast', 'entree', 'side', 'dessert', 'snack', 'beverage',
    'condiment'])
.controller('ketoHubCtrl',
  function($scope, $firebaseArray, $window, buttonActiveClass, recipesPerPage,
    maxPageButtons, recipeCategories) {
    $scope.currentPage = 1;
    $scope.pageSize = recipesPerPage;
    $scope.categories = recipeCategories;
    $scope.maxPageButtons = maxPageButtons;

    var ref = $window.firebase.database().ref();
    $scope.recipes =  $firebaseArray(ref.child('recipes'));

    $scope.recipes.$loaded(function() {
      // Add thumbnail attribute to each recipe.
      for (var i = 0; i < $scope.recipes.length; i++) {
        var recipe = $scope.recipes[i];
        recipe.thumbnailUrl =
            'https://storage.googleapis.com/ketohub/' +
            recipe.$id +
            '_thumbnail.jpg';
      }
    });

    var currentCategory = null;
    $scope.selectCategory = function(newCategory) {
      $scope.currentPage = 1;
      if (currentCategory != newCategory) {
        currentCategory = newCategory;
      } else {
        currentCategory = null;
      }
    };

    $scope.getCategoryClass = function(category) {
      return currentCategory == category ? buttonActiveClass : '';
    };

    $scope.categoryFilterFn = function(recipe) {
      return (currentCategory == null) || (recipe.category == currentCategory);
    };
  }
);

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
  return function(data, page, size) {
    if (!angular.isArray(data) ||
        !angular.isNumber(page) ||
        !angular.isNumber(size)) {
      return data;
    }
    // TODO(mtlynch): For some reason, data.slice returns an empty array even
    // though we can iterate over it, so we use this hacky workaround. Clean
    // this up.
    var startIndex = (page - 1) * size;
    var endIndex = Math.min(startIndex + size, data.length);
    var result = [];
    for (var i = startIndex; i < endIndex; i++) {
      result.push(data[i]);
    }
    return result;
  };
})
.filter('capitalize', function() {
  return function(word) {
    return word.charAt(0).toUpperCase() + word.substr(1);
  };
});

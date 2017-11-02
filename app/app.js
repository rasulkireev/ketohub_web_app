let ketoHubApp = angular.module('ketoHubApp', ['firebase', 'ui.bootstrap']);

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

    let ref = $window.firebase.database().ref();
    $scope.recipes = $firebaseArray(ref.child('recipes'));

    $scope.recipes.$loaded(function() {
      // Add thumbnail attribute to each recipe.
      for (let i = 0; i < $scope.recipes.length; i++) {
        let recipe = $scope.recipes[i];
        recipe.thumbnailUrl =
            'https://storage.googleapis.com/ketohub/' +
            recipe.$id +
            '_thumbnail.jpg';
      }
    });

    let currentCategory = null;
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
.filter('timeSince', function() {
  return function(startTimeStr) {
    const startTime = new Date(startTimeStr);
    const now = new Date();
    const milliseconds = now - startTime;
    const seconds = milliseconds / 1000;
    const minutes = seconds / 60;
    const hours = minutes / 60;
    const days = hours / 24;
    const months = days / (365 / 12);
    const years = days / 365;

    let interval;
    let units;

    // The interval calculation is not precise and does not account for things
    // like DST or leap years.
    if (Math.round(minutes) < 60) {
      interval = minutes;
      units = 'minutes';
    } else if (Math.round(hours) < 24) {
      interval = hours;
      units = 'hours';
    } else if (Math.round(days) < 90) {
      interval = days;
      units = 'days';
    } else if (Math.round(months) < 12) {
      interval = months;
      units = 'months';
    } else {
      interval = years;
      units = 'years';
    }

    interval = Math.round(interval);

    // Always round up from 0 to 1.
    if (interval == 0) {
      interval = 1;
    }

    // Truncate the trailing 's' if the value is 1.
    if (interval == 1) {
      units = units.substring(0, units.length - 1);
    }

    return interval + ' ' + units;
  };
})
.filter('rootDomain', function() {
  const extractHostname = function(url) {
    let hostname;

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
    if (!url) {
      return;
    }
    let domain = extractHostname(url);
    const domainParts = domain.split('.');
    const domainsPartsLength = domainParts.length;

    if (domainsPartsLength > 2) {
      domain = domainParts[domainsPartsLength - 2] + '.' +
               domainParts[domainsPartsLength - 1];
    }
    return domain;
  };
})
.filter('search', function() {
  return function(recipes, keywords) {
    if (!keywords) {
      return recipes;
    }
    let results = [];

    const matchesRecipe = function(recipe, keywords) {
      let words = recipe.title.toLowerCase();
      angular.forEach(recipe.ingredients, function(ingredient) {
        words += ingredient.toLowerCase();
      });
      for (let i = 0; i < keywords.length; i++) {
        if (words.indexOf(keywords[i].toLowerCase()) === -1) {
          return false;
        }
      }
      return true;
    };

    angular.forEach(recipes, function(recipe) {
      if (matchesRecipe(recipe, keywords.split(/\s+/))) {
        results.push(recipe);
      }
    });
    return results;
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
    const startIndex = (page - 1) * size;
    const endIndex = Math.min(startIndex + size, data.length);
    let result = [];
    for (let i = startIndex; i < endIndex; i++) {
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

'use strict';

var ketoHubApp = angular.module('ketoHubApp', []);

ketoHubApp.controller("ketoHubCtrl", function($scope) {
  $scope.recipes = {
    "https://www.ruled.me/chicken-pesto-roulade/": {
      "title": "Chicken Pesto Roulade",
      "category": "entree",
      "thumbnail": "https://cdn4.ruled.me/wp-content/uploads/2014/02/ChickenRoulade.jpg"
    },
    "https://www.ruled.me/keto-bacon-burger-bombs/": {
      "title": "Keto Bacon Burger Bombs",
      "category": "snack",
      "thumbnail": "https://cdn4.ruled.me/wp-content/uploads/2017/06/bacon-burger-bombs-featured.jpg"
    },
    "https://www.ketoconnect.net/recipe/oven-baked-fish/": {
      "title": "Oven Baked Fish",
      "category": "entree",
      "thumbnail": "https://ketoconnect-apjirmx5iktkd7.netdna-ssl.com/wp-content/uploads/2017/07/oven-baked-fish-fork.jpg"
    },
    "https://www.ruled.me/keto-gelatin-rum-shots/": {
      "title": "Keto Gelatin Rum Shots",
      "category": "dessert",
      "thumbnail": "https://cdn4.ruled.me/wp-content/uploads/2017/04/IMG_1542.jpg"
    },
    "https://www.ketoconnect.net/recipe/irish-coffee/": {
      "title": "Keto Irish Coffee",
      "category": "beverage",
      "thumbnail": "https://ketoconnect-apjirmx5iktkd7.netdna-ssl.com/wp-content/uploads/2016/12/irish-coffee-final-vertical-1-467x700.jpg"
    }
  };
});

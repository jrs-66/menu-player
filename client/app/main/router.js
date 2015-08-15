'use strict';

angular.module('menuPlayerApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('content', {
        url: '/player/slide/:playerid/:modelid',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      })
      .state('main', {
        url: '/',
        templateUrl: 'app/main/invalid.html',
        controller: 'MainCtrl'
      });
  });

'use strict';

var app = angular.module('menuPlayerApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'btford.socket-io'
])
.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
  $urlRouterProvider
    .otherwise('/');

  $locationProvider.html5Mode(true);
});

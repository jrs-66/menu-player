'use strict';

angular.module('menuPlayerApp', [
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
})
.factory('playerSocket', function (socketFactory) {
  var myIoSocket = window.io.connect('http://dp23.com:9000/', {transports:['websocket']});
  var mySocket = socketFactory({
      ioSocket: myIoSocket
  });
  mySocket.forward('pong');
  return mySocket;
});

'use strict';

angular.module('menuPlayerApp')
  .controller('MainCtrl', ['$scope', '$timeout', '$http', '$stateParams', 'playerSocket', '$window', function ($scope, $timeout, $http, $stateParams, playerSocket, $window) {

    $http.get('/api/player/check/' + $stateParams.playerid + '/' + $stateParams.modelid).then(function(response) {

        var data = response.data;
        data._id = 0;
        console.log("templatedata");
        console.log(data._id);
        var player_id =  data.player_id;

        playerSocket.on('activation_' + player_id, function(data) {
          data._id = -1;
          $scope.data = data;
        });

        playerSocket.on('player_delete', function(data) {
          if (data._id === player_id) {
            $window.location.reload();
          }
        });

        playerSocket.on('template_change_' + player_id, function(data) {
          console.log("template changed");

          var template = data.template;

          $scope.data = null;
          $timeout(function(){
            $scope.data = template;
          })
        });

        $scope.$on('$destroy', function (event) {
          playerSocket.removeAllListeners();
        });

        if (data.template_id) {
          $http.get('/api/templates/' + data.template_id).success( function(template, status, headers, config) {
            console.log("player exists with template - " + template.HTML);
            $scope.data = template;
          })
        } else {
          data._id = -1;
          $scope.data = data;
        }
      });
  }])

  .controller('PlayCtrl', ['$scope', '$http', '$stateParams', 'playerSocket', function($scope, $http, $stateParams, playerSocket) {
    $http.get('/api/templates/' + $scope.data.template_id).success( function(data, status, headers, config) {
      $scope.template = data.HTML;
    })
  }])

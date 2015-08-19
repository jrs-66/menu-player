'use strict';

angular.module('menuPlayerApp')
  .controller('MainCtrl', ['$scope', '$http', '$stateParams', 'playerSocket', '$window', function ($scope, $http, $stateParams, playerSocket, $window) {
    console.log('MAIN CONTROLLER');
    $scope.show = false;

    $http.get('/api/player/check/' + $stateParams.playerid + '/' + $stateParams.modelid).
      success(function(data, status, headers, config) {
        console.log("player " + data._id);
        var player_id =  + data._id;
        console.log(player_id + " is current player");
        playerSocket.on('activation_' + player_id, function(data) {
          data.activation_code = 'EXISTS';
          $scope.data = data;
        });
        playerSocket.on('player_delete_' + player_id, function(data) {
          $window.location.reload();
        });
        console.log("listener for " + 'template_change_' + player_id);
        playerSocket.on('template_change_' + player_id, function(data) {
          console.log("template changed");
          var template = data.template;
          //$http.get('/api/templates/' + data.template_id).success( function(data, status, headers, config) {
          //$scope.template = data.HTML;
          //data.template_id = data._id;
          $scope.data = template;
          //$scope.data.template_id = data._id;
          $scope.show = true;
          //})
        });

        if (data.template_id) {
          $http.get('/api/templates/' + data.template_id).success( function(template, status, headers, config) {
            console.log("player exists with template - " + template.HTML);
            template.activation_code = "EXISTS";
            $scope.data = template;
            $scope.show = true;
          })
        }
      }).
      error(function(data, status, headers, config) {
        console.log('ERROR');
        $scope.data.activation_code = 'ERROR';
        $scope.show = true;
      });
  }])

  .controller('PlayCtrl', ['$scope', '$http', '$stateParams', 'playerSocket', function($scope, $http, $stateParams, playerSocket) {
    $http.get('/api/templates/' + $scope.data.template_id).success( function(data, status, headers, config) {
      $scope.template = data.HTML;
      $scope.show = true;
    })
  }])

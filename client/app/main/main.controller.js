'use strict';

angular.module('menuPlayerApp')
  .controller('MainCtrl', ['$scope', '$http', '$stateParams', 'playerSocket', '$window', function ($scope, $http, $stateParams, playerSocket, $window) {
    console.log('MAIN CONTROLLER');
    $scope.show = false;

    playerSocket.on('activation', function(data) {
      $scope.data.activation_code = 'EXISTS';
    });
    playerSocket.on('player_delete', function(data) {
      $window.location.reload();
    });
    playerSocket.on('template_change', function(data) {
      $http.get('/api/templates/' + data.template_id).success( function(data, status, headers, config) {
        console.log("success");
        console.log(data);
        $scope.template = data.HTML;
        $scope.data.template_id = data._id;
        $scope.show = true;
      })
    });

    $http.get('/api/player/check/' + $stateParams.playerid + '/' + $stateParams.modelid).
      success(function(data, status, headers, config) {
        console.log('SUCCESS');
        $scope.data = data;
        console.log($scope.data);

        if ($scope.data.template_id) {
          $scope.template = "testing";
          $http.get('/api/templates/' + $scope.data.template_id).success( function(data, status, headers, config) {
            console.log(data);
            $scope.template = data.HTML;
            $scope.show = true;
          })
        }
        $scope.show = true;
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

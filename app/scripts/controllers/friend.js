'use strict';

/**
 * @ngdoc function
 * @name webchatApp.controller:FriendCtrl
 * @description
 * # SignCtrl
 * Controller of the webchatApp
 */
angular.module('webchatApp')
  .factory('FriendFactory', function($http) {

    var methods = {
      add: function(friendForm, callback) {

        function successListCallback(response) {
          callback();
        }
        function errorListCallback(error) {
          console.log(error);
          alert('Friend not Found');
        }

        $http({
            method: 'PATCH',
            url: 'http://localhost:8080/webchat/user/friend',
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(friendForm)
        }).then(successListCallback, errorListCallback);
      }
    };

    return methods;
  })
  .controller('FriendCtrl', function($scope, $rootScope, FriendFactory, $location) { 

    $scope.submitAddFriendForm = function () {
      $scope.addFriend.name = $rootScope.globals.currentUser.username;
      FriendFactory.add($scope.addFriend, function() {
        $location.path('list');
      });
    };
  });

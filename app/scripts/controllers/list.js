'use strict';

/**
 * @ngdoc function
 * @name webchatApp.controller:ListCtrl
 * @description
 * # ListCtrl
 * Controller of the webchatApp
 */
angular.module('webchatApp')
  .factory('ListFactory', function($http) {

    var friends = [];
    var methods = {
      friends: friends,
      listFriends: function(username) {

        function successListCallback(response) {
          console.log(response);
          friends.push(...response.data.friends);
        }
        function errorListCallback(error) {
          console.log(error);
          alert('Error in list friends');
        }

        $http({
            method: 'GET',
            url: 'http://localhost:8080/webchat/user/' + username,
            headers: {
                'Accept': 'application/json'
            }
        }).then(successListCallback, errorListCallback);
      }
    };

    return methods;
  })
  .controller('ListCtrl', function($scope, $rootScope, ListFactory, $location) { 

    $scope.select = function(friend) {
      ListFactory.friend = friend.name;
      $location.path('main');
    };

    $scope.redirectToAddFriend = function () {
      $location.path('friend');
    }

    ListFactory.listFriends($rootScope.globals.currentUser.username);

    $scope.ListFactory = ListFactory;
  });

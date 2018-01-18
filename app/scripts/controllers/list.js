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

    var friend;
    var methods = {
      friend: friend,
      listFriends: function(username) {

        function successListCallback(response) {
          console.log(response);
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
      console.log(">>>>>>>>>> " + friend);
      ListFactory.friend = friend;
      $location.path('main');
    };

    console.log($rootScope.globals.currentUser.username);

    ListFactory.listFriends($rootScope.globals.currentUser.username);

    $scope.ListFactory = ListFactory;
  });

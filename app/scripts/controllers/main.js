'use strict';

/**
 * @ngdoc function
 * @name webchatApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the webchatApp
 */
angular.module('webchatApp')
  .factory('MainFactory', function($websocket, $rootScope) {

    var socket = $websocket('ws://localhost:8080/webchat/name');

    var collection = [];

    socket.onMessage(function(message) {
      var response = JSON.parse(message.data);
      if (response.message.chatGroup.indexOf($rootScope.globals.currentUser.username) >= 0) {
        response.message.date = new Date();
        collection.push(response);
      }
    });

    var methods = {
      collection: collection,
      sendMessage: function(message) {
        socket.send(JSON.stringify({ message }));
      }
    };

    return methods;
  })
  .controller('MainCtrl', function($scope, $rootScope, MainFactory, ListFactory) {

    $scope.submitMessageForm = function () {
      $scope.message.sender = $rootScope.globals.currentUser.username;
      $scope.message.chatGroup = [$rootScope.globals.currentUser.username, ListFactory.friend];
      MainFactory.sendMessage($scope.message);
      $scope.message.content = '';
    };

    $scope.MainFactory = MainFactory;
  });

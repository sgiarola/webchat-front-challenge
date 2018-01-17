'use strict';

/**
 * @ngdoc function
 * @name webchatApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the webchatApp
 */
var appChat = angular.module('webchatApp')
  .factory('MainFactory', function($websocket) {

    var socket = $websocket('ws://localhost:8080/webchat/name');

    var collection = [];

    socket.onMessage(function(message) {
      collection.push(JSON.parse(message.data));
    });

    var methods = {
      collection: collection,
      sendMessage: function(message) {
        socket.send(JSON.stringify({ message }));
      }
    };

    return methods;
  })
  .controller('MainCtrl', function($scope, MainFactory) {

    $scope.submitMessageForm = function () {
      $scope.message.sender = 'Samuel';
      MainFactory.sendMessage($scope.message);
      $scope.message.content = '';
    };

    $scope.MainFactory = MainFactory;
  });

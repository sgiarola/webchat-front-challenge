'use strict';

/**
 * @ngdoc function
 * @name webchatApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the webchatApp
 */
angular.module('webchatApp')
  .factory('MainFactory', function($websocket) {

    var socket = $websocket('ws://localhost:8080/webchat/name');

    var collection = [];

    socket.onMessage(function(message) {
      var response = JSON.parse(message.data);
      response.message.date = new Date();
      collection.push(response);
    });

    var methods = {
      collection: collection,
      sendMessage: function(message) {
        socket.send(JSON.stringify({ message }));
      }
    };

    return methods;
  })
  .controller('MainCtrl', function($scope, MainFactory, Login) {

    $scope.submitMessageForm = function () {
      $scope.message.sender = Login.credencials.user;
      MainFactory.sendMessage($scope.message);
      $scope.message.content = '';
    };

    $scope.MainFactory = MainFactory;
  });

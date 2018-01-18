'use strict';

/**
 * @ngdoc function
 * @name webchatApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the webchatApp
 */
angular.module('webchatApp')
  .factory('LoginFactory', function($websocket, $http, $location) {

    var methods = {
      sendLogin: function(login) {

        function successCallback(response){
          if (typeof response.data === 'string' && !response.data) {
            $location.path('main');
          }
        }
        function errorCallback(error){
          console.log(error);
          alert('Login incorrect');
        }

        $http({
          method: 'POST',
          url: 'http://localhost:8080/webchat/login',
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
          transformRequest: function(obj) {
              var str = [];
              for(var p in obj)
              str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
              return str.join("&");
          },
          data: {username: login.user, password: login.password}
        }).then(successCallback, errorCallback);
      }
    };

    return methods;
  })
  .controller('LoginCtrl', function($scope, LoginFactory) {

    $scope.submitLoginForm = function () {
      LoginFactory.login = $scope.login;
      LoginFactory.sendLogin(LoginFactory.login);
    };

    $scope.LoginFactory = LoginFactory;
  })
  .service('Login', function (LoginFactory) {
    return {credencials: LoginFactory.login};
  });

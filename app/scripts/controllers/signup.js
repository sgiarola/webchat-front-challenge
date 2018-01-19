'use strict';

/**
 * @ngdoc function
 * @name webchatApp.controller:SignCtrl
 * @description
 * # SignCtrl
 * Controller of the webchatApp
 */
angular.module('webchatApp')
  .factory('SignFactory', function($http) {

    var methods = {
      signup: function(userForm, callback) {

        function successListCallback(response) {
          callback();
        }
        function errorListCallback(error) {
          console.log(error);
          alert('Error in SignUp');
        }

        $http({
            method: 'POST',
            url: 'http://localhost:8080/webchat/user',
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(userForm)
        }).then(successListCallback, errorListCallback);
      }
    };

    return methods;
  })
  .controller('SignCtrl', function($scope, SignFactory, AuthenticationService, $location) { 

      $scope.submitSignUpForm = function () {
      SignFactory.signup($scope.signup, function() {
        AuthenticationService.SetCredentials($scope.signup.name, $scope.signup.password);
        $location.path('list');
      });
    };
  });

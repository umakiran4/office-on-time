'use strict';
ootApp.controller('RegistrationCtrl', ['$scope', '$http',
      function ($scope, $http) {

          $scope.User = {};

          $scope.Register = function () {
              alert($scope.User.FirstName);
          }

 }]);
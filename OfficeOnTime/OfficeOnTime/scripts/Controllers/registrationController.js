'use strict';
ootApp.controller('RegistrationCtrl', ['$scope', '$http','geolocation',
      function ($scope, $http, geolocation) {

          $scope.User = {};

          $scope.Register = function () {
              alert($scope.User.FirstName);
          }

          $scope.getLocation = function () {
              geolocation.getCurrentPosition(function (position) {
                  alert('Latitude: ' + position.coords.latitude + '\n' +
                        'Longitude: ' + position.coords.longitude + '\n' +
                        'Altitude: ' + position.coords.altitude + '\n' +
                        'Accuracy: ' + position.coords.accuracy + '\n' +
                        'Altitude Accuracy: ' + position.coords.altitudeAccuracy + '\n' +
                        'Heading: ' + position.coords.heading + '\n' +
                        'Speed: ' + position.coords.speed + '\n' +
                        'Timestamp: ' + position.timestamp + '\n');
                  $scope.User.CheckInLocation = 'Latitude: ' + position.coords.latitude + '' + 'Longitude: ' + position.coords.longitude;
              });
          }
 }]);
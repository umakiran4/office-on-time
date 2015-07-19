'use strict';
ootApp.controller('RegistrationCtrl', ['$scope', '$http', 'geolocation', 'registrationService', 'Notification',
      function ($scope, $http, geolocation, registrationService, Notification) {

          $scope.User = {};

          $scope.Register = function () {
              if ($scope.regForm.$invalid) return;
              alert($scope.User.EmployeeMobileNumber);
              var employeeId = $scope.User.EmployeeID;
              registrationService.isRegistered(employeeId).then(function (dataResponse) {
                  $scope.existingUser = dataResponse.data;
                  if ($scope.existingUser == true || $scope.existingUser === 'true') {
                      $scope.showAlert();
                      alert("Already registered");
                  }
                  else {
                      $scope.addEmployee();
                  }
              }, function (error) {
                  alert(error.data);
              })
          };

          $scope.addEmployee = function () {
              registrationService.create($scope.User).then(function (dataResponse) {
                  $scope.User = dataResponse.data;
              });
          };

          $scope.getLocation = function () {
              $scope.User.CheckInLocation = 'Please wait...'
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
          };

          $scope.showAlert = function () {
              Notification.alert(
                        'Already registered!',  // message
                        alertDismissed,        // callback
                        'Info',               // title
                        'OK'                  // buttonName
                );
          };

          $scope.alertDismissed = function () { };

      }]);
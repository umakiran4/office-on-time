'use strict';
ootApp.controller('RegistrationCtrl', ['$scope', '$rootScope', 'dbService', '$http', 'geolocation', 'registrationService', 'Notification', 'SpinnerDialog',
      function ($scope, $rootScope, dbService, $http, geolocation, registrationService, Notification, SpinnerDialog) {

          $scope.User = {};

          $scope.fillUserInformation = function () {
              if ($rootScope.userLocallyAvailable) {
                  $scope.User.EmployeeID = $rootScope.userFromStorage.item(0).empid;
                  $scope.User.EmployeeName = $rootScope.userFromStorage.item(0).fname;
                  $scope.User.LastName = $rootScope.userFromStorage.item(0).lname;
                  $scope.User.EmployeeEmail = $rootScope.userFromStorage.item(0).mail;
                  $scope.User.EmployeeMobileNumber = $rootScope.userFromStorage.item(0).mobile;
              }
          };

          $rootScope.$on('getResultSet', function (event, args) {
              if (args.resultSet.length > 0) {
                  $rootScope.userLocallyAvailable = true;
                  $rootScope.userFromStorage = args.resultSet;                 
              }
          });

          $scope.fillUserInformation();

          $scope.Register = function () {
              if ($scope.regForm.$invalid) return;
              SpinnerDialog.show();
              var employeeId = $scope.User.EmployeeID;
              registrationService.isRegistered(employeeId).then(function (dataResponse) {
                  SpinnerDialog.hide();
                  $scope.existingUser = dataResponse.data;
                  if ($scope.existingUser == true || $scope.existingUser === 'true') {
                      $scope.showAlert('Already registered!');
                  }
                  else {
                      $scope.addEmployee();
                  }
              }, function (error) {
                  SpinnerDialog.hide();
                  $scope.showAlert(error.data.code);
              })
          };

          $scope.addEmployee = function () {
              $rootScope.globalUser = $scope.User;
              if ($rootScope.userLocallyAvailable == false) {
                  dbService.createUser();                 
              }
              registrationService.create($scope.User).then(function (dataResponse) {
                  $scope.User = dataResponse.data;
              });

              dbService.getUser();              
          };

          $scope.getLocation = function () {
              $scope.User.CheckInLocation = 'Please wait...'
              geolocation.getCurrentPosition(function (position) {
                  $scope.showAlert('Latitude: ' + position.coords.latitude + '\n' +
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

          $scope.showAlert = function (message) {
              Notification.alert(
                        message,  // message
                        $scope.alertDismissed,        // callback
                        'Info',               // title
                        'OK'                  // buttonName
                );
          };

          $scope.alertDismissed = function () { };

      }]);
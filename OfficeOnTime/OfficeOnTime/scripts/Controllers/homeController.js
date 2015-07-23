'use strict';
ootApp.controller('HomeCtrl', ['$scope', '$rootScope', 'dbService',
        function ($scope, $rootScope, dbService) {

            dbService.createDB();

            $scope.getUserFromLocalStorage = function () {
                dbService.getUser();
            };

            $scope.getUserFromLocalStorage();

            $rootScope.$on('getResultSet', function (event, args) {
                if (args.resultSet.length > 0) {
                    $rootScope.userLocallyAvailable = true;                    
                    $rootScope.userFromStorage = args.resultSet;
                }
            });
        }
]);
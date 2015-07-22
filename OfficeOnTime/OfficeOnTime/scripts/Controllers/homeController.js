'use strict';
ootApp.controller('HomeCtrl', ['$scope', '$rootScope','storageDB', 
        function ($scope, $rootScope, storageDB) {
            storageDB.createdb();
            if ($rootScope.ootDB != null && $rootScope.ootDB !== undefined) {
                $rootScope.ootDB.transaction($scope.populateDB, $scope.errorCB, $scope.successCB);
            }

            $scope.populateDB = function (tx) {                
                tx.executeSql('CREATE TABLE IF NOT EXISTS USER (id unique, data)');
                tx.executeSql('INSERT INTO USER (id, data) VALUES (1, "First row")');
                tx.executeSql('INSERT INTO USER (id, data) VALUES (2, "Second row")');
            };

            $scope.successCB = function () {
                $rootScope.ootDB.transaction($scope.queryDB, $scope.errorCB);
            };

            $scope.errorCB = function (err) {
                alert("Error processing SQL: " + err.code);
            };

            $scope.queryDB = function (tx) {
                tx.executeSql('SELECT * FROM USER', [], $scope.querySuccess, $scope.errorCB);
            };

            $scope.querySuccess = function (tx, results) {
                var len = results.rows.length;
                alert("USER table: " + len + " rows found.");
                for (var i = 0; i < len; i++) {
                    alert("Row = " + i + " ID = " + results.rows.item(i).id + " Data =  " + results.rows.item(i).data);
                }
            };
        }


]);
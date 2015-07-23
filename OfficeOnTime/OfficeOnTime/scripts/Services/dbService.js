'use strict';
ootApp.service('dbService', function ($rootScope) {

    this.createDB = function () {
        var db = window.openDatabase("ootDB", "1.0", "OOT DB", 200000);
        db.transaction(this.populateDB, this.errorCallback);
    };

    this.populateDB = function (tx) {
        //tx.executeSql('DROP TABLE USER');
        tx.executeSql('CREATE TABLE IF NOT EXISTS USER (empid unique, fname, lname, mail, mobile)');
    };

    this.getUser = function () {
        var db = window.openDatabase("ootDB", "1.0", "OOT DB", 200000);
        db.transaction(this.executeGetQuery, this.errorCallback);
    };

    this.executeGetQuery = function (tx) {
        tx.executeSql('SELECT * FROM USER', [], function (tx, results) {
            $rootScope.$emit('getResultSet', { resultSet: results.rows });
        }, function (err) {
            alert(err.code);
        });
    };

    this.createUser = function () {
        var db = window.openDatabase("ootDB", "1.0", "OOT DB", 200000);
        db.transaction(this.executeInsertQuery, this.errorCallback);
    };

    this.executeInsertQuery = function (tx) {
        var insertSQL = 'INSERT INTO USER (empid, fname, lname, mail, mobile) VALUES (' + $rootScope.globalUser.EmployeeID + ',' + ' " ' + $rootScope.globalUser.EmployeeName + ' " ' + ',' + ' " ' + $rootScope.globalUser.LastName + ' " ' + ',' + ' " ' + $rootScope.globalUser.EmployeeEmail + ' " ' + ',' + $rootScope.globalUser.EmployeeMobileNumber + ')';
        tx.executeSql(insertSQL);
    };

    this.errorCallback = function (err) {
        alert(err.code);
    };
});
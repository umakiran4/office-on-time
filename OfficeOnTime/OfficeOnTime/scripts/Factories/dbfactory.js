'use strict';
ootApp.factory('storageDB', function ($rootScope, cordovaReady) {
    return {
        createdb: cordovaReady(function () {
            var db = window.openDatabase("ootDB", "1.0", "OOT DB", 200000);
            $rootScope.ootDB = db;
        })
    };

});
ootApp.service('categoryService', function ($http) {
    delete $http.defaults.headers.common['X-Requested-With'];
    this.getCategories = function () {
        // $http() returns a $promise that we can add handlers with .then()
        return $http({
            method: 'GET',
            url: 'http://localhost:20911/api/categorymaster/get'
        });
    }
});

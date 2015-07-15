'use strict';
ootApp.controller('FeedbackCtrl', ['$scope', 'categoryService',
        function ($scope, categoryService) {

            categoryService.getCategories().then(function (dataResponse) {
                $scope.ratings = dataResponse.data;                
            });

            $scope.rating = 0;
            $scope.current = 1;
            $scope.max = 5;
                      
            $scope.getSelectedRating = function (rating, category) {
                alert(category.trim()+':'+rating);
            }

            $scope.Submit = function () {
                alert($scope.rating);
            }
        }]);

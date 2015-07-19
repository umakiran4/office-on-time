'use strict';
ootApp.controller('FeedbackCtrl', ['$scope', 'categoryService',
        function ($scope, categoryService) {

            categoryService.getCategories().then(function (dataResponse) {
                $scope.categories = dataResponse.data;                
            },function (error) {
                alert(error.data);
            });

            $scope.rating = 0;
            $scope.current = 1;
            $scope.max = 5;
            $scope.surveyList = [];
            
            $scope.fillSurvey = function (EmployeeID, CategoryID, Rating) {
                $scope.surveyObj = {};
                $scope.surveyObj["EmployeeID"] = EmployeeID;
                $scope.surveyObj["CategoryID"] = CategoryID;
                $scope.surveyObj["Rating"] = Rating;                
            };

            $scope.getSelectedRating = function (rating, category) {
                alert(category + ':' + rating);
                $scope.fillSurvey(4827, category, rating);
                $scope.surveyList.push($scope.surveyObj);
            };

            $scope.Submit = function () {
                alert($scope.rating);
                categoryService.submitSurvey(JSON.stringify($scope.surveyList)).then(function (response) {
                    alert(response.status);
                }, function (error) {
                    alert(error.data);
                })
            };
        }]);

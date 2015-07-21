'use strict';
ootApp.controller('FeedbackCtrl', ['$scope', 'categoryService', 'Notification', 'SpinnerDialog',
        function ($scope, categoryService, Notification, SpinnerDialog) {

            categoryService.getCategories().then(function (dataResponse) {
                    SpinnerDialog.show();
                $scope.categories = dataResponse.data;
                    SpinnerDialog.hide();
            }, function (error) {
                SpinnerDialog.hide();
                Notification.alert(error.data.code, function () { },'Info','OK');               
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
                var addToList = true;
                angular.forEach($scope.surveyList, function (u, i) {
                    if (u.CategoryID === category) {
                        u.Rating = rating;
                        addToList = false;
                    }
                });
                if (addToList) {
                    $scope.fillSurvey(4827, category, rating);
                    $scope.surveyList.push($scope.surveyObj);
                }
            };

            $scope.Submit = function () {
                SpinnerDialog.show();
                categoryService.submitSurvey(JSON.stringify($scope.surveyList)).then(function (response) {
                    SpinnerDialog.hide();
                    Notification.alert(response.status, function () { }, 'Info', 'OK');                    
                }, function (error) {
                    SpinnerDialog.hide();
                    Notification.alert(error.data.Message, function () { }, 'Info', 'OK');
                })
            };
        }]);

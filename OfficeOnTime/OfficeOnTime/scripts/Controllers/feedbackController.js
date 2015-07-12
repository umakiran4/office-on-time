'use strict';
ootApp.controller('FeedbackCtrl', ['$scope', '$http',
        function ($scope, $http) {
            $scope.rating = {
                current: 5,
                max: 10
            };
            $scope.OnTime = { current: 5, max: 10 };
            $scope.Driving = { current: 5, max: 10 };
            $scope.Behaviour = { current: 5, max: 10 };
            $scope.Hygenic = { current: 5, max: 10 };
            $scope.Ratings = {}
            $scope.getSelectedRating = function (rating, info) {
                switch (info) {
                    case "OnTime":
                        $scope.Ratings.OnTime = rating;
                        break;
                    case "Driving":
                        $scope.Ratings.Driving = rating;
                        break;
                    case "Behaviour":
                        $scope.Ratings.Behaviour = rating;
                        break;
                    case "Hygenic":
                        $scope.Ratings.Hygenic = rating;
                        break;
                    default:
                        console.log(info);
                }
            }

            $scope.Submit = function () {
                alert($scope.Ratings.Driving);
            }
        }]);

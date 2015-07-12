'use strict';
ootApp.controller('FeedbackCtrl', ['$scope', '$http',
        function ($scope, $http) {
            $scope.rating = 0;

            $scope.ratings = [{
                current: 1,
                max: 5,
                category: 'OnTime'
            }, {
                current: 3,
                max: 5,
                category: 'Driving'
            }, {
                current: 2,
                max: 5,
                category: 'Behaviour'
            }, {
                current: 2,
                max: 5,
                category: 'Hygeine'
            }];
           
            $scope.getSelectedRating = function (rating, category) {
                alert(category+':'+rating);
            }

            $scope.Submit = function () {
                alert($scope.rating);
            }
        }]);

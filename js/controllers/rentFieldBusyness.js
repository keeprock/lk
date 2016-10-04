'use strict';

angular.module('lkApp')
    .controller('rentFieldBusyness', function ($scope, $rootScope) {

        var currentBusyness =  parseInt($scope.data) + 1;
        $scope.fieldLeft = (4 - currentBusyness);

        $scope.fieldOrdered = 1;

        $scope.changeField = function(){
            $scope.fieldLeft = parseInt($scope.fieldLeft) - 1;
            $scope.fieldOrdered = parseInt($scope.fieldOrdered) + 1;
            $rootScope.$broadcast('fieldOrdered', $scope.fieldOrdered);
        }

    });
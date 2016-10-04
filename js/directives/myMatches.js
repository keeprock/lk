angular.module('lkApp')
    .directive('mymatches', ['$templateCache', function($templateCache){
        return {
            templateUrl: '/templates/myMatches.html',
            scope: {
                person : '@'
            },
            controller: 'myMatchesCtrl',
            replace: true
        }
    }]);
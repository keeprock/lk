angular.module('lkApp')
    .directive('teamtable', function(){
        return {
            templateUrl: '/templates/teamTable.html',
            controller: 'teamTableCtrl',
            replace: true
        }
    });
angular.module('lkApp')
    .directive('clubcalendar', function(){
        return {
            templateUrl: '/templates/club_calendar.html',
            controller: 'clubCalendarCtrl',
            replace: true
        }
    });
angular.module('lkApp')
.directive('rentfieldschedulecalendar', function(){
   return {
       templateUrl: '/templates/rentFieldSchedule_calendar.html',
       controller: 'rentFieldCalendarCtrl',
       replace: true
   }
});
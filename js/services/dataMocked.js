'use strict';

angular.module('lkAppMock')
    .factory('rentFieldScheduleService', ['$http', 'SERVERS', '$q', function ($http, SERVERS, $q) {
        return {
            get: function () {
                var schedule = {
                    id: 1,
                    date: "2016-03-14 14:00:00",
                    date_end: "2016-03-14 15:30:00",
                    field_id: 1,
                    field_name: "Поле №1",
                    field_price: 2500,
                    busyness: 4
                };
                return schedule;
                //return $q.when(schedule);

            },
            getEmpty: function(){
                return {}
            },
            order: function (products) {
                return $http.post(SERVERS.CRM + '/apicrm/rent-field/order', products);
            }
        }
    }]);
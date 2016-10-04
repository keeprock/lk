'use strict';

angular.module('lkApp')
    .factory('rentFieldScheduleService', ['$http', 'SERVERS', function ($http, SERVERS) {
        return {
            get: function (date) {
                return $http.get(SERVERS.CRM + '/apicrm/rent-field', {
                    params: {
                        'date': date
                    }
                });
            },
            order: function (products) {
                return $http.post(SERVERS.CRM + '/apicrm/rent-field/order', products);
            }
        }
    }]);
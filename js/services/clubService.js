'use strict';

angular.module('lkApp')
    .factory('clubService', ['$http', 'SERVERS', function ($http, SERVERS) {
        return {
            get: function (date, person_id) {
                return $http.get(SERVERS.CRM + '/apicrm/club?XDEBUG_SESSION_START=PHPSTORM', {
                    params: {
                        'date': date,
                        'person_id': person_id
                    }
                });
            },
            order: function (props) {
                return $http.post(SERVERS.CRM + '/apicrm/club/order', props);
            }
        };
    }]);
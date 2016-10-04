'use strict';

angular.module('lkApp')
    // lodash support
    .constant('_', _)
    .constant('SERVERS', {
        "LK": "http://lk.app",
        "CRM": "http://crm.app"
    });

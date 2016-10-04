//angular.module('lkApp').config(['$httpProvider', function ($httpProvider) {
//    $httpProvider.interceptors.push(['$q', function ($q) {
//        return {
//            // optional method
//            'request': function (config) {
//                // do something on success
//
//                config.params = config.params || {};
//                config.params.XDEBUG_SESSION_START = "PHPSTORM";
//
//                return config;
//            },
//
//            // optional method
//            'requestError': function (rejection) {
//                // do something on error
//                return $q.reject(rejection);
//            },
//
//
//            // optional method
//            'response': function (response) {
//                // do something on success
//                return response;
//            },
//
//            // optional method
//            'responseError': function (rejection) {
//                // do something on error
//                return $q.reject(rejection);
//            }
//        };
//    }]);
//}]);
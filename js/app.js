angular.module('lkApp', ['angular.filter', 'angularMoment', 'ui.bootstrap', 'cgBusy', 'ui.router', 'ui.mask', 'ui-notification'])
    .run(function(amMoment) {
        amMoment.changeLocale('ru');
    });

angular.module('lkAppMock', ['angular.filter', 'angularMoment', 'ui.bootstrap', 'cgBusy', 'ui.router', 'ui.mask', 'ui-notification'])
    .run(function(amMoment) {
        amMoment.changeLocale('ru');
    });
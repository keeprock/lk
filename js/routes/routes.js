angular.module('lkApp')
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('rent', {
                url: "",
                //abstract: true
            })
            .state('rent.order', {
                url: "order",
                //onEnter: function($uibModal, $state, $stateParams) {
                //    var modalInstance = $uibModal.open({
                //        animation: true,
                //        templateUrl: 'templates/test.html',
                //        controller: 'modalTeamsCtrl',
                //        windowClass: 'rentFieldSchedule__modal'
                //    });
                //
                //    modalInstance.result.then(function(result) {
                //        console.log(result);
                //    });
                //}
            })
            .state('rent.order.team', {
               url:"/team",
                onEnter: function($uibModal, $state, $stateParams) {
                    var modalInstance = $uibModal.open({
                        animation: true,
                        templateUrl: '/templates/modalCreateTeam.html',
                        controller: 'modalTeamsCtrl',
                        windowClass: 'rentFieldSchedule__modal_team fade in'
                    });

                    modalInstance.result.then(function () {

                    }, function () {
                        $state.go('^');
                    });
                }
            });
    });
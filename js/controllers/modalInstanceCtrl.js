'use strict';

angular.module('lkApp')
    .controller('modalInstanceCtrl', ['$scope', '$http', '$uibModalInstance', 'schedule', 'teamService', 'rentFieldScheduleService', '$state', '$rootScope', 'Notification', function ($scope, $http, $uibModalInstance, schedule, teamService, rentFieldScheduleService, $state, $rootScope, Notification) {
        $scope.schedule = schedule;

        $scope.loaded = false;
        $scope.teamAdded = false;

        $scope.currentPrice = parseInt($scope.schedule.field_price);

        $scope.fieldOrdered = 1;

        $scope.ok = function () {
            $uibModalInstance.close();
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

        $scope.$on('teamName', function (evt, message) {
            $scope.teamName = message.teamName;
            $scope.teamId = message.id;
            $scope.teamAdded = true;
        });

        $scope.$on('fieldOrdered', function (evt, message) {
            $scope.currentPrice = parseInt($scope.schedule.field_price) * message;
            $scope.fieldOrdered = message;
            $scope.dirty = true;
        });

        $scope.getPersonIdPromise = teamService.getCurrentPersonId().then(function (response) {

            $scope.personId = response.data;

            $scope.orderRent = function () {

                if (typeof $scope.teamId !== 'undefined') {
                    var products = [
                        {
                            'customerId': $scope.personId,
                            'quantity': $scope.fieldOrdered,
                            'productSpecs': {
                                'field_size': $scope.fieldOrdered * 25,
                                'schedule_id': $scope.schedule.id,
                                'price': $scope.schedule.field_price,
                                'team_id': $scope.teamId
                            }
                        }
                    ];

                    $scope.orderPromise = rentFieldScheduleService.order(products).then(function (response) {
                        $rootScope.$broadcast('orderPlaced', true);
                        $state.go('rent');
                        $uibModalInstance.close();
                        Notification.success('Бронь выполнена');
                    });
                } else {
                    Notification.error({message: 'Сначала создайте команду ', positionX: 'right', positionY: 'top'});
                    $scope.classAnimate = 'error--focus';
                }




            };

            $scope.getCurrentTeamPromise = teamService.getCurrentTeam($scope.personId).then(function (response) {
                if (response.data) {
                    $scope.teamName = response.data.name;
                    $scope.teamId = response.data.id;
                    $scope.teamAdded = true;
                } else {
                    $scope.teamAdded = false;
                }
                $scope.loaded = true;
            });
        });


    }]);
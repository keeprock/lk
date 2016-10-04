'use strict';

angular.module('lkApp')
    .controller('modalClubCtrl', ['$scope', '$http', '$uibModalInstance', 'schedule', 'teamService', 'rentFieldScheduleService', 'clubService', '$state', '$rootScope', 'Notification', function ($scope, $http, $uibModalInstance, schedule, teamService, rentFieldScheduleService, clubService, $state, $rootScope, Notification) {
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

            $scope.clubRent = function () {

                var props = {
                    'person_id' : $scope.personId,
                    'schedule_id' : $scope.schedule.id,
                };

                $scope.clubPromise = clubService.order(props).then(function (response) {
                    console.log(response);
                    if (typeof response.data.code == "undefined") {
                        $rootScope.$broadcast('orderPlaced', true);
                        $state.go('rent');
                        $uibModalInstance.close();
                        Notification.success('Заказ выполнен выполнена');
                    } else {
                        // Тут дублируется запись в базе данных, т.е. человек регистрируется два раза
                        // на одну и ту же тренировку
                        $state.go('rent');
                        $uibModalInstance.close();
                        Notification.error('Ошибка при выполнении заказа');
                    }

                });
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
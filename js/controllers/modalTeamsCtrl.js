'use strict';

angular.module('lkApp')
    .controller('modalTeamsCtrl', ['$scope', '$http', 'teamService', '$uibModalInstance', '$state', '$rootScope', '_', function ($scope, $http, teamService, $uibModalInstance, $state, $rootScope, _) {
        $scope.players = [];

        $scope.ok = function () {
            $uibModalInstance.close();
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

        $scope.goBack = function () {
            $state.go('^');
            $uibModalInstance.close();
        };

        var teamName = $scope.teamName;

        $scope.saveTeam = function () {
            var players_id = [];

            _.forEach($scope.players, function (player) {
                players_id.push(player.id);
            });



            $scope.getPersonIdPromise = teamService.getCurrentPersonId().then(function (response) {
                $scope.personId = response.data;

                var data = {
                    'name': $scope.teamName,
                    'players': angular.toJson(players_id),
                    'captain_id': $scope.personId
                };

                if ($scope.teamForm.teamname.$valid) {
                    $scope.saveTeamPromise = teamService.saveTeam(data).then(function (response) {
                        $rootScope.$broadcast('teamName', response.data.response);
                        $state.go('^');
                        $uibModalInstance.close();
                    });
                }
            });


        };

        $scope.addPlayer = function () {
            var data = {
                'mobile_phone': $scope.phone
            };
            teamService.getPlayerInfo(data).then(function (response) {

                $scope.notificationPromise = teamService.createNotification(response.data[0].id).then(function (response) {

                });

                _.forEach(response.data, function (player) {
                    $scope.players.push(player);
                });

            });

            $scope.phone = null;
        };

        $scope.removePlayer = function (list, item) {
            _.remove(list, function (someItem) {
                return item === someItem
            });
        };


    }]);
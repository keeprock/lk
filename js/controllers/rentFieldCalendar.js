'use strict';

angular.module('lkApp')
    .controller('rentFieldCalendarCtrl', ['$scope', '$http', 'rentFieldScheduleService', '$uibModal','$state',
        function ($scope, $http, rentFieldScheduleService, $uibModal, $state) {

            var schedule_item = this;

            $scope.animationsEnabled = true;
            $scope.loaded = false;

            $scope.changeDate = function (event) {

                var date = event.currentTarget.getAttribute("data-date");

                $scope.toggleObject.currentDate = date;

                var params = {
                    "date": date
                };

                $scope.schedulePromise = rentFieldScheduleService.get(date).then(function (response) {
                    $scope.schedules = response.data;

                    $scope.formatDate = function (date) {
                        var date = date.split("-").join("/");
                        var dateOut = new Date(date);
                        return dateOut;
                    };
                });

            };

            $scope.schedules = rentFieldScheduleService.get();

            $scope.schedulePromise = rentFieldScheduleService.get().then(function (response) {
                $scope.schedules = response.data;

                $scope.loaded = true;

                $scope.formatDate = function (date) {
                    var date = date.split("-").join("/");
                    var dateOut = new Date(date);
                    return dateOut;
                };
            });

            $scope.$on('orderPlaced', function (evt, message) {
                var date = $scope.toggleObject.currentDate || '';
                if (message) {
                    $scope.schedulePromise = rentFieldScheduleService.get(date).then(function (response) {
                        $scope.schedules = response.data;

                        $scope.loaded = true;

                        $scope.formatDate = function (date) {
                            var date = date.split("-").join("/");
                            var dateOut = new Date(date);
                            return dateOut;
                        };
                    });
                }
            });

            $scope.open = function (_schedule) {

                // Используя UI Router (routes.js), переходим по адресу /order и открываем модальное окно со всеми
                // нашими данными
                $state.go('rent.order');

                var modalInstance = $uibModal.open({
                    animation: $scope.animationsEnabled,
                    templateUrl: '/templates/myModalContent.html',
                    controller: 'modalInstanceCtrl',
                    windowClass: 'rentFieldSchedule__modal',
                    resolve: {
                        schedule: function() {
                            return _schedule
                        }
                    }
                });

                modalInstance.result.then(function () {

                }, function () {
                    $state.go('^');
                });
            };

            $scope.close = function(){
                $scope.closeMsg = 'I was closed at: ' + new Date();
                $scope.shouldBeOpen = false;
            }

            $scope.identity = angular.identity;

            $scope.isEmpty = function (obj) {
                for (var i in obj) if (obj.hasOwnProperty(i)) return false;
                return true;
            };

        }]);
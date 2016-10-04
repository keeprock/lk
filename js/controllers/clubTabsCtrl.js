'use strict';

angular.module('lkApp')
    .controller('clubTabsCtrl', function ($scope, moment) {

        var startOfWeek = moment();
        var endOfWeek = moment().add(7, 'd');

        var today = moment();

        var days = [];
        var day = startOfWeek;
        var daysTitle = ['сегодня', 'завтра', 'послезавтра'];

        var currentDayIndex = 0;
        var currentDayItem;
        var currentDate;
        var currentTitle = '';

        while (day <= endOfWeek) {

            if (today.isSame(day, 'day')) {
                currentDayItem = parseInt(currentDayIndex);
                currentDate = day.format('YYYY-MM-DD');
            }

            if (currentDayIndex > 0 || currentDayIndex < daysTitle.length) {
                currentTitle = daysTitle[currentDayIndex];
            }

            days.push({
                moment: day.toDate(),
                title: currentTitle
            });

            day = day.clone().add(1, 'd');
            currentDayIndex++;
        }

        $scope.dates = days;

        $scope.currentDay = moment();

        $scope.toggleObject = {
            item: currentDayItem,
            currentDate: currentDate
        }

    });
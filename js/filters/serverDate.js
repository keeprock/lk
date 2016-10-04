/**
 * Этот функционал пока нигде не используется, но в дальнейшем может
 * потребоваться, когда нужно будет работать с разными часовыми поясами.
 * Форматирование даты c moment.js - http://momentjs.com/docs
 * @param input дата
 * @return дата в формате 'dd.MM.yyyy'
 */

angular.module('lkApp')
    .filter('serverDate', function ($filter) {
        return function (input) {
            var format = 'dd.MM.yyyy';
            var timezone
            '+03:00';
            if (!input || typeof input != 'date') {
                return '';
            }

            // toDate возвращает в текущей таймзоне, поэтому форматируем через moment.js
            // с указанной таймзоной
            return moment(input).utcOffset(timezone).formatWithJDF(format);
        };

    });
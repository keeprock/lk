'use strict';

angular.module('lkApp')
    .factory('teamService', ['$http','SERVERS', function ($http, SERVERS) {
        var promisePersonId;
        return {
            // Сохраняем команду
            saveTeam: function (data) {
                return $http.post(SERVERS.CRM + '/apicrm/rent-field/create-team', data);
            },
            deleteTeam: function (person_id, teamId) {
                return $http.get(SERVERS.CRM + '/apicrm/rent-field/delete-team', {
                    params: {
                        'person_id' : person_id,
                        'teamId' : teamId
                    }
                });
            },
            updateTeam: function(data) {
                return $http.post(SERVERS.CRM + '/apicrm/rent-field/update-team', data);
            },
            // Делаем запрос на поиск человека с определенным номером телефона
            getPlayerInfo: function (phone) {
                return $http.post(SERVERS.CRM + '/apicrm/rent-field/find-person', phone);
            },
            deleteMember: function (id) {
                return $http.post(SERVERS.CRM + '/apicrm/rent-field/delete-member', id);
            },
            // Получаем ID текущего залогиненного в системе пользователя
            // и кэшируем это значение чтобы каждый раз его не дергать
            // @todo Надо как то обнулять это значение при выходе или сбросе сессии,
            // чтобы один пользователь не зашел под другим
            getCurrentPersonId: function () {
                if (!promisePersonId) {
                    promisePersonId = $http.get(SERVERS.LK + '/user/get-person-id');
                }
                return promisePersonId;
            },
            // Получаем текущую команду капитана, если он капитаном является
            getCurrentTeam: function(captain_id) {
                return $http.get(SERVERS.CRM + '/apicrm/rent-field/get-captain-team', {
                    params: {
                        'captain_id': captain_id
                    }
                });
            },
            // Получаем всех членов выбранной команды
            getTeamMembers: function(teamId) {
                return $http.post(SERVERS.CRM + '/apicrm/team/team-members', teamId);
            },
            getPersonSchedule: function(person_id) {
                return $http.get(SERVERS.CRM + '/apicrm/rent-field/get-person-schedule', {
                    params: {
                        'person_id' : person_id
                    }
                });
            },
            createNotification: function(person_id) {
                return $http.get(SERVERS.LK + '/api/notification/create-notification', {
                    params: {
                        'person_id': person_id
                    }
                });
            }
        }
    }]);
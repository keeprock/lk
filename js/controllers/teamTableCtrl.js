'use strict';

angular.module('lkApp')
    .controller('teamTableCtrl', ['$scope', '$http', 'teamService', 'Notification',
        function ($scope, $http, teamService, Notification) {
            // Чтобы не вываливалась ошибка undefined при первоначальном запросе к $scope.players, нужно сделать
            // инициализацию пустым массивом.
            $scope.players = [];
            // Статус загрузки - пока он false, будет отображаться экран с надписью "Загрузка..."
            $scope.loaded = false;

            // Получаем id текущего пользователя. Поскольку мы не можем получить это напрямую через PHP
            // мы делаем запрос на личный кабинет (самого на себя) и получаем данные оттуда.
            $scope.getPersonIdPromise = teamService.getCurrentPersonId().then(function (response) {
                $scope.personId = response.data;

                // Проверяем, есть ли найдено personId команда. Если да, то получаем название этой команды.
                $scope.getCurrentTeamPromise = teamService.getCurrentTeam($scope.personId).then(function (response) {
                    // Команда есть
                    if (response.data) {
                        $scope.teamName = response.data.name;
                        $scope.teamId = response.data.id;
                        // Флаг для определения что команда есть. Используется для отображения разных режимов приложения
                        // - создание команды и редактирование уже существующей
                        $scope.teamAdded = true;

                        // Получаем список членов команды
                        $scope.teamMembersPromise = teamService.getTeamMembers($scope.teamId).then(function (response) {
                            console.log(response.data);
                            $scope.players = response.data;
                        });

                    } else {
                        // Команды нет, отображаем экран создания команды
                        $scope.teamAdded = false;
                    }
                    // Загрузка всех данных завершена, отображаем экран создания или редактирования команды,
                    // в зависимости от флага $scope.teamAdded
                    $scope.loaded = true;
                });

            });

            // Добавление игрока в команду

            $scope.addPlayer = function () {
                // Формируем данные для запроса к функции получения информации
                var data = {
                    'mobile_phone': $scope.phone
                };
                // Функция делает запрос с поиском по номеру телефона у person_id и возвращает
                // объект response.data со следующими параметрами из модели Person
                // id - id таблицы person
                // mobile_phone - Мобильный телефон
                teamService.getPlayerInfo(data).then(function (response) {
                    // Мы получаем данные из запроса, с помощью функции lodash (_) проходим по объекту
                    // response.data и заносим данные о игроке в основной массив $scope.players

                    $scope.notificationPromise = teamService.createNotification(response.data[0].id).then(function (response) {

                    });


                    // forEach может быть и не нужен, в большинстве случаев, всегда прилетает только один
                    // объект в response.data, но в данном случае избыточность не помешает.
                    _.forEach(response.data, function (player) {
                        $scope.players.push(player);
                    });

                    // Для чего нужен players_id. players_id содержит id всех пользователей, которые
                    // прикреплены к команде. Функция на стороне API проходит по этому списку как массиву
                    // и обрабатывает каждую запись отдельно и сохраняет пользователя или удаляет или делает
                    // другие плохие вещи.

                    var players_id = [];

                    _.forEach($scope.players, function (player) {
                        players_id.push(player.id);
                    });

                    // Данные которые передаются в функцию API

                    var data = {
                        'name': $scope.teamName,
                        'players': angular.toJson(players_id),
                        'captain_id': $scope.personId,
                        'teamId': $scope.teamId
                    };

                    // Проверяем, создана ли уже команда или нет. Переменная $scope.teamId получается раньше
                    // поэтому мы и можем ее проверить
                    if ($scope.teamId) {
                        // Запускаем функцию для обновления команды
                        $scope.updateTeamPromise = teamService.updateTeam(data).then(function (response) {
                            // Через специальный сервис нотификации делаем нотификацию
                            Notification.success('Игрок добавлен в команду');
                        });
                    } else {
                        // Запускаем функцию для создания команды
                        $scope.saveTeamPromise = teamService.saveTeam(data).then(function (response) {
                            Notification.success('Игрок добавлен в команду');

                        });
                    }
                });
                // Очищаем поле с телефоном
                $scope.phone = null;
            };

            // Удаление игрока из команды

            $scope.removePlayer = function (players, player) {
                // Тут немного магии - это функция из библиотеки lodash (_)
                //
                // player представляет собой объект из массива объектов players.
                // С помощью функции remove мы можем удалить массива players элемент равный другому элементу.
                //
                // Это специальная крутая функция - не нужно знать id, index, положение элемента в массиве.
                // Просто нужно передать сам объект и все сделается само собой.

                _.remove(players, function (someItem) {
                    return player === someItem
                });

                // Удаляем игрока из команды. Обычный запрос к API с id человека
                $scope.deleteMemberPromise = teamService.deleteMember(player.id).then(function (response) {
                    Notification.success('Игрок удален из команды');
                });
            };

            // Повторная отправка уведомления

            $scope.sendNotification = function (person_id) {
                $scope.notificationPromise = teamService.createNotification(person_id).then(function (response) {
                    Notification.success('Уведомление отправлено');
                });
            };

            // Сохранение команды

            $scope.saveTeam = function (form) {
                // players_id хранит информацию в ввиде массиве person_id для передачи в API CRM
                // После получения этих значений, API начинает работу с ними - добавляет, проверяет и так далее.
                // Всегда передаются ВСЕ игроки. Т.е., если даже добавился один человек, при сохранении все равно
                // будет отправлен полный список.
                // API об этом знает и все это обрабатывает правильно (там стоит проверка на это)

                var players_id = [];

                // Наполняем массив players_id данными
                _.forEach($scope.players, function (player) {
                    players_id.push(player.id);
                });

                // Формируем данные для отправки в функции API

                var data = {
                    'name': $scope.teamName,
                    'players': angular.toJson(players_id),
                    'captain_id': $scope.personId,
                    'teamId': $scope.teamId
                };

                // form.teamName.$valid - это специальная конструкция, которая отвечает за валидацию формы
                // form - это имя формы (<form name="form"></form>)
                // teamName - имя input (<input type="text" name="teamName"/>)
                // $valid - специальный параметр проверки на прохождение валидации
                // Сейчас это штука практически ничего не делает, кроме проверки на пустоту, но в дальнейшем
                // это все можно расширить.

                if (form.teamName.$valid) {
                    // Если команда уже создана
                    if ($scope.teamId) {
                        // Обновляем команду
                        $scope.updateTeamPromise = teamService.updateTeam(data).then(function (response) {
                            Notification.success('Команда обновлена');
                        });
                    } else {
                        // Если команда еще не создана, то сохраняем команду
                        $scope.saveTeamPromise = teamService.saveTeam(data).then(function (response) {
                            Notification.success('Команда сохранена');
                            // после создания команды, нам нужно где то хранить значение id команды.
                            // Поскольку наш интерфейс не перезагружается, то система должна знать,
                            // что была создана новая команда.
                            $scope.teamId = response.data.response.id;
                        });
                    }
                }


            };

            // Удаление команды

            $scope.deleteTeam = function (teamId) {


                $scope.deleteTeamPromise = teamService.deleteTeam($scope.personId, teamId).then(function (response) {

                    $scope.teamAdded = false;

                    Notification.success('Команда удалена');

                });


            };


        }]);
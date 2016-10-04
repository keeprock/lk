angular.module('lkApp')
    .directive('rentfieldbusyness', function () {
        return {
            templateUrl: '/templates/rentField_busyness.html',
            scope: {
                data: '='
            },
            link: function (scope, element, attrs, controller) {
                element.find('.modal__orderfield__add_fields__element').each(function (index, element) {
                    var $this = $(this);
                    if (index <= scope.data) {
                        $this.addClass('active');
                    }
                    $this.on('click', function (e) {
                        var _this = $(this);
                        _this.addClass('active');

                        scope.$apply(function () {
                                scope.changeField();
                            }
                        );
                    });

                });

            },
            controller: 'rentFieldBusyness',
            replace: true
        }
    });
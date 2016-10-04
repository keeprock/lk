describe("rentFieldTabsCtrl", function () {

    beforeEach(function(){
       module('lkApp');
    });

    beforeEach(function () {
        module('templates');
    });

    var $rootScope,
        $scope,
        controller,
        elm,
        $httpBackend,
        reqUrl,
        reqResponse;

    beforeEach(function () {

        inject(function ($injector) {
            $rootScope = $injector.get('$rootScope');
            $compile = $injector.get('$compile');
            $scope = $rootScope.$new();
            controller = $injector.get('$controller')("rentFieldTabsCtrl", {$scope: $scope});
            $httpBackend = $injector.get('$httpBackend');

            reqUrl = 'http://lk.app';
            reqResponse = {};



        });
    });


    describe("Initialize", function () {
        it("Should set current day object to be defined", function () {
            expect($scope.toggleObject.item).toBeDefined();
        });

        it("Should set class active to a current day tab", function () {

            elm = angular.element(
                '<rentfieldscheduletabs></rentfieldscheduletabs>'
            );

            $compile(elm)($scope);
            $scope.$digest();

            var tabs = elm.find('.date_item');

            expect(tabs).toHaveClass('active');

        });
    });

});
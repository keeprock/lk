describe("rentFieldCalendarCtrl", function () {

    beforeEach(function () {
        module('lkApp');
        module('templates');
        module('lkAppMock');
    });

    var $rootScope,
        $scope,
        controller,
        $q,
        deferred,
        $httpBackend,
        elm;

    beforeEach(function () {
        inject(function ($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            $compile = $injector.get('$compile');

            rentFieldScheduleService = $injector.get('rentFieldScheduleService');

            $httpBackend = $injector.get('$httpBackend');

            $q = $injector.get('$q');
            deferred = $injector.get('$q').defer();

            // Use a Jasmine Spy to return the deferred promise
            spyOn(rentFieldScheduleService, 'get').and.returnValue(deferred.promise);

            controller = $injector.get('$controller')("rentFieldCalendarCtrl", {
                $scope: $scope,
                rentFieldScheduleService: rentFieldScheduleService
            });

        });
    });

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    describe("Initialize", function () {
        it("$loaded изначально false", function () {
            expect($scope.loaded).toBeFalsy();
        });
    });

    describe("Main calendar functionality", function () {
        //it("it should resolve changeDate promise", function(){
        //    deferred.resolve([{ date: '2016-03-14' }]);
        //
        //    // We have to call apply for this to work
        //    $scope.$apply();
        //
        //    //console.log(rentFieldScheduleService.get('2016-03-14'));
        //    console.log($scope.schedules);
        //
        //    expect($scope.schedules).not.toBe(undefined);
        //});

        it("Should receive schedules", function () {
            $scope.schedules.then(function(response){
                expect(response).not.toBeEmpty();
            });
        });

        it("Should display schedule elements", function () {

            //deferred.resolve([{ date: '2016-03-14' }]);

            elm = angular.element(
                '<rentfieldschedulecalendar></rentfieldschedulecalendar>'
            );

            $compile(elm)($scope);

            $scope.$digest();

        });
    });


});
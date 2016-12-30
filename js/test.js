describe('Tests', function() {   
    beforeEach(module('yaMap'));
    beforeEach(module('YandexMapApp'));
    
    var MainController,
        scope;
    
    beforeEach(inject(function ($rootScope, $controller) {
        scope = $rootScope.$new();
        markController = $controller('mapController', {
            $scope: scope
        });
    }));
    
    /*it('Check start value'), function () {
        expect(scope.listMark).toEqual([]);
    }*/
    
    it('Save geoMark', function () {
        scope.listMark = [];
        var mark = new geoMark(
            Math.random().toString(16).slice(2),
            { "latitude": scope.newLonMark,
              "longitude": scope.newLatMark },
            'mark',
            true
        );
        scope.listMark.push(mark);
        expect(scope.listMark).not.toEqual([]);
        expect(scope.listMark).toContain(mark);
    });
    
    it('Check mark', function () {
       scope.listMark = [];
        var mark = new geoMark(
            Math.random().toString(16).slice(2),
            { "latitude": scope.newLonMark,
              "longitude": scope.newLatMark },
            'mark',
            true
        );
        scope.listMark.push(mark);
        scope.findMark(mark);
        expect(scope.findMark(mark)).toBe(true);
    });
    
    
    it('Circle is invisible by default', function () {
        expect(scope.newLatMark).toEqual(47.892854);
    });
});
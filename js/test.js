describe('Tests', function() {   
    beforeEach(module('YandexMapApp'));
    
    var mapController, scope;
    
    beforeEach(inject(function ($rootScope, $controller) {
        scope = $rootScope.$new();
        mapController = $controller('markController', { $scope: scope });
    }));
    
    it('Check start value (init)', function () {
        expect(scope.listMark).toEqual([]);
        expect(scope.radius).toBe(10000);
        expect(scope.newLatMark).toBe(47.892854);
        expect(scope.newLonMark).toBe(56.634761);
    });
    
    it('Find mark in list', function () {
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
    
    it('Save geoMark', function () {
        scope.listMark = [];
        var mark = new geoMark(
            Math.random().toString(16).slice(2),
            { "latitude": scope.newLonMark,
              "longitude": scope.newLatMark },
            'Новая метка',
            true
        );
        expect(scope.listMark).toEqual([]);
        scope.saveMark();
        expect(scope.listMark).not.toEqual([]);
        var coords = new coordinatesGeoMark({"latitude": 56.634761, "longitude": 47.892854});
        expect(scope.listMark[0].coordinates).toEqual(coords);
        expect(scope.listMark[0].name).toBe('Новая метка');
        expect(scope.listMark[0].visible).toEqual(true);
    });

    it('Delete geoMark', function () {
        scope.listMark = [];
        var mark = new geoMark(
            Math.random().toString(16).slice(2),
            { "latitude": 45.168546,
              "longitude": 46.16856 },
            'mark',
            true
        );
        var mark1 = new geoMark(
            Math.random().toString(16).slice(2),
            { "latitude": 47.468765,
              "longitude": 48.1268 },
            'mark1',
            true
        );
        scope.listMark.push(mark);
        scope.listMark.push(mark1);
        expect(scope.listMark).not.toEqual([]);
        expect(scope.listMark).toContain(mark);
        expect(scope.listMark).toContain(mark1);
        scope.deletePlacemarke(mark.id);
        expect(scope.listMark).not.toContain(mark);
        expect(scope.listMark).toContain(mark1);
    });
});
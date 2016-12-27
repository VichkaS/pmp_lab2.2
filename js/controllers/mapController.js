angular.module('YandexMapApp').controller("mapController", ['$scope', 'localStorageService', function ($scope, localStorageService) { 
    
    $scope.newNameMark = "Новая метка";
    $scope.newLatMark = 47.892854;
    $scope.newLonMark = 56.634761;
    $scope.myMap;
    var myCircle;
    
    var startRadius = localStorageService.get('radius');
    $scope.radius = startRadius || 10000;

    var markInStore = localStorageService.get('listMark');
    $scope.listMark = markInStore || [];
    
    $scope.afterMapInit = function(map) {
        $scope.myMap = map;
        
        // радиус видимости меток
        myCircle = new ymaps.Circle([[47.892854, 56.634761], $scope.radius], null, { visible: true });
        $scope.myMap.geoObjects.add(myCircle);
        
        // добавляем ранее сохраненные метки
        for (var i = 0; i < $scope.listMark.length; i++){
            myPlacemark = new ymaps.Placemark([$scope.listMark[i].coordinates.longitude, $scope.listMark[i].coordinates.latitude], 
                                              { balloonContent: $scope.listMark[i].name});
            $scope.myMap.geoObjects.add(myPlacemark);
        };
        $scope.markInRadius();
    };
    
    $scope.$watch('listMark', function () {
        localStorageService.set('listMark', $scope.listMark);
    }, true);
    
    $scope.$watch('radius', function () {
        localStorageService.set('radius', $scope.radius);
    }, true);
    
    $scope.beforeInit = function(){
        var geolocation = ymaps.geolocation;
        geolocation.get({
            provider: 'yandex',
            mapStateAutoApply: true
        }).then(function (result) {
            myPlace = new ymaps.Placemark(result.geoObjects.position, { iconCaption: "Я здесь! :)" },
                { preset: 'islands#greenDotIconWithCaption' });
            $scope.myMap.geoObjects.add(myPlace);
            $scope.center = result.geoObjects.position;
        });
    };
    
    $scope.saveMark = function(e) {
        var mark = new geoMark(
            Math.random().toString(16).slice(2),
            { "latitude": $scope.newLonMark,
              "longitude": $scope.newLatMark },
            $scope.newNameMark,
            true
        );
        
        if (!$scope.findMark(mark)) {
            $scope.myMap.geoObjects.add(
                new ymaps.Placemark([$scope.newLatMark, $scope.newLonMark], { balloonContent: $scope.newNameMark })
            );
            $scope.listMark.push(mark);
        }
        $scope.markInRadius();
    };
    
    $scope.findMark = function(mark) {
        for ( var i = 0; i < $scope.listMark.length; i++ ) {
            if (mark.coordinates.latitude == $scope.listMark[i].coordinates.latitude && mark.coordinates.longitude == $scope.listMark[i].coordinates.longitude) {
                return true;
            }
        }
        return false;
    };

    $scope.hideOrShowPlacemarke = function(id) {
        for ( var i = 0; i < $scope.listMark.length; i++ ) {
            if ( $scope.listMark[i].id == id ) {
                ymaps.geoQuery($scope.myMap.geoObjects).each(function(mark) {
                    coords = mark.geometry.getCoordinates();
                    if (coords[0] == $scope.listMark[i].coordinates.longitude && coords[1] == $scope.listMark[i].coordinates.latitude) {
                        $scope.listMark[i].visible = !$scope.listMark[i].visible;
                        mark.options.set('visible', $scope.listMark[i].visible);                    
                    }
                })
            }
        }
    };

    $scope.deletePlacemarke = function(id) {
        for ( var i = 0; i < $scope.listMark.length; i++ ) {
            if ( $scope.listMark[i].id == id ) {
                $scope.myMap.geoObjects.each(function(mark) {
                    coords = mark.geometry.getCoordinates();
                    if (coords[0] == $scope.listMark[i].coordinates.longitude && coords[1] == $scope.listMark[i].coordinates.latitude) {
                        $scope.myMap.geoObjects.remove(mark);
                        $scope.listMark.splice(i, 1);
                    }
                });
                continue;
            };
        };
    };
    
    $scope.saveRadius = function() {
        myCircle.geometry.setRadius($scope.radius);
        $scope.markInRadius();
    };

    $scope.markInRadius = function() {
        var objectsInsideCircle = ymaps.geoQuery($scope.myMap.geoObjects).searchIntersect(myCircle);
        objectsInsideCircle.setOptions('visible', true);
        ymaps.geoQuery($scope.myMap.geoObjects).remove(objectsInsideCircle).setOptions('visible', false);
    };
}]);
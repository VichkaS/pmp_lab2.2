angular.module('YandexMapApp').controller("mapController", ['$scope', 'localStorageService', function ($scope, localStorageService) { 
    
    $scope.listMark = [];
    $scope.geoObjects=[];
    $scope.newNameMark = "12345";
    $scope.newLatMark = 47.892854;
    $scope.newLonMark = 56.634761;
    
    $scope.myMap;
    $scope.afterMapInit = function(map) {
      $scope.myMap = map;
    };
    
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
        { "latitude": $scope.newLatMark,
          "longitude": $scope.newLonMark },
        $scope.newNameMark,
        true
    );
    
    $scope.myMap.geoObjects.add(
            new ymaps.Placemark([$scope.newLatMark, $scope.newLonMark], { balloonContent: $scope.newNameMark })
        );
        
    //if (!findMark(mark)) {
    
    $scope.listMark.push(mark);
    //mark.print();
    //objlocalStorage.saveGeoMark(mark);
    
        //}
    //markInRadius();
    //return false;
        
    };
    
    $scope.hideOrShowPlacemarke = function(id) {
        for ( var i = 0; i < $scope.listMark.length; i++ ) {
            if ( $scope.listMark[i].id == id ) {
                ymaps.geoQuery($scope.myMap.geoObjects).each(function(mark) {
                    coords = mark.geometry.getCoordinates();
                    if (coords[0] == $scope.listMark[i].coordinates.latitude && coords[1] == $scope.listMark[i].coordinates.longitude) {
                        $scope.listMark[i].visible = !$scope.listMark[i].visible;
                        mark.options.set('visible', $scope.listMark[i].visible);                    
                        //objlocalStorage.change(listMark[i]);
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
                    if (coords[0] == $scope.listMark[i].coordinates.latitude && coords[1] == $scope.listMark[i].coordinates.longitude) {
                        $scope.myMap.geoObjects.remove(mark);
                        $scope.listMark.splice(i, 1);
                        //$('#marks').empty();
                        //printListMark(listMark);
                    }
                });
                continue;
            };
        };
        //objlocalStorage.delete(id);
    };

}]);
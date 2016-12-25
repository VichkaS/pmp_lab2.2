angular.module('YandexMapApp').controller("mapController", ['$scope', 'localStorageService', function ($scope, localStorageService) { 
    $scope.listMark = [];
    $scope.beforeInit = function(){
    var geolocation = ymaps.geolocation;
    geolocation.get({
        provider: 'yandex',
        mapStateAutoApply: true
    }).then(function (result) {
        $scope.geoObjects.push({
            geometry:{
                type:'Point',
                coordinates:result.geoObjects.position
            },
            properties:{
                balloonContent:'Определено по IP'
            }
        });
        $scope.center = result.geoObjects.position;
        $scope.$digest();
    });

    geolocation.get({
        provider: 'browser',
        mapStateAutoApply: true
    }).then(function (result) {

        // Синим цветом пометим положение, полученное через браузер.
        // Если браузер не поддерживает эту функциональность, метка не будет добавлена на карту.
        $scope.geoObjects.push({
            geometry:{
                type:'Point',
                coordinates:result.geoObjects.position
            },
            properties:{
                balloonContent:'Определено по данным браузера'
            }
        });
        $scope.$digest();
    });
};
$scope.geoObjects=[];
    
    
    
}]);
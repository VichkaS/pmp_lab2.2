angular.module('YandexMapApp').controller("markController", ['$scope', function ($scope) { 
    
    $scope.newNameMark = "Новая метка";
    $scope.newLatMark = 47.892854;
    $scope.newLonMark = 56.634761;
    
    $scope.radius = 10000;
    $scope.listMark = [];
    
    $scope.saveMark = function() {
        var mark = new geoMark(
            Math.random().toString(16).slice(2),
            { "latitude": $scope.newLonMark,
              "longitude": $scope.newLatMark },
            $scope.newNameMark,
            true
        );
        
        if (!$scope.findMark(mark)) {
            $scope.listMark.push(mark);  
        }      
    };
    
    $scope.findMark = function(mark) {
        for ( var i = 0; i < $scope.listMark.length; i++ ) {
            if (mark.coordinates.latitude == $scope.listMark[i].coordinates.latitude && mark.coordinates.longitude == $scope.listMark[i].coordinates.longitude) {
                return true;
            }
        }
        return false;
    };

    $scope.deletePlacemarke = function(id) {
        for ( var i = 0; i < $scope.listMark.length; i++ ) {
            if ( $scope.listMark[i].id == id ) {
                $scope.listMark.splice(i, 1);
            }
        };
    };
}]);
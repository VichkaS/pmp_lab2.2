angular.module('YandexMapApp').directive("dropzone", function() {
    return {
        restrict : 'A',
        scope: true,
        link: function (scope, elem) {
            elem.on('dragover', function(e) {
                e.preventDefault();
                e.stopPropagation();
            });
            elem.on('dragenter', function(e) {
                e.preventDefault();
                e.stopPropagation();
            });
            
            elem.on('drop', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                var file = e.dataTransfer.files[0];
                var reader = new FileReader();
                
                reader.onload = (function(theFile) {
                        return function(e) {
                            var listJsonObj = JSON.parse(e.target.result);
                                
                            for (var i = 0; i < listJsonObj.length; i++){
                                myGeoObj = new geoMark(
                                    Math.random().toString(16).slice(2), 
                                    listJsonObj[i].coordinates, 
                                    listJsonObj[i].name, 
                                    true );
                                if (!scope.findMark(myGeoObj)) {
                                    scope.listMark.push(myGeoObj);
                                    myPlacemark = new ymaps.Placemark([scope.listMark[i].coordinates.latitude, scope.listMark[i].coordinates.longitude], 
                                                                        { balloonContent: scope.listMark[i].name });
                                    scope.myMap.geoObjects.add(myPlacemark);
                                    console.log(scope.myMap.geoObjects);
                                    scope.$apply();
                                    //objlocalStorage.saveGeoMark(myGeoObj);
                                }
                            };
                        };
                    })(file);
                reader.readAsText(file, "utf-8");
                return false;
            });
        }
    }
});
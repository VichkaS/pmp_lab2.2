angular.module('YandexMapApp').directive("dropzone", function() {
    return {
        restrict : 'A',
        scope: true,
        link: function (scope, elem) {
            console.log(scope);
            elem.on('dragover', function(e) {
                e.preventDefault();
                e.stopPropagation();
            });
            elem.on('dragenter', function(e) {
                e.preventDefault();
                e.stopPropagation();
            });
            console.log(scope.listMark);
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
                                
                                scope.listMark.push(myGeoObj);
                                myPlacemark = new ymaps.Placemark([scope.listMark[i].coordinates.latitude, scope.listMark[i].coordinates.longitude], 
                                                                    { balloonContent: scope.listMark[i].name });
                                console.log(myPlacemark);
                                scope.myMap.geoObjects.add(myPlacemark);
                                //objlocalStorage.saveGeoMark(myGeoObj);
                            };
                        };
                    })(file);
                reader.readAsText(file, "utf-8");
                console.log(scope.listMark);
                return false;
            });
        }
    }
});

/*function checkMark(mark) {
    for ( var i = 0; i < listMark.length; i++ ) {
        if (mark.coordinates.latitude == listMark[i].coordinates.latitude && mark.coordinates.longitude == listMark[i].coordinates.longitude) {
            return false;
        }
    }
    return true;
};*/
angular.module('YandexMapApp').directive("dropzone", function() {
    return {
        restrict : "A",
        replace: true,
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
                                console.log(listJsonObj.length);
                                myGeoObj = new geoMark(
                                    Math.random().toString(16).slice(2), 
                                    listJsonObj[i].coordinates, 
                                    listJsonObj[i].name, 
                                    true );
                                
                                scope.listMark.push(myGeoObj);
                                console.log(scope.listMark[0]);
                                myPlacemark = new ymaps.Placemark([scope.listMark[i].coordinates.latitude, scope.listMark[i].coordinates.longitude], 
                                    { balloonContent: scope.listMark[i].name });
                                console.log(myPlacemark);
                                scope.geoObjects.push(myPlacemark);
                                //objlocalStorage.saveGeoMark(myGeoObj);
                                myGeoObj.print();
                                
                            };
                        };
                    })(file);
                reader.readAsText(file, "utf-8");
                
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
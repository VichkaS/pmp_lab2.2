var geoMark = function(id, coords, name, visible) {
    this.id = id;
    this.coordinates = new coordinatesGeoMark(coords);
    this.name = name;
    this.visible = visible;
};
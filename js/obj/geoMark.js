var geoMark = function(id, coords, name, visible) {
    this.id = id;
    this.coordinates = new coordinatesGeoMark(coords);
    this.name = name;
    this.visible = visible;
    
    this.print = function() {
        $("<div class='placemark' id=" + this.id +">")
            .append($("<div id='name_mark' class='name_mark' contentEditable='true' tabindex='3'>").html(this.name))
            .on('focusout', function () { saveNewName($(this).attr('id'), $(this).text()) })
            .append($("<input class='button' id='btn_delete' type='submit' value='Удалить' />")
                   .on('click', function(e) { deletePlacemarke($(this).parent().attr('id')) }))
            .append($("<input class='button' id='btn_hide' type='submit' value='Скрыть/Показать' />")
                   .on('click', function(e) { hideOrShowPlacemarke($(this).parent().attr('id')) }))
            .appendTo("#marks");
    };
};
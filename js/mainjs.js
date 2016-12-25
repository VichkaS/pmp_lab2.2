var App = angular.module('YandexMapApp', ['LocalStorageModule', 'yaMap']);

App.config(function (localStorageServiceProvider) {
  localStorageServiceProvider
    .setPrefix('ls');
});

//Dropzone.autoDiscover = false;
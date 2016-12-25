var App = angular.module('YandexMapApp', ['LocalStorageModule']);

App.config(function (localStorageServiceProvider) {
  localStorageServiceProvider
    .setPrefix('ls');
});
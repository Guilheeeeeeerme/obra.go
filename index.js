window.$ = window.jQuery = require('jquery');
window.Tether  = require('Tether');

// var ol = require('ol');

var bootstrap = require('bootstrap');

var angular = require('angular');

var ngCamera = require('ng-camera');
var ngGeolocation = require('./js/ngGeolocation.min.js');
var angularSanitize = require('angular-sanitize')
var angularOL = require('angular-openlayers-directive');

var module = angular.module('app', ['openlayers-directive', 'camera', 'ngGeolocation']);

var QuestService = require('./app/service/quest.service.js');
var questService = new QuestService(module);

var MainController = require('./app/main/main.controller.js');
var mainController = new MainController(module);
/// <reference path="../../../typings/angularjs/angular.d.ts"/>
///<reference path="../../../typings/node/node.d.ts"/>

interface Window 
{
    StatusBar:any;     
}

interface Window 
{
    cordova:any;     
}

var app_module = angular.module('dea', [
    'ui.bootstrap',
    'ui.router',
    'ionic',
    require('../../../tmp/templates').name,
    require('../common').name,    
    require("./login").name
  ]);
alert('asd');
alert(require("./login").name);

app_module.run(($ionicPlatform)=>{
        $ionicPlatform.ready(()=>{
                if(window.cordova && window.cordova.plugins.keyboard){
                    window.cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                }
                if(window.StatusBar){
                    window.StatusBar.styleDefault();
                }
            });
    });

app_module.config(($stateProvider, $urlRouterProvider) =>{

    });
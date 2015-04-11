/// <reference path="../../../../typings/tsd.d.ts"/>


var the_module = angular.module("dea.login", [])

the_module.config(["$stateProvider", "$urlRouterProvider",
        ($stateProvider, $urlRouterProvider) =>
        {
            $stateProvider.state('login',
                {
                    url: '/login',
                    templateUrl: 'app/login/login.html',
                    controller: 'LoginController'
                });

            $urlRouterProvider.otherwise("login");            
        }


    ]);

var login_controller = require("./login_controller");

the_module.controller("LoginController", login_controller.factory);

export = the_module;
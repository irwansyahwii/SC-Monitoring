the_module = angular.module("dea.login", [])

the_module.config(["$stateProvider", "$urlRouterProvider",
        ($stateProvider, $urlRouterProvider) ->
            $stateProvider.state 'login',
                url: '/login'
                templateUrl: 'app/login/login.html'
                controller: 'LoginController'
            $urlRouterProvider.otherwise("login")


    ])

login_controller = require("./login_controller")

the_module.controller("LoginController", login_controller.factory)

module.exports = the_module
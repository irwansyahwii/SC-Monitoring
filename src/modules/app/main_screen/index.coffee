the_module = angular.module("dea.main_screen", [])

the_module.config(["$stateProvider",
        ($stateProvider) ->
            $stateProvider.state "main_for_manager",
                url: "/main"
                templateUrl: "app/main_screen/main_for_manager.html"
    ])


module.exports = the_module
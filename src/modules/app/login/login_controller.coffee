'use strict'



User = require("User")

class LoginController
    @factory:["$scope", "$log", "RoutingService", ($scope, $log, RoutingService) ->
        controller = new LoginController($scope, $log, RoutingService)

        controller
    ]

    constructor: (@scope, @log, @RoutingService) ->

        @scope.user = new User(@log)

        @scope.login = () =>
            @log.debug("scope.login executing...")

            if @scope.user.login()
                @scope.user.fetch
                @RoutingService.gotoMainScreen()
            else
                @displayError(@scope.user.errors)


            @log.debug("scope.login END")

    displayError:(errors) ->
        @log.debug("alertify:")
        @log.debug(alertify)
        alertify.set("notifier", "position", "bottom-right")
        alertify.error("Please enter your username")


module.exports = LoginController
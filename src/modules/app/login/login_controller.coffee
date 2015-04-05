'use strict'



User = require("User")

class LoginController
    @factory:["$scope", "$log", "RoutingService", "$q", "$timeout", 
        ($scope, $log, RoutingService, $q, $timeout) ->
            controller = new LoginController($scope, $log, RoutingService, $q, $timeout)

            controller
    ]

    constructor: (@scope, @log, @RoutingService, @q, @timeout) ->

        @scope.user = new User(@log, @q, @timeout)

        @scope.login = () =>
            @log.debug("scope.login executing...")

            @scope.user.login()
                .then (login_result) =>
                    @RoutingService.gotoMainScreen()
                .catch (error) =>
                    @displayError(@scope.user.errors)  

            # if @scope.user.login()
            #     @scope.user.fetch
            #     @RoutingService.gotoMainScreen()
            # else
            #     @displayError(@scope.user.errors)


            @log.debug("scope.login END")

    displayError:(errors) ->
        @log.debug("alertify:")
        @log.debug(alertify)
        alertify.set("notifier", "position", "bottom-right")
        alertify.error("Please enter your username")


module.exports = LoginController
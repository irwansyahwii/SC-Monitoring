class RoutingService
    @factory: ["$state",
        ($state) ->
            service = new RoutingService($state)

            service
    ]

    constructor:(@state) ->

    gotoMainScreen: ->
        @state.go("main_for_manager")

module.exports = RoutingService
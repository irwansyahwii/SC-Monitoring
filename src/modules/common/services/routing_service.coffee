class RoutingService
    @factory: ["$state",
        ($state) ->
            service = new RoutingService($state)

            service
    ]

    constructor:(@state) ->

    gotoMainScreen: ->
        @state.go("main")

module.exports = RoutingService
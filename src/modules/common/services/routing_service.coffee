class RoutingService
    @factory: ["$state", "$log",
        ($state, $log) ->
            service = new RoutingService($state, $log)

            service
    ]

    constructor:(@state, @log) ->

    gotoMainScreen: ->
        @log.debug("RoutingService.gotoMainScreen() executing...")
        @state.go("main_for_manager")

    gotoListOfNewSCScreen: ->
        @log.debug("RoutingService.gotoListOfNewSCScreen() executing...")
        @state.go("main_for_manager.tab_new_view")

    gotoListOfPaymentStatusScreen: ->
        @log.debug("RoutingService.gotoListOfPaymentStatusScreen() executing...")
        @state.go("main_for_manager.tab_payment_status_view")

module.exports = RoutingService
class MainForManagerController
    @factory: ["$scope", "RoutingService", "$log",        
        ($scope, RoutingService, $log) ->
            $log.debug("MainForManagerController.factory() executing...")
            controller = new MainForManagerController($scope, RoutingService, $log)

            controller
    ]

    constructor: (@scope, @RoutingService, @log) ->
        @scope.item_clicked = =>
            alert("adasd")
            
        @scope.on_tab_new_selected = =>
            @RoutingService.gotoListOfNewSCScreen()

        @scope.on_tab_payment_status_selected = =>
            @RoutingService.gotoListOfPaymentStatusScreen()            

module.exports = MainForManagerController

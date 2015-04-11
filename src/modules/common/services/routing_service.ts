/// <reference path="../../../../typings/tsd.d.ts" />

import User = require("../domain_models/User");

class RoutingService {
    static get factory() : any[] {
        var result = ["$state", "$log", 
            ($state, $log) => {
                    var service = new RoutingService($state, $log);

                    return service;
                }];

        return result;
    }

    private $log : ng.ILogService;
    private $state : angular.ui.IStateService;

    constructor($state: angular.ui.IStateService, $log) {
        this.$log = $log;
        this.$state = $state;
    }

    gotoMainScreen() {
        this.$log.debug("RoutingService.gotoMainScreen() executing...");
        this.$log.debug(User.current_user);
        this.$log.debug("User.current_user.roles[0]: ", User.current_user.roles[0]);
        if (User.current_user.roles[0] === "manager"){
            this.$state.go("main_for_manager");    
        }
        else{
            alert("No main screen yet");
        }
        
    }

    gotoListOfNewSCScreen() {
        this.$log.debug("RoutingService.gotoListOfNewSCScreen() executing...");
        this.$state.go("main_for_manager.tab_new_view");
    }
    gotoListOfPaymentStatusScreen() {
        this.$log.debug("RoutingService.gotoListOfPaymentStatusScreen() executing...");
        this.$state.go("main_for_manager.tab_payment_status_view");
    }
}

export = RoutingService;
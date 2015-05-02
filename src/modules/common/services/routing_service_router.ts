/// <reference path="../../../../typings/tsd.d.ts" />

import User = require("../domain_models/User");
import RoutingServiceForManager = require("./routing_service");
import RoutingServiceForAdmin = require("./routing_service_for_admin");
import IRoutingService = require("./IRoutingService");

class RoutingServiceRouter implements IRoutingService {
    static get factory() : any[] {
        var result = ["$state", "$log", 
            ($state, $log) => {
                    var service = new RoutingServiceRouter($state, $log);

                    return service;
                }];

        return result;
    }

    private $log : ng.ILogService;
    private $state : angular.ui.IStateService;
    private routing_service: IRoutingService;


    constructor($state: angular.ui.IStateService, $log) {
        this.$log = $log;
        this.$state = $state;
        this.routing_service = null;
    }

    role_is_manager():boolean{
        return User.current_user.roles[0] === "manager";
    }

    gotoMainScreen() {
        if (this.role_is_manager()){
            console.log("RoutingServiceForManager");
            this.routing_service = new RoutingServiceForManager(this.$state, this.$log);
        }
        else{
            console.log("RoutingServiceForAdmin");
            this.routing_service = new RoutingServiceForAdmin(this.$state, this.$log);
        }
        
        this.routing_service.gotoMainScreen();
    }

    gotoListOfNewSCScreen() {
        this.routing_service.gotoListOfNewSCScreen();
    }
    gotoListOfPaymentStatusScreen() {
        this.routing_service.gotoListOfPaymentStatusScreen();
    }

    showPaymentStatusListView(button_bar_id) {
        this.routing_service.showPaymentStatusListView(button_bar_id);
    }

    showTabNewDetailSC(sc){
        this.routing_service.showTabNewDetailSC(sc);            
    }
    showTabPaymentStatusApprovedDetailSC(sc){
        this.routing_service.showTabPaymentStatusApprovedDetailSC(sc);
    }
    showTabPaymentStatusPODetailSC(sc){
        this.routing_service.showTabPaymentStatusPODetailSC(sc);
    }
    showTabPaymentStatusGRDetailSC(sc){
        this.routing_service.showTabPaymentStatusGRDetailSC(sc);        
    }

    gotoListOfRejectedScreen() {
        this.routing_service.gotoListOfRejectedScreen();        
    }

    showTabRejectedDetailSC(sc){
        this.routing_service.showTabRejectedDetailSC(sc);
    }

    showNewSCScreen(){
        this.routing_service.showNewSCScreen();
    }

    showEditSCScreen(sc){
        this.routing_service.showEditSCScreen(sc);
    }

}

export = RoutingServiceRouter;
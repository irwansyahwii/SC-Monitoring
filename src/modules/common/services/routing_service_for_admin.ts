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
        this.$state.go("main_for_admin");    
        
    }

    gotoListOfNewSCScreen() {
        this.$state.go("main_for_admin.tab_new_view");
    }
    gotoListOfPaymentStatusScreen() {
        this.$log.debug("RoutingService.gotoListOfPaymentStatusScreen() executing...");
        this.$state.go("main_for_manager.tab_payment_status_view");
    }

    showPaymentStatusListView(button_bar_id) {
        this.$log.debug("RoutingService.showListView() button_bar_id:", button_bar_id);
        if(button_bar_id === "approved"){
            this.$state.go("main_for_manager.tab_payment_status_view.approved");
        }
        else if(button_bar_id === "po"){
            this.$state.go("main_for_manager.tab_payment_status_view.po");
        }
        else if(button_bar_id === "gr"){
            this.$state.go("main_for_manager.tab_payment_status_view.gr");
        }
    }

    showTabNewDetailSC(sc){
        this.$log.debug("showTabNewDetailSC called");
        this.$state.go("main_for_manager.show_detail_sc");        
    }
    showTabPaymentStatusApprovedDetailSC(sc){
        this.$log.debug("showTabPaymentStatusApprovedDetailSC called");
        this.$state.go("main_for_manager.approved_show_detail_sc");        
    }
    showTabPaymentStatusPODetailSC(sc){
        this.$log.debug("showTabPaymentStatusPODetailSC called");
        this.$state.go("main_for_manager.po_show_detail_sc");        
    }
    showTabPaymentStatusGRDetailSC(sc){
        this.$log.debug("showTabPaymentStatusGRDetailSC called");
        this.$state.go("main_for_manager.gr_show_detail_sc");                
    }

    gotoListOfRejectedScreen() {
        this.$log.debug("RoutingService.gotoListOfRejectedScreen() executing...");
        this.$state.go("main_for_manager.tab_rejected_view");
    }

    showTabRejectedDetailSC(sc){
        this.$log.debug("showTabRejectedDetailSC called");
        this.$state.go("main_for_manager.rejected_show_detail_sc");                        
    }

    showNewSCScreen(){
        this.$state.go("main_for_admin.new_sc");
    }

    showEditSCScreen(sc){
        this.$state.go("main_for_admin.edit_sc", {sc_number: sc.sc_number});
    }
}

export = RoutingService;
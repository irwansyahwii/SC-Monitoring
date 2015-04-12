/// <reference path="../../../../typings/tsd.d.ts" />

import RoutingService = require("../../common/services/routing_service");
import User = require("../../common/domain_models/user");
import SC = require("../../common/domain_models/SC");

interface IMainControllerScope extends ng.IScope{
    current_user: User;    
    on_tab_new_selected();
    on_tab_payment_status_selected();
    to_moment(dt);
    button_bar_clicked(button_id:string);
    selected_button_bar_id:string;
    show_tab_new_detail_sc(sc:SC);
    selected_sc: SC;
    toggleSideMenu();
    show_approved_detail_sc(sc:SC);
    show_po_detail_sc(sc:SC);
    back_button_clicked();
}

class MainForManagerController{
    static get factory(): any[] {
        var arr = ["$scope", "RoutingService", "$log", "$ionicSideMenuDelegate", "$ionicHistory",
            ($scope, RoutingService, $log, $ionicSideMenuDelegate, $ionicHistory) =>{
                var controller = new MainForManagerController($scope, RoutingService, $log, $ionicSideMenuDelegate, $ionicHistory);

                return controller;
            }];

        return arr;
    }

    private $scope: IMainControllerScope;
    private RoutingService : RoutingService;
    private $log: ng.ILogService;
    private $ionicSideMenuDelegate:any;
    private selected_tab_id:string;
    private $ionicHistory:any;

    constructor($scope: IMainControllerScope, RoutingService: RoutingService, 
        $log: ng.ILogService, $ionicSideMenuDelegate:any, $ionicHistory) {

        this.$scope = $scope;
        this.RoutingService = RoutingService;
        this.$log = $log;
        this.$ionicSideMenuDelegate = $ionicSideMenuDelegate;
        this.$ionicHistory = $ionicHistory;


        this.$scope.current_user = User.current_user;

        this.$scope.back_button_clicked = () =>{
            this.$log.debug("back_button_clicked called");
            // this.$log.debug(this.$ionicHistory.currentStateName());

            var current_state =  this.$ionicHistory.currentStateName();

            // this.$log.debug(this.$ionicHistory.backView());


            if(current_state === "main_for_manager.po_show_detail_sc"){
                var back_view = this.$ionicHistory.backView();
                back_view.stateId = "main_for_manager.tab_payment_status_view.po";
                back_view.stateName = "main_for_manager.tab_payment_status_view.po";
                back_view.url = "/main/payment_status/po"
                this.$ionicHistory.goBack();

            }
            else{
                this.$ionicHistory.goBack();
            }
            
        }


        this.$scope.toggleSideMenu = () =>{
            this.$ionicSideMenuDelegate.toggleLeft();
        }

        this.$scope.show_tab_new_detail_sc = (sc: SC) => {
            this.$log.debug("show_detail_sc called");
            this.$log.debug(sc);
            this.$scope.selected_sc = sc;

            RoutingService.showTabNewDetailSC(sc);
        }

        this.$scope.show_approved_detail_sc = (sc:SC) => {
            this.$log.debug("show_approved_detail_sc called");
            this.$log.debug(sc);
            this.$scope.selected_sc = sc;

            RoutingService.showTabPaymentStatusApprovedDetailSC(sc);            
        }

        this.$scope.show_po_detail_sc = (sc:SC) => {
            this.$log.debug("show_po_detail_sc called");
            this.$log.debug(sc);
            this.$scope.selected_sc = sc;

            RoutingService.showTabPaymentStatusPODetailSC(sc);            
        }

        this.$scope.selected_button_bar_id = "approved";
        this.$scope.button_bar_clicked = (button_id) => {
            this.selected_tab_id = button_id;
            this.$scope.selected_button_bar_id = button_id;
            RoutingService.showPaymentStatusListView(this.$scope.selected_button_bar_id);
        }        

        this.$scope.to_moment = (dt) => {            
            var result = moment(dt, "DD/MM/YYYY").fromNow();

            return result;
        }

        this.$scope.on_tab_new_selected = () => {
            this.$log.debug("on_tab_new_selected called");
            this.selected_tab_id = "new";
            this.RoutingService.gotoListOfNewSCScreen();
        }
        this.$scope.on_tab_payment_status_selected = () => {            
            this.RoutingService.gotoListOfPaymentStatusScreen();
            this.$scope.button_bar_clicked("approved");
        }
    }
}

export = MainForManagerController;

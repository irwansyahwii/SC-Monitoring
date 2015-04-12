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
    show_detail_sc(sc:SC);
    selected_sc: SC;
    toggleSideMenu();
}

class MainForManagerController{
    static get factory(): any[] {
        var arr = ["$scope", "RoutingService", "$log", "$ionicSideMenuDelegate",
            ($scope, RoutingService, $log, $ionicSideMenuDelegate) =>{
                var controller = new MainForManagerController($scope, RoutingService, $log, $ionicSideMenuDelegate);

                return controller;
            }];

        return arr;
    }

    private $scope: IMainControllerScope;
    private RoutingService : RoutingService;
    private $log: ng.ILogService;
    private $ionicSideMenuDelegate:any;

    constructor($scope: IMainControllerScope, RoutingService: RoutingService, 
        $log: ng.ILogService, $ionicSideMenuDelegate:any) {

        this.$scope = $scope;
        this.RoutingService = RoutingService;
        this.$log = $log;
        this.$ionicSideMenuDelegate = $ionicSideMenuDelegate;


        this.$scope.current_user = User.current_user;


        this.$scope.toggleSideMenu = () =>{
            this.$ionicSideMenuDelegate.toggleLeft();
        }

        this.$scope.show_detail_sc = (sc: SC) => {
            this.$log.debug("show_detail_sc called");
            this.$scope.selected_sc = sc;

            RoutingService.showDetailSC(sc);
        }

        this.$scope.selected_button_bar_id = "approved";
        this.$scope.button_bar_clicked = (button_id) => {

            this.$scope.selected_button_bar_id = button_id;
            RoutingService.showListView(this.$scope.selected_button_bar_id);
        }        

        this.$scope.to_moment = (dt) => {            
            var result = moment(dt, "DD/MM/YYYY").fromNow();

            return result;
        }

        this.$scope.on_tab_new_selected = () => {
            this.RoutingService.gotoListOfNewSCScreen();
        }
        this.$scope.on_tab_payment_status_selected = () => {
            this.RoutingService.gotoListOfPaymentStatusScreen();
            this.$scope.button_bar_clicked("approved");
        }
    }
}

export = MainForManagerController;

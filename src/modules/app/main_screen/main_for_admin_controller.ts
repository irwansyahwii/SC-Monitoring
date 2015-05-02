/// <reference path="../../../../typings/tsd.d.ts" />

import IRoutingService = require("../../common/services/IRoutingService");
import User = require("../../common/domain_models/user");
import SC = require("../../common/domain_models/SC");

enum SC_MENU_BUTTONS{
    EDIT = 0
    , APPROVE = 1
    , REJECT = 2            
}

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
    show_gr_detail_sc(sc:SC);
    on_tab_rejected_selected();
    show_tab_rejected_detail_sc(sc:SC);
    new_sc_clicked();
    show_sc_menu(sc);
    logout();
}

class MainForManagerController{
    static get factory(): any[] {
        var arr = ["$scope", "RoutingService", "$log", "$ionicSideMenuDelegate", "$ionicHistory", "$timeout"
            , "$ionicActionSheet", "$ionicPopup",
            ($scope, RoutingService, $log, $ionicSideMenuDelegate, $ionicHistory, $timeout
                , $ionicActionSheet, $ionicPopup) =>{
                var controller = new MainForManagerController($scope, RoutingService, $log
                    , $ionicSideMenuDelegate, $ionicHistory, $timeout, $ionicActionSheet, $ionicPopup);

                return controller;
            }];

        return arr;
    }

    private $scope: IMainControllerScope;
    private RoutingService : IRoutingService;
    private $log: ng.ILogService;
    private $ionicSideMenuDelegate:any;
    private selected_tab_id:string;
    private $ionicHistory:any;
    private $timeout:ng.ITimeoutService;
    private $ionicActionSheet;
    private $ionicPopup;

    edit(sc){

    }

    constructor($scope: IMainControllerScope, RoutingService: IRoutingService, 
        $log: ng.ILogService, $ionicSideMenuDelegate:any, $ionicHistory, $timeout: ng.ITimeoutService
        , $ionicActionSheet, $ionicPopup) {

        this.$scope = $scope;
        this.RoutingService = RoutingService;
        this.$log = $log;
        this.$ionicSideMenuDelegate = $ionicSideMenuDelegate;
        this.$ionicHistory = $ionicHistory;
        this.$timeout = $timeout;
        this.$ionicActionSheet = $ionicActionSheet;
        this.$timeout = $timeout;
        this.$ionicPopup = $ionicPopup;


        this.$scope.current_user = User.current_user;

        this.$scope.new_sc_clicked = () => {
            this.RoutingService.showNewSCScreen();
        }


        this.$scope.logout = () => {
            User.current_user.logout()
                .then(() => {
                        this.RoutingService.gotoLoginScreen();
                    })
                .catch(() => {
                        this.RoutingService.gotoLoginScreen();
                    })
        }

        this.$scope.show_sc_menu = (sc)=>{
            var hideSheet = $ionicActionSheet.show({
                    buttons: [
                        {text: 'Edit'}
                        , {text: 'Approve'}
                        , {text: 'Reject'}
                    ]
                    , destructiveText: 'Hapus'
                    , titleText: 'Menu'
                    , cancelText: 'Cancel'
                    , buttonClicked: (index) => {
                        console.log("index: %d", index);

                        switch (index)
                        {
                            case SC_MENU_BUTTONS.EDIT: {                                
                                this.RoutingService.showEditSCScreen(sc);
                                break;
                            }
                            case SC_MENU_BUTTONS.APPROVE: {
                                this.RoutingService.showApproveSCScreen(sc);
                                break;
                            }
                            case SC_MENU_BUTTONS.REJECT: {
                                alert('reject');
                                break;
                            }                            
                            default: {
                                
                                console.log("Unknown button");
                            }
                        }
                    }
                    , destructiveButtonClicked: ()=>{

                        hideSheet();
                        var confirmPopup = this.$ionicPopup.confirm({
                                title: 'SC Monitoring'
                                , template: "Hapus SC dengan nomor:" + sc.sc_number
                            })

                        confirmPopup.then((is_ok) => {
                                if(is_ok){
                                    var found_index = -1;
                                    User.current_user.data.list_of_new_sc.forEach((item, index) =>{
                                            if(item.sc_number === sc.sc_number){
                                                found_index = index;
                                            }
                                        })

                                    if(found_index !== -1){
                                        User.current_user.data.list_of_new_sc.splice(found_index, 1);
                                    }

                                }
                            })

                    }
                });

        }

        this.$scope.back_button_clicked = () =>{
            this.$log.debug("back_button_clicked called");
            // this.$log.debug(this.$ionicHistory.currentStateName());

            var current_state =  this.$ionicHistory.currentStateName();

            this.$log.debug(current_state);
            this.$log.debug(this.$ionicHistory.backView());


            if(current_state === "main_for_manager.po_show_detail_sc"){
                var back_view = this.$ionicHistory.backView();
                back_view.stateId = "main_for_manager.tab_payment_status_view.po";
                back_view.stateName = "main_for_manager.tab_payment_status_view.po";
                back_view.url = "/main/payment_status/po"
                this.$ionicHistory.goBack();

            }
            else if(current_state === "main_for_manager.gr_show_detail_sc"){
                var back_view = this.$ionicHistory.backView();
                back_view.stateId = "main_for_manager.tab_payment_status_view.gr";
                back_view.stateName = "main_for_manager.tab_payment_status_view.gr";
                back_view.url = "/main/payment_status/gr"
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

        this.$scope.show_tab_rejected_detail_sc = (sc: SC) => {
            this.$log.debug("show_tab_rejected_detail_sc called");
            this.$log.debug(sc);
            this.$scope.selected_sc = sc;

            RoutingService.showTabRejectedDetailSC(sc);
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

        this.$scope.show_gr_detail_sc = (sc:SC) => {
            this.$log.debug("show_gr_detail_sc called");
            this.$log.debug(sc);
            this.$scope.selected_sc = sc;

            RoutingService.showTabPaymentStatusGRDetailSC(sc);            
        }

        this.$scope.selected_button_bar_id = "";
        this.$scope.button_bar_clicked = (button_id) => {
            this.$log.debug("button_bar_clicked, button_id: %s", button_id);

            this.$scope.selected_sc = null;
            this.selected_tab_id = button_id;
            this.$scope.selected_button_bar_id = button_id;
            // this.$scope.$apply();
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
            this.$log.debug("on_tab_payment_status_selected called");     
            this.RoutingService.gotoListOfPaymentStatusScreen();
            if(this.$scope.selected_button_bar_id === ""){
                this.$log.debug("clicking approved");
                this.$scope.button_bar_clicked("approved");
            }
            else{
                this.$log.debug("using previous button bar id, %s", this.$scope.selected_button_bar_id);
                if(this.$scope.selected_sc === null){
                    $timeout(()=> {
                            this.$scope.button_bar_clicked(this.$scope.selected_button_bar_id);
                        }, 2)
                    
                }
                
            }
            
        }
        this.$scope.on_tab_rejected_selected = () => {            
            this.RoutingService.gotoListOfRejectedScreen();
        }
    }
}

export = MainForManagerController;

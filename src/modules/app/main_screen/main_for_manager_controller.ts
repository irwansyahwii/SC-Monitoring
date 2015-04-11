/// <reference path="../../../../typings/tsd.d.ts" />

import RoutingService = require("../../common/services/routing_service");
import User = require("../../common/domain_models/user");

interface IMainControllerScope extends ng.IScope{
    current_user: User;
    item_clicked();
    on_tab_new_selected();
    on_tab_payment_status_selected();
    to_moment(dt);
}

class MainForManagerController{
    static get factory(): any[] {
        var arr = ["$scope", "RoutingService", "$log",
            ($scope, RoutingService, $log) =>{
                var controller = new MainForManagerController($scope, RoutingService, $log);

                return controller;
            }];

        return arr;
    }

    private $scope: IMainControllerScope;
    private RoutingService : RoutingService;
    private $log: ng.ILogService;

    constructor($scope: IMainControllerScope, RoutingService: RoutingService, $log: ng.ILogService) {
        this.$scope = $scope;
        this.RoutingService = RoutingService;
        this.$log = $log;


        this.$log.debug("test moment - DD/MM/YYYY:");
        this.$log.debug(moment("23/03/2015", "DD/MM/YYYY").fromNow());


        this.$scope.current_user = User.current_user;
        this.$log.debug("this.$scope.current_user:");
        this.$log.debug(this.$scope.current_user);

        this.$scope.to_moment = (dt) => {
            this.$log.debug("filter called");
            this.$log.debug(moment(dt, "DD/MM/YYYY").fromNow());

            var result = moment(dt, "DD/MM/YYYY").fromNow();

            this.$log.debug("filter result: ", result);

            return result;
        }

        this.$scope.item_clicked = () =>{

            alert("adasd")
        }
        this.$scope.on_tab_new_selected = () => {
            this.RoutingService.gotoListOfNewSCScreen();
        }
        this.$scope.on_tab_payment_status_selected = () => {
            this.RoutingService.gotoListOfPaymentStatusScreen();
        }
    }
}

export = MainForManagerController;

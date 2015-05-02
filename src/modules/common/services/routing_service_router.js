/// <reference path="../../../../typings/tsd.d.ts" />
var User = require("../domain_models/User");
var RoutingServiceForManager = require("./routing_service");
var RoutingServiceForAdmin = require("./routing_service_for_admin");
var RoutingServiceRouter = (function () {
    function RoutingServiceRouter($state, $log) {
        this.$log = $log;
        this.$state = $state;
        this.routing_service = null;
    }
    Object.defineProperty(RoutingServiceRouter, "factory", {
        get: function () {
            var result = ["$state", "$log", function ($state, $log) {
                var service = new RoutingServiceRouter($state, $log);
                return service;
            }];
            return result;
        },
        enumerable: true,
        configurable: true
    });
    RoutingServiceRouter.prototype.role_is_manager = function () {
        return User.current_user.roles[0] === "manager";
    };
    RoutingServiceRouter.prototype.gotoMainScreen = function () {
        if (this.role_is_manager()) {
            console.log("RoutingServiceForManager");
            this.routing_service = new RoutingServiceForManager(this.$state, this.$log);
        }
        else {
            console.log("RoutingServiceForAdmin");
            this.routing_service = new RoutingServiceForAdmin(this.$state, this.$log);
        }
        this.routing_service.gotoMainScreen();
    };
    RoutingServiceRouter.prototype.gotoListOfNewSCScreen = function () {
        this.routing_service.gotoListOfNewSCScreen();
    };
    RoutingServiceRouter.prototype.gotoListOfPaymentStatusScreen = function () {
        this.routing_service.gotoListOfPaymentStatusScreen();
    };
    RoutingServiceRouter.prototype.showPaymentStatusListView = function (button_bar_id) {
        this.routing_service.showPaymentStatusListView(button_bar_id);
    };
    RoutingServiceRouter.prototype.showTabNewDetailSC = function (sc) {
        this.routing_service.showTabNewDetailSC(sc);
    };
    RoutingServiceRouter.prototype.showTabPaymentStatusApprovedDetailSC = function (sc) {
        this.routing_service.showTabPaymentStatusApprovedDetailSC(sc);
    };
    RoutingServiceRouter.prototype.showTabPaymentStatusPODetailSC = function (sc) {
        this.routing_service.showTabPaymentStatusPODetailSC(sc);
    };
    RoutingServiceRouter.prototype.showTabPaymentStatusGRDetailSC = function (sc) {
        this.routing_service.showTabPaymentStatusGRDetailSC(sc);
    };
    RoutingServiceRouter.prototype.gotoListOfRejectedScreen = function () {
        this.routing_service.gotoListOfRejectedScreen();
    };
    RoutingServiceRouter.prototype.showTabRejectedDetailSC = function (sc) {
        this.routing_service.showTabRejectedDetailSC(sc);
    };
    RoutingServiceRouter.prototype.showNewSCScreen = function () {
        this.routing_service.showNewSCScreen();
    };
    return RoutingServiceRouter;
})();
module.exports = RoutingServiceRouter;

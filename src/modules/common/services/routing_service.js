/// <reference path="../../../../typings/tsd.d.ts" />
var User = require("../domain_models/User");
var RoutingService = (function () {
    function RoutingService($state, $log) {
        this.$log = $log;
        this.$state = $state;
    }
    Object.defineProperty(RoutingService, "factory", {
        get: function () {
            var result = ["$state", "$log", function ($state, $log) {
                var service = new RoutingService($state, $log);
                return service;
            }];
            return result;
        },
        enumerable: true,
        configurable: true
    });
    RoutingService.prototype.role_is_manager = function () {
        return User.current_user.roles[0] === "manager";
    };
    RoutingService.prototype.gotoMainScreen = function () {
        this.$log.debug("RoutingService.gotoMainScreen() executing...");
        this.$log.debug(User.current_user);
        this.$log.debug("User.current_user.roles[0]: ", User.current_user.roles[0]);
        if (this.role_is_manager) {
            this.$state.go("main_for_manager");
        }
        else {
            this.$state.go("main_for_admin");
        }
    };
    RoutingService.prototype.gotoListOfNewSCScreen = function () {
        this.$log.debug("RoutingService.gotoListOfNewSCScreen() executing...");
        this.$state.go("main_for_manager.tab_new_view");
    };
    RoutingService.prototype.gotoListOfPaymentStatusScreen = function () {
        this.$log.debug("RoutingService.gotoListOfPaymentStatusScreen() executing...");
        this.$state.go("main_for_manager.tab_payment_status_view");
    };
    RoutingService.prototype.showPaymentStatusListView = function (button_bar_id) {
        this.$log.debug("RoutingService.showListView() button_bar_id:", button_bar_id);
        if (button_bar_id === "approved") {
            this.$state.go("main_for_manager.tab_payment_status_view.approved");
        }
        else if (button_bar_id === "po") {
            this.$state.go("main_for_manager.tab_payment_status_view.po");
        }
        else if (button_bar_id === "gr") {
            this.$state.go("main_for_manager.tab_payment_status_view.gr");
        }
    };
    RoutingService.prototype.showTabNewDetailSC = function (sc) {
        this.$log.debug("showTabNewDetailSC called");
        this.$state.go("main_for_manager.show_detail_sc");
    };
    RoutingService.prototype.showTabPaymentStatusApprovedDetailSC = function (sc) {
        this.$log.debug("showTabPaymentStatusApprovedDetailSC called");
        this.$state.go("main_for_manager.approved_show_detail_sc");
    };
    RoutingService.prototype.showTabPaymentStatusPODetailSC = function (sc) {
        this.$log.debug("showTabPaymentStatusPODetailSC called");
        this.$state.go("main_for_manager.po_show_detail_sc");
    };
    RoutingService.prototype.showTabPaymentStatusGRDetailSC = function (sc) {
        this.$log.debug("showTabPaymentStatusGRDetailSC called");
        this.$state.go("main_for_manager.gr_show_detail_sc");
    };
    RoutingService.prototype.gotoListOfRejectedScreen = function () {
        this.$log.debug("RoutingService.gotoListOfRejectedScreen() executing...");
        this.$state.go("main_for_manager.tab_rejected_view");
    };
    RoutingService.prototype.showTabRejectedDetailSC = function (sc) {
        this.$log.debug("showTabRejectedDetailSC called");
        this.$state.go("main_for_manager.rejected_show_detail_sc");
    };
    RoutingService.prototype.showNewSCScreen = function () {
    };
    return RoutingService;
})();
module.exports = RoutingService;

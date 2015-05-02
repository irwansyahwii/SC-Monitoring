/// <reference path="../../../../typings/tsd.d.ts" />
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
    RoutingService.prototype.gotoMainScreen = function () {
        this.$state.go("main_for_admin");
    };
    RoutingService.prototype.gotoListOfNewSCScreen = function () {
        this.$state.go("main_for_admin.tab_new_view");
    };
    RoutingService.prototype.gotoListOfPaymentStatusScreen = function () {
        this.$log.debug("RoutingService.gotoListOfPaymentStatusScreen() executing...");
        this.$state.go("main_for_admin.tab_payment_status_view");
    };
    RoutingService.prototype.showPaymentStatusListView = function (button_bar_id) {
        this.$log.debug("RoutingService.showListView() button_bar_id:", button_bar_id);
        if (button_bar_id === "approved") {
            this.$state.go("main_for_admin.tab_payment_status_view.approved");
        }
        else if (button_bar_id === "po") {
            this.$state.go("main_for_admin.tab_payment_status_view.po");
        }
        else if (button_bar_id === "gr") {
            this.$state.go("main_for_admin.tab_payment_status_view.gr");
        }
    };
    RoutingService.prototype.showTabNewDetailSC = function (sc) {
        this.$log.debug("showTabNewDetailSC called");
        this.$state.go("main_for_admin.show_detail_sc");
    };
    RoutingService.prototype.showTabPaymentStatusApprovedDetailSC = function (sc) {
        this.$log.debug("showTabPaymentStatusApprovedDetailSC called");
        this.$state.go("main_for_admin.approved_show_detail_sc");
    };
    RoutingService.prototype.showTabPaymentStatusPODetailSC = function (sc) {
        this.$log.debug("showTabPaymentStatusPODetailSC called");
        this.$state.go("main_for_admin.po_show_detail_sc");
    };
    RoutingService.prototype.showTabPaymentStatusGRDetailSC = function (sc) {
        this.$log.debug("showTabPaymentStatusGRDetailSC called");
        this.$state.go("main_for_admin.gr_show_detail_sc");
    };
    RoutingService.prototype.gotoListOfRejectedScreen = function () {
        this.$log.debug("RoutingService.gotoListOfRejectedScreen() executing...");
        this.$state.go("main_for_admin.tab_rejected_view");
    };
    RoutingService.prototype.showTabRejectedDetailSC = function (sc) {
        this.$log.debug("showTabRejectedDetailSC called");
        this.$state.go("main_for_admin.rejected_show_detail_sc");
    };
    RoutingService.prototype.showNewSCScreen = function () {
        this.$state.go("main_for_admin.new_sc");
    };
    RoutingService.prototype.showEditSCScreen = function (sc) {
        this.$state.go("main_for_admin.edit_sc", { sc_number: sc.sc_number });
    };
    RoutingService.prototype.gotoLoginScreen = function () {
        this.$state.go("login");
    };
    RoutingService.prototype.showApproveSCScreen = function (sc) {
        this.$state.go('main_for_admin.approve_sc', { sc_number: sc.sc_number });
    };
    return RoutingService;
})();
module.exports = RoutingService;

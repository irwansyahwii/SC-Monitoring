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
    RoutingService.prototype.gotoMainScreen = function () {
        this.$log.debug("RoutingService.gotoMainScreen() executing...");
        this.$log.debug(User.current_user);
        this.$log.debug("User.current_user.roles[0]: ", User.current_user.roles[0]);
        if (User.current_user.roles[0] === "manager") {
            this.$state.go("main_for_manager");
        }
        else {
            alert("No main screen yet");
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
    return RoutingService;
})();
module.exports = RoutingService;

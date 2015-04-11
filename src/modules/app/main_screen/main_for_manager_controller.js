/// <reference path="../../../../typings/tsd.d.ts" />
var User = require("../../common/domain_models/user");
var MainForManagerController = (function () {
    function MainForManagerController($scope, RoutingService, $log) {
        var _this = this;
        this.$scope = $scope;
        this.RoutingService = RoutingService;
        this.$log = $log;
        this.$log.debug("test moment - DD/MM/YYYY:");
        this.$log.debug(moment("23/03/2015", "DD/MM/YYYY").fromNow());
        this.$scope.current_user = User.current_user;
        this.$log.debug("this.$scope.current_user:");
        this.$log.debug(this.$scope.current_user);
        this.$scope.to_moment = function (dt) {
            _this.$log.debug("filter called");
            _this.$log.debug(moment(dt, "DD/MM/YYYY").fromNow());
            var result = moment(dt, "DD/MM/YYYY").fromNow();
            _this.$log.debug("filter result: ", result);
            return result;
        };
        this.$scope.item_clicked = function () {
            alert("adasd");
        };
        this.$scope.on_tab_new_selected = function () {
            _this.RoutingService.gotoListOfNewSCScreen();
        };
        this.$scope.on_tab_payment_status_selected = function () {
            _this.RoutingService.gotoListOfPaymentStatusScreen();
        };
    }
    Object.defineProperty(MainForManagerController, "factory", {
        get: function () {
            var arr = ["$scope", "RoutingService", "$log", function ($scope, RoutingService, $log) {
                var controller = new MainForManagerController($scope, RoutingService, $log);
                return controller;
            }];
            return arr;
        },
        enumerable: true,
        configurable: true
    });
    return MainForManagerController;
})();
module.exports = MainForManagerController;

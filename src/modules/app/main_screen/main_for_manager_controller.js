/// <reference path="../../../../typings/tsd.d.ts" />
var User = require("../../common/domain_models/user");
var MainForManagerController = (function () {
    function MainForManagerController($scope, RoutingService, $log, $ionicSideMenuDelegate) {
        var _this = this;
        this.$scope = $scope;
        this.RoutingService = RoutingService;
        this.$log = $log;
        this.$ionicSideMenuDelegate = $ionicSideMenuDelegate;
        this.$scope.current_user = User.current_user;
        this.$scope.toggleSideMenu = function () {
            _this.$ionicSideMenuDelegate.toggleLeft();
        };
        this.$scope.show_detail_sc = function (sc) {
            _this.$log.debug("show_detail_sc called");
            _this.$scope.selected_sc = sc;
            RoutingService.showDetailSC(_this.selected_tab_id, sc);
        };
        this.$scope.selected_button_bar_id = "approved";
        this.$scope.button_bar_clicked = function (button_id) {
            _this.selected_tab_id = button_id;
            _this.$scope.selected_button_bar_id = button_id;
            RoutingService.showListView(_this.$scope.selected_button_bar_id);
        };
        this.$scope.to_moment = function (dt) {
            var result = moment(dt, "DD/MM/YYYY").fromNow();
            return result;
        };
        this.$scope.on_tab_new_selected = function () {
            _this.$log.debug("on_tab_new_selected called");
            _this.selected_tab_id = "new";
            _this.RoutingService.gotoListOfNewSCScreen();
        };
        this.$scope.on_tab_payment_status_selected = function () {
            _this.RoutingService.gotoListOfPaymentStatusScreen();
            _this.$scope.button_bar_clicked("approved");
        };
    }
    Object.defineProperty(MainForManagerController, "factory", {
        get: function () {
            var arr = ["$scope", "RoutingService", "$log", "$ionicSideMenuDelegate", function ($scope, RoutingService, $log, $ionicSideMenuDelegate) {
                var controller = new MainForManagerController($scope, RoutingService, $log, $ionicSideMenuDelegate);
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

/// <reference path="../../../../typings/tsd.d.ts" />
var User = require("../../common/domain_models/user");
var MainForManagerController = (function () {
    function MainForManagerController($scope, RoutingService, $log, $ionicSideMenuDelegate, $ionicHistory, $timeout) {
        var _this = this;
        this.$scope = $scope;
        this.RoutingService = RoutingService;
        this.$log = $log;
        this.$ionicSideMenuDelegate = $ionicSideMenuDelegate;
        this.$ionicHistory = $ionicHistory;
        this.$timeout = $timeout;
        this.$scope.current_user = User.current_user;
        this.$scope.logout = function () {
            console.log(User.current_user);
            User.current_user.logout().then(function () {
                console.log(_this.RoutingService);
                _this.RoutingService.gotoLoginScreen();
            }).catch(function () {
                _this.RoutingService.gotoLoginScreen();
            });
        };
        this.$scope.back_button_clicked = function () {
            _this.$log.debug("back_button_clicked called");
            // this.$log.debug(this.$ionicHistory.currentStateName());
            var current_state = _this.$ionicHistory.currentStateName();
            _this.$log.debug(current_state);
            _this.$log.debug(_this.$ionicHistory.backView());
            if (current_state === "main_for_manager.po_show_detail_sc") {
                var back_view = _this.$ionicHistory.backView();
                back_view.stateId = "main_for_manager.tab_payment_status_view.po";
                back_view.stateName = "main_for_manager.tab_payment_status_view.po";
                back_view.url = "/main/payment_status/po";
                _this.$ionicHistory.goBack();
            }
            else if (current_state === "main_for_manager.gr_show_detail_sc") {
                var back_view = _this.$ionicHistory.backView();
                back_view.stateId = "main_for_manager.tab_payment_status_view.gr";
                back_view.stateName = "main_for_manager.tab_payment_status_view.gr";
                back_view.url = "/main/payment_status/gr";
                _this.$ionicHistory.goBack();
            }
            else {
                _this.$ionicHistory.goBack();
            }
        };
        this.$scope.toggleSideMenu = function () {
            _this.$ionicSideMenuDelegate.toggleLeft();
        };
        this.$scope.show_tab_new_detail_sc = function (sc) {
            _this.$log.debug("show_detail_sc called");
            _this.$log.debug(sc);
            _this.$scope.selected_sc = sc;
            RoutingService.showTabNewDetailSC(sc);
        };
        this.$scope.show_tab_rejected_detail_sc = function (sc) {
            _this.$log.debug("show_tab_rejected_detail_sc called");
            _this.$log.debug(sc);
            _this.$scope.selected_sc = sc;
            RoutingService.showTabRejectedDetailSC(sc);
        };
        this.$scope.show_approved_detail_sc = function (sc) {
            _this.$log.debug("show_approved_detail_sc called");
            _this.$log.debug(sc);
            _this.$scope.selected_sc = sc;
            RoutingService.showTabPaymentStatusApprovedDetailSC(sc);
        };
        this.$scope.show_po_detail_sc = function (sc) {
            _this.$log.debug("show_po_detail_sc called");
            _this.$log.debug(sc);
            _this.$scope.selected_sc = sc;
            RoutingService.showTabPaymentStatusPODetailSC(sc);
        };
        this.$scope.show_gr_detail_sc = function (sc) {
            _this.$log.debug("show_gr_detail_sc called");
            _this.$log.debug(sc);
            _this.$scope.selected_sc = sc;
            RoutingService.showTabPaymentStatusGRDetailSC(sc);
        };
        this.$scope.selected_button_bar_id = "";
        this.$scope.button_bar_clicked = function (button_id) {
            _this.$log.debug("button_bar_clicked, button_id: %s", button_id);
            _this.$scope.selected_sc = null;
            _this.selected_tab_id = button_id;
            _this.$scope.selected_button_bar_id = button_id;
            // this.$scope.$apply();
            RoutingService.showPaymentStatusListView(_this.$scope.selected_button_bar_id);
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
            _this.$log.debug("on_tab_payment_status_selected called");
            _this.RoutingService.gotoListOfPaymentStatusScreen();
            if (_this.$scope.selected_button_bar_id === "") {
                _this.$log.debug("clicking approved");
                _this.$scope.button_bar_clicked("approved");
            }
            else {
                _this.$log.debug("using previous button bar id, %s", _this.$scope.selected_button_bar_id);
                if (_this.$scope.selected_sc === null) {
                    $timeout(function () {
                        _this.$scope.button_bar_clicked(_this.$scope.selected_button_bar_id);
                    }, 2);
                }
            }
        };
        this.$scope.on_tab_rejected_selected = function () {
            _this.RoutingService.gotoListOfRejectedScreen();
        };
    }
    Object.defineProperty(MainForManagerController, "factory", {
        get: function () {
            var arr = ["$scope", "RoutingService", "$log", "$ionicSideMenuDelegate", "$ionicHistory", "$timeout", function ($scope, RoutingService, $log, $ionicSideMenuDelegate, $ionicHistory, $timeout) {
                var controller = new MainForManagerController($scope, RoutingService, $log, $ionicSideMenuDelegate, $ionicHistory, $timeout);
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

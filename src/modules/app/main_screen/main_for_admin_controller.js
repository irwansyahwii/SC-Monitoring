/// <reference path="../../../../typings/tsd.d.ts" />
var User = require("../../common/domain_models/user");
var SC_MENU_BUTTONS;
(function (SC_MENU_BUTTONS) {
    SC_MENU_BUTTONS[SC_MENU_BUTTONS["EDIT"] = 0] = "EDIT";
    SC_MENU_BUTTONS[SC_MENU_BUTTONS["APPROVE"] = 1] = "APPROVE";
    SC_MENU_BUTTONS[SC_MENU_BUTTONS["REJECT"] = 2] = "REJECT";
})(SC_MENU_BUTTONS || (SC_MENU_BUTTONS = {}));
var MainForManagerController = (function () {
    function MainForManagerController($scope, RoutingService, $log, $ionicSideMenuDelegate, $ionicHistory, $timeout, $ionicActionSheet, $ionicPopup) {
        var _this = this;
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
        this.$scope.new_sc_clicked = function () {
            _this.RoutingService.showNewSCScreen();
        };
        this.$scope.logout = function () {
            User.current_user.logout().then(function () {
                _this.RoutingService.gotoLoginScreen();
            }).catch(function () {
                _this.RoutingService.gotoLoginScreen();
            });
        };
        this.$scope.show_sc_menu = function (sc) {
            var hideSheet = $ionicActionSheet.show({
                buttons: [
                    { text: 'Edit' },
                    { text: 'Approve' },
                    { text: 'Reject' }
                ],
                destructiveText: 'Hapus',
                titleText: 'Menu',
                cancelText: 'Cancel',
                buttonClicked: function (index) {
                    console.log("index: %d", index);
                    switch (index) {
                        case 0 /* EDIT */: {
                            _this.RoutingService.showEditSCScreen(sc);
                            break;
                        }
                        case 1 /* APPROVE */: {
                            alert('approve');
                            break;
                        }
                        case 2 /* REJECT */: {
                            alert('reject');
                            break;
                        }
                        default: {
                            console.log("Unknown button");
                        }
                    }
                },
                destructiveButtonClicked: function () {
                    hideSheet();
                    var confirmPopup = _this.$ionicPopup.confirm({
                        title: 'SC Monitoring',
                        template: "Hapus SC dengan nomor:" + sc.sc_number
                    });
                    confirmPopup.then(function (is_ok) {
                        if (is_ok) {
                            var found_index = -1;
                            User.current_user.data.list_of_new_sc.forEach(function (item, index) {
                                if (item.sc_number === sc.sc_number) {
                                    found_index = index;
                                }
                            });
                            if (found_index !== -1) {
                                User.current_user.data.list_of_new_sc.splice(found_index, 1);
                            }
                        }
                    });
                }
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
            var arr = ["$scope", "RoutingService", "$log", "$ionicSideMenuDelegate", "$ionicHistory", "$timeout", "$ionicActionSheet", "$ionicPopup", function ($scope, RoutingService, $log, $ionicSideMenuDelegate, $ionicHistory, $timeout, $ionicActionSheet, $ionicPopup) {
                var controller = new MainForManagerController($scope, RoutingService, $log, $ionicSideMenuDelegate, $ionicHistory, $timeout, $ionicActionSheet, $ionicPopup);
                return controller;
            }];
            return arr;
        },
        enumerable: true,
        configurable: true
    });
    MainForManagerController.prototype.edit = function (sc) {
    };
    return MainForManagerController;
})();
module.exports = MainForManagerController;

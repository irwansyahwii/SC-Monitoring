/// <reference path="../../../../typings/tsd.d.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var User = require("../../common/domain_models/user");
var NewSCController = require("./new_sc_controller");
var EditSCController = (function (_super) {
    __extends(EditSCController, _super);
    function EditSCController($scope, $log, $ionicSideMenuDelegate, $ionicHistory, $timeout, $ionicPopup, $stateParams) {
        var _this = this;
        this.$scope = $scope;
        _super.call(this, $scope, $log, $ionicSideMenuDelegate, $ionicHistory, $timeout, $ionicPopup);
        var editing_sc_number = $stateParams.sc_number;
        var found_sc = null;
        User.current_user.data.list_of_new_sc.forEach(function (item, index) {
            if (item.sc_number === editing_sc_number) {
                found_sc = item;
            }
        });
        this.$scope.new_sc = found_sc;
        this.$scope.save = function () {
            // User.current_user.data.list_of_new_sc.push(this.$scope.new_sc);
            var messagePopup = _this.$ionicPopup.alert({
                template: "Edit SC saved",
                title: "SC Monitoring"
            });
            messagePopup.then(function () {
                _this.$ionicHistory.goBack();
            });
        };
    }
    Object.defineProperty(EditSCController, "factory", {
        get: function () {
            var arr = ["$scope", "$log", "$ionicSideMenuDelegate", "$ionicHistory", "$timeout", "$ionicPopup", "$stateParams", function ($scope, $log, $ionicSideMenuDelegate, $ionicHistory, $timeout, $ionicPopup, $stateParams) {
                var controller = new EditSCController($scope, $log, $ionicSideMenuDelegate, $ionicHistory, $timeout, $ionicPopup, $stateParams);
                return controller;
            }];
            return arr;
        },
        enumerable: true,
        configurable: true
    });
    return EditSCController;
})(NewSCController);
module.exports = EditSCController;

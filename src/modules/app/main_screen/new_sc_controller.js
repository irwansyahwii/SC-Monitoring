/// <reference path="../../../../typings/tsd.d.ts" />
var SC = require("../../common/domain_models/SC");
var User = require("../../common/domain_models/user");
var NewSCController = (function () {
    function NewSCController($scope, $log, $ionicSideMenuDelegate, $ionicHistory, $timeout, $ionicPopup) {
        var _this = this;
        this.$scope = $scope;
        this.$log = $log;
        this.$ionicSideMenuDelegate = $ionicSideMenuDelegate;
        this.$ionicHistory = $ionicHistory;
        this.$timeout = $timeout;
        this.$ionicPopup = $ionicPopup;
        this.$scope.new_sc = new SC();
        this.$scope.save = function () {
            User.current_user.data.list_of_new_sc.push(_this.$scope.new_sc);
            var messagePopup = _this.$ionicPopup.alert({
                template: "SC Monitoring",
                title: "New SC saved"
            });
            messagePopup.then(function () {
                _this.$ionicHistory.goBack();
            });
        };
    }
    Object.defineProperty(NewSCController, "factory", {
        get: function () {
            var arr = ["$scope", "$log", "$ionicSideMenuDelegate", "$ionicHistory", "$timeout", "$ionicPopup", function ($scope, $log, $ionicSideMenuDelegate, $ionicHistory, $timeout, $ionicPopup) {
                var controller = new NewSCController($scope, $log, $ionicSideMenuDelegate, $ionicHistory, $timeout, $ionicPopup);
                return controller;
            }];
            return arr;
        },
        enumerable: true,
        configurable: true
    });
    return NewSCController;
})();
module.exports = NewSCController;

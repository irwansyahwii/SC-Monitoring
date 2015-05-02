/// <reference path="../../../../typings/tsd.d.ts" />

import SC = require("../../common/domain_models/SC");
import User = require("../../common/domain_models/user");

interface INewSCControllerScope{
    save():void;
    new_sc: SC;
}


class NewSCController{
    static get factory(): any[] {
        var arr = ["$scope", "$log", "$ionicSideMenuDelegate", "$ionicHistory", "$timeout", "$ionicPopup",
            ($scope, $log, $ionicSideMenuDelegate, $ionicHistory, $timeout, $ionicPopup) =>{
                var controller = new NewSCController($scope, $log, $ionicSideMenuDelegate, $ionicHistory, $timeout, $ionicPopup);

                return controller;
            }];

        return arr;
    }

    private $scope: INewSCControllerScope;
    private $log: ng.ILogService;
    private $ionicSideMenuDelegate:any;
    private selected_tab_id:string;
    private $ionicHistory:any;
    private $timeout:ng.ITimeoutService;
    private $ionicPopup;

    constructor($scope: INewSCControllerScope, 
        $log: ng.ILogService, $ionicSideMenuDelegate:any, $ionicHistory, $timeout: ng.ITimeoutService
        , $ionicPopup) {

        this.$scope = $scope;
        this.$log = $log;
        this.$ionicSideMenuDelegate = $ionicSideMenuDelegate;
        this.$ionicHistory = $ionicHistory;
        this.$timeout = $timeout;
        this.$ionicPopup = $ionicPopup;

        this.$scope.new_sc = new SC();


        this.$scope.save = () => {

            User.current_user.data.list_of_new_sc.push(this.$scope.new_sc);

            var messagePopup = this.$ionicPopup.alert({
                    template: "SC Monitoring"
                    , title: "New SC saved"
                    
                })

            messagePopup.then(()=>{
                    this.$ionicHistory.goBack()
                })
        }
    }
}

export = NewSCController;
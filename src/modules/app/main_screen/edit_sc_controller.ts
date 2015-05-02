/// <reference path="../../../../typings/tsd.d.ts" />

import SC = require("../../common/domain_models/SC");
import User = require("../../common/domain_models/user");

import NewSCController = require("./new_sc_controller");
import INewSCControllerScope = require("./INewSCControllerScope");

interface IEditSCControllerScope extends INewSCControllerScope{
    save():void;
    editing_sc: SC;
}


class EditSCController extends NewSCController{
    static get factory(): any[] {
        var arr = ["$scope", "$log", "$ionicSideMenuDelegate", "$ionicHistory", "$timeout", "$ionicPopup", "$stateParams",
            ($scope, $log, $ionicSideMenuDelegate, $ionicHistory, $timeout, $ionicPopup, $stateParams) =>{
                var controller = new EditSCController($scope, $log, $ionicSideMenuDelegate, $ionicHistory
                    , $timeout, $ionicPopup, $stateParams);

                return controller;
            }];

        return arr;
    }

    protected $scope: IEditSCControllerScope;

    constructor($scope: IEditSCControllerScope, 
        $log: ng.ILogService, $ionicSideMenuDelegate:any, $ionicHistory, $timeout: ng.ITimeoutService
        , $ionicPopup, $stateParams) {

        this.$scope = $scope;

        super($scope, $log, $ionicSideMenuDelegate, $ionicHistory, $timeout, $ionicPopup);

        var editing_sc_number = $stateParams.sc_number;        

        var found_sc = null;
        User.current_user.data.list_of_new_sc.forEach((item, index)=>{
                if(item.sc_number === editing_sc_number){
                    found_sc = item;
                }
            });

        this.$scope.new_sc = found_sc;


        this.$scope.save = () => {

            // User.current_user.data.list_of_new_sc.push(this.$scope.new_sc);

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

export = EditSCController;
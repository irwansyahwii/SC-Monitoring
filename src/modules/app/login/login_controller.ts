/// <reference path="../../../../typings/tsd.d.ts" />

import User = require("../../common/domain_models/user");
import ILoginService = require("../../common/services/ILoginService");
import IUserDataInitializer = require("../../common/services/IUserDataInitializer");


declare var alertify:any;

interface LoginControllerScope extends ng.IScope {
    user: User;
    login: Function;
}

class LoginController{
    private $log : ng.ILogService;

    static get factory() : any[] {
        var arr: any[] = [
            "$scope", "$log", "RoutingService", "$q", "$timeout", "LoginService", "UserDataInitializerService",
            ($scope: LoginControllerScope, $log: ng.ILogService, RoutingService:any, 
                $q: ng.IQService, $timeout: ng.ITimeoutService, LoginService: ILoginService,
                UserDataInitializer: IUserDataInitializer) => {

                var controller:LoginController = new LoginController($scope, $log, RoutingService, $q, $timeout
                    , LoginService, UserDataInitializer);

                return controller;
            }
        ];
        return arr;
    }

    constructor($scope: LoginControllerScope, $log: ng.ILogService, RoutingService:any, 
        $q: ng.IQService, $timeout: ng.ITimeoutService, LoginService: ILoginService,
        UserDataInitializer: IUserDataInitializer) {

        this.$log = $log;

        $scope.user = new User($log, $q, $timeout, LoginService, UserDataInitializer);
        $scope.login = () => {
            $log.debug("scope.login executing...");

            $scope.user.login()
                .then((login_result:boolean) => {
                        RoutingService.gotoMainScreen();
                    })
                .catch( (error:any) =>{
                        this.displayError($scope.user);
                    });
        }
    }

    displayError(user: User) {
        user.errors.forEach((err, i) => {
                alertify.set("notifier", "position", "bottom-right");
                alertify.error(err.error_message);
            });
    }
}

export = LoginController;
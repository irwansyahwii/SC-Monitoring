/// <reference path="../../../../typings/tsd.d.ts" />

import FieldError = require("../services/FieldError")
import ILoginService = require("../services/ILoginService")
import LoginResult = require("../services/LoginResult")

class User{
    private $log: ng.ILogService;
    private $q: ng.IQService;
    private $timeout: ng.ITimeoutService;
    private LoginService: ILoginService;

    private _username:string = "";
    private _password:string = "";
    private _errors: FieldError[] = new Array<FieldError>();

    constructor($log:ng.ILogService, $q: ng.IQService, $timeout: ng.ITimeoutService
        , LoginService: ILoginService) {

        this.$log = $log;
        this.$q = $q;
        this.$timeout = $timeout;
        this.LoginService = LoginService;
    }

    get username():string {
        return this._username;
    }
    set username(new_val:string){
        this._username = new_val;
    }

    get password():string {
        return this._password;
    }
    set password(new_val:string){
        this._password = new_val;
    }

    get errors(): FieldError[] {
        return this._errors;
    }

    clearErrors() {
        this._errors = [];
    }

    login():ng.IPromise<any> {
        var deferred:ng.IDeferred<any> = this.$q.defer();

        this.clearErrors();

        this.$log.debug("User entry: admin: %s, password: %s", this.username, this.password);

        this.LoginService.login(this.username, this.password)
            .then((login_result:LoginResult) => {
                    deferred.resolve();
                })
            .catch((login_result: LoginResult) => {
                    this._errors = login_result.errors;
                    deferred.reject();
                });

        return deferred.promise;

    }
}

export = User;
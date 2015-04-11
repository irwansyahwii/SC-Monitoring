/// <reference path="../../../../typings/tsd.d.ts" />

import FieldError = require("../services/FieldError")
import ILoginService = require("../services/ILoginService")
import LoginResult = require("../services/LoginResult")
import IUserDataInitializer = require("../services/IUserDataInitializer");
import UserDataResult = require("../services/UserDataResult");


var _current_user: User = null;

class User{
    private $log: ng.ILogService;
    private $q: ng.IQService;
    private $timeout: ng.ITimeoutService;
    private LoginService: ILoginService;
    private UserDataInitializer: IUserDataInitializer;

    private _username:string = "manager";
    private _password:string = "manager";
    private _errors: FieldError[] = new Array<FieldError>();
    private _roles: string[] = new Array<string>();
    private _data: UserDataResult = new UserDataResult();

    
    static get current_user(): User {
        return _current_user;
    }

    constructor($log:ng.ILogService, $q: ng.IQService, $timeout: ng.ITimeoutService
        , LoginService: ILoginService
        , UserDataInitializer: IUserDataInitializer) {

        this.$log = $log;
        this.$q = $q;
        this.$timeout = $timeout;
        this.LoginService = LoginService;
        this.UserDataInitializer = UserDataInitializer;
    }

    get data(): UserDataResult {
        return this._data;
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

    get roles(): string[] {
        return this._roles;
    }
    set roles(val: string[]) {
        this._roles = val;
    }

    clearErrors() {
        this._errors = [];
    }

    logout():ng.IPromise<any> {
        var deferred:ng.IDeferred<any> = this.$q.defer();

        User.current_user = null;

        this.LoginService.logout()
            .then(() => {
                    deferred.resolve();
                })
            .catch(() => {
                    deferred.reject();
                });

        return deferred.promise;
    }

    assign_user_data(data:UserDataResult){
        this.roles = data.roles;
        this._data = data;
    }

    login():ng.IPromise<any> {
        var deferred:ng.IDeferred<any> = this.$q.defer();

        this.clearErrors();

        this.$log.debug("User entry: username: %s, password: %s", this.username, this.password);

        this.LoginService.login(this.username, this.password)
            .then((login_result:LoginResult) => {
                    _current_user = this;

                    this.$log.debug("User.current_user:");
                    this.$log.debug(User.current_user);

                    
                    this.UserDataInitializer.retrieve_user_data(this.username)
                        .then ((result: UserDataResult) => {
                                this.$log.debug("UserDataResult:");
                                this.$log.debug(result);
                                
                                this.assign_user_data(result);

                                deferred.resolve();
                            })
                        .catch((result: UserDataResult) => {
                                this._errors = result.errors;
                                deferred.reject();
                            });
                })
            .catch((login_result: LoginResult) => {
                    this._errors = login_result.errors;
                    deferred.reject();
                });

        return deferred.promise;

    }
}

export = User;
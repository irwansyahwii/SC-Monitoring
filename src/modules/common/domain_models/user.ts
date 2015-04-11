/// <reference path="../../../../typings/tsd.d.ts" />

import FieldError = require("../services/FieldError")

class User{
    private $log: ng.ILogService;
    private $q: ng.IQService;
    private $timeout: ng.ITimeoutService;

    private _username:string = "";
    private _password:string = "";
    private _errors: FieldError[] = new Array<FieldError>();

    constructor($log:ng.ILogService, $q: ng.IQService, $timeout: ng.ITimeoutService) {
        this.$log = $log;
        this.$q = $q;
        this.$timeout = $timeout;
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

        this.$timeout(() => {
                if(this.username == "admin" && this.password == "admin") {
                    this.$log.debug("deferred.resolve()");
                    deferred.resolve(true);                    
                }
                else{
                    var error:FieldError = new FieldError("username", "Invalid user name or password");
                    this._errors.push(error);

                    deferred.reject(false);
                }
            }, 1);

        return deferred.promise;

    }
}

export = User;
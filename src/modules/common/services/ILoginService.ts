/// <reference path="../../../../typings/tsd.d.ts" />

import LoginResult = require("LoginResult");

interface ILoginService {
    login(username:string, password:string) : ng.IPromise<any>;
}

export = ILoginService;
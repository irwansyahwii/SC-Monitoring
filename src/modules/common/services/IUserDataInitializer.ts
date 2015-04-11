/// <reference path="../../../../typings/tsd.d.ts" />

import UserDataResult = require("UserDataResult");

interface IUserDataInitializer {
    retrieve_user_data(username:string): ng.IPromise<UserDataResult>;
}

export = IUserDataInitializer;
import LoginResult = require("LoginResult");
import ILoginService = require("ILoginService");

class LoginService implements ILoginService {
    static get factory(): any[] {
        return [() => {
                var service = new LoginService();

                return service;
            }];
    }

    constructor() {
        
    }
    
    login(username:string, password:string) : LoginResult {
        return null;
    }
}

export = LoginService;
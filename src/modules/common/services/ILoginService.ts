import LoginResult = require("LoginResult");

interface ILoginService {
    login(username:string, password:string) : LoginResult;
}

export = ILoginService;
var LoginService = (function () {
    function LoginService() {
    }
    Object.defineProperty(LoginService, "factory", {
        get: function () {
            return [function () {
                var service = new LoginService();
                return service;
            }];
        },
        enumerable: true,
        configurable: true
    });
    LoginService.prototype.login = function (username, password) {
        return null;
    };
    return LoginService;
})();
module.exports = LoginService;

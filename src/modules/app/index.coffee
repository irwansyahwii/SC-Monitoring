app_module = angular.module("dea", [
        'ui.bootstrap',
        'ui.router',
        'ionic',
        require('../../../tmp/templates').name,
        require('../common').name,    
        require("./login").name,
        require("./main_screen").name
    ])

app_runner = require("./run_with_ionic")
app_config = require("./config_with_ionic")

app_module.run(app_runner.factory)
app_module.config(app_config.factory)
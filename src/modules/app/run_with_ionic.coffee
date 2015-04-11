User = require("../common/domain_models/user");

class Run
    @factory:["$ionicPlatform", "$log", "$state", ($ionicPlatform, $log, $state) ->
        run = new Run($ionicPlatform, $log, $state)
        run.execute()
    ]
    constructor:(@ionicPlatform, @log, @state) ->

    execute: ->
        @log.debug("run_with_ionic executing...")
        @ionicPlatform.ready(()=>
                if(window.cordova and window.cordova.plugins.keyboard)
                    window.cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true)
                
                if(window.StatusBar)
                    window.StatusBar.styleDefault()
            )

        if User.current_user is null
            @state.go("login")

        @log.debug("run_with_ionic END")
                
            


module.exports = Run

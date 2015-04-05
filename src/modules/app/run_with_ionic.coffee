class Run
    @factory:["$ionicPlatform", "$log", ($ionicPlatform, $log) ->
        run = new Run($ionicPlatform, $log)
        run.execute()
    ]
    constructor:(@ionicPlatform, @log) ->

    execute: ->
        @log.debug("run_with_ionic executing...")
        @ionicPlatform.ready(()=>
                if(window.cordova and window.cordova.plugins.keyboard)
                    window.cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true)
                
                if(window.StatusBar)
                    window.StatusBar.styleDefault()
            )

        @log.debug("run_with_ionic END")
                
            


module.exports = Run

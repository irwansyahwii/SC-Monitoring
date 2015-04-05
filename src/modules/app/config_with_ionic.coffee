class Config
    @factory:["$stateProvider", "$urlRouterProvider",  "$logProvider"
        ($stateProvider, $urlRouterProvider, $logProvider) ->
            config = new Config($stateProvider, $urlRouterProvider, $logProvider)
            config.execute()
    ]
    constructor:(@stateProvider, @urlRouterProvider, @logProvider) ->

    execute: ->
        logger = angular.injector(["ng"]).get("$log")
        logger.debug("config_with_ionic executing...")

        @logProvider.debugEnabled(true)

        logger.debug("config_with_ionic END")

module.exports = Config
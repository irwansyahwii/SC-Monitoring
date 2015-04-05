require("business-rules-engine")

class User
    constructor:(@log, @q, @timeout) ->
        @username = ""
        @password = ""
        @errors = []

    login: () =>

        # deferred = @q.defer()

        # @timeout(()->
        #         deferred.resolve()
        #     , 1)
        result = false
        @log.debug("User.login() executing...")

        @log.debug("username: #{@username}, password: #{@password}")

        @log.debug("User.login() END")

        result = false

        result


module.exports = User
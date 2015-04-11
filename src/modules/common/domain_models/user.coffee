require("business-rules-engine")

class User
    constructor:(@log, @q, @timeout) ->
        @username = ""
        @password = ""
        @errors = []

    login: () =>

        deferred = @q.defer()

        @timeout(() =>
                @log.debug("deferred.resolve()")
                deferred.resolve(true)
            , 1)

        deferred.promise

    fetchRoles: () =>
        


module.exports = User
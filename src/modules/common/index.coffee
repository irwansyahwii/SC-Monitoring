'use strict'

the_module = angular.module("dea.common", [
        require('./directives').name,
        require('./filters').name,
        require('./services').name

    ])


module.exports = the_module
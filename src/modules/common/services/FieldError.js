var FieldError = (function () {
    function FieldError(field_name, error_message) {
        this._field_name = "";
        this._error_message = "";
        this._field_name = field_name;
        this._error_message = error_message;
    }
    Object.defineProperty(FieldError.prototype, "field_name", {
        get: function () {
            return this._field_name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FieldError.prototype, "error_message", {
        get: function () {
            return this._error_message;
        },
        enumerable: true,
        configurable: true
    });
    return FieldError;
})();
module.exports = FieldError;

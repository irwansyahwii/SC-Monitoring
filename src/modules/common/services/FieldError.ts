class FieldError {
    private _field_name: string = "";
    private _error_message: string = "";

    constructor(field_name:string, error_message:string) {
        this._field_name = field_name;
        this._error_message = error_message;
    }

    get field_name():string {
        return this._field_name;
    }

    get error_message():string {
        return this._error_message;
    }
}

export = FieldError;
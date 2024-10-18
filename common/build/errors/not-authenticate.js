"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notAuthorizedError = void 0;
const custom_error_1 = require("./custom-error");
class notAuthorizedError extends custom_error_1.CustomError {
    constructor() {
        super('Not Authorized');
        this.statusCode = 401;
    }
    serializeErrors() {
        return [
            {
                message: 'Not Authorized',
            },
        ];
    }
}
exports.notAuthorizedError = notAuthorizedError;

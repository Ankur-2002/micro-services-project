import { CustomError } from "./custom-error";

export class DatabaseConnectionError extends CustomError {
    reason = 'Error Connecting to database'
    statusCode = 500;
    constructor() {
        super('Error connecting to database')
    }

    serializeErrors() {
        return [
            {
                message: this.reason
            }
        ]
    }
}
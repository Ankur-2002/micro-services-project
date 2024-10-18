import { CustomError } from './custom-error'

export class notAuthorizedError extends CustomError {
    statusCode: number = 401

    constructor() {
        super('Not Authorized')
    }
    serializeErrors(): { message: string; field?: string | undefined }[] {
        return [
            {
                message: 'Not Authorized',
            },
        ]
    }
}

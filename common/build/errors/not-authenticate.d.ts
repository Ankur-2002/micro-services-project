import { CustomError } from './custom-error';
export declare class notAuthorizedError extends CustomError {
    statusCode: number;
    constructor();
    serializeErrors(): {
        message: string;
        field?: string | undefined;
    }[];
}

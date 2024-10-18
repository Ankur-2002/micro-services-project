export abstract class CustomError extends Error {
    abstract serializeErrors(): {
        message: string;
        field?:string
    }[]
    abstract statusCode: number;

    constructor(message: string) {
        super(message)
    }
}



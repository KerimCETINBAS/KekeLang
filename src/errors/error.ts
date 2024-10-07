
export enum ErrorType {
    ParserError = "ParserError",
}

export interface PLError extends Error {
    type: ErrorType
}

export class PLError {}
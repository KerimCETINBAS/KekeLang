import {ErrorType, PLError} from "./error";
import {Token} from "../compailer/lexer/token";
import {TokenType} from "../compailer/lexer/tokenType";
import exp from "node:constants";


export class ParserError extends PLError {
   type = ErrorType.ParserError
   message: string = ""
}

export class UnexpectedTokenError extends ParserError {
    message = "Unexpected token"
    token?: Token
    expectedTokenType?: TokenType
    constructor(token?: Token, expectedTokenType?: TokenType) {
        super();
        this.token = token
        this.expectedTokenType = expectedTokenType
    }
}
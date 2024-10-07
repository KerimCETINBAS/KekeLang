import {TokenType} from "./tokenType";

export interface Token {
    value: string
    type: TokenType
}


export class Token {
    constructor(token?: Token) {
        Object.assign(this, token || {})
    }
}


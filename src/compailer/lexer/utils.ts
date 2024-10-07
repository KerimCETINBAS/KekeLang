/// <reference path="./token.ts" />
import {Keywords} from "./keywords";
import {TokenType} from "./tokenType";


export function *ParseNumber(chars: string) {
    for (const char of chars) {
        if(isNumber(char)) yield char
        else break
    }
}

export function *ParseIdentifiers(chars: string) {
    for (const char of chars) {
        if(isAlphanumeric(char)) yield char
        else break
    }
}

export function isNumber (char: string) {
    return /\d/.test(char) && TokenType.Number
}

export function isAlphanumeric(char: string) {
    return /[a-zA-Z0-9_]/.test(char) && TokenType.Identifier
}


export function isKeyword(identifier: string) {
   return  Keywords.hasOwnProperty(identifier)
}

export function isOpenParentheses(char: string) {
    return /\(/.test(char) && TokenType.OpenParentheses
}

export function isCloseParentheses(char: string) {
    return /\)/.test(char) && TokenType.CloseParentheses
}

export function isOpenCurlyBracket(char: string) {
    return /\{/.test(char) && TokenType.OpenCurlyBracket
}

export function isCloseCurlyBracket(char: string) {
    return /}/.test(char) && TokenType.CloseCurlyBracket
}

export function isOpenBracket(char: string) {
    return /\[/.test(char) && TokenType.OpenBracket
}

export function isCloseBracket(char: string) {
    return /]/.test(char) && TokenType.CloseBracket
}

export function isQuote(char: string) {
    return /["']/.test(char) && TokenType.Quote
}
export function isSkipAble(char: string) {
    return /[\t\r\n\s]+/.test(char)
}

export function isBinaryOperator(char: string) {
    return /[*+-//%]/.test(char) && TokenType.BinaryOperator
}
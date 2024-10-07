import {TokenType} from "./tokenType";


export const Keywords: Record<string, TokenType> = {
    null: TokenType.Null,
    class: TokenType.Class,
    fn: TokenType.Fn,
    struct: TokenType.Struct,
    for: TokenType.For,
    of: TokenType.Of
}

import {Token} from "./token";
import {TokenType} from "./tokenType";
import {
    isAlphanumeric, isBinaryOperator,
    isCloseBracket,
    isCloseCurlyBracket,
    isCloseParentheses, 
    isKeyword,
    isNumber,
    isOpenBracket,
    isOpenCurlyBracket,
    isOpenParentheses,
    isQuote,
    isSkipAble
} from "./utils";
import {Keywords} from "./keywords";

export class Tokenizer {
    
    private tokens: Token[] = []
    
    constructor(private source: string) { }
    
    public get Tokens() {
        return this.tokens
    }
    
    private OpenParenthesesTokenConverter(char: string): Token {
            return new Token({
                type: TokenType.OpenParentheses,
                value: char })
    }
    private CloseParenthesesTokenConverter(char: string): Token  {
            return new Token({
                type: TokenType.CloseParentheses,
                value: char })
    }
    private OpenCurlyBracketTokenConverter(char: string): Token {
        return new Token({
            type: TokenType.OpenCurlyBracket,
            value: char
        })
    }
    private CloseCurlyBracketTokenConverter(char: string): Token {
        return new Token({
            type: TokenType.CloseCurlyBracket,
            value: char
        })
    }
    private OpenBracketTokenConverter(char: string): Token {
        return new Token({
            type: TokenType.OpenBracket,
            value: char
        })
    }
    private CloseBracketTokenConverter(char: string): Token {
        return new Token({
            type: TokenType.CloseBracket,
            value: char
        })
    }
    private BinaryOperatorTokenConverter(char: string): Token  {
        //if (["+", "-", "/", "*", "%"].includes(char))
            return new Token({
                type: TokenType.BinaryOperator,
                value: char  })
    }
    
    private EqualTokenConverter(char: string): Token | undefined {
        if (char == "=")
            return new Token({
                type: TokenType.Equals,
                value: char })
    }
    
    private NumberTokenConverter(number: string) {
            return new Token({
                type: TokenType.Number,
                value: number})
    }


    private IdentifierTokenConverter(identifier: string) {
            return new Token({
                type: TokenType.Identifier,
                value: identifier})
      
    }
    
    private KeywordTokenConverter(identifier: string) {
        
        return new Token({
            type: Keywords[identifier],
            value: identifier
        })
    }

    private GetTokenType(char: string) {
        const predictions = [
            isOpenParentheses,
            isCloseParentheses,
            isBinaryOperator,
            isQuote,
            isOpenBracket,
            isCloseBracket,
            isOpenCurlyBracket,
            isCloseCurlyBracket,
            isNumber,
            isAlphanumeric
        ]
        
        
        for(const prediction of predictions) {
            const tokenType = prediction(char)
            if(tokenType != false) return tokenType
        }
    }
    public Tokenize() {

        let identifier = ""
        let number = ""
        let string = ""
        for (const [index, char] of Object.entries(this.source.split(""))) {
           
            const tokenType = this.GetTokenType(char)
            
           
            // treverse number
            if(number != "") {
                if(!isNumber(char)) {
                    this.tokens.push(
                        this.NumberTokenConverter(number)
                    )
                    number = ""
                } else {
                    number += char
                    continue;
                }
               
            }
            // treverse identifier
            if(identifier != "") {
                if(!isAlphanumeric(char)) {
                    const keyword = Keywords[identifier]
                  
                    if (typeof keyword == "number") {

                        console.log("keywoad :", keyword)
                        this.tokens.push(
                            this.KeywordTokenConverter(identifier)
                        );
                    }
                    else 
                        this.tokens.push(
                           this.IdentifierTokenConverter(identifier)
                        )
                 
                  
                    identifier = ""
                } else {
                    identifier += char;
                    continue;
                }
            }

            
            switch (tokenType) {
               
                case TokenType.OpenParentheses: 
                    this.tokens.push(
                        this.OpenParenthesesTokenConverter(char));
                    continue;
                case TokenType.CloseParentheses:
                    this.tokens.push(
                        this.CloseParenthesesTokenConverter(char)
                    )
                    continue;
                case TokenType.OpenCurlyBracket:
                    this.tokens.push(
                        this.OpenCurlyBracketTokenConverter(char)
                    )
                    continue;
                    
                case TokenType.CloseCurlyBracket:
                    this.tokens.push(
                        this.CloseCurlyBracketTokenConverter(char)
                    )
                    continue;
                case TokenType.OpenBracket:
                    this.tokens.push(
                        this.OpenBracketTokenConverter(char)
                    )
                    continue;
                case TokenType.CloseBracket:
                    this.tokens.push(
                        this.CloseBracketTokenConverter(char)
                    )
                    continue;
                    
                case TokenType.BinaryOperator:
                    this.tokens.push(
                        this.BinaryOperatorTokenConverter(char)
                    )
                    continue;
                case TokenType.Quote:
                    string += "&"
                    continue;
                case TokenType.Number:
                    number += char
                    continue;
                case TokenType.Identifier:
                    identifier += char
            }
        }
        
        if (number != "")
            this.tokens.push(
                this.NumberTokenConverter(number)
            )
        
        if (identifier != "") {
            const keyword = Keywords[identifier]
            if (typeof keyword == "number") {

                console.log("keywoad :", keyword)
                this.tokens.push(
                    this.KeywordTokenConverter(identifier)
                );
            }
            else
                this.tokens.push(
                    this.IdentifierTokenConverter(identifier)
                )
        }
        // end of file
        this.tokens.push(new Token({
            type: TokenType.EOF,
            value: "<EOF>"
        }))
        return this
    }
}
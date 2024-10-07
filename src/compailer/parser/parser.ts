import {Token} from "../lexer/token";
import {
    BinaryExpression,
    Expression,
    Identifier,
    NullLiteral,
    NumericLiteral,
    Program,
    Statement
} from "../ast/nodeType";

import {Tokenizer} from "../lexer/tokenizer";
import {TokenType} from "../lexer/tokenType";
import {UnexpectedTokenError} from "../../errors/parser";


export default class Parser {
    
    private tokens: Token[] = []
    private program: Program 
    private current: number = 0
    constructor(src: string) {
        this.tokens = new Tokenizer(src).Tokenize().Tokens
        this.program = new Program()
    }
    
    public get Tokens () {
        return this.tokens
    }
    
    public get Program() {
        return this.program
    }
    public CreateAst() {
        while (this.tokens[0].type != TokenType.EOF) {
            this.program.body.push(this.parse_statement())
        }
    }
    
    private currentToken() {
        return this.tokens[0]
    }
    
    private eatToken(): Token {
        return this.tokens.shift()!
    }

    private eatExpectedToken(tokenType: TokenType): Token {
        
        const prev = this.tokens.shift() as Token
        if(!prev || prev.type != tokenType) 
            throw new UnexpectedTokenError(prev, tokenType)
        return prev
    }
    private parse_primary_expression(): Expression {
       
        switch (this.currentToken().type) {
            case TokenType.Identifier:
                return new Identifier(this.eatToken().value) 
            case TokenType.Null:
                this.eatToken()
                return new NullLiteral()
            case TokenType.Number:
                return new NumericLiteral(parseFloat(this.eatToken().value))
            case TokenType.OpenParentheses: {
                this.eatToken()
                const value = this.parse_expression()
                this.eatExpectedToken(TokenType.CloseParentheses)
                return value
            }
            default:
                throw new UnexpectedTokenError(this.currentToken())
        }
    }
    
    // presidence of expressions
    
    // Logical expr
    // Comparison expr
    // Additive expr
    // Multiplicitave Expr
    // Unary expr
    // Primary expr
    
    private parse_additive_expression(): Expression {
        let left = this.parse_multiplicative_expression()
        
        while (
            this.currentToken().value == "+" ||
            this.currentToken().value == "-") {
            const operator = this.eatToken().value
            const right = this.parse_multiplicative_expression()
            left = new BinaryExpression(
                left,
                right,
                operator
            )
        }
        return left
    }



    private parse_multiplicative_expression(): Expression {
        let left = this.parse_primary_expression()

        while (
            this.currentToken().value == "%" ||
            this.currentToken().value == "*" ||
            this.currentToken().value == "/") {
            const operator = this.eatToken().value
            const right = this.parse_primary_expression()
            left = new BinaryExpression(
                left,
                right,
                operator
            )
        }
        return left
    }
    private parse_expression(): Expression {
        
        return this.parse_additive_expression()
    }
    
    private parse_statement(): Statement {
        
        return this.parse_expression()
    }
}
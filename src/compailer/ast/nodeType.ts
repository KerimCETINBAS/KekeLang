

export enum NodeType {
    Program = "program",
    NumericLiteral = "numeric_literal",
    NullLiteral = "null_literal",
    Identifier = "identifier",
    BinaryExpr = "binary_expression",
}

export interface Statement {
    kind: NodeType
}

export interface Expression extends Statement {}

export interface Program extends Statement {
    kind: NodeType.Program
    body: Statement[]
}

export class Program {
    constructor(body?: Statement[]) {
        this.kind = NodeType.Program
        this.body = body || []
    }
}

export interface BinaryExpression extends Expression {
    kind: NodeType.BinaryExpr
    left: Expression
    right: Expression
    operator: string
}

export class BinaryExpression {
    constructor(left: Expression, right: Expression, operator: string) {
        this.kind = NodeType.BinaryExpr
        this.left = left
        this.right = right
        this.operator = operator
        
    }
}
export interface Identifier extends Expression {
    kind: NodeType.Identifier
    symbol: string
}

export class Identifier {
    constructor(symbol: string) {
        this.kind = NodeType.Identifier
        this.symbol = symbol
    }
}

export interface NumericLiteral extends Expression {
    kind: NodeType.NumericLiteral
    numericValue: number
}

export class NumericLiteral {
    constructor(numericValue: number) {
        this.kind = NodeType.NumericLiteral
        this.numericValue = numericValue
    }
}

export interface NullLiteral extends Expression {
    kind: NodeType.NullLiteral
    value: "null"
}

export class NullLiteral {
    constructor() {
        this.kind = NodeType.NullLiteral
        this.value = "null"
    }
}
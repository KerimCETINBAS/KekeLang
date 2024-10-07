import {BinaryExpression, NodeType, NumericLiteral, Program, Statement} from "../compailer/ast/nodeType";
import {NullValue, NumberValue, RuntimeValue, ValueType} from "./values";
10
function EvaluateProgram(program: Program): RuntimeValue {
    let lastEvaluated: RuntimeValue  = new NullValue()
    for (const statement of program.body) {
        lastEvaluated = Evaluate(statement)    
    }
    return lastEvaluated
}
function EvaluateBinaryExpression(
    binaryExpression: BinaryExpression
): RuntimeValue {
    const left = Evaluate(binaryExpression.left)
    const right = Evaluate(binaryExpression.right)
    
    if(
        left.type == ValueType.Number && 
        right.type == ValueType.Number) {
        return EvaluateNumericBinaryExpression(
            left as NumberValue, 
            right as NumberValue, 
            binaryExpression.operator)
    }
    return new NullValue()
}


function EvaluateNumericBinaryExpression(
    left: NumberValue, 
    right: NumberValue, 
    operator: string) {
    
    type operators = "+" | "-" | "*" | "/" | "%"
    type operationType = (left: number, right: number) => number
    const operations:Record<operators, operationType> = {
        "+": (left: number, right: number) => left + right,
        "-": (left: number, right: number) => left - right,
        "*": (left: number, right: number) => left * right,
        "/": (left: number, right: number) => left / right,
        "%": (left: number, right: number) => left % right,
    }
    return new NumberValue(operations[operator as operators](left.value, right.value))
}
export function Evaluate(astNode: Statement): RuntimeValue {
    switch (astNode.kind) {
        case NodeType.NumericLiteral: 
            return new NumberValue((astNode as NumericLiteral).numericValue)
        case NodeType.NullLiteral:
            return new NullValue()
        case NodeType.BinaryExpr: 
            return EvaluateBinaryExpression(astNode as BinaryExpression)
        case NodeType.Program:
            return EvaluateProgram(astNode as Program)
        default:
            return new NullValue()
    }
}
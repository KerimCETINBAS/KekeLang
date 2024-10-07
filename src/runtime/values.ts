
export enum ValueType {
    Null = "null",
    Number = "number"
}
export interface RuntimeValue {
    type: ValueType
}

export interface NullValue extends RuntimeValue {
    type: ValueType.Null
    value: null
}

export class NullValue {
    type: ValueType.Null = ValueType.Null
    value = null
}
export interface NumberValue extends RuntimeValue {
    type: ValueType.Number
    value: number
}

export class NumberValue {
    constructor(value: number) {
        this.value = value
        this.type = ValueType.Number
    }
}
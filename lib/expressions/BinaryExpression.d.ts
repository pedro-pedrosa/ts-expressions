import { Expression } from './Expression';
export declare class BinaryExpression extends Expression {
    constructor(left: Expression, operator: BinaryOperator, right: Expression);
    left: Expression;
    operator: BinaryOperator;
    right: Expression;
}
export declare enum BinaryOperator {
    equals = 0,
    strictEquals = 1,
    and = 2,
    or = 3,
}

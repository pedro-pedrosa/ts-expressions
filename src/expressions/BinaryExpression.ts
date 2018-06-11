import { Expression } from './Expression';

export class BinaryExpression extends Expression {
    constructor(left: Expression, operator: BinaryOperator, right: Expression) {
        super();
        this.left = left;
        this.operator = operator;
        this.right = right;
    }
    left: Expression;
    operator: BinaryOperator;
    right: Expression;
}

export enum BinaryOperator {
    equals,
    strictEquals,
    and,
    or,
}
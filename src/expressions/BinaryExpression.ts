import { ExpressionBase } from './Expression';
import { ExpressionKind } from './ExpressionKind';

export class BinaryExpression extends ExpressionBase {
    constructor(left: ExpressionBase, operator: BinaryOperator, right: ExpressionBase) {
        super();
        this.left = left;
        this.operator = operator;
        this.right = right;
    }
    kind = ExpressionKind.binary;
    left: ExpressionBase;
    operator: BinaryOperator;
    right: ExpressionBase;
}

export enum BinaryOperator {
    equals,
    strictEquals,
    notEquals,
    notStrictEquals,
    and,
    or,
    plus,
}
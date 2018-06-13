import { ExpressionBase } from './Expression';
import { ExpressionKind } from './ExpressionKind';
export declare class BinaryExpression extends ExpressionBase {
    constructor(left: ExpressionBase, operator: BinaryOperator, right: ExpressionBase);
    kind: ExpressionKind;
    left: ExpressionBase;
    operator: BinaryOperator;
    right: ExpressionBase;
}
export declare enum BinaryOperator {
    equals = 0,
    strictEquals = 1,
    notEquals = 2,
    and = 3,
    or = 4,
    plus = 5,
}

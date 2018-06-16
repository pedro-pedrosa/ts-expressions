import { ExpressionNode, ExpressionKind } from './Expression';

export interface BinaryExpression {
    kind: ExpressionKind.binary;
    left: ExpressionNode;
    operator: BinaryOperator;
    right: ExpressionNode;
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
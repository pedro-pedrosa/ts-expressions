import { ExpressionNode, ExpressionKind } from './Expression';

export interface CallExpression {
    kind: ExpressionKind.call;
    callee: ExpressionNode;
    arguments: ExpressionNode[];
}
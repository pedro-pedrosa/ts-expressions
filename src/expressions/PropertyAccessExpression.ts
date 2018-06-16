import { ExpressionNode, ExpressionKind } from './Expression';

export interface PropertyAccessExpression {
    kind: ExpressionKind.propertyAccess;
    expression: ExpressionNode;
    name: string;
}
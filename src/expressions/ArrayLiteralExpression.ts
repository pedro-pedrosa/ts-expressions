import { ExpressionKind, ExpressionNode } from './Expression';

export interface ArrayLiteralExpression {
    kind: ExpressionKind.arrayLiteral;
    elements: ExpressionNode[];
}
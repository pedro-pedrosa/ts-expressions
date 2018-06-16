import { ExpressionNode, ExpressionKind } from './Expression';

export interface PropertyAssignmentExpression {
    kind: ExpressionKind.propertyAssignment;
    name: string;
    expression: ExpressionNode;
}
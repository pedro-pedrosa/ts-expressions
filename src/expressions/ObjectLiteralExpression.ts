import { PropertyAssignmentExpression } from './PropertyAssignmentExpression';
import { ExpressionKind } from './Expression';

export interface ObjectLiteralExpression {
    kind: ExpressionKind.objectLiteral;
    properties: PropertyAssignmentExpression[];
}
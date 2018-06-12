import { ExpressionBase } from './Expression';
import { PropertyAssignmentExpression } from './PropertyAssignmentExpression';
import { ExpressionKind } from './ExpressionKind';

export class ObjectLiteralExpression extends ExpressionBase {
    constructor(properties: PropertyAssignmentExpression[]) {
        super();
        this.properties = properties;
    }
    kind = ExpressionKind.objectLiteral;
    properties: PropertyAssignmentExpression[];
}
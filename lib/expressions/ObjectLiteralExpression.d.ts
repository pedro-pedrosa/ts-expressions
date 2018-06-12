import { ExpressionBase } from './Expression';
import { PropertyAssignmentExpression } from './PropertyAssignmentExpression';
import { ExpressionKind } from './ExpressionKind';
export declare class ObjectLiteralExpression extends ExpressionBase {
    constructor(properties: PropertyAssignmentExpression[]);
    kind: ExpressionKind;
    properties: PropertyAssignmentExpression[];
}

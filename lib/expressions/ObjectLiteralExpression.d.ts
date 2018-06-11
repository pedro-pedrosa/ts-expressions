import { Expression } from './Expression';
import { PropertyAssignmentExpression } from './PropertyAssignmentExpression';
export declare class ObjectLiteralExpression extends Expression {
    constructor(properties: PropertyAssignmentExpression[]);
    properties: PropertyAssignmentExpression[];
}

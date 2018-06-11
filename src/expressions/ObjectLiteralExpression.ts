import { Expression } from './Expression';
import { PropertyAssignmentExpression } from './PropertyAssignmentExpression';

export class ObjectLiteralExpression extends Expression {
    constructor(properties: PropertyAssignmentExpression[]) {
        super();
        this.properties = properties;
    }
    properties: PropertyAssignmentExpression[]
}
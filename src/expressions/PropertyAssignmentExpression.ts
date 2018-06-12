import { ExpressionBase } from './Expression';
import { ExpressionKind } from './ExpressionKind';

export class PropertyAssignmentExpression extends ExpressionBase {
    constructor(name: string, expression: ExpressionBase) {
        super();
        this.name = name;
        this.expression = expression;
    }
    kind = ExpressionKind.propertyAssignment;
    name: string;
    expression: ExpressionBase;
}
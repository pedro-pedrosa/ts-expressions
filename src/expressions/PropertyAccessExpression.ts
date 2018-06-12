import { ExpressionBase } from './Expression';
import { ExpressionKind } from './ExpressionKind';

export class PropertyAccessExpression extends ExpressionBase {
    constructor(expression: ExpressionBase, name: string) {
        super();
        this.expression = expression;
        this.name = name;
    }
    kind = ExpressionKind.propertyAccess;
    expression: ExpressionBase;
    name: string;
}
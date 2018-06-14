import { ExpressionBase } from './Expression';
import { ExpressionKind } from './ExpressionKind';

export class ArrayLiteralExpression extends ExpressionBase {
    constructor(elements: ExpressionBase[]) {
        super();
        this.elements = elements;
    }
    kind = ExpressionKind.arrayLiteral;
    elements: ExpressionBase[];
}
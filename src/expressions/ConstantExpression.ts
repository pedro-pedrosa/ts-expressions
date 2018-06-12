import { ExpressionBase } from './Expression';
import { ExpressionKind } from './ExpressionKind';

export class ConstantExpression extends ExpressionBase {
    constructor(value: any) {
        super();
        this.value = value;
    }
    kind = ExpressionKind.constant;
    value: any;
}
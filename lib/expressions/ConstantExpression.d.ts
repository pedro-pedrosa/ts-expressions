import { ExpressionBase } from './Expression';
import { ExpressionKind } from './ExpressionKind';
export declare class ConstantExpression extends ExpressionBase {
    constructor(value: any);
    kind: ExpressionKind;
    value: any;
}

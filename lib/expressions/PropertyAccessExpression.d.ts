import { ExpressionBase } from './Expression';
import { ExpressionKind } from './ExpressionKind';
export declare class PropertyAccessExpression extends ExpressionBase {
    constructor(expression: ExpressionBase, name: string);
    kind: ExpressionKind;
    expression: ExpressionBase;
    name: string;
}

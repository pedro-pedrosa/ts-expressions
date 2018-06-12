import { ExpressionBase } from './Expression';
import { ExpressionKind } from './ExpressionKind';
export declare class ParameterExpression extends ExpressionBase {
    constructor(name: string);
    kind: ExpressionKind;
    name: string;
}

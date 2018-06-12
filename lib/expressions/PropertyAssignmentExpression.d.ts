import { ExpressionBase } from './Expression';
import { ExpressionKind } from './ExpressionKind';
export declare class PropertyAssignmentExpression extends ExpressionBase {
    constructor(name: string, expression: ExpressionBase);
    kind: ExpressionKind;
    name: string;
    expression: ExpressionBase;
}

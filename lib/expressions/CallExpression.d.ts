import { ExpressionBase } from './Expression';
import { ExpressionKind } from './ExpressionKind';
export declare class CallExpression extends ExpressionBase {
    constructor(calleeExpresion: ExpressionBase, ...args: ExpressionBase[]);
    kind: ExpressionKind;
    calleeExpresion: ExpressionBase;
    arguments: ExpressionBase[];
}

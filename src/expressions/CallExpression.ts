import { ExpressionBase } from './Expression';
import { ExpressionKind } from './ExpressionKind';

export class CallExpression extends ExpressionBase {
    constructor(calleeExpresion: ExpressionBase, ...args: ExpressionBase[]) {
        super();
        this.calleeExpresion = calleeExpresion;
        this.arguments = args;
    }
    kind = ExpressionKind.call;
    calleeExpresion: ExpressionBase;
    arguments: ExpressionBase[];
}
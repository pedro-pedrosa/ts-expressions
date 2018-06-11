import { Expression } from './Expression';

export class CallExpression extends Expression {
    constructor(calleeExpresion: Expression, ...args: Expression[]) {
        super();
        this.calleeExpresion = calleeExpresion;
        this.arguments = args;
    }
    calleeExpresion: Expression;
    arguments: Expression[];
}
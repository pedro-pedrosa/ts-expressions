import { Expression } from './Expression';
export declare class CallExpression extends Expression {
    constructor(calleeExpresion: Expression, ...args: Expression[]);
    calleeExpresion: Expression;
    arguments: Expression[];
}

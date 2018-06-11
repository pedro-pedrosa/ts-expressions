import { Expression } from './Expression';
import { ParameterExpression } from './ParameterExpression';
export declare class LambdaExpression extends Expression {
    constructor(parameters: ParameterExpression[], body: Expression);
    parameters: ParameterExpression[];
    body: Expression;
    static create(lambda: (...args: any[]) => any): LambdaExpression;
    static create(expression: LambdaExpression): LambdaExpression;
}

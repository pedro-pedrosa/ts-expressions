import { Expression } from './Expression';
import { ParameterExpression } from './ParameterExpression';
import { checkExpressionParameter } from '../utilities';

export class LambdaExpression extends Expression {
    constructor(parameters: ParameterExpression[], body: Expression) {
        super();
        this.parameters = parameters;
        this.body = body;
    }
    parameters: ParameterExpression[];
    body: Expression;
    
    static create(lambda: (...args: any[]) => any): LambdaExpression;
    static create(expression: LambdaExpression): LambdaExpression;
    static create(expression: object): LambdaExpression {
        return checkExpressionParameter(expression, 'expression') as LambdaExpression;
    }
}
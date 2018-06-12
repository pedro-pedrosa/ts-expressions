import { ExpressionBase } from './Expression';
import { ParameterExpression } from './ParameterExpression';
import { checkExpressionParameter } from '../utilities';
import { ExpressionKind } from './ExpressionKind';

export class LambdaExpression extends ExpressionBase {
    constructor(parameters: ParameterExpression[], body: ExpressionBase) {
        super();
        this.parameters = parameters;
        this.body = body;
    }
    kind = ExpressionKind.lambda;
    parameters: ParameterExpression[];
    body: ExpressionBase;
    
    static create(lambda: (...args: any[]) => any): LambdaExpression;
    static create(expression: LambdaExpression): LambdaExpression;
    static create(expression: object): LambdaExpression {
        return checkExpressionParameter(expression, 'expression') as LambdaExpression;
    }
}
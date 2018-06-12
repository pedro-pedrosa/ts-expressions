import { ExpressionBase } from './Expression';
import { ParameterExpression } from './ParameterExpression';
import { ExpressionKind } from './ExpressionKind';
export declare class LambdaExpression extends ExpressionBase {
    constructor(parameters: ParameterExpression[], body: ExpressionBase);
    kind: ExpressionKind;
    parameters: ParameterExpression[];
    body: ExpressionBase;
    static create(lambda: (...args: any[]) => any): LambdaExpression;
    static create(expression: LambdaExpression): LambdaExpression;
}

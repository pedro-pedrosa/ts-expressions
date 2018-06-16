import { ParameterExpression } from './ParameterExpression';
import { ExpressionNode, ExpressionKind } from './Expression';

export interface LambdaExpression {
    kind: ExpressionKind.lambda;
    parameters: ParameterExpression[];
    body: ExpressionNode;
}
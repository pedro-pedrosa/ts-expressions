import { ExpressionKind } from './Expression';

export interface ParameterExpression {
    kind: ExpressionKind.parameter;
    name: string;
}
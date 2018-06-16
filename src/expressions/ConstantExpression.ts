import { ExpressionKind } from './Expression';

export interface ConstantExpression {
    kind: ExpressionKind.constant;
    value: any;
}
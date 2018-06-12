import { ExpressionKind } from './ExpressionKind';
export declare const expressionSymbol: unique symbol;
export interface Expression<T> {
    [expressionSymbol]: any;
    kind: ExpressionKind;
}
export declare abstract class ExpressionBase implements Expression<{}> {
    [expressionSymbol]: boolean;
    abstract kind: ExpressionKind;
}

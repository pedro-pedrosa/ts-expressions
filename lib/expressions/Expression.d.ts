import { ExpressionKind } from './ExpressionKind';
export declare const expressionSymbol: unique symbol;
export interface Expression<T> {
    [expressionSymbol]: T;
    kind: ExpressionKind;
}
export declare abstract class ExpressionBase implements Expression<{}> {
    [expressionSymbol]: {};
    abstract kind: ExpressionKind;
}

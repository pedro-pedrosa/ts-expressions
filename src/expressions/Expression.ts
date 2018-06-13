import { ExpressionKind } from './ExpressionKind';

export const expressionSymbol = Symbol();

export interface Expression<T> {
    [expressionSymbol]: T;
    kind: ExpressionKind;
}

export abstract class ExpressionBase implements Expression<{}> {
    [expressionSymbol] = {};
    abstract kind: ExpressionKind;
}
import { ExpressionKind } from './ExpressionKind';

export const expressionSymbol = Symbol();

export interface Expression<T> {
    [expressionSymbol]: any;
    kind: ExpressionKind;
}

export abstract class ExpressionBase implements Expression<{}> {
    [expressionSymbol] = true;
    abstract kind: ExpressionKind;
}
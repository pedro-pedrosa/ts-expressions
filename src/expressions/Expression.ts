export const expressionSymbol = Symbol();

export abstract class Expression {
    [expressionSymbol] = true;
}
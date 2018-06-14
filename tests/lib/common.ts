import * as expr from '../..';

export function numberExpression(e: number): expr.Expression<number>;
export function numberExpression(e: expr.Expression<number>): expr.Expression<number>;
export function numberExpression(e: any): expr.Expression<number> {
    return expr.checkExpressionParameter(e, 'e');
}

export function stringExpression(e: string): expr.Expression<string>;
export function stringExpression(e: expr.Expression<string>): expr.Expression<string>;
export function stringExpression(e: any): expr.Expression<string> {
    return expr.checkExpressionParameter(e, 'e');
}

export function booleanExpression(e: boolean): expr.Expression<boolean>;
export function booleanExpression(e: expr.Expression<boolean>): expr.Expression<boolean>;
export function booleanExpression(e: any): expr.Expression<boolean> {
    return expr.checkExpressionParameter(e, 'e');
}

export function arrayOfNumberExpression(e: number[]): expr.Expression<number[]>;
export function arrayOfNumberExpression(e: expr.Expression<number[]>): expr.Expression<number[]>;
export function arrayOfNumberExpression(e: any): expr.Expression<number[]> {
    return expr.checkExpressionParameter(e, 'e');
}

export function objectExpression(e: object): expr.Expression<object>;
export function objectExpression(e: expr.Expression<object>): expr.Expression<object>;
export function objectExpression(e: any): expr.Expression<object> {
    return expr.checkExpressionParameter(e, 'e');
}

export function genericArrayExpression<T>(e: T[]): expr.Expression<T[]>;
export function genericArrayExpression<T>(e: expr.Expression<T[]>): expr.Expression<T[]>;
export function genericArrayExpression<T>(e: any): expr.Expression<T[]> {
    return expr.checkExpressionParameter(e, 'e');
}

export function actionExpression(e: () => void): expr.Expression<() => void>;
export function actionExpression(e: expr.Expression<() => void>): expr.Expression<() => void>;
export function actionExpression(e: any): expr.Expression<() => void> {
    return expr.checkExpressionParameter(e, 'e');
}

export function lambda0Expression(e: () => number): expr.Expression<() => number>;
export function lambda0Expression(e: expr.Expression<() => number>): expr.Expression<() => number>;
export function lambda0Expression(e: any): expr.Expression<() => number> {
    return expr.checkExpressionParameter(e, 'e');
}

export function lambda1Expression(e: (p1: number) => number): expr.Expression<(p1: number) => number>;
export function lambda1Expression(e: expr.Expression<(p1: number) => number>): expr.Expression<(p1: number) => number>;
export function lambda1Expression(e: any): expr.Expression<(p1: number) => number> {
    return expr.checkExpressionParameter(e, 'e');
}

export function lambda2Expression(e: (p1: number, p2: number) => number): expr.Expression<(p1: number, p2: number) => number>;
export function lambda2Expression(e: expr.Expression<(p1: number, p2: number) => number>): expr.Expression<(p1: number, p2: number) => number>;
export function lambda2Expression(e: any): expr.Expression<(p1: number, p2: number) => number> {
    return expr.checkExpressionParameter(e, 'e');
}

export function genericLambda0Expression<T>(e: () => T): expr.Expression<() => T>;
export function genericLambda0Expression<T>(e: expr.Expression<() => T>): expr.Expression<() => T>;
export function genericLambda0Expression<T>(e: any): expr.Expression<() => T> {
    return expr.checkExpressionParameter(e, 'e');
}

export function genericLambda1Expression<P1, T>(e: (p1: P1) => T): expr.Expression<(p1: P1) => T>;
export function genericLambda1Expression<P1, T>(e: expr.Expression<(p1: P1) => T>): expr.Expression<(p1: P1) => T>;
export function genericLambda1Expression<P1, T>(e: any): expr.Expression<(p1: P1) => T> {
    return expr.checkExpressionParameter(e, 'e');
}

export function genericLambda2Expression<P1, P2, T>(e: (p1: P1, p2: P2) => T): expr.Expression<(p1: P1, p2: P2) => T>;
export function genericLambda2Expression<P1, P2, T>(e: expr.Expression<(p1: P1, p2: P2) => T>): expr.Expression<(p1: P1, p2: P2) => T>;
export function genericLambda2Expression<P1, P2, T>(e: any): expr.Expression<(p1: P1, p2: P2) => T> {
    return expr.checkExpressionParameter(e, 'e');
}

export function genericExpression<T>(e: T): expr.Expression<T>;
export function genericExpression<T>(e: expr.Expression<T>): expr.Expression<T>;
export function genericExpression<T>(e: any): expr.Expression<T> {
    return expr.checkExpressionParameter(e, 'e');
}
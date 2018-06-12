import { Expression } from './expressions/Expression';
export declare function isExpression<T>(expr: object): expr is Expression<T>;
export declare function checkExpressionParameter<T>(expr: object, parameterName: string): Expression<T>;

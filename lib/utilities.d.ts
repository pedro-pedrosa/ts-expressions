import { Expression } from './expressions/Expression';
export declare function isExpression(expr: object): expr is Expression;
export declare function checkExpressionParameter(expr: object, parameterName: string): Expression;

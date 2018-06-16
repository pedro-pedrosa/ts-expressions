import { ArrayLiteralExpression } from './ArrayLiteralExpression';
import { BinaryExpression } from './BinaryExpression';
import { CallExpression } from './CallExpression';
import { ConstantExpression } from './ConstantExpression';
import { LambdaExpression } from './LambdaExpression';
import { ObjectLiteralExpression } from './ObjectLiteralExpression';
import { ParameterExpression } from './ParameterExpression';
import { PropertyAccessExpression } from './PropertyAccessExpression';
import { PropertyAssignmentExpression } from './PropertyAssignmentExpression';

export const expressionSymbol = Symbol();

export interface Expression<T> {
    [expressionSymbol]: T;
    root: ExpressionNode;
}

export type ExpressionNode = ArrayLiteralExpression | BinaryExpression | CallExpression | 
    ConstantExpression | LambdaExpression | ObjectLiteralExpression | ParameterExpression |
    PropertyAccessExpression | PropertyAssignmentExpression;

export enum ExpressionKind {
    binary,
    call,
    constant,
    lambda,
    arrayLiteral,
    objectLiteral,
    parameter,
    propertyAccess,
    propertyAssignment
}
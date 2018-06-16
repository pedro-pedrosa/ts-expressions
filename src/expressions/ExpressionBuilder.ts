import { Expression, expressionSymbol, ExpressionNode, ExpressionKind } from './Expression';
import { LambdaExpression } from './LambdaExpression';
import { ParameterExpression } from './ParameterExpression';
import { BinaryOperator, BinaryExpression } from './BinaryExpression';
import { PropertyAccessExpression } from './PropertyAccessExpression';
import { ConstantExpression } from './ConstantExpression';
import { PropertyAssignmentExpression } from './PropertyAssignmentExpression';
import { ObjectLiteralExpression } from './ObjectLiteralExpression';
import { CallExpression } from './CallExpression';
import { ArrayLiteralExpression } from './ArrayLiteralExpression';

export function createExpression<T>(expression: T, rootNode: ExpressionNode): Expression<T> {
    return {
        [expressionSymbol]: expression,
        root: rootNode,
    };
}

export function arrayLiteral(elements: ExpressionNode[]): ArrayLiteralExpression {
    return {
        kind: ExpressionKind.arrayLiteral,
        elements,
    };
}

export function lambda(parameters: ParameterExpression[], body: ExpressionNode): LambdaExpression {
    return {
        kind: ExpressionKind.lambda,
        parameters,
        body
    };
}

export function parameter(name: string): ParameterExpression {
    return {
        kind: ExpressionKind.parameter,
        name,
    };
}

export function binary(left: ExpressionNode, operator: BinaryOperator, right: ExpressionNode): BinaryExpression {
    return {
        kind: ExpressionKind.binary,
        left,
        operator,
        right
    };
}
export function equals(left: ExpressionNode, right: ExpressionNode) {
    return binary(left, BinaryOperator.equals, right);
}
export function strictEquals(left: ExpressionNode, right: ExpressionNode) {
    return binary(left, BinaryOperator.strictEquals, right);
}
export function notEquals(left: ExpressionNode, right: ExpressionNode) {
    return binary(left, BinaryOperator.notEquals, right);
}
export function notStrictEquals(left: ExpressionNode, right: ExpressionNode) {
    return binary(left, BinaryOperator.notStrictEquals, right);
}
export function and(left: ExpressionNode, right: ExpressionNode) {
    return binary(left, BinaryOperator.and, right);
}
export function or(left: ExpressionNode, right: ExpressionNode) {
    return binary(left, BinaryOperator.or, right);
}
export function plus(left: ExpressionNode, right: ExpressionNode) {
    return binary(left, BinaryOperator.plus, right);
}

export function propertyAccess(expression: ExpressionNode, name: string): PropertyAccessExpression {
    return {
        kind: ExpressionKind.propertyAccess,
        expression,
        name
    };
}

export function constant(value: any): ConstantExpression {
    return {
        kind: ExpressionKind.constant,
        value
    };
}

export function objectLiteral(properties: PropertyAssignmentExpression[]): ObjectLiteralExpression {
    return {
        kind: ExpressionKind.objectLiteral,
        properties,
    };
}

export function propertyAssignment(name: string, expression: ExpressionNode): PropertyAssignmentExpression {
    return {
        kind: ExpressionKind.propertyAssignment,
        name,
        expression
    };
}

export function call(callee: ExpressionNode, ...args: ExpressionNode[]): CallExpression {
    return {
        kind: ExpressionKind.call,
        callee,
        arguments: args
    };
}
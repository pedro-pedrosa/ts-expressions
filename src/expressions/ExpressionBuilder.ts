import { ExpressionBase } from './Expression';
import { LambdaExpression } from './LambdaExpression';
import { ParameterExpression } from './ParameterExpression';
import { BinaryOperator, BinaryExpression } from './BinaryExpression';
import { PropertyAccessExpression } from './PropertyAccessExpression';
import { ConstantExpression } from './ConstantExpression';
import { PropertyAssignmentExpression } from './PropertyAssignmentExpression';
import { ObjectLiteralExpression } from './ObjectLiteralExpression';
import { CallExpression } from './CallExpression';
import { ArrayLiteralExpression } from './ArrayLiteralExpression';

export function arrayLiteral(elements: ExpressionBase[]): ArrayLiteralExpression {
    return new ArrayLiteralExpression(elements);
}

export function lambda(parameters: ParameterExpression[], body: ExpressionBase): LambdaExpression {
    return new LambdaExpression(parameters, body);
}

export function parameter(name: string) {
    return new ParameterExpression(name);
}

export function binary(left: ExpressionBase, operator: BinaryOperator, right: ExpressionBase) {
    return new BinaryExpression(left, operator, right);
}
export function equals(left: ExpressionBase, right: ExpressionBase) {
    return binary(left, BinaryOperator.equals, right);
}
export function strictEquals(left: ExpressionBase, right: ExpressionBase) {
    return binary(left, BinaryOperator.strictEquals, right);
}
export function notEquals(left: ExpressionBase, right: ExpressionBase) {
    return binary(left, BinaryOperator.notEquals, right);
}
export function notStrictEquals(left: ExpressionBase, right: ExpressionBase) {
    return binary(left, BinaryOperator.notStrictEquals, right);
}
export function and(left: ExpressionBase, right: ExpressionBase) {
    return binary(left, BinaryOperator.and, right);
}
export function or(left: ExpressionBase, right: ExpressionBase) {
    return binary(left, BinaryOperator.or, right);
}

export function propertyAccess(expression: ExpressionBase, name: string) {
    return new PropertyAccessExpression(expression, name);
}

export function constant(value: any) {
    return new ConstantExpression(value);
}

export function objectLiteral(properties: PropertyAssignmentExpression[]) {
    return new ObjectLiteralExpression(properties);
}

export function propertyAssignment(name: string, expression:ExpressionBase) {
    return new PropertyAssignmentExpression(name, expression);
}

export function call(calleeExpression: ExpressionBase, ...args: ExpressionBase[]) {
    return new CallExpression(calleeExpression, ...args);
}
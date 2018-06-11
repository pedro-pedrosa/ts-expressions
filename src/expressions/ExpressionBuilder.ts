import { Expression } from './Expression';
import { LambdaExpression } from './LambdaExpression';
import { ParameterExpression } from './ParameterExpression';
import { BinaryOperator, BinaryExpression } from './BinaryExpression';
import { PropertyAccessExpression } from './PropertyAccessExpression';
import { ConstantExpression } from './ConstantExpression';
import { PropertyAssignmentExpression } from './PropertyAssignmentExpression';
import { ObjectLiteralExpression } from './ObjectLiteralExpression';
import { CallExpression } from './CallExpression';

export function lambda(parameters: ParameterExpression[], body: Expression): LambdaExpression {
    return new LambdaExpression(parameters, body);
}

export function parameter(name: string) {
    return new ParameterExpression(name);
}

export function binary(left: Expression, operator: BinaryOperator, right: Expression) {
    return new BinaryExpression(left, operator, right);
}
export function strictEquals(left: Expression, right: Expression) {
    return binary(left, BinaryOperator.strictEquals, right);
}
export function equals(left: Expression, right: Expression) {
    return binary(left, BinaryOperator.equals, right);
}
export function and(left: Expression, right: Expression) {
    return binary(left, BinaryOperator.and, right);
}
export function or(left: Expression, right: Expression) {
    return binary(left, BinaryOperator.or, right);
}

export function propertyAccess(expression: Expression, name: string) {
    return new PropertyAccessExpression(expression, name);
}

export function constant(value: any) {
    return new ConstantExpression(value);
}

export function objectLiteral(properties: PropertyAssignmentExpression[]) {
    return new ObjectLiteralExpression(properties);
}

export function propertyAssignment(name: string, expression:Expression) {
    return new PropertyAssignmentExpression(name, expression);
}

export function call(calleeExpression: Expression, ...args: Expression[]) {
    return new CallExpression(calleeExpression, ...args);
}
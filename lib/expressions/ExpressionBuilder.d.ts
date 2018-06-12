import { ExpressionBase } from './Expression';
import { LambdaExpression } from './LambdaExpression';
import { ParameterExpression } from './ParameterExpression';
import { BinaryOperator, BinaryExpression } from './BinaryExpression';
import { PropertyAccessExpression } from './PropertyAccessExpression';
import { ConstantExpression } from './ConstantExpression';
import { PropertyAssignmentExpression } from './PropertyAssignmentExpression';
import { ObjectLiteralExpression } from './ObjectLiteralExpression';
import { CallExpression } from './CallExpression';
export declare function lambda(parameters: ParameterExpression[], body: ExpressionBase): LambdaExpression;
export declare function parameter(name: string): ParameterExpression;
export declare function binary(left: ExpressionBase, operator: BinaryOperator, right: ExpressionBase): BinaryExpression;
export declare function strictEquals(left: ExpressionBase, right: ExpressionBase): BinaryExpression;
export declare function equals(left: ExpressionBase, right: ExpressionBase): BinaryExpression;
export declare function and(left: ExpressionBase, right: ExpressionBase): BinaryExpression;
export declare function or(left: ExpressionBase, right: ExpressionBase): BinaryExpression;
export declare function propertyAccess(expression: ExpressionBase, name: string): PropertyAccessExpression;
export declare function constant(value: any): ConstantExpression;
export declare function objectLiteral(properties: PropertyAssignmentExpression[]): ObjectLiteralExpression;
export declare function propertyAssignment(name: string, expression: ExpressionBase): PropertyAssignmentExpression;
export declare function call(calleeExpression: ExpressionBase, ...args: ExpressionBase[]): CallExpression;

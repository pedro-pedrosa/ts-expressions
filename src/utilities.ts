import { ExpressionParameterNotConvertedException } from './exceptions/ExpressionParameterNotConvertedException';
import * as expr from './expressions';

export function isExpression<T>(o: object): o is expr.Expression<T> {
    return o.hasOwnProperty(expr.expressionSymbol);
}
export function isArrayLiteralExpression<T>(o: object): o is expr.Expression<T> & { root: expr.ArrayLiteralExpression } {
    return isExpression<T>(o) && o.root.kind == expr.ExpressionKind.arrayLiteral;
}
export function isBinaryExpression<T>(o: object): o is expr.Expression<T> & { root: expr.BinaryExpression } {
    return isExpression<T>(o) && o.root.kind == expr.ExpressionKind.binary;
}
export function isCallExpression<T>(o: object): o is expr.Expression<T> & { root: expr.CallExpression } {
    return isExpression<T>(o) && o.root.kind == expr.ExpressionKind.call;
}
export function isConstantExpression<T>(o: object): o is expr.Expression<T> & { root: expr.ConstantExpression } {
    return isExpression<T>(o) && o.root.kind == expr.ExpressionKind.constant;
}
export function isLambdaExpression<T>(o: object): o is expr.Expression<T> & { root: expr.LambdaExpression } {
    return isExpression<T>(o) && o.root.kind == expr.ExpressionKind.lambda;
}
export function isObjectLiteralExpression<T>(o: object): o is expr.Expression<T> & { root: expr.ObjectLiteralExpression } {
    return isExpression<T>(o) && o.root.kind == expr.ExpressionKind.objectLiteral;
}
export function isParameterExpression<T>(o: object): o is expr.Expression<T> & { root: expr.ParameterExpression } {
    return isExpression<T>(o) && o.root.kind == expr.ExpressionKind.parameter;
}
export function isPropertyAccessExpression<T>(o: object): o is expr.Expression<T> & { root: expr.PropertyAccessExpression } {
    return isExpression<T>(o) && o.root.kind == expr.ExpressionKind.propertyAccess;
}
export function isPropertyAssignmentExpression<T>(o: object): o is expr.Expression<T> & { root: expr.PropertyAssignmentExpression } {
    return isExpression<T>(o) && o.root.kind == expr.ExpressionKind.propertyAssignment;
}

export function checkExpressionParameter<T>(o: object, parameterName: string): expr.Expression<T> {
    if (!isExpression<T>(o)) {
        throw new ExpressionParameterNotConvertedException(parameterName);
    }
    return o;
}
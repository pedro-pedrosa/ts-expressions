import { ExpressionParameterNotConvertedException } from './exceptions/ExpressionParameterNotConvertedException';
import * as expr from './expressions';

export function isExpression<T>(o: object): o is expr.Expression<T> {
    return o.hasOwnProperty(expr.expressionSymbol);
}
export function isArrayLiteralExpression(o: object): o is expr.ArrayLiteralExpression {
    return isExpression<{}>(o) && o.kind == expr.ExpressionKind.arrayLiteral;
}
export function isBinaryExpression(o: object): o is expr.BinaryExpression {
    return isExpression<{}>(o) && o.kind == expr.ExpressionKind.binary;
}
export function isCallExpression(o: object): o is expr.CallExpression {
    return isExpression<{}>(o) && o.kind == expr.ExpressionKind.call;
}
export function isConstantExpression(o: object): o is expr.ConstantExpression {
    return isExpression<{}>(o) && o.kind == expr.ExpressionKind.constant;
}
export function isLambdaExpression(o: object): o is expr.LambdaExpression {
    return isExpression<{}>(o) && o.kind == expr.ExpressionKind.lambda;
}
export function isObjectLiteralExpression(o: object): o is expr.ObjectLiteralExpression {
    return isExpression<{}>(o) && o.kind == expr.ExpressionKind.objectLiteral;
}
export function isParameterExpression(o: object): o is expr.ParameterExpression {
    return isExpression<{}>(o) && o.kind == expr.ExpressionKind.parameter;
}
export function isPropertyAccessExpression(o: object): o is expr.PropertyAccessExpression {
    return isExpression<{}>(o) && o.kind == expr.ExpressionKind.propertyAccess;
}
export function isPropertyAssignmentExpression(o: object): o is expr.PropertyAssignmentExpression {
    return isExpression<{}>(o) && o.kind == expr.ExpressionKind.propertyAssignment;
}

export function checkExpressionParameter<T>(o: object, parameterName: string): expr.Expression<T> {
    if (!isExpression<T>(o)) {
        throw new ExpressionParameterNotConvertedException(parameterName);
    }
    return o;
}
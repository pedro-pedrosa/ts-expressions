import { expressionSymbol, Expression } from './expressions/Expression';
import { ExpressionParameterNotConvertedException } from './exceptions/ExpressionParameterNotConvertedException';

export function isExpression<T>(expr: object): expr is Expression<T> {
    return expr.hasOwnProperty(expressionSymbol);
}
export function checkExpressionParameter<T>(expr: object, parameterName: string): Expression<T> {
    if (!isExpression(expr)) {
        throw new ExpressionParameterNotConvertedException(parameterName);
    }
    return expr;
}
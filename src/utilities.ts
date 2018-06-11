import { Expression, expressionSymbol } from './expressions/Expression';
import { ExpressionParameterNotConvertedException } from './exceptions/ExpressionParameterNotConvertedException';

export function isExpression(expr: object): expr is Expression {
    return expr.hasOwnProperty(expressionSymbol);
}
export function checkExpressionParameter(expr: object, parameterName: string): Expression {
    if (!isExpression(expr)) {
        throw new ExpressionParameterNotConvertedException(parameterName);
    }
    return expr;
}
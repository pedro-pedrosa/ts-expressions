"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Expression_1 = require("./expressions/Expression");
const ExpressionParameterNotConvertedException_1 = require("./exceptions/ExpressionParameterNotConvertedException");
function isExpression(expr) {
    return expr.hasOwnProperty(Expression_1.expressionSymbol);
}
exports.isExpression = isExpression;
function checkExpressionParameter(expr, parameterName) {
    if (!isExpression(expr)) {
        throw new ExpressionParameterNotConvertedException_1.ExpressionParameterNotConvertedException(parameterName);
    }
    return expr;
}
exports.checkExpressionParameter = checkExpressionParameter;

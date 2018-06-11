"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ExpressionParameterNotConvertedException extends Error {
    constructor(parameterName) {
        super(`Parameter '${parameterName}' has not been converted to an expression`);
    }
}
exports.ExpressionParameterNotConvertedException = ExpressionParameterNotConvertedException;

export class ExpressionParameterNotConvertedException extends Error {
    constructor(parameterName: string) {
        super(`Parameter '${parameterName}' has not been converted to an expression`);
    }
}
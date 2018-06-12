"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Expression_1 = require("./Expression");
const utilities_1 = require("../utilities");
const ExpressionKind_1 = require("./ExpressionKind");
class LambdaExpression extends Expression_1.ExpressionBase {
    constructor(parameters, body) {
        super();
        this.kind = ExpressionKind_1.ExpressionKind.lambda;
        this.parameters = parameters;
        this.body = body;
    }
    static create(expression) {
        return utilities_1.checkExpressionParameter(expression, 'expression');
    }
}
exports.LambdaExpression = LambdaExpression;

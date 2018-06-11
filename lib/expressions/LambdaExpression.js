"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Expression_1 = require("./Expression");
const utilities_1 = require("../utilities");
class LambdaExpression extends Expression_1.Expression {
    constructor(parameters, body) {
        super();
        this.parameters = parameters;
        this.body = body;
    }
    static create(expression) {
        return utilities_1.checkExpressionParameter(expression, 'expression');
    }
}
exports.LambdaExpression = LambdaExpression;

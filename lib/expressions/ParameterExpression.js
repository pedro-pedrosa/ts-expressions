"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Expression_1 = require("./Expression");
const ExpressionKind_1 = require("./ExpressionKind");
class ParameterExpression extends Expression_1.ExpressionBase {
    constructor(name) {
        super();
        this.kind = ExpressionKind_1.ExpressionKind.parameter;
        this.name = name;
    }
}
exports.ParameterExpression = ParameterExpression;

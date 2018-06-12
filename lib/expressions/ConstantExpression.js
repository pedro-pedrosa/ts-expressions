"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Expression_1 = require("./Expression");
const ExpressionKind_1 = require("./ExpressionKind");
class ConstantExpression extends Expression_1.ExpressionBase {
    constructor(value) {
        super();
        this.kind = ExpressionKind_1.ExpressionKind.constant;
        this.value = value;
    }
}
exports.ConstantExpression = ConstantExpression;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Expression_1 = require("./Expression");
const ExpressionKind_1 = require("./ExpressionKind");
class PropertyAccessExpression extends Expression_1.ExpressionBase {
    constructor(expression, name) {
        super();
        this.kind = ExpressionKind_1.ExpressionKind.propertyAccess;
        this.expression = expression;
        this.name = name;
    }
}
exports.PropertyAccessExpression = PropertyAccessExpression;

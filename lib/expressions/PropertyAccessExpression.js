"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Expression_1 = require("./Expression");
class PropertyAccessExpression extends Expression_1.Expression {
    constructor(expression, name) {
        super();
        this.expression = expression;
        this.name = name;
    }
}
exports.PropertyAccessExpression = PropertyAccessExpression;

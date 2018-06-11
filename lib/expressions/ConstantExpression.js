"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Expression_1 = require("./Expression");
class ConstantExpression extends Expression_1.Expression {
    constructor(value) {
        super();
        this.value = value;
    }
}
exports.ConstantExpression = ConstantExpression;

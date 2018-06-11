"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Expression_1 = require("./Expression");
class ParameterExpression extends Expression_1.Expression {
    constructor(name) {
        super();
        this.name = name;
    }
}
exports.ParameterExpression = ParameterExpression;

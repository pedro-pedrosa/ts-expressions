"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Expression_1 = require("./Expression");
class PropertyAssignmentExpression extends Expression_1.Expression {
    constructor(name, expression) {
        super();
        this.name = name;
        this.expression = expression;
    }
}
exports.PropertyAssignmentExpression = PropertyAssignmentExpression;

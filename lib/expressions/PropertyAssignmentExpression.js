"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Expression_1 = require("./Expression");
const ExpressionKind_1 = require("./ExpressionKind");
class PropertyAssignmentExpression extends Expression_1.ExpressionBase {
    constructor(name, expression) {
        super();
        this.kind = ExpressionKind_1.ExpressionKind.propertyAssignment;
        this.name = name;
        this.expression = expression;
    }
}
exports.PropertyAssignmentExpression = PropertyAssignmentExpression;

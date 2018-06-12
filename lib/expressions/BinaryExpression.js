"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Expression_1 = require("./Expression");
const ExpressionKind_1 = require("./ExpressionKind");
class BinaryExpression extends Expression_1.ExpressionBase {
    constructor(left, operator, right) {
        super();
        this.kind = ExpressionKind_1.ExpressionKind.binary;
        this.left = left;
        this.operator = operator;
        this.right = right;
    }
}
exports.BinaryExpression = BinaryExpression;
var BinaryOperator;
(function (BinaryOperator) {
    BinaryOperator[BinaryOperator["equals"] = 0] = "equals";
    BinaryOperator[BinaryOperator["strictEquals"] = 1] = "strictEquals";
    BinaryOperator[BinaryOperator["and"] = 2] = "and";
    BinaryOperator[BinaryOperator["or"] = 3] = "or";
})(BinaryOperator = exports.BinaryOperator || (exports.BinaryOperator = {}));

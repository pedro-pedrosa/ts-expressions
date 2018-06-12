"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Expression_1 = require("./Expression");
const ExpressionKind_1 = require("./ExpressionKind");
class CallExpression extends Expression_1.ExpressionBase {
    constructor(calleeExpresion, ...args) {
        super();
        this.kind = ExpressionKind_1.ExpressionKind.binary;
        this.calleeExpresion = calleeExpresion;
        this.arguments = args;
    }
}
exports.CallExpression = CallExpression;

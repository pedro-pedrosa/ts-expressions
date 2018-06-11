"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Expression_1 = require("./Expression");
class CallExpression extends Expression_1.Expression {
    constructor(calleeExpresion, ...args) {
        super();
        this.calleeExpresion = calleeExpresion;
        this.arguments = args;
    }
}
exports.CallExpression = CallExpression;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Expression_1 = require("./Expression");
class ObjectLiteralExpression extends Expression_1.Expression {
    constructor(properties) {
        super();
        this.properties = properties;
    }
}
exports.ObjectLiteralExpression = ObjectLiteralExpression;

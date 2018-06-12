"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Expression_1 = require("./Expression");
const ExpressionKind_1 = require("./ExpressionKind");
class ObjectLiteralExpression extends Expression_1.ExpressionBase {
    constructor(properties) {
        super();
        this.kind = ExpressionKind_1.ExpressionKind.objectLiteral;
        this.properties = properties;
    }
}
exports.ObjectLiteralExpression = ObjectLiteralExpression;

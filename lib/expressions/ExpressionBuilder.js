"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LambdaExpression_1 = require("./LambdaExpression");
const ParameterExpression_1 = require("./ParameterExpression");
const BinaryExpression_1 = require("./BinaryExpression");
const PropertyAccessExpression_1 = require("./PropertyAccessExpression");
const ConstantExpression_1 = require("./ConstantExpression");
const PropertyAssignmentExpression_1 = require("./PropertyAssignmentExpression");
const ObjectLiteralExpression_1 = require("./ObjectLiteralExpression");
const CallExpression_1 = require("./CallExpression");
function lambda(parameters, body) {
    return new LambdaExpression_1.LambdaExpression(parameters, body);
}
exports.lambda = lambda;
function parameter(name) {
    return new ParameterExpression_1.ParameterExpression(name);
}
exports.parameter = parameter;
function binary(left, operator, right) {
    return new BinaryExpression_1.BinaryExpression(left, operator, right);
}
exports.binary = binary;
function strictEquals(left, right) {
    return binary(left, BinaryExpression_1.BinaryOperator.strictEquals, right);
}
exports.strictEquals = strictEquals;
function equals(left, right) {
    return binary(left, BinaryExpression_1.BinaryOperator.equals, right);
}
exports.equals = equals;
function and(left, right) {
    return binary(left, BinaryExpression_1.BinaryOperator.and, right);
}
exports.and = and;
function or(left, right) {
    return binary(left, BinaryExpression_1.BinaryOperator.or, right);
}
exports.or = or;
function propertyAccess(expression, name) {
    return new PropertyAccessExpression_1.PropertyAccessExpression(expression, name);
}
exports.propertyAccess = propertyAccess;
function constant(value) {
    return new ConstantExpression_1.ConstantExpression(value);
}
exports.constant = constant;
function objectLiteral(properties) {
    return new ObjectLiteralExpression_1.ObjectLiteralExpression(properties);
}
exports.objectLiteral = objectLiteral;
function propertyAssignment(name, expression) {
    return new PropertyAssignmentExpression_1.PropertyAssignmentExpression(name, expression);
}
exports.propertyAssignment = propertyAssignment;
function call(calleeExpression, ...args) {
    return new CallExpression_1.CallExpression(calleeExpression, ...args);
}
exports.call = call;

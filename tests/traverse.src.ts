import * as expr from '..';
import * as common from './lib/common';

function returnsFunction(e: number): typeof common.numberExpression;
function returnsFunction(e: expr.Expression<number>): typeof common.numberExpression;
function returnsFunction(e: any): typeof common.numberExpression {
    expr.checkExpressionParameter(e, 'e');
    return common.numberExpression;
}
function returnsFunctionThroughProperty(e: number): typeof common;
function returnsFunctionThroughProperty(e: expr.Expression<number>): typeof common;
function returnsFunctionThroughProperty(e: any): typeof common {
    expr.checkExpressionParameter(e, 'e');
    return common;
}
function returnsFunctionFromBlock(e: number): typeof common.numberExpression;
function returnsFunctionFromBlock(e: expr.Expression<number>): typeof common.numberExpression;
function returnsFunctionFromBlock(e: any): typeof common.numberExpression {
    expr.checkExpressionParameter(e, 'e');
    function f(e: number);
    function f(e: expr.Expression<number>);
    function f(e: any) {
        return expr.checkExpressionParameter(e, 'e');
    }
    return f;
}
function traverseArguments(e: number, p1: expr.Expression<number>, p2: expr.Expression<number>): expr.Expression<number>;
function traverseArguments(e: expr.Expression<number>, p1: expr.Expression<number>, p2: expr.Expression<number>): expr.Expression<number>;
function traverseArguments(e: any, p1: expr.Expression<number>, p2: expr.Expression<number>): expr.Expression<number> {
    return expr.checkExpressionParameter(e, 'e') && expr.checkExpressionParameter(p1, 'p1') && expr.checkExpressionParameter(p2, 'p2');
}

export const chainedCalls = () => returnsFunction(1)(2);
export const chainedCallsThroughProperty = () => returnsFunctionThroughProperty(1).numberExpression(2);
export const chainedCallsFromBlock = () => returnsFunctionFromBlock(1)(2);
export const callsInArguments = () => traverseArguments(1, common.numberExpression(2), traverseArguments(3, common.numberExpression(4), common.numberExpression(5)));
import * as expr from '..';
import * as common from './lib/common';

const scopeVariable: number = 1;
function scopeFunction0(): number {
    return 0;
}
function scopeFunction1(x: number): number {
    return 0;
}
function scopeFunction2(x: number, y: number): number {
    return 0;
}
const objectWithProps = {
    prop1: 'str'
};

export default {
    constantNumber: common.numberExpression(5),
    constantString: common.stringExpression('str'),
    constantBoolean: common.booleanExpression(true),
    emptyArray: common.arrayOfNumberExpression([]),
    numberArray: common.arrayOfNumberExpression([1, 2, 3, 4]),
    variableAccess: common.numberExpression(scopeVariable),
    binaryEquals: common.booleanExpression(scopeVariable == 5),
    binaryStrictEquals: common.booleanExpression(scopeVariable === 5),
    binaryNotEquals: common.booleanExpression(scopeVariable !== 5),
    binaryAnd: common.booleanExpression(scopeVariable != 1 && scopeVariable == 5),
    binaryOr: common.booleanExpression(scopeVariable == 1 || scopeVariable == 5),
    binaryPlus: common.numberExpression(1 + 1),
    call0: common.numberExpression(scopeFunction0()),
    call1: common.numberExpression(scopeFunction1(scopeVariable)),
    call2: common.numberExpression(scopeFunction2(scopeVariable, 1)),
    action: common.actionExpression(() => {}),
    lambda0: common.lambda0Expression(() => 1),
    lambda1: common.lambda1Expression(n => n),
    lambda2: common.lambda2Expression((x, y) => x + y),
    objectLiteral: common.objectExpression({
        strProp: 'str',
        numberProp: 1
    }),
    propertyAccess: common.stringExpression(objectWithProps.prop1),
};
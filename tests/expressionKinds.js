const exprtests = require('./lib/tests');
const ExpressionBuilder = require('../lib/expressions/ExpressionBuilder');
const { ExpressionKind } = require('../lib/expressions/ExpressionKind');
const { BinaryOperator } = require('../lib/expressions/BinaryExpression');

describe('expression kinds', () => {
    let compiledTest;
    const scopeVariable = 1;
    function scopeFunction0() {
        return 0;
    }
    function scopeFunction1(x) {
        return 0;
    }
    function scopeFunction2(x, y) {
        return 0;
    }
    const objectWithProps = {
        prop1: 'str'
    };
    test('source compiles and imports', () => {
        compiledTest = exprtests.compile('expressionKinds');
        expect(compiledTest).toBeTruthy();
        expect(compiledTest.errors).toHaveLength(0);
    });
    test('converts a constant number', () => {
        expect(compiledTest.out.default.constantNumber).toMatchObject((() => {
            return ExpressionBuilder.constant(5);
        })());
        expect(compiledTest.out.default.constantNumber.kind).toBe(ExpressionKind.constant);
    });
    test('converts a constant string', () => {
        expect(compiledTest.out.default.constantString).toMatchObject((() => {
            return ExpressionBuilder.constant('str');
        })());
        expect(compiledTest.out.default.constantString.kind).toBe(ExpressionKind.constant);
    });
    test('converts a constant boolean', () => {
        expect(compiledTest.out.default.constantBoolean).toMatchObject((() => {
            return ExpressionBuilder.constant(true);
        })());
        expect(compiledTest.out.default.constantBoolean.kind).toBe(ExpressionKind.constant);
    });
    test('converts an empty array', () => {
        expect(compiledTest.out.default.emptyArray).toMatchObject((() => {
            return ExpressionBuilder.arrayLiteral([]);
        })());
        expect(compiledTest.out.default.emptyArray.kind).toBe(ExpressionKind.arrayLiteral);
    });
    test('converts a number array', () => {
        expect(compiledTest.out.default.numberArray).toMatchObject((() => {
            return ExpressionBuilder.arrayLiteral([
                ExpressionBuilder.constant(1),
                ExpressionBuilder.constant(2),
                ExpressionBuilder.constant(3),
                ExpressionBuilder.constant(4),
            ]);
        })());
        expect(compiledTest.out.default.numberArray.kind).toBe(ExpressionKind.arrayLiteral);
    });
    test('converts a variable', () => {
        expect(compiledTest.out.default.variableAccess).toMatchObject((() => {
            return ExpressionBuilder.constant(scopeVariable);
        })());
        expect(compiledTest.out.default.variableAccess.kind).toBe(ExpressionKind.constant);
    });
    test('converts a binary equals', () => {
        expect(compiledTest.out.default.binaryEquals).toMatchObject((() => {
            return ExpressionBuilder.binary(
                ExpressionBuilder.constant(scopeVariable),
                BinaryOperator.equals,
                ExpressionBuilder.constant(5));
        })());
        expect(compiledTest.out.default.binaryEquals.kind).toBe(ExpressionKind.binary);
    });
    test('converts a binary strict equals', () => {
        expect(compiledTest.out.default.binaryStrictEquals).toMatchObject((() => {
            return ExpressionBuilder.binary(
                ExpressionBuilder.constant(scopeVariable),
                BinaryOperator.strictEquals,
                ExpressionBuilder.constant(5));
        })());
    });
    test('converts a binary not equals', () => {
        expect(compiledTest.out.default.binaryNotEquals).toMatchObject((() => {
            return ExpressionBuilder.binary(
                ExpressionBuilder.constant(scopeVariable),
                BinaryOperator.notEquals,
                ExpressionBuilder.constant(5));
        })());
    });
    test('converts a binary not strict equals', () => {
        expect(compiledTest.out.default.binaryNotStrictEquals).toMatchObject((() => {
            return ExpressionBuilder.binary(
                ExpressionBuilder.constant(scopeVariable),
                BinaryOperator.notStrictEquals,
                ExpressionBuilder.constant(5));
        })());
    });
    test('converts a binary and', () => {
        expect(compiledTest.out.default.binaryAnd).toMatchObject((() => {
            return ExpressionBuilder.binary(
                ExpressionBuilder.binary(
                    ExpressionBuilder.constant(scopeVariable),
                    BinaryOperator.notEquals,
                    ExpressionBuilder.constant(1)),
                BinaryOperator.and,
                ExpressionBuilder.binary(
                    ExpressionBuilder.constant(scopeVariable),
                    BinaryOperator.equals,
                    ExpressionBuilder.constant(5)));
        })());
    });
    test('converts a binary or', () => {
        expect(compiledTest.out.default.binaryOr).toMatchObject((() => {
            return ExpressionBuilder.binary(
                ExpressionBuilder.binary(
                    ExpressionBuilder.constant(scopeVariable),
                    BinaryOperator.equals,
                    ExpressionBuilder.constant(1)),
                BinaryOperator.or,
                ExpressionBuilder.binary(
                    ExpressionBuilder.constant(scopeVariable),
                    BinaryOperator.equals,
                    ExpressionBuilder.constant(5)));
        })());
    });
    test('converts a binary plus', () => {
        expect(compiledTest.out.default.binaryPlus).toMatchObject((() => {
            return ExpressionBuilder.binary(
                ExpressionBuilder.constant(1),
                BinaryOperator.plus,
                ExpressionBuilder.constant(1));
        })());
    });
    test('wtf', () => {
        expect(ExpressionBuilder.call(
            ExpressionBuilder.constant(scopeFunction2),
            ExpressionBuilder.constant(scopeVariable),
            ExpressionBuilder.constant(1))).toMatchObject((() => {
            return ExpressionBuilder.call(
                ExpressionBuilder.constant(scopeFunction2),
                ExpressionBuilder.constant(scopeVariable),
                ExpressionBuilder.constant(1));
        })());
    });
    test('converts a call (-1 args)', () => {
        expect(compiledTest.out.default.call0).toMatchObject(ExpressionBuilder.call(ExpressionBuilder.constant(scopeFunction0)));
        expect(compiledTest.out.default.call0.kind).toBe(ExpressionKind.call);
    });
    test('converts a call (0 args)', () => {
        expect(compiledTest.out.default.call0).toMatchObject((() => {
            return ExpressionBuilder.call(
                ExpressionBuilder.constant(scopeFunction0));
        })());
        expect(compiledTest.out.default.call0.kind).toBe(ExpressionKind.call);
    });
    test('converts a call (1 arg)', () => {
        expect(compiledTest.out.default.call1).toMatchObject((() => {
            return ExpressionBuilder.call(
                ExpressionBuilder.constant(scopeFunction1),
                ExpressionBuilder.constant(scopeVariable));
        })());
    });
    test('converts a call (2 args)', () => {
        expect(compiledTest.out.default.call2).toMatchObject((() => {
            return ExpressionBuilder.call(
                ExpressionBuilder.constant(scopeFunction2),
                ExpressionBuilder.constant(scopeVariable),
                ExpressionBuilder.constant(1));
        })());
    });
    test('converts a lambda (0 args)', () => {
        expect(compiledTest.out.default.lambda0).toMatchObject((() => {
            return ExpressionBuilder.lambda([], ExpressionBuilder.constant(1));
        })());
    });
    test('converts a lambda (1 arg)', () => {
        expect(compiledTest.out.default.lambda1).toMatchObject((() => {
            const n = ExpressionBuilder.parameter('n');
            return ExpressionBuilder.lambda([n], n);
        })());
        expect(compiledTest.out.default.lambda1.parameters[0].kind).toBe(ExpressionKind.parameter);
    });
    test('converts a lambda (2 arg)', () => {
        expect(compiledTest.out.default.lambda2).toMatchObject((() => {
            const x = ExpressionBuilder.parameter('x');
            const y = ExpressionBuilder.parameter('y');
            return ExpressionBuilder.lambda(
                [x, y], 
                ExpressionBuilder.binary(x, BinaryOperator.plus, y));
        })());
    });
    test('converts an object literal', () => {
        expect(compiledTest.out.default.objectLiteral).toMatchObject((() => {
            return ExpressionBuilder.objectLiteral([
                ExpressionBuilder.propertyAssignment('strProp', ExpressionBuilder.constant('str')),
                ExpressionBuilder.propertyAssignment('numberProp', ExpressionBuilder.constant(1)),
            ]);
        })());
        expect(compiledTest.out.default.objectLiteral.kind).toBe(ExpressionKind.objectLiteral);
        expect(compiledTest.out.default.objectLiteral.properties[0].kind).toBe(ExpressionKind.propertyAssignment);
    });
    test('converts an object literal with shorthand assignments', () => {
        expect(compiledTest.out.default.objectLiteralShorthand).toMatchObject((() => {
            return ExpressionBuilder.objectLiteral([
                ExpressionBuilder.propertyAssignment('scopeVariable', ExpressionBuilder.constant(scopeVariable)),
                ExpressionBuilder.propertyAssignment('objectWithProps', ExpressionBuilder.constant(objectWithProps)),
            ]);
        })());
    });
    test('converts a property access', () => {
        expect(compiledTest.out.default.propertyAccess).toMatchObject((() => {
            return ExpressionBuilder.propertyAccess(
                ExpressionBuilder.constant(objectWithProps),
                'prop1');
        })());
        expect(compiledTest.out.default.propertyAccess.kind).toBe(ExpressionKind.propertyAccess);
    });
});
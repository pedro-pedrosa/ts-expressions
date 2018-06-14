const exprtests = require('./lib/tests');
const ExpressionBuilder = require('../lib/expressions/ExpressionBuilder');
const { ExpressionKind } = require('../lib/expressions/ExpressionKind');
const { BinaryOperator } = require('../lib/expressions/BinaryExpression');

describe('expression kinds', () => {
    let compiledTest;
    test('source compiles and imports', () => {
        compiledTest = exprtests.compile('expressionKinds');
        expect(compiledTest).toBeTruthy();
        expect(compiledTest.errors).toHaveLength(0);
    });
    test('converts a constant number', () => {
        expect(compiledTest.out.constantNumber).toMatchObject((() => {
            return ExpressionBuilder.constant(5);
        })());
        expect(compiledTest.out.constantNumber.kind).toBe(ExpressionKind.constant);
    });
    test('converts a constant string', () => {
        expect(compiledTest.out.constantString).toMatchObject((() => {
            return ExpressionBuilder.constant('str');
        })());
        expect(compiledTest.out.constantString.kind).toBe(ExpressionKind.constant);
    });
    test('converts a constant boolean', () => {
        expect(compiledTest.out.constantBoolean).toMatchObject((() => {
            return ExpressionBuilder.constant(true);
        })());
        expect(compiledTest.out.constantBoolean.kind).toBe(ExpressionKind.constant);
    });
    test('converts an empty array', () => {
        expect(compiledTest.out.emptyArray).toMatchObject((() => {
            return ExpressionBuilder.arrayLiteral([]);
        })());
        expect(compiledTest.out.emptyArray.kind).toBe(ExpressionKind.arrayLiteral);
    });
    test('converts a number array', () => {
        expect(compiledTest.out.numberArray).toMatchObject((() => {
            return ExpressionBuilder.arrayLiteral([
                ExpressionBuilder.constant(1),
                ExpressionBuilder.constant(2),
                ExpressionBuilder.constant(3),
                ExpressionBuilder.constant(4),
            ]);
        })());
        expect(compiledTest.out.numberArray.kind).toBe(ExpressionKind.arrayLiteral);
    });
    test('converts a variable', () => {
        expect(compiledTest.out.variableAccess).toMatchObject((() => {
            return ExpressionBuilder.constant(compiledTest.out.scopeVariable);
        })());
        expect(compiledTest.out.variableAccess.kind).toBe(ExpressionKind.constant);
    });
    test('converts a binary equals', () => {
        expect(compiledTest.out.binaryEquals).toMatchObject((() => {
            return ExpressionBuilder.binary(
                ExpressionBuilder.constant(compiledTest.out.scopeVariable),
                BinaryOperator.equals,
                ExpressionBuilder.constant(5));
        })());
        expect(compiledTest.out.binaryEquals.kind).toBe(ExpressionKind.binary);
    });
    test('converts a binary strict equals', () => {
        expect(compiledTest.out.binaryStrictEquals).toMatchObject((() => {
            return ExpressionBuilder.binary(
                ExpressionBuilder.constant(compiledTest.out.scopeVariable),
                BinaryOperator.strictEquals,
                ExpressionBuilder.constant(5));
        })());
    });
    test('converts a binary not equals', () => {
        expect(compiledTest.out.binaryNotEquals).toMatchObject((() => {
            return ExpressionBuilder.binary(
                ExpressionBuilder.constant(compiledTest.out.scopeVariable),
                BinaryOperator.notEquals,
                ExpressionBuilder.constant(5));
        })());
    });
    test('converts a binary not strict equals', () => {
        expect(compiledTest.out.binaryNotStrictEquals).toMatchObject((() => {
            return ExpressionBuilder.binary(
                ExpressionBuilder.constant(compiledTest.out.scopeVariable),
                BinaryOperator.notStrictEquals,
                ExpressionBuilder.constant(5));
        })());
    });
    test('converts a binary and', () => {
        expect(compiledTest.out.binaryAnd).toMatchObject((() => {
            return ExpressionBuilder.binary(
                ExpressionBuilder.binary(
                    ExpressionBuilder.constant(compiledTest.out.scopeVariable),
                    BinaryOperator.notEquals,
                    ExpressionBuilder.constant(1)),
                BinaryOperator.and,
                ExpressionBuilder.binary(
                    ExpressionBuilder.constant(compiledTest.out.scopeVariable),
                    BinaryOperator.equals,
                    ExpressionBuilder.constant(5)));
        })());
    });
    test('converts a binary or', () => {
        expect(compiledTest.out.binaryOr).toMatchObject((() => {
            return ExpressionBuilder.binary(
                ExpressionBuilder.binary(
                    ExpressionBuilder.constant(compiledTest.out.scopeVariable),
                    BinaryOperator.equals,
                    ExpressionBuilder.constant(1)),
                BinaryOperator.or,
                ExpressionBuilder.binary(
                    ExpressionBuilder.constant(compiledTest.out.scopeVariable),
                    BinaryOperator.equals,
                    ExpressionBuilder.constant(5)));
        })());
    });
    test('converts a binary plus', () => {
        expect(compiledTest.out.binaryPlus).toMatchObject((() => {
            return ExpressionBuilder.binary(
                ExpressionBuilder.constant(1),
                BinaryOperator.plus,
                ExpressionBuilder.constant(1));
        })());
    });
    test('converts a call (0 args)', () => {
        expect(compiledTest.out.call0).toMatchObject((() => {
            return ExpressionBuilder.call(
                ExpressionBuilder.constant(compiledTest.out.scopeFunction0));
        })());
        expect(compiledTest.out.call0.kind).toBe(ExpressionKind.call);
    });
    test('converts a call (1 arg)', () => {
        expect(compiledTest.out.call1).toMatchObject((() => {
            return ExpressionBuilder.call(
                ExpressionBuilder.constant(compiledTest.out.scopeFunction1),
                ExpressionBuilder.constant(compiledTest.out.scopeVariable));
        })());
    });
    test('converts a call (2 args)', () => {
        expect(compiledTest.out.call2).toMatchObject((() => {
            return ExpressionBuilder.call(
                ExpressionBuilder.constant(compiledTest.out.scopeFunction2),
                ExpressionBuilder.constant(compiledTest.out.scopeVariable),
                ExpressionBuilder.constant(1));
        })());
    });
    test('converts a lambda (0 args)', () => {
        expect(compiledTest.out.lambda0).toMatchObject((() => {
            return ExpressionBuilder.lambda([], ExpressionBuilder.constant(1));
        })());
    });
    test('converts a lambda (1 arg)', () => {
        expect(compiledTest.out.lambda1).toMatchObject((() => {
            const n = ExpressionBuilder.parameter('n');
            return ExpressionBuilder.lambda([n], n);
        })());
        expect(compiledTest.out.lambda1.parameters[0].kind).toBe(ExpressionKind.parameter);
    });
    test('converts a lambda (2 arg)', () => {
        expect(compiledTest.out.lambda2).toMatchObject((() => {
            const x = ExpressionBuilder.parameter('x');
            const y = ExpressionBuilder.parameter('y');
            return ExpressionBuilder.lambda(
                [x, y], 
                ExpressionBuilder.binary(x, BinaryOperator.plus, y));
        })());
    });
    test('converts an object literal', () => {
        expect(compiledTest.out.objectLiteral).toMatchObject((() => {
            return ExpressionBuilder.objectLiteral([
                ExpressionBuilder.propertyAssignment('strProp', ExpressionBuilder.constant('str')),
                ExpressionBuilder.propertyAssignment('numberProp', ExpressionBuilder.constant(1)),
            ]);
        })());
        expect(compiledTest.out.objectLiteral.kind).toBe(ExpressionKind.objectLiteral);
        expect(compiledTest.out.objectLiteral.properties[0].kind).toBe(ExpressionKind.propertyAssignment);
    });
    test('converts an object literal with shorthand assignments', () => {
        expect(compiledTest.out.objectLiteralShorthand).toMatchObject((() => {
            return ExpressionBuilder.objectLiteral([
                ExpressionBuilder.propertyAssignment('scopeVariable', ExpressionBuilder.constant(compiledTest.out.scopeVariable)),
                ExpressionBuilder.propertyAssignment('objectWithProps', ExpressionBuilder.constant(compiledTest.out.objectWithProps)),
            ]);
        })());
    });
    test('converts a property access', () => {
        expect(compiledTest.out.propertyAccess).toMatchObject((() => {
            return ExpressionBuilder.propertyAccess(
                ExpressionBuilder.constant(compiledTest.out.objectWithProps),
                'prop1');
        })());
        expect(compiledTest.out.propertyAccess.kind).toBe(ExpressionKind.propertyAccess);
    });
});
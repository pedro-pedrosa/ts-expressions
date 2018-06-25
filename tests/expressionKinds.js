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
        const expr = compiledTest.out.constantNumber();
        expect(expr).toEqual((() => {
            return ExpressionBuilder.createExpression({}, ExpressionBuilder.constant(5));
        })());
        expect(expr.root.kind).toBe(ExpressionKind.constant);
    });
    test('converts a constant string', () => {
        expect(compiledTest.out.constantString()).toEqual((() => {
            return ExpressionBuilder.createExpression({}, ExpressionBuilder.constant('str'));
        })());
    });
    test('converts a constant boolean', () => {
        const expr = compiledTest.out.constantBoolean();
        expect(expr).toEqual((() => {
            return ExpressionBuilder.createExpression({}, ExpressionBuilder.constant(true));
        })());
    });
    test('converts an empty array', () => {
        const expr = compiledTest.out.emptyArray();
        expect(expr).toEqual((() => {
            return ExpressionBuilder.createExpression({}, ExpressionBuilder.arrayLiteral([]));
        })());
        expect(expr.root.kind).toBe(ExpressionKind.arrayLiteral);
    });
    test('converts a number array', () => {
        expect(compiledTest.out.numberArray()).toEqual((() => {
            return ExpressionBuilder.createExpression({}, 
                ExpressionBuilder.arrayLiteral([
                    ExpressionBuilder.constant(1),
                    ExpressionBuilder.constant(2),
                    ExpressionBuilder.constant(3),
                    ExpressionBuilder.constant(4),
                ]));
        })());
    });
    test('converts a variable', () => {
        expect(compiledTest.out.variableAccess()).toEqual((() => {
            return ExpressionBuilder.createExpression({}, 
                ExpressionBuilder.constant(compiledTest.out.scopeVariable));
        })());
    });
    test('converts a binary equals', () => {
        const expr = compiledTest.out.binaryEquals();
        expect(expr).toEqual((() => {
            return ExpressionBuilder.createExpression({}, 
                ExpressionBuilder.binary(
                    ExpressionBuilder.constant(compiledTest.out.scopeVariable),
                    BinaryOperator.equals,
                    ExpressionBuilder.constant(5)));
        })());
        expect(expr.root.kind).toBe(ExpressionKind.binary);
    });
    test('converts a binary strict equals', () => {
        expect(compiledTest.out.binaryStrictEquals()).toEqual((() => {
            return ExpressionBuilder.createExpression({}, 
                ExpressionBuilder.binary(
                    ExpressionBuilder.constant(compiledTest.out.scopeVariable),
                    BinaryOperator.strictEquals,
                    ExpressionBuilder.constant(5)));
        })());
    });
    test('converts a binary not equals', () => {
        expect(compiledTest.out.binaryNotEquals()).toEqual((() => {
            return ExpressionBuilder.createExpression({}, 
                ExpressionBuilder.binary(
                    ExpressionBuilder.constant(compiledTest.out.scopeVariable),
                    BinaryOperator.notEquals,
                    ExpressionBuilder.constant(5)));
        })());
    });
    test('converts a binary not strict equals', () => {
        expect(compiledTest.out.binaryNotStrictEquals()).toEqual((() => {
            return ExpressionBuilder.createExpression({}, 
                ExpressionBuilder.binary(
                    ExpressionBuilder.constant(compiledTest.out.scopeVariable),
                    BinaryOperator.notStrictEquals,
                    ExpressionBuilder.constant(5)));
        })());
    });
    test('converts a binary and', () => {
        expect(compiledTest.out.binaryAnd()).toEqual((() => {
            return ExpressionBuilder.createExpression({}, 
                ExpressionBuilder.binary(
                    ExpressionBuilder.binary(
                        ExpressionBuilder.constant(compiledTest.out.scopeVariable),
                        BinaryOperator.notEquals,
                        ExpressionBuilder.constant(1)),
                    BinaryOperator.and,
                    ExpressionBuilder.binary(
                        ExpressionBuilder.constant(compiledTest.out.scopeVariable),
                        BinaryOperator.equals,
                        ExpressionBuilder.constant(5))));
        })());
    });
    test('converts a binary or', () => {
        expect(compiledTest.out.binaryOr()).toEqual((() => {
            return ExpressionBuilder.createExpression({}, 
                ExpressionBuilder.binary(
                    ExpressionBuilder.binary(
                        ExpressionBuilder.constant(compiledTest.out.scopeVariable),
                        BinaryOperator.equals,
                        ExpressionBuilder.constant(1)),
                    BinaryOperator.or,
                    ExpressionBuilder.binary(
                        ExpressionBuilder.constant(compiledTest.out.scopeVariable),
                        BinaryOperator.equals,
                        ExpressionBuilder.constant(5))));
        })());
    });
    test('converts a binary plus', () => {
        expect(compiledTest.out.binaryPlus()).toEqual((() => {
            return ExpressionBuilder.createExpression({}, 
                ExpressionBuilder.binary(
                    ExpressionBuilder.constant(1),
                    BinaryOperator.plus,
                    ExpressionBuilder.constant(1)));
        })());
    });
    test('converts a binary divide', () => {
        expect(compiledTest.out.binaryDivide()).toEqual((() => {
            return ExpressionBuilder.createExpression({}, 
                ExpressionBuilder.binary(
                    ExpressionBuilder.constant(10),
                    BinaryOperator.divide,
                    ExpressionBuilder.constant(2)));
        })());
    });
    test('converts a binary multiply', () => {
        expect(compiledTest.out.binaryMultiply()).toEqual((() => {
            return ExpressionBuilder.createExpression({}, 
                ExpressionBuilder.binary(
                    ExpressionBuilder.constant(3),
                    BinaryOperator.multiply,
                    ExpressionBuilder.constant(2)));
        })());
    });
    test('converts a binary minus', () => {
        expect(compiledTest.out.binaryMinus()).toEqual((() => {
            return ExpressionBuilder.createExpression({}, 
                ExpressionBuilder.binary(
                    ExpressionBuilder.constant(10),
                    BinaryOperator.minus,
                    ExpressionBuilder.constant(2)));
        })());
    });
    test('converts a binary greater than', () => {
        expect(compiledTest.out.binaryGreaterThan()).toEqual((() => {
            return ExpressionBuilder.createExpression({}, 
                ExpressionBuilder.binary(
                    ExpressionBuilder.constant(10),
                    BinaryOperator.greaterThan,
                    ExpressionBuilder.constant(2)));
        })());
    });
    test('converts a binary greater than or equals', () => {
        expect(compiledTest.out.binaryGreaterThanOrEquals()).toEqual((() => {
            return ExpressionBuilder.createExpression({}, 
                ExpressionBuilder.binary(
                    ExpressionBuilder.constant(10),
                    BinaryOperator.greaterThanOrEquals,
                    ExpressionBuilder.constant(2)));
        })());
    });
    test('converts a binary less than', () => {
        expect(compiledTest.out.binaryLessThan()).toEqual((() => {
            return ExpressionBuilder.createExpression({}, 
                ExpressionBuilder.binary(
                    ExpressionBuilder.constant(10),
                    BinaryOperator.lessThan,
                    ExpressionBuilder.constant(2)));
        })());
    });
    test('converts a binary less than or equals', () => {
        expect(compiledTest.out.binaryLessThanOrEquals()).toEqual((() => {
            return ExpressionBuilder.createExpression({}, 
                ExpressionBuilder.binary(
                    ExpressionBuilder.constant(10),
                    BinaryOperator.lessThanOrEquals,
                    ExpressionBuilder.constant(2)));
        })());
    });
    test('converts a call (0 args)', () => {
        const expr = compiledTest.out.call0();
        expect(expr).toEqual((() => {
            return ExpressionBuilder.createExpression({}, 
                ExpressionBuilder.call(ExpressionBuilder.constant(compiledTest.out.scopeFunction0)));
        })());
        expect(expr.root.kind).toBe(ExpressionKind.call);
    });
    test('converts a call (1 arg)', () => {
        expect(compiledTest.out.call1()).toEqual((() => {
            return ExpressionBuilder.createExpression({}, 
                ExpressionBuilder.call(
                    ExpressionBuilder.constant(compiledTest.out.scopeFunction1),
                    ExpressionBuilder.constant(compiledTest.out.scopeVariable)));
        })());
    });
    test('converts a call (2 args)', () => {
        expect(compiledTest.out.call2()).toEqual((() => {
            return ExpressionBuilder.createExpression({}, 
                ExpressionBuilder.call(
                    ExpressionBuilder.constant(compiledTest.out.scopeFunction2),
                    ExpressionBuilder.constant(compiledTest.out.scopeVariable),
                    ExpressionBuilder.constant(1)));
        })());
    });
    test('converts a lambda (0 args)', () => {
        const expr = compiledTest.out.lambda0();
        expect(expr).toEqual((() => {
            return ExpressionBuilder.createExpression({}, 
                ExpressionBuilder.lambda([], ExpressionBuilder.constant(1)));
        })());
        expect(expr.root.kind).toBe(ExpressionKind.lambda);
    });
    test('converts a lambda (1 arg)', () => {
        const expr = compiledTest.out.lambda1();
        expect(expr).toEqual((() => {
            const n = ExpressionBuilder.parameter('n');
            return ExpressionBuilder.createExpression({}, 
                ExpressionBuilder.lambda([n], n));
        })());
        expect(expr.root.parameters[0].kind).toBe(ExpressionKind.parameter);
    });
    test('converts a lambda (2 arg)', () => {
        expect(compiledTest.out.lambda2()).toEqual((() => {
            const x = ExpressionBuilder.parameter('x');
            const y = ExpressionBuilder.parameter('y');
            return ExpressionBuilder.createExpression({}, 
                ExpressionBuilder.lambda(
                    [x, y], 
                    ExpressionBuilder.binary(x, BinaryOperator.plus, y)));
        })());
    });
    test('converts an object literal', () => {
        const expr = compiledTest.out.objectLiteral();
        expect(expr).toEqual((() => {
            return ExpressionBuilder.createExpression({}, 
                ExpressionBuilder.objectLiteral([
                    ExpressionBuilder.propertyAssignment('strProp', ExpressionBuilder.constant('str')),
                    ExpressionBuilder.propertyAssignment('numberProp', ExpressionBuilder.constant(1)),
                ]));
        })());
        expect(expr.root.kind).toBe(ExpressionKind.objectLiteral);
        expect(expr.root.properties[0].kind).toBe(ExpressionKind.propertyAssignment);
    });
    test('converts an object literal with shorthand assignments', () => {
        expect(compiledTest.out.objectLiteralShorthand()).toEqual((() => {
            return ExpressionBuilder.createExpression({}, 
                ExpressionBuilder.objectLiteral([
                    ExpressionBuilder.propertyAssignment('scopeVariable', ExpressionBuilder.constant(compiledTest.out.scopeVariable)),
                    ExpressionBuilder.propertyAssignment('objectWithProps', ExpressionBuilder.constant(compiledTest.out.objectWithProps)),
                ]));
        })());
    });
    test('converts a property access', () => {
        const expr = compiledTest.out.propertyAccess();
        expect(expr).toEqual((() => {
            return ExpressionBuilder.createExpression({}, 
                ExpressionBuilder.propertyAccess(
                    ExpressionBuilder.constant(compiledTest.out.objectWithProps),
                    'prop1'));
        })());
        expect(expr.root.kind).toBe(ExpressionKind.propertyAccess);
    });
});
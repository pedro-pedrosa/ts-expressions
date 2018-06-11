const exprtests = require('./lib/tests');
const ExpressionBuilder = require('../lib/expressions/ExpressionBuilder');

test('converts an identity function', () => {
    const compiledTest = exprtests.compile('lambdaIdentity');
    expect(compiledTest.errors).toHaveLength(0);
    expect(compiledTest.out.default).toMatchObject((() => {
        const x = ExpressionBuilder.parameter('x');
        return ExpressionBuilder.lambda([x], x);
    })());
});
const exprtests = require('./lib/tests');

describe('transformer source traverse', () => {
    let compiledTest;
    test('source compiles and imports', () => {
        compiledTest = exprtests.compile('traverse');
        expect(compiledTest).toBeTruthy();
        expect(compiledTest.errors).toHaveLength(0);
    });
    test('converts arguments in chained calls', () => {
        expect(compiledTest.out.chainedCalls).not.toThrow();
    });
    test('converts arguments in chained calls (deep)', () => {
        expect(compiledTest.out.chainedCallsThroughProperty).not.toThrow();
    });
    test('converts arguments in chained calls declared in subscope', () => {
        expect(compiledTest.out.chainedCallsFromBlock).not.toThrow();
    });
    test('traverses arguments in converted call', () => {
        expect(compiledTest.out.callsInArguments).not.toThrow();
    });
});
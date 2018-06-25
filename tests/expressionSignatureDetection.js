const exprtests = require('./lib/tests');

/*compiledTest = exprtests.compile('expressionSignatureDetection');
compiledTest.out.iinterface();*/

describe('expression signature detection', () => {
    let compiledTest;
    test('source compiles and imports', () => {
        compiledTest = exprtests.compile('expressionSignatureDetection');
        expect(compiledTest).toBeTruthy();
        expect(compiledTest.errors).toHaveLength(0);
    });
    test('converts from call declared in interface', () => {
        expect(compiledTest.out.iinterface).not.toThrow();
    });
    //TODO: 
    //CallSignatureDeclaration
    //ConstructSignatureDeclaration
    //IndexSignatureDeclaration
    //FunctionTypeNode
    //ConstructorTypeNode
    //JSDocFunctionType
    //FunctionDeclaration
    //MethodDeclaration
    //ConstructorDeclaration
    //AccessorDeclaration
    //FunctionExpression
    //ArrowFunction
});
import * as ts from 'typescript';
import { NotSupportedException } from './exceptions/NotSupportedException';

export interface Config {
    modulePath?: string;
}

export default function transformer(program: ts.Program, config?: Config): ts.TransformerFactory<ts.SourceFile> {
    return (context: ts.TransformationContext) => (file: ts.SourceFile) => new FileTransformer(program, context, file, config).transformFile();
}

class FileTransformer {
    constructor(program: ts.Program, context: ts.TransformationContext, file: ts.SourceFile, config?: Config) {
        this.program = program;
        this.context = context;
        this.file = file;
        this.config = config;
        this.builderIdentifier = null;
    }
    private program: ts.Program;
    private context: ts.TransformationContext;
    private file: ts.SourceFile;
    private config: Config;
    private typeChecker: ts.TypeChecker;
    private scopeStack: Set<string>[];
    private builderIdentifier: ts.Identifier;

    private getBuilderIdentifier() {
        return this.builderIdentifier || (this.builderIdentifier = ts.createUniqueName('ExpressionBuilder'));
    }


    transformFile(): ts.SourceFile {
        if (this.file.isDeclarationFile) {
            return this.file;
        }
        this.typeChecker = this.program.getTypeChecker();
        this.scopeStack = [new Set<string>()];
        const visitedStatements = this.file.statements.map(s => this.visit(s) as ts.Statement);
        //TODO: support other module generation options
        return this.builderIdentifier == null ? this.file : ts.updateSourceFileNode(
            this.file, 
            [ 
                ts.createVariableStatement(
                    [],
                    ts.createVariableDeclarationList(
                        [ ts.createVariableDeclaration(this.builderIdentifier, undefined, ts.createCall(ts.createIdentifier('require'), [], [ ts.createLiteral((this.config && this.config.modulePath || 'ts-expressions') + '/lib/expressions/ExpressionBuilder') ]))]
                    )
                ),
                ...visitedStatements
            ]);
    }

    visit(node: ts.Node): ts.Node {
        if (ts.isCallExpression(node)) {
            const expressionOverload = this.getBestExpressionOverloadDeclarationFromCallExpression(node);
            if (expressionOverload) {
                return ts.createCall(
                    this.visit(node.expression) as ts.Expression, 
                    [],
                    expressionOverload.parameters.map((parameter, i) => this.isTypeNodeExpressionType(parameter.type) && !this.isTypeExpressionType(this.typeChecker.getTypeAtLocation(node.arguments[i])) ? 
                        this.convertExpression(node.arguments[i]) : 
                        (this.visit(node.arguments[i]) as ts.Expression))
                )
            }
        }
        return ts.visitEachChild(node, child => this.visit(child), this.context);
    }

    getBestExpressionOverloadDeclarationFromCallExpression(callExpression: ts.CallExpression): ts.SignatureDeclarationBase {
        const signature = this.typeChecker.getResolvedSignature(callExpression);
        if (!signature || (!ts.isFunctionDeclaration(signature.declaration) && !ts.isMethodDeclaration(signature.declaration) && !ts.isMethodSignature(signature.declaration))) {
            return undefined;
        }
        const bestOverload = this.getCompatibleOverloadDeclarations(signature.declaration)
            .map(overload => ({
                overload,
                convertibleParameters: overload.parameters.filter((p, i) => this.isParameterConvertible((signature.declaration as ts.FunctionLikeDeclarationBase).parameters[i], p)).length,
            }))
            .reduce((best, current) => (!best || current.convertibleParameters > best.convertibleParameters) ? current : best, undefined);
        return bestOverload ? bestOverload.overload : undefined;
    }
    getCompatibleOverloadDeclarations(declaration: ts.SignatureDeclarationBase): ts.SignatureDeclarationBase[] {
        if (!declaration.name) {
            return [];
        }
        let delcarationsInScope: ts.SignatureDeclarationBase[] = null;
        if (ts.isMethodDeclaration(declaration) && ts.isClassDeclaration(declaration.parent)) {
            delcarationsInScope = declaration.parent.members
                .filter(child => ts.isMethodDeclaration(child))
                .map(child => child as ts.MethodDeclaration);
        }
        else if (ts.isMethodSignature(declaration) && ts.isInterfaceDeclaration(declaration.parent)) {
            delcarationsInScope = declaration.parent.members
                .filter(child => ts.isMethodSignature(child))
                .map(child => child as ts.MethodSignature);
        }
        else if (ts.isFunctionDeclaration(declaration)) {
            //TODO: support function declarations in sub-scopes
            if (ts.isSourceFile(declaration.parent)) {
                delcarationsInScope = declaration.parent.statements
                    .filter(child => ts.isFunctionDeclaration(child))
                    .map(child => child as ts.FunctionDeclaration);
            }
        }
        if (!delcarationsInScope) {
            return [];
        }
        return delcarationsInScope
            .filter(d => 
                d.name && d.name.getText() == declaration.name.getText() &&
                d.parameters.length == declaration.parameters.length &&
                d.parameters.every((p, i) => this.isParameterSameType(declaration.parameters[i], p) || this.isParameterConvertible(declaration.parameters[i], p)));
    }

    isSameType(t1: ts.TypeNode, t2: ts.TypeNode) {
        if (!t1 || !t2) {
            return false;
        }
        switch (t1.kind) {
            case ts.SyntaxKind.TypeReference:
            return ts.isTypeReferenceNode(t2) && this.typeChecker.getTypeFromTypeNode(t1).symbol == this.typeChecker.getTypeFromTypeNode(t2).symbol;
            default:
            //TODO: fix this
            return t1.getText() == t2.getText();
        }
    }
    
    isParameterSameType(parameter: ts.ParameterDeclaration, compareParameter: ts.ParameterDeclaration) {
        return this.isSameType(parameter.type, compareParameter.type);
    }
    isParameterConvertible(parameter: ts.ParameterDeclaration, expressionParameter: ts.ParameterDeclaration) {
        return this.isTypeNodeExpressionType(expressionParameter.type) && this.isSameType(parameter.type, this.getExpressionTypeArgument(expressionParameter.type));
    }
    isTypeNodeExpressionType(typeNode: ts.TypeNode): boolean {
        return this.isTypeExpressionType(this.typeChecker.getTypeFromTypeNode(typeNode));
    }
    isTypeExpressionType(type: ts.Type): boolean {
        return type.symbol && type.symbol.declarations && type.symbol.declarations.findIndex(decl => this.isTypeDeclarationExpressionType(decl)) != -1;
    }
    isTypeDeclarationExpressionType(declaration: ts.Declaration): boolean {
        if (ts.isInterfaceDeclaration(declaration)) {
            const name = declaration.name && declaration.name.getText();
            const fileName = declaration.getSourceFile().fileName;
            return name == 'Expression' && (fileName.endsWith('/ts-expressions/lib/expressions/Expression.d.ts') || fileName.endsWith('/ts-expressions/lib/expressions/Expression.ts'));
        }
        return false;
    }
    getExpressionTypeArgument(expressionType: ts.TypeNode) {
        return ts.isTypeReferenceNode(expressionType) ? expressionType.typeArguments[0] : undefined;
    }
    isConstantExpression(expression: ts.Expression): boolean {
        if (ts.isIdentifier(expression)) {
            return this.isInScope(expression.getText());
        }
        else if (ts.isPropertyAccessExpression(expression)) {
            return this.isConstantExpression(expression.expression);
        }
        else if (ts.isCallExpression(expression)) {
            return this.isConstantExpression(expression.expression) && expression.arguments.every(this.isConstantExpression);
        }
        return false;
    }
    isInScope(identifier: string) {
        return this.scopeStack[this.scopeStack.length - 1].has(identifier);
    }

    executeInNewScope<TResult>(action: () => TResult, scopeIdentifiers: string[]): TResult {
        const newScope = new Set<string>(this.scopeStack[this.scopeStack.length - 1]);
        for (let id of scopeIdentifiers) {
            newScope.add(id);
        }
        this.scopeStack.push(newScope);
        try {
            return action();
        }
        finally {
            this.scopeStack.pop();
        }
    }

    convertExpression(node: ts.Node): ts.Expression {
        try {
            return ts.createCall(
                ts.createPropertyAccess(
                    this.getBuilderIdentifier(),
                    'createExpression'),
                [],
                [
                    ts.createObjectLiteral([]),
                    this.convertNodeToExpressionNode(node)
                ]
            )
        }
        catch {
            //TODO: report these errors somehow
            return this.visit(node) as ts.Expression;
        }
    }
    convertNodeToExpressionNode(node: ts.Node): ts.Expression {
        switch (node.kind) {
            case ts.SyntaxKind.NumericLiteral:
                return this.convertLiteral(ts.createNumericLiteral, node as ts.NumericLiteral);
            case ts.SyntaxKind.StringLiteral:
                return this.convertLiteral(ts.createStringLiteral, node as ts.StringLiteral);
            case ts.SyntaxKind.TrueKeyword:
                return this.convertBoolean(true);
            case ts.SyntaxKind.FalseKeyword:
                return this.convertBoolean(false);
            case ts.SyntaxKind.ArrayLiteralExpression:
                return this.convertArrayLiteral(node as ts.ArrayLiteralExpression);
            case ts.SyntaxKind.ArrowFunction:
            case ts.SyntaxKind.FunctionExpression:
                return this.convertLambda(node as ts.FunctionLikeDeclarationBase);
            case ts.SyntaxKind.BinaryExpression:
                return this.convertBinaryExpression(node as ts.BinaryExpression);
            case ts.SyntaxKind.PropertyAccessExpression:
                return this.convertPropertyAccessExpression(node as ts.PropertyAccessExpression);
            case ts.SyntaxKind.Identifier:
                return this.convertIdentifier(node as ts.Identifier);
            case ts.SyntaxKind.ParenthesizedExpression:
                return this.convertParenthesizedExpression(node as ts.ParenthesizedExpression);
            case ts.SyntaxKind.ObjectLiteralExpression:
                return this.convertObjectLiteralExpression(node as ts.ObjectLiteralExpression);
            case ts.SyntaxKind.PropertyAssignment:
                return this.convertPropertyAssignment(node as ts.PropertyAssignment);
            case ts.SyntaxKind.ShorthandPropertyAssignment:
                return this.convertShorthandPropertyAssignment(node as ts.ShorthandPropertyAssignment);
            case ts.SyntaxKind.CallExpression:
                return this.convertCallExpression(node as ts.CallExpression);
        }
        throw new NotSupportedException(`Conversion of node syntax kind '${node.kind}' is not supported`);
    }
    convertLiteral(factoryMethod: (text: string) => ts.LiteralExpression, literal: ts.LiteralExpression): ts.Expression {
        return ts.createCall(
            ts.createPropertyAccess(
                this.getBuilderIdentifier(),
                'constant'),
            [],
            [
                factoryMethod(literal.text)
            ]
        )
    }
    convertBoolean(b: boolean): ts.Expression {
        return ts.createCall(
            ts.createPropertyAccess(
                this.getBuilderIdentifier(),
                'constant'),
            [],
            [
                b ? ts.createTrue() : ts.createFalse()
            ]
        )
    }
    convertArrayLiteral(arrayLiteral: ts.ArrayLiteralExpression): ts.Expression {
        return ts.createCall(
            ts.createPropertyAccess(
                this.getBuilderIdentifier(),
                'arrayLiteral'),
            [],
            [
                ts.createArrayLiteral(arrayLiteral.elements.map(element => this.convertNodeToExpressionNode(element))),
            ]
        )
    }
    convertLambda(lambda: ts.FunctionLikeDeclarationBase): ts.Expression {
        if (!lambda.parameters || lambda.parameters.length == 0) {
            return ts.createCall(
                ts.createPropertyAccess(
                    this.getBuilderIdentifier(),
                    'lambda'),
                [],
                [
                    ts.createArrayLiteral([]),
                    this.convertNodeToExpressionNode(lambda.body),
                ]
            )
        }
        return ts.createImmediatelyInvokedArrowFunction([
            ts.createVariableStatement(
                [], 
                ts.createVariableDeclarationList(
                    lambda.parameters.map(parameter => ts.createVariableDeclaration(
                        parameter.name, 
                        undefined,
                        ts.createCall(
                            ts.createPropertyAccess(
                                this.getBuilderIdentifier(),
                                'parameter'),
                            [],
                            [ts.createLiteral(parameter.name.getText())]
                        ))
                    ),
                    ts.NodeFlags.Const
                )
            ),
            ts.createReturn(
                ts.createCall(
                    ts.createPropertyAccess(
                        this.getBuilderIdentifier(),
                        'lambda'),
                    [],
                    [
                        ts.createArrayLiteral(lambda.parameters.map(parameter => ts.createIdentifier(parameter.name.getText()))),
                        this.executeInNewScope(() => this.convertNodeToExpressionNode(lambda.body), lambda.parameters.map(parameter => parameter.name.getText())),
                    ]
                )
            )
        ]);
    }
    convertBinaryExpression(binaryExpression: ts.BinaryExpression): ts.Expression {
        return ts.createCall(
            ts.createPropertyAccess(
                this.getBuilderIdentifier(),
                this.getBinaryOperatorFunction(binaryExpression.operatorToken.kind)),
            [],
            [
                this.convertNodeToExpressionNode(binaryExpression.left),
                this.convertNodeToExpressionNode(binaryExpression.right)
            ]
        );
    }
    getBinaryOperatorFunction(op: ts.BinaryOperator): string {
        switch (op) {
            case ts.SyntaxKind.EqualsEqualsToken:
                return 'equals';
            case ts.SyntaxKind.EqualsEqualsEqualsToken:
                return 'strictEquals';
            case ts.SyntaxKind.ExclamationEqualsToken:
                return 'notEquals';
            case ts.SyntaxKind.ExclamationEqualsEqualsToken:
                return 'notStrictEquals';
            case ts.SyntaxKind.AmpersandAmpersandToken:
                return 'and';
            case ts.SyntaxKind.BarBarToken:
                return 'or';
            case ts.SyntaxKind.PlusToken:
                return 'plus';
            case ts.SyntaxKind.SlashToken:
                return 'divide';
            case ts.SyntaxKind.AsteriskToken:
                return 'multiply';
            case ts.SyntaxKind.MinusToken:
                return 'minus';
            case ts.SyntaxKind.GreaterThanToken:
                return 'greaterThan';
            case ts.SyntaxKind.GreaterThanEqualsToken:
                return 'greaterThanOrEquals';
            case ts.SyntaxKind.LessThanToken:
                return 'lessThan';
            case ts.SyntaxKind.LessThanEqualsToken:
                return 'lessThanOrEquals';
            default:
                throw new NotSupportedException();
        }
    }
    convertPropertyAccessExpression(propertyAccessExpression: ts.PropertyAccessExpression): ts.Expression {
        return ts.createCall(
            ts.createPropertyAccess(
                this.getBuilderIdentifier(),
                'propertyAccess'),
            [],
            [
                this.convertNodeToExpressionNode(propertyAccessExpression.expression),
                ts.createLiteral(propertyAccessExpression.name)
            ]
        );
    }
    convertIdentifier(identifier: ts.Identifier): ts.Expression {
        if (this.isInScope(identifier.getText())) {
            return identifier;
        }
        return ts.createCall(
            ts.createPropertyAccess(
                this.getBuilderIdentifier(),
                'constant'),
            [],
            [
                identifier
            ]
        );
    }
    convertParenthesizedExpression(parenthesizedExpression: ts.ParenthesizedExpression): ts.Expression {
        return this.convertNodeToExpressionNode(parenthesizedExpression.expression);
    }
    convertObjectLiteralExpression(objectLiteralExpression: ts.ObjectLiteralExpression): ts.Expression {
        return ts.createCall(
            ts.createPropertyAccess(
                this.getBuilderIdentifier(),
                'objectLiteral'),
            [],
            [
                ts.createArrayLiteral(objectLiteralExpression.properties.map(property => this.convertNodeToExpressionNode(property))),
            ]
        );
    }
    convertPropertyAssignment(propertyAssignment: ts.PropertyAssignment): ts.Expression {
        return ts.createCall(
            ts.createPropertyAccess(
                this.getBuilderIdentifier(),
                'propertyAssignment'),
            [],
            [
                ts.createLiteral(propertyAssignment.name.getText()),
                this.convertNodeToExpressionNode(propertyAssignment.initializer),
            ]
        );
    }
    convertShorthandPropertyAssignment(shorthandPropertyAssignment: ts.ShorthandPropertyAssignment): ts.Expression {
        return ts.createCall(
            ts.createPropertyAccess(
                this.getBuilderIdentifier(),
                'propertyAssignment'),
            [],
            [
                ts.createLiteral(shorthandPropertyAssignment.name.getText()),
                this.convertNodeToExpressionNode(shorthandPropertyAssignment.name),
            ]
        );
    }
    convertCallExpression(callExpression: ts.CallExpression): ts.Expression {
        //TODO: also accept types implementing Expression
        if (ts.isPropertyAccessExpression(callExpression.expression) && 
            callExpression.expression.name.getText() == 'invoke' && 
            this.isConstantExpression(callExpression.expression.expression) &&
            this.isTypeExpressionType(this.typeChecker.getTypeAtLocation(callExpression.expression.expression))) {
            return this.convertLambdaExpressionInvoke(callExpression);
        }
        return ts.createCall(
            ts.createPropertyAccess(
                this.getBuilderIdentifier(),
                'call'),
            [],
            [
                this.convertNodeToExpressionNode(callExpression.expression),
                ...callExpression.arguments.map(argument => this.convertNodeToExpressionNode(argument)),
            ]
        );
    }
    convertLambdaExpressionInvoke(callExpression: ts.CallExpression): ts.Expression {
        return ts.createCall(
            ts.createPropertyAccess(
                this.getBuilderIdentifier(),
                'call'),
            [],
            [
                (callExpression.expression as ts.PropertyAccessExpression).expression,
                ...callExpression.arguments.map(argument => this.convertNodeToExpressionNode(argument)),
            ]
        );
    }
}
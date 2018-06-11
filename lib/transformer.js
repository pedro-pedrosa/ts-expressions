"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts = require("typescript");
const NotSupportedException_1 = require("./exceptions/NotSupportedException");
function transformer(program, tsExpressionsModulePath) {
    return (context) => (file) => new FileTransformer(program, context, file, tsExpressionsModulePath).transformFile();
}
exports.default = transformer;
class FileTransformer {
    constructor(program, context, file, tsExpressionsModulePath) {
        this.program = program;
        this.context = context;
        this.file = file;
        this.tsExpressionsModulePath = tsExpressionsModulePath;
        this.builderIdentifier = null;
    }
    getBuilderIdentifier() {
        return this.builderIdentifier || (this.builderIdentifier = ts.createUniqueName('ExpressionBuilder'));
    }
    transformFile() {
        if (this.file.isDeclarationFile) {
            return this.file;
        }
        this.typeChecker = this.program.getTypeChecker();
        this.scopeStack = [new Set()];
        const visitedStatements = this.file.statements.map(s => this.visit(s));
        return this.builderIdentifier == null ? this.file : ts.updateSourceFileNode(this.file, [
            ts.createVariableStatement([], ts.createVariableDeclarationList([ts.createVariableDeclaration(this.builderIdentifier, undefined, ts.createCall(ts.createIdentifier('require'), [], [ts.createLiteral((this.tsExpressionsModulePath || 'ts-expressions') + '/lib/expressions/ExpressionBuilder')]))])),
            ...visitedStatements
        ]);
    }
    visit(node) {
        if (ts.isCallExpression(node)) {
            const expressionOverload = this.getBestExpressionOverloadDeclarationFromCallExpression(node);
            if (expressionOverload) {
                return ts.createCall(node.expression, [], expressionOverload.parameters.map((parameter, i) => this.isTypeNodeExpressionType(parameter.type) && !this.isTypeExpressionType(this.typeChecker.getTypeAtLocation(node.arguments[i])) ?
                    this.convertNodeToExpressionNode(node.arguments[i]) :
                    this.visit(node.arguments[i])));
            }
        }
        return ts.visitEachChild(node, child => this.visit(child), this.context);
    }
    getOverloadDeclarations(declaration) {
        if (!declaration.name) {
            return [];
        }
        if (ts.isMethodDeclaration(declaration) && ts.isClassDeclaration(declaration.parent)) {
            return declaration.parent.members
                .filter(child => ts.isMethodDeclaration(child) && child.name && child.name.getText() == declaration.name.getText())
                .map(child => child);
        }
        if (ts.isFunctionDeclaration(declaration) && ts.isSourceFile(declaration.parent)) {
            return declaration.parent.statements
                .filter(child => ts.isFunctionDeclaration(child) && child.name && child.name.getText() == declaration.name.getText())
                .map(child => child);
        }
        return [];
    }
    getBestExpressionOverloadDeclarationFromCallExpression(callExpression) {
        const signature = this.typeChecker.getResolvedSignature(callExpression);
        if (!signature || (!ts.isFunctionDeclaration(signature.declaration) && !ts.isMethodDeclaration(signature.declaration))) {
            return undefined;
        }
        const bestOverload = this.getOverloadDeclarations(signature.declaration)
            .map(overload => ({
            overload,
            expressionArguments: overload.parameters.filter(p => this.isTypeNodeExpressionType(p.type)).length,
        }))
            .reduce((best, current) => (!best || current.expressionArguments > best.expressionArguments) ? current : best, undefined);
        return bestOverload ? bestOverload.overload : undefined;
    }
    isTypeNodeExpressionType(typeNode, expressionType = 'Expression') {
        return this.isTypeExpressionType(this.typeChecker.getTypeFromTypeNode(typeNode), expressionType);
    }
    isTypeExpressionType(type, expressionType = 'Expression') {
        return type.symbol && type.symbol.declarations && type.symbol.declarations.findIndex(decl => this.isTypeDeclarationExpressionType(decl, expressionType)) != -1;
    }
    isTypeDeclarationExpressionType(declaration, expressionType = 'Expression') {
        if (!ts.isClassDeclaration(declaration)) {
            return false;
        }
        if (declaration.name && declaration.name.getText() == expressionType) {
            return true;
        }
        if (declaration.heritageClauses && declaration.heritageClauses.length > 0) {
            return declaration.heritageClauses.findIndex(clause => clause.types.findIndex(type => this.isTypeNodeExpressionType(type, expressionType)) != -1) != -1;
        }
        return false;
    }
    isConstantExpression(expression) {
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
    isInScope(identifier) {
        return this.scopeStack[this.scopeStack.length - 1].has(identifier);
    }
    executeInNewScope(action, scopeIdentifiers) {
        const newScope = new Set(this.scopeStack[this.scopeStack.length - 1]);
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
    convertNodeToExpressionNode(node) {
        if (ts.isArrowFunction(node) || ts.isFunctionExpression(node)) {
            return this.convertAnonymousFunction(node);
        }
        else if (ts.isBinaryExpression(node)) {
            return this.convertBinaryExpression(node);
        }
        else if (ts.isPropertyAccessExpression(node)) {
            return this.convertPropertyAccessExpression(node);
        }
        else if (ts.isIdentifier(node)) {
            return this.convertIdentifier(node);
        }
        else if (ts.isParenthesizedExpression(node)) {
            return this.convertParenthesizedExpression(node);
        }
        else if (ts.isObjectLiteralExpression(node)) {
            return this.convertObjectLiteralExpression(node);
        }
        else if (ts.isPropertyAssignment(node)) {
            return this.convertPropertyAssignment(node);
        }
        else if (ts.isShorthandPropertyAssignment(node)) {
            return this.convertShorthandPropertyAssignment(node);
        }
        else if (ts.isCallExpression(node)) {
            if (ts.isPropertyAccessExpression(node.expression) &&
                node.expression.name.getText() == 'invoke' &&
                this.isConstantExpression(node.expression.expression) &&
                this.isTypeExpressionType(this.typeChecker.getTypeAtLocation(node.expression.expression)), 'LambdaExpression') {
                return this.convertLambdaExpressionInvoke(node);
            }
            return this.convertCallExpression(node);
        }
        throw new NotSupportedException_1.NotSupportedException();
    }
    convertAnonymousFunction(arrowFunction) {
        return ts.createImmediatelyInvokedArrowFunction([
            ts.createVariableStatement([], ts.createVariableDeclarationList(arrowFunction.parameters.map(parameter => ts.createVariableDeclaration(parameter.name, undefined, ts.createCall(ts.createPropertyAccess(this.getBuilderIdentifier(), 'parameter'), [], [ts.createLiteral(parameter.name.getText())]))), ts.NodeFlags.Const)),
            ts.createReturn(ts.createCall(ts.createPropertyAccess(this.getBuilderIdentifier(), 'lambda'), [], [
                ts.createArrayLiteral(arrowFunction.parameters.map(parameter => ts.createIdentifier(parameter.name.getText()))),
                this.executeInNewScope(() => this.convertNodeToExpressionNode(arrowFunction.body), arrowFunction.parameters.map(parameter => parameter.name.getText())),
            ]))
        ]);
    }
    convertBinaryExpression(binaryExpression) {
        return ts.createCall(ts.createPropertyAccess(this.getBuilderIdentifier(), this.getBinaryOperatorFunction(binaryExpression.operatorToken.kind)), [], [
            this.convertNodeToExpressionNode(binaryExpression.left),
            this.convertNodeToExpressionNode(binaryExpression.right)
        ]);
    }
    getBinaryOperatorFunction(op) {
        switch (op) {
            case ts.SyntaxKind.EqualsEqualsEqualsToken:
                return 'strictEquals';
            case ts.SyntaxKind.EqualsEqualsToken:
                return 'equals';
            case ts.SyntaxKind.AmpersandAmpersandToken:
                return 'and';
            case ts.SyntaxKind.BarBarToken:
                return 'or';
            default:
                throw new NotSupportedException_1.NotSupportedException();
        }
    }
    convertPropertyAccessExpression(propertyAccessExpression) {
        return ts.createCall(ts.createPropertyAccess(this.getBuilderIdentifier(), 'propertyAccess'), [], [
            this.convertNodeToExpressionNode(propertyAccessExpression.expression),
            ts.createLiteral(propertyAccessExpression.name)
        ]);
    }
    convertIdentifier(identifier) {
        if (this.isInScope(identifier.getText())) {
            return identifier;
        }
        return ts.createCall(ts.createPropertyAccess(this.getBuilderIdentifier(), 'constant'), [], [
            identifier
        ]);
    }
    convertParenthesizedExpression(parenthesizedExpression) {
        return this.convertNodeToExpressionNode(parenthesizedExpression.expression);
    }
    convertObjectLiteralExpression(objectLiteralExpression) {
        return ts.createCall(ts.createPropertyAccess(this.getBuilderIdentifier(), 'objectLiteral'), [], [
            ts.createArrayLiteral(objectLiteralExpression.properties.map(property => this.convertNodeToExpressionNode(property))),
        ]);
    }
    convertPropertyAssignment(propertyAssignment) {
        return ts.createCall(ts.createPropertyAccess(this.getBuilderIdentifier(), 'propertyAssignment'), [], [
            ts.createLiteral(propertyAssignment.name.getText()),
            this.convertNodeToExpressionNode(propertyAssignment.initializer),
        ]);
    }
    convertShorthandPropertyAssignment(shorthandPropertyAssignment) {
        return ts.createCall(ts.createPropertyAccess(this.getBuilderIdentifier(), 'propertyAssignment'), [], [
            ts.createLiteral(shorthandPropertyAssignment.name.getText()),
            this.convertNodeToExpressionNode(shorthandPropertyAssignment.name),
        ]);
    }
    convertCallExpression(callExpression) {
        return ts.createCall(ts.createPropertyAccess(this.getBuilderIdentifier(), 'call'), [], [
            this.convertNodeToExpressionNode(callExpression.expression),
            ...callExpression.arguments.map(argument => this.convertNodeToExpressionNode(argument)),
        ]);
    }
    convertLambdaExpressionInvoke(callExpression) {
        return ts.createCall(ts.createPropertyAccess(this.getBuilderIdentifier(), 'call'), [], [
            callExpression.expression.expression,
            ...callExpression.arguments.map(argument => this.convertNodeToExpressionNode(argument)),
        ]);
    }
}
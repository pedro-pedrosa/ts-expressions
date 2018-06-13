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
    getCompatibleOverloadDeclarations(declaration) {
        if (!declaration.name) {
            return [];
        }
        let delcarationsInScope = null;
        if (ts.isMethodDeclaration(declaration) && ts.isClassDeclaration(declaration.parent)) {
            delcarationsInScope = declaration.parent.members
                .filter(child => ts.isMethodDeclaration(child))
                .map(child => child);
        }
        else if (ts.isFunctionDeclaration(declaration)) {
            if (ts.isSourceFile(declaration.parent)) {
                delcarationsInScope = declaration.parent.statements
                    .filter(child => ts.isFunctionDeclaration(child))
                    .map(child => child);
            }
        }
        if (!delcarationsInScope) {
            return [];
        }
        return delcarationsInScope
            .filter(d => d.name && d.name.getText() == declaration.name.getText() &&
            d.parameters.length == declaration.parameters.length &&
            d.parameters.every((p, i) => this.isParameterSameType(declaration.parameters[i], p) || this.isParameterConvertible(declaration.parameters[i], p)));
    }
    getBestExpressionOverloadDeclarationFromCallExpression(callExpression) {
        const signature = this.typeChecker.getResolvedSignature(callExpression);
        if (!signature || (!ts.isFunctionDeclaration(signature.declaration) && !ts.isMethodDeclaration(signature.declaration))) {
            return undefined;
        }
        const bestOverload = this.getCompatibleOverloadDeclarations(signature.declaration)
            .map(overload => ({
            overload,
            convertibleParameters: overload.parameters.filter((p, i) => this.isParameterConvertible(signature.declaration.parameters[i], p)).length,
        }))
            .reduce((best, current) => (!best || current.convertibleParameters > best.convertibleParameters) ? current : best, undefined);
        return bestOverload ? bestOverload.overload : undefined;
    }
    isSameType(t1, t2) {
        if (!t1 || !t2) {
            return false;
        }
        switch (t1.kind) {
            case ts.SyntaxKind.TypeReference:
                return ts.isTypeReferenceNode(t2) && this.typeChecker.getTypeFromTypeNode(t1).symbol == this.typeChecker.getTypeFromTypeNode(t2).symbol;
            default:
                return t1.getText() == t2.getText();
        }
    }
    isParameterSameType(parameter, compareParameter) {
        return this.isSameType(parameter.type, compareParameter.type);
    }
    isParameterConvertible(parameter, expressionParameter) {
        return this.isTypeNodeExpressionType(expressionParameter.type) && this.isSameType(parameter.type, this.getExpressionTypeArgument(expressionParameter.type));
    }
    isTypeNodeExpressionType(typeNode) {
        return this.isTypeExpressionType(this.typeChecker.getTypeFromTypeNode(typeNode));
    }
    isTypeExpressionType(type) {
        return type.symbol && type.symbol.declarations && type.symbol.declarations.findIndex(decl => this.isTypeDeclarationExpressionType(decl)) != -1;
    }
    isTypeDeclarationExpressionType(declaration) {
        if (ts.isInterfaceDeclaration(declaration)) {
            const name = declaration.name && declaration.name.getText();
            const fileName = declaration.getSourceFile().fileName;
            return name == 'Expression' && (fileName.endsWith('/ts-expressions/lib/expressions/Expression.d.ts') || fileName.endsWith('/ts-expressions/lib/expressions/Expression.ts'));
        }
        return false;
    }
    getExpressionTypeArgument(expressionType) {
        return ts.isTypeReferenceNode(expressionType) ? expressionType.typeArguments[0] : undefined;
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
                this.isTypeExpressionType(this.typeChecker.getTypeAtLocation(node.expression.expression))) {
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

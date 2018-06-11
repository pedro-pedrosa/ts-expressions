import * as ts from 'typescript';
export default function transformer(program: ts.Program, tsExpressionsModulePath?: string): ts.TransformerFactory<ts.SourceFile>;

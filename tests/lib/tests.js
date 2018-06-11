const ts = require('typescript');
const transformer = require('../../lib/transformer').default;

exports.compile = function(name) {
    const compilerOptions = {
        target: ts.ScriptTarget.ES5,
        module: ts.ModuleKind.CommonJS,
        moduleResolution: ts.ModuleResolutionKind.NodeJs,
        lib: [
            "lib.es2017.d.ts",
        ],
        experimentalDecorators: true,
        noEmitOnError: true,
    };
    
    const program = ts.createProgram([ `./tests/${name}.src.ts` ], compilerOptions);
    const result = program.emit(undefined, undefined, undefined, false, {
        before: [transformer(program, '..')],
    });
    const errors = result.diagnostics.filter(x => x.category == ts.DiagnosticCategory.Error);
    return {
        errors,
        out: errors > 0 ? null : require(`../${name}.src.js`)
    };
}
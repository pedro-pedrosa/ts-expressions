# ts-expressions [WORK IN PROGRESS]
A TypeScript transformer to convert TypeScript expressions into equivalent expression trees

## Description
ts-expressions is a TypeScript transformer that helps you get information about an expression at run-time by creating an object structure representing that expression at compile-time.

## How to install
```
npm i ts-expressions
```

## How does it work
The transformer provided by ts-expressions will analyze TypeScript code and look for calls to functions that contain an overload which declares parameters of type `Expression`. If the function call being analyzed is passing arguments of types other than `Expression`, those arguments are converted to expressions during the compilation of the program.

You will need to use a custom TypeScript compiler to make use of the ts-expressions transformer. You can use [ttypescript](https://github.com/cevek/ttypescript) to compile your program using the following configuration in `ts.config`:

```json
{
  "compilerOptions": {
    "plugins": [
      { "transform": "ts-expressions" }
    ]
  },
}
```

If you're feeling adventurous you can also create your own TypeScript compiler:

```ts
import * as ts from 'typescript';
import transformer from 'ts-expressions';

const sources = [
  //your source files
];
const compilerOptions = {
  //your options
};
const program = ts.createProgram(sources, compilerOptions);

const result = program.emit(undefined, undefined, undefined, false, {
  before: [ transformer(program) ],
});
```

It is currently not supported to use the out-of-the-box TypeScript compiler `tsc` with this plug-in. You can [show some love here](https://github.com/Microsoft/TypeScript/issues/14419) if you'd like to see plugin support built into the TypeScript compiler.

## How to use
To declare a function that accepts expressions, you must declare one overload that uses a parameter of type `Expression` and another overload that uses a parameter of the type of expression you want to work with.

For example, to work with numeric expressions, you could write the following function:

```ts
import * as expr from 'ts-expressions';

function numeric(expression: expr.Expression);
function numeric(expression: number);
function numeric(arg: expr.Expression | number) {
  const expression = expr.checkExpressionParameter(arg, 'expression'); //this will check if arg is an expression and will return it, otherwise throws exception
  //do whatever you want with your numeric expression tree
}
```

Then call it using:

```ts
numeric(5 + 1);
```

Which would be translated by the transformer to:

```ts
import * as builder from 'ts-expressions/lib/expressions/ExpressionBuilder';

numeric(builder.plus(builder.constant(5), builder.constant(1));
```

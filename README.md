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
To declare a function that accepts expressions, you must declare one signature overload that uses parameters of type `Expression<T>` and another overload equivalent signature that uses parameters of type `T` which will be used by callers. `ts-expressions` will only convert supported expressions.

For example, to work with numeric expressions, you could write the following function:

```ts
import * as expr from 'ts-expressions';

function numeric(expression: number);
function numeric(expression: expr.Expression<number>);
function numeric(arg: expr.Expression<number> | number) {
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

numeric(builder.binary(builder.constant(5), BinaryOperator.plus, builder.constant(1));
```

Note that `ts-expressions` will only match overload signatures with the same number of parameters and where parameters in have compatible expression types.

The following examples work:

```ts
function a(expression: number);
function a(expression: expr.Expression<number>);
function a(arg: any) { }

function b(p1: string, expression: number);
function b(p1: string, expression: expr.Expression<number>);
function b(p1: string, arg: any) { }

function c(p1: string, expression1: string, expression2: boolean);
function c(p1: string, expression1: expr.Expression<string>, expression2: expr.Expression<boolean>);
function c(p1: string, arg1: any, arg2: any) { }
```

The following examples will not work:

```ts
function a(expression: number);
function a(expression: expr.Expression<string>);
function a(arg: any) { }

function b(p1: string, expression: number);
function b(expression: expr.Expression<number>, p1: string);
function b(p1: string, arg: any) { }

function c(p1: string, expression1: string);
function c(p1: string, expression1: expr.Expression<string>, expression2: expr.Expression<boolean>);
function c(p1: string, arg1: any, arg2: any) { }
```
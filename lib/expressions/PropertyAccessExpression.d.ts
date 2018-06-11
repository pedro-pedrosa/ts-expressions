import { Expression } from './Expression';
export declare class PropertyAccessExpression extends Expression {
    constructor(expression: Expression, name: string);
    expression: Expression;
    name: string;
}

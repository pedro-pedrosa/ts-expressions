import { Expression } from './Expression';

export class PropertyAccessExpression extends Expression {
    constructor(expression: Expression, name: string) {
        super();
        this.expression = expression;
        this.name = name;
    }
    expression: Expression;
    name: string;
}
import { Expression } from './Expression';

export class PropertyAssignmentExpression extends Expression {
    constructor(name: string, expression: Expression) {
        super();
        this.name = name;
        this.expression = expression;
    }
    name: string;
    expression: Expression;
}
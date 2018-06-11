import { Expression } from './Expression';
export declare class PropertyAssignmentExpression extends Expression {
    constructor(name: string, expression: Expression);
    name: string;
    expression: Expression;
}

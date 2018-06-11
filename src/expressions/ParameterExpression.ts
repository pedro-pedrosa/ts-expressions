import { Expression } from './Expression';

export class ParameterExpression extends Expression {
    constructor(name: string) {
        super();
        this.name = name;
    }
    name: string;
}
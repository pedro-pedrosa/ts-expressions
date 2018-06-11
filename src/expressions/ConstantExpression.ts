import { Expression } from './Expression';

export class ConstantExpression extends Expression {
    constructor(value: any) {
        super();
        this.value = value;
    }
    value: any;
}